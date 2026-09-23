# Computer Vision Service Report (`cv-service/`)

## Overview
Status of the `cv-service` directory and its active rice leaf pathology classification model.

## Code Status
* **Zero code modifications:** In compliance with project guidelines, **no existing code files were modified, edited, or removed** in `cv-service/`.
* Original inference (`predict.py`), evaluation scripts (`evaluate.py`), training pipelines (`models/.../train.py`), and experiment artifacts remain strictly intact.

## Model Weights Provisioning
* **File:** `cv-service/models/rice-leaf-disease-efficientnet-b0/model.safetensors` (16.3 MB).
* **Source:** Downloaded from official Hugging Face repository [`Huyt/rice-leaf-disease-efficientnet-b0`](https://huggingface.co/Huyt/rice-leaf-disease-efficientnet-b0).
* **Git Policy Compliance:** Automatically ignored by `.gitignore` (`*.safetensors`) in adherence to the monorepo's Large File Policy.

## Verification
* Executed inference:
  ```bash
  python cv-service/predict.py cv-service/test_images/image.jpg --cpu
  ```
* **Output:** Predicted **Brown Spot** with **90.57% confidence**, confirming the active model is completely operational.
