from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CoffeeConilon"
    DB_URL: str = "postgresql://postgres:postgres@localhost:5432/coffeeconilon"
    SECRET_KEY: str = "dev-secret"
    DEBUG: bool = True

    class Config:
        env_file = ".env"

settings = Settings()
