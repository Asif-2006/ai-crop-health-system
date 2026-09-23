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
      <div className="card-hover bg-white/95 border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-card-soft backdrop-blur-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 flex items-center space-x-2.5">
              <Sprout className="w-6 h-6 text-emerald-600" />
              <span>17 Rice Leaf Conditions & Pathologies</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans">
              Comprehensive clinical database supported natively by the EfficientNet-B0 architecture
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80 font-sans">
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pathology, pathogen, symptom..."
              className="w-full pl-10 pr-4 py-2.5 bg-emerald-50/40 border border-emerald-300/80 rounded-2xl text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2.5 mt-6 pt-5 border-t border-emerald-200/70">
          {Object.entries(typeCounts).map(([type, count]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`card-hover px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all duration-300 ${
                selectedType === type
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20 border border-emerald-700 font-extrabold'
                  : 'bg-emerald-50/70 text-emerald-900 hover:text-emerald-950 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <span>{type}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                selectedType === type ? 'bg-emerald-800 text-white' : 'bg-emerald-200/70 text-emerald-800 font-semibold'
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
            Fungal: 'bg-purple-50 text-purple-700 border-purple-200',
            Bacterial: 'bg-blue-50 text-blue-700 border-blue-200',
            Viral: 'bg-amber-50 text-amber-800 border-amber-200',
            'Insect Pest': 'bg-rose-50 text-rose-700 border-rose-200',
            Healthy: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          }[disease.type] || 'bg-slate-50 text-slate-700 border-slate-200';

          return (
            <div
              key={disease.name}
              onClick={() => setActiveModalDisease(disease)}
              className="card-hover bg-white/95 border border-emerald-200/80 hover:border-emerald-400 rounded-3xl p-6 shadow-xs transition-all cursor-pointer flex flex-col justify-between group backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${typeColor}`}>
                    {disease.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Severity: {disease.severityDefault}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {disease.name}
                </h3>
                <p className="text-xs text-slate-500 italic line-clamp-1 mt-1 font-sans">
                  {disease.pathogen}
                </p>

                <p className="text-xs text-slate-600 line-clamp-3 mt-3.5 leading-relaxed font-sans">
                  {disease.description}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold group-hover:text-emerald-800 transition-colors">
                <span>View Full Agronomic Sheet</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-emerald-600" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="card-hover text-center py-16 bg-white border border-slate-200 rounded-3xl text-slate-500 font-sans shadow-sm">
          <p className="text-sm font-medium">No rice pathology found matching your search filter.</p>
        </div>
      )}

      {/* Disease Detail Modal */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="card-hover bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setActiveModalDisease(null)}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-emerald-50 text-emerald-800 border-emerald-200">
                {activeModalDisease.type} Pathology
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2.5">{activeModalDisease.name}</h3>
              <p className="text-sm text-slate-500 italic mt-0.5 font-sans">{activeModalDisease.pathogen}</p>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 font-sans">
              {activeModalDisease.description}
            </p>

            <div className="space-y-4 font-sans">
              <div>
                <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2.5">
                  Diagnostic Visual Symptoms
                </h4>
                <div className="space-y-2">
                  {activeModalDisease.symptoms.map((s, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                      <span className="text-emerald-600 font-extrabold">•</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeModalDisease.favorableConditions && (
                <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                    <ThermometerSun className="w-4 h-4 text-amber-600" />
                    <span>Favorable Weather Triggers</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">
                    {activeModalDisease.favorableConditions}
                  </p>
                </div>
              )}

              {activeModalDisease.chemicalControl?.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Pill className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Chemical Treatment</span>
                  </h4>
                  <div className="space-y-2">
                    {activeModalDisease.chemicalControl.map((c, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalDisease.culturalPractices?.length > 0 && (
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cultural & Agronomic Field Practices</span>
                  </h4>
                  <div className="space-y-2">
                    {activeModalDisease.culturalPractices.map((cp, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-700">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-5 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setActiveModalDisease(null)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all"
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
