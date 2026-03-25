from fastapi import Header, HTTPException
from app.config import API_ADMIN_TOKEN


def require_admin(x_admin_token: str | None = Header(default=None)) -> None:
    if x_admin_token != API_ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid admin token")
