from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import FoodProduct
from app.schemas import FoodProductSchema
from typing import List

router = APIRouter(prefix="/api/products", tags=["products"])

@router.get("", response_model=List[FoodProductSchema])
def get_products(db: Session = Depends(get_db)):
    return db.query(FoodProduct).order_by(FoodProduct.name).all()
