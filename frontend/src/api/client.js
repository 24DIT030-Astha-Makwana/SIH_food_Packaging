const API_BASE = '/api';

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to fetch food products');
  return res.json();
}

export async function createRecommendation(data) {
  const res = await fetch(`${API_BASE}/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to process recommendation');
  return res.json();
}

export async function fetchRecommendationHistory() {
  const res = await fetch(`${API_BASE}/recommendations`);
  if (!res.ok) throw new Error('Failed to fetch recommendation history');
  return res.json();
}

export async function fetchRecommendationById(id) {
  const res = await fetch(`${API_BASE}/recommendations/${id}`);
  if (!res.ok) throw new Error('Failed to fetch recommendation detail');
  return res.json();
}

export async function diagnoseProblem(product, problemDescription) {
  const res = await fetch(`${API_BASE}/doctor/diagnose`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product, problem_description: problemDescription }),
  });
  if (!res.ok) throw new Error('Failed to diagnose packaging problem');
  return res.json();
}

export async function simulateWhatIf(originalInput, modifications) {
  const res = await fetch(`${API_BASE}/simulator/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      original_input: originalInput,
      ...modifications,
    }),
  });
  if (!res.ok) throw new Error('Failed to run simulator');
  return res.json();
}

export async function fetchAllStructures() {
  const res = await fetch(`${API_BASE}/compare`);
  if (!res.ok) throw new Error('Failed to fetch structures');
  return res.json();
}

export async function comparePackaging(optionNames) {
  const res = await fetch(`${API_BASE}/compare`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ option_names: optionNames }),
  });
  if (!res.ok) throw new Error('Failed to compare options');
  return res.json();
}

export async function downloadReportPdf(recommendationData) {
  const res = await fetch(`${API_BASE}/reports/download`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recommendationData),
  });
  if (!res.ok) throw new Error('Failed to generate PDF report');
  
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const productName = (recommendationData.product || 'recommendation').toLowerCase().replace(/\s+/g, '_');
  a.download = `packtwin_recommendation_${productName}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}
