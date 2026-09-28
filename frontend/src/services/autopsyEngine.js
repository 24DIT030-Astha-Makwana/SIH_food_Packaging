/**
 * PackTwin AI - Packaging Autopsy & Redesign Engine
 * 
 * Generates comprehensive autopsy report, failure mechanisms, timeline,
 * package DNA, minimum-change candidate redesigns, validation plan, and engineering spec.
 */

import { calculatePackagingRisk } from './riskEngine';

export function runPackagingAutopsy(data) {
  const {
    product = {},
    currentPackage = {},
    failure = {},
    environment = {},
    simulation = {}
  } = data;

  const risks = calculatePackagingRisk(data);

  const prodName = product.name || 'Food Product';
  const category = product.category || 'Chips & Snacks';
  const matName = currentPackage.material || currentPackage.structure || 'PET / PE';
  const symptomText = failure.symptom || failure.description || 'Product becomes soggy';
  const rhVal = environment.humidity !== null ? `${environment.humidity}% RH` : (environment.humidityPreset || 'High humidity');
  const tempVal = environment.temperature !== null ? `${environment.temperature}°C` : (environment.storageTemperature || '30°C');
  const shelfLifeVal = environment.shelfLife ? `${environment.shelfLife} days` : (environment.desiredShelfLife || '60 days');

  // Primary mechanism evidence & pathway
  let primaryMechanism = risks.primaryMechanism;
  let confidence = 'High';
  let evidence = [];
  let pathway = [];

  if (primaryMechanism === 'MOISTURE INGRESS') {
    evidence = [
      `Product (${prodName}) is highly sensitive to moisture uptake and crispness loss.`,
      `Storage environment exhibits high relative humidity (${rhVal}).`,
      `Current package (${matName}) provides only moderate estimated water vapor barrier.`,
      `Failure symptom (${symptomText}) observed before reaching target shelf life (${shelfLifeVal}).`
    ];
    pathway = [
      `High ambient storage humidity (${rhVal}) at ${tempVal}`,
      `Water vapor transmission through film matrix & micro-seal breaches`,
      `Internal package relative humidity & product moisture content increases`,
      `Starch matrix softening & crispness degradation`,
      `Consumer quality failure: ${symptomText} observed`
    ];
  } else if (primaryMechanism === 'OXYGEN OXIDATION') {
    evidence = [
      `Product contains sensitive lipids/essential oils prone to oxidation.`,
      `Storage temperature (${tempVal}) accelerates chemical oxidation reaction rates.`,
      `Current package structure lacks metallized/foil zero-oxygen barrier.`,
      `Failure symptom (${symptomText}) indicates lipid rancidity or color breakdown.`
    ];
    pathway = [
      `Ambient oxygen transmission through non-barrier polymer layers`,
      `Free oxygen reacts with product fat/lipid content at ${tempVal}`,
      `Peroxide value & free fatty acid buildup`,
      `Rancid off-flavor & aroma deterioration`,
      `Consumer failure: ${symptomText}`
    ];
  } else if (primaryMechanism === 'SEAL LEAKAGE') {
    evidence = [
      `Current package seal type (${currentPackage.sealType || 'Heat seal'}) exhibits micro-channel risks.`,
      `Temperature fluctuations (${environment.temperatureFluctuation || 'Medium'}) create package expansion stress.`,
      `Hermetic seal integrity compromised during handling.`
    ];
    pathway = [
      `Mechanical handling stress & thermal expansion`,
      `Micro-channel formation along heat seal band`,
      `Uncontrolled air exchange through micro-leaks`,
      `Accelerated quality degradation`,
      `Package failure`
    ];
  } else {
    evidence = [
      `Transit distance (${environment.transportType || 'Long distance'}) and handling level (${environment.handlingLevel || 'Rough'}) create structural stress.`,
      `Package puncture/burst resistance insufficient for stacking pressure.`
    ];
    pathway = [
      `Vibration & drop impact during transit`,
      `Puncture or flex-crack formation in film`,
      `Atmospheric exposure`,
      `Quality loss`,
      `Physical package damage`
    ];
  }

  // Failure Mechanism Cards
  const mechanisms = [
    {
      id: 'moisture',
      title: '1. Moisture Ingress',
      risk: risks.moistureRisk,
      score: risks.moistureScore,
      whySuspected: `Product is highly hygroscopic and storage relative humidity (${rhVal}) creates a steep moisture vapor gradient.`,
      potentialConsequence: 'Moisture uptake reduces crispness, leads to sogginess, and may cause powder caking.',
      validationTest: 'Water Vapor Transmission Rate (WVTR) evaluation (ASTM F1249) + product equilibrium moisture measurement.'
    },
    {
      id: 'oxygen',
      title: '2. Oxygen Ingress & Lipid Oxidation',
      risk: risks.oxygenRisk,
      score: risks.oxygenScore,
      whySuspected: `Ambient oxygen permeation accelerates fat oxidation and aroma compound breakdown at ${tempVal}.`,
      potentialConsequence: 'Development of rancid off-flavors, loss of fresh aroma, and color discoloration.',
      validationTest: 'Oxygen Transmission Rate (OTR) test (ASTM D3985) + Headspace Gas Analysis.'
    },
    {
      id: 'seal',
      title: '3. Seal Breach & Micro-Leakage',
      risk: risks.sealRisk,
      score: risks.sealScore,
      whySuspected: `Thermal fluctuations and jaw pressure variations can leave micro-channels along seal boundaries.`,
      potentialConsequence: 'Loss of gas flush headspace and rapid ingress of atmospheric air/moisture.',
      validationTest: 'Package Seal Integrity & Burst Test (ASTM F88 / ASTM F2054).'
    },
    {
      id: 'temp',
      title: '4. Thermal Stress',
      risk: risks.temperatureRisk,
      score: risks.tempScore,
      whySuspected: `Elevated storage temperature (${tempVal}) accelerates degradation kinetics according to Q10 reaction rates.`,
      potentialConsequence: 'Shortened shelf-life viability and accelerated chemical breakdown.',
      validationTest: 'Climatic Chamber Accelerated Shelf Life Testing (ASLT).'
    },
    {
      id: 'mech',
      title: '5. Mechanical Transit Damage',
      risk: risks.mechanicalRisk,
      score: risks.mechScore,
      whySuspected: `Handling stress (${environment.handlingLevel || 'Medium'}) during ${environment.transportType || 'Long-distance'} shipping.`,
      potentialConsequence: 'Flex-cracking, pinholes, or pouch rupture during drop/stacking.',
      validationTest: 'Transportation Drop & Vibration Simulation (ASTM D4169 / ISTA 1A).'
    }
  ];

  // Failure Timeline Simulation
  const timeline = [
    { day: 'Day 0', title: 'Fresh Packaging', desc: 'Package produced with initial target headspace & crispness.', status: 'OK' },
    { day: 'Day 5', title: 'No Visible Degradation', desc: 'Package intact, no consumer-perceptible flavor or moisture change.', status: 'OK' },
    { day: 'Day 10', title: 'Early Moisture Equilibrium', desc: 'Micro-permeation elevates package interior humidity equilibrium.', status: 'WARNING' },
    { day: 'Day 20', title: 'Crispness Loss Threshold (Observed Failure)', desc: `${symptomText} becomes consumer-perceptible. Quality drops below standard.`, status: 'FAIL' },
    { day: 'Day 30+', title: 'Target Exceeded', desc: 'Product unusable without package redesign.', status: 'FAIL' }
  ];

  // Package DNA Attributes
  const packageDNA = [
    { label: 'Material Structure', value: matName, status: currentPackage.material ? '✓ USER PROVIDED' : '≈ ESTIMATED' },
    { label: 'Moisture Barrier', value: risks.moistureRisk === 'HIGH' ? 'Low / Moderate' : 'High', status: '≈ ESTIMATED' },
    { label: 'Oxygen Barrier', value: risks.oxygenRisk === 'HIGH' ? 'Moderate' : 'High', status: '≈ ESTIMATED' },
    { label: 'Seal Integrity', value: currentPackage.sealType || 'Heat seal band', status: currentPackage.sealType ? '✓ USER PROVIDED' : '≈ ESTIMATED' },
    { label: 'Mechanical Durability', value: risks.mechanicalRisk === 'HIGH' ? 'Standard Flexible' : 'High Strength', status: '≈ ESTIMATED' },
    { label: 'Temperature Resistance', value: environment.storageType === 'Frozen' ? 'Sub-Zero Safe' : 'Standard Ambient', status: '≈ ESTIMATED' }
  ];

  // Minimum-Change Redesign Candidates
  const minimumChangeRedesigns = [
    {
      candidateId: 'Cand-1',
      title: 'Candidate A — Seal Quality & Jaw Calibration',
      subtitle: 'Minimum change / Lowest implementation friction',
      materials: matName,
      changeRequired: 'Low (Process recalibration only)',
      expectedImpact: 'Medium (Fixes micro-channel leakage)',
      costCategory: 'Low ($)',
      barrierImprovement: 'Eliminates seal pinholes without changing film supplier',
      tradeoffs: 'Does not increase base film polymer barrier property',
      validationNeeded: 'ASTM F88 Seal Strength & Dye Penetration Test'
    },
    {
      candidateId: 'Cand-2',
      title: 'Candidate B — BOPP / Met-PET / PE High-Barrier Laminate Pouch',
      subtitle: 'Recommended Balance / Targeted barrier upgrade',
      materials: 'BOPP (20µm) / Met-PET (12µm) / PE (50µm)',
      changeRequired: 'Medium (Switch sealant layer film specification)',
      expectedImpact: 'High (Blocks 95%+ water vapor & oxygen transmission)',
      costCategory: 'Medium ($$)',
      barrierImprovement: 'Adds metallized barrier layer (< 1.0 g/m²/day WVTR)',
      tradeoffs: 'Slightly higher unit pouch cost (+8-12%)',
      validationNeeded: 'WVTR test (ASTM F1249) + Nitrogen flush trial'
    },
    {
      candidateId: 'Cand-3',
      title: 'Candidate C — Recyclable Mono-Material High-Barrier Pouch (MDO-PE/EVOH-PE)',
      subtitle: 'Maximum Performance & Circular Economy',
      materials: 'MDO-PE (25µm) / EVOH-PE (50µm) / PE (30µm)',
      changeRequired: 'High (New mono-PE polymer supplier qualification)',
      expectedImpact: 'High (Ultra barrier + 100% PE stream recyclable)',
      costCategory: 'High ($$$)',
      barrierImprovement: 'Next-gen mono-material barrier with high puncture resistance',
      tradeoffs: 'Requires narrow heat sealing temperature window',
      validationNeeded: 'Full ASLT climatic chamber study + recyclability certification'
    }
  ];

  // Validation Plan based on budget
  const validationPlan = [
    {
      testName: 'Water Vapor Transmission Rate (WVTR - ASTM F1249)',
      priority: 'HIGH PRIORITY',
      reason: 'Moisture ingress identified as primary suspected failure mechanism.',
      costCategory: 'Low ($)',
      estimatedCost: '₹3,500 – ₹5,000'
    },
    {
      testName: 'Package Heat-Seal Strength & Leakage (ASTM F88 / ASTM F2096)',
      priority: 'HIGH PRIORITY',
      reason: 'Rule out micro-channel seal defects along pouch seams.',
      costCategory: 'Low ($)',
      estimatedCost: '₹2,500 – ₹4,000'
    },
    {
      testName: 'Oxygen Transmission Rate (OTR - ASTM D3985)',
      priority: 'MEDIUM PRIORITY',
      reason: 'Verify oxygen barrier for fat rancidity prevention.',
      costCategory: 'Medium ($$)',
      estimatedCost: '₹5,000 – ₹8,000'
    },
    {
      testName: 'Transport Simulation Drop & Vibration (ASTM D4169 / ISTA 1A)',
      priority: 'RECOMMENDED',
      reason: 'Validate pouch drop strength under long-distance shipping.',
      costCategory: 'Medium ($$)',
      estimatedCost: '₹8,000 – ₹12,000'
    }
  ];

  return {
    primaryMechanism,
    confidence,
    evidence,
    likelyFailurePathway: pathway,
    mechanisms,
    timeline,
    packageDNA,
    minimumChangeRedesigns,
    validationPlan,
    disclaimer: "PackTwin provides decision-support estimates and candidate packaging designs. Results should be validated using appropriate packaging, food-quality, regulatory, and laboratory testing before commercial use."
  };
}
