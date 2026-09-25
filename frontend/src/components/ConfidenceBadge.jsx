import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export default function ConfidenceBadge({ level = "High", reason }) {
  const isHigh = level === "High";

  return (
    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700">
      <ShieldCheck className={`w-4 h-4 ${isHigh ? 'text-emerald-600' : 'text-amber-600'}`} />
      <span>Confidence: <strong className={isHigh ? 'text-emerald-700' : 'text-amber-700'}>{level}</strong></span>
      {reason && (
        <span className="hidden sm:inline text-slate-400 font-normal pl-1 border-l border-slate-300">
          {reason}
        </span>
      )}
    </div>
  );
}
