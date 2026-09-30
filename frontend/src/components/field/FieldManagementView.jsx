import React, { useState } from 'react';
import { 
  Map, 
  MapPin, 
  Layers, 
  Plus, 
  Calendar, 
  Droplets, 
  Sprout, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  ChevronRight,
  TrendingUp,
  BarChart3
} from 'lucide-react';

export default function FieldManagementView() {
  const [selectedPlot, setSelectedPlot] = useState('p1');
  const [mapLayer, setMapLayer] = useState('satellite');

  const fieldPlots = [
    {
      id: 'p1',
      name: 'North Plot A (Swarna Sub-1)',
      area: '1.8 Acres',
      soil: 'Alluvial Loam',
      stage: 'Panicle Initiation (Day 62)',
      healthStatus: 'Moderate Risk',
      healthBadge: 'bg-amber-100 text-amber-800 border-amber-200',
      activeInfection: 'Bacterial Blight (Trace: 4%)',
      soilMoisture: '78% (Adequate)',
      waterLevel: '3.5 cm',
      lastSpray: 'Sep 26, 2026',
      nextAction: 'Schedule foliar copper bactericide spray',
      coordinates: '25.0108° N, 88.1411° E',
      pinColor: 'bg-amber-500'
    },
    {
      id: 'p2',
      name: 'South Plot B (MTU 1010)',
      area: '1.4 Acres',
      soil: 'Clayey Alluvium',
      stage: 'Active Tillering (Day 38)',
      healthStatus: 'Optimal Health',
      healthBadge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      activeInfection: 'None detected',
      soilMoisture: '82% (Ideal)',
      waterLevel: '4.0 cm',
      lastSpray: 'Sep 18, 2026',
      nextAction: 'Monitor water level during booting stage',
      coordinates: '25.0095° N, 88.1425° E',
      pinColor: 'bg-emerald-500'
    },
    {
      id: 'p3',
      name: 'East Plot C (Basmati Experimental)',
      area: '1.0 Acre',
      soil: 'Sandy Clay Loam',
      stage: 'Vegetative Seedling (Day 24)',
      healthStatus: 'High Alert',
      healthBadge: 'bg-rose-100 text-rose-700 border-rose-200',
      activeInfection: 'Blast Lesions (8% foliage)',
      soilMoisture: '71% (Drying out)',
      waterLevel: '1.5 cm (Low)',
      lastSpray: 'Pending',
      nextAction: 'Immediate Tricyclazole foliar application required',
      coordinates: '25.0120° N, 88.1440° E',
      pinColor: 'bg-rose-500'
    }
  ];

  const currentPlot = fieldPlots.find(p => p.id === selectedPlot) || fieldPlots[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
            <Map className="w-4 h-4 text-[#2E7D32]" />
            <span>Farm Plots & GIS Agro-Monitoring</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Field Plot Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Geospatial surveillance, irrigation metrics, and localized pathology tracking
          </p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-[#193B2B] hover:bg-[#132E20] text-white text-xs font-bold shadow-md shadow-emerald-950/20 flex items-center space-x-2 transition-all self-start sm:self-auto cursor-pointer">
          <Plus className="w-4 h-4 text-[#4ADE80]" />
          <span>Register New Field Plot</span>
        </button>
      </div>

      {/* Main Grid: Interactive Map (Left) + Plot Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Map View Container (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-900">Aerial Drone & Satellite Map</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Live GPS Feed</span>
            </div>

            {/* Layer Switcher */}
            <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-xl text-[11px] font-semibold">
              <button
                onClick={() => setMapLayer('satellite')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  mapLayer === 'satellite' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                Satellite
              </button>
              <button
                onClick={() => setMapLayer('ndvi')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  mapLayer === 'ndvi' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                }`}
              >
                NDVI Biomass
              </button>
            </div>
          </div>

          {/* Interactive Map Box */}
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 bg-slate-900 shadow-inner group">
            <img
              src="/images/field_map.jpg"
              alt="Rice Field Drone View"
              className={`w-full h-full object-cover transition-all duration-700 ${
                mapLayer === 'ndvi' ? 'filter contrast-150 hue-rotate-60' : ''
              }`}
            />

            {/* Map Overlay Pins */}
            {fieldPlots.map((plot) => (
              <div
                key={plot.id}
                onClick={() => setSelectedPlot(plot.id)}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group/pin transition-all ${
                  plot.id === 'p1' ? 'top-1/3 left-1/3' : plot.id === 'p2' ? 'bottom-1/3 left-2/3' : 'top-1/4 right-1/4'
                }`}
              >
                <div className={`w-5 h-5 rounded-full ${plot.pinColor} border-2 border-white shadow-lg flex items-center justify-center animate-pulse`}>
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>

                {/* Tooltip on pin */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 hidden group-hover/pin:block bg-black/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap z-20">
                  {plot.name} ({plot.healthStatus})
                </div>
              </div>
            ))}

            {/* Map controls floating */}
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-mono text-white flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Coordinates: {currentPlot.coordinates}</span>
            </div>
          </div>

          {/* Map Legend */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-100 gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Optimal (76%)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Monitor Risk (14%)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>High Infection (10%)</span>
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Last drone flyover: Today 08:30 AM</span>
          </div>

        </div>

        {/* Selected Plot Insights (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Plot Switcher Pills */}
          <div className="space-y-2.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Monitored Paddy Sectors
            </span>
            <div className="space-y-2">
              {fieldPlots.map((plot) => (
                <div
                  key={plot.id}
                  onClick={() => setSelectedPlot(plot.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedPlot === plot.id
                      ? 'bg-white border-[#2E7D32] shadow-md ring-1 ring-[#2E7D32]/20'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{plot.name}</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">{plot.area} • {plot.stage}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex-shrink-0 ${plot.healthBadge}`}>
                    {plot.healthStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Plot Diagnostics Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Agronomic Telemetry</h3>
              <span className="text-[11px] font-mono text-emerald-800 font-bold">{currentPlot.area}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block">Water Level</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block flex items-center space-x-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>{currentPlot.waterLevel}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block">Soil Moisture</span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 block flex items-center space-x-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{currentPlot.soilMoisture}</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block">Pathology Alert</span>
                <span className="font-bold text-rose-700 text-xs mt-0.5 block truncate">
                  {currentPlot.activeInfection}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-[10px] text-slate-400 font-semibold block">Last Preventive Spray</span>
                <span className="font-bold text-slate-800 text-xs mt-0.5 block truncate">
                  {currentPlot.lastSpray}
                </span>
              </div>
            </div>

            {/* Recommended Action */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/70 text-xs">
              <div className="flex items-center space-x-1.5 text-emerald-900 font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Next Field Action</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-[11px]">{currentPlot.nextAction}</p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
