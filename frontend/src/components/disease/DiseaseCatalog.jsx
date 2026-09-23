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
      <div className="card-hover bg-[#0e3312]/80 border border-[#66BB6A]/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black text-white flex items-center space-x-2.5 uppercase tracking-wide">
              <Sprout className="w-7 h-7 text-[#66BB6A]" />
              <span>17 Rice Leaf Conditions & Pathologies</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#A5D6A7] mt-1 font-sans">
              Comprehensive clinical database supported natively by the EfficientNet-B0 architecture
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 font-sans">
            <Search className="w-4 h-4 text-[#A5D6A7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pathology, pathogen, symptom..."
              className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-[#66BB6A]/40 rounded-2xl text-xs text-white placeholder-[#A5D6A7]/50 focus:outline-none focus:border-[#66BB6A] focus:ring-1 focus:ring-[#66BB6A] transition-all font-sans"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A5D6A7] hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mt-6 pt-5 border-t border-[#66BB6A]/20">
          {Object.entries(typeCounts).map(([type, count]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`card-hover px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300 ${
                selectedType === type
                  ? 'bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white shadow-lg border border-[#A5D6A7]/50'
                  : 'bg-black/30 text-[#A5D6A7] hover:text-white border border-[#66BB6A]/30'
              }`}
            >
              <span>{type}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                selectedType === type ? 'bg-[#66BB6A]/40 text-white' : 'bg-black/40 text-[#A5D6A7]'
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
            Healthy: 'bg-[#66BB6A]/20 text-[#A5D6A7] border-[#66BB6A]/50',
          }[disease.type] || 'bg-white/10 text-white border-white/20';

          return (
            <div
              key={disease.name}
              onClick={() => setActiveModalDisease(disease)}
              className="card-hover bg-[#0e3312]/80 border border-[#66BB6A]/30 rounded-3xl p-6 shadow-xl transition-all cursor-pointer flex flex-col justify-between group backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${typeColor}`}>
                    {disease.type}
                  </span>
                  <span className="text-[10px] text-[#A5D6A7]/70 font-mono">
                    Severity: {disease.severityDefault}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-[#A5D6A7] transition-colors uppercase tracking-wide">
                  {disease.name}
                </h3>
                <p className="text-xs text-[#A5D6A7] italic line-clamp-1 mt-1 font-sans">
                  {disease.pathogen}
                </p>

                <p className="text-xs text-[#E8F5E9]/80 line-clamp-3 mt-3.5 leading-relaxed font-sans font-normal">
                  {disease.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#66BB6A]/20 flex items-center justify-between text-xs text-[#A5D6A7] font-bold group-hover:text-white transition-colors uppercase tracking-wider">
                <span>View Full Agronomic Sheet</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-[#66BB6A]" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="card-hover text-center py-16 bg-[#0e3312]/80 border border-[#66BB6A]/30 rounded-3xl text-[#A5D6A7] backdrop-blur-md font-sans">
          <p className="text-sm font-medium">No rice pathology found matching your search filter.</p>
        </div>
      )}

      {/* Disease Detail Modal */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="card-hover bg-[#091e0a] border border-[#66BB6A]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveModalDisease(null)}
              className="absolute top-6 right-6 p-2 text-[#A5D6A7] hover:text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-[#66BB6A]/30"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-[#1B5E20] text-[#A5D6A7] border-[#66BB6A]/40">
                {activeModalDisease.type} Pathology
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-white mt-2.5 uppercase tracking-wide">{activeModalDisease.name}</h3>
              <p className="text-sm text-[#A5D6A7] italic mt-0.5 font-sans">{activeModalDisease.pathogen}</p>
            </div>

            <p className="text-xs sm:text-sm text-[#E8F5E9] leading-relaxed mb-6 p-4 bg-black/40 rounded-2xl border border-[#66BB6A]/25 font-sans">
              {activeModalDisease.description}
            </p>

            <div className="space-y-4 font-sans">
              <div>
                <h4 className="text-xs font-extrabold text-[#A5D6A7] uppercase tracking-wider mb-2.5">
                  Diagnostic Visual Symptoms
                </h4>
                <div className="space-y-2">
                  {activeModalDisease.symptoms.map((s, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#E8F5E9]">
                      <span className="text-[#66BB6A] font-extrabold">•</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeModalDisease.favorableConditions && (
                <div className="p-4 bg-black/35 rounded-2xl border border-[#66BB6A]/25">
                  <h4 className="text-xs font-bold text-[#A5D6A7] uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                    <ThermometerSun className="w-4 h-4 text-[#66BB6A]" />
                    <span>Favorable Weather Triggers</span>
                  </h4>
                  <p className="text-xs text-[#E8F5E9] leading-relaxed font-normal">
                    {activeModalDisease.favorableConditions}
                  </p>
                </div>
              )}

              {activeModalDisease.chemicalControl?.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold text-[#A5D6A7] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Pill className="w-3.5 h-3.5 text-[#66BB6A]" />
                    <span>Chemical Treatment</span>
                  </h4>
                  <div className="space-y-2">
                    {activeModalDisease.chemicalControl.map((c, idx) => (
                      <div key={idx} className="p-3 bg-black/40 border border-[#66BB6A]/25 rounded-xl text-xs text-[#E8F5E9] font-medium">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalDisease.culturalPractices?.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold text-[#A5D6A7] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#66BB6A]" />
                    <span>Cultural & Agronomic Field Practices</span>
                  </h4>
                  <div className="space-y-2">
                    {activeModalDisease.culturalPractices.map((cp, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-[#E8F5E9]">
                        <span className="text-[#66BB6A] font-bold">•</span>
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-5 border-t border-[#66BB6A]/20 flex justify-end">
              <button
                onClick={() => setActiveModalDisease(null)}
                className="px-6 py-2.5 rounded-xl bg-[#1B5E20] hover:bg-[#2E7D32] text-white text-xs font-bold uppercase tracking-wider border border-[#66BB6A]/40 transition-all"
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
