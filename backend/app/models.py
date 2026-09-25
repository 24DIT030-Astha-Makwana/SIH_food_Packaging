from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from app.database import Base

class FoodProduct(Base):
    __tablename__ = "food_products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=False)
    typical_storage = Column(String(100), nullable=False)
    moisture_sensitivity = Column(String(50), nullable=False)  # Low, Medium, High, Critical
    oxygen_sensitivity = Column(String(50), nullable=False)    # Low, Medium, High, Critical
    respiration_class = Column(String(50), nullable=False)     # None, Low, Moderate, High, Extremely High
    temperature_sensitivity = Column(String(100), nullable=False)
    typical_shelf_life = Column(String(100), nullable=False)
    notes = Column(Text, nullable=True)

class PackagingMaterial(Base):
    __tablename__ = "packaging_materials"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=False)
    oxygen_barrier = Column(String(50), nullable=False)       # Low, Medium, High, Very High
    moisture_barrier = Column(String(50), nullable=False)     # Low, Medium, High, Very High
    mechanical_strength = Column(String(50), nullable=False)  # Low, Medium, High, Extreme
    sealability = Column(String(50), nullable=False)          # Fair, Good, Excellent
    sustainability_level = Column(String(100), nullable=False)
    cost_level = Column(String(50), nullable=False)            # Low ($), Medium ($$), High ($$$)
    temperature_suitability = Column(String(100), nullable=False)
    map_suitability = Column(String(50), nullable=False)

class PackagingStructure(Base):
    __tablename__ = "packaging_structures"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), unique=True, index=True, nullable=False)
    category = Column(String(100), nullable=False)
    materials = Column(String(200), nullable=False)
    thickness_range = Column(String(100), nullable=False)
    suitable_products = Column(Text, nullable=False)  # JSON or comma-separated
    suitable_storage = Column(String(100), nullable=False)
    barrier_rating = Column(String(50), nullable=False)  # Medium, High, Ultra High
    cost_tier = Column(String(50), nullable=False)  # Budget, Recommended, Premium
    cost_level = Column(String(50), nullable=False)  # Low ($), Medium ($$), High ($$$)
    sustainability_level = Column(String(100), nullable=False)
    otr_approx = Column(String(100), nullable=False)
    wvtr_approx = Column(String(100), nullable=False)
    sealability = Column(String(150), nullable=False)
    mechanical_protection = Column(String(150), nullable=False)
    map_suitability = Column(String(150), nullable=False)
    storage_recommendation = Column(Text, nullable=False)
    description = Column(Text, nullable=False)
    sustainability_notes = Column(Text, nullable=True)

class RecommendationRecord(Base):
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String(100), nullable=False)
    input_data_json = Column(Text, nullable=False)
    result_data_json = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
