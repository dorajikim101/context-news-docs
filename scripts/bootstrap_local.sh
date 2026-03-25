#!/usr/bin/env bash
set -euo pipefail

echo "1) Start postgres and create context_news DB if needed"
echo "2) Backend: cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/context_news && export API_ADMIN_TOKEN=dev-admin-token && alembic upgrade head && python -m app.seeds.seed_sources && python -m app.seeds.seed_narratives && uvicorn app.main:app --reload"
echo "3) Frontend: cd frontend && npm install && export NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 && export NEXT_PUBLIC_ADMIN_TOKEN=dev-admin-token && npm run dev"
