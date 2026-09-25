from fastapi import APIRouter
from app.schemas import DoctorRequest, DoctorDiagnosis
from app.engine import diagnose_packaging_problem

router = APIRouter(prefix="/api/doctor", tags=["doctor"])

@router.post("/diagnose", response_model=DoctorDiagnosis)
def diagnose_problem(request: DoctorRequest):
    return diagnose_packaging_problem(request.product, request.problem_description)
