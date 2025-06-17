# backend/app/main.py

from fastapi import FastAPI
from app.core.config import settings
from app.core.database import Base, engine

# 1) Importa todos os modelos para que o SQLAlchemy conheça as classes
#    antes de executarmos o create_all().
import app.models  # noqa

# 2) Importa o router de usuários
from app.api.v1.endpoints.users import router as users_router

# 3) Cria a aplicação FastAPI
app = FastAPI(title=settings.PROJECT_NAME)

# 4) Cria **todas** as tabelas no banco (SQLite, no seu caso)
Base.metadata.create_all(bind=engine)

# 6) Endpoint de health-check
@app.get("/ping", tags=["health"])
def ping():
    return {"message": "pong"}
