from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import SessionLocal
from app.schemas.financial import FinancialCreate, FinancialRead, FinancialUpdate
from app.crud.crud_financial import (
    get_record,
    get_records,
    create_record,
    update_record,
    delete_record,
)

router = APIRouter(prefix="/financial", tags=["financial"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=FinancialRead, status_code=status.HTTP_201_CREATED)
def create_new_record(record_in: FinancialCreate, db: Session = Depends(get_db)):
    return create_record(db, record_in)


@router.get("/", response_model=List[FinancialRead])
def read_records(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_records(db, skip, limit)


@router.get("/{record_id}", response_model=FinancialRead)
def read_record(record_id: int, db: Session = Depends(get_db)):
    db_record = get_record(db, record_id)
    if not db_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    return db_record


@router.put("/{record_id}", response_model=FinancialRead)
def update_existing_record(record_id: int, record_in: FinancialUpdate, db: Session = Depends(get_db)):
    db_record = get_record(db, record_id)
    if not db_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    return update_record(db, db_record, record_in)


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_record(record_id: int, db: Session = Depends(get_db)):
    db_record = get_record(db, record_id)
    if not db_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    delete_record(db, db_record)
    return
