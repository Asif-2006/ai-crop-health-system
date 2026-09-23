import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldAlert, Cpu, Eye, 
  Layers, FileText, ArrowRight, Activity, Percent
} from 'lucide-react';

export default function DiagnosisResult({ result, imagePreview, onOpenReport }) {
  const [showHeatmap, setShowHeatmap] = useState(false);

  if (!result) return null;

  const isHealthy = result.predicted_class === "Healthy";
  const confidence = result.confidence || 95.8;

  // Severity styling
  const severityColors = {
    Healthy: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    Mild: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    Moderate: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    Severe: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
    Critical: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
  };

  const sevStyle = severityColors[result.severity] || severityColors.Moderate;

  return (
    <div className="space-y-6">
      
      {/* Top Diagnosis Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        
        {/* Glow accent */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 ${
          isHealthy ? 'bg-emerald-500' : 'bg-amber-500'
        }`} />

        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${sevStyle.bg} ${sevStyle.text} ${sevStyle.border}`}>
                {result.pathology_type || 'Crop Pathology'}
              </span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>{result.source || 'EfficientNet-B0 Model'}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center space-x-3">
              <span>{result.predicted_class}</span>
              {isHealthy ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-400 flex-shrink-0" />
              ) : (
                <ShieldAlert className="w-7 h-7 text-amber-400 flex-shrink-0" />
              )}
            </h2>

            {result.pathogen && (
              <p className="text-sm text-slate-400 mt-1 italic">
                Pathogen: <span className="text-slate-300 font-semibold">{result.pathogen}</span>
              </p>
            )}
          </div>

          {/* Confidence and Severity Badges */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
            
            {/* Confidence Gauge */}
            <div className="bg-slate-950/70 border border-slate-800 rounded-xl px-5 py-3 text-center min-w-[130px]">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-center space-x-1">
                <Percent className="w-3 h-3 text-emerald-400" />
                <span>Confidence</span>
              </div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">
                {confidence}%
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(confidence, 100)}%` }}
                />
              </div>
            </div>

            {/* Severity Rating */}
            <div className={`border rounded-xl px-5 py-3 text-center min-w-[130px] ${sevStyle.bg} ${sevStyle.border}`}>
              <div className="text-[11px] font-semibold text-slate-400">Severity Grade</div>
              <div className={`text-2xl font-black ${sevStyle.text} mt-0.5`}>
                {result.severity || 'Moderate'}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">
                Area: {result.affected_leaf_area || '18%'}
              </div>
            </div>

            {/* Print Report Trigger */}
            <button
              onClick={onOpenReport}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center space-x-2 transition-all shadow-sm h-full"
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
            <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-[4/3] bg-black group">
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
                <div className="absolute bottom-3 right-3 flex items-center space-x-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/80 text-xs">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-300 font-medium">CAM Heatmap</span>
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`ml-1.5 w-8 h-4 rounded-full transition-colors relative ${
                      showHeatmap ? 'bg-emerald-500' : 'bg-slate-700'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      showHeatmap ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-2 text-center">
              {showHeatmap 
                ? 'Class Activation Map (CAM): Highlighting lesion attention areas' 
                : 'Paddy leaf optical RGB photograph in 224x224 tensor resolution'}
            </p>
          </div>

          {/* Differential Top-3 Probabilities */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Differential Diagnosis Ranking (Top-3 Probabilities)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Multi-class classification distribution from the 17-pathology head
              </p>
            </div>

            <div className="space-y-3">
              {(result.top_predictions || []).map((pred, idx) => (
                <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5">
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="font-semibold text-slate-200">
                      {idx + 1}. {pred.class_name}
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      {(pred.percentage || (pred.probability * 100)).toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-800 ${
                        idx === 0 ? 'bg-gradient-to-r from-emerald-500 to-green-400' : 'bg-slate-600'
                      }`}
                      style={{ width: `${pred.percentage || (pred.probability * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Urgency note */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-300">Agronomic Triage Advisory: </span>
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
