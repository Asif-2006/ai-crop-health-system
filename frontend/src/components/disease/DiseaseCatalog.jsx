import React, { useState } from 'react';
import { RICE_DISEASES } from '../../data/riceDiseases';
import { Search, Filter, Bug, Sprout, ShieldAlert, Sparkles, ChevronRight, X, Pill, Shield, ThermometerSun } from 'lucide-react';

export default function DiseaseCatalog({ onSelectDisease }) {
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
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
              <Sprout className="w-5 h-5 text-[#2E7D32]" />
              <span>17 Rice Leaf Conditions & Pathologies</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive clinical pathology library supported natively by RiceVision AI
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
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2E7D32]"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Type Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-slate-100">
          {Object.entries(typeCounts).map(([type, count]) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all ${
                selectedType === type
                  ? 'bg-[#193B2B] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{type}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedType === type ? 'bg-[#2E7D32] text-white' : 'bg-slate-200 text-slate-700'
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
            Fungal: 'bg-purple-50 text-purple-700 border-purple-200',
            Bacterial: 'bg-blue-50 text-blue-700 border-blue-200',
            Viral: 'bg-amber-50 text-amber-700 border-amber-200',
            'Insect Pest': 'bg-rose-50 text-rose-700 border-rose-200',
            Healthy: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          }[disease.type] || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <div
              key={disease.id}
              onClick={() => setActiveModalDisease(disease)}
              className="bg-white rounded-xl border border-slate-200/90 hover:border-[#2E7D32] hover:shadow-md p-5 flex flex-col justify-between transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${typeColor}`}>
                    {disease.type}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">17-Class Model</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#2E7D32] transition-colors">
                  {disease.name}
                </h3>
                <p className="text-xs text-slate-500 italic mt-0.5">
                  {disease.pathogen}
                </p>
                <p className="text-xs text-slate-600 mt-2.5 line-clamp-2">
                  {disease.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#193B2B] group-hover:text-[#2E7D32]">
                <span>View Agronomic Protocol</span>
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Disease Detail Modal */}
      {activeModalDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl relative">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#2E7D32] uppercase">
                  {activeModalDisease.type} Pathology
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {activeModalDisease.name}
                </h3>
                <p className="text-xs text-slate-500 italic">
                  Pathogen: {activeModalDisease.pathogen}
                </p>
              </div>
              <button
                onClick={() => setActiveModalDisease(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-slate-700">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Description</h4>
                <p className="leading-relaxed">{activeModalDisease.description}</p>
              </div>

              <div className="bg-[#F8FAF7] p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
                  <ThermometerSun className="w-4 h-4 text-amber-600" />
                  <span>Clinical Symptoms</span>
                </h4>
                <p className="leading-relaxed">{activeModalDisease.symptoms}</p>
              </div>

              <div className="bg-[#F8FAF7] p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
                  <Pill className="w-4 h-4 text-[#2E7D32]" />
                  <span>Chemical Remediation</span>
                </h4>
                <p className="leading-relaxed">{activeModalDisease.chemicalControl}</p>
              </div>

              <div className="bg-[#F8FAF7] p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1 flex items-center space-x-1.5">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Cultural & Biological Measures</span>
                </h4>
                <p className="leading-relaxed">{activeModalDisease.culturalPractices}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setActiveModalDisease(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
