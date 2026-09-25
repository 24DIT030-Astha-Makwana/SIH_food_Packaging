from fastapi import APIRouter, Response
from app.pdf_generator import generate_pdf_report
from typing import Dict, Any

router = APIRouter(prefix="/api/reports", tags=["reports"])

@router.post("/download")
def download_pdf_report(recommendation_data: Dict[str, Any]):
    pdf_bytes = generate_pdf_report(recommendation_data)
    product_name = recommendation_data.get("product", "food_product").replace(" ", "_").lower()
    filename = f"packtwin_recommendation_{product_name}.pdf"

    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
