import React from 'react';
import { Sprout, Activity, Database, BarChart3, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, backendStatus, onRefreshStatus }) {
  return (
    <header className="border-b border-maroon-900/60 bg-maroon-950/80 backdrop-blur-xl sticky top-0 z-50 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Project Title */}
          <div className="flex items-center space-x-3.5 group cursor-pointer" onClick={() => setActiveTab('diagnose')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-maroon-800 via-rose-700 to-white flex items-center justify-center shadow-lg shadow-maroon-900/40 border border-white/30 transition-transform duration-300 group-hover:scale-105">
              <Sprout className="w-7 h-7 text-white drop-shadow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-['Manrope']">
                  RiceVision <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-300">AI</span>
                </span>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-white/10 text-rose-100 border border-white/20 backdrop-blur-sm">
                  CV-Service
                </span>
              </div>
              <p className="text-xs text-rose-200/70 font-medium">
                Paddy Leaf Pathology Diagnosis & Clinical Decision Support
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center space-x-1.5 bg-maroon-900/40 p-1.5 rounded-xl border border-maroon-700/40 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('diagnose')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'diagnose'
                  ? 'bg-gradient-to-r from-maroon-700 to-rose-700 text-white shadow-md shadow-maroon-950/50 border border-white/20'
                  : 'text-rose-100/80 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.1)]'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Diagnose Leaf</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'catalog'
                  ? 'bg-gradient-to-r from-maroon-700 to-rose-700 text-white shadow-md shadow-maroon-950/50 border border-white/20'
                  : 'text-rose-100/80 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.1)]'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>17-Disease Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                activeTab === 'benchmarks'
                  ? 'bg-gradient-to-r from-maroon-700 to-rose-700 text-white shadow-md shadow-maroon-950/50 border border-white/20'
                  : 'text-rose-100/80 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.1)]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Benchmarks & Metrics</span>
            </button>
          </div>

          {/* Service Status Indicator */}
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.15)] ${
              backendStatus.online 
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40' 
                : 'bg-amber-950/60 text-amber-200 border-amber-500/40'
            }`}>
              {backendStatus.online ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
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
              className="p-2 text-rose-200 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/30 hover:shadow-[inset_0_0_10px_rgba(255,255,255,0.2)]"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
