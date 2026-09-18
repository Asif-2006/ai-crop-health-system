# Research-Ready Forecasting Dataset Preparation: Rice Leaf Blast

* **Project:** AI-Based Crop Health Monitoring, Disease Detection and Agricultural Decision Support System
* **Module 1:** Rice Crop Disease/Pest Risk Prediction using Agro-Meteorological Data
* **Sub-Task:** Early-Warning Forecasting Dataset Construction & Validation
* **Target Disease:** Rice Leaf Blast (*Magnaporthe oryzae*)
* **Raw Source File:** `ml-service/data/raw/RICE.csv` (1.67 MB, completely unchanged)
* **Processed Dataset File:** `ml-service/data/processed/leafblast_forecasting_dataset.csv` (412.4 KB)
* **Associated Notebook:** `ml-service/notebooks/03_leafblast_forecasting_preparation.ipynb`
* **Investigation Date:** September 17, 2026
* **Investigator:** Member 1 (Machine Learning Engineer)

---

## 1. Executive Summary & Verification Matrix

| Dimension | Raw LeafBlast Records | Deduplicated Clean Records | Research-Ready Forecasting Records |
| :--- | :--- | :--- | :--- |
| **Row Count** | **2,090 rows** | **2,081 rows** | **2,071 rows** |
| **Feature Count** | 14 columns | 12 columns | **35 columns** (features + target + metadata) |
| **Locations Covered** | Palampur (1,092), Rajendranagar (998) | Palampur (1,092), Rajendranagar (989) | Palampur (1,089), Rajendranagar (982) |
| **Years Represented** | 1984–2004 (21 unique years) | 1984–2004 (21 unique years) | 1984–2004 (21 unique years) |
| **Target Variable** | Raw `Pest Value` (% severity) | Deduplicated `Pest Value` | **`LeafBlast_Risk_NextWeek` ($y_{t+1} \in \{0, 1\}$)** |
| **Negative Class (0)** | 1,661 rows (79.47%) | 1,652 rows (79.38%) | **1,642 rows (79.29%)** |
| **Positive Class (1)** | 429 rows (20.53%) | 429 rows (20.62%) | **429 rows (20.71%)** |
| **Missing Values** | 0 (0.00%) | 0 (0.00%) | **0 (0.00%)** |
| **ML Status** | **No models trained** | **No models trained** | **Dataset ready for baseline modeling** |

---

## 2. In-Depth Report on Required Items (A through L)

### A. Verified Dataset Size & Resolution of Mathematical Inconsistency
* **Actual Raw LeafBlast Records in `RICE.csv`:** Exactly **`2,090`** rows.
* **Resolution of the 2,184 vs. 2,090 Inconsistency:**
  * The earlier investigation report contained a hypothetical formula: $21 \text{ years} \times 52 \text{ weeks} \times 2 \text{ stations} = 2,184 \text{ observations}$.
  * However, direct independent verification from `RICE.csv` reveals that surveillance at **Rajendranagar was NOT fully symmetric** with Palampur:
    1. **Palampur (1984–2004):** Exactly **52 weeks** monitored in all 21 years = **`1,092` rows** (100% complete and contiguous).
    2. **Rajendranagar (1984–1999):** Exactly **52 weeks** monitored in 16 years = **`832` rows**.
    3. **Rajendranagar 2000:** **61 rows** (Weeks 1 to 9 each appeared twice with slightly different weather entries: **+9 duplicate records**).
    4. **Rajendranagar 2001:** **1 row** (Only Week 44 was monitored; Weeks 1–43 and 45–52 are missing: **-51 missing records**).
    5. **Rajendranagar 2002–2003:** Exactly **52 weeks** in each of the 2 years = **`104` rows**.
    6. **Rajendranagar 2004:** **0 rows** (Disease monitoring was discontinued at Rajendranagar: **-52 missing records**).
  * **Mathematical Reconcilation:**
    $$\text{Total} = 1,092 + (832 + 61 + 1 + 104 + 0) = 1,092 + 998 = \mathbf{2,090} \text{ rows}$$
    $$(2,184 + 9 - 51 - 52 = \mathbf{2,090})$$

### B. Verified Years
* **Years Represented:** **1984 to 2004** (21 unique calendar years).
* In Palampur: All 21 years are present and complete.
* In Rajendranagar: Years 1984–2000, 2002–2003 are complete; 2001 has 1 week; 2004 has 0 weeks.

### C. Verified Locations
* Surveillance for Leaf Blast exists at **only two research stations** in India:
  1. **Palampur (Himachal Pradesh):** 1,092 raw rows (52.25%). Sub-temperate hill ecology.
  2. **Rajendranagar (Telangana):** 998 raw rows (47.75%). Semi-arid tropical Deccan plateau.
* The remaining 4 stations in `RICE.csv` (Cuttack, Ludhiana, Maruteru, Raipur) monitored **only insect pests** and have zero disease surveillance entries.

### D. Data Gaps in the Time Series
1. **Rajendranagar 2001 Gap:** Weeks 1 to 43 and Weeks 45 to 52 are missing (51-week gap). Week 44 is an isolated observation without preceding or subsequent contiguous weeks.
2. **Rajendranagar 2004 Gap:** Entire year (Weeks 1 to 52) is absent.
3. **Palampur:** Zero temporal gaps. All 21 years (1,092 weeks) form an unbroken time series.

### E. Data-Quality Issues & Suspicious Records
1. **Duplicate Weeks in Rajendranagar (Year 2000, Weeks 1–9):**
   * Exactly 18 records (9 duplicate pairs) exist. Both entries for each week reported `Pest Value = 0.0`, but with slight variations in temperature and humidity readings.
   * *Resolution for forecasting pipeline:* Deduplicated by averaging weather features and taking the maximum `Pest Value`, reducing 18 rows to 9 clean weekly rows.
2. **Extreme Pan Evaporation (`EVP > 30 mm`):**
   * Exactly 17 records at Palampur exhibit `EVP` between $30.9$ and $48.4\text{ mm}$ (1984 Weeks 19–24, 27–32; and 1989 Weeks 14–20).
   * *Action Taken:* As strictly instructed, these values are **documented and preserved** without silent manipulation, as they reflect dry pre-monsoon heat conditions in the foothills.
3. **No Sensor/Fahrenheit Errors:**
   * Unlike Maruteru (which had `MaxT > 65°C`), LeafBlast has **zero unit conversion errors** (`MaxT` spans $10.9^\circ\text{C}$ to $42.5^\circ\text{C}$; `MinT` spans $0.8^\circ\text{C}$ to $28.3^\circ\text{C}$; `SSH` spans $0.5$ to $12.3\text{ hrs/day}$).

### F. Early-Warning Target Definition
* **Target Variable:** `LeafBlast_Risk_NextWeek` ($y_{t+1} \in \{0, 1\}$)
* **Mathematical Definition:**
  $$y_{t+1} = \begin{cases} 1 & \text{if } \text{Pest Value at Week } t+1 > 0 \text{ (Active Leaf Blast Infection Detected)} \\ 0 & \text{if } \text{Pest Value at Week } t+1 = 0 \text{ (Disease-Free / Inoculum Dormant)} \end{cases}$$
* **Early-Warning Horizon:** Exactly **1 week into the future** ($t+1$). This gives agricultural extension officers and farmers 7 days of advance lead time to deploy preventive bio-fungicides or water management practices before symptoms spread.

### G. Feature Definitions (Available at Prediction Time $t$)
All 31 input features are strictly constrained to current and past information ($t, t-1, t-2$):

1. **Current Week Weather ($t$):**
   * `MaxT`, `MinT` (Weekly maximum and minimum temperature in °C)
   * `RH1`, `RH2` (Morning and evening relative humidity in %)
   * `RF` (Cumulative rainfall in mm)
   * `WS` (Mean wind speed in km/h)
   * `SSH` (Mean bright sunshine hours per day)
   * `EVP` (Pan evaporation in mm)
2. **1-Week Lagged Weather ($t-1$):**
   * `MaxT_lag1`, `MinT_lag1`, `RH1_lag1`, `RH2_lag1`, `RF_lag1`, `WS_lag1`, `SSH_lag1`, `EVP_lag1`
3. **2-Week Lagged Weather ($t-2$):**
   * `MaxT_lag2`, `MinT_lag2`, `RH1_lag2`, `RH2_lag2`, `RF_lag2`, `WS_lag2`, `SSH_lag2`, `EVP_lag2`
4. **2-Week Rolling Historical Aggregations over $[t-1, t]$:**
   * `RH1_roll_mean_2w`: 2-week average morning relative humidity
   * `RH2_roll_mean_2w`: 2-week average evening relative humidity (strongest predictive signal)
   * `MinT_roll_mean_2w`: 2-week average minimum night temperature
   * `RF_roll_sum_2w`: 2-week cumulative precipitation
5. **Seasonality & Context:**
   * `sin_week = sin(2π × Standard Week / 52)` (Cyclical week encoding)
   * `cos_week = cos(2π × Standard Week / 52)` (Cyclical week encoding)
   * `Location` (Categorical station baseline)
   * `Observation Year`, `Standard Week` (Metadata keys)
   * `Pest_Value_CurrentWeek` (Current week severity, retained for baseline monitoring)

### H. Leakage Prevention Strategy
1. **Zero Future Weather Lookahead:** Weather at week $t+1$ is never included in the feature set.
2. **Zero Target Feedback:** Disease status at week $t+1$ is strictly the target $y_{t+1}$ and is never used as an input feature.
3. **Strict Lag Alignment:** Lags are computed chronologically within each station. Lags never cross across locations or across disconnected time gaps (e.g., 2001 Week 44 does not borrow from 2000).
4. **Appropriately Shifted Rolling Features:** Rolling aggregations cover only the 2-week window ending at the current observation week $t$ ($[t-1, t]$).
5. **Boundary Truncation:** Records where preceding lags ($t-1, t-2$) or the succeeding week ($t+1$) do not exist are excluded.

### I. Target Class Distribution
* **Total Usable Samples:** **`2,071`**
* **Class 0 (No Outbreak / Dormant):** **`1,642` records (`79.29%`)**
* **Class 1 (Active Outbreak):** **`429` records (`20.71%`)**
* **Class Balance by Location:**
  * **Palampur:** Class 0 = 78.79%, Class 1 = **21.21%** (231 positive weeks)
  * **Rajendranagar:** Class 0 = 79.84%, Class 1 = **20.16%** (198 positive weeks)
* **Assessment:** The target class balance is virtually identical between both agro-climatic zones (~79.3% vs. ~20.7%), providing a reliable epidemiological target for early-warning binary classification.

### J. Proposed Chronological Train / Validation / Test Split

| Split | Chronological Range | Calendar Years | Total Samples | Proportion (%) | Class 0 (No Risk) | Class 1 (Outbreak) | Positive Rate (%) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **TRAIN** | **1984–1998** | 15 continuous years | **`1,556`** | **75.13%** | 1,255 | 301 | **19.34%** |
| **VALIDATION** | **1999–2001** | 3 years | **`259`** | **12.51%** | 194 | 65 | **25.10%** |
| **TEST** | **2002–2004** | 3 future years | **`256`** | **12.36%** | 193 | 63 | **24.61%** |
| **Total** | **1984–2004** | **21 years** | **`2,071`** | **100.00%** | **1,642** | **429** | **20.71%** |

#### Why this Chronological Split is Statistically & Agronomically Superior:
1. **Guaranteed Future Generalization:** The Test set represents strictly unseen future years (2002–2004). This simulates deploying the model in a real agricultural forecasting system where historical data predicts future growing seasons.
2. **Ample Positive Events in All Partitions:**
   * Train has 301 positive outbreaks across 15 years.
   * Validation has 65 positive outbreaks across 3 years.
   * Test has 63 positive outbreaks across 3 years.
3. **Balanced Station Representation in Train:** The training set contains exactly 778 samples from Palampur and 778 samples from Rajendranagar (50:50 balance).
4. **Note on Test Station Distribution:** In the Test set (2002–2004), years 2002 and 2003 contain observations from both Palampur and Rajendranagar, while 2004 contains observations only from Palampur because disease surveillance at Rajendranagar concluded in 2003.

### K. Usable Forecasting Samples Audit
* **Starting Raw LeafBlast Rows:** `2,090`
* **Deduplication of Rajendranagar 2000 duplicate weeks:** `-9` rows $\implies 2,081$ rows
* **Boundary Truncation (Missing lags or next week):** `-10` rows $\implies \mathbf{2,071}$ rows
  * *Palampur (3 rows removed):* 1984 Wk 1 & Wk 2 (no prior history), 2004 Wk 52 (no next week).
  * *Rajendranagar (7 rows removed):* 1984 Wk 1 & Wk 2 (no prior history), 2000 Wk 52 (2001 Wk 1 missing), 2001 Wk 44 (isolated week), 2002 Wk 1 & Wk 2 (2001 missing), 2003 Wk 52 (2004 unmonitored).
* **Final Usable Research-Ready Rows:** Exactly **`2,071`** rows.

### L. Final Recommendation

> **RECOMMENDATION: PROCEED TO ML BASELINE EXPERIMENTATION**  
> 
> 1. The dataset `ml-service/data/processed/leafblast_forecasting_dataset.csv` is **officially research-ready**. It contains zero missing values, zero synthetic interpolations, strictly historical features, and an authentic next-week ground truth target.
> 2. The next experimentation phase can safely proceed to evaluating baseline classifiers (e.g. Dummy/Baseline, Logistic Regression, Random Forest, LightGBM/XGBoost) using the verified chronological train/validation/test split.
> 3. Primary optimization metric must be **PR-AUC (Precision-Recall AUC)** and **Recall/Sensitivity at high specificity**, ensuring farmers receive timely warnings before blast epidemics develop.
