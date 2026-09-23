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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
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
          <div className="mb-6 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>
                <strong>Connected to Live FastAPI Backend:</strong> EfficientNet-B0 active on {backendStatus.device} with {backendStatus.classes_count || 17} rice pathology heads.
              </span>
            </div>
            <span className="font-mono text-[10px] bg-emerald-900/60 px-2 py-0.5 rounded">port 8000</span>
          </div>
        )}

        {/* Tab 1: Diagnose Leaf */}
        {activeTab === 'diagnose' && (
          <div className="space-y-8">
            
            {/* Hero / Introduction banner */}
            <div className="relative rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/20 p-6 sm:p-8 overflow-hidden shadow-2xl">
              <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Rice Leaf Pathology Diagnostic Engine</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  Intelligent Rice Leaf <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">Disease Detection</span>
                </h1>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  Upload close-up paddy photographs to detect 17 rice leaf diseases with 94.82% benchmark accuracy. Get instant severity grading, lesion area estimation, and expert agronomic treatment prescriptions.
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none"></div>
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
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            AI-Based Crop Health Monitoring System · Computer Vision Service (<span className="text-emerald-400 font-mono">cv-service</span>)
          </p>
          <p className="text-slate-600">
            Trained on 17 Paddy Pathologies · EfficientNet-B0 Backbone
          </p>
        </div>
      </footer>

    </div>
  );
}
