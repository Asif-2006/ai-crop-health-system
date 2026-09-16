# AI-Based Crop Health Monitoring, Disease Detection and Agricultural Decision Support System

## Project Overview

The **AI-Based Crop Health Monitoring, Disease Detection and Agricultural Decision Support System** is a two-semester final-year engineering project designed as a modular monorepo for a collaborative four-member team. The platform delivers an end-to-end intelligent agricultural management solution combining structured environmental risk forecasting, computer vision image analysis, automated agronomic recommendations, and a centralized farmer-facing application.

### Target Crop
* **Crop:** Rice (*Oryza sativa* / Paddy)
* **Significance:** Rice is a primary staple crop globally. Paddy cultivation is highly vulnerable to adverse environmental conditions, fungal and bacterial infections (such as Rice Blast, Bacterial Leaf Blight, Brown Spot, and Sheath Blight), and pest infestations. Early warning and accurate diagnosis are critical to ensuring food security and maximizing yield.

---

## Academic Timeline & Phased Scope

1. **Machine Learning Risk Prediction:** Development of ML models to predict rice crop disease risk utilizing structured agricultural, meteorological, and environmental data (temperature, humidity, rainfall, soil parameters).
2. **Farmer-Facing Web Application:** Responsive web interface enabling farmers and agricultural officers to register fields, track crop stages, view weather forecasts, and receive risk alerts.
3. **Agricultural Decision Support System:** Rules-based and knowledge-driven recommendation engine providing stage-specific agronomic advisories, preventive actions, and treatment recommendations.
4. **Computer Vision Disease Detection:** Deep learning models for visual diagnosis of paddy leaf diseases from field-captured photographs.
5. **Disease Severity Analysis:** Automated quantification of infected leaf area and severity grading to guide targeted remediation.
6. **Multimodal System Integration:** Unified synthesis combining visual leaf disease diagnostics with environmental ML disease-risk predictions to provide comprehensive decision support.

---

## Team Module Ownership Boundaries

This project is architected into four distinct modules developed independently by each team member:

| Member | Module | Primary Scope | Primary Directories |
| :--- | :--- | :--- | :--- |
| **Member 1** | **Machine Learning** | Crop Disease Risk Prediction from structured environmental/weather data | `ml-service/` |
| **Member 2** | **Computer Vision** | Rice Leaf Disease Detection, Severity Analysis, and visual explainability | `cv-service/` |
| **Member 3** | **Decision Support** | Agricultural Decision Support and Agronomic Recommendation Engine | `recommendation-service/` |
| **Member 4** | **Application & Integration** | Farmer Web App, Backend API Gateway, Database Architecture, and System Integration | `frontend/`, `backend/`, `shared/`, `tests/` |

> **Independent Development Note:** Each service is designed with clear domain boundaries and contracts. Team members develop, test, and containerize their respective modules independently while conforming to shared API specifications.

---

## High-Level System Architecture

```
                                +---------------------------+
                                |  Farmer / Agronomist Web  |
                                |     (React + Tailwind)    |
                                +-------------+-------------+
                                              |
                                              | REST APIs / JSON
                                              v
                                +---------------------------+
                                |    Backend API Gateway    |
                                |    (Node.js / Express)    |
                                +------+------+------+------+
                                       |      |      |
                 +---------------------+      |      +---------------------+
                 | REST                       | REST                       | REST
                 v                            v                            v
    +-------------------------+  +-------------------------+  +-------------------------+
    |    ML Risk Service      |  |    CV Disease Service   |  | Recommendation Service  |
    |    (Python / FastAPI)   |  |    (Python / FastAPI)   |  |   (Python / FastAPI)    |
    +-------------------------+  +-------------------------+  +-------------------------+
                 |                            |                            |
                 +---------------------+      |      +---------------------+
                                       |      |      |
                                       v      v      v
                                +---------------------------+
                                |     Database Layer        |
                                |   (PostgreSQL / MongoDB)  |
                                |   `backend/src/database`  |
                                +---------------------------+
```

### Technology Stack
* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express.js
* **ML Service:** Python, FastAPI, Scikit-learn
* **CV Service:** Python, FastAPI, PyTorch / TensorFlow
* **Recommendation Service:** Python, FastAPI, Knowledge Base
* **Database:** PostgreSQL or MongoDB (managed strictly via `backend/src/database/`)
* **Communication:** REST APIs via standardized JSON contracts (`shared/api-contracts/`)
* **Containerization & Deployment:** Docker, Docker Compose, Nginx

---

## Large File & Dataset Policy

To maintain optimal Git repository performance and adhere to best engineering practices, **large binary artifacts, datasets, and trained model weights MUST NOT be committed to Git**.

### Excluded Artifacts:
* **Raw & Processed Datasets:** CSV, TSV, Parquet, SQLite, and raw tabular files.
* **Dataset Imagery:** Raw leaf image datasets (JPG, PNG, TIFF, etc.).
* **Trained ML/CV Models:** `.pkl`, `.joblib`, `.h5`, `.keras`, `.pt`, `.pth`, `.onnx`, `.tflite`, `.bin`, `.weights`, and model checkpoints.
* **Experiment Artifacts:** TensorBoard logs, WandB runs, and checkpoint directories.

All directories meant to host datasets and models (such as `ml-service/data/`, `cv-service/data/`, and `experiments/`) contain `.gitkeep` files to preserve the folder structure within Git. Actual datasets and trained model weights must be stored in external cloud storage (e.g., Google Drive, AWS S3, or Zenodo) and fetched using data ingestion scripts.

---

## Git Workflow & Sparse Checkout

### Branching Model

```
main
│
├── member-1-ml
├── member-2-cv
├── member-3-recommendation
└── member-4-frontend-backend
```

* `main`: Production-ready, integrated, and verified codebase.
* Feature branches are maintained individually by each team member for their respective module.

### Working with Git Sparse Checkout

Because this repository is a monorepo containing multiple independent sub-services, team members do not need to check out the entire codebase when working on their specific modules. Git sparse checkout enables downloading only the folders relevant to your work.

#### 1. Clone with Blob Filter (Saves Bandwidth and Disk Space)
```bash
git clone --filter=blob:none --sparse <repository-url>
cd ai-crop-health-system
```

#### 2. Configure Sparse Checkout by Module

* **Frontend Developer (Member 4 - UI):**
  ```bash
  git sparse-checkout set frontend shared
  ```

* **Backend & Integration Developer (Member 4 - API & DB):**
  ```bash
  git sparse-checkout set backend frontend shared tests deployment
  ```

* **Machine Learning Engineer (Member 1):**
  ```bash
  git sparse-checkout set ml-service shared
  ```

* **Computer Vision Engineer (Member 2):**
  ```bash
  git sparse-checkout set cv-service shared
  ```

* **Agricultural Decision Support Engineer (Member 3):**
  ```bash
  git sparse-checkout set recommendation-service shared
  ```

#### 3. Returning to Full Checkout (When Integrating)
```bash
git sparse-checkout disable
```

---

## Repository Structure

```
ai-crop-health-system/
│
├── README.md
├── .gitignore
├── .env.example
├── docker-compose.yml
├── LICENSE
│
├── docs/
│   ├── project-proposal/
│   ├── architecture/
│   ├── research/
│   └── reports/
│       ├── semester-7/
│       └── semester-8/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   ├── dashboard/
│       │   ├── field/
│       │   ├── prediction/
│       │   ├── disease/
│       │   └── recommendation/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── utils/
│       └── routes/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── database/
│       │   ├── migrations/
│       │   ├── seed/
│       │   └── schema/
│       ├── middleware/
│       ├── modules/
│       │   ├── auth/
│       │   ├── users/
│       │   ├── fields/
│       │   ├── risk-prediction/
│       │   ├── disease-analysis/
│       │   ├── recommendations/
│       │   └── history/
│       ├── services/
│       ├── models/
│       ├── routes/
│       └── utils/
│
├── ml-service/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── preprocessing/
│   │   └── prediction/
│   ├── notebooks/
│   ├── data/
│   │   ├── raw/
│   │   └── processed/
│   ├── experiments/
│   │   ├── results/
│   │   └── figures/
│   └── tests/
│
├── cv-service/
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── preprocessing/
│   │   ├── prediction/
│   │   └── explainability/
│   ├── notebooks/
│   ├── data/
│   │   ├── raw/
│   │   └── processed/
│   ├── experiments/
│   │   ├── model-comparison/
│   │   ├── results/
│   │   └── figures/
│   └── tests/
│
├── recommendation-service/
│   ├── app/
│   │   ├── api/
│   │   ├── engine/
│   │   ├── knowledge_base/
│   │   └── services/
│   ├── data/
│   │   └── verified-agricultural-data/
│   └── tests/
│
├── shared/
│   ├── api-contracts/
│   └── schemas/
│
├── tests/
│   ├── integration/
│   └── end-to-end/
│
└── deployment/
    ├── docker/
    ├── nginx/
    └── docker-compose/
```

---

## License

This project is open source and available under the terms of the [MIT License](LICENSE).
