import React, { useState, useEffect } from 'react';
import ProgressIndicator from './ProgressIndicator';
import {
  Apple, Carrot, Cookie, Cake, Wheat, Snowflake, Fish, Milk, Box,
  Check, ChevronLeft, ChevronRight, Sparkles, Sun, Flame, Truck,
  Globe, Shield, DollarSign, Leaf, HelpCircle, Info, Search, AlertCircle, RefreshCw
} from 'lucide-react';

export default function StepForm({ onSubmit }) {
  const [currentStep, setCurrentStep] = useState(1);

  // STEP 1 State
  const [foodCategory, setFoodCategory] = useState('');
  const [product, setProduct] = useState('');
  const [customProduct, setCustomProduct] = useState('');

  // STEP 2 Technical & Measurable Parameters State
  // Moisture %
  const [moistureContent, setMoistureContent] = useState('');
  const [moistureUnknown, setMoistureUnknown] = useState(true);

  // Oil / Fat %
  const [fatContent, setFatContent] = useState('');
  const [fatUnknown, setFatUnknown] = useState(true);
  const [fatNotApplicable, setFatNotApplicable] = useState(false);

  // Product pH
  const [phValue, setPhValue] = useState('');
  const [phUnknown, setPhUnknown] = useState(true);
  const [phNotApplicable, setPhNotApplicable] = useState(false);

  // Respiration Rate
  const [respirationLevel, setRespirationLevel] = useState('Medium');
  const [respirationRateVal, setRespirationRateVal] = useState('');
  const [respirationTechnical, setRespirationTechnical] = useState(false);
  const [respirationUnknown, setRespirationUnknown] = useState(false);
  const [respirationNotApplicable, setRespirationNotApplicable] = useState(false);

  // Additional Category Concerns
  const [mainConcern, setMainConcern] = useState('Quality preservation');

  // STEP 3 Shelf Life & Storage State
  const [desiredShelfLife, setDesiredShelfLife] = useState('1–3 months');
  const [customShelfLifeVal, setCustomShelfLifeVal] = useState('');
  const [customShelfLifeUnit, setCustomShelfLifeUnit] = useState('months');

  const [storageType, setStorageType] = useState('Ambient');
  const [storageTemperature, setStorageTemperature] = useState('20–25°C');
  const [customTemp, setCustomTemp] = useState('');
  const [tempFluctuates, setTempFluctuates] = useState(false);

  const [humidityMode, setHumidityMode] = useState('preset'); // 'preset' vs 'exact'
  const [relativeHumidityVal, setRelativeHumidityVal] = useState('');
  const [humidityPreset, setHumidityPreset] = useState('Normal humidity');
  const [humidityUnknown, setHumidityUnknown] = useState(true);

  // STEP 4 Transportation & Handling
  const [transportationType, setTransportationType] = useState('Long-distance / interstate');
  const [transportDuration, setTransportDuration] = useState('1–3 days');
  const [handlingLevel, setHandlingLevel] = useState('Normal handling');
  const [tempControlledTransit, setTempControlledTransit] = useState('Not sure');
  const [priority, setPriority] = useState('Balanced');

  // STEP 5 Problem
  const [problem, setProblem] = useState('No major problem');
  const [customProblem, setCustomProblem] = useState('');

  // Step Titles for Progress Indicator
  const stepTitles = [
    "Food Category",
    "Product Parameters",
    "Shelf Life & Storage",
    "Transportation & Handling",
    "Packaging Problem",
    "Review & Analyze"
  ];

  // Category Cards Data
  const categoriesData = [
    { id: 'Fruits', name: 'Fruits', desc: 'Fresh fruits and minimally processed produce', icon: Apple },
    { id: 'Vegetables', name: 'Vegetables', desc: 'Fresh vegetables and leafy produce', icon: Carrot },
    { id: 'Chips & Snacks', name: 'Chips & Snacks', desc: 'Chips, namkeen, crackers and fried snacks', icon: Cookie },
    { id: 'Bakery Products', name: 'Bakery Products', desc: 'Bread, biscuits, cakes and baked products', icon: Cake },
    { id: 'Spices & Dry Foods', name: 'Spices & Dry Foods', desc: 'Spices, grains, flour, pulses and other dry foods', icon: Wheat },
    { id: 'Frozen Foods', name: 'Frozen Foods', desc: 'Frozen vegetables, snacks, meat and prepared foods', icon: Snowflake },
    { id: 'Meat & Seafood', name: 'Meat & Seafood', desc: 'Fresh, chilled or processed meat and seafood', icon: Fish },
    { id: 'Dairy Products', name: 'Dairy Products', desc: 'Milk, paneer, cheese, yogurt and other dairy products', icon: Milk },
    { id: 'Other', name: 'Other', desc: 'For products not listed above', icon: Box },
  ];

  const categoryProductsMap = {
    'Fruits': ['Mango', 'Apple', 'Banana', 'Orange', 'Grapes', 'Strawberry', 'Other'],
    'Vegetables': ['Tomato', 'Potato', 'Onion', 'Carrot', 'Leafy vegetables', 'Fresh vegetables', 'Other'],
    'Chips & Snacks': ['Potato Chips', 'Banana Chips', 'Namkeen', 'Extruded Snacks', 'Crackers', 'Other'],
    'Bakery Products': ['Bread', 'Biscuits', 'Cake', 'Cookies', 'Pastry', 'Other'],
    'Spices & Dry Foods': ['Turmeric', 'Chilli Powder', 'Cumin', 'Rice', 'Wheat Flour', 'Pulses', 'Other'],
    'Frozen Foods': ['Frozen Peas', 'Frozen Vegetables', 'Frozen Snacks', 'Frozen Fries', 'Ready-to-eat Frozen Food', 'Other'],
    'Meat & Seafood': ['Chicken', 'Fish', 'Mutton', 'Processed Meat', 'Seafood', 'Other'],
    'Dairy Products': ['Milk', 'Paneer', 'Cheese', 'Yogurt', 'Butter', 'Other'],
    'Other': ['Custom Food Item']
  };

  const currentProductOptions = categoryProductsMap[foodCategory] || ['General Product', 'Other'];

  // Handle category selection defaults
  const handleCategorySelect = (catId) => {
    setFoodCategory(catId);
    const defaultProd = categoryProductsMap[catId] ? categoryProductsMap[catId][0] : 'Other';
    setProduct(defaultProd);

    // Apply smart default parameter relevancies per category
    if (catId === 'Fruits' || catId === 'Vegetables') {
      setFatNotApplicable(true);
      setPhNotApplicable(true);
      setRespirationNotApplicable(false);
    } else if (catId === 'Chips & Snacks') {
      setFatNotApplicable(false);
      setPhNotApplicable(true);
      setRespirationNotApplicable(true);
    } else if (catId === 'Bakery Products' || catId === 'Spices & Dry Foods') {
      setFatNotApplicable(false);
      setPhNotApplicable(true);
      setRespirationNotApplicable(true);
    } else if (catId === 'Meat & Seafood' || catId === 'Dairy Products') {
      setFatNotApplicable(false);
      setPhNotApplicable(false);
      setRespirationNotApplicable(true);
    } else if (catId === 'Frozen Foods') {
      setFatNotApplicable(false);
      setPhNotApplicable(true);
      setRespirationNotApplicable(true);
    } else {
      setFatNotApplicable(false);
      setPhNotApplicable(false);
      setRespirationNotApplicable(false);
    }
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const handleFinalSubmit = () => {
    const finalProd = product === 'Other' || foodCategory === 'Other' ? (customProduct || 'Custom Item') : product;

    let finalShelfLifeStr = desiredShelfLife;
    if (desiredShelfLife === 'Custom') {
      finalShelfLifeStr = customShelfLifeVal ? `${customShelfLifeVal} ${customShelfLifeUnit}` : 'Custom duration';
    }

    let finalTempStr = storageTemperature;
    if (storageTemperature === 'Custom') {
      finalTempStr = customTemp ? `${customTemp}°C` : 'Custom Temperature';
    }
    if (tempFluctuates) {
      finalTempStr += ' (May fluctuate)';
    }

    let finalHumidityStr = humidityPreset;
    if (!humidityUnknown && relativeHumidityVal !== '') {
      finalHumidityStr = `${relativeHumidityVal}% RH`;
    }

    const payload = {
      product: finalProd,
      custom_product_name: customProduct || null,
      food_category: foodCategory,
      desired_shelf_life: finalShelfLifeStr,
      shelf_life: finalShelfLifeStr,
      storage_type: storageType,
      storage: storageType.includes('Chilled') ? 'Refrigerated' : storageType.includes('Frozen') ? 'Frozen' : 'Room temperature',
      storage_temperature: finalTempStr,
      relative_humidity: finalHumidityStr,
      transportation: transportationType,
      handling_level: handlingLevel,
      priority: priority,
      problem: problem === 'Other' ? customProblem : problem,
      moisture_content: (!moistureUnknown && moistureContent !== '') ? parseFloat(moistureContent) : null,
      moisture_known: !moistureUnknown && moistureContent !== '',
      fat_content: (!fatNotApplicable && !fatUnknown && fatContent !== '') ? parseFloat(fatContent) : null,
      fat_known: !fatNotApplicable && !fatUnknown && fatContent !== '',
      fat_applicable: !fatNotApplicable,
      ph_value: (!phNotApplicable && !phUnknown && phValue !== '') ? parseFloat(phValue) : null,
      ph_known: !phNotApplicable && !phUnknown && phValue !== '',
      ph_applicable: !phNotApplicable,
      respiration_rate_val: (!respirationNotApplicable && respirationTechnical && respirationRateVal !== '') ? parseFloat(respirationRateVal) : null,
      respiration_known: !respirationNotApplicable && respirationTechnical && respirationRateVal !== '',
      respiration_applicable: !respirationNotApplicable,
      category_details: {
        main_concern: mainConcern,
        respiration_level: respirationLevel
      }
    };

    onSubmit(payload);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-md">
      <ProgressIndicator currentStep={currentStep} totalSteps={6} stepTitles={stepTitles} />

      {/* ================================================== */}
      {/* STEP 1 — FOOD CATEGORY SELECTION */}
      {/* ================================================== */}
      {currentStep === 1 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">What type of food are you packaging?</h2>
            <p className="text-slate-600 text-sm">Select a food category to get packaging requirements specific to your product.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {categoriesData.map((cat) => {
              const IconComp = cat.icon;
              const isSelected = foodCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/90 shadow-sm ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-emerald-600" />}
                  </div>

                  <div className="space-y-1">
                    <span className={`block font-bold text-base ${isSelected ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {cat.name}
                    </span>
                    <span className="block text-xs text-slate-500 leading-relaxed">
                      {cat.desc}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* STEP 2 — PRODUCT PARAMETERS (MEASURABLE FORMAT) */}
      {/* ================================================== */}
      {currentStep === 2 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Tell us about your product parameters</h2>
            <p className="text-slate-600 text-sm">Enter measurable values if available. Eco-PackAI will estimate any unknown information from our food database.</p>
          </div>

          {/* Specific Product Selection */}
          <div className="space-y-2 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              What specific product are you packaging?
            </label>
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {currentProductOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>

            {(product === 'Other' || foodCategory === 'Other') && (
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Enter specific product name..."
                  value={customProduct}
                  onChange={(e) => setCustomProduct(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* DYNAMIC TECHNICAL PARAMETERS (Moisture, Oil/Fat, pH, Respiration) */}
          <div className="space-y-6 pt-2">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" /> Technical Product Parameters ({foodCategory})
            </h3>

            {/* 1. MOISTURE CONTENT (%) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="font-bold text-slate-900 text-sm">Moisture Content (%)</label>
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={moistureUnknown}
                    onChange={(e) => setMoistureUnknown(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>☐ I don't know</span>
                </label>
              </div>

              {!moistureUnknown && (
                <div className="flex items-center gap-2 max-w-xs">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    placeholder="e.g. 2.5"
                    value={moistureContent}
                    onChange={(e) => setMoistureContent(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-700">%</span>
                </div>
              )}

              <p className="text-[11px] text-slate-500 leading-relaxed">
                Enter the approximate moisture percentage if known. You can usually find this in product specifications or lab reports.
              </p>
            </div>

            {/* 2. OIL / FAT CONTENT (%) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="font-bold text-slate-900 text-sm">Oil / Fat Content (%)</label>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fatUnknown}
                      disabled={fatNotApplicable}
                      onChange={(e) => setFatUnknown(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>☐ I don't know</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fatNotApplicable}
                      onChange={(e) => setFatNotApplicable(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-600"
                    />
                    <span>☐ Not applicable</span>
                  </label>
                </div>
              </div>

              {!fatNotApplicable && !fatUnknown && (
                <div className="flex items-center gap-2 max-w-xs">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    placeholder="e.g. 30.0"
                    value={fatContent}
                    onChange={(e) => setFatContent(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-sm font-bold text-slate-700">%</span>
                </div>
              )}

              <p className="text-[11px] text-slate-500 leading-relaxed">
                If available, enter the fat percentage shown on your product label. Used as a proxy to determine rancidity & oxygen barrier requirements.
              </p>
            </div>

            {/* 3. PRODUCT pH */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="font-bold text-slate-900 text-sm">Product pH (Acidity / Alkalinity)</label>
                <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={phUnknown}
                      disabled={phNotApplicable}
                      onChange={(e) => setPhUnknown(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>☐ I don't know</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={phNotApplicable}
                      onChange={(e) => setPhNotApplicable(e.target.checked)}
                      className="w-4 h-4 rounded text-slate-600"
                    />
                    <span>☐ Not applicable</span>
                  </label>
                </div>
              </div>

              {!phNotApplicable && !phUnknown && (
                <div className="flex items-center gap-2 max-w-xs">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    placeholder="e.g. 6.5"
                    value={phValue}
                    onChange={(e) => setPhValue(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  <span className="text-xs text-slate-500">(0 – 14)</span>
                </div>
              )}

              <p className="text-[11px] text-slate-500 leading-relaxed">
                pH indicates how acidic or alkaline the food is. Particularly relevant for dairy, meat/seafood, sauces, and fresh produce.
              </p>
            </div>

            {/* 4. RESPIRATION RATE (Only shown if applicable for produce) */}
            {!respirationNotApplicable ? (
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-900 text-sm">Respiration Rate</label>
                  <button
                    type="button"
                    onClick={() => setRespirationTechnical(!respirationTechnical)}
                    className="text-xs text-emerald-700 hover:underline font-semibold"
                  >
                    {respirationTechnical ? 'Switch to simple choices' : 'Enter technical lab value (mg CO₂/kg·h)'}
                  </button>
                </div>

                {!respirationTechnical ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    {['Low', 'Medium', 'High', 'I don\'t know'].map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setRespirationLevel(lvl)}
                        className={`p-2.5 rounded-xl border font-semibold text-center transition-all ${
                          respirationLevel === lvl ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 max-w-sm">
                    <input
                      type="number"
                      placeholder="e.g. 45"
                      value={respirationRateVal}
                      onChange={(e) => setRespirationRateVal(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                    <span className="text-xs font-semibold text-slate-600">mg CO₂/kg·h</span>
                  </div>
                )}

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Fresh fruits and vegetables continue to breathe after harvesting, affecting package gas permeability requirements.
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-100 text-slate-500 text-xs flex items-center gap-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Respiration Rate: <strong>Not applicable</strong> for non-respiring processed/dry goods.</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* STEP 3 — SHELF LIFE & STORAGE CONDITIONS */}
      {/* ================================================== */}
      {currentStep === 3 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Shelf Life & Storage Conditions</h2>
            <p className="text-slate-600 text-sm">Specify target freshness duration and storage temperature/humidity environment.</p>
          </div>

          {/* Desired Shelf Life */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              How long should your product remain suitable for use?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {[
                'Less than 7 days',
                '7–30 days',
                '1–3 months',
                '3–6 months',
                '6–12 months',
                'More than 1 year',
                'Custom'
              ].map((opt) => {
                const selected = desiredShelfLife === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setDesiredShelfLife(opt)}
                    className={`p-3 rounded-xl border font-semibold transition-all text-left flex items-center justify-between ${
                      selected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                    }`}
                  >
                    <span>{opt}</span>
                    {selected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {desiredShelfLife === 'Custom' && (
              <div className="flex items-center gap-3 pt-1">
                <input
                  type="number"
                  placeholder="e.g. 90"
                  value={customShelfLifeVal}
                  onChange={(e) => setCustomShelfLifeVal(e.target.value)}
                  className="w-36 p-2.5 rounded-xl border border-slate-300 text-sm bg-white font-semibold"
                />
                <select
                  value={customShelfLifeUnit}
                  onChange={(e) => setCustomShelfLifeUnit(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-300 text-sm bg-white font-semibold"
                >
                  <option value="days">Days</option>
                  <option value="weeks">Weeks</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            )}
          </div>

          {/* Storage Type */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              How will the product be stored?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Ambient', title: 'Ambient', desc: 'Room/normal temperature storage' },
                { label: 'Chilled', title: 'Chilled', desc: 'Refrigerated cold storage' },
                { label: 'Frozen', title: 'Frozen', desc: 'Sub-zero frozen storage' }
              ].map((item) => {
                const selected = storageType === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setStorageType(item.label);
                      if (item.label === 'Chilled') setStorageTemperature('0–4°C');
                      else if (item.label === 'Frozen') setStorageTemperature('-18°C or below');
                      else setStorageTemperature('20–25°C');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                      selected
                        ? 'border-emerald-600 bg-emerald-50/90 shadow-xs ring-1 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-base ${selected ? 'text-emerald-950' : 'text-slate-900'}`}>{item.title}</span>
                      {selected && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <span className="text-[11px] text-slate-500">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Storage Temperature Options */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Typical Storage Temperature
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {storageType === 'Ambient' && [
                '20–25°C', '25–30°C', 'Above 30°C', 'Custom'
              ].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setStorageTemperature(t)}
                  className={`p-3 rounded-xl border font-semibold text-left transition-all ${
                    storageTemperature === t ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white'
                  }`}
                >
                  {t}
                </button>
              ))}

              {storageType === 'Chilled' && [
                '0–4°C', '4–8°C', 'Custom'
              ].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setStorageTemperature(t)}
                  className={`p-3 rounded-xl border font-semibold text-left transition-all ${
                    storageTemperature === t ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white'
                  }`}
                >
                  {t}
                </button>
              ))}

              {storageType === 'Frozen' && [
                '-18°C or below', '-10°C to -18°C', 'Custom'
              ].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setStorageTemperature(t)}
                  className={`p-3 rounded-xl border font-semibold text-left transition-all ${
                    storageTemperature === t ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {storageTemperature === 'Custom' && (
              <div className="flex items-center gap-2 pt-1 max-w-xs">
                <input
                  type="number"
                  placeholder="e.g. 22"
                  value={customTemp}
                  onChange={(e) => setCustomTemp(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                />
                <span className="text-sm font-semibold text-slate-600">°C</span>
              </div>
            )}

            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={tempFluctuates}
                onChange={(e) => setTempFluctuates(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>☐ Temperature may fluctuate during storage</span>
            </label>
          </div>

          {/* Storage Relative Humidity */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Storage Relative Humidity
              </label>
              <button
                type="button"
                onClick={() => setHumidityMode(humidityMode === 'preset' ? 'exact' : 'preset')}
                className="text-xs text-emerald-700 hover:underline font-semibold"
              >
                {humidityMode === 'exact' ? 'Switch to estimated options' : 'Enter exact RH % value'}
              </button>
            </div>

            {humidityMode === 'exact' ? (
              <div className="flex items-center gap-2 max-w-xs">
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 65"
                  value={relativeHumidityVal}
                  onChange={(e) => {
                    setRelativeHumidityVal(e.target.value);
                    setHumidityUnknown(false);
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
                />
                <span className="text-sm font-bold text-slate-700">% RH</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                {[
                  'Low humidity',
                  'Normal humidity',
                  'High humidity',
                  'Very humid / tropical conditions',
                  'I don\'t know'
                ].map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => {
                      setHumidityPreset(h);
                      setHumidityUnknown(h === 'I don\'t know');
                    }}
                    className={`p-3 rounded-xl border font-semibold text-left transition-all ${
                      humidityPreset === h ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* STEP 4 — TRANSPORTATION & ENVIRONMENT */}
      {/* ================================================== */}
      {currentStep === 4 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Transportation & Handling</h2>
            <p className="text-slate-600 text-sm">Logistics duration and handling severity influence required film thickness and seal strength.</p>
          </div>

          {/* Mode */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              How will the product be transported?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                'Local delivery',
                'Within the state',
                'Long-distance / interstate',
                'Export / international',
                'Cold-chain transportation',
                'Not sure'
              ].map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTransportationType(t)}
                  className={`p-3.5 rounded-xl border text-left font-bold transition-all ${
                    transportationType === t ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Transit Duration */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Expected Transportation Duration
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {['Less than 1 day', '1–3 days', '3–7 days', 'More than 7 days'].map(d => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setTransportDuration(d)}
                  className={`p-3 rounded-xl border font-semibold text-left transition-all ${
                    transportDuration === d ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Handling Intensity */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Handling / Package Stress Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {['Normal handling', 'Rough handling', 'High vibration/impact', 'Not sure'].map(h => (
                <button
                  key={h}
                  type="button"
                  onClick={() => setHandlingLevel(h)}
                  className={`p-3 rounded-xl border font-semibold text-left transition-all ${
                    handlingLevel === h ? 'border-emerald-600 bg-emerald-50 text-emerald-950' : 'border-slate-200 bg-white'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Main Business Priority
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { label: 'Lowest cost', desc: 'Minimize unit packaging cost' },
                { label: 'Maximum shelf life', desc: 'Maximum barrier & freshness retention' },
                { label: 'Eco-friendly packaging', desc: 'Recyclable mono-PE or paper-based eco film' },
                { label: 'Balanced', desc: 'Practical combination of cost, protection & sustainability' }
              ].map(p => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPriority(p.label)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    priority === p.label ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold' : 'border-slate-200 bg-white font-medium'
                  }`}
                >
                  <span className="block text-sm">{p.label}</span>
                  <span className="text-[11px] text-slate-500">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* STEP 5 — CURRENT PACKAGING / PROBLEM */}
      {/* ================================================== */}
      {currentStep === 5 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">Current Packaging & Quality Issues</h2>
              <button
                type="button"
                onClick={() => { setProblem('No major problem'); handleNext(); }}
                className="text-xs text-slate-500 hover:text-emerald-700 underline font-medium"
              >
                Skip this step
              </button>
            </div>
            <p className="text-slate-600 text-sm">Tell us if anything is currently going wrong with your packaging.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
                  className={`p-3.5 rounded-xl border text-left font-semibold transition-all flex items-center justify-between ${
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

          {problem === 'Other' && (
            <input
              type="text"
              placeholder="Describe your current packaging problem..."
              value={customProblem}
              onChange={(e) => setCustomProblem(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          )}
        </div>
      )}

      {/* ================================================== */}
      {/* STEP 6 — REVIEW & ANALYZE (PROVENANCE DISTINCTION) */}
      {/* ================================================== */}
      {currentStep === 6 && (
        <div className="space-y-6 animate-fadeIn">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Review Product Analysis Request</h2>
            <p className="text-slate-600 text-sm">Verify measured user values vs Eco-PackAI estimated parameters before running AI analysis.</p>
          </div>

          {/* Provenance Distinction Grid */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium uppercase text-[10px]">Category & Product</span>
                <span className="font-bold text-slate-900">{foodCategory} — {product === 'Other' ? customProduct : product}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium uppercase text-[10px]">Target Shelf Life</span>
                <span className="font-bold text-slate-900">{desiredShelfLife === 'Custom' ? `${customShelfLifeVal} ${customShelfLifeUnit}` : desiredShelfLife}</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium uppercase text-[10px]">Storage Condition</span>
                <span className="font-bold text-slate-900">{storageType} ({storageTemperature === 'Custom' ? `${customTemp}°C` : storageTemperature})</span>
              </div>

              {/* Moisture Provenance */}
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium uppercase text-[10px]">Moisture Content</span>
                {!moistureUnknown && moistureContent !== '' ? (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    ✓ User Provided ({moistureContent}%)
                  </span>
                ) : (
                  <span className="font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    ≈ Eco-PackAI Estimated
                  </span>
                )}
              </div>

              {/* Fat Provenance */}
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium uppercase text-[10px]">Oil / Fat Content</span>
                {fatNotApplicable ? (
                  <span className="font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    — Not Applicable
                  </span>
                ) : !fatUnknown && fatContent !== '' ? (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    ✓ User Provided ({fatContent}%)
                  </span>
                ) : (
                  <span className="font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    ≈ Eco-PackAI Estimated
                  </span>
                )}
              </div>

              {/* pH Provenance */}
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium uppercase text-[10px]">Product pH</span>
                {phNotApplicable ? (
                  <span className="font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    — Not Applicable
                  </span>
                ) : !phUnknown && phValue !== '' ? (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    ✓ User Provided ({phValue})
                  </span>
                ) : (
                  <span className="font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    ≈ Eco-PackAI Estimated
                  </span>
                )}
              </div>

              {/* Respiration Provenance */}
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium uppercase text-[10px]">Respiration Rate</span>
                {respirationNotApplicable ? (
                  <span className="font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    — Not Applicable
                  </span>
                ) : respirationTechnical && respirationRateVal !== '' ? (
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    ✓ User Provided ({respirationRateVal} mg CO₂/kg·h)
                  </span>
                ) : (
                  <span className="font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded text-[11px] inline-block mt-0.5">
                    ≈ Eco-PackAI Derived ({respirationLevel})
                  </span>
                )}
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block font-medium uppercase text-[10px]">Transit & Handling</span>
                <span className="font-bold text-slate-900">{transportationType} • {handlingLevel}</span>
              </div>
            </div>
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
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        ) : (
          <div />
        )}

        {currentStep < 6 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={currentStep === 1 && !foodCategory}
            className={`inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              currentStep === 1 && !foodCategory
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
            }`}
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinalSubmit}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-sky-600 hover:from-emerald-700 hover:to-sky-700 text-white text-base font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
          >
            <Sparkles className="w-5 h-5" />
            Analyze Packaging Requirements →
          </button>
        )}
      </div>
    </div>
  );
}
