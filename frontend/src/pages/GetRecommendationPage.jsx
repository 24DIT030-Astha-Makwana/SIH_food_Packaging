import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepForm from '../components/StepForm';
import LoadingAnimation from '../components/LoadingAnimation';
import RecommendationResultPage from './RecommendationResultPage';
import { createRecommendation } from '../api/client';

export default function GetRecommendationPage() {
  const [loading, setLoading] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState(null);
  const [lastPayload, setLastPayload] = useState(null);

  const handleFormSubmit = async (payload) => {
    setLastPayload(payload);
    setLoading(true);
    try {
      const res = await createRecommendation(payload);
      setRecommendationResult(res);
    } catch (err) {
      console.error('Failed to submit recommendation request:', err);
      setLoading(false);
    }
  };

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="py-12 px-4 max-w-7xl mx-auto">
        <LoadingAnimation onComplete={handleLoadingComplete} />
      </div>
    );
  }

  if (recommendationResult) {
    return (
      <div className="py-8 px-4 max-w-7xl mx-auto">
        <RecommendationResultPage
          recommendation={recommendationResult}
          originalInput={lastPayload}
          onReset={() => {
            setRecommendationResult(null);
            setLastPayload(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 px-4 max-w-7xl mx-auto space-y-6">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900">Get Packaging Recommendation</h1>
        <p className="text-slate-600 text-sm">
          Answer 6 simple business questions. Our recommendation engine will handle the packaging science.
        </p>
      </div>

      <StepForm onSubmit={handleFormSubmit} />
    </div>
  );
}
