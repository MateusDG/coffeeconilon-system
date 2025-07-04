from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.dependencies import get_db, get_current_user
from app.schemas.farm import FarmCreate, FarmRead, FarmUpdate
from app.crud.crud_farm import (
    get_farm,
    get_farms,
    create_farm,
    update_farm,
    delete_farm,
)

router = APIRouter(
    prefix="/farms",
    tags=["farms"],
    dependencies=[Depends(get_current_user)],
)

@router.post("", response_model=FarmRead, status_code=status.HTTP_201_CREATED)
def create_new_farm(farm_in: FarmCreate, db: Session = Depends(get_db)):
    farm = create_farm(db, farm_in)
    return farm


@router.get("", response_model=List[FarmRead])
def read_farms(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_farms(db, skip, limit)


@router.get("/{farm_id}", response_model=FarmRead)
def read_farm(farm_id: int, db: Session = Depends(get_db)):
    farm = get_farm(db, farm_id)
    if not farm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found")
    return farm


@router.put("/{farm_id}", response_model=FarmRead)
def update_existing_farm(farm_id: int, farm_in: FarmUpdate, db: Session = Depends(get_db)):
    db_farm = get_farm(db, farm_id)
    if not db_farm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found")
    return update_farm(db, db_farm, farm_in)


@router.delete("/{farm_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_farm(farm_id: int, db: Session = Depends(get_db)):
    db_farm = get_farm(db, farm_id)
    if not db_farm:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Farm not found")
    delete_farm(db, db_farm)
    return
