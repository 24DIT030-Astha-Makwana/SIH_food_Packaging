# Eco-PackAI

A web-based food packaging decision-support tool — describe your product, your storage conditions, and your problem, and get a packaging recommendation that actually explains itself.

| | |
|---|---|
| 🌐 **Live App** | [eco-packai.vercel.app](https://eco-packai.vercel.app) |
| ⚙️ **Backend API** | [sih-food-packaging.onrender.com](https://sih-food-packaging.onrender.com) |
| 📋 **API Docs** | [/docs](https://sih-food-packaging.onrender.com/docs) |

**Status:** Frontend deployed on Vercel. Backend deployed on Render (free tier — may cold-start on first request). Database is SQLite; recommendation history persists on the Render instance.

---

## Why We Built This

Packaging decisions are genuinely difficult for people who aren't packaging engineers.

A small food manufacturer, a farmer selling processed produce, or a startup launching a snack product all face the same problem: they need to choose packaging that keeps their product fresh, survives transport, and fits their budget — but the information they need is scattered across technical datasheets, supplier catalogues, and food science literature that assumes you already know what OTR and WVTR mean.

The same product can need completely different packaging depending on whether it's going to a local market or being exported, whether it's stored in a humid warehouse or a climate-controlled facility, and whether the target shelf life is three weeks or six months.

Eco-PackAI tries to turn those inputs — product type, moisture content, fat content, pH, respiration rate, storage conditions, humidity, transportation distance, handling intensity, and existing packaging problems — into a packaging recommendation with a plain-language explanation of why that recommendation makes sense for those specific conditions.

---

## The Idea in One Screen

```
Food Category
  → Specific Product (or custom entry)
    → Product Parameters (moisture %, fat %, pH, respiration rate)
      → Shelf Life & Storage (type, temperature, humidity)
        → Transportation & Handling (distance, duration, stress level)
          → Existing Packaging Problem (optional)
            → Review & Analyze
              → Recommendation (Budget / Recommended / Premium options)
                → Explanation + Technical Specs + Sustainable Alternative + PDF Report
```

The Packaging Doctor flow is separate and goes:

```
Current Package Description
  → Failure Symptom
    → Storage & Environment
      → Autopsy Report
        → What-If Simulator / Candidate Redesigns / Validation Plan / Engineering Spec
```

---

## What You Can Actually Do

### Design a New Package

The main recommendation flow is a six-step form. You pick a food category (Fruits, Vegetables, Chips & Snacks, Bakery, Spices & Dry Foods, Frozen Foods, Meat & Seafood, Dairy, or Other), then select or type a specific product.

From there you enter measurable parameters if you have them — moisture content, oil/fat percentage, pH, respiration rate. If you don't know a value, you mark it as unknown and the system estimates it from its food database. The review step shows you clearly which values came from you and which were estimated, labelled as `✓ User Provided` or `≈ Eco-PackAI Estimated`.

You then specify shelf life target, storage type (Ambient / Chilled / Frozen), temperature, humidity, transportation mode, handling intensity, and any existing packaging problem.

The backend scores all packaging structures in the database against your inputs using a weighted scoring model (more on this below) and returns three options: Budget, Recommended, and Premium — each with a match score, materials, barrier specs, and a plain-language explanation of why it suits your product.

### Diagnose Existing Packaging — The Packaging Doctor

This is the part of the project we're most interested in.

Most simple packaging tools ask: *"What food are you packaging?"* and return a material name.

The Packaging Doctor asks a different question: *"What is going wrong with the packaging you already have?"*

You describe your current package (material, format, seal type, barrier level), the failure symptom (soggy product, rancid smell, color change, physical damage), and the storage and transport environment. The system runs a packaging autopsy — a rule-based risk analysis that calculates scores across five failure mechanisms: moisture ingress, oxygen oxidation, seal leakage, thermal stress, and mechanical transit damage.

The autopsy output includes:

- **Primary failure mechanism** with evidence and a step-by-step failure pathway
- **Risk scores** for each of the five mechanisms (0–100)
- **Failure timeline simulation** showing when quality degradation is expected to become consumer-perceptible
- **Package DNA** — a summary of the current package's estimated barrier properties
- **Candidate redesigns** — three minimum-change options (process recalibration only, targeted film upgrade, full mono-material upgrade) with materials, cost category, expected impact, and tradeoffs
- **Validation plan** — specific lab tests recommended to confirm the diagnosis, with estimated cost ranges in INR
- **Engineering specification** — a structured spec sheet for the recommended redesign candidate

There's also a What-If Simulator inside the Doctor that lets you adjust temperature, humidity, shelf life target, and transport duration to see how the risk scores change.

The autopsy engine (`autopsyEngine.js`) and risk scoring (`riskEngine.js`) run entirely on the frontend — no API call required for the diagnosis itself. The backend `/api/doctor/diagnose` endpoint provides a simpler keyword-based diagnosis for the basic Packaging Doctor page.

### Understand the Recommendation

The system doesn't just return a material name. Each recommendation includes:

- Why this structure was chosen for your specific inputs
- Technical details: OTR range, WVTR range, thickness range, sealability, mechanical protection, MAP suitability, storage recommendation
- A confidence level (High for known products in the database, Medium for custom/unknown entries)
- A sustainable alternative with its tradeoffs explained

### Compare Packaging Options

The Compare page lets you select any packaging structures from the database and view them side by side — barrier ratings, OTR, WVTR, cost tier, sustainability level, sealability, and MAP suitability in a comparison table.

### Recommendation History

Every recommendation you generate is saved to the database and accessible from the My Recommendations page. You can retrieve any past recommendation by ID.

### Generate a PDF Report

After getting a recommendation, you can download a formatted PDF report. It includes the input summary, recommended packaging solution, why-recommended reasons, technical specifications table, and the sustainable alternative. Generated server-side using ReportLab.

---

## A Short Walk Through the App

You open [eco-packai.vercel.app](https://eco-packai.vercel.app) and land on the home page. There's a "Get Recommendation" path and a "Packaging Doctor" path.

You click Get Recommendation. A six-step form starts. You pick "Chips & Snacks" → "Potato Chips". The form automatically marks fat content as relevant and respiration rate as not applicable for this category. You enter fat content as 30% (from your product label), leave moisture as unknown, skip pH (not applicable for snacks). You set shelf life to 3–6 months, storage as Ambient at 25–30°C, high humidity, long-distance interstate transport, normal handling, balanced priority. You note the problem: "Product becomes soggy."

Step 6 shows you a review grid. Moisture is marked `≈ Eco-PackAI Estimated`. Fat is marked `✓ User Provided (30%)`. You click Analyze.

The backend receives the request, looks up Potato Chips in the food database (moisture sensitivity: Critical, oxygen sensitivity: Critical), overrides the oxygen sensitivity to Critical because fat content ≥ 12%, applies the "High humidity → moisture sensitivity Critical" rule, scores all packaging structures, and returns three options. The top recommendation is the High-Barrier Metallized Pouch (BOPP/Met-PET/LLDPE) with a match score in the high 70s–80s range. The budget option is the Single Layer Poly Pouch. The premium option is the Ultra-Barrier Aluminum Foil Pouch or the Recyclable Mono-Material Pouch.

You read the explanation, check the technical specs, look at the sustainable alternative, and download the PDF.

---

## Under the Hood

```
React / Vite (Vercel)
        │
        │  REST API calls via fetch()
        │  VITE_API_URL = https://sih-food-packaging.onrender.com/api
        ▼
FastAPI / Uvicorn (Render)
        │
        ├── /api/recommendations  — create & retrieve recommendations
        ├── /api/products         — list food products from DB
        ├── /api/doctor/diagnose  — keyword-based packaging diagnosis
        ├── /api/simulator/simulate — what-if scenario comparison
        ├── /api/compare          — packaging structure comparison
        ├── /api/reports/download — PDF generation via ReportLab
        └── /api/health           — health check
        │
        ▼
SQLAlchemy ORM
        │
        ▼
SQLite (packtwin.db)
  ├── food_products         — 17 seeded food items with sensitivity profiles
  ├── packaging_materials   — 10 material entries
  ├── packaging_structures  — 8 packaging structures with full specs
  └── recommendations       — saved recommendation history
```

The frontend API client (`src/api/client.js`) handles all backend communication. The Packaging Doctor's autopsy and risk engine (`src/services/autopsyEngine.js`, `src/services/riskEngine.js`) run entirely client-side.

---

## The Recommendation Engine

The recommendation logic lives in `backend/app/engine.py`. It's a weighted scoring system — not a machine learning model.

Here's what actually happens when you submit a recommendation request:

**1. Digital Twin Lookup**
The backend searches the `food_products` table for the product name. If found, it uses the stored sensitivity profile (moisture sensitivity, oxygen sensitivity, respiration class, temperature sensitivity). If not found, it falls back to keyword heuristics — names containing "chip", "crisp", "snack" get Critical moisture/oxygen sensitivity; names containing "fruit", "berry", "mango" get High respiration class; names containing "meat", "fish", "paneer" get Critical sensitivity with refrigeration requirement.

**2. Sensitivity Overrides**
If you provided measured values, they can override the database profile:
- Moisture content < 6% or > 65% → moisture sensitivity upgraded to Critical
- Fat content ≥ 12% → oxygen sensitivity upgraded to Critical
- Respiration rate ≥ 40 mg CO₂/kg·h → respiration class upgraded to High
- Storage humidity "High" or "Very humid / tropical" → moisture sensitivity forced to Critical
- Problem keywords like "soggy", "rancid", "oxidation" → corresponding sensitivity upgraded

**3. Priority Weights**
Four priority modes set the scoring weights:

| Priority | Protection | Cost | Transport | Sustainability |
|---|---|---|---|---|
| Lowest cost | 0.30 | 0.50 | 0.10 | 0.10 |
| Maximum shelf life | 0.55 | 0.05 | 0.15 | 0.25 |
| Eco-friendly | 0.25 | 0.10 | 0.10 | 0.55 |
| Balanced | 0.35 | 0.25 | 0.20 | 0.20 |

**4. Structure Scoring**
Every packaging structure in the database gets scored on protection, cost, transport suitability, and sustainability. The protection score has explicit penalties — for example, a basic LDPE pouch gets a −0.35 penalty when the product has Critical moisture/oxygen sensitivity, and a foil pouch gets a −0.40 penalty for high-respiration fresh produce (because sealing respiring fruit in an airtight foil pouch accelerates spoilage). Problem keywords add bonuses to structures that address the stated issue.

**5. Output**
The top-scoring structure becomes the Recommended option. The best Budget-tier and Premium-tier structures are also returned. A packaging genome profile (radar chart data) and a sustainable alternative are included.

The confidence level is High when the product was found in the database, Medium for custom entries using heuristic fallback.

---

## The Packaging Doctor

The Packaging Doctor deserves its own section because it's the part of this project that goes beyond "enter food → get material."

The premise is that many food businesses already have packaging. They're not starting from scratch — they're dealing with a problem. Their chips are going soggy after three weeks. Their spice pouches smell stale. Their paneer packaging is leaking. They need to understand *why* before they can fix it.

The Doctor takes four inputs: the current package (material, format, seal type, barrier level), the failure symptom, the storage environment (temperature, humidity, shelf life target), and transport/handling conditions.

The `riskEngine.js` calculates scores for five failure mechanisms:

- **Moisture Ingress** — driven by symptom keywords (soggy, crisp, caking), product category, storage RH, and barrier level
- **Oxygen Oxidation** — driven by symptom keywords (rancid, smell, color, aroma), fat content, temperature, and barrier level
- **Seal Leakage** — driven by symptom keywords (seal, swelling, leakage), seal type, and temperature fluctuation
- **Thermal Stress** — driven by storage type vs actual temperature and fluctuation frequency
- **Mechanical Damage** — driven by symptom keywords (broken, damaged, cracked), handling level, and transport duration

The highest-scoring mechanism becomes the primary diagnosis. The `autopsyEngine.js` then builds the full autopsy report: evidence list, failure pathway, failure timeline, package DNA, three redesign candidates, and a validation plan with specific test names and estimated costs.

The What-If Simulator inside the Doctor lets you slide temperature, humidity, shelf life, and transport duration to see how the risk scores respond in real time — useful for understanding which environmental variable is the biggest driver of the failure.

---

## Tech Stack

**Frontend**
- React 19 + Vite 8
- Tailwind CSS v4
- React Router v7
- Lucide React (icons)

**Backend**
- Python + FastAPI
- Uvicorn
- SQLAlchemy + SQLite
- Pydantic v2
- ReportLab (PDF generation)

> Note: `package.json` does not include Recharts. Charts in the packaging genome view are rendered using custom SVG/CSS rather than a charting library.

---

## Repository Map

```
SIH_2026/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js              ← all backend API calls
│   │   ├── components/
│   │   │   ├── packaging-doctor/      ← Doctor sub-components (autopsy, redesign, validation, spec, simulator)
│   │   │   ├── PackagingDoctor.jsx    ← Doctor orchestrator
│   │   │   ├── StepForm.jsx           ← 6-step recommendation input form
│   │   │   ├── RecommendationCard.jsx
│   │   │   ├── ComparisonTable.jsx
│   │   │   ├── WhatIfSimulator.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── GetRecommendationPage.jsx
│   │   │   ├── RecommendationResultPage.jsx
│   │   │   ├── PackagingDoctorPage.jsx
│   │   │   ├── MyRecommendationsPage.jsx
│   │   │   ├── ComparisonPage.jsx
│   │   │   ├── LearnPage.jsx
│   │   │   └── AboutPage.jsx
│   │   ├── services/
│   │   │   ├── autopsyEngine.js       ← packaging autopsy logic (client-side)
│   │   │   └── riskEngine.js          ← risk scoring engine (client-side)
│   │   └── App.jsx                    ← routes
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── engine.py                  ← recommendation scoring + diagnosis logic
│   │   ├── main.py                    ← FastAPI app, CORS, router registration
│   │   ├── models.py                  ← SQLAlchemy models (4 tables)
│   │   ├── schemas.py                 ← Pydantic request/response schemas
│   │   ├── database.py                ← SQLite engine + session
│   │   ├── seed_data.py               ← initial food products, materials, structures
│   │   ├── pdf_generator.py           ← ReportLab PDF builder
│   │   └── routers/
│   │       ├── recommendations.py
│   │       ├── doctor.py
│   │       ├── simulator.py
│   │       ├── compare.py
│   │       ├── reports.py
│   │       └── products.py
│   ├── requirements.txt
│   └── packtwin.db                    ← SQLite database file
│
└── README.md
```

---

## Run It Locally

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

The frontend defaults to `/api` as the base URL. To point it at the production backend or a local backend, create a `.env` file in the `frontend/` directory:

```env
# Point to production backend
VITE_API_URL=https://sih-food-packaging.onrender.com/api

# Or point to local backend
VITE_API_URL=http://localhost:8000/api
```

**Backend**

```bash
cd backend

# Create and activate virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The database (`packtwin.db`) is created automatically on first run. The seed data (food products, packaging materials, packaging structures) is inserted once on startup if the tables are empty.

FastAPI's interactive docs are available at `http://localhost:8000/docs`.

---

## Deployment

| Layer | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://eco-packai.vercel.app |
| Backend | Render (free tier) | https://sih-food-packaging.onrender.com |

The frontend is configured via `VITE_API_URL` in Vercel's environment variables. The backend runs on Render's free tier, which means it may take 30–60 seconds to respond after a period of inactivity (cold start).

---

## What We Chose Not to Hide

- The database is SQLite. It works fine for this use case, but it's a file on the Render instance — not a managed database. If the Render service is redeployed or the instance is recycled, recommendation history may be lost.

- The recommendation engine is a weighted scoring system with rule-based sensitivity overrides. It is not a machine learning model. The word "AI" in the name refers to the decision-support intelligence of the system, not a trained model.

- The food database is seeded with 17 food products and 8 packaging structures. The system handles unknown products through keyword heuristics, but the quality of recommendations for unusual or highly specific products is limited by the size of this dataset.

- The Packaging Doctor's autopsy and risk scores are estimates based on the inputs you provide. They are not a substitute for actual lab testing of your packaging.

- Packaging recommendations from this tool should not be used as the sole basis for commercial packaging decisions without physical shelf-life testing, seal integrity testing, and regulatory review.

---

## What's Next

Things we'd want to improve with more time:

- Expand the food product and packaging structure database significantly
- Add user accounts so recommendation history is tied to a user rather than the server instance
- Migrate to a persistent managed database (PostgreSQL)
- Add more packaging formats beyond flexible pouches (rigid containers, trays, cartons)
- Improve the Doctor's diagnosis with more granular symptom categories
- Add a comparison feature that works directly from recommendation results
- Explore integration with actual lab test result inputs to improve confidence scoring

---

## Built for SIH 2026

Eco-PackAI was developed for Smart India Hackathon 2026.

---

## Disclaimer

Eco-PackAI is a decision-support prototype. Packaging recommendations generated by this tool should be validated through appropriate packaging testing, food-quality assessment, regulatory compliance review, and product-specific shelf-life studies before commercial use. The tool does not replace the judgment of a qualified packaging engineer or food technologist.
