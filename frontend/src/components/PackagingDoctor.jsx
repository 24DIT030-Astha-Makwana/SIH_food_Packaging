import React, { useState } from 'react';
import { Stethoscope, Search, AlertCircle, CheckCircle2, ArrowRight, Lightbulb, ShieldAlert, Loader2 } from 'lucide-react';
import { diagnoseProblem } from '../api/client';

export default function PackagingDoctor() {
  const [product, setProduct] = useState('Potato chips');
  const [problemDescription, setProblemDescription] = useState('My chips become soggy after 20 days');
  const [diagnosis, setDiagnosis] = useState(null);
  const [loading, setLoading] = useState(false);

  const sampleIssues = [
    { prod: 'Potato chips', desc: 'My chips become soggy after 20 days' },
    { prod: 'Paneer', desc: 'Paneer surface develops slimy texture and mold growth in refrigerator' },
    { prod: 'Spices', desc: 'Ground spices lose aroma and flavor after 1 month' },
    { prod: 'Fresh vegetables', desc: 'Leafy vegetables turn yellow and develop condensation droplets inside bag' }
  ];

  const handleDiagnose = async (e) => {
    if (e) e.preventDefault();
    if (!problemDescription.trim()) return;

    setLoading(true);
    try {
      const res = await diagnoseProblem(product, problemDescription);
      setDiagnosis(res);
    } catch (err) {
      console.error('Packaging doctor diagnosis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 sm:p-10 rounded-3xl border border-emerald-100 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <Stethoscope className="w-4 h-4 text-emerald-600" />
          <span>Packaging Doctor — Troubleshooting Assistant</span>
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900">
          Diagnose Packaging Failures & Issues
        </h2>
        <p className="text-slate-600 text-sm max-w-2xl">
          Describe any quality problem occurring with your current food packaging. Our diagnostic engine evaluates barrier breaches, moisture ingress, and seal mechanics.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleDiagnose} className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 sm:col-span-1">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Food Product</label>
            <input
              type="text"
              placeholder="e.g. Potato chips, Paneer, Spices..."
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Describe Packaging Problem</label>
            <input
              type="text"
              placeholder="e.g. Chips become soggy after 20 days..."
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Preset Sample Buttons */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Try sample issues:</span>
          <div className="flex flex-wrap gap-2">
            {sampleIssues.map((sample, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setProduct(sample.prod);
                  setProblemDescription(sample.desc);
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 transition-colors border border-slate-200/60"
              >
                “{sample.desc}”
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Stethoscope className="w-4 h-4" />}
            Diagnose Issue
          </button>
        </div>
      </form>

      {/* Diagnosis Results Card */}
      {diagnosis && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-lg space-y-8 animate-fadeIn">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Doctor Diagnosis Report
            </h3>
            <p className="text-xs text-slate-500">Analysis for {product}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Possible Causes */}
            <div className="bg-rose-50/70 p-5 rounded-2xl border border-rose-100 space-y-3">
              <h4 className="font-bold text-rose-950 text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600" /> Possible Causes
              </h4>
              <ul className="space-y-2 text-xs text-rose-900">
                {diagnosis.possible_causes.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-rose-700">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Improvements */}
            <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-100 space-y-3">
              <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Recommended Improvements
              </h4>
              <ul className="space-y-2 text-xs text-emerald-900">
                {diagnosis.recommended_improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Alternative Packaging */}
            <div className="bg-sky-50/70 p-5 rounded-2xl border border-sky-100 space-y-3">
              <h4 className="font-bold text-sky-950 text-sm">Alternative Packaging Options</h4>
              <ul className="space-y-1.5 text-xs text-sky-900">
                {diagnosis.alternative_packaging.map((alt, i) => (
                  <li key={i} className="font-semibold bg-white/80 p-2.5 rounded-xl border border-sky-200/50">
                    {alt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Validation Info Needed */}
            <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-100 space-y-3">
              <h4 className="font-bold text-amber-950 text-sm">Information Needed for Validation</h4>
              <ul className="space-y-1.5 text-xs text-amber-900">
                {diagnosis.validation_info_needed.map((info, i) => (
                  <li key={i} className="bg-white/80 p-2.5 rounded-xl border border-amber-200/50">
                    {info}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
