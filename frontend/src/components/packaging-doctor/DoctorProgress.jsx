import React from 'react';
import { Check } from 'lucide-react';

export default function DoctorProgress({ currentStep, onStepClick }) {
  const steps = [
    { num: 1, label: 'Product' },
    { num: 2, label: 'Package' },
    { num: 3, label: 'Failure' },
    { num: 4, label: 'Environment' },
    { num: 5, label: 'Autopsy' },
    { num: 6, label: 'Simulation' },
    { num: 7, label: 'Redesign' },
    { num: 8, label: 'Validation' }
  ];

  return (
    <div className="w-full space-y-2 max-w-4xl mx-auto">
      {/* Step Numbers & Labels Grid */}
      <div className="flex items-center justify-between overflow-x-auto pb-1 text-xs">
        {steps.map((step) => {
          const isDone = currentStep > step.num;
          const isCurrent = currentStep === step.num;

          return (
            <button
              key={step.num}
              type="button"
              disabled={currentStep < step.num}
              onClick={() => onStepClick && onStepClick(step.num)}
              className={`flex flex-col items-center gap-1.5 min-w-[70px] transition-all cursor-pointer ${
                isCurrent
                  ? 'text-emerald-700 font-extrabold scale-105'
                  : isDone
                  ? 'text-slate-700 font-semibold'
                  : 'text-slate-400 opacity-60 cursor-not-allowed'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-colors ${
                  isDone
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isCurrent
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-600 ring-2 ring-emerald-500/20'
                    : 'bg-slate-100 text-slate-500 border-slate-200'
                }`}
              >
                {isDone ? <Check className="w-3.5 h-3.5" /> : step.num}
              </div>
              <span className="text-[11px] whitespace-nowrap">{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-300 rounded-full"
          style={{ width: `${(currentStep / 8) * 100}%` }}
        />
      </div>
    </div>
  );
}
