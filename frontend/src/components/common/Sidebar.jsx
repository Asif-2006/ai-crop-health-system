import React from 'react';
import { RiceLogo } from '../common/Header';
import { 
  LayoutDashboard, 
  Leaf, 
  BookOpen, 
  ShieldCheck, 
  Pill, 
  Map, 
  Clock, 
  FileText, 
  Settings,
  X,
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onClose }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'diagnose', label: 'Diagnose', icon: Leaf },
    { id: 'catalog', label: 'Disease Library', icon: BookOpen },
    { id: 'prevention', label: 'Prevention Guide', icon: ShieldCheck },
    { id: 'treatment', label: 'Treatment Guide', icon: Pill },
    { id: 'field', label: 'Field Management', icon: Map },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#142E20] text-slate-200 flex flex-col justify-between h-screen sticky top-0 border-r border-[#1D3E2C]/80 flex-shrink-0 select-none overflow-y-auto">
      
      {/* Top Brand Section */}
      <div>
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#1C3A2B]/80 sticky top-0 bg-[#142E20] z-10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#1C3E2B] border border-[#2B543C]/60 shadow-sm transition-transform duration-300 hover:scale-110">
              <RiceLogo className="w-7 h-7 flex-shrink-0" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-lg font-extrabold text-white tracking-tight">RiceVision</span>
                <span className="text-lg font-extrabold text-[#4ADE80]">AI</span>
              </div>
              <p className="text-[10px] text-[#A0BAA7] font-medium leading-none mt-0.5">
                AI Crop Health Monitoring
              </p>
            </div>
          </div>

          {/* Close button on mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1C3E2B] cursor-pointer"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation Menu with Animated Hover Effect */}
        <nav className="p-3 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold sidebar-link-hover cursor-pointer ${
                  isActive
                    ? 'bg-[#274C37] text-white shadow-sm border border-[#3E7053]/70 font-bold'
                    : 'text-[#C5D7CB] hover:text-white border border-transparent hover:border-[#335F47]/50'
                }`}
              >
                <div className={`p-1 rounded-lg transition-transform duration-200 group-hover:scale-115 ${
                  isActive ? 'bg-[#1C3E2B] text-[#4ADE80]' : 'text-[#A0BAA7] group-hover:text-[#4ADE80]'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="transition-transform duration-200 group-hover:translate-x-1">{item.label}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_6px_#4ADE80]"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Card: Healthy Rice Sustainable Future with Hover Animation */}
      <div className="p-4 mt-auto">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#1C422E] to-[#122A1E] border border-[#2E6145]/70 p-4 text-white shadow-lg transition-all duration-300 hover:border-[#4ADE80]/40 hover:shadow-emerald-950/40 hover:-translate-y-1 group cursor-pointer">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-1.5">
              <Leaf className="w-4 h-4 text-[#4ADE80] transition-transform duration-300 group-hover:rotate-12" />
              <h4 className="text-xs font-bold text-white">Healthy Rice</h4>
            </div>
            <p className="text-[11px] font-semibold text-emerald-300">Sustainable Future</p>
          </div>

          <div className="mt-3 relative h-24 rounded-xl overflow-hidden border border-[#2F6146]/50">
            <img
              src="/images/hero_rice.jpg"
              alt="Healthy Paddy Rice"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
              <p className="text-[9px] text-slate-300 font-medium leading-tight">
                Powered by AI<br />for Better Farming
              </p>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}
