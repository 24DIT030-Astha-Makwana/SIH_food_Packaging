import React, { useState } from 'react';
import { RefreshCw, ArrowRight, Sparkles, Sliders } from 'lucide-react';
import { simulateWhatIf } from '../api/client';

export default function WhatIfSimulator({ originalInput, onUpdateRecommendation }) {
  const [modStorage, setModStorage] = useState(originalInput?.storage || 'Room temperature');
  const [modShelfLife, setModShelfLife] = useState(originalInput?.shelf_life || '1–3 months');
  const [modTransport, setModTransport] = useState(originalInput?.transportation || 'Long distance');
  const [modPriority, setModPriority] = useState(originalInput?.priority || 'Balanced');

  const [simResult, setSimResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await simulateWhatIf(originalInput, {
        modified_storage: modStorage,
        modified_shelf_life: modShelfLife,
        modified_transportation: modTransport,
        modified_priority: modPriority,
      });
      setSimResult(res);
      if (onUpdateRecommendation) {
        onUpdateRecommendation(res.updated_recommendation);
      }
    } catch (err) {
      console.error('Simulation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">What-If Simulator</h3>
            <p className="text-xs text-slate-500">Test how modifying business conditions changes your packaging recommendation</p>
          </div>
        </div>
      </div>

      {/* Simulator Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Storage */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700 block">Storage Condition</label>
          <select
            value={modStorage}
            onChange={(e) => setModStorage(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 font-medium"
          >
            <option value="Room temperature">Room temperature</option>
            <option value="Refrigerated">Refrigerated</option>
            <option value="Frozen">Frozen</option>
          </select>
        </div>

        {/* Shelf Life */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700 block">Shelf Life Duration</label>
          <select
            value={modShelfLife}
            onChange={(e) => setModShelfLife(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 font-medium"
          >
            <option value="Less than 1 week">Less than 1 week</option>
            <option value="1–4 weeks">1–4 weeks</option>
            <option value="1–3 months">1–3 months</option>
            <option value="3–6 months">3–6 months</option>
            <option value="More than 6 months">More than 6 months</option>
          </select>
        </div>

        {/* Transportation */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700 block">Transportation Distance</label>
          <select
            value={modTransport}
            onChange={(e) => setModTransport(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 font-medium"
          >
            <option value="Local / nearby">Local / nearby</option>
            <option value="Within the state">Within the state</option>
            <option value="Long distance">Long distance</option>
            <option value="Export">Export</option>
          </select>
        </div>

        {/* Priority */}
        <div className="space-y-1.5">
          <label className="font-semibold text-slate-700 block">Business Priority</label>
          <select
            value={modPriority}
            onChange={(e) => setModPriority(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 font-medium"
          >
            <option value="Lowest cost">Lowest cost</option>
            <option value="Maximum shelf life">Maximum shelf life</option>
            <option value="Eco-friendly packaging">Eco-friendly packaging</option>
            <option value="Balanced">Balanced</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSimulate}
          disabled={loading}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          {loading ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Run Simulation
        </button>
      </div>

      {/* Simulation Result: What Changed? */}
      {simResult && (
        <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/80 space-y-3 animate-fadeIn">
          <h4 className="text-sm font-bold text-amber-950 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" /> What changed?
          </h4>
          <ul className="space-y-2 text-xs text-amber-900">
            {simResult.what_changed.map((change, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-200/50">
                <ArrowRight className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
