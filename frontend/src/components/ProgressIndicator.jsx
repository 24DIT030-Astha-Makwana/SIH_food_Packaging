import React from 'react';
import { Check } from 'lucide-react';

export default function ProgressIndicator({ currentStep, totalSteps = 6, stepTitles }) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-600">
        <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-slate-500 font-medium">{percentage}% Complete</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Title Header */}
      {stepTitles && stepTitles[currentStep - 1] && (
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wider text-center pt-1">
          {stepTitles[currentStep - 1]}
        </p>
      )}
    </div>
  );
}
