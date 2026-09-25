import React from 'react';
import { CheckCircle2, ShieldCheck, Star } from 'lucide-react';
import ConfidenceBadge from './ConfidenceBadge';

export default function RecommendationCard({ recommendation, onOpenTechnical }) {
  const rec = recommendation.recommended_packaging;
  const summary = recommendation.input_summary || {};

  return (
    <div className="space-y-8">
      {/* Top Input Summary Header */}
      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Packaging Recommendation</h2>
          <p className="text-xs text-slate-500 mt-0.5">Optimized AI analysis based on your target conditions</p>
        </div>
        <ConfidenceBadge level={recommendation.confidence_level} reason={recommendation.confidence_reason} />
      </div>

      {/* Input Summary Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Product</span>
          <span className="font-bold text-slate-900">{summary.Product || recommendation.product}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Shelf Life</span>
          <span className="font-bold text-slate-900">{summary["Shelf life"]}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Storage</span>
          <span className="font-bold text-slate-900">{summary.Storage}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Transportation</span>
          <span className="font-bold text-slate-900">{summary.Transportation}</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Priority</span>
          <span className="font-bold text-emerald-700">{summary.Priority}</span>
        </div>
      </div>

      {/* RECOMMENDED PACKAGING Hero Card */}
      <div className="bg-gradient-to-br from-emerald-500/10 via-white to-sky-500/10 p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/30 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 fill-white" /> Recommended Solution
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 pt-1">
              {rec.name}
            </h3>
            <p className="text-sm text-slate-600">
              Recommended for your product and target conditions
            </p>
          </div>

          <div className="bg-emerald-600/10 border border-emerald-500/30 px-5 py-3 rounded-2xl text-center self-start sm:self-center">
            <span className="text-xs text-emerald-800 font-semibold uppercase tracking-wider block">Suitability</span>
            <span className="text-2xl font-extrabold text-emerald-700">{rec.suitability || 'High'}</span>
          </div>
        </div>

        {/* Why We Recommend This */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-slate-900">Why we recommend this</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendation.why_recommended?.map((reason, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 bg-white/80 p-3 rounded-xl border border-slate-200/60">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* View Technical Details CTA */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onOpenTechnical}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white hover:bg-emerald-50 px-4 py-2.5 rounded-xl border border-emerald-200 shadow-xs transition-colors"
          >
            View Technical Details →
          </button>
        </div>
      </div>
    </div>
  );
}
