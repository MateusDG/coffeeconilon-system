from fastapi import APIRouter
from app.models.enums import FinancialCategory, StockUnit, MovementType, FinancialType

router = APIRouter(prefix="/meta", tags=["meta"])


@router.get("/enums")
def get_enums():
    return {
        "financial_categories": [e.value for e in FinancialCategory],
        "stock_units": [e.value for e in StockUnit],
        "movement_types": [e.value for e in MovementType],
        "financial_types": [e.value for e in FinancialType],
    }

