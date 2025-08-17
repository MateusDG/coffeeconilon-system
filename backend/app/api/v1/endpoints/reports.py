from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.dependencies import get_current_user
from app.schemas.report import ReportFilter, ReportResponse
from app.crud.crud_report import generate_report

<<<<<<< HEAD
router = APIRouter(prefix="/reports", tags=["reports"]) 
=======
<<<<<<< HEAD
router = APIRouter(prefix="/reports", tags=["reports"]) 
=======
router = APIRouter(prefix="/reports", tags=["reports"], dependencies=[Depends(get_current_user)])
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7
>>>>>>> 4914531166dc64f262a3e7a175a794f80a9547a7

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ReportResponse)
def get_report(
    filters: ReportFilter,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return generate_report(db, filters)

@router.get("", response_model=ReportResponse)
def read_report(
<<<<<<< HEAD
    farm_id: int | None = Query(None),
    start_date: str | None = Query(None),
    end_date: str | None = Query(None),
    lot_id: int | None = Query(None),
    crop_id: int | None = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Return a report with optional filters."""
    filters = ReportFilter(start_date=start_date, end_date=end_date, lot_id=lot_id, crop_id=crop_id, farm_id=farm_id)
    return generate_report(db, filters)
=======
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Return an unfiltered report."""
    return generate_report(db, ReportFilter())
>>>>>>> 4914531166dc64f262a3e7a175a794f80a9547a7
