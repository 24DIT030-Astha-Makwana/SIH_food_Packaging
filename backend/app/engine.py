import json
from typing import Dict, Any, List, Tuple
from app.models import FoodProduct, PackagingStructure

def get_or_create_digital_twin(db, product_name: str, custom_name: str = None) -> Dict[str, Any]:
    name_to_search = custom_name if (product_name == "Other" and custom_name) else product_name
    
    # Try exact or partial match in DB
    food_db = db.query(FoodProduct).filter(FoodProduct.name.ilike(f"%{name_to_search}%")).first()
    if food_db:
        return {
            "name": food_db.name,
            "category": food_db.category,
            "moisture_sensitivity": food_db.moisture_sensitivity,
            "oxygen_sensitivity": food_db.oxygen_sensitivity,
            "respiration_class": food_db.respiration_class,
            "temperature_sensitivity": food_db.temperature_sensitivity,
            "typical_storage": food_db.typical_storage,
            "typical_shelf_life": food_db.typical_shelf_life,
            "notes": food_db.notes or "Validated food digital twin entry."
        }
    
    # Heuristic fallback for unknown/custom items
    lower_name = name_to_search.lower()
    if any(k in lower_name for k in ["chip", "crisp", "snack", "fry", "cracker"]):
        return {
            "name": name_to_search,
            "category": "Snacks & Bakery",
            "moisture_sensitivity": "Critical",
            "oxygen_sensitivity": "Critical",
            "respiration_class": "None",
            "temperature_sensitivity": "Heat Sensitive",
            "typical_storage": "Room temperature",
            "typical_shelf_life": "3–6 months",
            "notes": "Hygroscopic and oxidation prone dry food."
        }
    elif any(k in lower_name for k in ["fruit", "berry", "apple", "grape", "mango", "citrus", "veg", "leaf"]):
        return {
            "name": name_to_search,
            "category": "Fresh Produce",
            "moisture_sensitivity": "High",
            "oxygen_sensitivity": "High",
            "respiration_class": "High",
            "temperature_sensitivity": "Chilling Sensitive",
            "typical_storage": "Room temperature",
            "typical_shelf_life": "1–4 weeks",
            "notes": "Live respiring fresh produce requiring breathable micro-atmosphere."
        }
    elif any(k in lower_name for k in ["meat", "fish", "chicken", "beef", "pork", "seafood", "paneer", "cheese"]):
        return {
            "name": name_to_search,
            "category": "Perishable Fresh / Refrigerated",
            "moisture_sensitivity": "Critical",
            "oxygen_sensitivity": "Critical",
            "respiration_class": "None",
            "temperature_sensitivity": "Strict Cold Chain Required",
            "typical_storage": "Refrigerated",
            "typical_shelf_life": "1–4 weeks",
            "notes": "Perishable protein food highly sensitive to microbial spoilage and oxidation."
        }
    else:
        return {
            "name": name_to_search,
            "category": "General Food Product",
            "moisture_sensitivity": "Medium",
            "oxygen_sensitivity": "Medium",
            "respiration_class": "Low",
            "temperature_sensitivity": "Standard Ambient",
            "typical_storage": "Room temperature",
            "typical_shelf_life": "1–3 months",
            "notes": "Estimated digital twin based on baseline food science parameters."
        }

def evaluate_recommendations(db, request_data: Dict[str, Any]) -> Dict[str, Any]:
    product_input = request_data.get("product") or request_data.get("custom_product_name") or "Food Product"
    custom_name = request_data.get("custom_product_name")
    food_category = request_data.get("food_category") or "General"
    shelf_life = request_data.get("desired_shelf_life") or request_data.get("shelf_life") or "1–3 months"
    storage = request_data.get("storage_type") or request_data.get("storage") or "Room temperature"
    storage_temp = request_data.get("storage_temperature") or "Normal room temperature"
    rel_humidity = request_data.get("relative_humidity") or "Normal humidity"
    transportation = request_data.get("transportation") or "Long distance"
    handling_level = request_data.get("handling_level") or "Medium"
    priority = request_data.get("priority") or "Balanced"
    problem = request_data.get("problem") or "No major problem"
    category_details = request_data.get("category_details") or {}

    # 1. Digital Twin Retrieval
    twin = get_or_create_digital_twin(db, product_input, custom_name)
    prod_name = twin["name"]
    if food_category and food_category != "General":
        twin["category"] = food_category

    # Extract measured inputs if provided
    moisture_known = request_data.get("moisture_known", False)
    moisture_content = request_data.get("moisture_content")
    fat_known = request_data.get("fat_known", False)
    fat_applicable = request_data.get("fat_applicable", True)
    fat_content = request_data.get("fat_content")
    ph_known = request_data.get("ph_known", False)
    ph_applicable = request_data.get("ph_applicable", True)
    ph_val = request_data.get("ph_value")
    resp_known = request_data.get("respiration_known", False)
    resp_applicable = request_data.get("respiration_applicable", True)
    resp_val = request_data.get("respiration_rate_val")

    # Override digital twin sensitivity based on measured values
    if moisture_known and moisture_content is not None:
        if moisture_content < 6.0 or moisture_content > 65.0:
            twin["moisture_sensitivity"] = "Critical"

    if fat_applicable and fat_known and fat_content is not None:
        if fat_content >= 12.0:
            twin["oxygen_sensitivity"] = "Critical"

    if resp_applicable and resp_known and resp_val is not None:
        if resp_val >= 40.0:
            twin["respiration_class"] = "High"

    # Override digital twin sensitivity based on category details if user provided them
    if category_details.get("main_concern"):
        concern = str(category_details.get("main_concern")).lower()
        if "crisp" in concern or "moisture" in concern or "soggy" in concern or "caking" in concern:
            twin["moisture_sensitivity"] = "Critical"
        if "rancid" in concern or "oxidation" in concern or "aroma" in concern or "color" in concern or "spoilage" in concern:
            twin["oxygen_sensitivity"] = "Critical"

    if rel_humidity in ["High humidity", "Very humid / tropical conditions"]:
        twin["moisture_sensitivity"] = "Critical"

    # 2. Priority Weights Configuration
    weights = {
        "Lowest cost": {"protection": 0.30, "cost": 0.50, "transport": 0.10, "sustainability": 0.10},
        "Maximum shelf life": {"protection": 0.55, "cost": 0.05, "transport": 0.15, "sustainability": 0.25},
        "Eco-friendly packaging": {"protection": 0.25, "cost": 0.10, "transport": 0.10, "sustainability": 0.55},
        "Balanced": {"protection": 0.35, "cost": 0.25, "transport": 0.20, "sustainability": 0.20}
    }.get(priority, {"protection": 0.35, "cost": 0.25, "transport": 0.20, "sustainability": 0.20})

    # 3. Retrieve structures from DB
    structures = db.query(PackagingStructure).all()
    
    scored_items = []

    for s in structures:
        # Protection score calculation
        prot_score = 0.5
        is_critical = twin["moisture_sensitivity"] in ["High", "Critical"] or twin["oxygen_sensitivity"] in ["High", "Critical"]
        
        if is_critical:
            if "High" in s.barrier_rating or "Ultra" in s.barrier_rating:
                prot_score += 0.40
            elif "Basic" in s.barrier_rating:
                prot_score -= 0.35  # Penalty for basic LDPE on chips/paneer/spices!
        else:
            if "Basic" in s.barrier_rating or "Produce" in s.category:
                prot_score += 0.20

        if twin["respiration_class"] in ["High", "Extremely High"] and "Micro-perforated" in s.name:
            prot_score += 0.35
        elif twin["respiration_class"] in ["High", "Extremely High"] and "Foil" in s.name:
            prot_score -= 0.40  # High respiration fruits rot in air-tight foil pouches!

        # Problem adjustments
        if problem and problem != "No major problem":
            prob_lower = problem.lower()
            if "soggy" in prob_lower and "Moisture" in s.barrier_rating:
                prot_score += 0.20
            if "freshness" in prob_lower or "color" in prob_lower or "smell" in prob_lower:
                if "High" in s.barrier_rating or "Ultra" in s.barrier_rating:
                    prot_score += 0.20
            if "damaged" in prob_lower and ("High" in s.mechanical_protection or "Superior" in s.mechanical_protection):
                prot_score += 0.20

        prot_score = min(1.0, max(0.1, prot_score))

        # Cost Score (Lower cost tier gives higher score)
        if s.cost_tier == "Budget":
            cost_score = 0.95
        elif s.cost_tier == "Recommended":
            cost_score = 0.70
        else:
            cost_score = 0.45

        # Transport Score
        if transportation in ["Long distance", "Export"]:
            transport_score = 0.90 if s.cost_tier in ["Recommended", "Premium"] else 0.50
        else:
            transport_score = 0.85

        # Sustainability Score
        if "High" in s.sustainability_level or "Recyclable PE" in s.sustainability_level:
            sust_score = 0.90
        elif "Medium" in s.sustainability_level:
            sust_score = 0.65
        else:
            sust_score = 0.40

        # Total Weighted Match Score
        final_score = (
            prot_score * weights["protection"] +
            cost_score * weights["cost"] +
            transport_score * weights["transport"] +
            sust_score * weights["sustainability"]
        )

        scored_items.append({
            "structure": s,
            "final_score": round(final_score * 100, 1),
            "prot_score": prot_score,
            "cost_score": cost_score,
            "sust_score": sust_score
        })

    # Sort scored items
    scored_items.sort(key=lambda x: x["final_score"], reverse=True)

    # Filter into Budget, Recommended, Premium options
    budget_candidate = next((x for x in scored_items if x["structure"].cost_tier == "Budget"), scored_items[-1])
    recommended_candidate = scored_items[0]
    premium_candidate = next((x for x in scored_items if x["structure"].cost_tier == "Premium"), scored_items[0])

    def build_option(candidate, tier_label: str):
        st = candidate["structure"]
        return {
            "tier": tier_label,
            "name": st.name,
            "category": st.category,
            "materials": st.materials,
            "cost_level": st.cost_level,
            "protection_level": "High" if candidate["prot_score"] > 0.7 else "Moderate",
            "sustainability_level": st.sustainability_level,
            "suitability": "High" if candidate["final_score"] >= 75 else "Good",
            "match_score": candidate["final_score"],
            "description": st.description,
            "technical_details": {
                "recommended_material": st.materials,
                "packaging_structure": st.name,
                "suggested_thickness_range": st.thickness_range,
                "oxygen_barrier_requirement": st.otr_approx,
                "moisture_barrier_requirement": st.wvtr_approx,
                "sealability": st.sealability,
                "mechanical_protection": st.mechanical_protection,
                "map_suitability": st.map_suitability,
                "storage_recommendation": st.storage_recommendation
            }
        }

    opt_budget = build_option(budget_candidate, "Option 1 — Budget")
    opt_rec = build_option(recommended_candidate, "Option 2 — Recommended")
    opt_prem = build_option(premium_candidate, "Option 3 — Premium")

    # 4. Sustainable Alternative
    sust_struct = db.query(PackagingStructure).filter(PackagingStructure.sustainability_level.ilike("%High%")).first()
    sustainable_alt = {
        "name": sust_struct.name if sust_struct else "Paper-Based Bio-Barrier Pouch",
        "material": sust_struct.materials if sust_struct else "Kraft Paper / Bio-PE Coating",
        "differ_from_recommended": "Uses renewable bio-based or mono-material structure instead of multi-layer metallic foils.",
        "sustainability_advantage": "Potentially lower carbon footprint and higher compatibility with standard recycling systems.",
        "performance_tradeoff": "Slightly shorter maximum shelf life under extreme humidity conditions.",
        "cost_tradeoff": "Moderate premium over standard flexible plastic films."
    }

    # 5. Why We Recommend This Reasons (Simple business language)
    why_reasons = [
        f"Helps protect {prod_name.lower()} quality under {storage.lower()} storage conditions.",
        f"Designed to maintain freshness for your target duration of {shelf_life}.",
        f"Provides structural protection tailored for {transportation.lower()} transit.",
        f"Directly addresses your primary target priority ({priority.lower()}).",
        f"Balanced barrier engineering to prevent product degradation."
    ]

    # 6. Packaging Genome Profile
    genome = {
        "protection": "High" if recommended_candidate["prot_score"] > 0.7 else "Medium",
        "moisture_protection": "High" if twin["moisture_sensitivity"] in ["High", "Critical"] else "Medium",
        "oxygen_protection": "High" if twin["oxygen_sensitivity"] in ["High", "Critical"] else "Medium",
        "strength": "High" if transportation in ["Long distance", "Export"] else "Medium",
        "cost": recommended_candidate["structure"].cost_level,
        "sustainability": recommended_candidate["structure"].sustainability_level,
        "genome_vector": {
            "Protection": round(recommended_candidate["prot_score"] * 10, 1),
            "Moisture Protection": 8.5 if twin["moisture_sensitivity"] in ["High", "Critical"] else 6.0,
            "Oxygen Protection": 9.0 if twin["oxygen_sensitivity"] in ["High", "Critical"] else 5.5,
            "Strength": 8.5 if transportation in ["Long distance", "Export"] else 6.5,
            "Cost Efficiency": round(recommended_candidate["cost_score"] * 10, 1),
            "Sustainability": round(recommended_candidate["sust_score"] * 10, 1)
        }
    }

    # 7. Confidence Level & Reason
    if product_input != "Other":
        confidence = "High"
        confidence_reason = "High confidence based on validated food digital twin database profiles and verified barrier performance requirements."
    else:
        confidence = "Medium"
        confidence_reason = "Medium confidence based on generalized food category heuristic rules for custom product entry."

    summary_moisture = f"✓ User Provided ({moisture_content}%)" if (moisture_known and moisture_content is not None) else "≈ Eco-PackAI Estimated"
    summary_fat = f"✓ User Provided ({fat_content}%)" if (fat_applicable and fat_known and fat_content is not None) else ("— Not Applicable" if not fat_applicable else "≈ Eco-PackAI Estimated")
    summary_ph = f"✓ User Provided ({ph_val})" if (ph_applicable and ph_known and ph_val is not None) else ("— Not Applicable" if not ph_applicable else "≈ Eco-PackAI Estimated")
    summary_resp = f"✓ User Provided ({resp_val} mg CO₂/kg·h)" if (resp_applicable and resp_known and resp_val is not None) else ("— Not Applicable" if not resp_applicable else "≈ Eco-PackAI Estimated")

    return {
        "product": prod_name,
        "input_summary": {
            "Category": food_category,
            "Product": prod_name,
            "Shelf Life": shelf_life,
            "Storage": storage,
            "Storage Temp": storage_temp,
            "Humidity": rel_humidity,
            "Moisture Content": summary_moisture,
            "Oil / Fat Content": summary_fat,
            "Product pH": summary_ph,
            "Respiration Rate": summary_resp,
            "Transportation": transportation,
            "Handling": handling_level,
            "Priority": priority,
            "Facing Problem": problem or "None"
        },
        "confidence_level": confidence,
        "confidence_reason": confidence_reason,
        "food_digital_twin": twin,
        "recommended_packaging": opt_rec,
        "why_recommended": why_reasons,
        "options": [opt_budget, opt_rec, opt_prem],
        "sustainable_alternative": sustainable_alt,
        "packaging_genome": genome,
        "disclaimer": "This recommendation is a decision-support tool. Final packaging selection should be validated through appropriate product, packaging, safety and regulatory testing."
    }

def diagnose_packaging_problem(product_name: str, problem_desc: str) -> Dict[str, Any]:
    desc_lower = problem_desc.lower()
    possible_causes = []
    recommended_improvements = []
    alternative_packaging = []
    validation_info = []

    if any(w in desc_lower for w in ["soggy", "moist", "soft", "humidity", "crisp"]):
        possible_causes.append("Water vapor transmission (WVTR) through the packaging film is too high for your product's hygroscopic nature.")
        possible_causes.append("Micro-pinholes or incomplete seal integrity allowing humidity ingress during storage.")
        recommended_improvements.append("Switch to a film with a metallized layer (Met-PET) or aluminum foil barrier (< 1 g/m²/day WVTR).")
        recommended_improvements.append("Upgrade seal temperature profile and inspect heat-seal jaw pressure.")
        alternative_packaging.append("BOPP / Met-PET / PE High-Barrier Metallized Pouch")
        validation_info.append("Measure package seal strength (ASTM F88) and check water vapor transmission rate (WVTR) at 38°C / 90% RH.")

    if any(w in desc_lower for w in ["smell", "odor", "stale", "rancid", "color", "brown"]):
        possible_causes.append("Oxygen transmission (OTR) causing lipid oxidation, fat rancidity, or enzymatic color darkening.")
        possible_causes.append("Exposure to light initiating photochemical breakdown of food compounds.")
        recommended_improvements.append("Introduce Nitrogen gas flushing (N2 MAP) to reduce residual headroom oxygen below 1%.")
        recommended_improvements.append("Utilize opaque or metallized light-blocking packaging barrier layers.")
        alternative_packaging.append("PET / AL / PE Ultra-Barrier Aluminum Pouch with Nitrogen Flushing")
        validation_info.append("Test residual package head-space oxygen concentration using a gas analyzer.")

    if any(w in desc_lower for w in ["damage", "tear", "burst", "bursting", "puncture", "crushed"]):
        possible_causes.append("Film thickness or tensile strength is insufficient for physical handling and transport vibration.")
        possible_causes.append("Inadequate seal strength causing package seals to burst under stacking pressure.")
        recommended_improvements.append("Increase LLDPE sealant layer thickness by 15-20 µm.")
        recommended_improvements.append("Adopt high puncture-resistant oriented polyamide (Nylon/OPA) or MDO-PE film layers.")
        alternative_packaging.append("High-Durability Nylon / LLDPE Heavy-Duty Pouch")
        validation_info.append("Perform transport vibration simulation and package drop testing (ISTA 1A / ASTM D4169).")

    if not possible_causes:
        possible_causes.append("Current packaging barrier properties (OTR/WVTR) may not match the required product shelf-life duration.")
        possible_causes.append("Ambient storage temperature or humidity exceeds expected tolerance limits.")
        recommended_improvements.append("Evaluate high-barrier laminate options and verify seal integrity.")
        alternative_packaging.append("Recyclable Mono-Material High-Barrier Pouch")
        validation_info.append("Conduct an accelerated shelf-life testing (ASLT) trial under controlled climatic chamber conditions.")

    return {
        "possible_causes": possible_causes,
        "recommended_improvements": recommended_improvements,
        "alternative_packaging": alternative_packaging,
        "validation_info_needed": validation_info
    }


