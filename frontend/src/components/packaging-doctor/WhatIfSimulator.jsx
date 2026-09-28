import React, { useState } from 'react';
import { Sliders, Sparkles, RefreshCw, AlertTriangle, ShieldCheck } from 'lucide-react';
import { calculatePackagingRisk } from '../../services/riskEngine';

export default function WhatIfSimulator({ data, onSimulatedRiskUpdate }) {
  const [temp, setTemp] = useState(data?.environment?.temperature || 30);
  const [rh, setRh] = useState(data?.environment?.humidity || 75);
  const [shelfLife, setShelfLife] = useState(data?.environment?.shelfLife || 60);
  const [transportDuration, setTransportDuration] = useState(data?.environment?.transportDuration || 3);
  const [tempFluctuates, setTempFluctuates] = useState(data?.environment?.temperatureFluctuation || 'Low');
  const [barrierLevel, setBarrierLevel] = useState('Current Package');

  const simInput = {
    ...data,
    simulation: {
      temperature: temp,
      humidity: rh,
      shelfLife,
      transportDuration,
      temperatureFluctuation: tempFluctuates,
      packagingBarrier: barrierLevel === 'Improved Barrier' ? 'High' : 'Medium'
    }
  };

  const risks = calculatePackagingRisk(simInput);

  const applyPreset = (presetName) => {
    if (presetName === 'humidity') {
      setRh(85);
    } else if (presetName === 'transport') {
      setTransportDuration(14);
    } else if (presetName === 'hot') {
      setTemp(38);
      setRh(80);
    } else if (presetName === 'extended') {
      setShelfLife(120);
    } else if (presetName === 'coldbreak') {
      setTemp(28);
      setTempFluctuates('High');
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold mb-1">
            <Sliders className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">What-If Simulator</h3>
          <p className="text-xs text-slate-500">Change environmental parameters and watch estimated packaging risks update in real time.</p>
        </div>

        {/* Overall Risk Badge */}
        <div className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl text-center self-start sm:self-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase block">Simulated Overall Risk</span>
          <span className={`text-lg font-extrabold ${risks.overallRisk === 'HIGH' ? 'text-rose-400' : risks.overallRisk === 'MEDIUM' ? 'text-amber-400' : 'text-emerald-400'}`}>
            {risks.overallRisk}
          </span>
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Quick Presets:</span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => applyPreset('humidity')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-700 transition-colors border border-slate-200"
          >
            High Humidity Scenario (85% RH)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('transport')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-700 transition-colors border border-slate-200"
          >
            Long Transport Scenario (14 days)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('hot')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-700 transition-colors border border-slate-200"
          >
            Hot Climate Scenario (38°C)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('extended')}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-700 transition-colors border border-slate-200"
          >
            Extended Shelf Life (120 days)
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
        {/* Storage Temperature */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-slate-800">
            <span>Storage Temperature (°C)</span>
            <span className="text-emerald-700 font-extrabold">{temp}°C</span>
          </div>
          <input
            type="range"
            min="-20"
            max="50"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Relative Humidity */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-slate-800">
            <span>Relative Humidity (%)</span>
            <span className="text-emerald-700 font-extrabold">{rh}% RH</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={rh}
            onChange={(e) => setRh(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Shelf Life */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-slate-800">
            <span>Target Shelf Life (Days)</span>
            <span className="text-emerald-700 font-extrabold">{shelfLife} Days</span>
          </div>
          <input
            type="range"
            min="1"
            max="365"
            value={shelfLife}
            onChange={(e) => setShelfLife(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Transport Duration */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-slate-800">
            <span>Transport Duration (Days)</span>
            <span className="text-emerald-700 font-extrabold">{transportDuration} Days</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={transportDuration}
            onChange={(e) => setTransportDuration(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        {/* Packaging Barrier Level */}
        <div className="space-y-2 sm:col-span-2">
          <div className="flex justify-between font-bold text-slate-800">
            <span>Packaging Barrier Structure</span>
            <span className="text-emerald-700 font-extrabold">{barrierLevel}</span>
          </div>
          <div className="flex gap-3">
            {['Current Package', 'Improved Barrier'].map(b => (
              <button
                key={b}
                type="button"
                onClick={() => setBarrierLevel(b)}
                className={`flex-1 p-2.5 rounded-xl border font-bold text-center transition-all ${
                  barrierLevel === b ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Simulated Risk Indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Moisture Risk</span>
          <span className={`font-extrabold text-sm block ${risks.moistureRisk === 'HIGH' ? 'text-rose-600' : 'text-slate-800'}`}>
            {risks.moistureRisk} ({risks.moistureScore}/100)
          </span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Oxygen Risk</span>
          <span className={`font-extrabold text-sm block ${risks.oxygenRisk === 'HIGH' ? 'text-rose-600' : 'text-slate-800'}`}>
            {risks.oxygenRisk} ({risks.oxygenScore}/100)
          </span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Seal Integrity</span>
          <span className={`font-extrabold text-sm block ${risks.sealRisk === 'HIGH' ? 'text-rose-600' : 'text-slate-800'}`}>
            {risks.sealRisk} ({risks.sealScore}/100)
          </span>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold block">Mechanical Risk</span>
          <span className={`font-extrabold text-sm block ${risks.mechanicalRisk === 'HIGH' ? 'text-rose-600' : 'text-slate-800'}`}>
            {risks.mechanicalRisk} ({risks.mechScore}/100)
          </span>
        </div>
      </div>
    </div>
  );
}
