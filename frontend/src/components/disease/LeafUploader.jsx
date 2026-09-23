import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, Image as ImageIcon, X, Sparkles, AlertCircle } from 'lucide-react';

const PRESET_SAMPLES = [
  { id: 'bacterial_blight', label: 'Bacterial Blight', image: '/sample_leaf.jpg', desc: 'Water-soaked lesion' },
  { id: 'brown_spot', label: 'Brown Spot', image: '/sample_leaf.jpg', desc: 'Oval dark brown spot' },
  { id: 'leaf_blast', label: 'Leaf Blast', image: '/sample_leaf.jpg', desc: 'Spindle-shaped necrotic' },
  { id: 'tungro', label: 'Tungro', image: '/sample_leaf.jpg', desc: 'Yellow-orange chlorosis' },
  { id: 'healthy', label: 'Healthy', image: '/sample_leaf.jpg', desc: 'Vibrant green paddy' },
];

export default function LeafUploader({ onImageSelected, isAnalyzing, selectedImage, onReset }) {
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onImageSelected({
        file: file,
        previewUrl: reader.result,
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        presetLabel: null,
      });
    };
    reader.readAsDataURL(file);
  };

  // Preset sample selection
  const handlePresetSelect = async (sample) => {
    try {
      const response = await fetch(sample.image);
      const blob = await response.blob();
      const file = new File([blob], `${sample.id}.jpg`, { type: 'image/jpeg' });
      onImageSelected({
        file: file,
        previewUrl: sample.image,
        name: `Sample: ${sample.label}.jpg`,
        size: 'Standard Dataset',
        presetLabel: sample.label,
      });
    } catch (e) {
      console.error('Error loading sample image', e);
    }
  };

  // Camera capture
  const startCamera = async () => {
    setCameraActive(true);
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setCameraError('Unable to access camera. Please verify camera permissions.');
      setCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    stopCamera();
    
    canvas.toBlob((blob) => {
      const file = new File([blob], `field_capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
      onImageSelected({
        file: file,
        previewUrl: canvas.toDataURL('image/jpeg'),
        name: `field_capture_${Date.now()}.jpg`,
        size: (file.size / 1024).toFixed(1) + ' KB',
        presetLabel: null,
      });
    }, 'image/jpeg', 0.95);
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center space-x-2">
            <ImageIcon className="w-5 h-5 text-emerald-400" />
            <span>Paddy Leaf Image Input</span>
          </h2>
          <p className="text-xs text-slate-400">
            Upload field photograph or select verified test sample for automated diagnosis
          </p>
        </div>
        
        {selectedImage && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 rounded-lg transition-colors border border-rose-900/40"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Leaf</span>
          </button>
        )}
      </div>

      {/* Main Upload Zone */}
      {!selectedImage && !cameraActive && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            dragActive
              ? 'border-emerald-400 bg-emerald-950/20 scale-[0.99]'
              : 'border-slate-700 hover:border-emerald-500/50 bg-slate-950/40 hover:bg-slate-900/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-base font-semibold text-white mb-1">
            Drop rice leaf photograph here, or <span className="text-emerald-400 underline underline-offset-4">browse files</span>
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            Supports high-resolution JPG, PNG or WebP. Optimal results obtained with close-up, sharp leaf illumination.
          </p>

          <div className="flex items-center justify-center space-x-4 pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startCamera();
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all shadow-sm"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Capture Live Camera</span>
            </button>
          </div>
        </div>
      )}

      {/* Live Camera Feed */}
      {cameraActive && (
        <div className="rounded-xl border border-slate-700 overflow-hidden bg-black p-4 text-center">
          <video ref={videoRef} autoPlay playsInline className="w-full max-h-80 object-contain rounded-lg mx-auto mb-4" />
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={capturePhoto}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/30"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Frame</span>
            </button>
            <button
              onClick={stopCamera}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {cameraError && (
        <div className="mt-3 p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="relative rounded-lg overflow-hidden border border-slate-800 aspect-[4/3] bg-black/60 flex items-center justify-center">
              <img
                src={selectedImage.previewUrl}
                alt="Selected Rice Leaf"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-black/70 backdrop-blur-sm text-[10px] font-mono text-emerald-300 border border-emerald-500/20">
                RAW INPUT
              </div>
            </div>

            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Ready for Analysis</span>
                <h4 className="text-base font-bold text-white mt-0.5 truncate">{selectedImage.name}</h4>
                <p className="text-xs text-slate-400 mt-1">Image Size: {selectedImage.size}</p>
                {selectedImage.presetLabel && (
                  <div className="mt-2.5 inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 text-xs border border-emerald-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Benchmark Sample: {selectedImage.presetLabel}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <button
                  disabled={isAnalyzing}
                  onClick={() => onImageSelected(selectedImage, true)}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center space-x-2 transition-all shadow-lg ${
                    isAnalyzing
                      ? 'bg-emerald-800/50 text-emerald-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-emerald-600/30'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing Neural Features (EfficientNet-B0)...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Diagnose Leaf Pathology</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preset Quick-Test Samples */}
      <div className="mt-5 pt-4 border-t border-slate-800">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-400">Quick-Test Verified Samples</span>
          <span className="text-[10px] text-slate-500 font-mono">17-Class Model Trained</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {PRESET_SAMPLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handlePresetSelect(sample)}
              className="p-2 rounded-lg bg-slate-950/60 hover:bg-slate-800/60 border border-slate-800 hover:border-emerald-500/40 text-left transition-all group"
            >
              <div className="text-xs font-medium text-slate-300 group-hover:text-emerald-400 truncate">
                {sample.label}
              </div>
              <div className="text-[10px] text-slate-500 truncate mt-0.5">
                {sample.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
