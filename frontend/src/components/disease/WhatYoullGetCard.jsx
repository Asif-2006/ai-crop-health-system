import React from 'react';
import { 
  BarChart3, 
  Leaf, 
  TrendingUp, 
  PlusSquare, 
  ShieldCheck 
} from 'lucide-react';

export default function WhatYoullGetCard() {
  const items = [
    {
      icon: (
        <svg className="w-5 h-5 text-[#2E7D32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
        </svg>
      ),
      title: 'Disease Identification',
      description: 'Name of the disease'
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-[#2E7D32]" />,
      title: 'Severity Analysis',
      description: 'Mild, Moderate or Severe'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#2E7D32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="5" r="1.5" fill="currentColor"/>
          <circle cx="12" cy="19" r="1.5" fill="currentColor"/>
          <circle cx="5" cy="12" r="1.5" fill="currentColor"/>
          <circle cx="19" cy="12" r="1.5" fill="currentColor"/>
        </svg>
      ),
      title: 'Affected Area',
      description: 'Percentage of infected area'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#2E7D32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8v8"/>
          <path d="M8 12h8"/>
          <rect width="18" height="18" x="3" y="3" rx="4"/>
        </svg>
      ),
      title: 'Treatment Recommendation',
      description: 'Suggested cure and medicines'
    },
    {
      icon: (
        <svg className="w-5 h-5 text-[#2E7D32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <path d="M9 12l2 2 4-4"/>
        </svg>
      ),
      title: 'Prevention Guidelines',
      description: 'Best practices to keep your crop healthy'
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-sm h-full flex flex-col justify-between">
      
      {/* Header */}
      <div className="flex items-start space-x-3 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-slate-100">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EAF5EC] text-[#2E7D32] flex items-center justify-center flex-shrink-0">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
            What you'll get
          </h2>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
            Our AI will analyze the leaf and provide:
          </p>
        </div>
      </div>

      {/* 5 Features List */}
      <div className="space-y-4 flex-1 flex flex-col justify-around py-1">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3.5 group">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5EC] flex items-center justify-center flex-shrink-0 group-hover:bg-[#DFEFDE] transition-colors">
              {item.icon}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
