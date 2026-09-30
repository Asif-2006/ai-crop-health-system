import React from 'react';
import { Search, Bell, Menu, ChevronDown } from 'lucide-react';

export default function Topbar({ 
  onToggleSidebar, 
  onOpenSettings, 
  onOpenNotifications,
  unreadCount = 3,
  userProfile 
}) {
  return (
    <header className="h-14 sm:h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-40">
      
      {/* Left Search Bar & Mobile Menu Trigger */}
      <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0 max-w-xl mr-2">
        <button 
          onClick={onToggleSidebar}
          aria-label="Open Navigation Menu"
          className="lg:hidden p-2 -ml-1 rounded-xl text-slate-600 hover:bg-slate-100 flex-shrink-0 cursor-pointer active:scale-95"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search diseases, solutions..."
            className="w-full pl-8 sm:pl-9 pr-3 py-1.5 sm:py-2 bg-slate-100/90 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-emerald-600 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Right User & Notifications */}
      <div className="flex items-center space-x-1.5 sm:space-x-3 flex-shrink-0">
        {/* Notification Bell with alert badge */}
        <button 
          onClick={onOpenNotifications}
          title="Open Notifications & Farm Alerts"
          aria-label="Notifications"
          className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>
          )}
        </button>

        {/* User profile (Clickable to open settings) */}
        <div 
          onClick={onOpenSettings}
          title="Click to edit profile & farm settings"
          className="flex items-center space-x-2 sm:space-x-3 pl-1.5 sm:pl-2 border-l border-slate-200 cursor-pointer group hover:bg-slate-50 p-1 sm:p-1.5 rounded-xl transition-all"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-slate-200 bg-slate-100 group-hover:border-emerald-500 transition-colors flex-shrink-0">
            <img
              src="/images/avatar.jpg"
              alt="Soriful Islam"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden sm:block text-left">
            <div className="flex items-center space-x-1">
              <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                {userProfile?.name || 'Soriful Islam'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-emerald-700 transition-colors" />
            </div>
            <p className="text-[10px] text-slate-500 leading-tight">
              {userProfile?.role || 'Farmer'} • {userProfile?.location?.split(',')[0] || 'Malda, WB'}
            </p>
          </div>
        </div>
      </div>

    </header>
  );
}
