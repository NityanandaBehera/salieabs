from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
from  models.user_models import Customer
from schemas.user_schema import Customer as CustomerSchema, CustomerCreate

router = APIRouter(prefix="/user", tags=["User"])

# Get all customers
@router.get("/customers", response_model=list[CustomerSchema])
def read_customers(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    customers = db.query(Customer).offset(skip).limit(limit).all()
    if not customers:
        return []  # Explicitly return an empty list if no customers are found
    return customers


# Create a new customer
@router.post("/customers", response_model=CustomerSchema)
def create_customer_route(customer: CustomerCreate, db: Session = Depends(get_db)):
    # Ensure email uniqueness
    db_customer = db.query(Customer).filter(Customer.email == customer.email).first()
    if db_customer:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_customer = Customer(**customer.dict())
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer
