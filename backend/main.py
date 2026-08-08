from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from backend.logger import logger
from backend.errors import setup_exception_handlers
from authentication.router import router as auth_router
from patient.router import router as patient_router
from rag.router import router as rag_router

app = FastAPI(
    title="MediBot 3.0 API",
    description="Core API Gateway for MediBot",
    version="1.0.0"
)

# CORS Configuration - Crucial for HttpOnly Cookies with React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup error handlers
setup_exception_handlers(app)

# API Versioning Router
api_router_v1 = APIRouter(prefix="/api/v1")

@api_router_v1.get("/health")
async def health_check():
    logger.info("Health check endpoint called")
    return {"status": "ok", "version": "1.0.0"}

# Include sub-routers
api_router_v1.include_router(auth_router)
api_router_v1.include_router(patient_router)
api_router_v1.include_router(rag_router)

# Include main API router
app.include_router(api_router_v1)
