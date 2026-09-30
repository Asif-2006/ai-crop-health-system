import React, { useState } from 'react';
import { 
  Home, 
  Leaf, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  ChevronDown, 
  CheckCircle2, 
  RefreshCw 
} from 'lucide-react';

export function RiceLogo({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central Stem */}
      <path 
        d="M20 5C18 13 14 23 10 32" 
        stroke="#EAB308" 
        strokeWidth="2.2" 
        strokeLinecap="round"
      />
      {/* Golden Grain kernels */}
      <path d="M15 9C13 10 12 13 13 15C14 16 16 15 17 13C17 11 16 9 15 9Z" fill="#FBBF24" />
      <path d="M18 5.5C16 6.5 15 9.5 16 11.5C17 12.5 19 11.5 20 9.5C20 7.5 19 5.5 18 5.5Z" fill="#F59E0B" />
      <path d="M12 14C10 15 9 18 10 20C11 21 13 20 14 18C14 16 13 14 12 14Z" fill="#FBBF24" />
      <path d="M9 19C7 20 6 23 7 25C8 26 10 25 11 23C11 21 10 19 9 19Z" fill="#F59E0B" />
      <path d="M7 24C5 25 4 28 5 30C6 31 8 30 9 28C9 26 8 24 7 24Z" fill="#FBBF24" />
      
      {/* Fresh Green Rice Leaves */}
      <path 
        d="M14 26C19 23 25 18 27 10C22 12 17 17 14 26Z" 
        fill="#4ADE80" 
      />
      <path 
        d="M12 29C15 27 20 25 23 20C19 21 15 24 12 29Z" 
        fill="#22C55E" 
      />
    </svg>
  );
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  backendStatus, 
  onRefreshStatus,
  onOpenCatalog,
  onOpenHistory
}) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  return (
    <header className="bg-[#142E20] border-b border-[#1D3E2C] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => setActiveTab('diagnose')}
            className="flex items-center space-x-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <RiceLogo className="w-9 h-9 transform group-hover:scale-105 transition-transform" />
            </div>
            <div>
              <div className="flex items-center space-x-1 leading-none">
                <span className="text-xl font-bold tracking-tight text-white">RiceVision</span>
                <span className="text-xl font-extrabold text-[#4ADE80]">AI</span>
              </div>
              <p className="text-[11px] text-[#A0BAA7] font-medium tracking-wide mt-1">
                AI Powered Rice Disease Detection
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-[#274C37] text-white border border-[#3A6B4F]'
                  : 'text-[#C5D7CB] hover:text-white hover:bg-[#1C3B2A]/60'
              }`}
            >
              <Home className="w-4 h-4 text-[#A0BAA7]" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnose')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                activeTab === 'diagnose'
                  ? 'bg-[#274C37] text-white border border-[#3A6B4F] shadow-sm'
                  : 'text-[#C5D7CB] hover:text-white hover:bg-[#1C3B2A]/60'
              }`}
            >
              <Leaf className="w-4 h-4 text-[#4ADE80]" />
              <span>Diagnose</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('catalog');
                if (onOpenCatalog) onOpenCatalog();
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === 'catalog'
                  ? 'bg-[#274C37] text-white border border-[#3A6B4F]'
                  : 'text-[#C5D7CB] hover:text-white hover:bg-[#1C3B2A]/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#A0BAA7]" />
              <span>Disease Library</span>
            </button>

            <button
              onClick={() => setActiveTab('prevention')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === 'prevention'
                  ? 'bg-[#274C37] text-white border border-[#3A6B4F]'
                  : 'text-[#C5D7CB] hover:text-white hover:bg-[#1C3B2A]/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#A0BAA7]" />
              <span>Prevention</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('history');
                if (onOpenHistory) onOpenHistory();
              }}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === 'history'
                  ? 'bg-[#274C37] text-white border border-[#3A6B4F]'
                  : 'text-[#C5D7CB] hover:text-white hover:bg-[#1C3B2A]/60'
              }`}
            >
              <Clock className="w-4 h-4 text-[#A0BAA7]" />
              <span>History</span>
            </button>
          </nav>

          {/* AI Model Online Status Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-full bg-[#1A3B29] hover:bg-[#204732] border border-[#2B543C] text-xs font-semibold text-[#E2ECE5] transition-all shadow-sm cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_#4ADE80] animate-pulse"></span>
              <span>AI Model Online</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#9EB9A6]" />
            </button>

            {/* Dropdown status popover */}
            {showStatusMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-4 z-50 animate-fadeIn">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">Neural Engine Active</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onRefreshStatus) onRefreshStatus();
                    }}
                    title="Refresh connection"
                    className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="py-2.5 space-y-1.5 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Backbone:</span>
                    <span className="font-semibold text-slate-800">EfficientNet-B0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Pathology Heads:</span>
                    <span className="font-semibold text-slate-800">17 Rice Diseases</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Benchmark Accuracy:</span>
                    <span className="font-semibold text-emerald-600">94.82% Top-1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Connection Mode:</span>
                    <span className="font-semibold text-slate-800">
                      {backendStatus?.online ? 'FastAPI Live (Port 8000)' : 'Standalone Local AI'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Fast Inference (&lt;120ms)</span>
                  <span className="text-emerald-600 font-semibold">100% Operational</span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
