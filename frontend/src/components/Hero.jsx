import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Package, Stethoscope, CheckCircle2, ShieldCheck, Search, Cpu, BarChart3, Leaf, Clock, Zap, Sliders, FileText } from 'lucide-react';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Main Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-emerald-100/80 shadow-xs">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide">
            <Stethoscope className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI Packaging Doctor for Food Products</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Eco-PackAI <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-700 font-semibold max-w-2xl mx-auto">
            Diagnose why packaging fails, simulate real-world conditions, and engineer a better package.
          </p>

          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            “Most systems tell you what package to use. Eco-PackAI tells you WHY your package is failing and HOW to redesign it with minimum necessary change.”
          </p>

          {/* Quick Demo Button for Hackathon Judges */}
          <div className="pt-2 flex items-center justify-center gap-4">
            <Link
              to="/packaging-doctor"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all hover:scale-105"
            >
              <Sparkles className="w-4 h-4" /> Try Demo (30s Potato Chips Autopsy)
            </Link>
          </div>
        </div>
      </section>

      {/* TWO MAJOR WORKFLOW CARDS */}
      <section className="space-y-6 max-w-5xl mx-auto">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold text-slate-900">Choose Your Packaging Workflow</h2>
          <p className="text-xs text-slate-500">Select whether you are starting fresh or troubleshooting an existing package.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CARD 1: NEW PACKAGE */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
                <Package className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">Workflow A</span>
                <h3 className="text-2xl font-bold text-slate-900">Design a New Package</h3>
                <p className="text-xs text-slate-500 leading-relaxed pt-1">
                  “I don't have a packaging solution yet.” Tell us about your food product and target shelf life to get recommended packaging options.
                </p>
              </div>
            </div>

            <div>
              <Link
                to="/recommend"
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm py-3 rounded-2xl transition-colors shadow-xs"
              >
                Start Recommendation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* CARD 2: PACKAGING DOCTOR (VISUALLY PROMINENT) */}
          <div className="bg-gradient-to-br from-emerald-500/10 via-white to-sky-500/10 p-8 rounded-3xl border-2 border-emerald-500/40 shadow-md hover:shadow-lg transition-all flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Flagship Feature
            </div>

            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Workflow B</span>
                <h3 className="text-2xl font-extrabold text-slate-900">Diagnose Existing Packaging</h3>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  “My current packaging is failing or I want to know what could go wrong.” Perform a packaging autopsy, simulate environmental risk, and engineer minimum-change redesigns.
                </p>
              </div>
            </div>

            <div>
              <Link
                to="/packaging-doctor"
                className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm py-3 rounded-2xl transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.01]"
              >
                <Stethoscope className="w-4 h-4" />
                Start Packaging Autopsy
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* HOW Eco-PackAI WORKS — 5 STEP VISUAL FLOW */}
      <section className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200/80 space-y-8 max-w-5xl mx-auto">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-2xl font-bold text-slate-900">How Eco-PackAI Works</h2>
          <p className="text-slate-600 text-xs">Five engineering steps from failure diagnosis to validated packaging specification.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-2">
            <span className="font-extrabold text-emerald-600 text-sm block">01</span>
            <span className="font-bold text-slate-900 block">Understand Product</span>
            <p className="text-[11px] text-slate-500">Food moisture, lipids, pH & respiration kinetics.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-2">
            <span className="font-extrabold text-emerald-600 text-sm block">02</span>
            <span className="font-bold text-slate-900 block">Diagnose Packaging</span>
            <p className="text-[11px] text-slate-500">Correlate failure symptoms with film barrier gaps.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-2">
            <span className="font-extrabold text-emerald-600 text-sm block">03</span>
            <span className="font-bold text-slate-900 block">Simulate Conditions</span>
            <p className="text-[11px] text-slate-500">Interactive What-If stress testing for RH & temp.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-2">
            <span className="font-extrabold text-emerald-600 text-sm block">04</span>
            <span className="font-bold text-slate-900 block">Redesign Package</span>
            <p className="text-[11px] text-slate-500">Minimum-change candidate evolution options.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center space-y-2">
            <span className="font-extrabold text-emerald-600 text-sm block">05</span>
            <span className="font-bold text-slate-900 block">Validate</span>
            <p className="text-[11px] text-slate-500">Prioritized testing plan & engineering spec.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
