import React, { useState } from 'react';
import { Download, FileText, Loader2, AlertCircle } from 'lucide-react';
import { downloadReportPdf } from '../api/client';

export default function ReportButton({ recommendationData }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!recommendationData) return;
    setDownloading(true);
    try {
      await downloadReportPdf(recommendationData);
    } catch (err) {
      console.error('PDF Download error:', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" /> Recommendation PDF Report
          </h4>
          <p className="text-xs text-slate-500">
            Download formal PDF decision report with technical specs and sustainability options.
          </p>
        </div>

        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all shrink-0"
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
          ) : (
            <Download className="w-4 h-4 text-emerald-400" />
          )}
          {downloading ? 'Generating Report...' : 'Download Report (PDF)'}
        </button>
      </div>

      <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Disclaimer:</strong> This recommendation is a decision-support tool. Final packaging selection should be validated through appropriate product, packaging, safety and regulatory testing.
        </p>
      </div>
    </div>
  );
}
