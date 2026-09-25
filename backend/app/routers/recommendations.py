import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import RecommendationRecord
from app.schemas import RecommendationRequest, RecommendationResponse
from app.engine import evaluate_recommendations
from typing import List, Dict, Any

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])

@router.post("", response_model=RecommendationResponse)
def create_recommendation(request: RecommendationRequest, db: Session = Depends(get_db)):
    req_dict = request.model_dump()
    result = evaluate_recommendations(db, req_dict)
    
    # Save record in database
    rec_record = RecommendationRecord(
        product_name=result["product"],
        input_data_json=json.dumps(req_dict),
        result_data_json=json.dumps(result)
    )
    db.add(rec_record)
    db.commit()
    db.refresh(rec_record)
    
    result["id"] = rec_record.id
    return result

@router.get("", response_model=List[Dict[str, Any]])
def get_recommendation_history(db: Session = Depends(get_db)):
    records = db.query(RecommendationRecord).order_by(RecommendationRecord.created_at.desc()).all()
    history = []
    for r in records:
        data = json.loads(r.result_data_json)
        data["id"] = r.id
        data["created_at"] = r.created_at.isoformat()
        history.append(data)
    return history

@router.get("/{rec_id}", response_model=RecommendationResponse)
def get_recommendation_by_id(rec_id: int, db: Session = Depends(get_db)):
    record = db.query(RecommendationRecord).filter(RecommendationRecord.id == rec_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Recommendation record not found")
    data = json.loads(record.result_data_json)
    data["id"] = record.id
    return data
