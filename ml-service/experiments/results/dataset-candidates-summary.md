# Dataset Candidates Summary

This document summarizes the investigation of the two candidate datasets evaluated for **Module 1** of the project (*Rice Crop Disease/Pest Risk Prediction using Agro-Meteorological Data*). Module 1 focuses on predicting rice **fungal disease risk** directly from agro-meteorological and environmental conditions.

---

## Candidate Dataset 1 — RICE.csv

* **Source / Name:** Candidate Dataset 1 (`RICE.csv`), sourced from Kaggle ("Rice - Pest and Diseases", collated from ICAR-AICRP historical surveillance records).
* **Content:** Contains 19,404 weekly observations spanning multiple research stations across India, featuring 8 meteorological parameters (Max/Min Temperature, Morning/Evening Relative Humidity, Rainfall, Wind Speed, Sun Shine Hours, and Evaporation) alongside insect pest and disease severity records.
* **Fungal Diseases Present:** Only two fungal diseases are present in the raw data: **LeafBlast** ($N=1,570$ rows) and **NeckBlast** ($N=520$ rows).
* **Observation Counts & Zero-Inflation:**
  * **LeafBlast:** 429 positive observations (Pest Value $> 0$) out of 1,570 records (27.3% positive rate).
  * **NeckBlast:** Only 24 positive observations (Pest Value $> 0$) out of 520 records (4.6% positive rate).
* **What We Formulated:** Because of the extreme sparsity of NeckBlast, the two diseases could not be modeled jointly. We engineered a single-disease, research-ready dataset (`leafblast_forecasting_dataset.csv`) consisting of 2,071 contiguous weekly observations formulated as a **LeafBlast next-week ($t+1$) binary early-warning risk prediction task**.
* **Reason for Not Selecting:** It does not provide sufficient multi-disease fungal data. NeckBlast has too few positive occurrences to support multi-class or multi-target fungal disease modeling, restricting the scope strictly to a single disease (LeafBlast).

### Relevant Links
* **Kaggle Dataset:** [Rice - Pest and Diseases](https://www.kaggle.com/datasets/zsinghrahulk/rice-pest-and-diseases)

---

## Candidate Dataset 2 — PMC8444092 / Dapoli Study

* **Paper / Source:** Research paper titled *"Rice crop disease prediction across diverse agro-meteorological conditions using an artificial intelligence approach"* (Patil & Kumar, *PeerJ Computer Science*, 2021; PMC8444092).
* **Content of the Public CSV:** The publicly available supplementary file (`peerj-cs-07-687-s001.csv`) contains 1,642 weekly weather records spanning 31 years (1989–2019). The recorded location is Karjat, Maharashtra (North Konkan zone). It contains 8 numerical meteorological variables (Temperature, Humidity, Precipitation, Wind Speed, Cloud Cover, Heat Index).
* **Claimed Target Classes:** The published paper claims a 5-class disease prediction system:
  1. Class 1: Healthy
  2. Class 2: Rice Blast (*Magnaporthe oryzae*)
  3. Class 3: Bacterial Blight (*Xanthomonas oryzae* pv. *oryzae*)
  4. Class 4: Brown Spot (*Bipolaris oryzae*)
  5. Class 5: False Smut (*Ustilaginoidea virens*)
* **Critical Problem with the Public Dataset:** **The publicly available supplementary CSV contains weather data only and has NO disease target or labels.** Furthermore, the accompanying notebook (`peerj-cs-07-687-s002.ipynb`) only executes a temperature regression model using a label-encoded week index. The disease-labeled data and classification model required to reproduce the 5-class predictions are completely absent from the public supplementary files.
* **Reason for Not Selecting:** It lacks the ground-truth disease labels necessary for supervised disease prediction. Supervised learning cannot be performed on this dataset in its public form without external or synthetic labels.

### Relevant Links
* **PeerJ Paper:** [Predicting rice diseases across diverse agro-meteorological conditions using an artificial intelligence approach](https://peerj.com/articles/cs-687/)
* **PMC Full-Text Paper:** [PMC8444092](https://pmc.ncbi.nlm.nih.gov/articles/PMC8444092/)
* **Supplemental Information 1 (Raw Meteorological CSV):** [peerj-cs-07-687-s001.csv](https://pmc.ncbi.nlm.nih.gov/articles/instance/8444092/bin/peerj-cs-07-687-s001.csv) ([DOI: 10.7717/peerj-cs.687/supp-1](https://doi.org/10.7717/peerj-cs.687/supp-1))
* **Supplemental Information 2 (Regression Code IPYNB):** [peerj-cs-07-687-s002.ipynb](https://pmc.ncbi.nlm.nih.gov/articles/instance/8444092/bin/peerj-cs-07-687-s002.ipynb) ([DOI: 10.7717/peerj-cs.687/supp-2](https://doi.org/10.7717/peerj-cs.687/supp-2))

---

## Final Decision

* **Candidate 1:** Real disease observations, but insufficient multi-disease fungal data for our intended Module 1.
* **Candidate 2:** Good weather data, but missing the disease labels required for supervised disease prediction.

**Conclusion:** Neither dataset is selected as the primary final dataset for Module 1.

**Next Step:** Search for **Candidate Dataset 3** containing **REAL agro-meteorological/environmental data + REAL fungal disease labels** with sufficient samples across multiple rice fungal diseases.

### Summary Comparison

| Candidate | Weather Data | Real Disease Labels | Multiple Useful Fungal Diseases | Decision |
|---|---|---|---|---|
| Dataset 1 | Yes | Yes | Insufficient | Not selected |
| Dataset 2 | Yes | No | No usable labels | Not selected |
