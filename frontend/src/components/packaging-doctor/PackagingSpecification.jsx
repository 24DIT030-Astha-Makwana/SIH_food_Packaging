import React from 'react';
import { FileText, Printer, ShieldCheck, Download, AlertCircle, CheckCircle2 } from 'lucide-react';
import { downloadReportPdf } from '../../api/client';

export default function PackagingSpecification({ data, redesignCandidate }) {
  if (!data) return null;

  const prodName = data.product?.name || 'Potato Chips';
  const targetSpec = redesignCandidate || {
    name: 'BOPP (20µm) / Met-PET (12µm) / LLDPE (50µm)',
    materials: 'BOPP / Met-PET / LLDPE',
    thickness: '82 µm',
    otr: '1.0 cc/m²/day',
    wvtr: '0.5 g/m²/day',
    seal: 'Hermetic heat seal (ASTM F88)',
    mechanical: 'High puncture resistance & drop durability',
    cost: 'Medium ($$)'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-lg space-y-8 animate-fadeIn printable-area">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold mb-2">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>PackTwin AI Engineering Document</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Packaging Engineering Specification</h2>
          <p className="text-xs text-slate-500">Formal packaging design & validation specification</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-2xs"
          >
            <Printer className="w-4 h-4" /> Print Spec
          </button>
        </div>
      </div>

      {/* Product & Operating Context Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div>
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Product Name</span>
          <span className="font-extrabold text-slate-900">{prodName}</span>
        </div>
        <div>
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Target Shelf Life</span>
          <span className="font-bold text-slate-900">{data.environment?.shelfLife || 60} Days</span>
        </div>
        <div>
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Storage Condition</span>
          <span className="font-bold text-slate-900">{data.environment?.storageType || 'Ambient'} ({data.environment?.temperature || 30}°C)</span>
        </div>
        <div>
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Transit Mode</span>
          <span className="font-bold text-slate-900">{data.environment?.transportType || 'Long distance'}</span>
        </div>
      </div>

      {/* Target Engineering Specification Table */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Target Package Engineering Properties</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">Recommended Material Structure</span>
            <p className="font-extrabold text-slate-900 text-sm">{targetSpec.materials || targetSpec.title}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">Suggested Thickness</span>
            <p className="font-bold text-slate-900 text-sm">{targetSpec.thickness || '80–110 µm'}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">Target Oxygen Barrier (OTR)</span>
            <p className="font-bold text-emerald-800 text-sm">{targetSpec.otr || '< 1.0 cc/m²/day'}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">Target Moisture Barrier (WVTR)</span>
            <p className="font-bold text-emerald-800 text-sm">{targetSpec.wvtr || '< 0.5 g/m²/day'}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">Seal Requirements</span>
            <p className="font-bold text-slate-900 text-sm">{targetSpec.seal || 'Hermetic heat seal band'}</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-slate-400 font-bold text-[10px] uppercase block">Mechanical Durability</span>
            <p className="font-bold text-slate-900 text-sm">{targetSpec.mechanical || 'High burst strength & flex-crack resistance'}</p>
          </div>
        </div>
      </div>

      {/* Data Provenance Table */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Parameter Data Provenance</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-semibold">
            <span className="block text-[10px] text-emerald-800 uppercase font-bold">User Provided</span>
            <span>Product & Symptom Data</span>
          </div>
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 font-semibold">
            <span className="block text-[10px] text-sky-800 uppercase font-bold">Estimated</span>
            <span>Respiration & Storage RH</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
            <span className="block text-[10px] text-slate-500 uppercase font-bold">Unknown</span>
            <span>Exact Film Polymer Thickness</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
            <span className="block text-[10px] text-slate-500 uppercase font-bold">Not Applicable</span>
            <span>CO₂ Permeability</span>
          </div>
        </div>
      </div>

      {/* Safety & Engineering Disclaimer */}
      <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Engineering Disclaimer:</strong> PackTwin provides decision-support estimates and candidate packaging designs. Results should be validated using appropriate packaging, food-quality, regulatory, and laboratory testing before commercial use.
        </p>
      </div>
    </div>
  );
}
