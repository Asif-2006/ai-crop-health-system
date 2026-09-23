import React from 'react';
import { X, Printer, Sprout, ShieldCheck, Calendar, FileText } from 'lucide-react';

export default function ReportModal({ result, imagePreview, onClose }) {
  if (!result) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Modal Top Actions (no-print) */}
        <div className="no-print p-4 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900/90 backdrop-blur-md z-10">
          <div className="flex items-center space-x-2 text-white font-bold text-sm">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>Agronomic Pathology Diagnostic Report</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-8 text-slate-900 bg-white min-h-[600px] font-serif print:p-0">
          
          {/* Header */}
          <div className="border-b-2 border-emerald-800 pb-4 mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-xl font-bold uppercase tracking-wider text-emerald-950 font-sans">
                Rice Pathology Diagnosis Report
              </h1>
              <p className="text-xs text-slate-600 font-sans mt-0.5">
                AI-Based Crop Health Monitoring, Disease Detection & Agricultural Decision Support System
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-1 flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-emerald-700" />
                <span>Generated: {currentDate}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 rounded font-sans text-xs font-bold uppercase">
                Crop: Rice (Paddy)
              </span>
              <p className="text-[10px] text-slate-500 font-mono mt-1">CV-Service v1.0</p>
            </div>
          </div>

          {/* Primary Assessment Section */}
          <div className="grid grid-cols-3 gap-6 mb-6 items-center bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="col-span-1">
              <img
                src={imagePreview}
                alt="Analyzed leaf specimen"
                className="w-full h-32 object-contain rounded border border-slate-300 bg-white"
              />
              <span className="block text-[10px] text-center text-slate-500 mt-1 font-sans">
                Leaf Specimen #RICE-{Date.now().toString().slice(-6)}
              </span>
            </div>

            <div className="col-span-2 space-y-2 font-sans">
              <div className="text-xs uppercase font-bold tracking-wider text-slate-500">
                Primary Diagnosis:
              </div>
              <div className="text-2xl font-black text-slate-900">
                {result.predicted_class}
              </div>
              <div className="text-xs text-slate-700">
                <strong>Pathogen:</strong> <em>{result.pathogen || 'Not classified'}</em>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Confidence</span>
                  <span className="font-bold text-emerald-700 text-base">{result.confidence}%</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Severity</span>
                  <span className="font-bold text-amber-700 text-base">{result.severity}</span>
                </div>
                <div className="bg-white p-2 rounded border border-slate-200">
                  <span className="text-[10px] text-slate-500 block uppercase">Infected Area</span>
                  <span className="font-bold text-slate-800 text-base">{result.affected_leaf_area}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clinical Prescriptions */}
          <div className="space-y-4 font-sans text-xs">
            
            {result.chemical_treatment?.length > 0 && (
              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
                  Chemical Control Measures
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {result.chemical_treatment.map((chem, idx) => (
                    <li key={idx}><strong>{chem}</strong></li>
                  ))}
                </ul>
              </div>
            )}

            {result.biological_treatment?.length > 0 && (
              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
                  Biological & Organic Recommendations
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {result.biological_treatment.map((bio, idx) => (
                    <li key={idx}>{bio}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.cultural_practices?.length > 0 && (
              <div>
                <h4 className="font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
                  Preventive Cultural Practices
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-slate-700">
                  {result.cultural_practices.map((cult, idx) => (
                    <li key={idx}>{cult}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Differential Diagnoses */}
          <div className="mt-6 pt-4 border-t border-slate-200 font-sans text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-800 mb-2">
              Differential Diagnosis Head (Top Candidate Probabilities)
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {(result.top_predictions || []).map((p, idx) => (
                <div key={idx} className="p-2 bg-slate-50 border border-slate-200 rounded">
                  <div className="font-semibold text-slate-800">{idx + 1}. {p.class_name}</div>
                  <div className="font-mono text-emerald-800 text-[11px] font-bold">
                    {(p.percentage || p.probability * 100).toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Agronomist Sign-off */}
          <div className="mt-8 pt-6 border-t-2 border-slate-300 flex justify-between items-end font-sans text-xs text-slate-600">
            <div>
              <p>Model: EfficientNet-B0 (17-Class Rice Pathology)</p>
              <p className="text-[10px] text-slate-400">Verified benchmark accuracy: 94.82%</p>
            </div>
            <div className="text-right border-t border-slate-400 pt-2 w-48">
              <p className="font-semibold text-slate-800">Field Agronomist / Officer</p>
              <p className="text-[10px] text-slate-400">Signature & Seal</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
