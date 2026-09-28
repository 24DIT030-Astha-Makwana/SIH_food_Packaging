import React from 'react';
import { Layers, Sparkles, ArrowRight, ShieldCheck, Check, DollarSign } from 'lucide-react';

export default function RedesignPanel({ candidates = [] }) {
  if (!candidates || candidates.length === 0) return null;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Minimum-Change Redesign</span>
        </div>
        <h3 className="text-xl font-extrabold text-slate-900">Packaging Evolution Candidates</h3>
        <p className="text-xs text-slate-500">
          Redesign options ordered from minimum friction to high barrier structure overhaul.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {candidates.map((cand, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-3xl border p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md transition-all ${
              idx === 1 ? 'border-emerald-500/60 ring-2 ring-emerald-500/20' : 'border-slate-200/80'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  {cand.candidateId}
                </span>
                <span className="text-xs font-bold text-slate-700">{cand.costCategory}</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 leading-snug">{cand.title}</h4>
              <p className="text-xs text-slate-500 font-medium">{cand.subtitle}</p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Materials</span>
                  <span className="font-bold text-slate-900 block">{cand.materials}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Change Required</span>
                  <span className="font-bold text-slate-800 block">{cand.changeRequired}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Expected Impact</span>
                  <span className="font-bold text-emerald-700 block">{cand.expectedImpact}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">Trade-off</span>
                  <span className="text-slate-600 block leading-tight">{cand.tradeoffs}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
              <strong>Validation: </strong>{cand.validationNeeded}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
