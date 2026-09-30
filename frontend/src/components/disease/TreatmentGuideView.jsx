import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  AlertTriangle, 
  ShieldCheck, 
  Leaf, 
  Droplet, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Filter
} from 'lucide-react';
import { RICE_DISEASES } from '../../data/riceDiseases';

export default function TreatmentGuideView({ onSelectDisease }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const treatments = [
    {
      id: 't1',
      disease: 'Bacterial Blight',
      pathogen: 'Xanthomonas oryzae',
      type: 'Bacterial',
      urgency: 'High',
      urgencyClass: 'bg-rose-100 text-rose-700 border-rose-200',
      activeChemical: 'Copper Oxychloride 50% WP @ 2.5 g/L + Streptocycline 100 ppm',
      dosage: '500g Copper Oxychloride + 20g Streptocycline per 200L water / acre',
      timing: 'Apply at early symptom appearance; repeat after 10-12 days if rains persist.',
      biologicalAlternative: 'Pseudomonas fluorescens @ 5 g/L seed treatment & foliar spray',
      preventionTip: 'Avoid excessive nitrogen; maintain field drainage to reduce humidity.'
    },
    {
      id: 't2',
      disease: 'Rice Blast (Leaf & Neck Blast)',
      pathogen: 'Magnaporthe oryzae',
      type: 'Fungal',
      urgency: 'Critical',
      urgencyClass: 'bg-red-100 text-red-800 border-red-200',
      activeChemical: 'Tricyclazole 75% WP @ 0.6 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L',
      dosage: '120g Tricyclazole in 200L water per acre',
      timing: 'Spray at initial spindle spot formation and repeat at 5% panicle emergence.',
      biologicalAlternative: 'Bacillus subtilis broth @ 10 ml/L foliar spray',
      preventionTip: 'Avoid night irrigation; plant blast-resistant cultivars (e.g., Swarna).'
    },
    {
      id: 't3',
      disease: 'Brown Spot',
      pathogen: 'Bipolaris oryzae',
      type: 'Fungal',
      urgency: 'Moderate',
      urgencyClass: 'bg-amber-100 text-amber-800 border-amber-200',
      activeChemical: 'Mancozeb 75% WP @ 2 g/L or Propiconazole 25% EC @ 1 ml/L',
      dosage: '400g Mancozeb in 200L water per acre',
      timing: 'Spray at tillering and boot leaf stage during cloudy, humid weather.',
      biologicalAlternative: 'Neem seed kernel extract (NSKE 5%) or Trichoderma harzianum',
      preventionTip: 'Apply potassium fertilizer (MOP) and correct micronutrient soil deficiencies.'
    },
    {
      id: 't4',
      disease: 'Sheath Blight',
      pathogen: 'Rhizoctonia solani',
      type: 'Fungal',
      urgency: 'High',
      urgencyClass: 'bg-rose-100 text-rose-700 border-rose-200',
      activeChemical: 'Validamycin 3% L @ 2.5 ml/L or Hexaconazole 5% EC @ 2 ml/L',
      dosage: '500ml Validamycin in 200L water aimed at stem base',
      timing: 'Direct spray towards lower sheath zone when disease reaches 10% tillers.',
      biologicalAlternative: 'Trichoderma viride seed & seedling dip',
      preventionTip: 'Keep dense plant spacing controlled; lower irrigation water depth to 2 cm.'
    },
    {
      id: 't5',
      disease: 'Tungro Disease',
      pathogen: 'RTBV & RTSV (Vector: Green Leafhopper)',
      type: 'Viral',
      urgency: 'High',
      urgencyClass: 'bg-amber-100 text-amber-800 border-amber-200',
      activeChemical: 'Vector control: Thiamethoxam 25% WG @ 0.3 g/L or Dinotefuran 20% SG @ 0.4 g/L',
      dosage: '40g Thiamethoxam in 150L water per acre',
      timing: 'Apply immediately upon spotting green leafhopper vectors in the nursery or tillering stage.',
      biologicalAlternative: 'Light traps for leafhoppers; conserve mirid bug predators (Cyrtorhinus lividipennis)',
      preventionTip: 'Rogue out and bury infected yellow-orange stubbles immediately.'
    },
    {
      id: 't6',
      disease: 'Rice Hispa (Beetle Attack)',
      pathogen: 'Dicladispa armigera',
      type: 'Insect Pest',
      urgency: 'Moderate',
      urgencyClass: 'bg-amber-100 text-amber-800 border-amber-200',
      activeChemical: 'Chlorpyrifos 20% EC @ 2.5 ml/L or Quinalphos 25% EC @ 2 ml/L',
      dosage: '500ml Chlorpyrifos in 200L water per acre',
      timing: 'Spray when damage exceeds 1 adult/hill or 1-2 damaged leaves per hill.',
      biologicalAlternative: 'Clip leaf tips before transplanting to eliminate hispa eggs and larvae.',
      preventionTip: 'Sweep net collection during early morning hours; avoid excessive tillering nitrogen.'
    }
  ];

  const filteredTreatments = treatments.filter((t) => {
    const matchesSearch = 
      t.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.pathogen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.activeChemical.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || t.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <Pill className="w-4 h-4 text-[#2E7D32]" />
            <span>Clinical Pathology Prescriptions</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Paddy Treatment & Fungicide Guide
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Standard agronomic chemical doses, biological formulations, and spray schedules
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search disease, chemical, pathogen..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Safety Alert Banner */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs flex items-start space-x-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold">Agronomic Application Notice:</strong> Always spray during calm weather (early morning or late afternoon) to avoid drift. Calibrate spray nozzles to ensure uniform coverage on both upper and lower leaf surfaces. Adhere to specified Pre-Harvest Intervals (PHI).
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {['All', 'Fungal', 'Bacterial', 'Viral', 'Insect Pest'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#193B2B] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Treatment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTreatments.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm card-hover-effect flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${t.urgencyClass}`}>
                  Urgency: {t.urgency}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{t.type} Pathology</span>
              </div>

              <h3 className="text-base font-bold text-slate-900">{t.disease}</h3>
              <p className="text-xs text-slate-500 italic mt-0.5">{t.pathogen}</p>

              {/* Chemical Treatment Box */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Recommended Chemical</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{t.activeChemical}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Field Dosage</span>
                  <p className="text-slate-700">{t.dosage}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Spray Timing</span>
                  <p className="text-slate-700">{t.timing}</p>
                </div>
              </div>

              {/* Bio & Organic Alternative */}
              <div className="mt-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/60 text-xs">
                <div className="flex items-center space-x-1.5 text-emerald-800 font-bold text-[11px] mb-1">
                  <Leaf className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Bio / Organic Alternative</span>
                </div>
                <p className="text-slate-700 text-[11px] leading-relaxed">{t.biologicalAlternative}</p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate pr-2">Tip: {t.preventionTip}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
