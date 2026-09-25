import React, { useState, useEffect } from 'react';
import ProgressIndicator from './ProgressIndicator';
import { Search, ChevronRight, ChevronLeft, Sparkles, Sun, Snowflake, Flame, Truck, Globe, Shield, DollarSign, Clock, Leaf, AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { fetchProducts } from '../api/client';

export default function StepForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [productsList, setProductsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form State
  const [product, setProduct] = useState('Potato chips');
  const [customProduct, setCustomProduct] = useState('');
  const [shelfLife, setShelfLife] = useState('1–3 months');
  const [storage, setStorage] = useState('Room temperature');
  const [transportation, setTransportation] = useState('Long distance');
  const [priority, setPriority] = useState('Balanced');
  const [problem, setProblem] = useState('No major problem');

  useEffect(() => {
    fetchProducts()
      .then((data) => setProductsList(data))
      .catch((err) => console.error('Error loading products list:', err));
  }, []);

  const defaultPresets = [
    'Mango', 'Apple', 'Tomato', 'Potato', 'Onion', 'Fresh vegetables',
    'Potato chips', 'Biscuits', 'Rice', 'Wheat', 'Spices',
    'Milk', 'Paneer', 'Meat', 'Frozen food', 'Other'
  ];

  const filteredProducts = defaultPresets.filter(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

  const stepTitles = [
    "What are you packaging?",
    "How long should it last?",
    "Where will it be stored?",
    "How will it be transported?",
    "What matters most?",
    "Are you facing a problem?"
  ];

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    const payload = {
      product,
      custom_product_name: product === 'Other' ? customProduct : null,
      shelf_life: shelfLife,
      storage,
      transportation,
      priority,
      problem: problem || 'No major problem'
    };
    onSubmit(payload);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-md">
      <ProgressIndicator currentStep={currentStep} totalSteps={6} stepTitles={stepTitles} />

      {/* STEP 1: Product Selection */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">What food product are you packaging?</h2>
            <p className="text-slate-600 text-sm">Select your food product from the list or choose 'Other' to type custom name.</p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search product (e.g. Mango, Chips, Paneer...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
            />
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-1">
            {filteredProducts.map((p) => {
              const selected = product === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProduct(p)}
                  className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${
                    selected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white hover:bg-slate-50'
                  }`}
                >
                  <span>{p}</span>
                  {selected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {product === 'Other' && (
            <div className="pt-2 space-y-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Enter your product name
              </label>
              <input
                type="text"
                placeholder="e.g. Organic Dried Figs, Protein Bars, Artisan Cheese..."
                value={customProduct}
                onChange={(e) => setCustomProduct(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm"
              />
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Shelf Life */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">How long should your product stay fresh?</h2>
            <p className="text-slate-600 text-sm">Select the target shelf-life duration for your business.</p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Less than 1 week', desc: 'Highly perishable fresh items (e.g. ripe strawberries, cut leafy greens)' },
              { label: '1–4 weeks', desc: 'Short-duration refrigerated or fresh produce (e.g. tomatoes, paneer, milk)' },
              { label: '1–3 months', desc: 'Standard medium shelf-life goods (e.g. apples, fresh bakery)' },
              { label: '3–6 months', desc: 'Extended shelf-life items (e.g. potato chips, packaged biscuits, spices)' },
              { label: 'More than 6 months', desc: 'Long-term pantry storage or export items (e.g. rice, wheat, dried grains)' }
            ].map((option) => {
              const selected = shelfLife === option.label;
              return (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setShelfLife(option.label)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${
                    selected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <span className={`block font-semibold text-base ${selected ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {option.label}
                    </span>
                    <span className="block text-xs text-slate-500">{option.desc}</span>
                  </div>
                  {selected && <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-4" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 3: Storage Condition */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">How will your product be stored?</h2>
            <p className="text-slate-600 text-sm">Select the primary storage temperature condition.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Room temperature', icon: Sun, color: 'amber', desc: 'Ambient warehouse / store shelf (15°C – 30°C)' },
              { label: 'Refrigerated', icon: Snowflake, color: 'sky', desc: 'Chilled cold chain display (2°C – 8°C)' },
              { label: 'Frozen', icon: Flame, color: 'indigo', desc: 'Deep freezer storage (-18°C or lower)' }
            ].map((item) => {
              const IconComponent = item.icon;
              const selected = storage === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setStorage(item.label)}
                  className={`p-6 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-3 ${
                    selected
                      ? 'border-emerald-600 bg-emerald-50/90 shadow-sm ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className={`font-bold text-base ${selected ? 'text-emerald-950' : 'text-slate-900'}`}>
                    {item.label}
                  </span>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 4: Transportation */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">How far does your product usually travel?</h2>
            <p className="text-slate-600 text-sm">Mechanical strength requirement adapts based on transit distance.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Local / nearby', icon: Truck, desc: 'City distribution, local retail delivery' },
              { label: 'Within the state', icon: Truck, desc: 'Regional transit within 200–500 km' },
              { label: 'Long distance', icon: Truck, desc: 'National distribution across state borders' },
              { label: 'Export', icon: Globe, desc: 'Overseas maritime or air cargo export' }
            ].map((item) => {
              const IconComponent = item.icon;
              const selected = transportation === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setTransportation(item.label)}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-center gap-4 ${
                    selected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`block font-semibold text-base ${selected ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {item.label}
                    </span>
                    <span className="block text-xs text-slate-500">{item.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 5: Main Priority */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">What is your main priority?</h2>
            <p className="text-slate-600 text-sm">We weight our recommendation engine to match your core business goal.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Lowest cost', icon: DollarSign, desc: 'Prioritize minimal unit cost and standard barrier materials' },
              { label: 'Maximum shelf life', icon: Shield, desc: 'Prioritize maximum oxygen & moisture protection' },
              { label: 'Eco-friendly packaging', icon: Leaf, desc: 'Prioritize recyclable, mono-material, or bio-based packaging' },
              { label: 'Balanced', icon: Sparkles, desc: 'Practical combination of cost, protection and sustainability' }
            ].map((item) => {
              const IconComponent = item.icon;
              const selected = priority === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPriority(item.label)}
                  className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                    selected
                      ? 'border-emerald-600 bg-emerald-50/80 shadow-xs ring-1 ring-emerald-500/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <span className={`block font-semibold text-base ${selected ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {item.label}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1">{item.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-800">Note: </span>
            Balanced = a practical combination of cost, protection and sustainability.
          </div>
        </div>
      )}

      {/* STEP 6: Packaging Problem */}
      {currentStep === 6 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Is there anything going wrong with your current packaging?</h2>
              <button
                type="button"
                onClick={() => { setProblem('No major problem'); handleSubmit(); }}
                className="text-xs text-slate-500 hover:text-emerald-700 underline font-medium"
              >
                Skip this step
              </button>
            </div>
            <p className="text-slate-600 text-sm">Optional. Select any quality issue you are currently experiencing.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Product becomes soggy',
              'Product loses freshness',
              'Product changes color',
              'Product develops bad smell',
              'Product gets damaged',
              'Shelf life is too short',
              'No major problem',
              'Other'
            ].map((pOpt) => {
              const selected = problem === pOpt;
              return (
                <button
                  key={pOpt}
                  type="button"
                  onClick={() => setProblem(pOpt)}
                  className={`p-3.5 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between ${
                    selected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <span>{pOpt}</span>
                  {selected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {currentStep < 6 ? (
          <button
            type="button"
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-sm transition-all"
          >
            Next Step
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white text-base font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5" />
            Analyze My Product
          </button>
        )}
      </div>
    </div>
  );
}
