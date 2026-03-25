from app.db.session import SessionLocal
from app.models.narrative import Narrative
from app.models.claim import Claim, Counterpoint, ActionSignal, Evidence, ClaimEvidenceLink
from app.models.source import Source

SEED_NARRATIVES = [
    {
        "title": "Crypto Policy Pivot",
        "slug": "crypto-policy-pivot",
        "one_line_summary": "U.S. policy tone toward crypto may be improving, but the durability and implementation path remain contested.",
        "state": "contested",
        "claims": [
            {
                "claim_text": "Recent U.S. political and regulatory signals suggest a more accommodative stance toward crypto than in the prior cycle.",
                "claim_type": "interpretation",
                "source_slug": "sec",
                "evidence": [
                    {
                        "title": "SEC official communication and enforcement posture shifts",
                        "evidence_type": "official_doc",
                        "excerpt": "Signals can change before rules fully change.",
                        "link_type": "supports",
                    }
                ],
            }
        ],
        "counterpoints": [
            {
                "counterpoint_text": "Political messaging can improve faster than the actual regulatory implementation timeline.",
                "counterpoint_type": "limitation",
                "source_slug": "coindesk",
            }
        ],
        "actions": [
            {
                "signal_type": "regulation",
                "title": "Regulatory posture monitoring",
                "description": "Track whether signal change converts into durable rulemaking or enforcement change.",
                "source_slug": "sec",
            }
        ],
    },
    {
        "title": "AI Infra Overbuild",
        "slug": "ai-infra-overbuild",
        "one_line_summary": "AI infrastructure spending is accelerating faster than proven monetization, creating a growing overbuild narrative.",
        "state": "growing",
        "claims": [
            {
                "claim_text": "Capital expenditure into AI infrastructure is outpacing demonstrated revenue capture for many participants.",
                "claim_type": "causal",
                "source_slug": "delphi-digital",
                "evidence": [
                    {
                        "title": "Research note on compute CAPEX pressure",
                        "evidence_type": "report",
                        "excerpt": "The monetization lag matters as infra cost compounds.",
                        "link_type": "supports",
                    }
                ],
            }
        ],
        "counterpoints": [
            {
                "counterpoint_text": "Infrastructure investment can look excessive before downstream application revenue catches up.",
                "counterpoint_type": "rebuttal",
                "source_slug": "messari",
            }
        ],
        "actions": [
            {
                "signal_type": "investment",
                "title": "Infra CAPEX acceleration",
                "description": "Monitor repeated capital allocation into data centers, chips, and power-linked infrastructure.",
                "source_slug": "coin-metrics",
            }
        ],
    },
]


def get_source_map(db):
    return {s.slug: s for s in db.query(Source).all()}


def run() -> None:
    db = SessionLocal()
    try:
        source_map = get_source_map(db)
        existing = {n.slug for n in db.query(Narrative).all()}
        for item in SEED_NARRATIVES:
            if item["slug"] in existing:
                continue
            narrative = Narrative(
                title=item["title"],
                slug=item["slug"],
                one_line_summary=item["one_line_summary"],
                state=item["state"],
                description=item["one_line_summary"],
                domain="crypto",
                is_public=True,
            )
            db.add(narrative)
            db.flush()

            for claim_data in item["claims"]:
                source = source_map.get(claim_data.get("source_slug"))
                claim = Claim(
                    narrative_id=narrative.id,
                    source_id=source.id if source else None,
                    claim_text=claim_data["claim_text"],
                    claim_type=claim_data["claim_type"],
                    confidence=0.6,
                )
                db.add(claim)
                db.flush()

                for ev in claim_data.get("evidence", []):
                    evidence = Evidence(
                        source_id=source.id if source else None,
                        title=ev["title"],
                        evidence_type=ev["evidence_type"],
                        excerpt=ev.get("excerpt"),
                    )
                    db.add(evidence)
                    db.flush()
                    db.add(
                        ClaimEvidenceLink(
                            claim_id=claim.id,
                            evidence_id=evidence.id,
                            link_type=ev.get("link_type", "supports"),
                            weight=1.0,
                        )
                    )

            for cp in item.get("counterpoints", []):
                source = source_map.get(cp.get("source_slug"))
                db.add(
                    Counterpoint(
                        narrative_id=narrative.id,
                        source_id=source.id if source else None,
                        counterpoint_text=cp["counterpoint_text"],
                        counterpoint_type=cp["counterpoint_type"],
                        strength=0.5,
                    )
                )

            for act in item.get("actions", []):
                source = source_map.get(act.get("source_slug"))
                db.add(
                    ActionSignal(
                        narrative_id=narrative.id,
                        source_id=source.id if source else None,
                        signal_type=act["signal_type"],
                        title=act["title"],
                        description=act["description"],
                        strength=0.5,
                    )
                )

        db.commit()
        print('Seeded narratives')
    finally:
        db.close()


if __name__ == "__main__":
    run()
