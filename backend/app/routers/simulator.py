from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import SimulatorRequest, SimulatorResponse
from app.engine import evaluate_recommendations

router = APIRouter(prefix="/api/simulator", tags=["simulator"])

@router.post("/simulate", response_model=SimulatorResponse)
def simulate_what_if(request: SimulatorRequest, db: Session = Depends(get_db)):
    orig_dict = request.original_input.model_dump()
    orig_rec = evaluate_recommendations(db, orig_dict)

    # Build modified dictionary
    mod_dict = dict(orig_dict)
    what_changed = []

    if request.modified_storage and request.modified_storage != orig_dict["storage"]:
        what_changed.append(f"Storage condition changed from '{orig_dict['storage']}' to '{request.modified_storage}'")
        mod_dict["storage"] = request.modified_storage

    if request.modified_shelf_life and request.modified_shelf_life != orig_dict["shelf_life"]:
        what_changed.append(f"Target shelf life changed from '{orig_dict['shelf_life']}' to '{request.modified_shelf_life}'")
        mod_dict["shelf_life"] = request.modified_shelf_life

    if request.modified_transportation and request.modified_transportation != orig_dict["transportation"]:
        what_changed.append(f"Transportation distance changed from '{orig_dict['transportation']}' to '{request.modified_transportation}'")
        mod_dict["transportation"] = request.modified_transportation

    if request.modified_priority and request.modified_priority != orig_dict["priority"]:
        what_changed.append(f"Business priority changed from '{orig_dict['priority']}' to '{request.modified_priority}'")
        mod_dict["priority"] = request.modified_priority

    if not what_changed:
        what_changed.append("No parameters were changed.")

    mod_rec = evaluate_recommendations(db, mod_dict)

    # Add change notes to what_changed array based on recommendation differences
    orig_name = orig_rec["recommended_packaging"]["name"]
    mod_name = mod_rec["recommended_packaging"]["name"]

    if orig_name != mod_name:
        what_changed.append(f"Recommended packaging structure updated from '{orig_name}' to '{mod_name}'. Higher barrier protection or alternative mechanical properties are required under modified conditions.")
    else:
        what_changed.append("Recommended packaging structure remains optimal, but internal barrier margins and storage recommendations were updated.")

    return {
        "original_recommendation": orig_rec,
        "updated_recommendation": mod_rec,
        "what_changed": what_changed
    }
