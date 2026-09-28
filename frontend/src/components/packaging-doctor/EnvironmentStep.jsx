import React from 'react';
import { Sun, Snowflake, Thermometer, Wind, Truck, MapPin, Info } from 'lucide-react';

export default function EnvironmentStep({ envData, onChange, onNext, onBack }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">Where and how is the package stored?</h2>
        <p className="text-slate-600 text-sm">Environmental conditions create thermal and moisture vapor gradients that drive package permeation.</p>
      </div>

      <div className="space-y-6 bg-slate-50 p-6 rounded-3xl border border-slate-200/80">
        {/* Storage Type */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Storage Environment Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {['Ambient', 'Chilled', 'Frozen', 'Controlled environment'].map(st => (
              <button
                key={st}
                type="button"
                onClick={() => onChange('storageType', st)}
                className={`p-3 rounded-xl border text-center font-bold transition-all ${
                  envData.storageType === st ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs' : 'border-slate-200 bg-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Temperature & Humidity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Temperature */}
          <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900">Storage Temperature (°C)</label>
              <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={envData.tempUnknown || false}
                  onChange={(e) => onChange('tempUnknown', e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>☐ I don't know</span>
              </label>
            </div>
            {!envData.tempUnknown && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="e.g. 30"
                  value={envData.temperature || ''}
                  onChange={(e) => onChange('temperature', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                />
                <span className="font-bold text-slate-700">°C</span>
              </div>
            )}
          </div>

          {/* Humidity */}
          <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900">Relative Humidity (%)</label>
              <label className="flex items-center gap-1.5 text-slate-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={envData.rhUnknown || false}
                  onChange={(e) => onChange('rhUnknown', e.target.checked)}
                  className="rounded text-emerald-600"
                />
                <span>☐ I don't know</span>
              </label>
            </div>
            {!envData.rhUnknown ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="e.g. 75"
                  value={envData.humidity || ''}
                  onChange={(e) => onChange('humidity', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
                />
                <span className="font-bold text-slate-700">% RH</span>
              </div>
            ) : (
              <select
                value={envData.humidityPreset || 'High humidity'}
                onChange={(e) => onChange('humidityPreset', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
              >
                <option value="Low humidity">Low humidity</option>
                <option value="Normal humidity">Normal humidity</option>
                <option value="High humidity">High humidity</option>
                <option value="Very humid / tropical conditions">Very humid / tropical conditions</option>
              </select>
            )}
          </div>
        </div>

        {/* Target Shelf Life & Transport Duration */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200">
            <label className="font-bold text-slate-900 block">Target Shelf Life (Days)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="e.g. 60"
                value={envData.shelfLife || ''}
                onChange={(e) => onChange('shelfLife', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
              />
              <span className="font-bold text-slate-700">Days</span>
            </div>
          </div>

          <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-slate-200">
            <label className="font-bold text-slate-900 block">Transport Mode & Duration</label>
            <div className="flex items-center gap-2">
              <select
                value={envData.transportType || 'Long distance'}
                onChange={(e) => onChange('transportType', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 font-semibold"
              >
                <option value="Local delivery">Local delivery</option>
                <option value="Regional">Regional</option>
                <option value="Long distance">Long distance</option>
                <option value="Export">Export</option>
                <option value="Cold chain">Cold chain</option>
              </select>
            </div>
          </div>
        </div>

        {/* Thermal Fluctuations */}
        <div className="space-y-2 bg-white p-4 rounded-2xl border border-slate-200 text-xs">
          <label className="font-bold text-slate-900 block">Thermal Fluctuation Level during Transit / Storage</label>
          <div className="grid grid-cols-4 gap-2">
            {['Low', 'Medium', 'High', 'Unknown'].map(fl => (
              <button
                key={fl}
                type="button"
                onClick={() => onChange('temperatureFluctuation', fl)}
                className={`p-2.5 rounded-xl border font-bold text-center transition-all ${
                  envData.temperatureFluctuation === fl ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white'
                }`}
              >
                {fl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm"
        >
          Run Packaging Autopsy →
        </button>
      </div>
    </div>
  );
}
