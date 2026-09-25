import React, { useState, useEffect } from 'react';
import { History, FileText, ChevronRight, Loader2, Sparkles } from 'lucide-react';
import { fetchRecommendationHistory, downloadReportPdf } from '../api/client';
import { Link } from 'react-router-dom';

export default function MyRecommendationsPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendationHistory()
      .then((data) => setHistory(data))
      .catch((err) => console.error('Error fetching history:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-8 sm:py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <History className="w-4 h-4 text-emerald-600" />
            <span>Analysis Archive</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">My Recommendations</h1>
          <p className="text-xs text-slate-500">History of your generated packaging analyses and report downloads</p>
        </div>

        <Link
          to="/recommend"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-all"
        >
          <Sparkles className="w-4 h-4" /> New Recommendation
        </Link>
      </div>

      {loading ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
        </div>
      ) : history.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-md mx-auto">
          <History className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No Past Recommendations Yet</h3>
          <p className="text-xs text-slate-500">Run your first food packaging analysis to save reports here.</p>
          <Link
            to="/recommend"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow-xs"
          >
            Start First Analysis
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((rec) => (
            <div
              key={rec.id}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg text-slate-900">{rec.product}</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Confidence: {rec.confidence_level}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Recommended: <strong className="text-slate-800">{rec.recommended_packaging?.name}</strong>
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 pt-1">
                  <span>Shelf Life: {rec.input_summary?.["Shelf life"]}</span>
                  <span>• Storage: {rec.input_summary?.Storage}</span>
                  <span>• Priority: {rec.input_summary?.Priority}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <button
                  onClick={() => downloadReportPdf(rec)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" /> PDF Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
