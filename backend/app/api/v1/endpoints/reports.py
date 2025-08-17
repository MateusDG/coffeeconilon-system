from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.dependencies import get_current_user
from app.schemas.report import ReportFilter, ReportResponse
from app.crud.crud_report import generate_report

<<<<<<< HEAD
router = APIRouter(prefix="/reports", tags=["reports"]) 
=======
router = APIRouter(prefix="/reports", tags=["reports"], dependencies=[Depends(get_current_user)])
>>>>>>> f6f6062c025764201dbbdd388fe040b7b4011fa7

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
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    """Return an unfiltered report."""
    return generate_report(db, ReportFilter())
