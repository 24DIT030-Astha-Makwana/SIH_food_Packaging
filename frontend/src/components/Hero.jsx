import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Search, Cpu, BarChart3, Leaf, Clock, DollarSign, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Main Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50 to-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-emerald-100/80 shadow-xs">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI-Powered Food Packaging Decision Support</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Smart Packaging. <br />
            <span className="bg-gradient-to-r from-emerald-600 to-sky-600 bg-clip-text text-transparent">Simpler Decisions.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Tell us about your food product and business needs. PackTwin AI recommends packaging options without requiring packaging expertise.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/recommend"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base px-7 py-3.5 rounded-2xl shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Packaging Recommendation
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-base px-7 py-3.5 rounded-2xl border border-slate-200 shadow-xs transition-colors"
            >
              How It Works
            </a>
          </div>

          {/* Quick guarantee pill */}
          <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No technical jargon needed
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Analysis in under 2 minutes
            </span>
          </div>
        </div>
      </section>

      {/* 3 Simple Feature Cards (How It Works) */}
      <section id="how-it-works" className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">How PackTwin AI Works</h2>
          <p className="text-slate-600 text-sm">Three simple steps to the ideal packaging solution for your food business.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">1. Analyze</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Tell us about your product in a few simple steps — food type, target shelf life, storage, and priority.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">2. Recommend</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              AI evaluates suitable packaging options against food respiration, moisture, oxygen barrier, and transport requirements.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">3. Optimize</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Compare cost, shelf life and sustainability trade-offs across budget, recommended, and green options.
            </p>
          </div>
        </div>
      </section>

      {/* Why PackTwin AI? */}
      <section className="bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200/60 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Why PackTwin AI?</h2>
          <p className="text-slate-600 text-sm">Empowering food creators to make informed, scientific packaging choices.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">Reduce food waste</h4>
            <p className="text-xs text-slate-500 leading-normal">Ensure target freshness duration to prevent premature spoilage.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">Improve shelf life</h4>
            <p className="text-xs text-slate-500 leading-normal">Match precise oxygen & moisture barrier levels for maximum viability.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">Reduce trial & error</h4>
            <p className="text-xs text-slate-500 leading-normal">Avoid expensive custom packaging failures and trial mistakes.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Leaf className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">Find green options</h4>
            <p className="text-xs text-slate-500 leading-normal">Discover recyclable & bio-based packaging alternatives.</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 text-sm">Decide faster</h4>
            <p className="text-xs text-slate-500 leading-normal">Instant AI analysis without waiting weeks for scientific consultation.</p>
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="bg-gradient-to-r from-emerald-600 to-sky-600 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 shadow-md">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          “You know your product. We handle the packaging science.”
        </h3>
        <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          PackTwin AI helps food businesses discover suitable packaging options without requiring packaging expertise.
        </p>
        <div className="pt-2">
          <Link
            to="/recommend"
            className="inline-flex items-center gap-2 bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-colors"
          >
            Get My Recommendation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
