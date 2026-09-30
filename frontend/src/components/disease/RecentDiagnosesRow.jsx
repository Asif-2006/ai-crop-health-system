import React from 'react';
import { Clock, ChevronRight, ArrowRight } from 'lucide-react';

const RECENT_ITEMS = [
  {
    id: 'rec_1',
    name: 'Bacterial Blight',
    date: 'Sep 28, 2026 • 10:24 AM',
    severity: 'Severe',
    severityClass: 'bg-rose-100 text-rose-700 border-rose-200',
    image: '/images/bacterial_blight.jpg',
  },
  {
    id: 'rec_2',
    name: 'Blast',
    date: 'Sep 26, 2026 • 05:18 PM',
    severity: 'Moderate',
    severityClass: 'bg-amber-100 text-amber-700 border-amber-200',
    image: '/images/blast.jpg',
  },
  {
    id: 'rec_3',
    name: 'Brown Spot',
    date: 'Sep 24, 2026 • 11:02 AM',
    severity: 'Mild',
    severityClass: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    image: '/images/brown_spot.jpg',
  },
  {
    id: 'rec_4',
    name: 'Tungro',
    date: 'Sep 20, 2026 • 09:30 AM',
    severity: 'Moderate',
    severityClass: 'bg-amber-100 text-amber-700 border-amber-200',
    image: '/images/tungro.jpg',
  },
];

export default function RecentDiagnosesRow({ onSelectRecent, onViewHistory }) {
  return (
    <div className="space-y-3.5">
      
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-slate-700" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Recent Diagnoses
          </h3>
        </div>

        <button
          onClick={onViewHistory}
          className="text-xs sm:text-sm font-semibold text-[#193B2B] hover:text-[#2E7D32] inline-flex items-center space-x-1.5 transition-colors group cursor-pointer"
        >
          <span>View History</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {RECENT_ITEMS.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectRecent(item)}
            className="bg-white rounded-xl border border-slate-200/90 hover:border-slate-400/80 hover:shadow-md p-2.5 flex items-center justify-between cursor-pointer transition-all duration-200 group"
          >
            <div className="flex items-center space-x-3 min-w-0">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-[#2E7D32] transition-colors">
                  {item.name}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {item.date}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${item.severityClass}`}>
                {item.severity}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
