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
    <div className="min-h-screen text-slate-100 flex flex-col font-['Manrope']">
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
          <div className="card-hover mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-maroon-950/60 to-emerald-950/70 border border-emerald-500/40 flex items-center justify-between text-xs text-emerald-200 backdrop-blur-md">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>
                <strong className="text-white">Connected to Live FastAPI Backend:</strong> EfficientNet-B0 active on <code className="bg-black/30 px-1.5 py-0.5 rounded text-emerald-300">{backendStatus.device}</code> with {backendStatus.classes_count || 17} rice pathology heads.
              </span>
            </div>
            <span className="font-mono text-[11px] bg-emerald-900/60 border border-emerald-400/30 px-2.5 py-0.5 rounded-full text-emerald-200">
              port 8000
            </span>
          </div>
        )}

        {/* Tab 1: Diagnose Leaf */}
        {activeTab === 'diagnose' && (
          <div className="space-y-8">
            
            {/* Hero / Introduction banner */}
            <div className="card-hover relative rounded-3xl bg-gradient-to-r from-maroon-950/90 via-maroon-900/80 to-maroon-950/90 border border-white/20 p-6 sm:p-10 overflow-hidden shadow-2xl backdrop-blur-md">
              
              {/* Maroon & White Luminous Glows */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/20 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-maroon-600/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-rose-100 text-xs font-bold mb-4 shadow-sm backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Rice Leaf Pathology Diagnostic Engine</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  Intelligent Rice Leaf <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-white to-rose-300">
                    Disease Detection
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-rose-100/90 mt-3 leading-relaxed font-normal">
                  Upload field photographs to instantly diagnose 17 paddy leaf pathologies with <span className="text-white font-bold underline decoration-white/40 decoration-2">94.82% benchmark accuracy</span>. Receive immediate severity grading, lesion area quantification, and expert agronomic guidance.
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
      <footer className="border-t border-maroon-900/60 bg-maroon-950/80 backdrop-blur-md py-8 text-center text-xs text-rose-200/60 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            AI-Based Crop Health Monitoring System · Computer Vision Service (<span className="text-white font-mono font-bold">cv-service</span>)
          </p>
          <p className="text-rose-200/50">
            17 Paddy Pathologies Supported · EfficientNet-B0 Backbone
          </p>
        </div>
      </footer>

    </div>
  );
}
