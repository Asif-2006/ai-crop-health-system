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
    <div className="card-hover bg-maroon-950/75 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative backdrop-blur-xl">
      
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center space-x-2.5">
            <ImageIcon className="w-5 h-5 text-rose-300" />
            <span>Paddy Leaf Image Input</span>
          </h2>
          <p className="text-xs text-rose-100/70 mt-0.5">
            Upload field photograph or select verified test sample for automated diagnosis
          </p>
        </div>
        
        {selectedImage && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-rose-200 hover:text-white bg-maroon-900/60 hover:bg-maroon-800 rounded-xl transition-all duration-300 border border-white/15 hover:shadow-[inset_0_0_12px_rgba(255,255,255,0.2)]"
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
          className={`card-hover border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? 'border-white bg-white/20 scale-[0.99] shadow-[inset_0_0_30px_rgba(255,255,255,0.25)]'
              : 'border-white/25 hover:border-white/60 bg-black/20 hover:bg-black/30'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileInput}
          />
          <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto mb-4 border border-white/20 shadow-md">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
            Drop rice leaf photograph here, or <span className="text-rose-200 underline underline-offset-4 font-extrabold hover:text-white">browse files</span>
          </h3>
          <p className="text-xs text-rose-100/70 max-w-sm mx-auto mb-5 leading-relaxed">
            Supports high-resolution JPG, PNG or WebP. Optimal results obtained with close-up, sharp leaf illumination.
          </p>

          <div className="flex items-center justify-center space-x-4 pt-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startCamera();
              }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all duration-300 shadow-sm hover:shadow-[inset_0_0_15px_rgba(255,255,255,0.25)]"
            >
              <Camera className="w-4 h-4 text-rose-200" />
              <span>Capture Live Camera</span>
            </button>
          </div>
        </div>
      )}

      {/* Live Camera Feed */}
      {cameraActive && (
        <div className="rounded-2xl border border-white/20 overflow-hidden bg-black/60 p-4 text-center backdrop-blur-md">
          <video ref={videoRef} autoPlay playsInline className="w-full max-h-80 object-contain rounded-xl mx-auto mb-4 border border-white/10" />
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={capturePhoto}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-maroon-700 to-rose-700 hover:from-maroon-600 hover:to-rose-600 text-white text-xs font-bold shadow-lg shadow-maroon-900/50 border border-white/20"
            >
              <Camera className="w-4 h-4" />
              <span>Capture Frame</span>
            </button>
            <button
              onClick={stopCamera}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/15"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {cameraError && (
        <div className="mt-3 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="card-hover rounded-2xl border border-white/20 bg-black/30 p-5 backdrop-blur-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="relative rounded-xl overflow-hidden border border-white/15 aspect-[4/3] bg-black/50 flex items-center justify-center">
              <img
                src={selectedImage.previewUrl}
                alt="Selected Rice Leaf"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-sm text-[10px] font-mono text-rose-200 border border-white/20 font-bold">
                RAW INPUT
              </div>
            </div>

            <div className="flex flex-col justify-between h-full space-y-4">
              <div>
                <span className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">Ready for Analysis</span>
                <h4 className="text-lg font-bold text-white mt-1 truncate">{selectedImage.name}</h4>
                <p className="text-xs text-rose-100/70 mt-1">Image Size: {selectedImage.size}</p>
                {selectedImage.presetLabel && (
                  <div className="mt-3 inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-white/15 text-white text-xs border border-white/25 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-rose-200" />
                    <span>Benchmark Sample: {selectedImage.presetLabel}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/15">
                <button
                  disabled={isAnalyzing}
                  onClick={() => onImageSelected(selectedImage, true)}
                  className={`w-full py-3.5 px-4 rounded-xl text-sm font-extrabold flex items-center justify-center space-x-2 transition-all duration-300 shadow-xl border border-white/25 ${
                    isAnalyzing
                      ? 'bg-maroon-900/60 text-rose-200 cursor-not-allowed'
                      : 'bg-gradient-to-r from-maroon-700 via-rose-700 to-white hover:from-maroon-600 hover:via-rose-600 hover:to-rose-100 text-white hover:text-black shadow-maroon-950/60 hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.4)]'
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
      <div className="mt-6 pt-5 border-t border-white/15">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-rose-100 uppercase tracking-wider">Quick-Test Verified Samples</span>
          <span className="text-[10px] text-rose-200/60 font-mono">17-Class Model Trained</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {PRESET_SAMPLES.map((sample) => (
            <div
              key={sample.id}
              onClick={() => handlePresetSelect(sample)}
              className="card-hover p-3 rounded-xl bg-black/25 hover:bg-white/15 border border-white/15 hover:border-white/40 text-left transition-all duration-300 cursor-pointer group"
            >
              <div className="text-xs font-bold text-white group-hover:text-rose-200 truncate">
                {sample.label}
              </div>
              <div className="text-[10px] text-rose-200/60 truncate mt-1">
                {sample.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
