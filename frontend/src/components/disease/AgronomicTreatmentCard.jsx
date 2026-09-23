import React, { useState } from 'react';
import { Pill, Leaf, Shield, CheckCircle, Info, ThermometerSun, AlertCircle } from 'lucide-react';

export default function AgronomicTreatmentCard({ result }) {
  const [activeSubTab, setActiveSubTab] = useState('chemical');

  if (!result) return null;

  const isHealthy = result.predicted_class === "Healthy";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Pill className="w-5 h-5 text-emerald-400" />
            <span>Agronomic Prescription & Remediation Guide</span>
          </h3>
          <p className="text-xs text-slate-400">
            Tailored field interventions based on IRRI & national agricultural recommendations
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('chemical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'chemical'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Chemical Control
          </button>
          <button
            onClick={() => setActiveSubTab('biological')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'biological'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Organic & Bio
          </button>
          <button
            onClick={() => setActiveSubTab('cultural')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'cultural'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Cultural Practices
          </button>
          <button
            onClick={() => setActiveSubTab('symptoms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'symptoms'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Symptoms & Weather
          </button>
        </div>
      </div>

      {/* Description Banner */}
      {result.description && (
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-sm text-slate-300 mb-6 flex items-start space-x-3">
          <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{result.description}</p>
        </div>
      )}

      {/* Active Tab Content */}
      <div className="min-h-[200px]">
        
        {/* Chemical Control */}
        {activeSubTab === 'chemical' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Pill className="w-4 h-4" />
              <span>Recommended Active Ingredients & Dosages</span>
            </div>
            
            {result.chemical_treatment && result.chemical_treatment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.chemical_treatment.map((chem, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{chem}</p>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        Apply during early morning or calm late afternoon with thorough foliage coverage.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No chemical application needed for this condition.</p>
            )}

            {!isHealthy && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/30 text-xs text-amber-300 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>Always adhere to local safety intervals (PHI) before paddy harvest. Wear PPE during spraying.</span>
              </div>
            )}
          </div>
        )}

        {/* Biological & Organic */}
        {activeSubTab === 'biological' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Leaf className="w-4 h-4" />
              <span>Bio-fungicides & Eco-Friendly Management</span>
            </div>

            {result.biological_treatment && result.biological_treatment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {result.biological_treatment.map((bio, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-slate-100">{bio}</p>
                      <span className="text-[11px] text-slate-500 mt-0.5 block">
                        Safe for beneficial soil microbes, natural predators, and pollinator insects.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Standard organic monitoring recommended.</p>
            )}
          </div>
        )}

        {/* Cultural Practices */}
        {activeSubTab === 'cultural' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Agronomic & Preventive Field Management</span>
            </div>

            {result.cultural_practices && result.cultural_practices.length > 0 ? (
              <div className="space-y-3">
                {result.cultural_practices.map((cult, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                    <p className="text-sm text-slate-200">{cult}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Maintain standard field hygiene and aeration.</p>
            )}
          </div>
        )}

        {/* Symptoms & Weather */}
        {activeSubTab === 'symptoms' && (
          <div className="space-y-5">
            <div>
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2.5">
                Characteristic Diagnostic Symptoms
              </div>
              <div className="space-y-2">
                {(result.symptoms || []).map((sym, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 text-sm text-slate-300">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{sym}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.favorable_conditions && (
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-xs font-bold text-amber-400 flex items-center space-x-2 mb-1.5">
                  <ThermometerSun className="w-4 h-4" />
                  <span>Epidemic Trigger Weather Conditions</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
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
