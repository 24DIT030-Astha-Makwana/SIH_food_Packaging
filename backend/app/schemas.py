from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class RecommendationRequest(BaseModel):
    product: str
    custom_product_name: Optional[str] = None
    shelf_life: str
    storage: str
    transportation: str
    priority: str = "Balanced"
    problem: Optional[str] = "No major problem"
    food_category: Optional[str] = None
    desired_shelf_life: Optional[str] = None
    storage_type: Optional[str] = None
    storage_temperature: Optional[str] = None
    relative_humidity: Optional[str] = None
    handling_level: Optional[str] = None
    category_details: Optional[Dict[str, Any]] = None
    moisture_content: Optional[float] = None
    moisture_known: Optional[bool] = False
    fat_content: Optional[float] = None
    fat_known: Optional[bool] = False
    fat_applicable: Optional[bool] = True
    ph_value: Optional[float] = None
    ph_known: Optional[bool] = False
    ph_applicable: Optional[bool] = True
    respiration_rate_val: Optional[float] = None
    respiration_known: Optional[bool] = False
    respiration_applicable: Optional[bool] = True

class PackagingOption(BaseModel):
    tier: str  # Budget, Recommended, Premium
    name: str
    category: str
    materials: str
    cost_level: str
    protection_level: str
    sustainability_level: str
    suitability: str  # High, Good, Moderate
    match_score: float
    description: str
    technical_details: Dict[str, Any]

class SustainableAlternative(BaseModel):
    name: str
    material: str
    differ_from_recommended: str
    sustainability_advantage: str
    performance_tradeoff: str
    cost_tradeoff: str

class PackagingGenome(BaseModel):
    protection: str
    moisture_protection: str
    oxygen_protection: str
    strength: str
    cost: str
    sustainability: str
    genome_vector: Dict[str, float]

class FoodDigitalTwin(BaseModel):
    name: str
    category: str
    moisture_sensitivity: str
    oxygen_sensitivity: str
    respiration_class: str
    temperature_sensitivity: str
    typical_storage: str
    typical_shelf_life: str
    notes: Optional[str] = None

class RecommendationResponse(BaseModel):
    id: Optional[int] = None
    product: str
    input_summary: Dict[str, str]
    confidence_level: str  # High, Medium, Limited data
    confidence_reason: str
    food_digital_twin: FoodDigitalTwin
    recommended_packaging: PackagingOption
    why_recommended: List[str]
    options: List[PackagingOption]  # Budget, Recommended, Premium
    sustainable_alternative: SustainableAlternative
    packaging_genome: PackagingGenome
    disclaimer: str

class DoctorRequest(BaseModel):
    product: str
    problem_description: str

class DoctorDiagnosis(BaseModel):
    possible_causes: List[str]
    recommended_improvements: List[str]
    alternative_packaging: List[str]
    validation_info_needed: List[str]

class SimulatorRequest(BaseModel):
    original_input: RecommendationRequest
    modified_storage: Optional[str] = None
    modified_shelf_life: Optional[str] = None
    modified_transportation: Optional[str] = None
    modified_priority: Optional[str] = None

class SimulatorResponse(BaseModel):
    original_recommendation: RecommendationResponse
    updated_recommendation: RecommendationResponse
    what_changed: List[str]

class ComparisonRequest(BaseModel):
    option_names: List[str]

class FoodProductSchema(BaseModel):
    id: int
    name: str
    category: str
    typical_storage: str
    moisture_sensitivity: str
    oxygen_sensitivity: str
    respiration_class: str
    temperature_sensitivity: str
    typical_shelf_life: str

    class Config:
        from_attributes = True
