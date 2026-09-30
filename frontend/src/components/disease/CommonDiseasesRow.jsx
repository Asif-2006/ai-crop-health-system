import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';

const COMMON_SAMPLES = [
  {
    id: 'bacterial_blight',
    name: 'Bacterial Blight',
    pathogen: 'Xanthomonas oryzae',
    image: '/images/bacterial_blight.jpg',
  },
  {
    id: 'blast',
    name: 'Blast',
    pathogen: 'Magnaporthe oryzae',
    image: '/images/blast.jpg',
  },
  {
    id: 'brown_spot',
    name: 'Brown Spot',
    pathogen: 'Bipolaris oryzae',
    image: '/images/brown_spot.jpg',
  },
  {
    id: 'tungro',
    name: 'Tungro',
    pathogen: 'RTBV & RTSV',
    image: '/images/tungro.jpg',
  },
  {
    id: 'sheath_blight',
    name: 'Sheath Blight',
    pathogen: 'Rhizoctonia solani',
    image: '/images/sheath_blight.jpg',
  },
  {
    id: 'hispa',
    name: 'Hispa',
    pathogen: 'Dicladispa armigera',
    image: '/images/hispa.jpg',
  },
];

export default function CommonDiseasesRow({ onSelectSample, onViewAll }) {
  return (
    <div className="space-y-3.5">
      
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="text-[#2E7D32]">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L9 9l-7 1 5 5-1 7 6-3 6 3-1-7 5-5-7-1z" fill="#2E7D32" stroke="none" opacity="0.15" />
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6"/>
            </svg>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Common Rice Leaf Diseases <span className="font-normal text-slate-500 text-sm sm:text-base">(Sample Images)</span>
          </h3>
        </div>

        <button
          onClick={onViewAll}
          className="text-xs sm:text-sm font-semibold text-[#193B2B] hover:text-[#2E7D32] inline-flex items-center space-x-1.5 transition-colors group cursor-pointer"
        >
          <span>View All Diseases</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 6 Sample Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {COMMON_SAMPLES.map((sample) => (
          <div
            key={sample.id}
            onClick={() => onSelectSample(sample)}
            className="bg-white rounded-xl border border-slate-200/90 hover:border-[#2E7D32] hover:shadow-md p-2 flex items-center space-x-2.5 cursor-pointer transition-all duration-200 group overflow-hidden"
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100">
              <img
                src={sample.image}
                alt={sample.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#2E7D32] transition-colors">
                {sample.name}
              </h4>
              <p className="text-[10px] text-slate-500 truncate italic mt-0.5">
                {sample.pathogen}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
