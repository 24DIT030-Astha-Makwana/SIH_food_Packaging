import React, { useState, useEffect } from 'react';
import { Scale, Check, Plus, Trash2, Loader2, Sparkles } from 'lucide-react';
import { fetchAllStructures, comparePackaging } from '../api/client';

export default function ComparisonTable() {
  const [allStructures, setAllStructures] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([
    "Duplex Laminate Pouch (PET / PE)",
    "High-Barrier Metallized Pouch (BOPP / Met-PET / PE)",
    "Recyclable Mono-Material High-Barrier Pouch (MDO-PE / EVOH-PE / PE)"
  ]);
  const [comparisonData, setComparisonData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllStructures()
      .then((data) => setAllStructures(data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedOptions.length > 0) {
      setLoading(true);
      comparePackaging(selectedOptions)
        .then((res) => setComparisonData(res))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [selectedOptions]);

  const handleSelectOption = (index, value) => {
    const updated = [...selectedOptions];
    updated[index] = value;
    setSelectedOptions(updated);
  };

  const handleAddColumn = () => {
    if (selectedOptions.length < 3 && allStructures.length > 0) {
      const unused = allStructures.find(s => !selectedOptions.includes(s.name));
      if (unused) {
        setSelectedOptions([...selectedOptions, unused.name]);
      }
    }
  };

  const handleRemoveColumn = (index) => {
    if (selectedOptions.length > 1) {
      setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
            <Scale className="w-4 h-4 text-sky-600" />
            <span>Packaging Matrix Comparison</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Compare Packaging Options</h2>
          <p className="text-xs text-slate-500">Side-by-side trade-off evaluation for up to 3 packaging structures</p>
        </div>

        {selectedOptions.length < 3 && (
          <button
            onClick={handleAddColumn}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs border border-emerald-200 transition-colors"
          >
            <Plus className="w-4 h-4" /> Add Option
          </button>
        )}
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {selectedOptions.map((optName, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Option {idx + 1}</span>
              {selectedOptions.length > 1 && (
                <button
                  onClick={() => handleRemoveColumn(idx)}
                  className="text-slate-400 hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <select
              value={optName}
              onChange={(e) => handleSelectOption(idx, e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {allStructures.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {loading ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-bold text-slate-700 w-44">Feature / Parameter</th>
                  {comparisonData.map((item, i) => (
                    <th key={i} className="p-4 font-extrabold text-slate-900 border-l border-slate-200">
                      {item.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Packaging Category</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 font-medium text-slate-800 border-l border-slate-200">
                      {item.category}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Materials Used</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 text-slate-800 font-medium border-l border-slate-200">
                      {item.materials}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Thickness Range</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 text-slate-800 border-l border-slate-200">
                      {item.thickness_range}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Barrier Protection</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 font-bold text-emerald-800 border-l border-slate-200">
                      {item.protection}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Estimated Cost</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 font-bold text-slate-900 border-l border-slate-200">
                      {item.estimated_cost}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Sustainability Level</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 font-medium text-slate-800 border-l border-slate-200">
                      {item.sustainability}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Shelf-Life Suitability</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 font-medium text-slate-800 border-l border-slate-200">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> {item.shelf_life_suitability}
                      </span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Transportation Suitability</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 font-medium text-slate-800 border-l border-slate-200">
                      {item.transportation_suitability}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Gas Barrier (OTR)</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 text-slate-600 border-l border-slate-200 font-mono text-[11px]">
                      {item.otr}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-slate-600 bg-slate-50/50">Moisture Barrier (WVTR)</td>
                  {comparisonData.map((item, i) => (
                    <td key={i} className="p-4 text-slate-600 border-l border-slate-200 font-mono text-[11px]">
                      {item.wvtr}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
