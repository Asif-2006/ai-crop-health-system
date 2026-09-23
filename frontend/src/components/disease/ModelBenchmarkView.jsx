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
        
        <div className="card-hover bg-maroon-950/80 border border-white/20 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between text-rose-200/80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">External Accuracy</span>
            <Award className="w-5 h-5 text-rose-300" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">94.82%</div>
          <p className="text-[11px] text-rose-100/70 mt-2 font-medium">
            5,625 / 5,932 external Indian benchmark images (Sethy et al.)
          </p>
        </div>

        <div className="card-hover bg-maroon-950/80 border border-white/20 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between text-rose-200/80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Architecture</span>
            <Cpu className="w-5 h-5 text-rose-300" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">EfficientNet-B0</div>
          <p className="text-[11px] text-rose-100/70 mt-2 font-medium">
            4.07M Params · 16.3 MB FP32 Safetensors
          </p>
        </div>

        <div className="card-hover bg-maroon-950/80 border border-white/20 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between text-rose-200/80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In-Domain Macro F1</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">94.73%</div>
          <p className="text-[11px] text-rose-100/70 mt-2 font-medium">
            Held-out group-aware split (n = 3,984 test images)
          </p>
        </div>

        <div className="card-hover bg-maroon-950/80 border border-white/20 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between text-rose-200/80 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Supported Classes</span>
            <Database className="w-5 h-5 text-rose-300" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white">17 Classes</div>
          <p className="text-[11px] text-rose-100/70 mt-2 font-medium">
            Fungal, Bacterial, Viral, Insect pest & Normal
          </p>
        </div>

      </div>

      {/* Confusion Matrix & Dataset Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Confusion Matrix Card */}
        <div className="card-hover lg:col-span-6 bg-maroon-950/80 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between backdrop-blur-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2.5">
                <BarChart3 className="w-5 h-5 text-rose-300" />
                <span>External Benchmark Confusion Matrix</span>
              </h3>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/40 text-rose-200 border border-white/15">
                n = 5,932
              </span>
            </div>
            <p className="text-xs text-rose-100/70 mb-5 leading-relaxed">
              Zero-shot external validation against Sethy et al. (2020) Indian paddy benchmark across Bacterial Blight, Blast, Brown Spot, and Tungro.
            </p>

            <div className="card-hover rounded-2xl overflow-hidden border border-white/25 bg-white p-2.5 shadow-inner">
              <img
                src="/confusion_matrix.png"
                alt="Confusion Matrix Evaluation"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/15 text-xs text-rose-100 flex items-center justify-between font-semibold">
            <span>Overall Accuracy: <strong className="text-white">94.82%</strong></span>
            <span>4-Class Macro Precision: <strong className="text-white">95.82%</strong></span>
          </div>
        </div>

        {/* Per-Class Metrics Table */}
        <div className="card-hover lg:col-span-6 bg-maroon-950/80 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between backdrop-blur-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2.5">
                <FileSpreadsheet className="w-5 h-5 text-rose-300" />
                <span>Per-Class Classification Metrics (Held-out Test)</span>
              </h3>
              <span className="text-[10px] text-rose-200/60 font-mono">17 Classes</span>
            </div>
            <p className="text-xs text-rose-100/70 mb-4">
              Harmonic precision, recall, and F1 scores per pathology class:
            </p>

            <div className="card-hover overflow-x-auto max-h-[420px] overflow-y-auto rounded-2xl border border-white/15 bg-black/30">
              <table className="w-full text-left text-xs text-rose-100">
                <thead className="bg-black/60 text-[10px] text-rose-200 uppercase font-mono sticky top-0 border-b border-white/15 backdrop-blur-md">
                  <tr>
                    <th className="py-3 px-3.5">Disease Class</th>
                    <th className="py-3 px-2">Prec</th>
                    <th className="py-3 px-2">Recall</th>
                    <th className="py-3 px-2 font-bold text-white">F1</th>
                    <th className="py-3 px-3 text-right">Support</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {CLASS_PERFORMANCE.map((row) => (
                    <tr key={row.name} className="hover:bg-white/10 transition-colors">
                      <td className="py-2.5 px-3.5 font-bold text-white">{row.name}</td>
                      <td className="py-2.5 px-2 font-mono">{row.precision}</td>
                      <td className="py-2.5 px-2 font-mono">{row.recall}</td>
                      <td className="py-2.5 px-2 font-mono font-extrabold text-white">{row.f1}</td>
                      <td className="py-2.5 px-3 font-mono text-right text-rose-200/70">{row.support}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-rose-200">
            <span>Canonical Preprocessing: 224px, bicubic</span>
            <a
              href="https://huggingface.co/Huyt/rice-leaf-disease-efficientnet-b0"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:underline inline-flex items-center space-x-1 font-bold"
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
