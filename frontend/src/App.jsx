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
    <div className="min-h-screen text-[#E8F5E9] flex flex-col font-galgo">
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
          <div className="card-hover mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#0e3312]/90 via-[#1B5E20]/80 to-[#0e3312]/90 border border-[#66BB6A]/40 flex items-center justify-between text-xs text-[#E8F5E9] backdrop-blur-md">
            <div className="flex items-center space-x-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#66BB6A] animate-pulse"></span>
              <span>
                <strong className="text-white uppercase tracking-wider">Connected to Live FastAPI Backend:</strong> EfficientNet-B0 active on <code className="bg-black/40 px-1.5 py-0.5 rounded text-[#A5D6A7] font-mono">{backendStatus.device}</code> with {backendStatus.classes_count || 17} rice pathology heads.
              </span>
            </div>
            <span className="font-mono text-[11px] bg-[#1B5E20] border border-[#66BB6A]/50 px-2.5 py-0.5 rounded-full text-[#E8F5E9] font-bold">
              port 8000
            </span>
          </div>
        )}

        {/* Tab 1: Diagnose Leaf */}
        {activeTab === 'diagnose' && (
          <div className="space-y-8">
            
            {/* Hero / Introduction banner */}
            <div className="card-hover relative rounded-3xl bg-gradient-to-r from-[#091e0a]/95 via-[#123d16]/90 to-[#1B5E20]/90 border border-[#66BB6A]/30 p-6 sm:p-10 overflow-hidden shadow-2xl backdrop-blur-md">
              
              {/* Luminous Glows */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#A5D6A7]/20 via-[#66BB6A]/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#1B5E20]/30 rounded-full blur-2xl pointer-events-none"></div>

              <div className="max-w-2xl relative z-10">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#1B5E20]/80 border border-[#66BB6A]/40 text-[#E8F5E9] text-xs font-bold mb-4 shadow-sm backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 text-[#66BB6A]" />
                  <span className="uppercase tracking-wider">Rice Leaf Pathology Diagnostic Engine</span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-black text-white tracking-wide uppercase leading-tight font-galgo">
                  Intelligent Rice Leaf <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5D6A7] via-[#E8F5E9] to-[#66BB6A]">
                    Disease Detection
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-[#E8F5E9]/90 mt-3 leading-relaxed font-sans font-normal">
                  Upload field photographs to instantly diagnose 17 paddy leaf pathologies with <span className="text-[#A5D6A7] font-bold underline decoration-[#66BB6A] decoration-2">94.82% benchmark accuracy</span>. Receive immediate severity grading, lesion area quantification, and expert agronomic guidance.
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
      <footer className="border-t border-[#66BB6A]/25 bg-[#091e0a]/90 backdrop-blur-md py-8 text-center text-xs text-[#A5D6A7]/70 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="tracking-wide">
            AI-Based Crop Health Monitoring System · Computer Vision Service (<span className="text-[#66BB6A] font-mono font-bold">cv-service</span>)
          </p>
          <p className="text-[#A5D6A7]/60 tracking-wider uppercase">
            17 Paddy Pathologies Supported · EfficientNet-B0 Backbone
          </p>
        </div>
      </footer>

    </div>
  );
}
