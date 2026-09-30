import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  X, 
  AlertTriangle, 
  CloudRain, 
  CheckCircle2, 
  Sprout, 
  Droplets, 
  Clock, 
  ChevronRight, 
  Trash2,
  ExternalLink
} from 'lucide-react';

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Bacterial Blight Alert in Malda',
    message: 'High humidity (>85%) detected in your sector. Recommended preventive Copper Oxychloride application.',
    time: '12 minutes ago',
    type: 'alert',
    unread: true,
    actionTab: 'treatment',
    actionLabel: 'View Treatment Guide',
    icon: AlertTriangle,
    iconBg: 'bg-rose-50 border-rose-200 text-rose-600',
  },
  {
    id: 'n2',
    title: 'Rainfall Forecast: Delay Spraying',
    message: 'Scattered pre-monsoon showers expected tomorrow afternoon. Avoid pesticide spraying within 24 hours of rain.',
    time: '1 hour ago',
    type: 'weather',
    unread: true,
    actionTab: 'dashboard',
    actionLabel: 'Check Weather Telemetry',
    icon: CloudRain,
    iconBg: 'bg-blue-50 border-blue-200 text-blue-600',
  },
  {
    id: 'n3',
    title: 'Field Plot C Water Level Low',
    message: 'Sensors recorded water depth of 1.5 cm in East Plot C (Basmati). Replenish to optimal 3-4 cm.',
    time: '3 hours ago',
    type: 'field',
    unread: true,
    actionTab: 'field',
    actionLabel: 'Open Field Plot Map',
    icon: Droplets,
    iconBg: 'bg-amber-50 border-amber-200 text-amber-700',
  },
  {
    id: 'n4',
    title: 'Weekly Pest Scouting Reminder',
    message: 'Scheduled 7-day visual inspection for green leafhopper vectors on Swarna Sub-1 seedlings.',
    time: 'Yesterday',
    type: 'task',
    unread: false,
    actionTab: 'diagnose',
    actionLabel: 'Start New Leaf Scan',
    icon: Sprout,
    iconBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
  },
];

export default function NotificationDrawer({ 
  isOpen, 
  onClose, 
  onNavigateTab,
  onNotificationsChange
}) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState('all');

  // Handle ESC key press to close drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Keep parent in sync with unread count
  useEffect(() => {
    const unreadCount = notifications.filter(n => n.unread).length;
    if (onNotificationsChange) {
      onNotificationsChange(unreadCount);
    }
  }, [notifications, onNotificationsChange]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const removeNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleNotificationClick = (item) => {
    // Mark this item as read
    setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, unread: false } : n));
    if (item.actionTab && onNavigateTab) {
      onNavigateTab(item.actionTab);
      onClose();
    }
  };

  const filteredList = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    if (filter === 'alerts') return n.type === 'alert' || n.type === 'weather';
    return true;
  });

  return (
    <>
      {/* Dimmed backdrop - Clicking outside closes the drawer */}
      <div 
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-over panel coming smoothly from the right side */}
      <aside 
        aria-label="Notifications panel"
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] max-w-full bg-white shadow-2xl flex flex-col border-l border-slate-200 transition-transform duration-300 ease-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-[#FCFDFB] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EAF5EC] text-[#2E7D32] flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900 leading-tight">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#193B2B] text-white text-[10px] font-extrabold">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Real-time farm surveillance & disease alerts
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close notification panel"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills & Actions Bar */}
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs flex-shrink-0">
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                filter === 'unread'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('alerts')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                filter === 'alerts'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Alerts
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] font-semibold text-[#2E7D32] hover:text-[#1F5422] transition-colors cursor-pointer"
            >
              Mark all read
            </button>
          )}
        </div>

        {/* Notifications Scrollable List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y-0">
          {filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-[#2E7D32] flex items-center justify-center mb-3 border border-emerald-100">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800">You're all caught up!</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-[220px]">
                No new notifications or agro-weather alerts at this time.
              </p>
            </div>
          ) : (
            filteredList.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer relative group ${
                    item.unread
                      ? 'bg-white border-slate-200/90 shadow-sm hover:border-[#2E7D32] hover:shadow-md'
                      : 'bg-slate-50/60 border-slate-100 hover:bg-white hover:border-slate-200'
                  }`}
                >
                  {/* Unread indicator blue/green pip */}
                  {item.unread && (
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-[#2E7D32] ring-2 ring-emerald-100"></span>
                  )}

                  <div className="flex items-start space-x-3">
                    <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 mt-0.5 ${item.iconBg}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="min-w-0 flex-1 pr-3">
                      <h4 className={`text-xs sm:text-[13px] font-bold leading-snug group-hover:text-[#2E7D32] transition-colors ${
                        item.unread ? 'text-slate-900' : 'text-slate-700'
                      }`}>
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {item.message}
                      </p>

                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                        <span className="text-[10px] text-slate-400 font-medium flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{item.time}</span>
                        </span>

                        <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#193B2B] hover:text-[#2E7D32]">
                          <span>{item.actionLabel}</span>
                          <ChevronRight className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        {notifications.length > 0 && (
          <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between flex-shrink-0">
            <span className="text-[11px] text-slate-500 font-medium">
              Malda Field Station • Live Sentinel
            </span>
            <button
              onClick={clearAllNotifications}
              className="text-[11px] font-semibold text-rose-600 hover:text-rose-700 flex items-center space-x-1 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear all</span>
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
