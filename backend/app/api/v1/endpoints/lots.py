from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import SessionLocal
from app.schemas.lot import LotCreate, LotRead, LotUpdate
from app.crud.crud_lot import (
    get_lot,
    get_lots,
    create_lot,
    update_lot,
    delete_lot,
)

router = APIRouter(prefix="/lots", tags=["lots"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=LotRead, status_code=status.HTTP_201_CREATED)
def create_new_lot(lot_in: LotCreate, db: Session = Depends(get_db)):
    return create_lot(db, lot_in)


@router.get("/", response_model=List[LotRead])
def read_lots(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_lots(db, skip, limit)


@router.get("/{lot_id}", response_model=LotRead)
def read_lot(lot_id: int, db: Session = Depends(get_db)):
    db_lot = get_lot(db, lot_id)
    if not db_lot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lot not found")
    return db_lot


@router.put("/{lot_id}", response_model=LotRead)
def update_existing_lot(lot_id: int, lot_in: LotUpdate, db: Session = Depends(get_db)):
    db_lot = get_lot(db, lot_id)
    if not db_lot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lot not found")
    return update_lot(db, db_lot, lot_in)


@router.delete("/{lot_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_lot(lot_id: int, db: Session = Depends(get_db)):
    db_lot = get_lot(db, lot_id)
    if not db_lot:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lot not found")
    delete_lot(db, db_lot)
    return
