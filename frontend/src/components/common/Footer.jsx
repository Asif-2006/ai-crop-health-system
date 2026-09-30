import React from 'react';
import { Sprout } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#12281D] border-t border-[#1C3A2B] text-slate-300 py-4 text-[12px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand & Mission */}
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="font-bold text-white tracking-tight">
            RiceVision <span className="text-[#4ADE80]">AI</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400 text-xs">
            Helping Farmers Build Healthier Rice Crops with AI
          </span>
        </div>

        {/* Right: Links & Sustainable tag */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
          <a href="#about" className="hover:text-emerald-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-emerald-400 transition-colors">Contact</a>
          <a href="#privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-emerald-400 transition-colors">Terms of Service</a>
          
          <div className="flex items-center space-x-1.5 text-emerald-400 font-medium">
            <Sprout className="w-3.5 h-3.5" />
            <span>Made for a Sustainable Agriculture</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
