import React from 'react';
import { DollarSign, Shield, Leaf, CheckCircle2, Award } from 'lucide-react';

export default function OptionCard({ options, onSelectTechnical }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-slate-900">Packaging Options & Trade-Offs</h3>
        <p className="text-xs text-slate-500">
          Compare 3 practical packaging choices tailored to your business trade-offs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((opt, idx) => {
          const isRecommended = opt.tier.includes('Recommended');
          const isBudget = opt.tier.includes('Budget');

          return (
            <div
              key={idx}
              className={`bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                isRecommended
                  ? 'border-emerald-500/50 shadow-md ring-1 ring-emerald-500/20'
                  : 'border-slate-200/80 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                {/* Header Tag */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      isRecommended
                        ? 'bg-emerald-100 text-emerald-800'
                        : isBudget
                        ? 'bg-slate-100 text-slate-700'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}
                  >
                    {opt.tier}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Score: {opt.match_score}%
                  </span>
                </div>

                <h4 className="text-lg font-bold text-slate-900 leading-snug">
                  {opt.name}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {opt.description}
                </p>

                {/* Key Metric Indicators */}
                <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-slate-400" /> Estimated Cost:
                    </span>
                    <span className="font-semibold text-slate-800">{opt.cost_level}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-slate-400" /> Protection Level:
                    </span>
                    <span className="font-semibold text-slate-800">{opt.protection_level}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5 text-slate-400" /> Sustainability:
                    </span>
                    <span className="font-semibold text-slate-800 text-right truncate max-w-[130px]" title={opt.sustainability_level}>
                      {opt.sustainability_level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-slate-100">
                <button
                  onClick={() => onSelectTechnical(opt)}
                  className={`w-full text-xs font-semibold py-2.5 rounded-xl border transition-colors ${
                    isRecommended
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Technical Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
