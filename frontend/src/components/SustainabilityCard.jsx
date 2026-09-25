import React from 'react';
import { Leaf, Info, RefreshCw } from 'lucide-react';

export default function SustainabilityCard({ sustainableData }) {
  if (!sustainableData) return null;

  return (
    <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 p-6 sm:p-8 rounded-3xl border border-emerald-200/80 shadow-xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
          <Leaf className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Looking for a greener option?</h3>
          <p className="text-xs text-slate-500">Sustainable eco-alternative for eco-conscious brands</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <span className="font-bold text-slate-900 text-base">{sustainableData.name}</span>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full self-start">
            Material: {sustainableData.material}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-700 block">How it differs:</span>
            <p className="text-slate-600 leading-relaxed">{sustainableData.differ_from_recommended}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-emerald-800 block">Sustainability Advantage:</span>
            <p className="text-slate-600 leading-relaxed">{sustainableData.sustainability_advantage}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-amber-800 block">Performance Trade-off:</span>
            <p className="text-slate-600 leading-relaxed">{sustainableData.performance_tradeoff}</p>
          </div>

          <div className="space-y-1">
            <span className="font-bold text-slate-700 block">Cost Trade-off:</span>
            <p className="text-slate-600 leading-relaxed">{sustainableData.cost_tradeoff}</p>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 flex items-center gap-1.5 italic">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        Environmental impact metrics depend on localized recycling facilities and end-of-life handling.
      </p>
    </div>
  );
}
