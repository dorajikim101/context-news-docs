from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.narrative import Narrative
from app.models.user import User, UserSourcePreference
from app.models.source import Source
from app.models.claim import Claim

router = APIRouter(prefix="/personalized", tags=["personalized"])


def get_current_user(x_user_email: str | None = Header(default=None), db: Session = Depends(get_db)) -> User:
    email = x_user_email or 'demo@context.news'
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email, role='viewer')
        db.add(user)
        db.commit()
        db.refresh(user)
    return user


def weight_multiplier(level: str) -> float:
    return {'low': 0.7, 'default': 1.0, 'high': 1.3}.get(level, 1.0)


@router.get('/narratives')
def list_personalized_narratives(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    narratives = db.query(Narrative).filter(Narrative.is_public.is_(True)).all()
    prefs = db.query(UserSourcePreference).filter(UserSourcePreference.user_id == user.id).all()
    pref_map = {p.source_id: p for p in prefs}

    rows = []
    for narrative in narratives:
        claims = db.query(Claim).filter(Claim.narrative_id == narrative.id).all()
        adjusted = float(narrative.attention_score or 0)
        for claim in claims:
            if not claim.source_id:
                continue
            pref = pref_map.get(claim.source_id)
            if pref:
                if not pref.enabled:
                    adjusted -= 1.0
                adjusted += weight_multiplier(pref.weight_level) - 1.0
        rows.append({
            'id': str(narrative.id),
            'title': narrative.title,
            'slug': narrative.slug,
            'one_line_summary': narrative.one_line_summary,
            'state': narrative.state,
            'attention_score': float(narrative.attention_score or 0),
            'personal_attention_score': adjusted,
        })

    rows.sort(key=lambda x: x['personal_attention_score'], reverse=True)
    return rows
