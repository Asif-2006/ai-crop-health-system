import React, { useState } from 'react';
import { Pill, Leaf, Shield, CheckCircle, Info, ThermometerSun, AlertCircle } from 'lucide-react';

export default function AgronomicTreatmentCard({ result }) {
  const [activeSubTab, setActiveSubTab] = useState('chemical');

  if (!result) return null;

  const isHealthy = result.predicted_class === "Healthy";

  return (
    <div className="card-hover bg-white/95 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-card-soft backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2.5">
            <Pill className="w-5 h-5 text-emerald-600" />
            <span>Agronomic Prescription & Remediation Guide</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tailored field interventions based on IRRI & national agricultural recommendations
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('chemical')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'chemical'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Chemical Control
          </button>
          <button
            onClick={() => setActiveSubTab('biological')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'biological'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Organic & Bio
          </button>
          <button
            onClick={() => setActiveSubTab('cultural')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'cultural'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Cultural Practices
          </button>
          <button
            onClick={() => setActiveSubTab('symptoms')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'symptoms'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            Symptoms & Weather
          </button>
        </div>
      </div>

      {/* Description Banner */}
      {result.description && (
        <div className="card-hover p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-700 mb-6 flex items-start space-x-3.5 font-sans leading-relaxed">
          <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p>{result.description}</p>
        </div>
      )}

      {/* Active Tab Content */}
      <div className="min-h-[200px]">
        
        {/* Chemical Control */}
        {activeSubTab === 'chemical' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              <Pill className="w-4 h-4 text-emerald-600" />
              <span>Recommended Active Ingredients & Dosages</span>
            </div>
            
            {result.chemical_treatment && result.chemical_treatment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {result.chemical_treatment.map((chem, idx) => (
                  <div key={idx} className="card-hover p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3.5">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 text-xs font-bold border border-emerald-200 shadow-sm font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 font-sans">{chem}</p>
                      <span className="text-[11px] text-slate-500 mt-1 block font-normal font-sans">
                        Apply during early morning or calm late afternoon with thorough foliage coverage.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 font-sans">No chemical application needed for this condition.</p>
            )}

            {!isHealthy && (
              <div className="card-hover p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center space-x-2.5 font-sans">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>Always adhere to local safety intervals (PHI) before paddy harvest. Wear protective equipment during spraying.</span>
              </div>
            )}
          </div>
        )}

        {/* Biological & Organic */}
        {activeSubTab === 'biological' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Bio-fungicides & Eco-Friendly Management</span>
            </div>

            {result.biological_treatment && result.biological_treatment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {result.biological_treatment.map((bio, idx) => (
                  <div key={idx} className="card-hover p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start space-x-3.5">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-900 font-sans">{bio}</p>
                      <span className="text-[11px] text-slate-500 mt-1 block font-normal font-sans">
                        Safe for beneficial soil microbes, natural predators, and pollinator insects.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 font-sans">Standard organic monitoring recommended.</p>
            )}
          </div>
        )}

        {/* Cultural Practices */}
        {activeSubTab === 'cultural' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Agronomic & Preventive Field Management</span>
            </div>

            {result.cultural_practices && result.cultural_practices.length > 0 ? (
              <div className="space-y-3">
                {result.cultural_practices.map((cult, idx) => (
                  <div key={idx} className="card-hover p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center space-x-3.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 flex-shrink-0 shadow-[0_0_8px_rgba(22,163,74,0.4)]" />
                    <p className="text-sm text-slate-700 font-sans">{cult}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 font-sans">Maintain standard field hygiene and aeration.</p>
            )}
          </div>
        )}

        {/* Symptoms & Weather */}
        {activeSubTab === 'symptoms' && (
          <div className="space-y-5">
            <div>
              <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3">
                Characteristic Diagnostic Symptoms
              </div>
              <div className="space-y-2.5">
                {(result.symptoms || []).map((sym, idx) => (
                  <div key={idx} className="card-hover p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start space-x-3 text-sm text-slate-700 font-sans">
                    <span className="text-emerald-600 font-black">•</span>
                    <span>{sym}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.favorable_conditions && (
              <div className="card-hover p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 font-sans">
                <div className="text-xs font-bold text-amber-900 flex items-center space-x-2 mb-2 uppercase tracking-wide">
                  <ThermometerSun className="w-4 h-4 text-amber-600" />
                  <span>Epidemic Trigger Weather Conditions</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {result.favorable_conditions}
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
