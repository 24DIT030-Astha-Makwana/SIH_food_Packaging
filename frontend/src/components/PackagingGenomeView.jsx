import React from 'react';
import { Dna, Shield, DollarSign, Leaf, Zap, BarChart2 } from 'lucide-react';

export default function PackagingGenomeView({ genome }) {
  if (!genome || !genome.genome_vector) return null;

  const vector = genome.genome_vector;

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Dna className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Packaging Genome Profile</h3>
            <p className="text-xs text-slate-500">Multi-dimensional barrier performance fingerprint</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700">
          Internal Concept Profile
        </span>
      </div>

      {/* Genome Metrics Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(vector).map(([key, score]) => {
          const percent = Math.min(100, Math.max(10, score * 10));

          return (
            <div key={key} className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-700">{key}</span>
                <span className="text-indigo-700">{score} / 10</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
