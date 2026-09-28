import React, { useState } from 'react';
import { Upload, Camera, FileText, Image as ImageIcon, Info, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function CurrentPackageStep({ packageData, onChange, onNext, onBack }) {
  const [activeTab, setActiveTab] = useState('photo'); // 'photo' vs 'manual'
  const [imagePreview, setImagePreview] = useState(packageData.photoUrl || null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      onChange('photo', file);
      onChange('photoUrl', url);
      // Auto estimate material & format if photo uploaded
      if (!packageData.format) onChange('format', 'Pouch');
      if (!packageData.material) onChange('material', 'PET / PE');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">What package are you currently using?</h2>
        <p className="text-slate-600 text-sm">Upload a photo of your failing package or specify your current packaging structure manually.</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex rounded-xl bg-slate-100 p-1 max-w-md border border-slate-200 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab('photo')}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'photo' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Camera className="w-4 h-4 text-emerald-600" /> Upload Package Photo
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('manual')}
          className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeTab === 'manual' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4 text-emerald-600" /> Describe Manually
        </button>
      </div>

      {/* OPTION A: PHOTO UPLOAD */}
      {activeTab === 'photo' && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-3xl p-8 text-center bg-slate-50/60 transition-colors">
            {imagePreview ? (
              <div className="space-y-4 max-w-xs mx-auto">
                <img src={imagePreview} alt="Uploaded package" className="max-h-48 rounded-2xl mx-auto shadow-md border border-slate-200" />
                <label className="cursor-pointer text-xs font-bold text-emerald-700 hover:underline block">
                  Change Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
            ) : (
              <label className="cursor-pointer space-y-3 block">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-sm block">Drag & drop package photo or click to browse</span>
                  <span className="text-xs text-slate-500 block">Supports PNG, JPG, JPEG, WEBP</span>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              <strong>AI Visual Estimate Notice:</strong> Photo analysis provides an initial structural estimate. Always verify exact film layers with your packaging supplier or lab specification sheet.
            </span>
          </div>
        </div>
      )}

      {/* OPTION B: MANUAL DESCRIPTION */}
      <div className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-200/80">
        <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Package Specification</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Packaging Format */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Packaging Format</label>
            <select
              value={packageData.format || 'Pouch'}
              onChange={(e) => onChange('format', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
            >
              {['Pouch', 'Bottle', 'Tray', 'Sachet', 'Bag', 'Carton', 'Jar', 'Can', 'Other'].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Known Material */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Known Primary Material</label>
            <select
              value={packageData.material || 'PET / PE'}
              onChange={(e) => onChange('material', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
            >
              {[
                'PET / PE',
                'LDPE',
                'HDPE',
                'PP',
                'PET',
                'Metallized film (Met-PET)',
                'Aluminum foil laminate (PET/AL/PE)',
                'Paperboard',
                'Glass',
                'Metal',
                'Unknown',
                'Other'
              ].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Known Structure string */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Layer Structure (e.g. PET / MET-PET / PE)</label>
            <input
              type="text"
              placeholder="e.g. PET (12µm) / PE (60µm)"
              value={packageData.structure || ''}
              onChange={(e) => onChange('structure', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
            />
          </div>

          {/* Seal Type */}
          <div className="space-y-1.5">
            <label className="font-semibold text-slate-700 block">Seal Type</label>
            <select
              value={packageData.sealType || 'Heat seal'}
              onChange={(e) => onChange('sealType', e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
            >
              {['Heat seal', 'Adhesive', 'Screw cap', 'Snap fit', 'Unknown'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Collapsible Advanced Section */}
        <div className="pt-2 border-t border-slate-200">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Advanced Packaging Details (Thickness, Barrier Rating)
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-3 animate-fadeIn">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">Estimated Thickness (µm)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="e.g. 80"
                    value={packageData.thickness || ''}
                    onChange={(e) => onChange('thickness', e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900"
                  />
                  <span className="text-slate-500 font-semibold">µm</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700 block">Estimated Barrier Rating</label>
                <select
                  value={packageData.barrierLevel || 'Medium'}
                  onChange={(e) => onChange('barrierLevel', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-slate-900"
                >
                  <option value="Low">Low (Single film / polyethylene)</option>
                  <option value="Medium">Medium (Standard duplex laminate)</option>
                  <option value="High">High (Metallized / Foil barrier)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
