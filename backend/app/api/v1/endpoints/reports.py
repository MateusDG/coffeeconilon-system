from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.schemas.report import ReportFilter, ReportResponse
from app.crud.crud_report import generate_report

router = APIRouter(prefix="/reports", tags=["reports"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=ReportResponse)
def get_report(filters: ReportFilter, db: Session = Depends(get_db)):
    return generate_report(db, filters)

@router.get("", response_model=ReportResponse)
def read_report(db: Session = Depends(get_db)):
    """Return an unfiltered report."""
    return generate_report(db, ReportFilter())
