import React, { useState } from 'react';
import { Pill, Leaf, Shield, CheckCircle, Info, ThermometerSun, AlertCircle } from 'lucide-react';

export default function AgronomicTreatmentCard({ result }) {
  const [activeSubTab, setActiveSubTab] = useState('chemical');

  if (!result) return null;

  const isHealthy = result.predicted_class === "Healthy";

  return (
    <div className="card-hover bg-maroon-950/80 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/15">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center space-x-2.5">
            <Pill className="w-5 h-5 text-rose-300" />
            <span>Agronomic Prescription & Remediation Guide</span>
          </h3>
          <p className="text-xs text-rose-100/70 mt-0.5">
            Tailored field interventions based on IRRI & national agricultural recommendations
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/15 self-start sm:self-auto backdrop-blur-md">
          <button
            onClick={() => setActiveSubTab('chemical')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'chemical'
                ? 'bg-gradient-to-r from-maroon-700 to-rose-700 text-white shadow-md border border-white/20'
                : 'text-rose-100/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Chemical Control
          </button>
          <button
            onClick={() => setActiveSubTab('biological')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'biological'
                ? 'bg-gradient-to-r from-maroon-700 to-rose-700 text-white shadow-md border border-white/20'
                : 'text-rose-100/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Organic & Bio
          </button>
          <button
            onClick={() => setActiveSubTab('cultural')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'cultural'
                ? 'bg-gradient-to-r from-maroon-700 to-rose-700 text-white shadow-md border border-white/20'
                : 'text-rose-100/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Cultural Practices
          </button>
          <button
            onClick={() => setActiveSubTab('symptoms')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 ${
              activeSubTab === 'symptoms'
                ? 'bg-gradient-to-r from-maroon-700 to-rose-700 text-white shadow-md border border-white/20'
                : 'text-rose-100/70 hover:text-white hover:bg-white/10'
            }`}
          >
            Symptoms & Weather
          </button>
        </div>
      </div>

      {/* Description Banner */}
      {result.description && (
        <div className="card-hover p-4 sm:p-5 rounded-2xl bg-black/30 border border-white/15 text-sm text-rose-100 mb-6 flex items-start space-x-3.5 backdrop-blur-md">
          <Info className="w-5 h-5 text-rose-300 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{result.description}</p>
        </div>
      )}

      {/* Active Tab Content */}
      <div className="min-h-[200px]">
        
        {/* Chemical Control */}
        {activeSubTab === 'chemical' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-white uppercase tracking-wider">
              <Pill className="w-4 h-4 text-rose-300" />
              <span>Recommended Active Ingredients & Dosages</span>
            </div>
            
            {result.chemical_treatment && result.chemical_treatment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {result.chemical_treatment.map((chem, idx) => (
                  <div key={idx} className="card-hover p-4 rounded-2xl bg-black/30 border border-white/15 flex items-start space-x-3.5 backdrop-blur-md">
                    <div className="w-7 h-7 rounded-xl bg-white/15 text-white flex items-center justify-center flex-shrink-0 text-xs font-extrabold border border-white/25 shadow-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{chem}</p>
                      <span className="text-[11px] text-rose-100/70 mt-1 block font-medium">
                        Apply during early morning or calm late afternoon with thorough foliage coverage.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-rose-100/80">No chemical application needed for this condition.</p>
            )}

            {!isHealthy && (
              <div className="card-hover p-3.5 rounded-2xl bg-black/40 border border-rose-500/30 text-xs text-rose-200 flex items-center space-x-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-300" />
                <span>Always adhere to local safety intervals (PHI) before paddy harvest. Wear protective equipment during spraying.</span>
              </div>
            )}
          </div>
        )}

        {/* Biological & Organic */}
        {activeSubTab === 'biological' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-white uppercase tracking-wider">
              <Leaf className="w-4 h-4 text-rose-300" />
              <span>Bio-fungicides & Eco-Friendly Management</span>
            </div>

            {result.biological_treatment && result.biological_treatment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {result.biological_treatment.map((bio, idx) => (
                  <div key={idx} className="card-hover p-4 rounded-2xl bg-black/30 border border-white/15 flex items-start space-x-3.5 backdrop-blur-md">
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white">{bio}</p>
                      <span className="text-[11px] text-rose-100/70 mt-1 block font-medium">
                        Safe for beneficial soil microbes, natural predators, and pollinator insects.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-rose-100/80">Standard organic monitoring recommended.</p>
            )}
          </div>
        )}

        {/* Cultural Practices */}
        {activeSubTab === 'cultural' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-white uppercase tracking-wider">
              <Shield className="w-4 h-4 text-rose-300" />
              <span>Agronomic & Preventive Field Management</span>
            </div>

            {result.cultural_practices && result.cultural_practices.length > 0 ? (
              <div className="space-y-3">
                {result.cultural_practices.map((cult, idx) => (
                  <div key={idx} className="card-hover p-4 rounded-2xl bg-black/30 border border-white/15 flex items-center space-x-3.5 backdrop-blur-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-white flex-shrink-0 shadow-[0_0_8px_white]" />
                    <p className="text-sm text-rose-50 font-medium">{cult}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-rose-100/80">Maintain standard field hygiene and aeration.</p>
            )}
          </div>
        )}

        {/* Symptoms & Weather */}
        {activeSubTab === 'symptoms' && (
          <div className="space-y-5">
            <div>
              <div className="text-xs font-extrabold text-white uppercase tracking-wider mb-3">
                Characteristic Diagnostic Symptoms
              </div>
              <div className="space-y-2.5">
                {(result.symptoms || []).map((sym, idx) => (
                  <div key={idx} className="card-hover p-3 rounded-xl bg-black/25 border border-white/10 flex items-start space-x-3 text-sm text-rose-50">
                    <span className="text-rose-300 font-black">•</span>
                    <span>{sym}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.favorable_conditions && (
              <div className="card-hover p-5 rounded-2xl bg-black/35 border border-white/15">
                <div className="text-xs font-bold text-rose-200 flex items-center space-x-2 mb-2">
                  <ThermometerSun className="w-4 h-4 text-rose-300" />
                  <span>Epidemic Trigger Weather Conditions</span>
                </div>
                <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-normal">
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
