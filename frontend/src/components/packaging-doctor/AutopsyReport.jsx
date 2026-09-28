import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Dna, Info, AlertCircle } from 'lucide-react';

export default function AutopsyReport({ autopsyData }) {
  const [expandedMechanism, setExpandedMechanism] = useState('moisture');

  if (!autopsyData) return null;

  const {
    primaryMechanism,
    confidence,
    evidence = [],
    likelyFailurePathway = [],
    mechanisms = [],
    timeline = [],
    packageDNA = []
  } = autopsyData;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Autopsy Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
            Packaging Autopsy Report
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Why might this package be failing?
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Correlated failure mechanisms based on food biology & ambient storage stress.
          </p>
        </div>
        <div className="bg-slate-800 px-4 py-2.5 rounded-2xl border border-slate-700 text-center">
          <span className="text-[10px] text-slate-400 font-semibold uppercase block">Primary Suspect</span>
          <span className="text-sm font-extrabold text-rose-400">{primaryMechanism}</span>
        </div>
      </div>

      {/* PRIMARY SUSPECTED FAILURE HERO CARD */}
      <div className="bg-gradient-to-br from-rose-500/10 via-white to-amber-500/10 p-6 sm:p-8 rounded-3xl border-2 border-rose-500/30 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-100 pb-4">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5" /> Primary Suspected Failure
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 pt-1">
              {primaryMechanism}
            </h3>
          </div>
          <div className="bg-rose-100 px-4 py-2 rounded-2xl border border-rose-200 text-center self-start sm:self-center">
            <span className="text-[10px] text-rose-800 font-bold uppercase block">Diagnosis Confidence</span>
            <span className="text-lg font-extrabold text-rose-900">{confidence}</span>
          </div>
        </div>

        {/* Evidence Bullet Points */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-slate-900">Diagnostic Evidence:</h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {evidence.map((ev, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white/90 p-3 rounded-xl border border-rose-100 shadow-2xs">
                <span className="font-bold text-rose-600 mt-0.5">•</span>
                <span>{ev}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* LIKELY FAILURE PATHWAY FLOWCHART */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          Likely Failure Pathway
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          {likelyFailurePathway.map((step, idx) => (
            <React.Fragment key={idx}>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center font-semibold text-slate-800 w-full sm:w-auto flex-1">
                {step}
              </div>
              {idx < likelyFailurePathway.length - 1 && (
                <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 rotate-90 sm:rotate-0 my-1 sm:my-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* FAILURE MECHANISM CARDS (EXPANDABLE) */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Failure Mechanism Risk Profile</h3>
        <div className="grid grid-cols-1 gap-4">
          {mechanisms.map((mech) => {
            const isExpanded = expandedMechanism === mech.id;
            const isHigh = mech.risk === 'HIGH';
            const isMed = mech.risk === 'MEDIUM';

            return (
              <div
                key={mech.id}
                className={`bg-white rounded-2xl border p-5 transition-all ${
                  isHigh
                    ? 'border-rose-300 ring-1 ring-rose-500/20'
                    : isMed
                    ? 'border-amber-300'
                    : 'border-slate-200'
                }`}
              >
                <div
                  onClick={() => setExpandedMechanism(isExpanded ? null : mech.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-900 text-sm sm:text-base">{mech.title}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                        isHigh
                          ? 'bg-rose-100 text-rose-800'
                          : isMed
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      Risk: {mech.risk} ({mech.score}/100)
                    </span>
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>

                {isExpanded && (
                  <div className="pt-4 mt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs animate-fadeIn">
                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 block">Why Suspected:</span>
                      <p className="text-slate-600">{mech.whySuspected}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-amber-800 block">Potential Consequence:</span>
                      <p className="text-slate-600">{mech.potentialConsequence}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-bold text-emerald-800 block">Recommended Validation:</span>
                      <p className="text-slate-600">{mech.validationTest}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FAILURE TIMELINE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Failure Timeline</h3>
          <span className="text-[11px] text-slate-400 italic">Simulated timeline — rule-based estimate</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          {timeline.map((item, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl border ${
                item.status === 'FAIL'
                  ? 'bg-rose-50 border-rose-200 text-rose-950 font-semibold'
                  : item.status === 'WARNING'
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              <span className="font-extrabold block text-sm">{item.day}</span>
              <span className="font-bold block text-xs mt-0.5">{item.title}</span>
              <span className="text-[11px] text-slate-500 block mt-1 leading-normal">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* PACKAGE DNA ATTRIBUTES */}
      <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-4">
        <div className="flex items-center gap-2">
          <Dna className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">Current Package DNA Attributes</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          {packageDNA.map((attr, idx) => (
            <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
              <span className="text-slate-400 block font-medium uppercase text-[10px]">{attr.label}</span>
              <span className="font-bold text-slate-900 block">{attr.value}</span>
              <span className="text-[10px] font-semibold text-slate-500 block">{attr.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
