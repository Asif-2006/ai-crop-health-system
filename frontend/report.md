# Frontend Changes Report (`frontend/`)

## Overview
Built a responsive, modern web application for rice leaf disease detection, visual lesion inspection, and agronomic triage using React 18, Vite, and Tailwind CSS.

## Added Files & Modules

### 1. Build & Configuration
* **`package.json`**: React 18, Vite, Tailwind CSS, Lucide Icons.
* **`vite.config.js`**: Vite config with API proxy to `http://localhost:8000`.
* **`tailwind.config.js` & `postcss.config.js`**: Somerstone-inspired aesthetic featuring clean Manrope geometric grotesque typography, balanced light botanical palette (`#eef9f1`, `#e8f5e9`, soft emerald & mint accents), and subtle inner-card glow highlights.
* **`index.html`**: Application entrypoint configured with Google Fonts `Manrope` (weights 300 to 800) and responsive viewport settings.
* **`src/index.css`**: Fresh botanical pastel radial ambient background (`rgba(167, 243, 208, 0.55)`, `rgba(187, 247, 208, 0.6)`), `.card-hover` transition with emerald ambient sweep, and sleek scrollbars.

### 2. UI Components (`src/components/`)
* **`disease/LeafUploader.jsx`**: Drag-and-drop file uploader, live webcam capture, and one-click benchmark leaf presets with soft emerald borders and card-hover effects.
* **`disease/DiagnosisResult.jsx`**: Primary condition card, confidence meter, differential diagnosis ranking with emerald gradient meters, and CAM lesion heatmap overlay.
* **`disease/AgronomicTreatmentCard.jsx`**: Chemical dosages, biological remedies, and cultural practices for all 17 rice pathologies with distinct, crisp pastel card badges.
* **`disease/DiseaseCatalog.jsx`**: Searchable, filterable encyclopedia of all 17 supported rice leaf conditions with active emerald pills.
* **`disease/ModelBenchmarkView.jsx`**: Interactive view of 94.82% benchmark accuracy, per-class F1 metrics, and confusion matrix (`confusion_matrix.png`).
* **`disease/ReportModal.jsx`**: Printable / PDF exportable pathology field report with crisp ivory-white styling.
* **`common/Header.jsx`**: Minimalist Somerstone-style frosted header bar with emerald pill tabs, live backend connection detector, and status monitor.

### 3. Services & Data (`src/services/`, `src/data/`)
* **`services/api.js`**: Handles API requests to backend with automatic fallback to local intelligent diagnostics.
* **`data/riceDiseases.js`**: Scientific agronomic database for all 17 rice leaf conditions based on IRRI standards.

## Verification
* `npm run build`: Zero errors, successfully bundled.
* `npm run dev`: Successfully served on `http://localhost:3000`.
* Typography: Manrope with wide tracking and modern geometric proportions.
* Aesthetics: Light, balanced composition with cheerful pastel green & mint tones, avoiding dark/deep tones while eliminating sterile plainness, combined with inside div hover effects (`.card-hover`).
