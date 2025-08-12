# backend/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import Base, engine

# 1) Importa todos os modelos para que o SQLAlchemy conheça as classes
import app.models  # noqa

# Importa routers
from app.api.v1.endpoints.users import router as users_router
from app.api.v1.endpoints.auth import router as auth_router
from app.api.v1.endpoints.farms import router as farms_router
from app.api.v1.endpoints.lots import router as lots_router
from app.api.v1.endpoints.crops import router as crops_router
from app.api.v1.endpoints.financial import router as financial_router
from app.api.v1.endpoints.stocks import router as stocks_router
from app.api.v1.endpoints.reports import router as reports_router
from app.api.v1.endpoints.meta import router as meta_router
from app.api.v1.endpoints.onboarding import router as onboarding_router

app = FastAPI(title=settings.PROJECT_NAME)

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r".*",  # broaden for local/dev tools
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cria as tabelas no banco
Base.metadata.create_all(bind=engine)

# Inclui routers
app.include_router(users_router)
app.include_router(auth_router)
app.include_router(farms_router)
app.include_router(lots_router)
app.include_router(crops_router)
app.include_router(financial_router)
app.include_router(stocks_router)
app.include_router(reports_router)
app.include_router(meta_router)
app.include_router(onboarding_router)


@app.get("/ping", tags=["health"])
def ping():
    return {"message": "pong"}
