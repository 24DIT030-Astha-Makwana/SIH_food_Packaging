import React, { useState } from 'react';
import { Search, AlertTriangle, Clock, Check, MessageSquare } from 'lucide-react';

export default function FailureSymptomStep({ category, symptomData, onChange, onNext, onBack }) {
  const [searchTerm, setSearchTerm] = useState('');

  const symptomsByCategory = {
    'Chips & Snacks': [
      'Becomes soggy', 'Loses crispness', 'Rancid/oily smell', 'Flavor loss',
      'Broken product', 'Package swelling', 'Seal failure', 'Color change', 'Other'
    ],
    'Fruits': [
      'Shriveling', 'Weight loss', 'Browning', 'Condensation', 'Mold',
      'Bad odor', 'Over-ripening', 'Texture loss', 'Package swelling', 'Other'
    ],
    'Vegetables': [
      'Wilting', 'Yellowing', 'Browning', 'Condensation', 'Mold',
      'Bad odor', 'Texture loss', 'Weight loss', 'Other'
    ],
    'Bakery Products': [
      'Loss of crispness', 'Becomes soft', 'Staling', 'Mold', 'Rancid smell',
      'Breakage', 'Moisture migration', 'Other'
    ],
    'Spices & Dry Foods': [
      'Caking', 'Aroma loss', 'Color fading', 'Moisture absorption', 'Oxidation',
      'Flavor loss', 'Other'
    ],
    'Meat & Seafood': [
      'Color change', 'Drip loss', 'Odor', 'Oxidation', 'Spoilage',
      'Package swelling', 'Leakage', 'Other'
    ],
    'Dairy Products': [
      'Spoilage', 'Off-flavor', 'Light damage', 'Oxidation', 'Leakage',
      'Package swelling', 'Other'
    ],
    'Frozen Foods': [
      'Freezer burn', 'Moisture loss', 'Package film cracking', 'Oxidation',
      'Leakage upon thawing', 'Other'
    ],
    'Other': [
      'Sogginess / Crispness loss', 'Rancid odor', 'Mold / Spoilage',
      'Discoloration', 'Physical damage', 'Leakage / Seal failure', 'Other'
    ]
  };

  const currentSymptoms = symptomsByCategory[category] || symptomsByCategory['Other'];
  const filteredSymptoms = currentSymptoms.filter(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900">What is going wrong with your packaging?</h2>
        <p className="text-slate-600 text-sm">Select the primary symptom or describe the packaging failure in your own words.</p>
      </div>

      {/* Symptom Search Box */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
        <input
          type="text"
          placeholder={`Search ${category || 'food'} symptoms...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      {/* Symptom Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {filteredSymptoms.map((sym) => {
          const isSelected = symptomData.symptom === sym;
          return (
            <button
              key={sym}
              type="button"
              onClick={() => onChange('symptom', sym)}
              className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all flex items-center justify-between ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs ring-1 ring-emerald-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
              }`}
            >
              <span>{sym}</span>
              {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Own Words Text Area */}
      <div className="space-y-2 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <MessageSquare className="w-4 h-4 text-emerald-600" /> Describe the problem in your own words
        </label>
        <textarea
          rows={3}
          placeholder="e.g. Potato chips become soft and lose crispness after around 20 days in humid conditions..."
          value={symptomData.description || ''}
          onChange={(e) => onChange('description', e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        />
      </div>

      {/* First Noticed Timeline */}
      <div className="space-y-2 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Clock className="w-4 h-4 text-emerald-600" /> When did you first notice the problem?
        </label>
        <select
          value={symptomData.firstObserved || '15–30 days'}
          onChange={(e) => onChange('firstObserved', e.target.value)}
          className="w-full p-3 rounded-xl border border-slate-300 bg-white font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
        >
          {['1–3 days', '4–7 days', '8–14 days', '15–30 days', '1–3 months', 'More than 3 months', 'Not sure'].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
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
          disabled={!symptomData.symptom && !symptomData.description}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-all ${
            !symptomData.symptom && !symptomData.description
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
