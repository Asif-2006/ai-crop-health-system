#!/usr/bin/env python3
"""
Rice Leaf Disease Classification Inference Script
Model: Huyt/rice-leaf-disease-efficientnet-b0
Architecture: EfficientNet-B0 (17 classes)
"""

import argparse
import json
import os
import sys
from pathlib import Path

import timm
import torch
from PIL import Image
from safetensors.torch import load_file


def find_model_dir(custom_path: str = None) -> Path:
    """Locate the downloaded model directory inside cv-service."""
    if custom_path:
        p = Path(custom_path).resolve()
        if p.exists():
            return p
        raise FileNotFoundError(f"Specified model directory does not exist: {custom_path}")

    current_dir = Path(__file__).resolve().parent
    candidates = [
        current_dir / "cv-service" / "models" / "rice-leaf-disease-efficientnet-b0",
        current_dir / "models" / "rice-leaf-disease-efficientnet-b0",
        current_dir.parent / "cv-service" / "models" / "rice-leaf-disease-efficientnet-b0",
    ]

    for candidate in candidates:
        if candidate.exists() and (candidate / "config.json").exists():
            return candidate

    return None


def load_model(model_dir: Path, device: torch.device):
    """
    Load the pretrained EfficientNet-B0 model and its labels/config.
    Tries loading from local directory in cv-service first;
    falls back to Hugging Face Hub if local directory is missing.
    """
    if model_dir and (model_dir / "config.json").exists():
        print(f"[INFO] Loading model from local directory: {model_dir}")
        with open(model_dir / "config.json", "r", encoding="utf-8") as f:
            cfg_data = json.load(f)

        arch = cfg_data.get("architecture", "efficientnet_b0")
        num_classes = cfg_data.get("num_classes", 17)
        label_names = cfg_data.get("label_names", [])

        # Create model architecture without training or altering weights
        model = timm.create_model(arch, pretrained=False, num_classes=num_classes)

        # Load pretrained weights from safetensors or bin
        safetensors_path = model_dir / "model.safetensors"
        bin_path = model_dir / "pytorch_model.bin"

        if safetensors_path.exists():
            state_dict = load_file(str(safetensors_path))
            model.load_state_dict(state_dict)
            print(f"[INFO] Pretrained weights loaded from: {safetensors_path.name}")
        elif bin_path.exists():
            state_dict = torch.load(str(bin_path), map_location="cpu")
            model.load_state_dict(state_dict)
            print(f"[INFO] Pretrained weights loaded from: {bin_path.name}")
        else:
            raise FileNotFoundError(f"No weights file found in {model_dir}")

        # Store pretrained config metadata on model for data transform resolution
        if "pretrained_cfg" in cfg_data:
            model.pretrained_cfg.update(cfg_data["pretrained_cfg"])
        model.pretrained_cfg["label_names"] = label_names

    else:
        repo_id = "Huyt/rice-leaf-disease-efficientnet-b0"
        print(f"[INFO] Loading model directly from Hugging Face Hub: {repo_id}")
        model = timm.create_model(f"hf-hub:{repo_id}", pretrained=True)
        label_names = model.pretrained_cfg.get("label_names", [])

    model = model.to(device)
    model.eval()  # Strictly evaluation mode (no training/fine-tuning)
    return model, label_names


def get_data_transform(model):
    """
    Build the canonical inference transform directly from the model configuration.
    Canonical parameters:
      - Size: 224x224 (input_size: 3, 224, 224)
      - Interpolation: bicubic
      - Crop percentage: 0.875, center crop
      - Mean: [0.485, 0.456, 0.406]
      - Std:  [0.229, 0.224, 0.225]
    """
    data_cfg = timm.data.resolve_data_config(model.pretrained_cfg, model=model)
    transform = timm.data.create_transform(**data_cfg)
    return transform, data_cfg


def predict_image(image_path: str, model_dir_override: str = None, force_cpu: bool = False):
    """Run inference on a single image and display predictions."""
    # Check image file
    img_path = Path(image_path).resolve()
    if not img_path.exists():
        print(f"[ERROR] Image file not found: {image_path}", file=sys.stderr)
        sys.exit(1)

    # Determine hardware device (GPU / CUDA if available, otherwise CPU)
    if force_cpu or not torch.cuda.is_available():
        device = torch.device("cpu")
    else:
        device = torch.device("cuda")

    print("=" * 70)
    print(" Rice Leaf Disease Classification (Inference Mode)")
    print(" Model: Huyt/rice-leaf-disease-efficientnet-b0")
    print("=" * 70)
    print(f"Device: {device} ({torch.cuda.get_device_name(0) if device.type == 'cuda' else 'CPU'})")

    # Locate and load model
    model_dir = find_model_dir(model_dir_override)
    model, label_names = load_model(model_dir, device)
    print(f"[SUCCESS] Model loaded successfully!")

    # Resolve preprocessing transform
    transform, data_cfg = get_data_transform(model)

    print("\n" + "-" * 70)
    print(" MODEL CONFIGURATION & PREPROCESSING")
    print("-" * 70)
    print(f"Architecture:         {getattr(model, 'default_cfg', {}).get('architecture', 'efficientnet_b0')}")
    print(f"Number of Classes:    {len(label_names)}")
    print(f"Input Image Size:     {data_cfg.get('input_size', (3, 224, 224))}")
    print(f"Interpolation:        {data_cfg.get('interpolation', 'bicubic')}")
    print(f"Crop Percentage:      {data_cfg.get('crop_pct', 0.875)} (crop mode: {data_cfg.get('crop_mode', 'center')})")
    print(f"Normalization Mean:   {data_cfg.get('mean', [0.485, 0.456, 0.406])}")
    print(f"Normalization Std:    {data_cfg.get('std', [0.229, 0.224, 0.225])}")

    print("\n" + "-" * 70)
    print(" ALL 17 CLASS LABELS (Model Config Order)")
    print("-" * 70)
    for idx, label in enumerate(label_names):
        print(f"  [{idx:2d}] {label}")

    # Load and preprocess image
    try:
        raw_image = Image.open(img_path).convert("RGB")
    except Exception as e:
        print(f"[ERROR] Could not open image {img_path}: {e}", file=sys.stderr)
        sys.exit(1)

    print(f"\n[INFO] Input Image: {img_path.name} (Original dimensions: {raw_image.size[0]}x{raw_image.size[1]})")

    input_tensor = transform(raw_image).unsqueeze(0).to(device)

    # Inference
    with torch.no_grad():
        logits = model(input_tensor)
        probabilities = torch.softmax(logits, dim=-1)[0]

    top3_prob, top3_indices = torch.topk(probabilities, k=min(3, len(label_names)))

    predicted_class_idx = int(top3_indices[0])
    predicted_class_name = label_names[predicted_class_idx]
    predicted_confidence = float(top3_prob[0]) * 100.0

    print("\n" + "=" * 70)
    print(" INFERENCE RESULTS")
    print("=" * 70)
    print(f"Predicted Class:        {predicted_class_name}")
    print(f"Confidence Percentage:  {predicted_confidence:.2f}%")
    print("-" * 70)
    print("Top-3 Predictions:")
    for rank, (idx, prob) in enumerate(zip(top3_indices, top3_prob), start=1):
        class_idx = int(idx)
        pct = float(prob) * 100.0
        print(f"  {rank}. {label_names[class_idx]:<25} : {pct:6.2f}% (prob: {float(prob):.4f})")
    print("=" * 70)


def main():
    parser = argparse.ArgumentParser(
        description="Classify rice leaf diseases using pretrained EfficientNet-B0."
    )
    parser.add_argument(
        "image_path",
        type=str,
        help="Path to the input rice leaf image (JPG/PNG).",
    )
    parser.add_argument(
        "--model-dir",
        type=str,
        default=None,
        help="Optional path to the local model folder in cv-service.",
    )
    parser.add_argument(
        "--cpu",
        action="store_true",
        help="Force inference on CPU even if CUDA is available.",
    )

    args = parser.parse_args()
    predict_image(
        image_path=args.image_path,
        model_dir_override=args.model_dir,
        force_cpu=args.cpu,
    )


if __name__ == "__main__":
    main()
