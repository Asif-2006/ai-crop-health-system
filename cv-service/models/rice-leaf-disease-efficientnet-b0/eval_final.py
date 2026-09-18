"""Re-evaluate a checkpoint using timm's canonical inference transform.

train.py evaluates with its own Resize/CenterCrop, which differs slightly from the
transform timm.data.create_transform builds from the model config -- the one a
downstream user gets by following the README. Reporting numbers from that path keeps
the model card reproducible.
"""

import json
import sys
from pathlib import Path

import numpy as np
import timm
import torch
from PIL import Image, ImageFile
from sklearn.metrics import classification_report, confusion_matrix, f1_score
from torch.utils.data import DataLoader, Dataset

ImageFile.LOAD_TRUNCATED_IMAGES = True
HERE = Path(__file__).parent
CACHE = HERE / "data_256"


class DS(Dataset):
    def __init__(self, files, labels, idx, tf):
        self.f = [files[i] for i in idx]
        self.y = [labels[i] for i in idx]
        self.tf = tf

    def __len__(self):
        return len(self.f)

    def __getitem__(self, i):
        with Image.open((CACHE / self.f[i]).with_suffix(".jpg")) as im:
            return self.tf(im.convert("RGB")), self.y[i]


def main(run_dir: str):
    run = Path(run_dir)
    r = json.loads((run / "results.json").read_text())
    split = json.loads((HERE / "splits.json").read_text())

    model = timm.create_model(r["model"], pretrained=False, num_classes=len(r["classes"]))
    model.load_state_dict(torch.load(run / "best.pt", map_location="cpu"))
    model.eval().cuda()

    cfg = timm.data.resolve_data_config({}, model=model)
    tf = timm.data.create_transform(**cfg)
    print("eval transform:", cfg)

    out = {}
    for name in ("val", "test"):
        dl = DataLoader(DS(split["files"], split["labels"], split[name], tf),
                        batch_size=128, num_workers=8, pin_memory=True)
        P, G = [], []
        with torch.no_grad():
            for x, y in dl:
                P.append(model(x.cuda()).argmax(1).cpu())
                G.append(y)
        p, g = torch.cat(P).numpy(), torch.cat(G).numpy()
        out[name] = (p, g, (p == g).mean(), f1_score(g, p, average="macro", zero_division=0))
        print(f"{name}: acc {out[name][2]:.4f}  macro-F1 {out[name][3]:.4f}")

    p, g, acc, f1 = out["test"]
    r["test_acc"] = float(acc)
    r["test_macro_f1"] = float(f1)
    r["val_macro_f1_timm_tf"] = float(out["val"][3])
    r["eval_transform"] = "timm.data.create_transform (canonical)"
    r["report"] = classification_report(g, p, target_names=r["classes"],
                                        output_dict=True, zero_division=0)
    r["confusion_matrix"] = confusion_matrix(g, p).tolist()
    (run / "results.json").write_text(json.dumps(r, indent=2))
    print(f"updated {run}/results.json")


if __name__ == "__main__":
    main(sys.argv[1])
