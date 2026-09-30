import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/common/Sidebar';
import Topbar from './components/common/Topbar';
import DashboardView from './components/dashboard/DashboardView';
import HeroSection from './components/disease/HeroSection';
import LeafUploader from './components/disease/LeafUploader';
import WhatYoullGetCard from './components/disease/WhatYoullGetCard';
import CommonDiseasesRow from './components/disease/CommonDiseasesRow';
import RecentDiagnosesRow from './components/disease/RecentDiagnosesRow';
import DiagnosisResult from './components/disease/DiagnosisResult';
import AgronomicTreatmentCard from './components/disease/AgronomicTreatmentCard';
import DiseaseCatalog from './components/disease/DiseaseCatalog';
import ReportModal from './components/disease/ReportModal';
import SettingsView from './components/settings/SettingsView';
import TreatmentGuideView from './components/disease/TreatmentGuideView';
import FieldManagementView from './components/field/FieldManagementView';
import NotificationDrawer from './components/common/NotificationDrawer';
import { checkBackendHealth, predictLeafImage } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [backendStatus, setBackendStatus] = useState({ online: false });
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  // User Profile State
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('ricevision_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      name: 'Soriful Islam',
      role: 'Farmer',
      location: 'Malda, West Bengal, India',
      phone: '+91 98765 43210',
      email: 'soriful.farmer@ricevision.ai',
      farmSize: '4.2 Acres',
      cropVariety: 'Swarna Sub-1 & MTU 1010',
      soilType: 'Alluvial Clay Loam',
      notificationsEnabled: true,
      smsAlerts: true,
    };
  });

  const resultRef = useRef(null);

  // Check health on mount
  useEffect(() => {
    refreshBackendStatus();
  }, []);

  const refreshBackendStatus = async () => {
    const status = await checkBackendHealth();
    setBackendStatus(status);
  };

  const handleUpdateProfile = (newProfile) => {
    setUserProfile(newProfile);
    localStorage.setItem('ricevision_user_profile', JSON.stringify(newProfile));
  };

  const handleImageSelected = async (imgData, triggerAnalyze = true) => {
    setSelectedImage(imgData);
    if (triggerAnalyze) {
      await runDiagnosis(imgData);
    }
  };

  const runDiagnosis = async (imgData) => {
    setIsAnalyzing(true);
    setDiagnosisResult(null);

    try {
      const result = await predictLeafImage(imgData.file, imgData.presetLabel);
      setDiagnosisResult(result);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
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

  const handleSelectSample = async (sample) => {
    try {
      const response = await fetch(sample.image);
      const blob = await response.blob();
      const file = new File([blob], `${sample.id}.jpg`, { type: 'image/jpeg' });
      const imgData = {
        file: file,
        previewUrl: sample.image,
        name: `${sample.name}.jpg`,
        size: '184.2 KB',
        presetLabel: sample.name,
      };
      setSelectedImage(imgData);
      setActiveTab('diagnose');
      await runDiagnosis(imgData);
    } catch (e) {
      console.error('Error loading sample image', e);
    }
  };

  const handleSelectRecent = async (item) => {
    try {
      const response = await fetch(item.image);
      const blob = await response.blob();
      const file = new File([blob], `${item.name.toLowerCase().replace(' ', '_')}.jpg`, { type: 'image/jpeg' });
      const imgData = {
        file: file,
        previewUrl: item.image,
        name: `${item.name}.jpg`,
        size: '192.0 KB',
        presetLabel: item.name,
      };
      setSelectedImage(imgData);
      setActiveTab('diagnose');
      await runDiagnosis(imgData);
    } catch (e) {
      console.error('Error loading recent item', e);
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-[#F6F8F5] text-slate-800 flex font-sans antialiased">
      
      {/* Left Sidebar Navigation (Fixed / Mobile Drawer) */}
      <div className={`fixed inset-y-0 left-0 z-50 lg:static flex-shrink-0 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setMobileSidebarOpen(false);
          }}
          onClose={() => setMobileSidebarOpen(false)}
        />
      </div>

      {/* Backdrop for mobile */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Right Scrollable Content Container */}
      <div className="flex-1 flex flex-col h-[100dvh] min-w-0 overflow-y-auto">
        
        {/* Sticky Topbar */}
        <Topbar 
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} 
          onOpenSettings={() => {
            setActiveTab('settings');
            setMobileSidebarOpen(false);
          }}
          onOpenNotifications={() => setNotificationDrawerOpen(true)}
          unreadCount={unreadNotifications}
          userProfile={userProfile}
        />

        {/* Scrollable Main View */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-4 sm:space-y-6">
          
          {/* TAB 1: Dashboard */}
          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigateTab={(tab) => setActiveTab(tab)}
              onSelectDiagnosis={handleSelectRecent}
            />
          )}

          {/* TAB 2: Settings (Profile update) */}
          {activeTab === 'settings' && (
            <SettingsView
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {/* TAB 3: Diagnose */}
          {activeTab === 'diagnose' && (
            <div className="space-y-7 animate-fadeIn">
              
              <HeroSection />

              {/* Upload Card + What you'll get */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8">
                  <LeafUploader
                    onImageSelected={handleImageSelected}
                    isAnalyzing={isAnalyzing}
                    selectedImage={selectedImage}
                    onReset={handleReset}
                  />
                </div>
                <div className="lg:col-span-4">
                  <WhatYoullGetCard />
                </div>
              </div>

              {/* Diagnosis Result & Treatment */}
              {diagnosisResult && (
                <div ref={resultRef} className="space-y-6 pt-2">
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

              {/* Common Rice Leaf Diseases Samples */}
              <div className="pt-2">
                <CommonDiseasesRow
                  onSelectSample={handleSelectSample}
                  onViewAll={() => setActiveTab('catalog')}
                />
              </div>

              {/* Recent Diagnoses */}
              <div className="pt-1">
                <RecentDiagnosesRow
                  onSelectRecent={handleSelectRecent}
                  onViewHistory={() => setActiveTab('history')}
                />
              </div>

            </div>
          )}

          {/* TAB 4: Treatment Guide */}
          {activeTab === 'treatment' && (
            <TreatmentGuideView onSelectDisease={handleSelectSample} />
          )}

          {/* TAB 5: Field Management */}
          {activeTab === 'field' && (
            <FieldManagementView />
          )}

          {/* TAB 6: Disease Library */}
          {activeTab === 'catalog' && (
            <div className="space-y-5 animate-fadeIn">
              <DiseaseCatalog onSelectDisease={handleSelectSample} />
            </div>
          )}

          {/* TAB 7: Prevention */}
          {activeTab === 'prevention' && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-slate-900">Prevention Guidelines</h2>
              <p className="text-xs text-slate-500">Comprehensive practices for avoiding crop pathologies.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Water Control</h4>
                  <p className="text-[11px] text-slate-600">Alternate wetting and drying decreases leaf sheath moisture.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Balanced Nutrients</h4>
                  <p className="text-[11px] text-slate-600">Avoid single heavy nitrogen doses to prevent bacterial blight.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 mb-1">Certified Seeds</h4>
                  <p className="text-[11px] text-slate-600">Use pathogen-free certified seed lots with bio-treatments.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: History / Reports */}
          {(activeTab === 'history' || activeTab === 'reports') && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-4 animate-fadeIn">
              <h2 className="text-xl font-bold text-slate-900">Field Diagnostics History & Surveillance</h2>
              <RecentDiagnosesRow
                onSelectRecent={handleSelectRecent}
                onViewHistory={() => {}}
              />
            </div>
          )}

        </main>
      </div>

      {/* Report Modal */}
      {showReport && diagnosisResult && (
        <ReportModal
          result={diagnosisResult}
          imagePreview={selectedImage?.previewUrl}
          onClose={() => setShowReport(false)}
        />
      )}

      {/* Right Slide-over Notifications Drawer (Closes on outside click) */}
      <NotificationDrawer
        isOpen={notificationDrawerOpen}
        onClose={() => setNotificationDrawerOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setNotificationDrawerOpen(false);
        }}
        onNotificationsChange={(count) => setUnreadNotifications(count)}
      />

    </div>
  );
}
