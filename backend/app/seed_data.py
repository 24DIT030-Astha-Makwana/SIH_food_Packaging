from app.models import FoodProduct, PackagingMaterial, PackagingStructure

SAMPLE_FOOD_PRODUCTS = [
    {
        "name": "Mango",
        "category": "Fresh Produce",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "Medium",
        "oxygen_sensitivity": "High",
        "respiration_class": "High",
        "temperature_sensitivity": "Chilling Sensitive (10-13°C ideal)",
        "typical_shelf_life": "1–4 weeks",
        "notes": "Climacteric fruit with rapid post-harvest respiration and ethylene production."
    },
    {
        "name": "Apple",
        "category": "Fresh Produce",
        "typical_storage": "Refrigerated",
        "moisture_sensitivity": "Medium",
        "oxygen_sensitivity": "Moderate",
        "respiration_class": "Moderate",
        "temperature_sensitivity": "Low (0-4°C stable)",
        "typical_shelf_life": "1–3 months",
        "notes": "Low respiration rate, susceptible to moisture loss if unbagged."
    },
    {
        "name": "Tomato",
        "category": "Fresh Produce",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "Medium",
        "oxygen_sensitivity": "High",
        "respiration_class": "High",
        "temperature_sensitivity": "Chilling Sensitive (below 10°C leads to loss of flavor)",
        "typical_shelf_life": "1–4 weeks",
        "notes": "High transpiration rate; needs breathable micro-perforated film."
    },
    {
        "name": "Potato",
        "category": "Fresh Produce",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "Low",
        "oxygen_sensitivity": "Low",
        "respiration_class": "Low",
        "temperature_sensitivity": "Light sensitive (greening), store in dark ambient conditions",
        "typical_shelf_life": "1–3 months",
        "notes": "Requires light barrier and condensation protection."
    },
    {
        "name": "Onion",
        "category": "Fresh Produce",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "High (sprouting under humidity)",
        "oxygen_sensitivity": "Low",
        "respiration_class": "Low",
        "temperature_sensitivity": "Dry ambient storage preferred",
        "typical_shelf_life": "1–3 months",
        "notes": "Requires dry mesh or ventilated packaging to prevent mold."
    },
    {
        "name": "Banana",
        "category": "Fresh Produce",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "High",
        "oxygen_sensitivity": "High",
        "respiration_class": "Extremely High",
        "temperature_sensitivity": "Chilling sensitive (under 13°C peel browning)",
        "typical_shelf_life": "Less than 1 week",
        "notes": "High ethylene release; benefits from ethylene absorbers or passive MAP."
    },
    {
        "name": "Strawberry",
        "category": "Fresh Produce",
        "typical_storage": "Refrigerated",
        "moisture_sensitivity": "Critical",
        "oxygen_sensitivity": "High",
        "respiration_class": "Extremely High",
        "temperature_sensitivity": "Strict Cold Chain Required (0-2°C)",
        "typical_shelf_life": "Less than 1 week",
        "notes": "Highly perishable, prone to fungal decay and bruising."
    },
    {
        "name": "Fresh vegetables",
        "category": "Fresh Produce",
        "typical_storage": "Refrigerated",
        "moisture_sensitivity": "High",
        "oxygen_sensitivity": "Moderate",
        "respiration_class": "High",
        "temperature_sensitivity": "Cold Chain Recommended (2-6°C)",
        "typical_shelf_life": "1–4 weeks",
        "notes": "Requires tailored equilibrium modified atmosphere packaging (EMAP)."
    },
    {
        "name": "Potato chips",
        "category": "Snacks & Bakery",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "Critical",
        "oxygen_sensitivity": "Critical",
        "respiration_class": "None",
        "temperature_sensitivity": "Heat Sensitive (fat oxidation)",
        "typical_shelf_life": "3–6 months",
        "notes": "Prone to sogginess from moisture and rancidity from oxygen exposure. Nitrogen gas flushing recommended."
    },
    {
        "name": "Biscuits",
        "category": "Snacks & Bakery",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "Critical",
        "oxygen_sensitivity": "Medium",
        "respiration_class": "None",
        "temperature_sensitivity": "Low",
        "typical_shelf_life": "3–6 months",
        "notes": "Highly hygroscopic; loses crispness quickly if moisture enters."
    },
    {
        "name": "Rice",
        "category": "Grains & Dry Foods",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "Medium",
        "oxygen_sensitivity": "Low",
        "respiration_class": "None",
        "temperature_sensitivity": "Low",
        "typical_shelf_life": "More than 6 months",
        "notes": "Needs pest control, puncture resistance, and moderate moisture barrier."
    },
    {
        "name": "Wheat",
        "category": "Grains & Dry Foods",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "Medium",
        "oxygen_sensitivity": "Low",
        "respiration_class": "None",
        "temperature_sensitivity": "Low",
        "typical_shelf_life": "More than 6 months",
        "notes": "Needs dry protection and sturdy woven/barrier bag structure."
    },
    {
        "name": "Spices",
        "category": "Grains & Dry Foods",
        "typical_storage": "Room temperature",
        "moisture_sensitivity": "High",
        "oxygen_sensitivity": "Critical",
        "respiration_class": "None",
        "temperature_sensitivity": "Heat & Light Sensitive (aroma degradation)",
        "typical_shelf_life": "3–6 months",
        "notes": "Essential oil aroma retention requires high gas barrier and light protection."
    },
    {
        "name": "Milk",
        "category": "Dairy & Refrigerated",
        "typical_storage": "Refrigerated",
        "moisture_sensitivity": "Low",
        "oxygen_sensitivity": "High",
        "respiration_class": "None",
        "temperature_sensitivity": "Strict Cold Chain Required (2-4°C)",
        "typical_shelf_life": "1–4 weeks",
        "notes": "Light sensitive (riboflavin oxidation) and microbial spoilage prone."
    },
    {
        "name": "Paneer",
        "category": "Dairy & Refrigerated",
        "typical_storage": "Refrigerated",
        "moisture_sensitivity": "Critical",
        "oxygen_sensitivity": "Critical",
        "respiration_class": "None",
        "temperature_sensitivity": "Strict Cold Chain Required (2-6°C)",
        "typical_shelf_life": "1–4 weeks",
        "notes": "Prone to mold growth and moisture exuding; vacuum packaging recommended."
    },
    {
        "name": "Meat",
        "category": "Fresh / Frozen Foods",
        "typical_storage": "Refrigerated",
        "moisture_sensitivity": "Critical",
        "oxygen_sensitivity": "Critical",
        "respiration_class": "None",
        "temperature_sensitivity": "Strict Cold Chain Required (0-4°C)",
        "typical_shelf_life": "1–4 weeks",
        "notes": "Prone to rapid microbial growth, lipid oxidation, and color discoloration."
    },
    {
        "name": "Frozen food",
        "category": "Frozen Foods",
        "typical_storage": "Frozen",
        "moisture_sensitivity": "Medium",
        "oxygen_sensitivity": "Medium",
        "respiration_class": "None",
        "temperature_sensitivity": "Sub-zero cold chain (-18°C or below)",
        "typical_shelf_life": "More than 6 months",
        "notes": "Requires low-temperature impact resistance and freezer burn prevention."
    }
]

SAMPLE_PACKAGING_MATERIALS = [
    {
        "name": "LDPE (Low-Density Polyethylene)",
        "category": "Flexible Film",
        "oxygen_barrier": "Low",
        "moisture_barrier": "High",
        "mechanical_strength": "Medium",
        "sealability": "Excellent",
        "sustainability_level": "Recyclable (Code 4)",
        "cost_level": "Low ($)",
        "temperature_suitability": "Chilled & Ambient",
        "map_suitability": "Moderate"
    },
    {
        "name": "HDPE (High-Density Polyethylene)",
        "category": "Rigid Container / Film",
        "oxygen_barrier": "Low",
        "moisture_barrier": "Very High",
        "mechanical_strength": "High",
        "sealability": "Good",
        "sustainability_level": "Recyclable (Code 2)",
        "cost_level": "Low ($)",
        "temperature_suitability": "Wide Range (-20C to 80C)",
        "map_suitability": "Moderate"
    },
    {
        "name": "PP (Polypropylene)",
        "category": "Flexible / Rigid",
        "oxygen_barrier": "Low",
        "moisture_barrier": "High",
        "mechanical_strength": "High",
        "sealability": "Good",
        "sustainability_level": "Recyclable (Code 5)",
        "cost_level": "Low ($)",
        "temperature_suitability": "Wide Range (-10C to 100C)",
        "map_suitability": "Good"
    },
    {
        "name": "PET (Polyethylene Terephthalate)",
        "category": "Flexible / Rigid",
        "oxygen_barrier": "Medium",
        "moisture_barrier": "Medium",
        "mechanical_strength": "High",
        "sealability": "Fair",
        "sustainability_level": "Recyclable (Code 1)",
        "cost_level": "Medium ($$)",
        "temperature_suitability": "Chilled & Ambient",
        "map_suitability": "Good"
    },
    {
        "name": "Metalized PET (Met-PET)",
        "category": "Laminate Film",
        "oxygen_barrier": "High",
        "moisture_barrier": "Very High",
        "mechanical_strength": "High",
        "sealability": "Good",
        "sustainability_level": "Standard Recyclable",
        "cost_level": "Medium ($$)",
        "temperature_suitability": "Ambient Only",
        "map_suitability": "Excellent"
    },
    {
        "name": "Aluminum Foil Laminate (PET/AL/PE)",
        "category": "Ultra-Barrier Laminate",
        "oxygen_barrier": "Very High",
        "moisture_barrier": "Very High",
        "mechanical_strength": "Extreme",
        "sealability": "Excellent",
        "sustainability_level": "High Carbon Footprint (Difficult to Recycle)",
        "cost_level": "High ($$$)",
        "temperature_suitability": "Wide Range (-20C to 100C)",
        "map_suitability": "Excellent"
    },
    {
        "name": "Paper-based Barrier Packaging",
        "category": "Paper Combo",
        "oxygen_barrier": "Medium",
        "moisture_barrier": "Medium",
        "mechanical_strength": "Medium",
        "sealability": "Good",
        "sustainability_level": "Paper-based Eco (Renewable Fibre)",
        "cost_level": "Medium ($$)",
        "temperature_suitability": "Ambient Only",
        "map_suitability": "Moderate"
    },
    {
        "name": "Biodegradable Film (PLA / PBAT)",
        "category": "Eco / Bio",
        "oxygen_barrier": "Medium",
        "moisture_barrier": "Low",
        "mechanical_strength": "Medium",
        "sealability": "Good",
        "sustainability_level": "Bio-degradable / Industrially Compostable",
        "cost_level": "High ($$$)",
        "temperature_suitability": "Ambient Only",
        "map_suitability": "Unsuitable"
    },
    {
        "name": "Micro-perforated PE Film",
        "category": "Breathable Produce Film",
        "oxygen_barrier": "Low (Controlled Permeability)",
        "moisture_barrier": "Medium",
        "mechanical_strength": "Medium",
        "sealability": "Excellent",
        "sustainability_level": "Recyclable (Code 4)",
        "cost_level": "Low ($)",
        "temperature_suitability": "Chilled & Ambient",
        "map_suitability": "Excellent for Fresh Produce"
    },
    {
        "name": "High-Barrier EVOH Laminate",
        "category": "Laminate Film",
        "oxygen_barrier": "Very High",
        "moisture_barrier": "High",
        "mechanical_strength": "High",
        "sealability": "Excellent",
        "sustainability_level": "Recyclable Mono-material Variant Available",
        "cost_level": "High ($$$)",
        "temperature_suitability": "Chilled & Ambient",
        "map_suitability": "Excellent"
    }
]

SAMPLE_PACKAGING_STRUCTURES = [
    {
        "name": "Single Layer Poly Pouch (LDPE / LLDPE)",
        "category": "Budget Flexible",
        "materials": "Mono-LDPE",
        "thickness_range": "35–60 µm",
        "suitable_products": "Potato, Onion, Fresh vegetables, Rice, Wheat, Frozen food",
        "suitable_storage": "Room temperature, Refrigerated, Frozen",
        "barrier_rating": "Basic Moisture Barrier",
        "cost_tier": "Budget",
        "cost_level": "Low ($)",
        "sustainability_level": "High (100% Recyclable PE)",
        "otr_approx": "1800 - 3000 cc/m²/day",
        "wvtr_approx": "8 - 15 g/m²/day",
        "sealability": "Easy heat sealing with strong seal band",
        "mechanical_protection": "Moderate tear strength for local distribution",
        "map_suitability": "Not recommended for gas retention",
        "storage_recommendation": "Store in cool, shaded indoor space away from direct UV exposure",
        "description": "Cost-effective flexible pouch ideal for local distribution and non-oxygen sensitive dry or produce items.",
        "sustainability_notes": "Single-polymer construction allows easy inclusion in standard plastic recycling streams."
    },
    {
        "name": "Micro-perforated Active Produce Bag",
        "category": "Fresh Produce Specialty",
        "materials": "Micro-perforated LLDPE",
        "thickness_range": "25–40 µm",
        "suitable_products": "Mango, Apple, Tomato, Banana, Strawberry, Fresh vegetables",
        "suitable_storage": "Room temperature, Refrigerated",
        "barrier_rating": "Engineered Gas Permeability",
        "cost_tier": "Budget",
        "cost_level": "Low ($)",
        "sustainability_level": "High (Recyclable PE)",
        "otr_approx": "3000 - 8000 cc/m²/day (Engineered)",
        "wvtr_approx": "12 - 20 g/m²/day",
        "sealability": "Reliable heat sealing",
        "mechanical_protection": "Lightweight flexible protection preventing physical surface abrasion",
        "map_suitability": "Ideal for Equilibrium Modified Atmosphere (EMAP)",
        "storage_recommendation": "Store in ventilated crates or chilled display cases",
        "description": "Specially micro-perforated bag designed to balance respiration oxygen and CO2 levels to delay ripening in fresh fruits.",
        "sustainability_notes": "Minimal material mass reduces overall packaging weight footprint."
    },
    {
        "name": "Duplex Laminate Pouch (PET / PE)",
        "category": "Standard Flexible Laminate",
        "materials": "PET (12µm) / PE (60µm)",
        "thickness_range": "70–90 µm",
        "suitable_products": "Biscuits, Paneer, Spices, Milk, Frozen food",
        "suitable_storage": "Room temperature, Refrigerated, Frozen",
        "barrier_rating": "Medium Oxygen & Moisture Barrier",
        "cost_tier": "Recommended",
        "cost_level": "Medium ($$)",
        "sustainability_level": "Medium (Requires specialized recycling process)",
        "otr_approx": "80 - 120 cc/m²/day",
        "wvtr_approx": "3 - 6 g/m²/day",
        "sealability": "Hermetic seal with wide sealing window",
        "mechanical_protection": "High tensile strength and good puncture resistance during transit",
        "map_suitability": "Suitable for mild flush or vacuum packing",
        "storage_recommendation": "Store dry at room temperature or chilled conditions",
        "description": "Versatile two-layer pouch providing a glossy printed exterior with good barrier protection for short-to-medium shelf life.",
        "sustainability_notes": "Multi-material laminate requires optical sorting or energy recovery."
    },
    {
        "name": "High-Barrier Metallized Pouch (BOPP / Met-PET / PE)",
        "category": "High Barrier Foil Alternative",
        "materials": "BOPP (20µm) / Met-PET (12µm) / LLDPE (50µm)",
        "thickness_range": "80–110 µm",
        "suitable_products": "Potato chips, Biscuits, Spices, Paneer, Meat",
        "suitable_storage": "Room temperature, Refrigerated",
        "barrier_rating": "High Oxygen, Moisture & Light Barrier",
        "cost_tier": "Recommended",
        "cost_level": "Medium ($$)",
        "sustainability_level": "Medium (Metallized layer)",
        "otr_approx": "1.0 - 5.0 cc/m²/day",
        "wvtr_approx": "0.5 - 1.5 g/m²/day",
        "sealability": "Excellent hermetic seal for gas retention",
        "mechanical_protection": "Excellent burst strength suitable for long-distance transport",
        "map_suitability": "Ideal for 100% Nitrogen gas flushing (N2)",
        "storage_recommendation": "Keep away from sharp physical punctures in ambient dark storage",
        "description": "The industry standard for snack foods and crisp products requiring nitrogen flush to eliminate oxygen and prevent sogginess.",
        "sustainability_notes": "Provides high barrier performance without heavy aluminum foil layer."
    },
    {
        "name": "Ultra-Barrier Aluminum Foil Pouch (PET / AL / PE)",
        "category": "Maximum Barrier Foil Pouch",
        "materials": "PET (12µm) / Aluminum Foil (7µm) / PE (70µm)",
        "thickness_range": "90–130 µm",
        "suitable_products": "Potato chips, Spices, Meat, Paneer, Milk",
        "suitable_storage": "Room temperature, Refrigerated",
        "barrier_rating": "Ultra High (Zero Light & Gas Transmission)",
        "cost_tier": "Premium",
        "cost_level": "High ($$$)",
        "sustainability_level": "Lower (High embodied energy foil)",
        "otr_approx": "< 0.1 cc/m²/day",
        "wvtr_approx": "< 0.1 g/m²/day",
        "sealability": "Heavy-duty hermetic heat seal band",
        "mechanical_protection": "Superior puncture, drop, and pressure resistance for export logistics",
        "map_suitability": "Best-in-class MAP and retort stability",
        "storage_recommendation": "Store in rugged master cartons across extreme climate zones",
        "description": "Maximum barrier pouch completely blocking oxygen, moisture, light, and odor migration for extended shelf life up to 12+ months.",
        "sustainability_notes": "Aluminum layer provides total protection; consider mono-PE high barrier as recyclable alternative."
    },
    {
        "name": "Paper-Based Bio-Barrier Pouch",
        "category": "Sustainable Eco Packaging",
        "materials": "FSC Kraft Paper (50gsm) / Bio-PE or Water-based Coating",
        "thickness_range": "75–100 µm",
        "suitable_products": "Rice, Wheat, Spices, Biscuits, Apple, Potato",
        "suitable_storage": "Room temperature",
        "barrier_rating": "Moderate Eco Barrier",
        "cost_tier": "Recommended",
        "cost_level": "Medium ($$)",
        "sustainability_level": "High (Potentially lower carbon footprint, paper recyclable)",
        "otr_approx": "150 - 300 cc/m²/day",
        "wvtr_approx": "8 - 18 g/m²/day",
        "sealability": "Low-temperature heat sealable coating",
        "mechanical_protection": "Sturdy natural paper feel with moderate burst strength",
        "map_suitability": "Limited gas retention",
        "storage_recommendation": "Store in dry room temperature environment away from direct water splashes",
        "description": "Eco-conscious paper packaging offering a premium organic look with lower plastic content.",
        "sustainability_notes": "FSC certified paper base with thin seal layer for repulpability in paper streams."
    },
    {
        "name": "Recyclable Mono-Material High-Barrier Pouch (MDO-PE / EVOH-PE / PE)",
        "category": "Next-Gen Eco High Barrier",
        "materials": "MDO-PE (25µm) / EVOH-PE (50µm)",
        "thickness_range": "75–100 µm",
        "suitable_products": "Potato chips, Biscuits, Spices, Paneer, Meat, Frozen food",
        "suitable_storage": "Room temperature, Refrigerated, Frozen",
        "barrier_rating": "High Recyclable Barrier",
        "cost_tier": "Premium",
        "cost_level": "High ($$$)",
        "sustainability_level": "Very High (100% Recyclable Mono-PE Stream)",
        "otr_approx": "2.0 - 8.0 cc/m²/day",
        "wvtr_approx": "1.0 - 2.5 g/m²/day",
        "sealability": "High integrity low-temp heat seal",
        "mechanical_protection": "High puncture and flex-crack resistance",
        "map_suitability": "Excellent for modified atmosphere packaging",
        "storage_recommendation": "Store under standard dry or refrigerated warehouse conditions",
        "description": "Cutting-edge mono-material structure designed for circular economy while preserving high moisture and oxygen protection.",
        "sustainability_notes": "Fully compatible with standard PE recycling infrastructure (RIC #4)."
    },
    {
        "name": "Industrially Compostable PLA / PBAT Bio-Film",
        "category": "Compostable Eco Packaging",
        "materials": "PLA / PBAT Compostable Polymer Blend",
        "thickness_range": "30–50 µm",
        "suitable_products": "Fresh vegetables, Strawberry, Apple, Rice, Wheat",
        "suitable_storage": "Room temperature, Refrigerated",
        "barrier_rating": "Low-to-Medium Bio Barrier",
        "cost_tier": "Premium",
        "cost_level": "High ($$$)",
        "sustainability_level": "High (Compostable under industrial facility)",
        "otr_approx": "400 - 800 cc/m²/day",
        "wvtr_approx": "25 - 40 g/m²/day",
        "sealability": "Modest thermal seal requiring narrow temperature window",
        "mechanical_protection": "Soft flexible feel, moderate tear resistance",
        "map_suitability": "Unsuitable for long-term gas flushing",
        "storage_recommendation": "Store below 30°C and away from high humidity prior to use",
        "description": "Plant-derived compostable film designed to disintegrate in industrial composting facilities.",
        "sustainability_notes": "Requires industrial composting facilities; check local municipal organic waste guidelines."
    }
]

def seed_database(db):
    # Check if data exists
    if db.query(FoodProduct).first() is not None:
        return
    
    for item in SAMPLE_FOOD_PRODUCTS:
        fp = FoodProduct(**item)
        db.add(fp)
        
    for item in SAMPLE_PACKAGING_MATERIALS:
        pm = PackagingMaterial(**item)
        db.add(pm)

    for item in SAMPLE_PACKAGING_STRUCTURES:
        ps = PackagingStructure(**item)
        db.add(ps)

    db.commit()
