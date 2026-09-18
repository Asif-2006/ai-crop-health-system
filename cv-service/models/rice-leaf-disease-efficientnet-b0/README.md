---
license: apache-2.0
tags:
- image-classification
- agriculture
- plant-disease
- rice
- timm
library_name: timm
pipeline_tag: image-classification
metrics:
- accuracy
- f1
---

# Rice Leaf Disease Classification — efficientnet_b0

A `efficientnet_b0` (4.0M params) fine-tuned to classify 17 rice leaf conditions
from RGB leaf photographs.

## Results (held-out test set, n=3984)

| Metric | Score |
|---|---|
| Accuracy | **0.9709** |
| Macro-F1 | **0.9473** |

Macro-F1 is the primary metric: the data is long-tailed, so accuracy is dominated by
the head classes and overstates real performance.

Measured with `timm`'s canonical inference transform (224px, `crop_pct=0.875`, bicubic)
— i.e. the exact preprocessing produced by the Usage snippet below, so these numbers are
reproducible from a fresh `hf-hub:` load rather than tied to the training script.

### Per-class F1

| Class | Precision | Recall | F1 | Support |
|---|---|---|---|---|
| Bacterial Blight | 0.981 | 0.984 | **0.983** | 579 |
| Bacterial Streak | 0.812 | 0.867 | **0.839** | 15 |
| Bakanae | 1.000 | 1.000 | **1.000** | 15 |
| Brown Spot | 0.972 | 0.976 | **0.974** | 632 |
| False Smut | 1.000 | 0.933 | **0.966** | 15 |
| Grassy Stunt Virus | 0.933 | 0.933 | **0.933** | 15 |
| Healthy | 0.942 | 0.952 | **0.947** | 442 |
| Hispa | 0.924 | 0.913 | **0.918** | 333 |
| Leaf Blast | 0.954 | 0.961 | **0.957** | 513 |
| Leaf Scald | 0.990 | 0.992 | **0.991** | 385 |
| Narrow Brown Spot | 0.989 | 0.989 | **0.989** | 269 |
| Neck Blast | 1.000 | 1.000 | **1.000** | 150 |
| Ragged Stunt Virus | 0.933 | 0.933 | **0.933** | 15 |
| Sheath Blight | 1.000 | 0.957 | **0.978** | 93 |
| Sheath Rot | 1.000 | 0.533 | **0.696** | 15 |
| Stem Rot | 1.000 | 1.000 | **1.000** | 15 |
| Tungro | 1.000 | 1.000 | **1.000** | 483 |

## Intended use

Research and educational use for rice disease triage from leaf images. **Not** a
substitute for agronomist diagnosis. Predictions on out-of-distribution imagery
(other crops, other capture conditions) are unreliable.

## Training data

Derived from the *Rice Leaf Disease Images* dataset (~29.4k images, 18 folders).
The raw data needed substantial cleaning before it was usable:

- **Dropped the `Leaf Smut` class entirely.** 1,460 of its 1,500 files were named
  `BLAST*`, derived from ~160 base images augmented 9x, and show blast lesions rather
  than smut. Several were byte-identical to files in `Leaf Blast`, so the two labels
  directly contradicted each other. Only 40 images looked like genuine leaf smut —
  too few to learn or evaluate. This leaves **17 classes**.
- **Deduplicated.** 1,839 exact-duplicate files (6.3% of the dataset) were collapsed
  to one representative each; 45 hash groups carried conflicting labels across classes.
- **Group-aware splitting.** Many files are augmentations of a shared base image
  (`BLAST1_074`/`BLAST5_074`; `brownspot_orig_001`/`brownspot_rotated_001`). Splitting
  these at random would place augmented copies of the same leaf in both train and test.
  Images were grouped by base identity and split by group, so **no leaf appears in more
  than one split**. Final: 18601 train / 3984 val / 3984 test (70/15/15),
  verified zero group overlap.

These numbers therefore describe generalisation to *unseen leaves*, not to unseen crops
of leaves already memorised. Note that accuracy stayed high (0.971) even after the
leakage was removed, so the split cleanup alone does not explain the ~98% figures often
quoted for this dataset — the head classes are simply easy, and the lab/field confound
below is the more likely driver. Macro-F1 (0.947) is the more informative number.

## Training

- Backbone: `efficientnet_b0` (ImageNet-pretrained, via `timm`)
- Resolution: 224x224, images pre-resized to 256px short side
- Optimiser: AdamW, OneCycle LR (max 3e-4), weight decay 0.05, 12 epochs, batch 64
- Loss: cross-entropy, label smoothing 0.1, no class weighting (uniform) — see the ablation below
- Augmentation: random resized crop (0.6-1.0), h/v flip, colour jitter, random erasing
- Precision: bf16 autocast. Selection: best val macro-F1.

### On class weighting

The data is long-tailed, so class-weighted loss is the obvious reflex. It did not help.
Weights proportional to `(1/freq)^alpha` were ablated, selecting on **validation**
macro-F1 (test was not consulted for this choice):

| `alpha` | val macro-F1 | test macro-F1 | test acc |
|---|---|---|---|
| 0.0 *(used)* | 0.9609 | 0.9473 | 0.9709 |
| 0.5 | 0.9587 | 0.9536 | 0.9694 |
| 1.0 | 0.8683 | 0.8694 | 0.9443 |

Full inverse-frequency weighting (`alpha=1`) gives the rarest class ~60x the weight of
the most common one. The model then over-predicts rare classes — recall near 1.0 at
~0.1 precision after one epoch — and macro-F1 *drops* sharply. Unweighted loss won on
validation, so it is what ships.

Caveat: `alpha=0.0` and `alpha=0.5` are close, and the gap sits within the noise floor
of the rare classes — with 14-15 test images each, a single image moves a class F1 by
~0.07. The `alpha=1` result is the only clearly separated one. Read the 0.0-vs-0.5
ordering as a coin-flip, not a finding.

## Usage

```python
import timm, torch
from PIL import Image

model = timm.create_model("hf-hub:Huyt/rice-leaf-disease-efficientnet-b0", pretrained=True).eval()

cfg = timm.data.resolve_data_config({}, model=model)
tf = timm.data.create_transform(**cfg)

img = Image.open("leaf.jpg").convert("RGB")
with torch.no_grad():
    probs = model(tf(img).unsqueeze(0)).softmax(-1)[0]

idx = int(probs.argmax())
print(model.pretrained_cfg["label_names"][idx], float(probs[idx]))
```

Class order (index -> label):

```
['Bacterial Blight', 'Bacterial Streak', 'Bakanae', 'Brown Spot', 'False Smut', 'Grassy Stunt Virus', 'Healthy', 'Hispa', 'Leaf Blast', 'Leaf Scald', 'Narrow Brown Spot', 'Neck Blast', 'Ragged Stunt Virus', 'Sheath Blight', 'Sheath Rot', 'Stem Rot', 'Tungro']
```

## Limitations

- **Rare classes are weakly supported.** Several classes have ~60-70 training images
  (Bacterial Streak, Bakanae, False Smut, Grassy Stunt Virus, Ragged Stunt Virus, Sheath Rot, Stem Rot); their F1 is unstable and driven by a handful of test images each.
- **Lab/field mix.** The source folders mix controlled-background and in-field imagery,
  and that correlates with class. Some of what the model learns is likely capture
  condition, not pathology.
- **Single-dataset evaluation.** No external validation set, so the lab->field
  generalisation gap is unmeasured. Expect a drop on genuinely new field imagery.
- **Residual label noise.** `Leaf Smut` was the clearest labelling failure, but the
  other classes were not audited image-by-image and may contain similar errors.
