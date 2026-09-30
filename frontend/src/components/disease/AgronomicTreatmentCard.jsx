import React, { useState } from 'react';
import { Pill, Leaf, Shield, CheckCircle, Info, ThermometerSun, AlertCircle } from 'lucide-react';

export default function AgronomicTreatmentCard({ result }) {
  const [activeSubTab, setActiveSubTab] = useState('chemical');

  if (!result) return null;

  const isHealthy = result.predicted_class === "Healthy";

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
            <Pill className="w-5 h-5 text-[#2E7D32]" />
            <span>Agronomic Prescription & Remediation Guide</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Tailored field interventions based on IRRI & national agricultural recommendations
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveSubTab('chemical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'chemical'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chemical Control
          </button>
          <button
            onClick={() => setActiveSubTab('biological')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'biological'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Organic & Bio
          </button>
          <button
            onClick={() => setActiveSubTab('cultural')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'cultural'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Cultural Practices
          </button>
          <button
            onClick={() => setActiveSubTab('symptoms')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeSubTab === 'symptoms'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Symptoms & Vectors
          </button>
        </div>
      </div>

      {isHealthy ? (
        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
          <CheckCircle className="w-12 h-12 text-[#2E7D32] mx-auto mb-2" />
          <h4 className="text-base font-bold text-emerald-950">Crop Health Optimal</h4>
          <p className="text-xs text-emerald-700 max-w-md mx-auto mt-1">
            No pathogen detected. Continue scheduled water management, balanced nitrogen application, and weekly perimeter scouting.
          </p>
        </div>
      ) : (
        <div>
          {/* Subtab 1: Chemical Treatment */}
          {activeSubTab === 'chemical' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs text-amber-800 bg-amber-50 p-3 rounded-xl border border-amber-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
                <span>Follow registered dosage rates strictly. Apply personal protective gear during foliar spray applications.</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAF7] border border-slate-200">
                  <span className="text-[11px] font-bold text-[#2E7D32] uppercase tracking-wider">Primary Intervention</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">Recommended Formulation</h4>
                  <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                    {result.chemical_treatment || "Copper Oxychloride 50% WP @ 2.5 g/L or Streptocycline 100 ppm formulation."}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAF7] border border-slate-200">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Favorable Conditions</span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">Field Weather Triggers</h4>
                  <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                    {result.favorable_conditions || "High relative humidity (>85%), temperatures 26-32°C, and prolonged leaf wetness periods."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Subtab 2: Biological & Organic */}
          {activeSubTab === 'biological' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200">
                <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold mb-2">
                  <Leaf className="w-4 h-4 text-[#2E7D32]" />
                  <span>Bio-Fungicides & Botanical Formulations</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {result.biological_treatment || "Foliar application of Pseudomonas fluorescens @ 5 g/L or Bacillus subtilis broth formulation at early onset."}
                </p>
              </div>
            </div>
          )}

          {/* Subtab 3: Cultural Practices */}
          {activeSubTab === 'cultural' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#F8FAF7] border border-slate-200">
                <div className="flex items-center space-x-2 text-slate-900 text-xs font-bold mb-2">
                  <Shield className="w-4 h-4 text-[#2E7D32]" />
                  <span>Integrated Pest & Agronomic Management (IPM)</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {result.cultural_practices || "Ensure balanced split nitrogen application. Avoid excessive urea. Maintain intermittent field drainage to lower canopy humidity."}
                </p>
              </div>
            </div>
          )}

          {/* Subtab 4: Symptoms */}
          {activeSubTab === 'symptoms' && (
            <div className="p-4 rounded-xl bg-[#F8FAF7] border border-slate-200">
              <div className="flex items-center space-x-2 text-slate-900 text-xs font-bold mb-2">
                <ThermometerSun className="w-4 h-4 text-amber-600" />
                <span>Clinical Symptom Identification</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {result.symptoms || "Lesions appear near leaf tips or edges, expanding along veins with yellow-orange wavy margins. Severe infection induces systemic wilting (kresek)."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
