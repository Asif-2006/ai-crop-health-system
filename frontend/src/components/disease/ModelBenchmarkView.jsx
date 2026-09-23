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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">External Test Accuracy</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">94.82%</div>
          <p className="text-[11px] text-slate-400 mt-1">
            5,625 / 5,932 external Indian paddy benchmark images (Sethy et al.)
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Model Architecture</span>
            <Cpu className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">EfficientNet-B0</div>
          <p className="text-[11px] text-slate-400 mt-1">
            4.07M Parameters · 16.3 MB FP32 Safetensors · PyTorch / timm
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">In-Domain Macro F1</span>
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400">94.73%</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Held-out group-aware split (n = 3,984 test images)
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">Supported Classes</span>
            <Database className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">17 Classes</div>
          <p className="text-[11px] text-slate-400 mt-1">
            Fungal, Bacterial, Viral, Insect pest & Physiological
          </p>
        </div>

      </div>

      {/* Confusion Matrix & Dataset Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Confusion Matrix Card */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <span>External Benchmark Confusion Matrix</span>
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                n = 5,932
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Generated during external validation against the Sethy et al. (2020) Indian paddy leaf benchmark across Bacterial Blight, Blast, Brown Spot, and Tungro.
            </p>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-white p-2">
              <img
                src="/confusion_matrix.png"
                alt="Confusion Matrix Evaluation"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Overall Accuracy: 94.82%</span>
            <span>4-Class Macro Precision: 95.82%</span>
          </div>
        </div>

        {/* Per-Class Metrics Table */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <span>Per-Class Classification Metrics (Held-out Test)</span>
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">17 Classes</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Official precision, recall, and harmonic F1 score per pathology category:
            </p>

            <div className="overflow-x-auto max-h-[420px] overflow-y-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-[10px] text-slate-400 uppercase font-mono sticky top-0 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-3">Disease Class</th>
                    <th className="py-2.5 px-2">Prec</th>
                    <th className="py-2.5 px-2">Recall</th>
                    <th className="py-2.5 px-2 font-bold text-emerald-400">F1</th>
                    <th className="py-2.5 px-2 text-right">Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {CLASS_PERFORMANCE.map((row) => (
                    <tr key={row.name} className="hover:bg-slate-800/40">
                      <td className="py-2 px-3 font-medium text-white">{row.name}</td>
                      <td className="py-2 px-2 font-mono">{row.precision}</td>
                      <td className="py-2 px-2 font-mono">{row.recall}</td>
                      <td className="py-2 px-2 font-mono font-bold text-emerald-400">{row.f1}</td>
                      <td className="py-2 px-2 font-mono text-right text-slate-400">{row.support}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Canonical Preprocessing: 224px, bicubic, crop_pct=0.875</span>
            <a
              href="https://huggingface.co/Huyt/rice-leaf-disease-efficientnet-b0"
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:underline inline-flex items-center space-x-1"
            >
              <span>HuggingFace Card</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
