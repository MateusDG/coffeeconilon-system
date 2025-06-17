from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.core.database import SessionLocal
from app.schemas.crop import CropCreate, CropRead, CropUpdate
from app.crud.crud_crop import (
    get_crop,
    get_crops,
    create_crop,
    update_crop,
    delete_crop,
)

router = APIRouter(prefix="/crops", tags=["crops"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=CropRead, status_code=status.HTTP_201_CREATED)
def create_new_crop(crop_in: CropCreate, db: Session = Depends(get_db)):
    return create_crop(db, crop_in)


@router.get("/", response_model=List[CropRead])
def read_crops(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_crops(db, skip, limit)


@router.get("/{crop_id}", response_model=CropRead)
def read_crop(crop_id: int, db: Session = Depends(get_db)):
    db_crop = get_crop(db, crop_id)
    if not db_crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found")
    return db_crop


@router.put("/{crop_id}", response_model=CropRead)
def update_existing_crop(crop_id: int, crop_in: CropUpdate, db: Session = Depends(get_db)):
    db_crop = get_crop(db, crop_id)
    if not db_crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found")
    return update_crop(db, db_crop, crop_in)


@router.delete("/{crop_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_crop(crop_id: int, db: Session = Depends(get_db)):
    db_crop = get_crop(db, crop_id)
    if not db_crop:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Crop not found")
    delete_crop(db, db_crop)
    return
