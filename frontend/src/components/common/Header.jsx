import React from 'react';
import { Sprout, Activity, Database, BarChart3, Wifi, WifiOff, RefreshCw } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, backendStatus, onRefreshStatus }) {
  return (
    <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Project Title */}
          <div className="flex items-center space-x-3.5 group cursor-pointer" onClick={() => setActiveTab('diagnose')}>
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-nature-500 flex items-center justify-center shadow-md shadow-emerald-600/15 border border-emerald-500/20 transition-transform duration-300 group-hover:scale-105">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                  RiceVision <span className="text-emerald-600 font-black">AI</span>
                </span>
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  CV-Service
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Paddy Leaf Pathology Diagnosis & Agricultural Decision Support
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Somerstone-inspired minimalist layout) */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('diagnose')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'diagnose'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Diagnose Leaf</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'catalog'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Database className="w-4 h-4 text-emerald-600" />
              <span>17-Disease Catalog</span>
            </button>

            <button
              onClick={() => setActiveTab('benchmarks')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 ${
                activeTab === 'benchmarks'
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-extrabold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-600" />
              <span>Benchmarks & Metrics</span>
            </button>
          </div>

          {/* Service Status Indicator */}
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
              backendStatus.online 
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' 
                : 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm'
            }`}>
              {backendStatus.online ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline font-medium">FastAPI: Live (Port 8000)</span>
                  <span className="sm:hidden">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline font-medium">Engine: Local Mode</span>
                  <span className="sm:hidden">Local</span>
                </>
              )}
            </div>

            <button 
              onClick={onRefreshStatus}
              title="Refresh connection status"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300 border border-slate-200"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
