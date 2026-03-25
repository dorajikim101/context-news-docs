from datetime import date, timedelta
from app.db.session import SessionLocal
from app.models.narrative import Narrative, NarrativeSnapshot

SNAPSHOT_SERIES = {
    'crypto-policy-pivot': [12, 16, 18, 15, 19],
    'ai-infra-overbuild': [8, 10, 14, 18, 22],
}


def run() -> None:
    db = SessionLocal()
    try:
        today = date.today()
        narratives = {n.slug: n for n in db.query(Narrative).all()}
        for slug, values in SNAPSHOT_SERIES.items():
            narrative = narratives.get(slug)
            if not narrative:
                continue
            for idx, value in enumerate(values):
                snapshot_date = today - timedelta(days=(len(values) - 1 - idx))
                exists = (
                    db.query(NarrativeSnapshot)
                    .filter(NarrativeSnapshot.narrative_id == narrative.id, NarrativeSnapshot.snapshot_date == snapshot_date)
                    .first()
                )
                if exists:
                    continue
                db.add(
                    NarrativeSnapshot(
                        narrative_id=narrative.id,
                        snapshot_date=snapshot_date,
                        attention_score=value,
                        attention_share=value,
                        conviction_score=max(value - 3, 0),
                        conviction_share=max(value - 3, 0),
                        state=narrative.state,
                    )
                )
        db.commit()
        print('Seeded snapshots')
    finally:
        db.close()


if __name__ == '__main__':
    run()
