import React from 'react';
import { BookOpen, Shield, Wind, Droplets, Leaf, HelpCircle, Lightbulb } from 'lucide-react';

export default function LearnPage() {
  const topics = [
    {
      title: "What is Food Packaging?",
      icon: BookOpen,
      desc: "Food packaging is the protective container or wrapper that keeps food safe from contamination, physical damage, and environmental spoilage during transport and storage."
    },
    {
      title: "Why Does Packaging Affect Shelf Life?",
      icon: Shield,
      desc: "Food spoils mainly due to oxygen exposure, moisture gain or loss, light, and microbial growth. High-barrier packaging slows down these degradation reactions, extending freshness."
    },
    {
      title: "What is Oxygen Barrier (OTR)?",
      icon: Wind,
      desc: "Oxygen causes fats to turn rancid, fresh meat to discolor, and spices to lose aroma. An oxygen barrier prevents air molecules from leaking inside the package."
    },
    {
      title: "What is Moisture Barrier (WVTR)?",
      icon: Droplets,
      desc: "Moisture barrier prevents dry foods (like chips and biscuits) from absorbing atmospheric humidity and becoming soggy, while keeping moist foods (like paneer) from drying out."
    },
    {
      title: "What is MAP (Modified Atmosphere Packaging)?",
      icon: Lightbulb,
      desc: "MAP replaces normal air inside a package with a beneficial gas mix (like pure Nitrogen or CO2) to stop bacterial growth without chemical preservatives."
    },
    {
      title: "What is Sustainable Packaging?",
      icon: Leaf,
      desc: "Sustainable packaging minimizes environmental impact by using recyclable mono-materials, bio-based films, or paper-based combinations with lower carbon footprints."
    },
    {
      title: "How to Choose Packaging for Your Food Business?",
      icon: HelpCircle,
      desc: "Start with your product requirements, storage temperature, transit distance, and cost targets. Let PackTwin AI analyze the science so you don't need technical formulas."
    }
  ];

  return (
    <div className="py-8 sm:py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          <span>Knowledge Hub</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">Learn Packaging Science Basics</h1>
        <p className="text-slate-600 text-sm">
          Simple explanations of core packaging concepts without overwhelming academic formulas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {topics.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <IconComp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
