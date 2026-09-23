// Comprehensive Agronomic Knowledge Base for 17 Rice Leaf Pathologies
// Based on IRRI (International Rice Research Institute) guidelines and model configuration

export const RICE_DISEASES = {
  "Bacterial Blight": {
    name: "Bacterial Blight",
    pathogen: "Xanthomonas oryzae pv. oryzae",
    type: "Bacterial",
    severityDefault: "Severe",
    description: "One of the most destructive rice diseases worldwide, causing longitudinal yellowing and wilting of leaf blades.",
    symptoms: [
      "Water-soaked stripes along leaf margins starting from tip downwards",
      "Lesions turn yellow to straw-colored with wavy margins",
      "Milky bacterial exudate droplets on young lesions in humid mornings",
      "Severe infection causes 'kresek' (seedling wilt) or complete leaf death"
    ],
    favorableConditions: "Temperature 25-34°C, relative humidity > 70%, high nitrogen fertilizer, strong monsoon winds and rainstorms.",
    chemicalControl: [
      "Copper oxychloride 50 WP @ 2.5 g/L + Streptocycline @ 0.1 g/L",
      "Copper hydroxide 77 WP @ 2.0 g/L at early lesion stage",
      "Avoid excessive nitrogenous fertilization during active outbreak"
    ],
    biologicalControl: [
      "Foliar spray of Pseudomonas fluorescens @ 5 g/L or 2.5 kg/ha",
      "Bacillus subtilis biological formulation as seed treatment and foliar spray"
    ],
    culturalPractices: [
      "Ensure proper field drainage and avoid stagnant deep water",
      "Adopt split application of nitrogenous fertilizers with adequate potash (K2O)",
      "Plant resistant paddy cultivars (e.g., IR64-Sub1, Improved Samba Mahsuri)"
    ]
  },
  "Bacterial Streak": {
    name: "Bacterial Streak",
    pathogen: "Xanthomonas oryzae pv. oryzicola",
    type: "Bacterial",
    severityDefault: "Moderate",
    description: "Characterized by narrow, water-soaked, translucent interveinal streaks that coalesce and turn brown.",
    symptoms: [
      "Fine, narrow water-soaked streaks restricted between veins",
      "Streaks darken from light yellow to brown or reddish-brown",
      "Tiny yellow bacterial ooze beads on surface during high humidity",
      "Severely damaged leaves turn brown and die prematurely"
    ],
    favorableConditions: "High ambient temperature (28-32°C), high humidity, heavy monsoon rains with mechanical leaf friction.",
    chemicalControl: [
      "Spray Streptocycline @ 100 ppm (1 g/10 L) mixed with Copper oxychloride @ 2 g/L",
      "Zinc sulfate @ 2% foliar spray to strengthen leaf epidermal resistance"
    ],
    biologicalControl: [
      "Apply Pseudomonas fluorescens talc formulation @ 10 g/L",
      "Neem seed kernel extract (NSKE) 5% foliar spray"
    ],
    culturalPractices: [
      "Avoid handling crops or weeding when leaves are wet to prevent mechanical transmission",
      "Balance NPK nutrition; supplement silicon fertilizers"
    ]
  },
  "Bakanae": {
    name: "Bakanae (Foolish Seedling)",
    pathogen: "Fusarium fujikuroi",
    type: "Fungal",
    severityDefault: "Severe",
    description: "Causes infected seedlings to grow abnormally tall, slender, and chlorotic due to excessive gibberellic acid secretion.",
    symptoms: [
      "Abnormally elongated, thin, yellowish seedlings in seedbed and field",
      "Pale green to chlorotic foliage with adventitious roots from lower nodes",
      "Pinkish to white fungal sporulation visible near soil line on stem",
      "Infected plants often produce empty panicles or die before flowering"
    ],
    favorableConditions: "Soil and air temperature 30-35°C, high seedling density, contaminated seed lots.",
    chemicalControl: [
      "Seed treatment with Carbendazim 50 WP @ 2 g/kg seed before sowing",
      "Foliar spray with Trifloxystrobin + Tebuconazole @ 0.4 g/L if spotted in nursery"
    ],
    biologicalControl: [
      "Trichoderma harzianum or T. viride seed treatment @ 10 g/kg seed",
      "Soil application of Trichoderma-enriched farmyard manure"
    ],
    culturalPractices: [
      "Use certified disease-free seeds from trusted agricultural sources",
      "Salt-water flotation to eliminate light, infected seeds before nursery bed sowing",
      "Rogue out and burn abnormally tall seedlings immediately"
    ]
  },
  "Brown Spot": {
    name: "Brown Spot",
    pathogen: "Bipolaris oryzae (Helminthosporium oryzae)",
    type: "Fungal",
    severityDefault: "Moderate",
    description: "Classic chronic fungal disease prominent in nutrient-deficient and water-stressed soils; famous historically for the 1943 Bengal famine.",
    symptoms: [
      "Oval or circular dark brown spots with distinct yellow halos",
      "Fully developed lesions have gray or whitish center with reddish-brown margin",
      "Spots appear on leaves, coleoptile, sheaths, and glumes (discolored grain)",
      "Coalescing lesions cause extensive leaf blighting and poor grain filling"
    ],
    favorableConditions: "Temperature 25-30°C, RH > 85%, nutrient-deficient (low silicon, potassium, zinc) or water-stressed soils.",
    chemicalControl: [
      "Mancozeb 75 WP @ 2.5 g/L or Propiconazole 25 EC @ 1 mL/L",
      "Edifenphos 50 EC @ 1 mL/L or Tricyclazole 75 WP @ 0.6 g/L at tillering",
      "Apply potassium and zinc sulfate to remedy nutritional stress"
    ],
    biologicalControl: [
      "Seed soaking with Pseudomonas fluorescens @ 10 g/L for 12 hours",
      "Trichoderma viride foliar suspension @ 5 g/L"
    ],
    culturalPractices: [
      "Correct soil nutrient deficiencies by applying recommended doses of potash and zinc",
      "Maintain continuous shallow irrigation during tillering and panicle development",
      "Burn or decompose infected crop residues after harvest"
    ]
  },
  "False Smut": {
    name: "False Smut (Green Smut)",
    pathogen: "Ustilaginoidea virens",
    type: "Fungal",
    severityDefault: "Severe",
    description: "Panicle disease transforming individual rice grains into large velvety greenish-yellow fungal balls.",
    symptoms: [
      "Individual grain transformed into velvety spore balls (1 cm diameter)",
      "Color transitions from orange-yellow to dark olive-green or blackish",
      "Fungal chlamydospores burst and contaminate neighboring grains",
      "Reduced milling quality and potential mycotoxin contamination"
    ],
    favorableConditions: "Relative humidity > 90%, temperature 25-30°C, heavy rains during flowering, high nitrogen application.",
    chemicalControl: [
      "Copper hydroxide 77 WP @ 2.0 g/L or Propiconazole 25 EC @ 1.0 mL/L at booting stage",
      "Trifloxystrobin + Tebuconazole @ 0.4 g/L prior to panicle emergence"
    ],
    biologicalControl: [
      "Pseudomonas fluorescens @ 5 g/L spray at 50% boot-leaf stage",
      "Neem seed oil extract 3% spray during early panicle formation"
    ],
    culturalPractices: [
      "Avoid excessive late-stage nitrogen fertilizer top-dressing",
      "Early planting to avoid flowering during peak autumn rain/dew periods",
      "Destroy and incinerate smut balls during manual rogueing"
    ]
  },
  "Grassy Stunt Virus": {
    name: "Grassy Stunt Virus (RGSV)",
    pathogen: "Rice grassy stunt tenuivirus (Vector: Nilaparvata lugens / Brown Planthopper)",
    type: "Viral",
    severityDefault: "Severe",
    description: "Viral disorder transmitted persistently by the Brown Planthopper (BPH), leading to severe stunting and excessive tillering.",
    symptoms: [
      "Severe stunting with a bunchy, grassy appearance",
      "Excessive number of erect, narrow, stiff tillers",
      "Leaves turn pale green, yellowish, or mottled with rust-colored spots",
      "Infected plants produce few or no panicles with unfilled dark grains"
    ],
    favorableConditions: "Continuous submerged fields, high nitrogen, warm temperatures promoting rapid brown planthopper population surges.",
    chemicalControl: [
      "Target vector insects: Dinotefuran 20 SG @ 0.4 g/L or Pymetrozine 50 WG @ 0.6 g/L",
      "Imidacloprid 17.8 SL @ 0.3 mL/L directed at stem bases where planthoppers congregate"
    ],
    biologicalControl: [
      "Conserve natural predators: spiders (Lycosa pseudoannulata), mirid bugs, and damselflies",
      "Spray Beauveria bassiana entomopathogenic fungus @ 5 g/L"
    ],
    culturalPractices: [
      "Synchronous planting across surrounding village fields to break insect lifecycle",
      "Alternate wetting and drying (AWD) water management to displace planthoppers",
      "Deploy BPH-resistant varieties (e.g., IR36, IR64)"
    ]
  },
  "Healthy": {
    name: "Healthy Rice Leaf",
    pathogen: "None (Physiological / Normal)",
    type: "Healthy",
    severityDefault: "None",
    description: "Vibrant, green, turgid rice leaf showing uniform photosynthetic coloration without pathogenic lesions.",
    symptoms: [
      "Uniform deep green or emerald color across lamina",
      "Clean leaf edges without wilting, chlorosis, or necrotic streaks",
      "Strong vascular turgidity and intact leaf sheath integrity",
      "No pest feeding marks, fungal spores, or bacterial exudate"
    ],
    favorableConditions: "Balanced nutrition (N:P:K 100:50:50), adequate sunlight, monitored irrigation, integrated pest management.",
    chemicalControl: [
      "No chemical action required",
      "Maintain preventative prophylactic monitoring and nutrient balance"
    ],
    biologicalControl: [
      "Periodic prophylactic spray of cow urine / fermented bio-enhancers or Trichoderma",
      "Promote beneficial microbial biodiversity in soil and rhizosphere"
    ],
    culturalPractices: [
      "Continue regular crop scouting every 3-5 days during critical growth stages",
      "Maintain proper water depth (2-5 cm during vegetative, drying near harvest)",
      "Ensure weed-free field bunds and borders"
    ]
  },
  "Hispa": {
    name: "Rice Hispa",
    pathogen: "Dicladispa armigera (Coleoptera: Chrysomelidae)",
    type: "Insect Pest",
    severityDefault: "Moderate",
    description: "Spiny beetle pest whose grubs mine inside leaf parenchyma while adults scrape green chlorophyll off upper surfaces.",
    symptoms: [
      "Characteristic white parallel streaks on leaf surface caused by scraping adults",
      "Blister-like leaf mines formed by tunneling grubs near leaf tips",
      "Affected leaves wither, dry up, and acquire a scorched whitish appearance",
      "Field exhibits a burned, bleached appearance in severe infestations"
    ],
    favorableConditions: "Humid cloudy weather, low-lying waterlogged fields, dense shaded canopies with excess nitrogen.",
    chemicalControl: [
      "Chlorpyriphos 20 EC @ 2.5 mL/L or Quinalphos 25 EC @ 2.0 mL/L",
      "Cartap hydrochloride 50 SP @ 1.5 g/L or Flubendiamide 39.35 SC @ 0.2 mL/L"
    ],
    biologicalControl: [
      "Release egg parasitoids: Trichogramma zahiri",
      "Use entomopathogenic fungus Beauveria bassiana @ 5 g/L"
    ],
    culturalPractices: [
      "Clip and destroy affected leaf tips in seedbeds before transplanting to remove grub eggs",
      "Sweep-netting adults in morning hours when beetles are sluggish",
      "Drain standing water for 2-3 days to suppress pupation"
    ]
  },
  "Leaf Blast": {
    name: "Leaf Blast",
    pathogen: "Magnaporthe oryzae (Pyricularia oryzae)",
    type: "Fungal",
    severityDefault: "Severe",
    description: "The most destructive fungal rice epidemic worldwide, capable of devastating complete paddy fields within days.",
    symptoms: [
      "Characteristic spindle-shaped or diamond-shaped lesions with pointed ends",
      "Lesion center turns ash-gray or whitish with reddish-brown margin",
      "Lesions rapidly expand and coalesce under humid conditions, scorching the leaf",
      "Field shows a distinct 'blast' or wildfire-burned appearance"
    ],
    favorableConditions: "Night temperatures 19-24°C with daytime 28-32°C, leaf wetness > 10 hours, relative humidity > 90%, excessive urea/nitrogen.",
    chemicalControl: [
      "Tricyclazole 75 WP @ 0.6 g/L (gold standard for blast prevention)",
      "Isoprothiolane 40 EC @ 1.5 mL/L or Kasugamycin 3 SL @ 2.0 mL/L",
      "Immediately withhold further top-dressing of urea"
    ],
    biologicalControl: [
      "Foliar spray with Pseudomonas fluorescens @ 5 g/L",
      "Spray 5% garlic clove aqueous extract (allicin inhibits spore germination)"
    ],
    culturalPractices: [
      "Avoid excess nitrogen fertilizer; split application into 3-4 smaller doses",
      "Maintain continuous water layer in fields to reduce plant drought stress",
      "Plant blast-tolerant rice cultivars suited to your agro-climatic zone"
    ]
  },
  "Leaf Scald": {
    name: "Leaf Scald",
    pathogen: "Microdochium oryzae (Monographella albescens)",
    type: "Fungal",
    severityDefault: "Moderate",
    description: "Causes large zonate lesions starting from leaf tips or margins, resembling boiling water scalding.",
    symptoms: [
      "Zonate, concentric water-soaked bands near leaf tips and margins",
      "Alternating light brown and olive-brown bands resembling scalded skin",
      "Lesions coalesce to dry out large portions of the upper leaf blade",
      "Narrow red-brown halo separating infected zone from green healthy tissue"
    ],
    favorableConditions: "Continuous wet weather, high rainfall, temperatures 25-28°C, close crop spacing.",
    chemicalControl: [
      "Benomyl 50 WP @ 1 g/L or Mancozeb 75 WP @ 2.5 g/L",
      "Carbendazim 50 WP @ 1 g/L or Azoxystrobin 23 SC @ 1 mL/L"
    ],
    biologicalControl: [
      "Bacillus amyloliquefaciens foliar spray @ 5 g/L",
      "Neem seed oil spray 3%"
    ],
    culturalPractices: [
      "Ensure wider row spacing (20 cm x 15 cm) to improve field aeration",
      "Decontaminate field margins of wild graminaceous weed hosts"
    ]
  },
  "Narrow Brown Spot": {
    name: "Narrow Brown Spot",
    pathogen: "Cercospora janseana (Cercospora oryzae)",
    type: "Fungal",
    severityDefault: "Mild",
    description: "Produces short, linear, needle-like reddish-brown lesions running parallel to leaf veins.",
    symptoms: [
      "Short, narrow, linear reddish-brown to dark brown streaks (2-10 mm long, 1 mm wide)",
      "Lesions strictly parallel to the leaf veins without wide halos",
      "Heavy infestation causes premature leaf drying, lodging, and poor panicle exsertion",
      "Most prevalent during post-flowering and ripening stages"
    ],
    favorableConditions: "Temperature 25-28°C, intermittent sunshine and rain, potassium-deficient soils.",
    chemicalControl: [
      "Propiconazole 25 EC @ 1 mL/L or Mancozeb @ 2.5 g/L",
      "Apply during boot-leaf stage if 5% leaf area is spotted"
    ],
    biologicalControl: [
      "Pseudomonas fluorescens @ 10 g/L seed treatment and foliar spray",
      "Soil application of potassium solubilizing bio-fertilizers"
    ],
    culturalPractices: [
      "Apply balanced potassium fertilizer (MOP) at 50 kg/ha",
      "Harvest promptly when crop reaches physiological maturity"
    ]
  },
  "Neck Blast": {
    name: "Neck Blast (Panicle Blast)",
    pathogen: "Magnaporthe oryzae (Panicle / Neck phase)",
    type: "Fungal",
    severityDefault: "Critical",
    description: "The catastrophic reproductive stage of rice blast where the neck node supporting the panicle rots, cutting off grain nourishment.",
    symptoms: [
      "Grayish-brown necrotic lesion encircling the neck node below panicle base",
      "Neck rots and easily snaps under slight wind or panicle weight",
      "Complete panicle becomes chalky, white, and produces completely empty (sterile) grains",
      "Entire field shows white, erect, empty panicles ('whiteheads')"
    ],
    favorableConditions: "High humidity, frequent night rains during panicle heading, temperatures 20-26°C.",
    chemicalControl: [
      "Prophylactic spray of Tricyclazole 75 WP @ 0.6 g/L at early boot-split stage (5-10% flowering)",
      "Second spray of Isoprothiolane 40 EC @ 1.5 mL/L or Azoxystrobin + Difenoconazole @ 1 mL/L at 50% flowering"
    ],
    biologicalControl: [
      "Pre-flowering spray of Pseudomonas fluorescens @ 5 g/L",
      "Bio-priming seeds with Trichoderma harzianum"
    ],
    culturalPractices: [
      "Never apply nitrogenous fertilizers after panicle initiation",
      "Ensure synchronous planting across the block so heading occurs uniformly"
    ]
  },
  "Ragged Stunt Virus": {
    name: "Ragged Stunt Virus (RRSV)",
    pathogen: "Rice ragged stunt oryzavirus (Vector: Nilaparvata lugens / BPH)",
    type: "Viral",
    severityDefault: "Severe",
    description: "Insect-vectored viral infection causing twisted, ragged, torn leaf margins and gall development on veins.",
    symptoms: [
      "Ragged, torn, notched or saw-toothed outer leaf margins",
      "Twisted, malformed flag leaves with twisted spiral appearance",
      "Small white or brown vein-swellings (galls) on underside of leaves and stems",
      "Severely stunted hills with delayed panicle emergence and sterile grains"
    ],
    favorableConditions: "Dense brown planthopper population, continuous staggered rice cultivation.",
    chemicalControl: [
      "Vector suppression: Pymetrozine 50 WG @ 0.6 g/L or Triflumuron 480 SC @ 0.5 mL/L",
      "Apply Dinotefuran 20 SG @ 0.4 g/L targeting lower plant canopy"
    ],
    biologicalControl: [
      "Encourage beneficial predators (mirid bugs, dragonflies, ladybird beetles)",
      "Foliar application of botanical antiviral formulations (bougainvillea leaf extract 10%)"
    ],
    culturalPractices: [
      "Implement a mandatory 30-day rice-free fallow period between crops to starve vectors",
      "Remove and bury ragged stunt-infected clumps upon discovery"
    ]
  },
  "Sheath Blight": {
    name: "Sheath Blight",
    pathogen: "Rhizoctonia solani (Thanatephorus cucumeris)",
    type: "Fungal",
    severityDefault: "Severe",
    description: "Major soil-borne fungal disease causing large water-soaked oval or 'snake-skin' banded lesions on lower leaf sheaths.",
    symptoms: [
      "Oval or ellipsoid greenish-gray water-soaked lesions near water line on sheath",
      "Lesions enlarge with undulating dark brown borders resembling snake-skin patterns",
      "White fungal mycelium and hard brown sclerotial bodies visible on lesions",
      "Infection ascends up to the flag leaf, resulting in lodging and unfilled grains"
    ],
    favorableConditions: "High humidity (> 95%), temperature 28-32°C, high crop density, excessive nitrogen, stagnant warm water.",
    chemicalControl: [
      "Hexaconazole 5 SC @ 2.0 mL/L or Validamycin 3 L @ 2.5 mL/L (highly effective against Rhizoctonia)",
      "Thifluzamide 24 SC @ 0.75 mL/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 mL/L"
    ],
    biologicalControl: [
      "Foliar spray with Pseudomonas fluorescens @ 5 g/L directed at stem base",
      "Soil application of Trichoderma viride enriched compost @ 50 kg/ha"
    ],
    culturalPractices: [
      "Reduce planting density to ensure canopy air circulation",
      "Skim and remove floating sclerotia during early puddling and field prep",
      "Drain the field intermittently to suppress fungal moisture requirements"
    ]
  },
  "Sheath Rot": {
    name: "Sheath Rot",
    pathogen: "Sarocladium oryzae",
    type: "Fungal",
    severityDefault: "Moderate",
    description: "Infects the uppermost flag leaf sheath enclosing the young un-emerged panicle, leading to rotting and choking.",
    symptoms: [
      "Oblong or irregular reddish-brown to dark brown lesions on the flag leaf sheath",
      "Lesion center turns grayish-brown with powdery whitish-pink fungal growth inside",
      "Panicle fails to emerge completely ('choked panicle') and rots inside the sheath",
      "Grain emerges discolored, brittle, and predominantly sterile"
    ],
    favorableConditions: "High relative humidity, injury by stem borers or mite infestation, temperature 25-30°C.",
    chemicalControl: [
      "Carbendazim 50 WP @ 1 g/L or Propiconazole 25 EC @ 1 mL/L",
      "Combined spray of fungicide + insecticide if mites/borers are present"
    ],
    biologicalControl: [
      "Spray Pseudomonas fluorescens @ 5 g/L at boot-leaf stage",
      "Neem seed kernel extract 5% at early booting"
    ],
    culturalPractices: [
      "Control leaf sheath mites (Steneotarsonemus spinki) which act as entry vectors",
      "Apply potassium fertilizer to strengthen outer sheath cell walls"
    ]
  },
  "Stem Rot": {
    name: "Stem Rot",
    pathogen: "Magnaporthe salvinii (Sclerotium oryzae)",
    type: "Fungal",
    severityDefault: "Severe",
    description: "Stem-base pathogen that infects lower culms at the water level, causing black lesions, culm decay, and severe lodging.",
    symptoms: [
      "Small, irregular black lesions on outer leaf sheaths at water line",
      "Fungus penetrates inner culms causing dark rot and hollow stem collapse",
      "Numerous tiny black pepper-like sclerotia visible inside the split dead stem",
      "Plants lodge severely just before harvest with sterile, poorly-filled panicles"
    ],
    favorableConditions: "Prolonged standing water, poor drainage, high nitrogen, potassium deficiency, temperature 25-30°C.",
    chemicalControl: [
      "Thiophanate methyl 70 WP @ 1.5 g/L or Hexaconazole 5 SC @ 2 mL/L directed at stem base",
      "Validamycin 3 L @ 2.5 mL/L at the onset of base discoloration"
    ],
    biologicalControl: [
      "Soil drenching with Trichoderma harzianum @ 10 g/L",
      "Incorporate green manure crops to stimulate antagonistic rhizosphere microflora"
    ],
    culturalPractices: [
      "Drain water periodically to allow soil to crack slightly and oxygenate roots",
      "Apply muriate of potash (MOP) to enhance culm structural rigidity",
      "Deep plowing after harvest to bury surface sclerotia beyond root zone"
    ]
  },
  "Tungro": {
    name: "Rice Tungro Disease (RTD)",
    pathogen: "Rice tungro bacilliform virus (RTBV) & Rice tungro spherical virus (RTSV) (Vector: Nephotettix virescens / Green Leafhopper)",
    type: "Viral",
    severityDefault: "Critical",
    description: "Devastating viral disease complex transmitted rapidly by Green Leafhoppers (GLH), turning leaves orange-yellow and severely stunting plants.",
    symptoms: [
      "Distinct yellow to orange-yellow discoloration of leaves starting from tip downwards",
      "Young leaves show mottled or speckled appearance with interveinal chlorosis",
      "Marked plant stunting, reduced tillering, and delayed flowering",
      "Panicles are small, sterile, or produce partially filled discolored grains"
    ],
    favorableConditions: "High green leafhopper vector populations, staggered planting seasons, warm humid weather (25-32°C).",
    chemicalControl: [
      "Control insect vector (GLH): Imidacloprid 17.8 SL @ 0.3 mL/L or Thiamethoxam 25 WG @ 0.25 g/L",
      "Fipronil 5 SC @ 2.0 mL/L or Buprofezin 25 SC @ 1.5 mL/L",
      "Spray nursery beds 7-10 days before pulling seedlings"
    ],
    biologicalControl: [
      "Conserve green leafhopper natural predators (mirid bugs, wolf spiders, dragonflies)",
      "Spray neem oil 3% (1500 ppm) with sticker to deter leafhopper feeding"
    ],
    culturalPractices: [
      "Uproot and destroy tungro-affected hills in early disease phases to eliminate viral reservoir",
      "Synchronous planting over large areas to starve leafhopper generations",
      "Plant tungro-resistant varieties (e.g., IR36, IR64, CR Dhan 201)"
    ]
  }
};
