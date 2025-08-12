# Repository Guidelines

## Project Structure & Modules
- `backend/`: FastAPI app (`app/` with `api/v1/endpoints`, `models`, `schemas`, `core`), tests in `backend/tests/`, local DB `dev.db` and `.env`.
- `frontend/`: React + TypeScript (Vite). Entry `src/main.tsx`, pages in `src/pages`, shared components in `src/components`.
- `docs/`: Release notes and project PDF. `docker-compose.yml` wires backend (8000) and frontend (3000).

## Build, Test, and Dev
- Backend (Python 3.11):
  - `cd backend && pip install -r requirements.txt`
  - `uvicorn app.main:app --reload` (http://localhost:8000)
- Frontend (Node 18+):
  - `cd frontend && npm install`
  - `npm run dev` (http://localhost:5173) or `npm run build && npm run preview`
- Docker (recommended for full stack):
  - `docker compose up --build`
- Tests (backend):
  - `pip install pytest` then `pytest backend/tests -q`

## Data Formats & Validation
- Dates: ISO `YYYY-MM-DD` via API; UI shows `DD/MM/YYYY`.
- Currency: decimals with 2 places (BRL in UI).
- Financial categories: enum (`sale`, `cost`, `service`, `input`, `labor`, `tax`).
- Stock units: enum (`kg`, `sc`, `t`, `un`).
- Reports require auth; use `GET /auth/me` to validate tokens.

## Coding Style & Naming
- Python: PEP 8, 4-space indent, `snake_case` for functions/vars, `PascalCase` for Pydantic schemas and SQLAlchemy models. Place new APIs under `app/api/v1/endpoints/<feature>.py`; CRUD in `app/crud/`.
- TypeScript/React: `PascalCase` components in `src/components` and `src/pages`; hooks in `src/hooks`; keep API calls in `src/services`. Prefer functional components and MUI patterns already used.
- Keep route paths without trailing slashes (see recent fixes).

## APIs Added
- `GET /auth/me`: validate current user.
- `GET /meta/enums`: lists categories/units/types.
- `GET /onboarding/status`: first-run guidance flags.
- `/reports` requires auth.

## Testing Guidelines
- Framework: `pytest` with file pattern `test_*.py` (see `backend/tests`).
- Use in-memory SQLite in tests (example in `test_auth.py`), avoid coupling to `dev.db`.
- Add tests alongside features; name by feature (e.g., `test_financial.py`).

## Commit & PR Guidelines
- Use Conventional Commits: `feat:`, `fix:`, `refactor:`, etc. Keep subject imperative and concise.
- PRs should include: summary, linked issues, backend/Frontend labels, and screenshots/GIFs for UI.
- Ensure `docker compose up --build` and `pytest backend/tests` pass locally before requesting review.

## Security & Config
- Backend config via `backend/.env` (e.g., `SECRET_KEY`, DB URL). Do not commit secrets.
- Frontend API URL via `VITE_API_URL` (Docker arg/env). Keep it consistent across envs.
- Enable CORS for dev origins already configured in `app.main`.
