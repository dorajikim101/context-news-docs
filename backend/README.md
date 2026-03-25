# Context News Backend

FastAPI backend scaffold for Context News MVP.

## Run

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export DATABASE_URL=postgresql://postgres:postgres@localhost:5432/context_news
export API_ADMIN_TOKEN=dev-admin-token
alembic upgrade head
python -m app.seeds.seed_sources
python -m app.seeds.seed_narratives
uvicorn app.main:app --reload
```

## Notes
- Admin write routes require `X-Admin-Token`
- Public read routes do not require auth
