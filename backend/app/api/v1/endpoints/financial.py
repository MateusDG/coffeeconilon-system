from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from typing import List

from app.dependencies import get_db, get_current_user
from app.schemas.financial import FinancialCreate, FinancialRead, FinancialUpdate
from app.crud.crud_financial import (
    get_record,
    get_records,
    create_record,
    update_record,
    delete_record,
)

router = APIRouter(
    prefix="/financial",
    tags=["financial"],
)

@router.post("", response_model=FinancialRead, status_code=status.HTTP_201_CREATED)
def create_new_record(
    record_in: FinancialCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_record(db, record_in)


@router.get("", response_model=List[FinancialRead])
def read_records(
    skip: int = 0,
    limit: int = 100,
<<<<<<< HEAD
    farm_id: int | None = Query(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_records(db, skip=skip, limit=limit, farm_id=farm_id)
=======
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_records(db, skip, limit)
>>>>>>> 4914531166dc64f262a3e7a175a794f80a9547a7


@router.get("/{record_id}", response_model=FinancialRead)
def read_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    db_record = get_record(db, record_id)
    if not db_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    return db_record


@router.put("/{record_id}", response_model=FinancialRead)
def update_existing_record(
    record_id: int,
    record_in: FinancialUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    db_record = get_record(db, record_id)
    if not db_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    return update_record(db, db_record, record_in)


@router.delete("/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_record(
    record_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    db_record = get_record(db, record_id)
    if not db_record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Record not found")
    delete_record(db, db_record)
    return
