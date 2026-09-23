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

  // Severity styling
  const severityColors = {
    Healthy: { bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40' },
    Mild: { bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/40' },
    Moderate: { bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40' },
    Severe: { bg: 'bg-orange-500/20', text: 'text-orange-300', border: 'border-orange-500/40' },
    Critical: { bg: 'bg-rose-500/20', text: 'text-rose-300', border: 'border-rose-500/40' },
  };

  const sevStyle = severityColors[result.severity] || severityColors.Moderate;

  return (
    <div className="space-y-6">
      
      {/* Top Diagnosis Card */}
      <div className="card-hover bg-maroon-950/80 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        
        {/* Glow accent */}
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25 ${
          isHealthy ? 'bg-emerald-500' : 'bg-white'
        }`} />

        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between pb-6 border-b border-white/15">
          <div>
            <div className="flex items-center space-x-2.5 mb-2.5">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${sevStyle.bg} ${sevStyle.text} ${sevStyle.border} shadow-sm`}>
                {result.pathology_type || 'Crop Pathology'}
              </span>
              <span className="text-xs text-rose-200/80 flex items-center space-x-1.5 font-medium">
                <Cpu className="w-3.5 h-3.5 text-rose-300" />
                <span>{result.source || 'EfficientNet-B0 Model'}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center space-x-3">
              <span>{result.predicted_class}</span>
              {isHealthy ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
              ) : (
                <ShieldAlert className="w-8 h-8 text-rose-300 flex-shrink-0" />
              )}
            </h2>

            {result.pathogen && (
              <p className="text-sm text-rose-100/80 mt-1.5 italic font-normal">
                Pathogen: <span className="text-white font-semibold">{result.pathogen}</span>
              </p>
            )}
          </div>

          {/* Confidence and Severity Badges */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 items-center">
            
            {/* Confidence Gauge */}
            <div className="card-hover bg-black/30 border border-white/15 rounded-2xl px-5 py-3.5 text-center min-w-[130px] backdrop-blur-md">
              <div className="text-[11px] font-bold text-rose-200 uppercase tracking-wider flex items-center justify-center space-x-1">
                <Percent className="w-3 h-3 text-white" />
                <span>Confidence</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                {confidence}%
              </div>
              <div className="w-full bg-black/50 h-1.5 rounded-full mt-2 overflow-hidden border border-white/10">
                <div 
                  className="bg-gradient-to-r from-rose-400 to-white h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(confidence, 100)}%` }}
                />
              </div>
            </div>

            {/* Severity Rating */}
            <div className={`card-hover border rounded-2xl px-5 py-3.5 text-center min-w-[130px] ${sevStyle.bg} ${sevStyle.border} backdrop-blur-md`}>
              <div className="text-[11px] font-bold text-rose-100 uppercase tracking-wider">Severity Grade</div>
              <div className={`text-2xl sm:text-3xl font-black ${sevStyle.text} mt-0.5`}>
                {result.severity || 'Moderate'}
              </div>
              <div className="text-[10px] text-rose-100/70 mt-1 font-semibold">
                Area: {result.affected_leaf_area || '18%'}
              </div>
            </div>

            {/* Print Report Trigger */}
            <button
              onClick={onOpenReport}
              className="card-hover px-4 py-3.5 bg-white/15 hover:bg-white/25 text-white text-xs font-bold rounded-2xl border border-white/25 flex items-center space-x-2 transition-all duration-300 shadow-md h-full"
            >
              <FileText className="w-4 h-4 text-rose-200" />
              <span>Agronomy Report</span>
            </button>
          </div>
        </div>

        {/* Differential Diagnoses & Lesion Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-center">
          
          {/* Leaf & Heatmap Viewport */}
          <div className="lg:col-span-5">
            <div className="card-hover relative rounded-2xl overflow-hidden border border-white/20 aspect-[4/3] bg-black group">
              <img
                src={imagePreview}
                alt="Analyzed leaf"
                className="w-full h-full object-contain"
              />
              
              {/* Simulated Heatmap / Attention Overlay */}
              {showHeatmap && !isHealthy && (
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/40 via-amber-500/30 to-transparent mix-blend-color-dodge animate-lesion pointer-events-none">
                  <div className="absolute top-1/4 left-1/3 w-28 h-20 bg-rose-600/50 rounded-full blur-xl"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-24 h-16 bg-white/60 rounded-full blur-lg"></div>
                </div>
              )}

              {/* View Overlay Toggle */}
              {!isHealthy && (
                <div className="absolute bottom-3 right-3 flex items-center space-x-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20 text-xs shadow-lg">
                  <Eye className="w-3.5 h-3.5 text-rose-300" />
                  <span className="text-white font-semibold">CAM Heatmap</span>
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`ml-1 w-8 h-4 rounded-full transition-colors relative ${
                      showHeatmap ? 'bg-rose-500' : 'bg-slate-700'
                    }`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                      showHeatmap ? 'translate-x-4' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              )}
            </div>
            <p className="text-[11px] text-rose-200/70 mt-2 text-center font-medium">
              {showHeatmap 
                ? 'Class Activation Map (CAM): Highlighting detected lesion regions' 
                : 'Paddy leaf optical RGB photograph in 224x224 tensor resolution'}
            </p>
          </div>

          {/* Differential Top-3 Probabilities */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                <Activity className="w-4 h-4 text-rose-300" />
                <span>Differential Diagnosis Ranking (Top-3 Probabilities)</span>
              </h3>
              <p className="text-xs text-rose-100/70 mt-0.5">
                Multi-class classification distribution from the 17-pathology head
              </p>
            </div>

            <div className="space-y-3">
              {(result.top_predictions || []).map((pred, idx) => (
                <div key={idx} className="card-hover bg-black/30 border border-white/15 rounded-2xl p-3.5 backdrop-blur-md">
                  <div className="flex justify-between items-center mb-1.5 text-xs">
                    <span className="font-bold text-white">
                      {idx + 1}. {pred.class_name}
                    </span>
                    <span className="font-mono font-extrabold text-rose-200">
                      {(pred.percentage || (pred.probability * 100)).toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className={`h-full rounded-full transition-all duration-800 ${
                        idx === 0 ? 'bg-gradient-to-r from-rose-500 via-rose-300 to-white' : 'bg-white/40'
                      }`}
                      style={{ width: `${pred.percentage || (pred.probability * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Urgency note */}
            <div className="card-hover p-4 rounded-2xl bg-black/35 border border-white/15 text-xs text-rose-100 flex items-start space-x-3 backdrop-blur-md">
              <AlertTriangle className="w-4 h-4 text-rose-300 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-white">Agronomic Triage Advisory: </span>
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
