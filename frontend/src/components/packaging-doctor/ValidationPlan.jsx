import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, DollarSign, HelpCircle, FileText } from 'lucide-react';

export default function ValidationPlan({ validationPlan = [] }) {
  const [budget, setBudget] = useState('₹5,000');

  const budgetTiers = ['₹2,000', '₹5,000', '₹10,000', '₹25,000+'];

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Engineering Validation Protocol</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Recommended Validation & Test Plan</h3>
          <p className="text-xs text-slate-500">Prioritized testing suite focused on resolving primary packaging uncertainties.</p>
        </div>

        {/* Validation Budget Selector */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Validation Budget</span>
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
            {budgetTiers.map(b => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  budget === b ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="space-y-3">
        {validationPlan.map((test, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">{test.testName}</span>
                <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  {test.priority}
                </span>
              </div>
              <p className="text-slate-600">
                <strong>Why prioritized: </strong>{test.reason}
              </p>
            </div>

            <div className="bg-white px-3 py-1.5 rounded-xl border border-slate-200 font-bold text-slate-800 shrink-0 text-right">
              {test.estimatedCost}
            </div>
          </div>
        ))}
      </div>

      <p className="text-[11px] text-slate-500 italic flex items-center gap-1.5">
        <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        Prioritized because moisture ingress and seal leakage are the highest uncertainties for this failure profile.
      </p>
    </div>
  );
}
