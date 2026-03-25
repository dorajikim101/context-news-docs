#!/usr/bin/env bash
set -euo pipefail

echo "Run frontend and backend separately for now."
echo "frontend: cd frontend && npm install && npm run dev"
echo "backend: cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload"
