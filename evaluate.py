#!/usr/bin/env python3
"""
Rice Leaf Disease Model Batch Evaluation Script
Pipeline:
  5,932 Labeled Images -> EfficientNet-B0 -> Predictions -> Comparison vs Ground Truth
  -> Overall Accuracy, Precision / Recall / F1, Confusion Matrix, Per-Disease Performance
"""

import argparse
import json
import os
import sys
import time
from pathlib import Path
from typing import Dict, List, Tuple

import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import timm
import torch
from PIL import Image, ImageFile
from safetensors.torch import load_file
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score, precision_recall_fscore_support
from torch.utils.data import DataLoader, Dataset
from tqdm import tqdm

ImageFile.LOAD_TRUNCATED_IMAGES = True

# Standard label mapping: maps common dataset aliases to model's canonical 17 classes
CANONICAL_ALIASES = {
    # 4 classes in the 5,932 Indian rice leaf dataset (Sethy et al.):
    "bacterial blight": "Bacterial Blight",
    "bacterialblight": "Bacterial Blight",
    "bacterial_blight": "Bacterial Blight",
    "bacterial leaf blight": "Bacterial Blight",
    "bacterial_leaf_blight": "Bacterial Blight",
    "blast": "Leaf Blast",
    "leaf blast": "Leaf Blast",
    "leaf_blast": "Leaf Blast",
    "brown spot": "Brown Spot",
    "brownspot": "Brown Spot",
    "brown_spot": "Brown Spot",
    "tungro": "Tungro",
    "tungro virus": "Tungro",
    # Other classes in the 17-class taxonomy:
    "bacterial streak": "Bacterial Streak",
    "bacterial_streak": "Bacterial Streak",
    "bakanae": "Bakanae",
    "false smut": "False Smut",
    "false_smut": "False Smut",
    "grassy stunt virus": "Grassy Stunt Virus",
    "healthy": "Healthy",
    "hispa": "Hispa",
    "leaf scald": "Leaf Scald",
    "narrow brown spot": "Narrow Brown Spot",
    "neck blast": "Neck Blast",
    "ragged stunt virus": "Ragged Stunt Virus",
    "sheath blight": "Sheath Blight",
    "sheath rot": "Sheath Rot",
    "stem rot": "Stem Rot",
}


class RiceLeafDataset(Dataset):
    """PyTorch Dataset loading images and matching ground-truth labels."""

    def __init__(self, image_paths: List[Path], labels: List[str], label_to_idx: Dict[str, int], transform):
        self.image_paths = image_paths
        self.labels = labels
        self.label_to_idx = label_to_idx
        self.transform = transform

    def __len__(self):
        return len(self.image_paths)

    def __getitem__(self, idx):
        img_path = self.image_paths[idx]
        label_str = self.labels[idx]
        target_idx = self.label_to_idx[label_str]

        try:
            with Image.open(img_path) as im:
                im = im.convert("RGB")
                tensor = self.transform(im)
        except Exception as e:
            print(f"[WARN] Error loading {img_path}: {e}", file=sys.stderr)
            tensor = torch.zeros((3, 224, 224), dtype=torch.float32)

        return tensor, target_idx, str(img_path), label_str


def find_model_dir(custom_path: str = None) -> Path:
    """Locate the downloaded model directory inside cv-service."""
    if custom_path:
        p = Path(custom_path).resolve()
        if p.exists():
            return p
        raise FileNotFoundError(f"Specified model directory does not exist: {custom_path}")

    current_dir = Path(__file__).resolve().parent
    candidates = [
        current_dir / "models" / "rice-leaf-disease-efficientnet-b0",
        current_dir / "cv-service" / "models" / "rice-leaf-disease-efficientnet-b0",
        current_dir.parent / "cv-service" / "models" / "rice-leaf-disease-efficientnet-b0",
    ]
    for candidate in candidates:
        if candidate.exists() and (candidate / "config.json").exists():
            return candidate

    return None


def load_model(model_dir: Path, device: torch.device):
    """Load pretrained EfficientNet-B0 directly from local weights."""
    if model_dir and (model_dir / "config.json").exists():
        print(f"[INFO] Loading model from local directory: {model_dir}")
        with open(model_dir / "config.json", "r", encoding="utf-8") as f:
            cfg_data = json.load(f)

        arch = cfg_data.get("architecture", "efficientnet_b0")
        num_classes = cfg_data.get("num_classes", 17)
        label_names = cfg_data.get("label_names", [])

        model = timm.create_model(arch, pretrained=False, num_classes=num_classes)

        safetensors_path = model_dir / "model.safetensors"
        bin_path = model_dir / "pytorch_model.bin"

        if safetensors_path.exists():
            state_dict = load_file(str(safetensors_path))
            model.load_state_dict(state_dict)
            print(f"[INFO] Loaded weights from: {safetensors_path.name}")
        elif bin_path.exists():
            state_dict = torch.load(str(bin_path), map_location="cpu")
            model.load_state_dict(state_dict)
            print(f"[INFO] Loaded weights from: {bin_path.name}")
        else:
            raise FileNotFoundError(f"No weights file found in {model_dir}")

        if "pretrained_cfg" in cfg_data:
            model.pretrained_cfg.update(cfg_data["pretrained_cfg"])
        model.pretrained_cfg["label_names"] = label_names

    else:
        repo_id = "Huyt/rice-leaf-disease-efficientnet-b0"
        print(f"[INFO] Loading model from Hugging Face Hub: {repo_id}")
        model = timm.create_model(f"hf-hub:{repo_id}", pretrained=True)
        label_names = model.pretrained_cfg.get("label_names", [])

    model = model.to(device)
    model.eval()
    return model, label_names


def resolve_canonical_label(raw_label: str, model_labels: List[str]) -> str:
    """Normalize raw folder or string name to one of the model's 17 labels."""
    cleaned = raw_label.strip()
    lower = cleaned.lower()

    for ml in model_labels:
        if ml.lower() == lower:
            return ml

    if lower in CANONICAL_ALIASES:
        return CANONICAL_ALIASES[lower]

    for alias, canonical in CANONICAL_ALIASES.items():
        if alias in lower or lower in alias:
            return canonical

    return None


def collect_images_from_dir(data_dir: Path, model_labels: List[str]) -> Tuple[List[Path], List[str]]:
    """Recursively discover images organized by category subfolders."""
    image_paths = []
    labels = []
    valid_exts = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}

    subdirs = [d for d in data_dir.iterdir() if d.is_dir()]
    if not subdirs:
        all_imgs = [f for f in data_dir.glob("*.*") if f.suffix.lower() in valid_exts]
        for f in all_imgs:
            matched_label = None
            for ml in model_labels:
                if ml.lower() in f.stem.lower():
                    matched_label = ml
                    break
            if matched_label:
                image_paths.append(f)
                labels.append(matched_label)
        return image_paths, labels

    for subdir in sorted(subdirs):
        canonical_label = resolve_canonical_label(subdir.name, model_labels)
        if not canonical_label:
            print(f"[WARN] Folder '{subdir.name}' does not match any recognized disease class. Skipping.")
            continue

        images_in_folder = sorted([f for f in subdir.rglob("*.*") if f.suffix.lower() in valid_exts])
        print(f"  Found {len(images_in_folder):5d} images in: '{subdir.name}' -> mapped to '{canonical_label}'")
        for img in images_in_folder:
            image_paths.append(img)
            labels.append(canonical_label)

    return image_paths, labels


def run_evaluation(
    data_dir: str = None,
    csv_path: str = None,
    model_dir: str = None,
    batch_size: int = 64,
    output_dir: str = "evaluation_output",
    force_cpu: bool = False,
):
    """Execute batch inference and comprehensive performance evaluation."""
    start_time = time.time()

    # CPU optimization
    if not force_cpu and torch.cuda.is_available():
        device = torch.device("cuda")
    else:
        device = torch.device("cpu")
        threads = min(8, os.cpu_count() or 4)
        torch.set_num_threads(threads)

    print("=" * 80)
    print(" RICE-LEAF DISEASE CLASSIFICATION: BATCH EVALUATION PIPELINE")
    print(" Model: EfficientNet-B0 (17 classes)")
    print(f" Device: {device} ({torch.cuda.get_device_name(0) if device.type == 'cuda' else f'CPU - {torch.get_num_threads()} threads'})")
    print("=" * 80)

    # 1. Load Model
    m_dir = find_model_dir(model_dir)
    model, model_labels = load_model(m_dir, device)
    label_to_idx = {name: idx for idx, name in enumerate(model_labels)}
    idx_to_label = {idx: name for idx, name in enumerate(model_labels)}

    cfg = timm.data.resolve_data_config(model.pretrained_cfg, model=model)
    transform = timm.data.create_transform(**cfg)
    print(f"[INFO] Preprocessing: 224x224, bicubic, crop_pct={cfg.get('crop_pct', 0.875)}, ImageNet normalization")

    # 2. Gather Dataset
    image_paths = []
    labels = []

    if data_dir:
        d_path = Path(data_dir).resolve()
        print(f"\n[INFO] Scanning directory for labeled images: {d_path}")
        image_paths, labels = collect_images_from_dir(d_path, model_labels)
    else:
        default_candidates = [
            Path("cv-service/data/indian_rice_dataset_5932"),
            Path("data/indian_rice_dataset_5932"),
            Path("cv-service/data/raw"),
            Path("cv-service/data"),
        ]
        for c in default_candidates:
            if c.exists() and any(c.iterdir()):
                print(f"[INFO] Using auto-detected dataset folder: {c.resolve()}")
                image_paths, labels = collect_images_from_dir(c.resolve(), model_labels)
                if image_paths:
                    break

    total_images = len(image_paths)
    if total_images == 0:
        print("\n[ERROR] No labeled images found for evaluation.", file=sys.stderr)
        sys.exit(1)

    print(f"\n[INFO] Total labeled images prepared for evaluation: {total_images:,}")

    # Display dataset verification counts
    label_series = pd.Series(labels)
    print("\nVerified Dataset Distribution:")
    for lbl, count in label_series.value_counts().items():
        print(f"  - {lbl:<25}: {count:5d} images ({count / total_images * 100:.2f}%)")

    # 3. Create DataLoader
    dataset = RiceLeafDataset(image_paths, labels, label_to_idx, transform)
    loader = DataLoader(
        dataset,
        batch_size=batch_size,
        shuffle=False,
        num_workers=0,
        pin_memory=(device.type == "cuda"),
    )

    # 4. Run Batch Inference
    print(f"\n[INFO] Running inference across all {total_images:,} images with batch size {batch_size}...")
    all_preds = []
    all_targets = []
    all_confidences = []
    all_paths = []

    with torch.no_grad():
        for batch_imgs, batch_targets, batch_paths, _ in tqdm(loader, desc="Inference Progress", unit="batch"):
            batch_imgs = batch_imgs.to(device)
            logits = model(batch_imgs)
            probs = torch.softmax(logits, dim=-1)

            conf, pred_indices = torch.max(probs, dim=-1)

            all_preds.extend(pred_indices.cpu().numpy().tolist())
            all_targets.extend(batch_targets.numpy().tolist())
            all_confidences.extend(conf.cpu().numpy().tolist())
            all_paths.extend(batch_paths)

    all_preds = np.array(all_preds)
    all_targets = np.array(all_targets)
    all_confidences = np.array(all_confidences)

    pred_labels = [idx_to_label[i] for i in all_preds]
    target_labels = [idx_to_label[i] for i in all_targets]

    # 5. Compute Overall Metrics
    correct_count = int((all_targets == all_preds).sum())
    overall_accuracy = correct_count / total_images

    # Ground truth classes (the 4 dataset classes)
    ground_truth_classes = sorted(list(set(target_labels)))
    # All classes predicted across the entire dataset
    predicted_classes = sorted(list(set(pred_labels)))
    # Union of classes
    all_eval_classes = sorted(list(set(target_labels) | set(pred_labels)))

    precision_macro, recall_macro, f1_macro, _ = precision_recall_fscore_support(
        target_labels, pred_labels, labels=all_eval_classes, average="macro", zero_division=0
    )
    precision_weighted, recall_weighted, f1_weighted, _ = precision_recall_fscore_support(
        target_labels, pred_labels, labels=all_eval_classes, average="weighted", zero_division=0
    )

    # Classification report
    report_dict = classification_report(
        target_labels, pred_labels, labels=all_eval_classes, output_dict=True, zero_division=0
    )

    elapsed_time = time.time() - start_time

    # 6. Display Performance Summary
    print("\n" + "=" * 80)
    print(" COMPLETE EVALUATION RESULTS")
    print("=" * 80)
    print(f"Total Images Evaluated:   {total_images:,}")
    print(f"Correct Predictions:      {correct_count:,} / {total_images:,}")
    print(f"Overall Accuracy:         {overall_accuracy * 100:.2f}%")
    print(f"Macro Precision:          {precision_macro * 100:.2f}%")
    print(f"Macro Recall:             {recall_macro * 100:.2f}%")
    print(f"Macro F1-Score:           {f1_macro * 100:.2f}%")
    print(f"Weighted F1-Score:        {f1_weighted * 100:.2f}%")
    print(f"Average Confidence:       {all_confidences.mean() * 100:.2f}%")
    print(f"Total Evaluation Time:    {elapsed_time:.1f}s ({total_images / elapsed_time:.1f} images/sec)")

    print("\n" + "-" * 80)
    print(" PER-DISEASE PERFORMANCE BREAKDOWN (Ground Truth Classes)")
    print("-" * 80)
    print(f"{'Disease / Class':<25} {'Precision':>10} {'Recall':>10} {'F1-Score':>10} {'Support':>10}")
    print("-" * 80)
    for cname in ground_truth_classes:
        metrics = report_dict.get(cname, {"precision": 0.0, "recall": 0.0, "f1-score": 0.0, "support": 0})
        p = metrics["precision"] * 100
        r = metrics["recall"] * 100
        f = metrics["f1-score"] * 100
        s = int(metrics["support"])
        print(f"{cname:<25} {p:>9.2f}% {r:>9.2f}% {f:>9.2f}% {s:>10d}")
    print("-" * 80)

    # Check if any predictions fell into other classes
    other_preds = [c for c in predicted_classes if c not in ground_truth_classes]
    if other_preds:
        print("\nNote: Predictions falling into other taxonomy classes:")
        for op in other_preds:
            count = sum(1 for p in pred_labels if p == op)
            print(f"  - {op}: {count} predictions")

    # 7. Confusion Matrix (Rows: Ground Truth, Cols: Predicted)
    cm_4x4 = confusion_matrix(target_labels, pred_labels, labels=ground_truth_classes)

    print("\n" + "-" * 80)
    print(" CONFUSION MATRIX (Ground Truth vs Predicted 4 Classes)")
    print("-" * 80)
    col_w = 16
    header = f"{'Actual \\ Predicted':<22} | " + " | ".join([f"{c[:14]:>{col_w}}" for c in ground_truth_classes])
    print(header)
    print("-" * len(header))
    for row_idx, true_name in enumerate(ground_truth_classes):
        row_str = f"{true_name[:20]:<22} | " + " | ".join([f"{cm_4x4[row_idx, col_idx]:>{col_w}d}" for col_idx in range(len(ground_truth_classes))])
        print(row_str)
    print("-" * 80)

    # 8. Save Artifacts & Reports
    out_dir = Path(output_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    # Save detailed CSV
    results_df = pd.DataFrame({
        "image_path": all_paths,
        "actual_label": target_labels,
        "predicted_label": pred_labels,
        "confidence": all_confidences,
        "is_correct": (all_targets == all_preds),
    })
    csv_file = out_dir / "predictions_5932_detailed.csv"
    results_df.to_csv(csv_file, index=False)
    print(f"\n[INFO] Detailed predictions CSV saved to: {csv_file}")

    # Save JSON metrics report
    report_json_file = out_dir / "evaluation_report_5932.json"
    summary_report = {
        "dataset_name": "Indian Rice Leaf Disease Dataset (Sethy et al.)",
        "total_images": int(total_images),
        "correct_predictions": int(correct_count),
        "overall_accuracy": float(overall_accuracy),
        "macro_precision": float(precision_macro),
        "macro_recall": float(recall_macro),
        "macro_f1": float(f1_macro),
        "weighted_f1": float(f1_weighted),
        "average_confidence": float(all_confidences.mean()),
        "evaluation_time_seconds": float(elapsed_time),
        "per_class_performance": {
            cname: {
                "precision": float(report_dict[cname]["precision"]),
                "recall": float(report_dict[cname]["recall"]),
                "f1_score": float(report_dict[cname]["f1-score"]),
                "support": int(report_dict[cname]["support"]),
            }
            for cname in ground_truth_classes if cname in report_dict
        },
        "confusion_matrix": cm_4x4.tolist(),
        "classes": ground_truth_classes,
    }
    with open(report_json_file, "w", encoding="utf-8") as f:
        json.dump(summary_report, f, indent=2)
    print(f"[INFO] JSON evaluation metrics saved to:  {report_json_file}")

    # Plot and save Confusion Matrix Heatmap
    plt.figure(figsize=(9, 7))
    sns.heatmap(
        cm_4x4,
        annot=True,
        fmt="d",
        cmap="YlGnBu",
        xticklabels=ground_truth_classes,
        yticklabels=ground_truth_classes,
        cbar=True,
        annot_kws={"size": 12, "weight": "bold"},
    )
    plt.title("Confusion Matrix - Indian Rice Leaf Disease (5,932 Images)\nEfficientNet-B0 Pretrained", fontsize=13, pad=15)
    plt.xlabel("Predicted Disease", fontsize=11)
    plt.ylabel("Actual Ground Truth Disease", fontsize=11)
    plt.xticks(rotation=30, ha="right", fontsize=10)
    plt.yticks(rotation=0, fontsize=10)
    plt.tight_layout()
    cm_plot_file = out_dir / "confusion_matrix_5932.png"
    plt.savefig(cm_plot_file, dpi=300)
    plt.close()
    print(f"[INFO] Confusion Matrix heatmap saved to: {cm_plot_file}")
    print("=" * 80)


def main():
    parser = argparse.ArgumentParser(
        description="Run batch evaluation of EfficientNet-B0 on 5,932 labeled rice leaf images."
    )
    parser.add_argument(
        "--data-dir",
        type=str,
        default="cv-service/data/indian_rice_dataset_5932",
        help="Path to folder containing labeled images in subdirectories.",
    )
    parser.add_argument(
        "--model-dir",
        type=str,
        default=None,
        help="Path to local EfficientNet-B0 directory.",
    )
    parser.add_argument(
        "--batch-size",
        type=int,
        default=64,
        help="Inference batch size (default: 64).",
    )
    parser.add_argument(
        "--output-dir",
        type=str,
        default="cv-service/evaluation_output",
        help="Directory to save evaluation reports and plots.",
    )
    parser.add_argument(
        "--cpu",
        action="store_true",
        help="Force inference on CPU even if CUDA is available.",
    )

    args = parser.parse_args()
    run_evaluation(
        data_dir=args.data_dir,
        model_dir=args.model_dir,
        batch_size=args.batch_size,
        output_dir=args.output_dir,
        force_cpu=args.cpu,
    )


if __name__ == "__main__":
    main()
