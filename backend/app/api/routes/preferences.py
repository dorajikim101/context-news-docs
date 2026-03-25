from uuid import UUID
from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.user import User, UserSourcePreference
from app.schemas.user_source_preference import UserSourcePreferenceRead, UserSourcePreferenceUpsert

router = APIRouter(prefix="/me/source-preferences", tags=["preferences"])


def get_current_user(x_user_email: str | None = Header(default=None), db: Session = Depends(get_db)) -> User:
    email = x_user_email or 'demo@context.news'
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email, role='viewer')
        db.add(user)
        db.commit()
        db.refresh(user)
    return user


@router.get("", response_model=list[UserSourcePreferenceRead])
def list_preferences(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(UserSourcePreference).filter(UserSourcePreference.user_id == user.id).all()


@router.put("/{source_id}", response_model=UserSourcePreferenceRead)
def upsert_preference(source_id: UUID, payload: UserSourcePreferenceUpsert, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    pref = db.query(UserSourcePreference).filter(
        UserSourcePreference.user_id == user.id,
        UserSourcePreference.source_id == source_id,
    ).first()
    if not pref:
        pref = UserSourcePreference(user_id=user.id, source_id=source_id)
        db.add(pref)
    pref.enabled = payload.enabled
    pref.weight_level = payload.weight_level
    db.commit()
    db.refresh(pref)
    return pref
