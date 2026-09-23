import React, { useState } from 'react';
import { RICE_DISEASES } from '../../data/riceDiseases';
import { Search, Filter, Bug, Sprout, ShieldAlert, Sparkles, ChevronRight, X, Pill, Shield, ThermometerSun } from 'lucide-react';

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
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              <span>17 Rice Leaf Conditions & Pathologies</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive clinical database supported natively by the EfficientNet-B0 architecture
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search disease, pathogen, symptom..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-800">
          {Object.entries(typeCounts).map(([type, count]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
                selectedType === type
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <span>{type}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedType === type ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDiseases.map((disease) => {
          const typeColor = {
            Fungal: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
            Bacterial: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
            Viral: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
            'Insect Pest': 'bg-rose-500/10 text-rose-400 border-rose-500/30',
            Healthy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          }[disease.type] || 'bg-slate-800 text-slate-300 border-slate-700';

          return (
            <div
              key={disease.name}
              onClick={() => setActiveModalDisease(disease)}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 shadow-lg transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${typeColor}`}>
                    {disease.type}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Default: {disease.severityDefault}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {disease.name}
                </h3>
                <p className="text-xs text-slate-400 italic line-clamp-1 mt-0.5">
                  {disease.pathogen}
                </p>

                <p className="text-xs text-slate-400 line-clamp-3 mt-3 leading-relaxed">
                  {disease.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>View Full Agronomic Sheet</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400">
          <p className="text-sm">No rice pathology found matching your filter criteria.</p>
        </div>
      )}

      {/* Disease Detail Modal */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveModalDisease(null)}
              className="absolute top-5 right-5 p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                {activeModalDisease.type} Pathology
              </span>
              <h3 className="text-2xl font-black text-white mt-1.5">{activeModalDisease.name}</h3>
              <p className="text-sm text-slate-400 italic">{activeModalDisease.pathogen}</p>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-5 p-3.5 bg-slate-950/60 rounded-xl border border-slate-800">
              {activeModalDisease.description}
            </p>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  Diagnostic Visual Symptoms
                </h4>
                <div className="space-y-1.5">
                  {activeModalDisease.symptoms.map((s, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeModalDisease.favorableConditions && (
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                    <ThermometerSun className="w-3.5 h-3.5" />
                    <span>Favorable Weather Triggers</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activeModalDisease.favorableConditions}
                  </p>
                </div>
              )}

              {activeModalDisease.chemicalControl?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Pill className="w-3.5 h-3.5" />
                    <span>Chemical Treatment</span>
                  </h4>
                  <div className="space-y-1.5">
                    {activeModalDisease.chemicalControl.map((c, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-950/60 border border-slate-800 rounded-lg text-xs text-slate-200">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeModalDisease.culturalPractices?.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Cultural & Agronomic Field Practices</span>
                  </h4>
                  <div className="space-y-1.5">
                    {activeModalDisease.culturalPractices.map((cp, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{cp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveModalDisease(null)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
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
