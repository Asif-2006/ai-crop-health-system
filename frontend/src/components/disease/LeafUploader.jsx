import React, { useState, useRef } from 'react';
import { 
  Upload, 
  UploadCloud, 
  Camera, 
  Image as ImageIcon, 
  X, 
  Sparkles, 
  AlertCircle,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

export default function LeafUploader({ 
  onImageSelected, 
  isAnalyzing, 
  selectedImage, 
  onReset 
}) {
  const [dragActive, setDragActive] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Drag & drop handlers
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
      }, true); // auto-trigger diagnosis for seamless UX
    };
    reader.readAsDataURL(file);
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
      setCameraError('Unable to access camera. Please check camera permissions in your browser.');
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
      }, true);
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
    <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-sm relative h-full flex flex-col justify-between">
      
      {/* Card Header */}
      <div className="flex items-start justify-between mb-4 sm:mb-5">
        <div className="flex items-start space-x-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#EAF5EC] text-[#2E7D32] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Upload className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
              Upload Rice Leaf Image
            </h2>
            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 sm:mt-1">
              Upload a clear image of the rice leaf or capture using your camera
            </p>
          </div>
        </div>

        {selectedImage && (
          <button
            onClick={onReset}
            className="flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 text-xs text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200 font-medium flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Image</span>
            <span className="sm:hidden">Reset</span>
          </button>
        )}
      </div>

      {/* Main Dropzone / Camera Area */}
      {!selectedImage && !cameraActive && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-4 sm:p-8 cursor-pointer transition-all relative overflow-hidden bg-[#FCFDFB] min-h-[220px] sm:min-h-[260px] flex items-center justify-center ${
            dragActive
              ? 'border-[#2E7D32] bg-[#F2F8F3] scale-[0.995]'
              : 'border-[#CADBCC] hover:border-[#2E7D32] hover:bg-[#F9FCFA]'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileInput}
          />

          {/* Botanical Rice Leaf Flush Attached to Bottom-Left Corner (Hidden on mobile < md to completely eliminate any overlap) */}
          <div className="hidden md:block absolute bottom-0 left-0 w-44 lg:w-56 h-[90%] max-h-[220px] pointer-events-none select-none z-0">
            <img
              src="/images/complete_leaf_nobg.png"
              alt="Rice Leaf with Lesions"
              className="w-full h-full object-contain object-bottom-left"
            />
          </div>

          {/* Center Upload Actions - Responsive layout without horizontal shift on mobile */}
          <div className="relative z-10 w-full flex flex-col items-center text-center justify-center py-2 sm:py-3 md:pl-44 lg:pl-52">
            
            {/* Green circular upload cloud icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#EBF5ED] text-[#2E7D32] flex items-center justify-center mb-2 sm:mb-3 shadow-xs border border-[#D5EADB]">
              <UploadCloud className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
            </div>

            <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-1 px-2">
              <span className="hidden sm:inline">Drag and drop a rice leaf image here</span>
              <span className="sm:hidden">Upload or capture rice leaf image</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-slate-500 mb-3.5 sm:mb-5 px-2">
              or choose a file from your device
            </p>

            {/* Action buttons - Full width touch targets on small phones */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-2.5 w-full sm:w-auto px-2 sm:px-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="w-full sm:w-auto px-5 py-2.5 sm:py-2.5 rounded-xl bg-[#193B2B] hover:bg-[#132E20] active:scale-[0.98] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ImageIcon className="w-4 h-4" />
                <span>Choose Image</span>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startCamera();
                }}
                className="w-full sm:w-auto px-4 py-2.5 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-[0.98] text-slate-700 text-xs font-semibold border border-slate-300 transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-slate-600" />
                <span>Capture from Camera</span>
              </button>
            </div>

            {/* Subtle caption */}
            <p className="text-[10px] sm:text-[11px] text-slate-400 mt-3 sm:mt-5 font-medium">
              Supports JPG, PNG, WebP • Max size 10MB
            </p>

          </div>
        </div>
      )}

      {/* Live Camera Feed */}
      {cameraActive && (
        <div className="rounded-2xl border border-slate-300 overflow-hidden bg-slate-900 p-4 text-center">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="w-full max-h-72 object-contain rounded-xl mx-auto mb-4 bg-black" 
          />
          <div className="flex items-center justify-center space-x-3">
            <button
              onClick={capturePhoto}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#2E7D32] hover:bg-[#236327] text-white text-xs font-bold shadow-md shadow-emerald-700/20"
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
        <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Image Loaded Preview */}
      {selectedImage && (
        <div className="rounded-2xl border border-slate-200 bg-[#FCFDFB] p-5">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            
            <div className="sm:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 aspect-[4/3] bg-white flex items-center justify-center shadow-sm">
              <img
                src={selectedImage.previewUrl}
                alt="Selected Leaf"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm text-[10px] font-mono text-white">
                LEAF INPUT
              </div>
            </div>

            <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-4">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#EBF5ED] text-[#2E7D32] text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Image Loaded & Verified</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-2 truncate">
                  {selectedImage.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  File Size: <span className="font-semibold text-slate-700">{selectedImage.size}</span>
                </p>
                {selectedImage.presetLabel && (
                  <p className="text-xs text-emerald-700 font-medium mt-1">
                    Pathology Sample: <span className="font-bold">{selectedImage.presetLabel}</span>
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-2.5">
                <button
                  disabled={isAnalyzing}
                  onClick={() => onImageSelected(selectedImage, true)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-sm ${
                    isAnalyzing
                      ? 'bg-[#193B2B]/70 text-white cursor-not-allowed'
                      : 'bg-[#193B2B] hover:bg-[#132E20] text-white shadow-emerald-950/20'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Analyzing Pathology Features...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#4ADE80]" />
                      <span>Re-analyze Diagnosis</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Change
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
