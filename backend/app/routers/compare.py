from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import PackagingStructure
from app.schemas import ComparisonRequest
from typing import List, Dict, Any

router = APIRouter(prefix="/api/compare", tags=["compare"])

@router.get("", response_model=List[Dict[str, Any]])
def get_all_structures_for_comparison(db: Session = Depends(get_db)):
    structures = db.query(PackagingStructure).all()
    res = []
    for s in structures:
        res.append({
            "name": s.name,
            "category": s.category,
            "materials": s.materials,
            "thickness_range": s.thickness_range,
            "barrier_rating": s.barrier_rating,
            "cost_level": s.cost_level,
            "sustainability_level": s.sustainability_level,
            "otr_approx": s.otr_approx,
            "wvtr_approx": s.wvtr_approx,
            "sealability": s.sealability,
            "mechanical_protection": s.mechanical_protection,
            "map_suitability": s.map_suitability,
            "suitable_storage": s.suitable_storage
        })
    return res

@router.post("", response_model=List[Dict[str, Any]])
def compare_packaging_options(request: ComparisonRequest, db: Session = Depends(get_db)):
    structures = db.query(PackagingStructure).filter(PackagingStructure.name.in_(request.option_names)).all()
    comparison = []
    for s in structures:
        comparison.append({
            "name": s.name,
            "category": s.category,
            "materials": s.materials,
            "thickness_range": s.thickness_range,
            "protection": s.barrier_rating,
            "estimated_cost": s.cost_level,
            "sustainability": s.sustainability_level,
            "shelf_life_suitability": "High" if "High" in s.barrier_rating or "Ultra" in s.barrier_rating else "Moderate",
            "transportation_suitability": "High" if "High" in s.mechanical_protection or "Superior" in s.mechanical_protection else "Standard",
            "otr": s.otr_approx,
            "wvtr": s.wvtr_approx,
            "sealability": s.sealability,
            "map_suitability": s.map_suitability
        })
    return comparison
