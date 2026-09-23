import React, { useState } from 'react';
import { Pill, Leaf, Shield, CheckCircle, Info, ThermometerSun, AlertCircle } from 'lucide-react';

export default function AgronomicTreatmentCard({ result }) {
  const [activeSubTab, setActiveSubTab] = useState('chemical');

  if (!result) return null;

  const isHealthy = result.predicted_class === "Healthy";

  return (
    <div className="card-hover bg-[#0e3312]/80 border border-[#66BB6A]/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#66BB6A]/20">
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center space-x-2.5 uppercase tracking-wide">
            <Pill className="w-5 h-5 text-[#66BB6A]" />
            <span>Agronomic Prescription & Remediation Guide</span>
          </h3>
          <p className="text-xs text-[#A5D6A7] mt-0.5 tracking-wide">
            Tailored field interventions based on IRRI & national agricultural recommendations
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1.5 bg-black/40 p-1.5 rounded-2xl border border-[#66BB6A]/25 self-start sm:self-auto backdrop-blur-md">
          <button
            onClick={() => setActiveSubTab('chemical')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeSubTab === 'chemical'
                ? 'bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white shadow-md border border-[#A5D6A7]/40'
                : 'text-[#A5D6A7] hover:text-white hover:bg-[#66BB6A]/20'
            }`}
          >
            Chemical Control
          </button>
          <button
            onClick={() => setActiveSubTab('biological')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeSubTab === 'biological'
                ? 'bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white shadow-md border border-[#A5D6A7]/40'
                : 'text-[#A5D6A7] hover:text-white hover:bg-[#66BB6A]/20'
            }`}
          >
            Organic & Bio
          </button>
          <button
            onClick={() => setActiveSubTab('cultural')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeSubTab === 'cultural'
                ? 'bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white shadow-md border border-[#A5D6A7]/40'
                : 'text-[#A5D6A7] hover:text-white hover:bg-[#66BB6A]/20'
            }`}
          >
            Cultural Practices
          </button>
          <button
            onClick={() => setActiveSubTab('symptoms')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
              activeSubTab === 'symptoms'
                ? 'bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white shadow-md border border-[#A5D6A7]/40'
                : 'text-[#A5D6A7] hover:text-white hover:bg-[#66BB6A]/20'
            }`}
          >
            Symptoms & Weather
          </button>
        </div>
      </div>

      {/* Description Banner */}
      {result.description && (
        <div className="card-hover p-4 sm:p-5 rounded-2xl bg-black/35 border border-[#66BB6A]/25 text-sm text-[#E8F5E9] mb-6 flex items-start space-x-3.5 backdrop-blur-md font-sans">
          <Info className="w-5 h-5 text-[#66BB6A] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{result.description}</p>
        </div>
      )}

      {/* Active Tab Content */}
      <div className="min-h-[200px]">
        
        {/* Chemical Control */}
        {activeSubTab === 'chemical' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-white uppercase tracking-wider">
              <Pill className="w-4 h-4 text-[#66BB6A]" />
              <span>Recommended Active Ingredients & Dosages</span>
            </div>
            
            {result.chemical_treatment && result.chemical_treatment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {result.chemical_treatment.map((chem, idx) => (
                  <div key={idx} className="card-hover p-4 rounded-2xl bg-black/30 border border-[#66BB6A]/25 flex items-start space-x-3.5 backdrop-blur-md">
                    <div className="w-7 h-7 rounded-xl bg-[#1B5E20] text-[#A5D6A7] flex items-center justify-center flex-shrink-0 text-xs font-black border border-[#66BB6A]/40 shadow-sm font-mono">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white font-sans">{chem}</p>
                      <span className="text-[11px] text-[#A5D6A7]/80 mt-1 block font-normal font-sans">
                        Apply during early morning or calm late afternoon with thorough foliage coverage.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#A5D6A7] font-sans">No chemical application needed for this condition.</p>
            )}

            {!isHealthy && (
              <div className="card-hover p-3.5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-center space-x-2.5 font-sans">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-400" />
                <span>Always adhere to local safety intervals (PHI) before paddy harvest. Wear protective equipment during spraying.</span>
              </div>
            )}
          </div>
        )}

        {/* Biological & Organic */}
        {activeSubTab === 'biological' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-white uppercase tracking-wider">
              <Leaf className="w-4 h-4 text-[#66BB6A]" />
              <span>Bio-fungicides & Eco-Friendly Management</span>
            </div>

            {result.biological_treatment && result.biological_treatment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {result.biological_treatment.map((bio, idx) => (
                  <div key={idx} className="card-hover p-4 rounded-2xl bg-black/30 border border-[#66BB6A]/25 flex items-start space-x-3.5 backdrop-blur-md">
                    <CheckCircle className="w-5 h-5 text-[#66BB6A] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-white font-sans">{bio}</p>
                      <span className="text-[11px] text-[#A5D6A7]/80 mt-1 block font-normal font-sans">
                        Safe for beneficial soil microbes, natural predators, and pollinator insects.
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#A5D6A7] font-sans">Standard organic monitoring recommended.</p>
            )}
          </div>
        )}

        {/* Cultural Practices */}
        {activeSubTab === 'cultural' && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-xs font-extrabold text-white uppercase tracking-wider">
              <Shield className="w-4 h-4 text-[#66BB6A]" />
              <span>Agronomic & Preventive Field Management</span>
            </div>

            {result.cultural_practices && result.cultural_practices.length > 0 ? (
              <div className="space-y-3">
                {result.cultural_practices.map((cult, idx) => (
                  <div key={idx} className="card-hover p-4 rounded-2xl bg-black/30 border border-[#66BB6A]/25 flex items-center space-x-3.5 backdrop-blur-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#66BB6A] flex-shrink-0 shadow-[0_0_8px_#66BB6A]" />
                    <p className="text-sm text-[#E8F5E9] font-sans">{cult}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#A5D6A7] font-sans">Maintain standard field hygiene and aeration.</p>
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
                  <div key={idx} className="card-hover p-3.5 rounded-xl bg-black/30 border border-[#66BB6A]/20 flex items-start space-x-3 text-sm text-[#E8F5E9] font-sans">
                    <span className="text-[#66BB6A] font-black">•</span>
                    <span>{sym}</span>
                  </div>
                ))}
              </div>
            </div>

            {result.favorable_conditions && (
              <div className="card-hover p-5 rounded-2xl bg-black/35 border border-[#66BB6A]/25 font-sans">
                <div className="text-xs font-bold text-[#A5D6A7] flex items-center space-x-2 mb-2 uppercase tracking-wide">
                  <ThermometerSun className="w-4 h-4 text-[#66BB6A]" />
                  <span>Epidemic Trigger Weather Conditions</span>
                </div>
                <p className="text-xs sm:text-sm text-[#E8F5E9] leading-relaxed font-normal">
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
