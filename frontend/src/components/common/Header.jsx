import React from 'react';
import { Sprout, Activity, Database, BarChart3, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, backendStatus, onRefreshStatus }) {
  return (
    <header className="border-b border-[#66BB6A]/25 bg-[#0e3312]/90 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/30 font-galgo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Project Title */}
          <div className="flex items-center space-x-3.5 group cursor-pointer" onClick={() => setActiveTab('diagnose')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#1B5E20] via-[#66BB6A] to-[#E8F5E9] flex items-center justify-center shadow-lg shadow-[#1B5E20]/40 border border-[#A5D6A7]/40 transition-transform duration-300 group-hover:scale-105">
              <Sprout className="w-7 h-7 text-[#0e3312] drop-shadow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-black tracking-wide text-white font-galgo uppercase">
                  RiceVision <span className="text-[#A5D6A7]">AI</span>
                </span>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#1B5E20]/80 text-[#E8F5E9] border border-[#66BB6A]/40 backdrop-blur-sm">
                  CV-Service
                </span>
              </div>
              <p className="text-xs text-[#A5D6A7]/80 font-medium tracking-wide">
                Paddy Leaf Pathology Diagnosis & Clinical Decision Support
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1.5 bg-[#091e0a]/60 p-1.5 rounded-2xl border border-[#66BB6A]/30 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('diagnose')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'diagnose'
                  ? 'bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white shadow-md border border-[#A5D6A7]/40'
                  : 'text-[#A5D6A7] hover:text-white hover:bg-[#66BB6A]/20 hover:shadow-[inset_0_0_12px_rgba(165,214,167,0.2)]'
              }`}
            >
              <Activity className="w-4 h-4 text-[#A5D6A7]" />
              <span className="uppercase text-xs tracking-wider">Diagnose Leaf</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'catalog'
                  ? 'bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white shadow-md border border-[#A5D6A7]/40'
                  : 'text-[#A5D6A7] hover:text-white hover:bg-[#66BB6A]/20 hover:shadow-[inset_0_0_12px_rgba(165,214,167,0.2)]'
              }`}
            >
              <Database className="w-4 h-4 text-[#A5D6A7]" />
              <span className="uppercase text-xs tracking-wider">17-Disease Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'benchmarks'
                  ? 'bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white shadow-md border border-[#A5D6A7]/40'
                  : 'text-[#A5D6A7] hover:text-white hover:bg-[#66BB6A]/20 hover:shadow-[inset_0_0_12px_rgba(165,214,167,0.2)]'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#A5D6A7]" />
              <span className="uppercase text-xs tracking-wider">Benchmarks & Metrics</span>
            </button>
          </div>

          {/* Service Status Indicator */}
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 hover:shadow-[inset_0_0_15px_rgba(102,187,106,0.25)] ${
              backendStatus.online 
                ? 'bg-[#1B5E20]/90 text-[#E8F5E9] border-[#66BB6A]/50' 
                : 'bg-amber-950/80 text-amber-200 border-amber-500/40'
            }`}>
              {backendStatus.online ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#66BB6A] animate-ping"></span>
                  <Wifi className="w-3.5 h-3.5 text-[#66BB6A]" />
                  <span className="hidden sm:inline">FastAPI: Live (Port 8000)</span>
                  <span className="sm:hidden">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Engine: Local Mode</span>
                  <span className="sm:hidden">Local</span>
                </>
              )}
            </div>

            <button 
              onClick={onRefreshStatus}
              title="Refresh connection status"
              className="p-2 text-[#A5D6A7] hover:text-white hover:bg-[#66BB6A]/20 rounded-xl transition-all duration-300 border border-[#66BB6A]/30 hover:border-[#A5D6A7] hover:shadow-[inset_0_0_10px_rgba(165,214,167,0.3)]"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
