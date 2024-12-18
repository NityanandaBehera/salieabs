from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from faker import Faker
from db import get_db


app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Faker to generate fake data
fake = Faker()


    
#     # Add some fake customer data if the table is empty
#     db = next(get_db())
#     add_fake_data(db)

# def add_fake_data(db: Session, num_records: int = 100):
#     # Generate fake customers and add to the database
#     for _ in range(num_records):
#         fake_name = fake.name()
#         fake_email = fake.email()
#         fake_country = fake.country()
        
#         # Create a new Customer instance
#         new_customer = Customer(
#             name=fake_name,
#             email=fake_email,
#             country=fake_country
#         )
        
#         # Add the customer to the session and commit
#         db.add(new_customer)
#     db.commit()
#     print(f"Inserted {num_records} fake customers into the database.")

@app.get("/")
def index():
    return {'detail': "API testing working successfully."}

# Include routes from user_routes
from routes import user_routes
app.include_router(user_routes.router)
