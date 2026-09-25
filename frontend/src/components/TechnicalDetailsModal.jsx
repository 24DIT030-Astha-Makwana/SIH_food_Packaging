import React from 'react';
import { X, Cpu, Layers, ShieldCheck, Thermometer, Wind, Lock } from 'lucide-react';

export default function TechnicalDetailsModal({ isOpen, onClose, optionData }) {
  if (!isOpen || !optionData) return null;

  const tech = optionData.technical_details || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Technical Specifications</h3>
              <p className="text-xs text-slate-500">{optionData.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Specs Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Recommended Material</span>
            <p className="font-bold text-slate-900 text-sm">{tech.recommended_material || optionData.materials}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Packaging Structure</span>
            <p className="font-bold text-slate-900 text-sm">{tech.packaging_structure || optionData.name}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Suggested Thickness Range</span>
            <p className="font-bold text-slate-900 text-sm">{tech.suggested_thickness_range || '70–90 µm'}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Oxygen Barrier Requirement (OTR)</span>
            <p className="font-bold text-emerald-800 text-sm">{tech.oxygen_barrier_requirement || 'High'}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Moisture Barrier Requirement (WVTR)</span>
            <p className="font-bold text-emerald-800 text-sm">{tech.moisture_barrier_requirement || 'High'}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Sealability</span>
            <p className="font-bold text-slate-900 text-sm">{tech.sealability || 'Hermetic heat seal'}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">Mechanical Protection</span>
            <p className="font-bold text-slate-900 text-sm">{tech.mechanical_protection || 'High burst strength'}</p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1">
            <span className="text-slate-400 uppercase tracking-wider font-semibold text-[10px]">MAP Suitability</span>
            <p className="font-bold text-slate-900 text-sm">{tech.map_suitability || 'Gas flushing suitable'}</p>
          </div>
        </div>

        <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200/60 text-xs text-amber-900 space-y-1">
          <span className="font-bold flex items-center gap-1.5 text-amber-950">
            <Thermometer className="w-4 h-4 text-amber-700" /> Storage Recommendation
          </span>
          <p className="leading-relaxed">{tech.storage_recommendation || 'Keep in dry ambient environment away from direct sun.'}</p>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
}
