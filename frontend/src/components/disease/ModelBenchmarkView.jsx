import React from 'react';
import { BarChart3, Award, CheckCircle2, Database, Cpu, FileSpreadsheet, ExternalLink } from 'lucide-react';

const CLASS_PERFORMANCE = [
  { name: 'Bacterial Blight', precision: '0.981', recall: '0.984', f1: '0.983', support: 579 },
  { name: 'Bacterial Streak', precision: '0.812', recall: '0.867', f1: '0.839', support: 15 },
  { name: 'Bakanae', precision: '1.000', recall: '1.000', f1: '1.000', support: 15 },
  { name: 'Brown Spot', precision: '0.972', recall: '0.976', f1: '0.974', support: 632 },
  { name: 'False Smut', precision: '1.000', recall: '0.933', f1: '0.966', support: 15 },
  { name: 'Grassy Stunt Virus', precision: '0.933', recall: '0.933', f1: '0.933', support: 15 },
  { name: 'Healthy', precision: '0.942', recall: '0.952', f1: '0.947', support: 442 },
  { name: 'Hispa', precision: '0.924', recall: '0.913', f1: '0.918', support: 333 },
  { name: 'Leaf Blast', precision: '0.954', recall: '0.961', f1: '0.957', support: 513 },
  { name: 'Leaf Scald', precision: '0.990', recall: '0.992', f1: '0.991', support: 385 },
  { name: 'Narrow Brown Spot', precision: '0.989', recall: '0.989', f1: '0.989', support: 269 },
  { name: 'Neck Blast', precision: '1.000', recall: '1.000', f1: '1.000', support: 150 },
  { name: 'Ragged Stunt Virus', precision: '0.933', recall: '0.933', f1: '0.933', support: 15 },
  { name: 'Sheath Blight', precision: '1.000', recall: '0.957', f1: '0.978', support: 93 },
  { name: 'Sheath Rot', precision: '1.000', recall: '0.533', f1: '0.696', support: 15 },
  { name: 'Stem Rot', precision: '1.000', recall: '1.000', f1: '1.000', support: 15 },
  { name: 'Tungro', precision: '1.000', recall: '1.000', f1: '1.000', support: 483 },
];

export default function ModelBenchmarkView() {
  return (
    <div className="space-y-6">
      
      {/* Benchmark Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="card-hover bg-white/95 border border-emerald-200/90 rounded-3xl p-6 shadow-card-soft">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/70">External Accuracy</span>
            <Award className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-emerald-800 tracking-tight">94.82%</div>
          <p className="text-[11px] text-slate-600 mt-2 font-medium">
            5,625 / 5,932 external Indian benchmark images (Sethy et al.)
          </p>
        </div>

        <div className="card-hover bg-white/95 border border-emerald-200/90 rounded-3xl p-6 shadow-card-soft">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/70">Architecture</span>
            <Cpu className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 uppercase tracking-tight">EfficientNet-B0</div>
          <p className="text-[11px] text-slate-600 mt-2 font-medium">
            4.07M Params · 16.3 MB FP32 Safetensors
          </p>
        </div>

        <div className="card-hover bg-white/95 border border-emerald-200/90 rounded-3xl p-6 shadow-card-soft">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/70">In-Domain Macro F1</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-emerald-800 tracking-tight">94.73%</div>
          <p className="text-[11px] text-slate-600 mt-2 font-medium">
            Held-out group-aware split (n = 3,984 test images)
          </p>
        </div>

        <div className="card-hover bg-white/95 border border-emerald-200/90 rounded-3xl p-6 shadow-card-soft">
          <div className="flex items-center justify-between text-emerald-800 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/70">Supported Classes</span>
            <Database className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="text-4xl sm:text-5xl font-black text-emerald-800 tracking-tight">17 Classes</div>
          <p className="text-[11px] text-slate-600 mt-2 font-medium">
            Fungal, Bacterial, Viral, Insect pest & Normal
          </p>
        </div>

      </div>

      {/* Confusion Matrix & Dataset Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Confusion Matrix Card */}
        <div className="card-hover lg:col-span-6 bg-white/95 border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-card-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2.5 uppercase tracking-wide">
                <BarChart3 className="w-5 h-5 text-emerald-600" />
                <span>External Benchmark Matrix</span>
              </h3>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">
                n = 5,932
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Zero-shot external validation against Sethy et al. (2020) Indian paddy benchmark across Bacterial Blight, Blast, Brown Spot, and Tungro.
            </p>

            <div className="card-hover rounded-2xl overflow-hidden border border-emerald-200 bg-emerald-50/30 p-2.5 shadow-inner">
              <img
                src="/confusion_matrix.png"
                alt="Confusion Matrix Evaluation"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-emerald-200/60 text-xs text-slate-700 flex items-center justify-between font-bold uppercase tracking-wider">
            <span>Overall Accuracy: <strong className="text-emerald-700">94.82%</strong></span>
            <span>Macro Precision: <strong className="text-emerald-700">95.82%</strong></span>
          </div>
        </div>

        {/* Per-Class Metrics Table */}
        <div className="card-hover lg:col-span-6 bg-white/95 border border-emerald-200/90 rounded-3xl p-6 sm:p-8 shadow-card-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2.5 uppercase tracking-wide">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>Per-Class Metrics (Held-out Test)</span>
              </h3>
              <span className="text-[10px] text-emerald-800 font-mono font-semibold">17 Classes</span>
            </div>
            <p className="text-xs text-slate-600 mb-4">
              Harmonic precision, recall, and F1 scores per pathology class:
            </p>

            <div className="card-hover overflow-x-auto max-h-[420px] overflow-y-auto rounded-2xl border border-emerald-200/80 bg-emerald-50/20">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-emerald-50 text-[10px] text-emerald-950 uppercase font-mono sticky top-0 border-b border-emerald-200">
                  <tr>
                    <th className="py-3 px-3.5 font-bold">Disease Class</th>
                    <th className="py-3 px-2 font-bold">Prec</th>
                    <th className="py-3 px-2 font-bold">Recall</th>
                    <th className="py-3 px-2 font-bold text-emerald-900">F1</th>
                    <th className="py-3 px-3 text-right font-bold">Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {CLASS_PERFORMANCE.map((row) => (
                    <tr key={row.name} className="hover:bg-emerald-100/60 transition-colors">
                      <td className="py-2.5 px-3.5 font-bold text-slate-900">{row.name}</td>
                      <td className="py-2.5 px-2 font-mono text-slate-600">{row.precision}</td>
                      <td className="py-2.5 px-2 font-mono text-slate-600">{row.recall}</td>
                      <td className="py-2.5 px-2 font-mono font-bold text-emerald-800">{row.f1}</td>
                      <td className="py-2.5 px-3 font-mono text-right text-slate-500">{row.support}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-emerald-200/60 flex items-center justify-between text-xs text-slate-600">
            <span>Canonical Preprocessing: 224px, bicubic</span>
            <a
              href="https://huggingface.co/Huyt/rice-leaf-disease-efficientnet-b0"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:text-emerald-800 inline-flex items-center space-x-1 font-bold"
            >
              <span>HuggingFace Card</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
