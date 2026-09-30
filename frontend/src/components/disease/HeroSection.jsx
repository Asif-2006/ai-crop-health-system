import React from 'react';
import { Target, Leaf, FileText } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative rounded-2xl overflow-hidden py-4 sm:py-5 px-4 sm:px-7 bg-white/70 border border-slate-200/60 shadow-sm">
      
      {/* Right Background Graphic: Golden Rice Stalks (Subtle opacity on mobile to protect readability) */}
      <div className="absolute top-0 right-0 bottom-0 w-2/3 sm:w-1/2 lg:w-5/12 pointer-events-none overflow-hidden select-none opacity-25 sm:opacity-90">
        <img
          src="/images/hero_rice.jpg"
          alt="Golden Rice Ears"
          className="w-full h-full object-cover object-top filter contrast-[1.05]"
          style={{
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0) 100%)',
          }}
        />
        
        {/* Subtle wash overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-60" />

        {/* Calligraphic script: Healthy Rice for a Better Tomorrow */}
        <div className="absolute top-4 sm:top-5 right-28 sm:right-36 -rotate-6 z-10 hidden sm:block">
          <p className="font-script text-xl sm:text-2xl text-[#1F402C] drop-shadow-sm font-semibold tracking-wide">
            Healthy Rice
          </p>
          <p className="font-script text-base sm:text-lg text-[#274F37] drop-shadow-sm font-medium -mt-1 pl-1">
            for a Better Tomorrow
          </p>
          {/* Subtle curved underline flourish */}
          <svg className="w-32 sm:w-36 h-3 text-[#2E7D32]/60 -mt-1 ml-1" viewBox="0 0 160 16" fill="none">
            <path d="M5 12C35 4 110 5 155 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Left Content Area */}
      <div className="relative z-10 max-w-2xl">
        
        {/* Main Title - Compact & Exact */}
        <h1 className="text-xl sm:text-3xl lg:text-[34px] font-black text-[#111827] tracking-tight leading-tight">
          Detect. <span className="text-[#2E7D32]">Treat.</span> Prevent.
        </h1>

        {/* Subtitle - Compact */}
        <p className="mt-1 sm:mt-1.5 text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium">
          Upload a rice leaf image to detect diseases using our AI model.<br className="hidden sm:inline" />
          Get accurate diagnosis, severity analysis and expert treatment recommendations.
        </p>

        {/* 3 Value Pillars - Colorful Badges, High Opacity, Protected Width */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 lg:gap-6 pt-1 max-w-2xl">
          
          {/* Pillar 1: High Accuracy (Emerald / Eco Theme) */}
          <div className="flex items-center space-x-2.5 min-w-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-emerald-300/80 bg-emerald-50 text-emerald-700 flex items-center justify-center shadow-xs flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              <Target className="w-4 h-4 text-[#2E7D32] stroke-[2.4]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[13px] sm:text-sm font-extrabold text-slate-900 leading-tight truncate">
                High Accuracy
              </h4>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 leading-tight truncate">
                Trained on real field data
              </p>
            </div>
          </div>

          {/* Pillar 2: 17+ Disease Types (Golden Amber Theme) */}
          <div className="flex items-center space-x-2.5 min-w-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-amber-300/80 bg-amber-50 text-amber-700 flex items-center justify-center shadow-xs flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              <Leaf className="w-4 h-4 text-amber-700 stroke-[2.4]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[13px] sm:text-sm font-extrabold text-slate-900 leading-tight truncate">
                17+ Disease Types
              </h4>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 leading-tight truncate">
                Common rice diseases
              </p>
            </div>
          </div>

          {/* Pillar 3: Treatment Guidance (Clinical Blue Theme) */}
          <div className="flex items-center space-x-2.5 min-w-0 group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-blue-300/80 bg-blue-50 text-blue-700 flex items-center justify-center shadow-xs flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
              <FileText className="w-4 h-4 text-blue-700 stroke-[2.4]" />
            </div>
            <div className="min-w-0">
              <h4 className="text-[13px] sm:text-sm font-extrabold text-slate-900 leading-tight truncate">
                Treatment Guidance
              </h4>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-700 mt-0.5 leading-tight truncate">
                Cure and prevention tips
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
