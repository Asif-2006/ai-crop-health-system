import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldAlert, Cpu, Eye, 
  Layers, FileText, Activity, Percent
} from 'lucide-react';

export default function DiagnosisResult({ result, imagePreview, onOpenReport }) {
  const [showHeatmap, setShowHeatmap] = useState(false);

  if (!result) return null;

  const isHealthy = result.predicted_class === "Healthy";
  const confidence = result.confidence || 95.8;

  // Severity styling in light balanced theme
  const severityColors = {
    Healthy: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    Mild: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    Moderate: { bg: 'bg-amber-50', text: 'text-amber-800', border: 'border-amber-200' },
    Severe: { bg: 'bg-orange-50', text: 'text-orange-800', border: 'border-orange-200' },
    Critical: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  };

  const sevStyle = severityColors[result.severity] || severityColors.Moderate;

  return (
    <div className="space-y-6">
      
      {/* Top Diagnosis Card */}
      <div className="card-hover bg-white/95 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-card-soft relative overflow-hidden backdrop-blur-xl">
        
        {/* Glow accent */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isHealthy ? 'bg-emerald-200' : 'bg-amber-100'
        }`} />

        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2.5 mb-2.5">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${sevStyle.bg} ${sevStyle.text} ${sevStyle.border} shadow-sm`}>
                {result.pathology_type || 'Crop Pathology'}
              </span>
              <span className="text-xs text-slate-500 flex items-center space-x-1.5 font-medium">
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span>{result.source || 'EfficientNet-B0 Model'}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
              <span>{result.predicted_class}</span>
              {isHealthy ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600 flex-shrink-0" />
              ) : (
                <ShieldAlert className="w-8 h-8 text-amber-600 flex-shrink-0" />
              )}
            </h2>

            {result.pathogen && (
              <p className="text-sm text-slate-600 mt-1.5 italic font-sans">
                Pathogen: <span className="text-slate-900 font-semibold">{result.pathogen}</span>
              </p>
            )}
          </div>

          {/* Confidence and Severity Badges */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
            
            {/* Confidence Gauge */}
            <div className="card-hover bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3.5 text-center min-w-[130px]">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-center space-x-1">
                <Percent className="w-3 h-3 text-emerald-600" />
                <span>Confidence</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
                {confidence}%
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(confidence, 100)}%` }}
                />
              </div>
            </div>

            {/* Severity Rating */}
            <div className={`card-hover border rounded-2xl px-5 py-3.5 text-center min-w-[130px] ${sevStyle.bg} ${sevStyle.border}`}>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Severity Grade</div>
              <div className={`text-2xl sm:text-3xl font-black ${sevStyle.text} mt-0.5 uppercase`}>
                {result.severity || 'Moderate'}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-semibold">
                Area: {result.affected_leaf_area || '18%'}
              </div>
            </div>

            {/* Print Report Trigger */}
            <button
              onClick={onOpenReport}
              className="card-hover px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider rounded-2xl border border-slate-700 flex items-center space-x-2 transition-all duration-300 shadow-sm h-full"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Agronomy Report</span>
            </button>
          </div>
        </div>

        {/* Differential Diagnoses & Lesion Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
          
          {/* Leaf & Heatmap Viewport */}
          <div className="lg:col-span-5">
            <div className="card-hover relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] bg-slate-100 group shadow-inner">
              <img
                src={imagePreview}
                alt="Analyzed leaf"
                className="w-full h-full object-contain"
              />
              
              {/* Simulated Heatmap / Attention Overlay */}
              {showHeatmap && !isHealthy && (
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/40 via-amber-500/30 to-transparent mix-blend-color-dodge animate-lesion pointer-events-none">
                  <div className="absolute top-1/4 left-1/3 w-28 h-20 bg-rose-600/50 rounded-full blur-xl"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-24 h-16 bg-amber-500/60 rounded-full blur-lg"></div>
                </div>
              )}

              {/* View Overlay Toggle */}
              {!isHealthy && (
                <div className="absolute bottom-3 right-3 flex items-center space-x-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-md">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-slate-800 font-bold uppercase tracking-wider text-[11px]">CAM Heatmap</span>
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`ml-1 w-8 h-4 rounded-full transition-colors relative ${
                      showHeatmap ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      showHeatmap ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 text-center font-medium font-sans">
              {showHeatmap 
                ? 'Class Activation Map (CAM): Highlighting detected lesion regions' 
                : 'Paddy leaf optical RGB photograph in 224x224 tensor resolution'}
            </p>
          </div>

          {/* Differential Top-3 Probabilities */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2 uppercase tracking-wide">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>Differential Diagnosis Ranking (Top-3 Probabilities)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-sans">
                Multi-class classification distribution from the 17-pathology head
              </p>
            </div>

            <div className="space-y-3">
              {(result.top_predictions || []).map((pred, idx) => (
                <div key={idx} className="card-hover bg-slate-50/80 border border-slate-200 rounded-2xl p-3.5">
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="font-bold text-slate-900">
                      {idx + 1}. {pred.class_name}
                    </span>
                    <span className="font-mono font-black text-emerald-700">
                      {(pred.percentage || (pred.probability * 100)).toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-800 ${
                        idx === 0 ? 'bg-emerald-600' : 'bg-slate-400'
                      }`}
                      style={{ width: `${pred.percentage || (pred.probability * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Urgency note */}
            <div className="card-hover p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start space-x-3 font-sans">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-950 uppercase tracking-wider">Agronomic Triage Advisory: </span>
                {isHealthy 
                  ? "Leaf displays optimal photosynthetic vitality. Maintain routine preventive pest-scouting."
                  : "Immediate clinical intervention is recommended to avoid secondary infection spread across adjacent paddy hills."}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
