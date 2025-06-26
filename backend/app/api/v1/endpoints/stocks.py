from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.dependencies import get_db, get_current_user
from app.schemas.stock import StockCreate, StockRead, StockUpdate
from app.crud.crud_stock import (
    get_movement,
    get_movements,
    create_movement,
    update_movement,
    delete_movement,
)

router = APIRouter(
    prefix="/stocks",
    tags=["stocks"],
    dependencies=[Depends(get_current_user)],
)

@router.post("/", response_model=StockRead, status_code=status.HTTP_201_CREATED)
def create_new_movement(stock_in: StockCreate, db: Session = Depends(get_db)):
    return create_movement(db, stock_in)


@router.get("/", response_model=List[StockRead])
def read_movements(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return get_movements(db, skip, limit)


@router.get("/{movement_id}", response_model=StockRead)
def read_movement(movement_id: int, db: Session = Depends(get_db)):
    db_mov = get_movement(db, movement_id)
    if not db_mov:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movement not found")
    return db_mov


@router.put("/{movement_id}", response_model=StockRead)
def update_existing_movement(movement_id: int, stock_in: StockUpdate, db: Session = Depends(get_db)):
    db_mov = get_movement(db, movement_id)
    if not db_mov:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movement not found")
    return update_movement(db, db_mov, stock_in)


@router.delete("/{movement_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_existing_movement(movement_id: int, db: Session = Depends(get_db)):
    db_mov = get_movement(db, movement_id)
    if not db_mov:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Movement not found")
    delete_movement(db, db_mov)
    return
