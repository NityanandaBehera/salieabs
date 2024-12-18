from pydantic import BaseModel, EmailStr
from typing import Optional

class CustomerBase(BaseModel):
    name: str
    email: EmailStr
    country: Optional[str] = None  # Country is optional

class CustomerCreate(CustomerBase):
    pass  # Used for creating new customers

class Customer(CustomerBase):
    id: int  # Add the ID field for responses

    class Config:
        orm_mode = True  # Enable compatibility with ORM models

