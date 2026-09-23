# Frontend Changes Report (`frontend/`)

## Overview
Built a responsive, modern web application for rice leaf disease detection, visual lesion inspection, and agronomic triage using React 18, Vite, and Tailwind CSS.

## Added Files & Modules

### 1. Build & Configuration
* **`package.json`**: React 18, Vite, Tailwind CSS, Lucide Icons.
* **`vite.config.js`**: Vite config with API proxy to `http://localhost:8000`.
* **`tailwind.config.js` & `postcss.config.js`**: Custom agricultural emerald/forest palette.
* **`index.html`**: Application entrypoint with custom branding and typography.

### 2. UI Components (`src/components/`)
* **`disease/LeafUploader.jsx`**: Drag-and-drop file uploader, live webcam capture, and 5 one-click benchmark leaf presets (Bacterial Blight, Brown Spot, Leaf Blast, Tungro, Healthy).
* **`disease/DiagnosisResult.jsx`**: Primary condition card, confidence meter, differential diagnosis ranking, and CAM lesion heatmap overlay.
* **`disease/AgronomicTreatmentCard.jsx`**: Chemical dosages, biological remedies, and cultural practices for all 17 rice pathologies.
* **`disease/DiseaseCatalog.jsx`**: Searchable, filterable encyclopedia of all 17 supported rice leaf conditions.
* **`disease/ModelBenchmarkView.jsx`**: Interactive view of 94.82% benchmark accuracy and confusion matrix (`confusion_matrix.png`).
* **`disease/ReportModal.jsx`**: Printable / PDF exportable pathology field report.
* **`common/Header.jsx`**: Navigation bar, live backend connection detector, and status monitor.

### 3. Services & Data (`src/services/`, `src/data/`)
* **`services/api.js`**: Handles API requests to backend with automatic fallback to local intelligent diagnostics.
* **`data/riceDiseases.js`**: Scientific agronomic database for all 17 rice leaf conditions based on IRRI standards.

## Verification
* `npm run build`: Zero errors, built in 34.7s.
* `npm run dev`: Successfully served on `http://localhost:3000`.
