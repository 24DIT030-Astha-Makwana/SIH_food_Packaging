import React, { useState } from 'react';
import RecommendationCard from '../components/RecommendationCard';
import OptionCard from '../components/OptionCard';
import TechnicalDetailsModal from '../components/TechnicalDetailsModal';
import SustainabilityCard from '../components/SustainabilityCard';
import PackagingGenomeView from '../components/PackagingGenomeView';
import FoodDigitalTwinView from '../components/FoodDigitalTwinView';
import WhatIfSimulator from '../components/WhatIfSimulator';
import ReportButton from '../components/ReportButton';
import { RefreshCw, ArrowLeft } from 'lucide-react';

export default function RecommendationResultPage({ recommendation, originalInput, onReset }) {
  const [currentRec, setCurrentRec] = useState(recommendation);
  const [selectedTechnicalOption, setSelectedTechnicalOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!currentRec) return null;

  const handleOpenTechnical = (option = null) => {
    setSelectedTechnicalOption(option || currentRec.recommended_packaging);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-12 animate-fadeIn">
      {/* Back / Reset Top Banner */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-white hover:bg-emerald-50 px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Analyze Another Product
        </button>
      </div>

      {/* Main Hero Recommendation Card */}
      <RecommendationCard
        recommendation={currentRec}
        onOpenTechnical={() => handleOpenTechnical(currentRec.recommended_packaging)}
      />

      {/* 3 Options Grid (Budget, Recommended, Premium) */}
      <OptionCard
        options={currentRec.options}
        onSelectTechnical={(opt) => handleOpenTechnical(opt)}
      />

      {/* Sustainable Alternative */}
      <SustainabilityCard sustainableData={currentRec.sustainable_alternative} />

      {/* What-If Simulator */}
      <WhatIfSimulator
        originalInput={originalInput}
        onUpdateRecommendation={(updated) => setCurrentRec(updated)}
      />

      {/* Packaging Genome & Food Digital Twin Side-by-side or stacked */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PackagingGenomeView genome={currentRec.packaging_genome} />
        <FoodDigitalTwinView twin={currentRec.food_digital_twin} />
      </div>

      {/* Report Download */}
      <ReportButton recommendationData={currentRec} />

      {/* Technical Details Modal */}
      <TechnicalDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        optionData={selectedTechnicalOption}
      />
    </div>
  );
}
