import React, { useState } from 'react';
import { 
  Calendar, 
  ChevronDown, 
  ArrowUpRight, 
  AlertTriangle, 
  ShieldCheck, 
  BarChart3, 
  Sprout, 
  ChevronRight, 
  ArrowRight, 
  Camera, 
  BookOpen, 
  FileText, 
  Sun, 
  Droplets, 
  CloudRain, 
  Wind, 
  Sparkles,
  Check 
} from 'lucide-react';

const MONTH_DISTRIBUTIONS = {
  'Oct': {
    label: 'Oct',
    fullLabel: 'October 2026',
    data: [
      { id: 'healthy', name: 'Healthy', count: 19, color: '#22C55E', hoverColor: '#16A34A', bgLight: 'bg-emerald-50', borderLight: 'border-emerald-200', textLight: 'text-emerald-800' },
      { id: 'bacterial_blight', name: 'Bacterial Blight', count: 2, color: '#EF4444', hoverColor: '#DC2626', bgLight: 'bg-rose-50', borderLight: 'border-rose-200', textLight: 'text-rose-800' },
      { id: 'brown_spot', name: 'Brown Spot', count: 1, color: '#F59E0B', hoverColor: '#D97706', bgLight: 'bg-amber-50', borderLight: 'border-amber-200', textLight: 'text-amber-800' },
      { id: 'tungro', name: 'Tungro', count: 1, color: '#FB923C', hoverColor: '#EA580C', bgLight: 'bg-orange-50', borderLight: 'border-orange-200', textLight: 'text-orange-800' },
      { id: 'blast', name: 'Blast', count: 1, color: '#8B5CF6', hoverColor: '#7C3AED', bgLight: 'bg-purple-50', borderLight: 'border-purple-200', textLight: 'text-purple-800' },
    ]
  },
  'Sep': {
    label: 'Sep',
    fullLabel: 'September 2026',
    data: [
      { id: 'healthy', name: 'Healthy', count: 22, color: '#22C55E', hoverColor: '#16A34A', bgLight: 'bg-emerald-50', borderLight: 'border-emerald-200', textLight: 'text-emerald-800' },
      { id: 'bacterial_blight', name: 'Bacterial Blight', count: 4, color: '#EF4444', hoverColor: '#DC2626', bgLight: 'bg-rose-50', borderLight: 'border-rose-200', textLight: 'text-rose-800' },
      { id: 'brown_spot', name: 'Brown Spot', count: 3, color: '#F59E0B', hoverColor: '#D97706', bgLight: 'bg-amber-50', borderLight: 'border-amber-200', textLight: 'text-amber-800' },
      { id: 'tungro', name: 'Tungro', count: 2, color: '#FB923C', hoverColor: '#EA580C', bgLight: 'bg-orange-50', borderLight: 'border-orange-200', textLight: 'text-orange-800' },
      { id: 'blast', name: 'Blast', count: 1, color: '#8B5CF6', hoverColor: '#7C3AED', bgLight: 'bg-purple-50', borderLight: 'border-purple-200', textLight: 'text-purple-800' },
    ]
  },
  'Aug': {
    label: 'Aug',
    fullLabel: 'August 2026',
    data: [
      { id: 'healthy', name: 'Healthy', count: 16, color: '#22C55E', hoverColor: '#16A34A', bgLight: 'bg-emerald-50', borderLight: 'border-emerald-200', textLight: 'text-emerald-800' },
      { id: 'bacterial_blight', name: 'Bacterial Blight', count: 5, color: '#EF4444', hoverColor: '#DC2626', bgLight: 'bg-rose-50', borderLight: 'border-rose-200', textLight: 'text-rose-800' },
      { id: 'brown_spot', name: 'Brown Spot', count: 2, color: '#F59E0B', hoverColor: '#D97706', bgLight: 'bg-amber-50', borderLight: 'border-amber-200', textLight: 'text-amber-800' },
      { id: 'tungro', name: 'Tungro', count: 2, color: '#FB923C', hoverColor: '#EA580C', bgLight: 'bg-orange-50', borderLight: 'border-orange-200', textLight: 'text-orange-800' },
      { id: 'blast', name: 'Blast', count: 2, color: '#8B5CF6', hoverColor: '#7C3AED', bgLight: 'bg-purple-50', borderLight: 'border-purple-200', textLight: 'text-purple-800' },
    ]
  },
  'Jul': {
    label: 'Jul',
    fullLabel: 'July 2026',
    data: [
      { id: 'healthy', name: 'Healthy', count: 14, color: '#22C55E', hoverColor: '#16A34A', bgLight: 'bg-emerald-50', borderLight: 'border-emerald-200', textLight: 'text-emerald-800' },
      { id: 'bacterial_blight', name: 'Bacterial Blight', count: 1, color: '#EF4444', hoverColor: '#DC2626', bgLight: 'bg-rose-50', borderLight: 'border-rose-200', textLight: 'text-rose-800' },
      { id: 'brown_spot', name: 'Brown Spot', count: 2, color: '#F59E0B', hoverColor: '#D97706', bgLight: 'bg-amber-50', borderLight: 'border-amber-200', textLight: 'text-amber-800' },
      { id: 'tungro', name: 'Tungro', count: 1, color: '#FB923C', hoverColor: '#EA580C', bgLight: 'bg-orange-50', borderLight: 'border-orange-200', textLight: 'text-orange-800' },
      { id: 'blast', name: 'Blast', count: 0, color: '#8B5CF6', hoverColor: '#7C3AED', bgLight: 'bg-purple-50', borderLight: 'border-purple-200', textLight: 'text-purple-800' },
    ]
  }
};

export default function DashboardView({ onNavigateTab, onSelectDiagnosis }) {
  const [dateRangeOption, setDateRangeOption] = useState('7d');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDistMonth, setSelectedDistMonth] = useState('Oct');
  const [showDistMonthPicker, setShowDistMonthPicker] = useState(false);
  const [activeDiseaseId, setActiveDiseaseId] = useState(null);

  // Dynamic Date Helper
  const now = new Date();

  const formatDateShort = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateTime = (daysAgo, hours, minutes, period) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    const datePart = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${datePart} • ${hours}:${minutes} ${period}`;
  };

  // Dynamic Date Range Calculation
  const getDateRangeLabel = () => {
    const end = new Date();
    const start = new Date();

    if (dateRangeOption === 'today') {
      return `Today (${formatDateShort(end)})`;
    } else if (dateRangeOption === '7d') {
      start.setDate(start.getDate() - 6);
      return `${formatDateShort(start)} - ${formatDateShort(end)}`;
    } else if (dateRangeOption === '30d') {
      start.setDate(start.getDate() - 29);
      return `${formatDateShort(start)} - ${formatDateShort(end)}`;
    } else if (dateRangeOption === 'month') {
      return end.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    start.setDate(start.getDate() - 6);
    return `${formatDateShort(start)} - ${formatDateShort(end)}`;
  };

  const currentTimeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const reminderDateStr = tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const recentDiagnoses = [
    {
      id: 'd1',
      name: 'Bacterial Blight',
      date: formatDateTime(0, '10', '24', 'AM'),
      severity: 'Severe',
      severityClass: 'bg-rose-50 text-rose-700 border-rose-200/70',
      image: '/images/bacterial_blight.jpg',
    },
    {
      id: 'd2',
      name: 'Brown Spot',
      date: formatDateTime(1, '04', '18', 'PM'),
      severity: 'Moderate',
      severityClass: 'bg-amber-50 text-amber-800 border-amber-200/70',
      image: '/images/brown_spot.jpg',
    },
    {
      id: 'd3',
      name: 'Healthy',
      date: formatDateTime(2, '11', '02', 'AM'),
      severity: 'Healthy',
      severityClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
      image: '/images/healthy.jpg',
    },
    {
      id: 'd4',
      name: 'Tungro',
      date: formatDateTime(3, '09', '30', 'AM'),
      severity: 'Moderate',
      severityClass: 'bg-amber-50 text-amber-800 border-amber-200/70',
      image: '/images/tungro.jpg',
    },
    {
      id: 'd5',
      name: 'Blast',
      date: formatDateTime(4, '02', '15', 'PM'),
      severity: 'Severe',
      severityClass: 'bg-rose-50 text-rose-700 border-rose-200/70',
      image: '/images/blast.jpg',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Overview of your field health, recent diagnoses, and insights
          </p>
        </div>

        {/* Dynamic Date Filter Dropdown */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center space-x-2 bg-white hover:bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 shadow-sm cursor-pointer transition-all hover:border-[#2E7D32]/50 hover:shadow-md"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
            <span>{getDateRangeLabel()}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Date Range Selection Menu */}
          {showDatePicker && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50 animate-fadeIn">
              <div className="text-[10px] font-bold text-slate-400 uppercase px-3 py-1.5">
                Select Time Window
              </div>
              <button
                onClick={() => { setDateRangeOption('today'); setShowDatePicker(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between transition-colors"
              >
                <span>Today</span>
                {dateRangeOption === 'today' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
              <button
                onClick={() => { setDateRangeOption('7d'); setShowDatePicker(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between transition-colors"
              >
                <span>Past 7 Days</span>
                {dateRangeOption === '7d' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
              <button
                onClick={() => { setDateRangeOption('30d'); setShowDatePicker(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between transition-colors"
              >
                <span>Past 30 Days</span>
                {dateRangeOption === '30d' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
              <button
                onClick={() => { setDateRangeOption('month'); setShowDatePicker(false); }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center justify-between transition-colors"
              >
                <span>This Calendar Month</span>
                {dateRangeOption === 'month' && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 4 Stats Cards with animated hover and softer border */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Diagnoses */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect card-hover-emerald flex items-center justify-between group cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 text-emerald-700 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-slate-900">24</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center">
                  <ArrowUpRight className="w-2.5 h-2.5" /> 12%
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-700 mt-0.5 group-hover:text-emerald-700 transition-colors">Total Diagnoses</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Images analyzed {dateRangeOption === '7d' ? 'this week' : 'this period'}</p>
            </div>
          </div>
        </div>

        {/* Card 2: Diseased Samples */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect card-hover-rose flex items-center justify-between group cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/60 text-rose-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-slate-900">5</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center">
                  <ArrowUpRight className="w-2.5 h-2.5" /> 8%
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-700 mt-0.5 group-hover:text-rose-600 transition-colors">Diseased Samples</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Need attention</p>
            </div>
          </div>
        </div>

        {/* Card 3: Healthy Samples */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect card-hover-blue flex items-center justify-between group cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/60 text-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-black text-slate-900">19</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-full flex items-center">
                  <ArrowUpRight className="w-2.5 h-2.5" /> 15%
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-700 mt-0.5 group-hover:text-blue-600 transition-colors">Healthy Samples</h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Good crop health</p>
            </div>
          </div>
        </div>

        {/* Card 4: Model Accuracy */}
        <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect card-hover-purple flex items-center justify-between group cursor-pointer">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/60 text-purple-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900">94.8%</span>
              <h4 className="text-xs font-bold text-slate-700 mt-0.5 flex items-center space-x-1 group-hover:text-purple-600 transition-colors">
                <span>Model Accuracy</span>
                <span className="text-[10px] text-slate-400">ⓘ</span>
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">Verified on real field data</p>
            </div>
          </div>
        </div>

      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column (4 Cols): Recent Diagnoses */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Recent Diagnoses</h3>
              <button 
                onClick={() => onNavigateTab('history')}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2">
              {recentDiagnoses.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectDiagnosis(item)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/40 border border-slate-100 hover:border-[#2E7D32]/30 cursor-pointer transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                        {item.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1.5 flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${item.severityClass}`}>
                      {item.severity}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column (4 Cols): Disease Distribution & Field Health Overview */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Donut Chart Card with Dynamic Calendar & Interactive Bidirectional Highlighting */}
          {(() => {
            const currentDist = MONTH_DISTRIBUTIONS[selectedDistMonth] || MONTH_DISTRIBUTIONS['Oct'];
            const distTotal = currentDist.data.reduce((acc, item) => acc + item.count, 0);
            const CIRCUMFERENCE = 238.761; // 2 * PI * r (r=38)
            let accumulatedDash = 0;

            const donutSlices = currentDist.data.map((item) => {
              const percentage = distTotal > 0 ? (item.count / distTotal) * 100 : 0;
              const strokeDash = (percentage / 100) * CIRCUMFERENCE;
              const offset = -accumulatedDash;
              accumulatedDash += strokeDash;
              return {
                ...item,
                percentage: percentage.toFixed(1),
                strokeDasharray: `${strokeDash} ${CIRCUMFERENCE}`,
                strokeDashoffset: offset,
              };
            });

            const activeItem = donutSlices.find(d => d.id === activeDiseaseId);

            return (
              <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect">
                
                {/* Header with Dynamic Month Selector Dropdown */}
                <div className="flex items-center justify-between mb-3 relative">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">Disease Distribution</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">Categorized pathology breakdown</p>
                  </div>
                  
                  {/* Dynamic Month Dropdown Button */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowDistMonthPicker(!showDistMonthPicker)}
                      className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/70 px-2.5 py-1 rounded-lg border border-slate-200/80 transition-all cursor-pointer shadow-2xs"
                    >
                      <span>{currentDist.label}</span>
                      <ChevronDown className="w-3 h-3 text-slate-500" />
                    </button>

                    {/* Dropdown Menu with Outside Click Dismiss */}
                    {showDistMonthPicker && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setShowDistMonthPicker(false)}
                        />
                        <div className="absolute right-0 mt-1.5 w-40 bg-white rounded-xl shadow-xl border border-slate-200/90 p-1.5 z-50 animate-fadeIn">
                          <div className="text-[9px] font-bold text-slate-400 uppercase px-2 py-1">
                            Select Month
                          </div>
                          {Object.keys(MONTH_DISTRIBUTIONS).map((monthKey) => (
                            <button
                              key={monthKey}
                              onClick={() => {
                                setSelectedDistMonth(monthKey);
                                setShowDistMonthPicker(false);
                                setActiveDiseaseId(null);
                              }}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                                selectedDistMonth === monthKey
                                  ? 'bg-emerald-50 text-emerald-800 font-bold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span>{MONTH_DISTRIBUTIONS[monthKey].fullLabel}</span>
                              {selectedDistMonth === monthKey && (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              )}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Donut Chart & Synchronized Legend */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
                  
                  {/* Globe / Donut Circle with Interactive Slices */}
                  <div className="relative w-32 h-32 flex items-center justify-center flex-shrink-0 select-none">
                    <svg 
                      className="w-full h-full transform -rotate-90 overflow-visible" 
                      viewBox="0 0 100 100"
                    >
                      {donutSlices.map((slice) => {
                        if (slice.count === 0) return null;
                        const isHighlighted = activeDiseaseId === slice.id;
                        const isDimmed = activeDiseaseId && !isHighlighted;
                        return (
                          <circle
                            key={slice.id}
                            cx="50"
                            cy="50"
                            r="38"
                            fill="transparent"
                            stroke={isHighlighted ? slice.hoverColor : slice.color}
                            strokeWidth={isHighlighted ? 17 : 13}
                            strokeDasharray={slice.strokeDasharray}
                            strokeDashoffset={slice.strokeDashoffset}
                            className="transition-all duration-300 cursor-pointer"
                            style={{
                              opacity: isDimmed ? 0.35 : 1,
                              filter: isHighlighted ? `drop-shadow(0 0 5px ${slice.color}99)` : 'none'
                            }}
                            onMouseEnter={() => setActiveDiseaseId(slice.id)}
                            onMouseLeave={() => setActiveDiseaseId(null)}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDiseaseId(prev => prev === slice.id ? null : slice.id);
                            }}
                          />
                        );
                      })}
                    </svg>
                    
                    {/* Donut Center Display */}
                    <div className="absolute text-center pointer-events-none transition-all duration-200 px-1">
                      {activeItem ? (
                        <>
                          <span 
                            className="text-lg font-black block leading-none transition-colors"
                            style={{ color: activeItem.hoverColor }}
                          >
                            {activeItem.count}
                          </span>
                          <p className="text-[10px] font-bold text-slate-700 leading-tight mt-0.5 truncate max-w-[70px]">
                            {activeItem.percentage}%
                          </p>
                        </>
                      ) : (
                        <>
                          <span className="text-xl font-black text-slate-900 leading-none">
                            {distTotal}
                          </span>
                          <p className="text-[10px] text-slate-400 leading-none mt-0.5 font-semibold">
                            Total
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Legend with Hover / Click Synchronized Highlighting */}
                  <div className="space-y-1 text-[11px] font-semibold w-full sm:flex-1 sm:pl-3">
                    {donutSlices.map((item) => {
                      const isHighlighted = activeDiseaseId === item.id;
                      const isDimmed = activeDiseaseId && !isHighlighted;
                      return (
                        <div 
                          key={item.id}
                          onMouseEnter={() => setActiveDiseaseId(item.id)}
                          onMouseLeave={() => setActiveDiseaseId(null)}
                          onClick={() => setActiveDiseaseId(prev => prev === item.id ? null : item.id)}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-xl cursor-pointer transition-all duration-200 ${
                            isHighlighted 
                              ? `${item.bgLight} ${item.borderLight} border shadow-xs scale-[1.02]` 
                              : isDimmed 
                                ? 'opacity-40 hover:opacity-100 border border-transparent' 
                                : 'hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          <span className="flex items-center space-x-1.5 min-w-0 pr-2">
                            <span 
                              className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-transform duration-200"
                              style={{ 
                                backgroundColor: item.color,
                                transform: isHighlighted ? 'scale(1.4)' : 'scale(1)',
                                boxShadow: isHighlighted ? `0 0 6px ${item.color}` : 'none'
                              }}
                            />
                            <span className={`truncate text-xs ${isHighlighted ? item.textLight + ' font-extrabold' : 'text-slate-700'}`}>
                              {item.name}
                            </span>
                          </span>
                          <span className={`text-xs flex-shrink-0 ${isHighlighted ? item.textLight + ' font-black' : 'text-slate-900 font-bold'}`}>
                            {item.count} ({item.percentage}%)
                          </span>
                        </div>
                      );
                    })}
                  </div>

                </div>

              </div>
            );
          })()}

          {/* Field Health Overview Card */}
          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect">
            <h3 className="text-sm font-bold text-slate-900 mb-3">Field Health Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-7 relative h-32 sm:h-28 rounded-xl overflow-hidden border border-slate-200/80">
                <img
                  src="/images/field_map.jpg"
                  alt="Aerial Field View"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-6 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow animate-pulse"></div>
                <div className="absolute bottom-4 left-10 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow"></div>
                <div className="absolute top-8 right-10 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white shadow animate-bounce"></div>
                <div className="absolute bottom-6 right-14 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white shadow"></div>
              </div>

              <div className="sm:col-span-5 space-y-2 text-[10px]">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-bold text-slate-800">Healthy Area</span>
                  </div>
                  <p className="text-slate-500 pl-3.5">3.2 acres (76%)</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span className="font-bold text-slate-800">Moderate Risk</span>
                  </div>
                  <p className="text-slate-500 pl-3.5">0.6 acres (14%)</p>
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span className="font-bold text-slate-800">High Risk</span>
                  </div>
                  <p className="text-slate-500 pl-3.5">0.4 acres (10%)</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onNavigateTab('field')}
              className="mt-3 w-full py-1.5 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 rounded-xl text-xs font-semibold text-emerald-700 border border-slate-200/70 transition-all cursor-pointer"
            >
              View Detailed Map
            </button>
          </div>

        </div>

        {/* Right Column (4 Cols): Quick Actions + Weather */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect">
            <h3 className="text-sm font-bold text-slate-900 mb-3.5">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              
              <button 
                onClick={() => onNavigateTab('diagnose')}
                className="p-3 rounded-xl bg-emerald-50/60 hover:bg-emerald-100/70 border border-emerald-200/60 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">New Diagnosis</h4>
                <p className="text-[10px] text-slate-500">Upload leaf image</p>
              </button>

              <button 
                onClick={() => onNavigateTab('catalog')}
                className="p-3 rounded-xl bg-blue-50/60 hover:bg-blue-100/70 border border-blue-200/60 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-800">Browse Diseases</h4>
                <p className="text-[10px] text-slate-500">Learn about diseases</p>
              </button>

              <button 
                onClick={() => onNavigateTab('prevention')}
                className="p-3 rounded-xl bg-slate-50/80 hover:bg-slate-100 border border-slate-200/70 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900">Prevention Guide</h4>
                <p className="text-[10px] text-slate-500">Best practices</p>
              </button>

              <button 
                onClick={() => onNavigateTab('reports')}
                className="p-3 rounded-xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/60 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2 transition-transform group-hover:scale-110">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-800">Generate Report</h4>
                <p className="text-[10px] text-slate-500">Download field report</p>
              </button>

            </div>
          </div>

          {/* Weather & Crop Conditions */}
          <div className="bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Weather & Crop Conditions</h3>
                <p className="text-[10px] text-slate-400 mt-0.5">Malda, West Bengal</p>
              </div>
              <span className="text-[9px] text-slate-400 font-mono">Updated {currentTimeString}</span>
            </div>

            <div className="flex items-center justify-between pt-1 pb-3">
              <div className="flex items-center space-x-3">
                <Sun className="w-10 h-10 text-amber-500 transition-transform duration-700 hover:rotate-90" />
                <div>
                  <span className="text-2xl font-black text-slate-900">28°C</span>
                  <p className="text-[10px] font-semibold text-slate-500 leading-tight">
                    Sunny<br />
                    <span className="font-normal text-[9px] text-emerald-700">Good for rice growth</span>
                  </p>
                </div>
              </div>

              <div className="space-y-1.5 text-[10px] text-slate-600 border-l border-slate-100 pl-4">
                <div className="flex items-center justify-between space-x-3">
                  <span className="flex items-center space-x-1"><Droplets className="w-3 h-3 text-blue-500" /><span>Humidity</span></span>
                  <span className="font-bold text-slate-900">65%</span>
                </div>
                <div className="flex items-center justify-between space-x-3">
                  <span className="flex items-center space-x-1"><CloudRain className="w-3 h-3 text-blue-500" /><span>Rainfall</span></span>
                  <span className="font-bold text-slate-900">0 mm</span>
                </div>
                <div className="flex items-center justify-between space-x-3">
                  <span className="flex items-center space-x-1"><Sprout className="w-3 h-3 text-emerald-500" /><span>Soil Moisture</span></span>
                  <span className="font-bold text-emerald-700">Normal</span>
                </div>
                <div className="flex items-center justify-between space-x-3">
                  <span className="flex items-center space-x-1"><Wind className="w-3 h-3 text-slate-500" /><span>Wind Speed</span></span>
                  <span className="font-bold text-slate-900">8 km/h</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Row: Treatment Reminders + AI Insights + Farming Tips */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Treatment Reminders */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Treatment Reminders</h3>
            <span className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer">View All</span>
          </div>

          <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:border-emerald-300 transition-colors">
            <img src="/images/bacterial_blight.jpg" alt="Treatment" className="w-10 h-10 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 truncate">Bacterial Blight</h4>
              <p className="text-[10px] text-slate-500 truncate">Apply Copper-based Fungicide</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-semibold text-slate-500">{reminderDateStr}</span>
            </div>
          </div>
        </div>

        {/* AI Insights (Beta) */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect">
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">AI Insights</h3>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 font-bold">Beta</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Based on your recent field analyses, bacterial blight is the most common issue in your area. Consider improving <strong className="text-slate-800">water management</strong> and maintaining proper spacing between plants.
          </p>
        </div>

        {/* Farming Tips */}
        <div className="md:col-span-4 bg-white rounded-2xl border border-slate-200/70 p-5 shadow-sm card-hover-effect">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900">Farming Tips</h3>
            <span className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 cursor-pointer">View All</span>
          </div>

          <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-emerald-50/40 transition-colors cursor-pointer group">
            <img src="/images/healthy.jpg" alt="Farming tips" className="w-10 h-10 rounded-lg object-cover transition-transform duration-200 group-hover:scale-105" />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 truncate transition-colors">
                Maintain Proper Water Level
              </h4>
              <p className="text-[10px] text-slate-500 line-clamp-1">
                Keep 2-5 cm water level to reduce disease risk and promote healthy growth.
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>

      </div>

    </div>
  );
}
