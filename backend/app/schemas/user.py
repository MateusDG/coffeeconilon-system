# backend/app/schemas/user.py

from pydantic import BaseModel, EmailStr
from typing import Optional


class UserBase(BaseModel):
    name: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int
    is_active: bool

    model_config = {
        "from_attributes": True
    }


class UserUpdate(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    is_active: Optional[bool]

