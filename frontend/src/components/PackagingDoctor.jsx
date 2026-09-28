import React, { useState } from 'react';
import DoctorProgress from './packaging-doctor/DoctorProgress';
import CurrentPackageStep from './packaging-doctor/CurrentPackageStep';
import FailureSymptomStep from './packaging-doctor/FailureSymptomStep';
import EnvironmentStep from './packaging-doctor/EnvironmentStep';
import AutopsyLoader from './packaging-doctor/AutopsyLoader';
import AutopsyReport from './packaging-doctor/AutopsyReport';
import WhatIfSimulator from './packaging-doctor/WhatIfSimulator';
import RedesignPanel from './packaging-doctor/RedesignPanel';
import ValidationPlan from './packaging-doctor/ValidationPlan';
import PackagingSpecification from './packaging-doctor/PackagingSpecification';
import StepForm from './StepForm';
import { runPackagingAutopsy } from '../services/autopsyEngine';
import { Stethoscope, Sparkles, RefreshCw, Sliders, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function PackagingDoctor({ defaultDemo = false }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [loadingAutopsy, setLoadingAutopsy] = useState(false);
  const [autopsyResult, setAutopsyResult] = useState(null);
  const [activeTab, setActiveTab] = useState('autopsy'); // 'autopsy', 'simulator', 'redesign', 'validation', 'spec'

  // Master Doctor Form State
  const [productState, setProductState] = useState({
    category: 'Chips & Snacks',
    name: 'Potato Chips',
    customProduct: '',
    moistureContent: '',
    fatContent: '30.0',
    pH: ''
  });

  const [packageState, setPackageState] = useState({
    photoUrl: null,
    format: 'Pouch',
    material: 'PET / PE',
    structure: 'PET (12µm) / PE (60µm)',
    thickness: '72',
    sealType: 'Heat seal',
    barrierLevel: 'Medium'
  });

  const [failureState, setFailureState] = useState({
    symptom: 'Becomes soggy',
    description: 'Potato chips become soft and lose crispness after around 20 days.',
    firstObserved: '15–30 days'
  });

  const [environmentState, setEnvironmentState] = useState({
    storageType: 'Ambient',
    temperature: 30,
    humidity: 75,
    shelfLife: 60,
    transportType: 'Long distance',
    temperatureFluctuation: 'Low',
    handlingLevel: 'Medium'
  });

  // Execute Demo Scenario
  const handleLoadDemo = () => {
    setProductState({
      category: 'Chips & Snacks',
      name: 'Potato Chips',
      customProduct: '',
      moistureContent: '2.5',
      fatContent: '30.0',
      pH: ''
    });
    setPackageState({
      photoUrl: null,
      format: 'Pouch',
      material: 'PET / PE',
      structure: 'PET (12µm) / PE (60µm)',
      thickness: '72',
      sealType: 'Heat seal',
      barrierLevel: 'Medium'
    });
    setFailureState({
      symptom: 'Becomes soggy',
      description: 'Potato chips become soft and lose crispness after around 20 days.',
      firstObserved: '15–30 days'
    });
    setEnvironmentState({
      storageType: 'Ambient',
      temperature: 30,
      humidity: 75,
      shelfLife: 60,
      transportType: 'Long distance',
      temperatureFluctuation: 'Low',
      handlingLevel: 'Medium'
    });

    const demoInput = {
      product: { category: 'Chips & Snacks', name: 'Potato Chips' },
      currentPackage: { material: 'PET / PE', sealType: 'Heat seal' },
      failure: { symptom: 'Becomes soggy', description: 'Chips become soft after around 20 days.' },
      environment: { storageType: 'Ambient', temperature: 30, humidity: 75, shelfLife: 60, transportType: 'Long distance' }
    };

    setLoadingAutopsy(true);
    setCurrentStep(5);
    setTimeout(() => {
      const res = runPackagingAutopsy(demoInput);
      setAutopsyResult(res);
      setLoadingAutopsy(false);
    }, 600);
  };

  const handleRunAutopsy = () => {
    const doctorInput = {
      product: productState,
      currentPackage: packageState,
      failure: failureState,
      environment: environmentState
    };
    setLoadingAutopsy(true);
    setCurrentStep(5);
    setTimeout(() => {
      const res = runPackagingAutopsy(doctorInput);
      setAutopsyResult(res);
      setLoadingAutopsy(false);
    }, 700);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-6 sm:p-10 rounded-3xl border border-emerald-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
            <Stethoscope className="w-4 h-4 text-emerald-600" />
            <span>AI Packaging Doctor for Food Products</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Packaging Failure Diagnosis & Autopsy</h1>
          <p className="text-slate-600 text-xs sm:text-sm max-w-xl">
            Diagnose why packaging fails, simulate real-world environmental stress, and engineer a better package with minimum necessary change.
          </p>
        </div>

        {/* Demo Button */}
        <button
          onClick={handleLoadDemo}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm transition-all hover:scale-105 shrink-0"
        >
          <Sparkles className="w-4 h-4" /> Try Demo (Potato Chips)
        </button>
      </div>

      {/* Progress Bar */}
      {!autopsyResult && !loadingAutopsy && (
        <DoctorProgress currentStep={currentStep} onStepClick={(s) => setCurrentStep(s)} />
      )}

      {/* STEP 1: Product Selection */}
      {currentStep === 1 && !autopsyResult && !loadingAutopsy && (
        <div className="animate-fadeIn">
          <StepForm
            onSubmit={(payload) => {
              setProductState({
                category: payload.food_category,
                name: payload.product,
                customProduct: payload.custom_product_name,
                moistureContent: payload.moisture_content,
                fatContent: payload.fat_content,
                pH: payload.ph_value
              });
              setCurrentStep(2);
            }}
          />
        </div>
      )}

      {/* STEP 2: Current Package Selection */}
      {currentStep === 2 && !autopsyResult && !loadingAutopsy && (
        <CurrentPackageStep
          packageData={packageState}
          onChange={(field, val) => setPackageState(prev => ({ ...prev, [field]: val }))}
          onNext={() => setCurrentStep(3)}
          onBack={() => setCurrentStep(1)}
        />
      )}

      {/* STEP 3: Failure Symptom Selection */}
      {currentStep === 3 && !autopsyResult && !loadingAutopsy && (
        <FailureSymptomStep
          category={productState.category}
          symptomData={failureState}
          onChange={(field, val) => setFailureState(prev => ({ ...prev, [field]: val }))}
          onNext={() => setCurrentStep(4)}
          onBack={() => setCurrentStep(2)}
        />
      )}

      {/* STEP 4: Environment Selection */}
      {currentStep === 4 && !autopsyResult && !loadingAutopsy && (
        <EnvironmentStep
          envData={environmentState}
          onChange={(field, val) => setEnvironmentState(prev => ({ ...prev, [field]: val }))}
          onNext={handleRunAutopsy}
          onBack={() => setCurrentStep(3)}
        />
      )}

      {/* STEP 5: Autopsy Loader */}
      {loadingAutopsy && (
        <AutopsyLoader onComplete={() => setLoadingAutopsy(false)} />
      )}

      {/* AUTOPSY RESULTS & DASHBOARD */}
      {autopsyResult && !loadingAutopsy && (
        <div className="space-y-8 animate-fadeIn">
          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => {
                setAutopsyResult(null);
                setCurrentStep(1);
              }}
              className="text-xs font-bold text-slate-600 hover:text-emerald-700 bg-slate-100 hover:bg-emerald-50 px-3.5 py-2 rounded-xl transition-colors"
            >
              ← Start New Diagnosis
            </button>

            {/* Dashboard Sub-Tab Navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold">
              <button
                onClick={() => setActiveTab('autopsy')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === 'autopsy' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Autopsy Report
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === 'simulator' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                What-If Simulator
              </button>
              <button
                onClick={() => setActiveTab('redesign')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === 'redesign' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Candidate Redesigns
              </button>
              <button
                onClick={() => setActiveTab('validation')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === 'validation' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Validation Plan
              </button>
              <button
                onClick={() => setActiveTab('spec')}
                className={`px-3.5 py-2 rounded-xl transition-all ${
                  activeTab === 'spec' ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Engineering Spec
              </button>
            </div>
          </div>

          {/* TAB 1: AUTOPSY REPORT */}
          {activeTab === 'autopsy' && (
            <AutopsyReport autopsyData={autopsyResult} />
          )}

          {/* TAB 2: WHAT-IF SIMULATOR */}
          {activeTab === 'simulator' && (
            <WhatIfSimulator
              data={{
                product: productState,
                currentPackage: packageState,
                failure: failureState,
                environment: environmentState
              }}
            />
          )}

          {/* TAB 3: CANDIDATE REDESIGNS */}
          {activeTab === 'redesign' && (
            <RedesignPanel candidates={autopsyResult.minimumChangeRedesigns} />
          )}

          {/* TAB 4: VALIDATION PLAN */}
          {activeTab === 'validation' && (
            <ValidationPlan validationPlan={autopsyResult.validationPlan} />
          )}

          {/* TAB 5: ENGINEERING SPECIFICATION */}
          {activeTab === 'spec' && (
            <PackagingSpecification
              data={{
                product: productState,
                environment: environmentState
              }}
              redesignCandidate={autopsyResult.minimumChangeRedesigns[1]}
            />
          )}
        </div>
      )}
    </div>
  );
}
