# Candidate Dataset Investigation Report: Rice Pest & Diseases

* **Project:** AI-Based Crop Health Monitoring, Disease Detection and Agricultural Decision Support System
* **Module 1:** Rice Crop Disease/Pest Risk Prediction using Agro-Meteorological Data
* **Candidate Dataset:** [Rice - Pest and Diseases (Kaggle)](https://www.kaggle.com/datasets/zsinghrahulk/rice-pest-and-diseases)
* **Local Raw File:** `ml-service/data/raw/RICE.csv` (1.67 MB, 1,674,099 bytes)
* **Associated Notebook:** `ml-service/notebooks/01_dataset_investigation.ipynb`
* **Investigation Date:** September 17, 2026
* **Investigator:** Member 1 (Machine Learning Engineer)

---

## 1. Executive Summary & Suitability Status

| Dimension | Assessment |
| :--- | :--- |
| **DATASET STATUS** | **POTENTIALLY SUITABLE (with strict domain segmentation & temporal splitting constraints)** |
| **Total Records** | **19,404 weekly surveillance records** |
| **Feature Count** | **14 columns** (8 meteorological, 2 temporal, 1 spatial, 2 categorical surveillance, 1 target metric) |
| **Missing Values** | **0 (0.00%)** explicit missing values |
| **Duplicate Rows** | **0 (0.00%)** exact duplicate records |
| **Geographic Scope** | **6 Agricultural Research Stations** across India (Cuttack, Ludhiana, Maruteru, Palampur, Raipur, Rajendranagar) |
| **Temporal Span** | **48 years (1959–2011)**; dense surveillance between 1995–2011 |
| **Pests & Diseases** | **11 biological entities:** 9 insect pests (88.1% of data) and 2 fungal diseases (11.9% of data: Leaf Blast, Neck Blast) |
| **Recommended ML Task** | **Agro-Meteorological Infestation Risk Classification** (Binary Outbreak Risk or Ordinal Risk Tiers) |

> ⚠️ **CRITICAL INVESTIGATION NOTE**  
> This evaluation is purely exploratory. **No machine learning models have been trained**, and no production pipelines or endpoints have been created. This dataset is a **candidate** dataset and must not be assumed to be the final dataset until team and supervisor alignment is finalized.

---

## 2. File and Structural Specifications

* **Files Included:** Exactly one CSV file: `RICE.csv`.
* **Exact Number of Records:** `19,404` rows.
* **Exact Number of Columns:** `14` columns.
* **Memory Usage:** ~2.1 MB in memory.

### Column-by-Column Domain Description

| # | Column Name | Pandas Dtype | Nature | Unit / Domain Meaning | Description & Operational Interpretation |
| :-: | :--- | :---: | :---: | :--- | :--- |
| 1 | `Observation Year` | `int64` | Temporal | Year (1959–2011) | Calendar year of weekly observation. 48 unique years. |
| 2 | `Standard Week` | `int64` | Temporal | Week (1–52) | Standard Meteorological Week (SMW). Captures annual cyclical rice crop stages (Kharif / Rabi seasons). |
| 3 | `Pest Value` | `float64` | Numerical | Heterogeneous | Quantitative observation metric. Represents light-trap catches for pests, or percentage leaf damage for blast disease. |
| 4 | `Collection Type` | `object` | Categorical | Method (5 classes) | Surveillance protocol used (`Number/Light trap`, `Percentage`, `Number/Pheromone trap`, `Percent Damage`, `Number/hill`). |
| 5 | `MaxT` | `float64` | Numerical | °C | Mean weekly maximum temperature. Key driver of insect metabolic rates. |
| 6 | `MinT` | `float64` | Numerical | °C | Mean weekly minimum temperature. Critical threshold for fungal spore survival and insect overwintering. |
| 7 | `RH1(%)` | `float64` | Numerical | % | Morning relative humidity (~07:00–08:30 IST). High values (>85%) drive fungal sporulation. |
| 8 | `RH2(%)` | `float64` | Numerical | % | Afternoon/evening relative humidity (~14:00 IST). Indicates daytime moisture retention. |
| 9 | `RF(mm)` | `float64` | Numerical | mm | Cumulative weekly rainfall. Influences leaf wetness and field microclimate. |
| 10 | `WS(kmph)` | `float64` | Numerical | km/h | Mean weekly wind speed. Influences spore dispersal and flying insect migration. |
| 11 | `SSH(hrs)` | `float64` | Numerical | hrs/day | Sunshine hours (mean daily bright sunshine duration). Overcast conditions reduce UV spore sterilization. |
| 12 | `EVP(mm)` | `float64` | Numerical | mm | Pan evaporation rate. Reflects atmospheric drying demand. |
| 13 | `PEST NAME` | `object` | Categorical | Species (11 classes) | Specific rice insect pest or disease monitored. |
| 14 | `Location` | `object` | Categorical | Station (6 classes) | Agricultural research station in India where surveillance occurred. |

---

## 3. Data Hygiene & Quality Audit

### 3.1 Missing Values
* **Explicit Missing Values (`null` / `NaN`):** `0` across all 19,404 rows and 14 columns (`0.00%`).
* **Implicit Whitespace Strings:** `0` whitespace-only entries detected in categorical features.
* **Negative Sentinels:** `0` negative values in any physical meteorological column.

### 3.2 Duplicate Records
* **Exact Duplicate Rows:** `0` exact duplicates across all 14 columns (`0.00%`).
* **Composite Key Uniqueness (`Observation Year`, `Standard Week`, `Location`, `PEST NAME`):** `0` duplicates. Every row uniquely represents a single pest/disease monitoring entry for a specific station in a given meteorological week.

### 3.3 Physical Outliers & Data Entry Errors
The IQR ($1.5 	imes 	ext{IQR}$) inspection revealed standard meteorological extremes alongside obvious data entry anomalies:
1. **Unrealistic Maximum Temperatures (`MaxT > 50°C`):**
   * Exactly 32 rows show `MaxT` between `65.6°C` and `71.6°C`.
   * All 32 rows occur at **Maruteru in 2011** across weeks 2, 5, 31, and 38.
   * **Agronomic Diagnosis:** These entries are unmistakable **Fahrenheit records** or unit conversion errors ($65.8^\circ	ext{F} pprox 18.8^\circ	ext{C}$, $71.6^\circ	ext{F} pprox 22.0^\circ	ext{C}$).
2. **Extreme Sunshine Hours (`SSH > 15 hrs`):**
   * 16 records show `SSH` values of `111.0` and `127.1` hours.
   * Also recorded at **Maruteru in 2011** (weeks 28 and 30). In a 24-hour day, sunshine cannot exceed 24 hours. These represent either cumulative weekly totals (e.g., ~16–18 hrs/day) or missing decimal points (`11.1` and `12.7` hrs).
3. **Heavy Rainfall (`RF(mm)` up to `444.4 mm`):**
   * Natural heavy monsoon precipitation events typical of coastal rice agro-ecosystems (Odisha, Andhra Pradesh). Valid biological signals.

---

## 4. Target Variable Investigation & Inherent Heterogeneity

### 4.1 Target Candidates Analyzed
1. **`Pest Value` (Continuous Numerical):** Mean = 807.94, Median = 3.0, Max = 311,169.
2. **`PEST NAME` (Categorical Multi-class):** 11 classes.
3. **`Risk_Binary` (Derived Binary Occurrence):** $y = 1$ if $	ext{Pest Value} > 0$, else $y = 0$.
4. **`Risk_Tier` (Derived Ordinal Risk Levels):** Low, Moderate, High risk classifications.

### 4.2 Critical Finding: The `Pest Value` Heterogeneity Trap
`Pest Value` **cannot be used as a single continuous target for a global ML regression model** across all rows. The underlying surveillance protocols differ fundamentally:
* **Fungal Diseases (`LeafBlast`, `NeckBlast`):**
  * Recorded strictly as `Percentage` leaf damage / infection rate.
  * Range: `0.00%` to `87.20%` (Leaf Blast) and `0.00%` to `29.12%` (Neck Blast).
* **Insect Pests (`Yellowstemborer`, `Brownplanthopper`, `Greenleafhopper`, etc.):**
  * Recorded primarily as `Number/Light trap` catches per week.
  * Range: `0` to `311,169` insects per trap.
* **Other Sampling Protocols:** `Number/Pheromone trap` (max = 371), `Percent Damage` (max = 40.02%), `Number/hill` (max = 19.4).

### 4.3 Zero-Inflation Analysis
* **Overall Zero Count:** **8,670 rows (44.68%)** have `Pest Value == 0`.
* **Zero-Inflation per Entity:**
  * `LeafBlast`: 79.47% zeroes (only 20.5% weeks exhibit active blast lesions).
  * `NeckBlast`: 88.46% zeroes.
  * `Gallmidge`: 61.77% zeroes.
  * `Brownplanthopper`: 40.09% zeroes.
  * `Greenleafhopper`: 35.99% zeroes.
  * `Yellowstemborer`: 35.33% zeroes.
  * `ZigZagleafhopper`: 3.21% zeroes.

---

## 5. Correlation & Ecological Signals

### 5.1 Global Correlation Dilution
When computing Pearson correlation across all 19,404 rows simultaneously, the correlation between weather features and `Pest Value` is essentially flat ($r \in [-0.048, +0.083]$). This occurs because aggregating distinct species with divergent ecological niches dilutes individual biological signals.

### 5.2 Pest-Specific Pathology Validation
When isolating specific biological entities, strong, pathologically consistent correlations emerge:
* **`LeafBlast` (*Magnaporthe oryzae*):**
  * Morning Humidity (`RH1`): **$+0.303$**
  * Evening Humidity (`RH2`): **$+0.346$**
  * Minimum Temperature (`MinT`): **$+0.186$**
  * Rainfall (`RF`): **$+0.197$**
  * Sunshine Hours (`SSH`): **$-0.216$**
  * **Pathological Meaning:** Rice blast epidemics require high relative humidity (>85%), warm night temperatures, rain splash, and overcast/cloudy days (low sunshine). The dataset captures this real-world epidemiological pattern accurately.
* **`Yellowstemborer` (*Scirpophaga incertulas*):**
  * Pan Evaporation (`EVP`): **$+0.222$**
  * Maximum Temperature (`MaxT`): **$+0.041$**
  * Wind Speed (`WS`): **$-0.093$**

---

## 6. Spatial and Temporal Dynamics

### 6.1 Agricultural Research Stations
All 6 locations correspond to major state/national rice research stations:
1. **Maruteru (Andhra Pradesh):** 7,053 records (1994–2011) — Coastal irrigated delta zone.
2. **Rajendranagar (Telangana):** 5,539 records (1975–2011) — Semi-arid Deccan plateau.
3. **Raipur (Chhattisgarh):** 2,132 records (1995–2009) — Central rice bowl of India.
4. **Ludhiana (Punjab):** 1,976 records (1995–2011) — Northern irrigated plain.
5. **Cuttack (Odisha):** 1,456 records (1959–2010) — ICAR-National Rice Research Institute (NRRI).
6. **Palampur (Himachal Pradesh):** 1,248 records (1984–2004) — Hill agro-ecosystem.

### 6.2 Data Leakage Considerations for Evaluation
1. **Temporal Leakage:** Shuffling records randomly across years will leak future seasonal weather patterns into past predictions. Evaluation splits **must follow temporal boundaries** (e.g., train on years $\le 2005$, test on years $> 2005$, or rolling-origin time-series cross-validation).
2. **Spatial Leakage:** Models evaluated across stations should utilize Group K-Fold (by station) if testing generalizability to unmonitored districts.
3. **Multi-Pest Co-Occurrence:** In any given week at a station, up to 9 pests are logged against identical weather features. Splitting rows randomly would place identical weather observations into both train and test partitions.

---

## 7. Machine Learning Problem Formulations for Module 1

| Formulation | ML Problem Type | Target Variable | Predictor Features | Feasibility | Recommendation |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Formulation A: Binary Infestation Risk** | **Binary Classification** | `Risk_Binary` ($0 = 	ext{None/Negligible}$, $1 = 	ext{Active Risk}$) | Weather variables + Lagged weather + Seasonality (`Standard Week`) + Pest entity | **Very High** | **PRIMARY RECOMMENDED APPROACH** |
| **Formulation B: Multi-Level Risk Tiering** | **Ordinal Classification** | `Risk_Level` (`Low`, `Medium`, `High`) | Weather variables + Lagged weather + Station + Week | **High** | Ideal for Recommendation Engine integration (Module 3) |
| **Formulation C: Leaf Blast Epidemic Prediction** | **Regression or Risk Tiering** | `LeafBlast % Severity` | `MaxT`, `MinT`, `RH1`, `RH2`, `RF`, `SSH`, `EVP` | **High** | High agronomic relevance; strong physical correlations |
| **Formulation D: Global Direct Count Prediction** | **Regression** | Raw `Pest Value` | All features | **Very Low** | **NOT RECOMMENDED** (Heterogeneous units, extreme skewness) |

---

## 8. Strengths, Weaknesses, and Final Recommendation

### Strengths
1. **Real-world Empirical Ground Truth:** 19,404 surveillance records from accredited Indian rice research centers over multiple decades.
2. **Complete Meteorological Coverage:** Captures 8 essential weather drivers of insect life cycles and pathogen spore biology.
3. **High Data Completeness:** Zero explicit missing values and zero duplicate rows.
4. **Demonstrable Domain Coherence:** Statistically verified alignment with rice blast epidemiology.
5. **Near-Ideal Binary Class Balance:** 44.68% negative vs. 55.32% positive records.

### Weaknesses & Limitations
1. **Target Unit Discordance:** `Pest Value` combines trap catches with percentage damage; cannot be used uniformly without pest stratification.
2. **Extreme Right-Skew:** Positive values span multiple orders of magnitude ($0$ to $311,169$).
3. **Physical Data Entry Anomalies:** Fahrenheit and misplaced decimal points in Maruteru (2011) that require explicit preprocessing and imputation.
4. **Lack of Crop Phenology & Soil Features:** No field planting dates, crop growth stages, soil moisture, or host variety resistance.
5. **Disease Under-Representation:** 88% insect pests; only 2 fungal diseases (Leaf Blast and Neck Blast) are included. Major diseases like Bacterial Leaf Blight and Sheath Blight are absent.

### Final Recommendation

> **RECOMMENDATION: POTENTIALLY SUITABLE (Proceed to Preprocessing Design under Formulation A or B)**  
> 
> The candidate dataset is statistically sound and biologically meaningful for predicting agro-meteorological pest and disease risk. It should proceed to the next exploratory stage with the following mandatory safeguards:
> 1. Formulate the problem as **Pest/Disease Risk Classification (Binary or Ordinal Alert Levels)** rather than raw multi-species regression.
> 2. Implement automated cleaning for known data entry anomalies (Fahrenheit conversion for `MaxT > 50°C`, decimal correction for `SSH > 24`).
> 3. Employ **temporal train/test splitting** (time-series blocking) to prevent temporal data leakage.
> 4. Keep this candidate dataset strictly isolated in `ml-service/data/raw/` without modifying the original source file.
