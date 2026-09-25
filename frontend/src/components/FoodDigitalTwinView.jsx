import React from 'react';
import { Database, Thermometer, Wind, Droplets, Clock, Tag } from 'lucide-react';

export default function FoodDigitalTwinView({ twin }) {
  if (!twin) return null;

  return (
    <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Food Digital Twin Profile</h3>
            <p className="text-xs text-slate-500">Internal biological and chemical sensitivity metrics retrieved from food database</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-100 text-sky-800">
          Auto-Retrieved
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Category</span>
          <span className="font-bold text-slate-900">{twin.category}</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Moisture Sensitivity</span>
          <span className="font-bold text-slate-900">{twin.moisture_sensitivity}</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Oxygen Sensitivity</span>
          <span className="font-bold text-slate-900">{twin.oxygen_sensitivity}</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Respiration Class</span>
          <span className="font-bold text-slate-900">{twin.respiration_class}</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Typical Storage</span>
          <span className="font-bold text-slate-900">{twin.typical_storage}</span>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200">
          <span className="text-slate-400 block font-medium uppercase text-[10px]">Typical Shelf Life</span>
          <span className="font-bold text-slate-900">{twin.typical_shelf_life}</span>
        </div>
      </div>

      {twin.notes && (
        <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200 italic">
          <strong className="not-italic text-slate-800">Science Note: </strong>{twin.notes}
        </p>
      )}
    </div>
  );
}
