"""Build a deduplicated, group-aware, stratified split of the rice leaf disease dataset.

Two dataset defects drive the design:
  1. 1,839 exact-duplicate files (6.3%), 45 hash groups carrying conflicting labels.
  2. Augmentation series: files named PREFIX<N>_<ID> share base image <ID>. Splitting
     these randomly leaks a leaf across train/test and inflates accuracy.
Grouping key is therefore the base image, and dedup happens before splitting.
"""

import hashlib
import json
import re
from collections import defaultdict
from pathlib import Path

from sklearn.model_selection import StratifiedGroupKFold

ROOT = Path(__file__).parent / "data_raw" / "Rice Disease"
OUT = Path(__file__).parent / "splits.json"
DROP_CLASSES = {"Leaf Smut"}  # ~97% mislabeled blast images; see model card
SEED = 42

# BLAST1_074.jpg and BLAST5_074.jpg are augmentations of the same base leaf "074".
# The series index is always 1 digit; the {1,2} bound keeps 14-digit camera timestamps
# (IMG20201109210545_00.jpg) from being misread as a series and collapsing 322 distinct
# Neck Blast photos into one group.
SERIES = re.compile(r"^([A-Za-z]+)(\d{1,2})_(\d+)\.[^.]+$")

# brownspot_orig_001.jpg / brownspot_rotated_001.jpg: same leaf, two variants.
VARIANT = re.compile(r"^(.*?)_(?:orig|rotated)_(\d+)\.[^.]+$", re.I)


def group_key(cls: str, name: str) -> str:
    m = SERIES.match(name)
    if m:
        return f"{cls}|{m.group(1).upper()}|{m.group(3)}"
    m = VARIANT.match(name)
    if m:
        return f"{cls}|{m.group(1).upper()}|{m.group(2)}"
    return f"{cls}|uniq|{name}"


def main():
    files, labels, groups = [], [], []
    by_hash = defaultdict(list)

    for cdir in sorted(p for p in ROOT.iterdir() if p.is_dir()):
        if cdir.name in DROP_CLASSES:
            continue
        for f in sorted(cdir.iterdir()):
            if f.is_file():
                by_hash[hashlib.md5(f.read_bytes()).hexdigest()].append((cdir.name, f))

    dropped_conflict = 0
    for _, entries in by_hash.items():
        classes = {c for c, _ in entries}
        if len(classes) > 1:
            # Same bytes, two labels: at least one is wrong and we cannot tell which.
            dropped_conflict += len(entries)
            continue
        cls, f = entries[0]  # keep one representative of each duplicate group
        files.append(str(f.relative_to(ROOT.parent)))
        labels.append(cls)
        groups.append(group_key(cls, f.name))

    classes = sorted(set(labels))
    cls_to_idx = {c: i for i, c in enumerate(classes)}
    y = [cls_to_idx[c] for c in labels]

    # 70/15/15 by groups: 20 folds of ~5% each, 3 to val, 3 to test, rest to train.
    sgkf = StratifiedGroupKFold(n_splits=20, shuffle=True, random_state=SEED)
    folds = [b.tolist() for _, b in sgkf.split(files, y, groups)]
    val_idx = set().union(*folds[0:3])
    test_idx = set().union(*folds[3:6])
    train_idx = set(range(len(files))) - val_idx - test_idx

    split = {
        "classes": classes,
        "seed": SEED,
        "dropped_classes": sorted(DROP_CLASSES),
        "dropped_conflicting_files": dropped_conflict,
        "train": sorted(train_idx),
        "val": sorted(val_idx),
        "test": sorted(test_idx),
        "files": files,
        "labels": y,
        "groups": groups,
    }
    OUT.write_text(json.dumps(split))

    # Verify the property we built this for.
    g = {name: set() for name in ("train", "val", "test")}
    for name in g:
        for i in split[name]:
            g[name].add(groups[i])
    leaks = (g["train"] & g["val"]) | (g["train"] & g["test"]) | (g["val"] & g["test"])

    print(f"kept {len(files)} images / {len(set(groups))} base groups / {len(classes)} classes")
    print(f"dropped: {dropped_conflict} files in cross-label hash conflicts")
    print(f"train {len(train_idx)} | val {len(val_idx)} | test {len(test_idx)}")
    print(f"group leakage across splits: {len(leaks)} (must be 0)")
    print(f"\n{'class':<22}{'train':>7}{'val':>6}{'test':>6}")
    for c in classes:
        ci = cls_to_idx[c]
        row = [sum(1 for i in split[s] if y[i] == ci) for s in ("train", "val", "test")]
        print(f"{c:<22}{row[0]:>7}{row[1]:>6}{row[2]:>6}")


if __name__ == "__main__":
    main()
