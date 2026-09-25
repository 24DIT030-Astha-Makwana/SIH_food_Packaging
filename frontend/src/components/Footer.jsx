import React from 'react';
import { Package, ShieldCheck, Leaf, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                <Package className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-xl">PackTwin AI</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              “You know your product. We handle the packaging science.” PackTwin AI helps food businesses, farmers, startups, and manufacturers discover optimal packaging options without technical packaging jargon.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Decision-Support AI for Food Businesses</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/recommend" className="hover:text-emerald-400 transition-colors">Get Recommendation</Link></li>
              <li><Link to="/doctor" className="hover:text-emerald-400 transition-colors">Packaging Doctor</Link></li>
              <li><Link to="/compare" className="hover:text-emerald-400 transition-colors">Packaging Comparison</Link></li>
              <li><Link to="/history" className="hover:text-emerald-400 transition-colors">My Recommendations</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Knowledge & Mission</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/learn" className="hover:text-emerald-400 transition-colors">Learn Packaging Basics</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About PackTwin AI</Link></li>
              <li className="text-slate-500 pt-2 text-xs leading-normal">
                Designed to reduce food waste, optimize shelf life, and foster sustainable food delivery.
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} PackTwin AI – Smart Food Packaging Advisor. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with science for non-technical food creators.
          </p>
        </div>
      </div>
    </footer>
  );
}
