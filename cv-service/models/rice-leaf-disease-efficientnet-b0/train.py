"""Fine-tune a small timm backbone on the rice leaf disease split.

Long-tailed data (Brown Spot 4.2k vs Sheath Rot 91), so loss is class-weighted and
the model is selected on val macro-F1, not accuracy.

Usage: python train.py --model efficientnet_b0 --epochs 12
"""

import argparse
import json
import time
from pathlib import Path

import numpy as np
import timm
import torch
import torch.nn as nn
from PIL import Image, ImageFile
from sklearn.metrics import classification_report, confusion_matrix, f1_score
from torch.utils.data import DataLoader, Dataset

ImageFile.LOAD_TRUNCATED_IMAGES = True
HERE = Path(__file__).parent
CACHE = HERE / "data_256"
IMG_SIZE = 224


class RiceDS(Dataset):
    def __init__(self, files, labels, idx, tf):
        self.files = [files[i] for i in idx]
        self.labels = [labels[i] for i in idx]
        self.tf = tf

    def __len__(self):
        return len(self.files)

    def __getitem__(self, i):
        p = (CACHE / self.files[i]).with_suffix(".jpg")
        with Image.open(p) as im:
            img = im.convert("RGB")
        return self.tf(img), self.labels[i]


def build_tf(train, mean, std):
    from torchvision import transforms as T

    if train:
        return T.Compose([
            T.RandomResizedCrop(IMG_SIZE, scale=(0.6, 1.0)),
            T.RandomHorizontalFlip(),
            T.RandomVerticalFlip(),
            T.ColorJitter(0.2, 0.2, 0.2, 0.05),
            T.ToTensor(),
            T.Normalize(mean, std),
            T.RandomErasing(p=0.25),
        ])
    return T.Compose([
        T.Resize(int(IMG_SIZE * 1.14)),
        T.CenterCrop(IMG_SIZE),
        T.ToTensor(),
        T.Normalize(mean, std),
    ])


@torch.no_grad()
def evaluate(model, loader, dev, n_cls):
    model.eval()
    preds, gts = [], []
    for x, y in loader:
        x = x.to(dev, non_blocking=True)
        with torch.autocast("cuda", dtype=torch.bfloat16):
            out = model(x)
        preds.append(out.float().argmax(1).cpu())
        gts.append(y)
    p = torch.cat(preds).numpy()
    g = torch.cat(gts).numpy()
    return p, g, (p == g).mean(), f1_score(g, p, average="macro", zero_division=0)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default="efficientnet_b0")
    ap.add_argument("--epochs", type=int, default=12)
    ap.add_argument("--bs", type=int, default=64)
    ap.add_argument("--lr", type=float, default=3e-4)
    ap.add_argument("--weight-alpha", type=float, default=0.5,
                    help="class-weight exponent: 0=none, 0.5=sqrt-inverse-freq, 1=inverse-freq")
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    out = Path(args.out or HERE / "runs" / args.model)
    out.mkdir(parents=True, exist_ok=True)
    torch.manual_seed(42)
    np.random.seed(42)

    split = json.loads((HERE / "splits.json").read_text())
    classes, files, labels = split["classes"], split["files"], split["labels"]
    n_cls = len(classes)
    dev = "cuda"

    model = timm.create_model(args.model, pretrained=True, num_classes=n_cls).to(dev)
    model = model.to(memory_format=torch.channels_last)
    cfg = model.default_cfg
    mean, std = cfg["mean"], cfg["std"]

    dl = lambda ds, sh: DataLoader(ds, batch_size=args.bs, shuffle=sh, num_workers=8,
                                   pin_memory=True, persistent_workers=True, drop_last=sh)
    tr = dl(RiceDS(files, labels, split["train"], build_tf(True, mean, std)), True)
    va = dl(RiceDS(files, labels, split["val"], build_tf(False, mean, std)), False)
    te = dl(RiceDS(files, labels, split["test"], build_tf(False, mean, std)), False)

    # Class weights ~ (1/freq)^alpha, normalised to mean 1 so the loss scale is comparable.
    # alpha=1 is full inverse-frequency, which over-weights Sheath Rot ~60x against Brown
    # Spot and makes the model spam rare classes (high recall, ~0.1 precision). alpha=0.5
    # damps that.
    cnt = np.bincount([labels[i] for i in split["train"]], minlength=n_cls).astype(np.float64)
    w = (cnt.sum() / (n_cls * np.maximum(cnt, 1))) ** args.weight_alpha
    w = w / w.mean()
    crit = nn.CrossEntropyLoss(weight=torch.tensor(w, dtype=torch.float32, device=dev),
                               label_smoothing=0.1)
    opt = torch.optim.AdamW(model.parameters(), lr=args.lr, weight_decay=0.05)
    sched = torch.optim.lr_scheduler.OneCycleLR(opt, max_lr=args.lr, epochs=args.epochs,
                                                steps_per_epoch=len(tr), pct_start=0.25)

    print(f"{args.model}: {sum(p.numel() for p in model.parameters())/1e6:.1f}M params | "
          f"train {len(tr.dataset)} val {len(va.dataset)} test {len(te.dataset)} | {n_cls} classes")

    best, hist = -1.0, []
    for ep in range(1, args.epochs + 1):
        model.train()
        t0, tot, seen = time.time(), 0.0, 0
        for x, y in tr:
            x = x.to(dev, non_blocking=True).to(memory_format=torch.channels_last)
            y = y.to(dev, non_blocking=True)
            with torch.autocast("cuda", dtype=torch.bfloat16):
                loss = crit(model(x), y)
            opt.zero_grad(set_to_none=True)
            loss.backward()
            opt.step()
            sched.step()
            tot += loss.item() * y.size(0)
            seen += y.size(0)
        _, _, vacc, vf1 = evaluate(model, va, dev, n_cls)
        hist.append({"epoch": ep, "loss": tot / seen, "val_acc": float(vacc), "val_macro_f1": float(vf1)})
        star = ""
        if vf1 > best:
            best = vf1
            torch.save(model.state_dict(), out / "best.pt")
            star = "  *best"
        print(f"  ep{ep:2d}  loss {tot/seen:.4f}  val_acc {vacc:.4f}  val_macroF1 {vf1:.4f}"
              f"  {time.time()-t0:.0f}s{star}")

    model.load_state_dict(torch.load(out / "best.pt"))
    p, g, tacc, tf1 = evaluate(model, te, dev, n_cls)
    print(f"\nTEST  acc {tacc:.4f}  macro-F1 {tf1:.4f}")
    print(classification_report(g, p, target_names=classes, digits=3, zero_division=0))

    json.dump({
        "model": args.model,
        "params_m": sum(p_.numel() for p_ in model.parameters()) / 1e6,
        "weight_alpha": args.weight_alpha,
        "epochs": args.epochs,
        "classes": classes,
        "history": hist,
        "best_val_macro_f1": float(best),
        "test_acc": float(tacc),
        "test_macro_f1": float(tf1),
        "report": classification_report(g, p, target_names=classes, output_dict=True, zero_division=0),
        "confusion_matrix": confusion_matrix(g, p).tolist(),
    }, open(out / "results.json", "w"), indent=2)
    print(f"saved -> {out}")


if __name__ == "__main__":
    main()
