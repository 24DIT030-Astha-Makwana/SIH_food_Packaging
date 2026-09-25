import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, Loader2, Cpu } from 'lucide-react';

const STEPS = [
  "Understanding your product",
  "Checking storage conditions",
  "Analyzing packaging requirements",
  "Comparing packaging options",
  "Optimizing the recommendation"
];

export default function LoadingAnimation({ onComplete }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-lg max-w-lg mx-auto text-center space-y-8 animate-pulse-subtle">
      <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
        <Cpu className="w-8 h-8 animate-spin text-emerald-600" style={{ animationDuration: '4s' }} />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-slate-900">Analyzing Your Packaging Needs</h3>
        <p className="text-xs text-slate-500">Evaluating barrier science and business constraints...</p>
      </div>

      {/* Step Sequence */}
      <div className="space-y-3 text-left max-w-sm mx-auto">
        {STEPS.map((step, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div
              key={step}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold scale-105'
                  : isDone
                  ? 'text-slate-600 font-medium'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-200 shrink-0" />
              )}
              <span className="text-sm">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
