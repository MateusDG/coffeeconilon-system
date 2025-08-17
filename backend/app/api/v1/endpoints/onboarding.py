from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db, get_current_user
from app.models.farm import Farm
from app.models.lot import Lot
from app.models.crop import Crop
from app.models.financial import Financial
from app.models.stock import Stock

router = APIRouter(prefix="/onboarding", tags=["onboarding"], dependencies=[Depends(get_current_user)])


@router.get("/status")
def onboarding_status(db: Session = Depends(get_db)):
    return {
        "hasFarm": db.query(Farm).first() is not None,
        "hasLot": db.query(Lot).first() is not None,
        "hasCrop": db.query(Crop).first() is not None,
        "hasFinancial": db.query(Financial).first() is not None,
        "hasStock": db.query(Stock).first() is not None,
    }

