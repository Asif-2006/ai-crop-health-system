import React, { useState } from 'react';
import { RICE_DISEASES } from '../../data/riceDiseases';
import { Search, Sprout, ChevronRight, X, Pill, Shield, ThermometerSun } from 'lucide-react';

export default function DiseaseCatalog() {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [activeModalDisease, setActiveModalDisease] = useState(null);

  const diseases = Object.values(RICE_DISEASES);

  const filteredDiseases = diseases.filter((d) => {
    const matchesSearch = 
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.pathogen.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = selectedType === 'All' || d.type === selectedType;
    return matchesSearch && matchesType;
  });

  const typeCounts = {
    All: diseases.length,
    Fungal: diseases.filter(d => d.type === 'Fungal').length,
    Bacterial: diseases.filter(d => d.type === 'Bacterial').length,
    Viral: diseases.filter(d => d.type === 'Viral').length,
    'Insect Pest': diseases.filter(d => d.type === 'Insect Pest').length,
    Healthy: diseases.filter(d => d.type === 'Healthy').length,
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Header */}
      <div className="card-hover bg-maroon-950/80 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center space-x-2.5">
              <Sprout className="w-6 h-6 text-rose-300" />
              <span>17 Rice Leaf Conditions & Pathologies</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/70 mt-1">
              Comprehensive clinical database supported natively by the EfficientNet-B0 architecture
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-rose-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pathology, pathogen, symptom..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/20 rounded-2xl text-xs text-white placeholder-rose-200/50 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-rose-200 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mt-6 pt-5 border-t border-white/15">
          {Object.entries(typeCounts).map(([type, count]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`card-hover px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all duration-300 ${
                selectedType === type
                  ? 'bg-gradient-to-r from-maroon-700 to-rose-700 text-white shadow-lg border border-white/30'
                  : 'bg-black/30 text-rose-100/80 hover:text-white border border-white/15'
              }`}
            >
              <span>{type}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                selectedType === type ? 'bg-white/20 text-white' : 'bg-black/40 text-rose-200'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDiseases.map((disease) => {
          const typeColor = {
            Fungal: 'bg-purple-500/20 text-purple-200 border-purple-400/40',
            Bacterial: 'bg-blue-500/20 text-blue-200 border-blue-400/40',
            Viral: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
            'Insect Pest': 'bg-rose-500/20 text-rose-200 border-rose-400/40',
            Healthy: 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40',
          }[disease.type] || 'bg-white/10 text-white border-white/20';

          return (
            <div
              key={disease.name}
              onClick={() => setActiveModalDisease(disease)}
              className="card-hover bg-maroon-950/75 border border-white/15 rounded-3xl p-6 shadow-xl transition-all cursor-pointer flex flex-col justify-between group backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${typeColor}`}>
                    {disease.type}
                  </span>
                  <span className="text-[10px] text-rose-200/60 font-mono">
                    Severity: {disease.severityDefault}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-white group-hover:text-rose-200 transition-colors">
                  {disease.name}
                </h3>
                <p className="text-xs text-rose-200/70 italic line-clamp-1 mt-1">
                  {disease.pathogen}
                </p>

                <p className="text-xs text-rose-100/80 line-clamp-3 mt-3.5 leading-relaxed font-normal">
                  {disease.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs text-rose-200 font-bold group-hover:text-white transition-colors">
                <span>View Full Agronomic Sheet</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="card-hover text-center py-16 bg-maroon-950/70 border border-white/20 rounded-3xl text-rose-200 backdrop-blur-md">
          <p className="text-sm font-medium">No rice pathology found matching your search filter.</p>
        </div>
      )}

      {/* Disease Detail Modal */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="card-hover bg-maroon-950 border border-white/25 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveModalDisease(null)}
              className="absolute top-6 right-6 p-2 text-rose-200 hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/15"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-bold border bg-white/15 text-white border-white/25">
                {activeModalDisease.type} Pathology
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-2.5">{activeModalDisease.name}</h3>
              <p className="text-sm text-rose-200/80 italic mt-0.5">{activeModalDisease.pathogen}</p>
            </div>

            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed mb-6 p-4 bg-black/35 rounded-2xl border border-white/15">
              {activeModalDisease.description}
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2.5">
                  Diagnostic Visual Symptoms
                </h4>
                <div className="space-y-2">
                  {activeModalDisease.symptoms.map((s, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-rose-100">
                      <span className="text-rose-300 font-extrabold">•</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeModalDisease.favorableConditions && (
                <div className="p-4 bg-black/30 rounded-2xl border border-white/15">
                  <h4 className="text-xs font-bold text-rose-200 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                    <ThermometerSun className="w-4 h-4 text-rose-300" />
                    <span>Favorable Weather Triggers</span>
                  </h4>
                  <p className="text-xs text-rose-100 leading-relaxed font-normal">
                    {activeModalDisease.favorableConditions}
                  </p>
                </div>
              )}

              {activeModalDisease.chemicalControl?.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Pill className="w-3.5 h-3.5 text-rose-300" />
                    <span>Chemical Treatment</span>
                  </h4>
                  <div className="space-y-2">
                    {activeModalDisease.chemicalControl.map((c, idx) => (
                      <div key={idx} className="p-3 bg-black/35 border border-white/15 rounded-xl text-xs text-rose-100 font-medium">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalDisease.culturalPractices?.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Shield className="w-3.5 h-3.5 text-rose-300" />
                    <span>Cultural & Agronomic Field Practices</span>
                  </h4>
                  <div className="space-y-2">
                    {activeModalDisease.culturalPractices.map((cp, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-rose-100">
                        <span className="text-rose-300 font-bold">•</span>
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-5 border-t border-white/15 flex justify-end">
              <button
                onClick={() => setActiveModalDisease(null)}
                className="px-6 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold border border-white/20 transition-all"
              >
                Close Sheet
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
