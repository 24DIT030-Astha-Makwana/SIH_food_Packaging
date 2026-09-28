import React, { useState, useEffect } from 'react';
import { Cpu, CheckCircle2, Loader2, Stethoscope, Search, ShieldAlert } from 'lucide-react';

const AUTOPSY_STEPS = [
  "Evaluating product moisture & respiration kinetics...",
  "Analyzing current package film layer structure...",
  "Correlating failure symptom with ambient environment...",
  "Calculating moisture & oxygen transmission risk scores...",
  "Generating failure pathway & minimum-change redesigns..."
];

export default function AutopsyLoader({ onComplete }) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => {
        if (prev < AUTOPSY_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-lg max-w-lg mx-auto text-center space-y-8 animate-pulse-subtle">
      <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
        <Stethoscope className="w-8 h-8 animate-spin text-emerald-600" style={{ animationDuration: '3s' }} />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-extrabold text-slate-900">Performing Packaging Autopsy</h3>
        <p className="text-xs text-slate-500">Correlating failure mechanics against storage environment...</p>
      </div>

      <div className="space-y-3 text-left max-w-sm mx-auto">
        {AUTOPSY_STEPS.map((step, idx) => {
          const isDone = idx < activeIdx;
          const isCurrent = idx === activeIdx;

          return (
            <div
              key={step}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-950 font-bold scale-105 shadow-2xs'
                  : isDone
                  ? 'text-slate-600 font-medium'
                  : 'text-slate-400 opacity-50'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin shrink-0" />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-200 shrink-0" />
              )}
              <span className="text-xs">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
