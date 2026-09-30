import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Save, 
  Camera, 
  Sprout, 
  Layers, 
  Bell, 
  Shield, 
  CheckCircle2 
} from 'lucide-react';

export default function SettingsView({ userProfile, onUpdateProfile }) {
  const [formData, setFormData] = useState({
    name: userProfile?.name || 'Soriful Islam',
    role: userProfile?.role || 'Farmer',
    location: userProfile?.location || 'Malda, West Bengal, India',
    phone: userProfile?.phone || '+91 98765 43210',
    email: userProfile?.email || 'soriful.farmer@ricevision.ai',
    farmSize: userProfile?.farmSize || '4.2 Acres',
    cropVariety: userProfile?.cropVariety || 'Swarna Sub-1 & MTU 1010',
    soilType: userProfile?.soilType || 'Alluvial Clay Loam',
    notificationsEnabled: userProfile?.notificationsEnabled ?? true,
    smsAlerts: userProfile?.smsAlerts ?? true,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account & Farm Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal details, farm specifications, and alert preferences
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
          <span>Profile and farm details successfully updated!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <User className="w-4 h-4 text-[#2E7D32]" />
            <span>Personal Information</span>
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
            <div className="relative group cursor-pointer">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-600 bg-slate-100 shadow-md">
                <img
                  src="/images/avatar.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h3 className="text-base font-bold text-slate-900">{formData.name}</h3>
              <p className="text-xs text-slate-500">{formData.role} • {formData.location}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Verified Farmer Account
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#2E7D32]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Role / Designation</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#2E7D32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#2E7D32]"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Location & District</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#2E7D32]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Farm & Agronomic Specifications */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
            <Sprout className="w-4 h-4 text-[#2E7D32]" />
            <span>Farm & Crop Parameters</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Total Farm Size</label>
              <input
                type="text"
                name="farmSize"
                value={formData.farmSize}
                onChange={handleChange}
                placeholder="e.g. 4.2 Acres"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Rice Cultivar Varieties</label>
              <input
                type="text"
                name="cropVariety"
                value={formData.cropVariety}
                onChange={handleChange}
                placeholder="e.g. Swarna Sub-1, MTU 1010"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#2E7D32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Soil Type</label>
              <input
                type="text"
                name="soilType"
                value={formData.soilType}
                onChange={handleChange}
                placeholder="e.g. Alluvial Clay Loam"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-[#2E7D32]"
              />
            </div>
          </div>
        </div>

        {/* Preferences & Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3 flex items-center space-x-2">
            <Bell className="w-4 h-4 text-[#2E7D32]" />
            <span>Surveillance & Advisory Alerts</span>
          </h2>

          <div className="space-y-3 pt-1">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="notificationsEnabled"
                checked={formData.notificationsEnabled}
                onChange={handleChange}
                className="w-4 h-4 text-[#2E7D32] rounded border-slate-300 focus:ring-[#2E7D32]"
              />
              <div>
                <p className="text-xs font-bold text-slate-800">Disease Outbreak Alerts</p>
                <p className="text-[11px] text-slate-500">Receive instant push notifications when disease outbreaks are detected in Malda district</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                name="smsAlerts"
                checked={formData.smsAlerts}
                onChange={handleChange}
                className="w-4 h-4 text-[#2E7D32] rounded border-slate-300 focus:ring-[#2E7D32]"
              />
              <div>
                <p className="text-xs font-bold text-slate-800">SMS Weather & Spray Guidance</p>
                <p className="text-[11px] text-slate-500">Send weather warnings suitable for fungicide spray timing</p>
              </div>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-[#193B2B] hover:bg-[#132E20] text-white text-xs font-bold shadow-md shadow-emerald-950/20 flex items-center space-x-2 transition-all"
          >
            <Save className="w-4 h-4 text-[#4ADE80]" />
            <span>Save Profile Details</span>
          </button>
        </div>

      </form>

    </div>
  );
}
