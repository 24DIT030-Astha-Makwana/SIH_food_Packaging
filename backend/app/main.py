from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base, SessionLocal
from app.seed_data import seed_database
from app.routers import products, recommendations, doctor, simulator, compare, reports

# Create database tables
Base.metadata.create_all(bind=engine)

# Seed database with initial sample data
db = SessionLocal()
try:
    seed_database(db)
finally:
    db.close()

app = FastAPI(
    title="Eco-PackAI API",
    description="Smart Food Packaging Advisor Recommendation & Decision Engine",
    version="1.0.0"
)

# Enable CORS for Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(recommendations.router)
app.include_router(doctor.router)
app.include_router(simulator.router)
app.include_router(compare.router)
app.include_router(reports.router)

@app.get("/api/health")
def health_check():
    return {"status": "ok", "service": "Eco-PackAI Engine"}


