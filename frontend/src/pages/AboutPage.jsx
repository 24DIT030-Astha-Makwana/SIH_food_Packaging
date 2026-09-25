import React from 'react';
import { Package, ShieldCheck, Sparkles, CheckCircle2, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12 px-4 max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8 sm:p-12 rounded-3xl border border-emerald-100 shadow-xs text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
          <Package className="w-6 h-6" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">About PackTwin AI</h1>
        <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed">
          Democratizing food packaging science for food businesses, farmers, startups, and food manufacturers worldwide.
        </p>
      </div>

      {/* Philosophy Section */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Our Main Philosophy</h2>
        <div className="p-6 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950 font-bold text-xl text-center">
          “The user provides the business problem. The AI handles the packaging science.”
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">
          Traditional food packaging selection requires complex technical calculations — gas transmission rates (OTR), water vapor permeability (WVTR), respiration kinetics, and seal chemistry. Business owners should not be forced to act like packaging engineers.
        </p>

        <p className="text-slate-600 text-sm leading-relaxed">
          PackTwin AI bridges this gap by translating simple business inputs (food type, target shelf life, storage temperature, transportation distance, and priority) into scientifically sound packaging recommendations.
        </p>
      </div>

      {/* Core Rules & Guarantees */}
      <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">Our UX Principles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
          {[
            "Never overwhelm the user with technical terminology.",
            "Never ask business owners for OTR or WVTR numbers.",
            "Never require prior knowledge of packaging science.",
            "Use clear, simple English for all recommendations.",
            "Always explain trade-offs between cost, protection, and sustainability.",
            "Show technical details only when explicitly requested.",
            "Always provide budget, recommended, and greener alternatives.",
            "Clearly distinguish validated data from model estimations."
          ].map((rule, idx) => (
            <div key={idx} className="flex items-start gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200/60">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-lg">
        <h3 className="text-2xl font-extrabold">Ready to find your ideal food packaging?</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Get a tailored packaging decision analysis in under 2 minutes.
        </p>
        <div className="pt-2">
          <Link
            to="/recommend"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-7 py-3 rounded-xl transition-colors"
          >
            Get My Recommendation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
