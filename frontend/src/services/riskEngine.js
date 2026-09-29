/**
 * Eco-PackAI - Risk Engine (Services)
 * 
 * Transparent rule-based engineering risk engine.
 * Calculates dynamic risk levels for Moisture Ingress, Oxygen Ingress, Seal Leakage,
 * Temperature Stress, and Mechanical Damage based on product properties, package attributes,
 * failure symptoms, and storage/transport environment parameters.
 */

export function calculatePackagingRisk(input) {
  const {
    product = {},
    currentPackage = {},
    failure = {},
    environment = {},
    simulation = {}
  } = input || {};

  // Extract storage & simulation parameters
  const temp = simulation.temperature !== undefined && simulation.temperature !== null
    ? Number(simulation.temperature)
    : (environment.temperature !== null ? Number(environment.temperature) : 25);

  const rh = simulation.humidity !== undefined && simulation.humidity !== null
    ? Number(simulation.humidity)
    : (environment.humidity !== null ? Number(environment.humidity) : 60);

  const shelfLife = simulation.shelfLife !== undefined && simulation.shelfLife !== null
    ? Number(simulation.shelfLife)
    : (environment.shelfLife ? Number(environment.shelfLife) : 60);

  const transportDuration = simulation.transportDuration !== undefined && simulation.transportDuration !== null
    ? Number(simulation.transportDuration)
    : (environment.transportDuration ? Number(environment.transportDuration) : 3);

  const tempFluctuation = simulation.temperatureFluctuation || environment.temperatureFluctuation || 'Low';

  const barrierLevel = simulation.packagingBarrier || currentPackage.barrierLevel || 'Medium';

  // Symptom matching
  const symptomLower = (failure.symptom || failure.description || '').toLowerCase();
  const prodNameLower = (product.name || '').toLowerCase();
  const catLower = (product.category || '').toLowerCase();

  // 1. MOISTURE RISK CALCULATION
  let moistureScore = 40; // baseline

  if (symptomLower.includes('soggy') || symptomLower.includes('crisp') || symptomLower.includes('caking') || symptomLower.includes('soft')) {
    moistureScore += 30;
  }
  if (catLower.includes('chips') || catLower.includes('snack') || catLower.includes('spice') || catLower.includes('bakery')) {
    moistureScore += 20;
  }
  if (rh >= 70) moistureScore += 25;
  else if (rh >= 55) moistureScore += 10;

  if (barrierLevel === 'Low' || currentPackage.material === 'LDPE') moistureScore += 20;
  else if (barrierLevel === 'High' || currentPackage.material?.includes('Foil') || currentPackage.material?.includes('Met-PET')) moistureScore -= 35;

  moistureScore = Math.min(100, Math.max(10, moistureScore));
  const moistureRisk = moistureScore >= 75 ? 'HIGH' : moistureScore >= 45 ? 'MEDIUM' : 'LOW';

  // 2. OXYGEN / OXIDATION RISK CALCULATION
  let oxygenScore = 35;

  if (symptomLower.includes('rancid') || symptomLower.includes('smell') || symptomLower.includes('color') || symptomLower.includes('aroma')) {
    oxygenScore += 30;
  }
  if (product.fatContent && Number(product.fatContent) >= 15) {
    oxygenScore += 25;
  }
  if (temp >= 30) oxygenScore += 15;
  if (barrierLevel === 'Low') oxygenScore += 20;
  else if (barrierLevel === 'High' || currentPackage.material?.includes('Foil')) oxygenScore -= 30;

  oxygenScore = Math.min(100, Math.max(10, oxygenScore));
  const oxygenRisk = oxygenScore >= 70 ? 'HIGH' : oxygenScore >= 40 ? 'MEDIUM' : 'LOW';

  // 3. SEAL RISK CALCULATION
  let sealScore = 30;

  if (symptomLower.includes('seal') || symptomLower.includes('swelling') || symptomLower.includes('leakage')) {
    sealScore += 35;
  }
  if (currentPackage.sealType === 'Adhesive' || currentPackage.sealType === 'Snap fit') sealScore += 20;
  if (tempFluctuation === 'High' || tempFluctuation === 'Frequently') sealScore += 15;

  sealScore = Math.min(100, Math.max(10, sealScore));
  const sealRisk = sealScore >= 70 ? 'HIGH' : sealScore >= 40 ? 'MEDIUM' : 'LOW';

  // 4. TEMPERATURE STRESS RISK
  let tempScore = 20;

  if (environment.storageType === 'Frozen' && temp > -12) tempScore += 40;
  if (environment.storageType === 'Chilled' && temp > 8) tempScore += 40;
  if (tempFluctuation === 'High' || tempFluctuation === 'Frequently') tempScore += 25;
  if (temp >= 35) tempScore += 20;

  tempScore = Math.min(100, Math.max(10, tempScore));
  const temperatureRisk = tempScore >= 70 ? 'HIGH' : tempScore >= 40 ? 'MEDIUM' : 'LOW';

  // 5. MECHANICAL RISK
  let mechScore = 20;

  if (symptomLower.includes('broken') || symptomLower.includes('damaged') || symptomLower.includes('cracked')) {
    mechScore += 35;
  }
  if (environment.handlingLevel === 'Rough handling' || environment.handlingLevel === 'High vibration/impact') {
    mechScore += 30;
  }
  if (environment.transportType === 'Export / international' || transportDuration >= 7) {
    mechScore += 20;
  }

  mechScore = Math.min(100, Math.max(10, mechScore));
  const mechanicalRisk = mechScore >= 70 ? 'HIGH' : mechScore >= 40 ? 'MEDIUM' : 'LOW';

  // OVERALL RISK
  const maxScore = Math.max(moistureScore, oxygenScore, sealScore, tempScore, mechScore);
  const overallRisk = maxScore >= 75 ? 'HIGH' : maxScore >= 45 ? 'MEDIUM' : 'LOW';

  // Primary mechanism determination
  let primaryMechanism = 'MOISTURE INGRESS';
  if (moistureScore >= maxScore) primaryMechanism = 'MOISTURE INGRESS';
  else if (oxygenScore >= maxScore) primaryMechanism = 'OXYGEN OXIDATION';
  else if (sealScore >= maxScore) primaryMechanism = 'SEAL LEAKAGE';
  else if (mechScore >= maxScore) primaryMechanism = 'MECHANICAL DAMAGE';
  else if (tempScore >= maxScore) primaryMechanism = 'TEMPERATURE STRESS';

  return {
    moistureRisk,
    moistureScore,
    oxygenRisk,
    oxygenScore,
    sealRisk,
    sealScore,
    temperatureRisk,
    tempScore,
    mechanicalRisk,
    mechScore,
    overallRisk,
    primaryMechanism,
    explanations: [
      `Moisture Risk: ${moistureRisk} (${moistureScore}/100) — evaluated against storage RH (${rh}%) and barrier properties.`,
      `Oxygen Risk: ${oxygenRisk} (${oxygenScore}/100) — evaluated against oxidation sensitivity and temperature (${temp}°C).`,
      `Seal Integrity Risk: ${sealRisk} (${sealScore}/100) — evaluated against seal type and temperature fluctuations.`,
      `Mechanical Protection Risk: ${mechanicalRisk} (${mechScore}/100) — evaluated against transit duration (${transportDuration} days) and handling level.`
    ]
  };
}
