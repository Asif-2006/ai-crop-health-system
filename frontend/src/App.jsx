import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import LeafUploader from './components/disease/LeafUploader';
import DiagnosisResult from './components/disease/DiagnosisResult';
import AgronomicTreatmentCard from './components/disease/AgronomicTreatmentCard';
import DiseaseCatalog from './components/disease/DiseaseCatalog';
import ModelBenchmarkView from './components/disease/ModelBenchmarkView';
import ReportModal from './components/disease/ReportModal';
import { checkBackendHealth, predictLeafImage } from './services/api';
import { Sprout, ShieldAlert, Cpu, Sparkles, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('diagnose');
  const [backendStatus, setBackendStatus] = useState({ online: false });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [showReport, setShowReport] = useState(false);

  // Check health on mount
  useEffect(() => {
    refreshBackendStatus();
  }, []);

  const refreshBackendStatus = async () => {
    const status = await checkBackendHealth();
    setBackendStatus(status);
  };

  const handleImageSelected = async (imgData, triggerAnalyze = false) => {
    setSelectedImage(imgData);
    if (triggerAnalyze) {
      runDiagnosis(imgData);
    }
  };

  const runDiagnosis = async (imgData) => {
    setIsAnalyzing(true);
    setDiagnosisResult(null);

    try {
      const result = await predictLeafImage(imgData.file, imgData.presetLabel);
      setDiagnosisResult(result);
    } catch (err) {
      console.error('Diagnosis failed:', err);
      alert('Diagnosis failed. Please check the image and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setDiagnosisResult(null);
  };

  return (
    <div className="min-h-screen text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendStatus={backendStatus}
        onRefreshStatus={refreshBackendStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Banner if backend is running live */}
        {backendStatus.online && (
          <div className="card-hover mb-6 p-4 rounded-2xl bg-emerald-50/90 border border-emerald-300 flex items-center justify-between text-xs text-emerald-950 shadow-sm backdrop-blur-md">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>
                <strong className="text-emerald-950 font-bold">Connected to Live FastAPI Backend:</strong> EfficientNet-B0 active on <code className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-mono text-[11px] font-semibold border border-emerald-300">{backendStatus.device}</code> with {backendStatus.classes_count || 17} rice pathology heads.
              </span>
            </div>
            <span className="font-mono text-[11px] bg-emerald-600 px-3 py-1 rounded-full text-white font-bold shadow-sm">
              port 8000
            </span>
          </div>
        )}

        {/* Tab 1: Diagnose Leaf */}
        {activeTab === 'diagnose' && (
          <div className="space-y-8">
            
            {/* Hero Banner (Clean, balanced Somerstone-inspired aesthetic with fresh botanical colors) */}
            <div className="card-hover relative rounded-3xl bg-gradient-to-br from-white/95 via-emerald-50/60 to-teal-50/40 border border-emerald-200/90 p-8 sm:p-12 overflow-hidden shadow-card-soft backdrop-blur-md">
              
              {/* Subtle ambient botanical gradient */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-300/35 via-teal-200/25 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-amber-100/35 rounded-full blur-2xl pointer-events-none"></div>

              <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300/80 text-emerald-900 text-xs font-bold mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="tracking-wide">Rice Leaf Pathology Diagnostic Engine</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Intelligent Rice Leaf <br />
                  <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Disease Detection
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-slate-700 mt-3 leading-relaxed font-normal">
                  Upload field photographs to instantly diagnose 17 paddy leaf pathologies with <span className="text-emerald-800 font-bold underline decoration-emerald-400 decoration-2">94.82% benchmark accuracy</span>. Receive immediate severity grading, lesion area quantification, and expert agronomic guidance.
                </p>
              </div>
            </div>

            {/* Input Section */}
            <LeafUploader
              onImageSelected={handleImageSelected}
              isAnalyzing={isAnalyzing}
              selectedImage={selectedImage}
              onReset={handleReset}
            />

            {/* Diagnosis & Recommendations Section */}
            {diagnosisResult && (
              <div className="space-y-8 animate-fadeIn">
                <DiagnosisResult
                  result={diagnosisResult}
                  imagePreview={selectedImage?.previewUrl}
                  onOpenReport={() => setShowReport(true)}
                />

                <AgronomicTreatmentCard
                  result={diagnosisResult}
                />
              </div>
            )}

          </div>
        )}

        {/* Tab 2: 17-Disease Catalog */}
        {activeTab === 'catalog' && (
          <DiseaseCatalog />
        )}

        {/* Tab 3: Benchmarks & Metrics */}
        {activeTab === 'benchmarks' && (
          <ModelBenchmarkView />
        )}

      </main>

      {/* Agronomic Report Modal */}
      {showReport && diagnosisResult && (
        <ReportModal
          result={diagnosisResult}
          imagePreview={selectedImage?.previewUrl}
          onClose={() => setShowReport(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-md py-8 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium text-slate-600">
            AI-Based Crop Health Monitoring System · Computer Vision Service (<span className="text-emerald-700 font-mono font-bold">cv-service</span>)
          </p>
          <p className="text-slate-400">
            17 Paddy Pathologies Supported · EfficientNet-B0 Deep Learning Model
          </p>
        </div>
      </footer>

    </div>
  );
}
