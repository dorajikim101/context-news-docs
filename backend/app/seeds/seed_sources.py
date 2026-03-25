from app.db.session import SessionLocal
from app.models.source import Source

SEED_SOURCES = [
    # 1차: 정치 / 거시 / 정책 방향층
    {"name": "White House", "slug": "white-house", "source_type": "political", "source_status": "canonical", "base_weight": 1.4, "homepage_url": "https://www.whitehouse.gov/"},
    {"name": "U.S. Treasury", "slug": "us-treasury", "source_type": "macro", "source_status": "canonical", "base_weight": 1.4, "homepage_url": "https://home.treasury.gov/"},
    {"name": "SEC", "slug": "sec", "source_type": "political", "source_status": "canonical", "base_weight": 1.5, "homepage_url": "https://www.sec.gov/"},
    {"name": "CFTC", "slug": "cftc", "source_type": "political", "source_status": "canonical", "base_weight": 1.3, "homepage_url": "https://www.cftc.gov/"},
    {"name": "Federal Reserve", "slug": "federal-reserve", "source_type": "macro", "source_status": "canonical", "base_weight": 1.5, "homepage_url": "https://www.federalreserve.gov/"},

    # 2~3차: 산업 내부 경제집단
    {"name": "a16z crypto", "slug": "a16z-crypto", "source_type": "vc", "source_status": "canonical", "base_weight": 1.3, "homepage_url": "https://a16zcrypto.com/"},
    {"name": "Paradigm", "slug": "paradigm", "source_type": "vc", "source_status": "canonical", "base_weight": 1.3, "homepage_url": "https://www.paradigm.xyz/"},
    {"name": "Multicoin Capital", "slug": "multicoin-capital", "source_type": "vc", "source_status": "canonical", "base_weight": 1.2, "homepage_url": "https://multicoin.capital/"},
    {"name": "Binance Research", "slug": "binance-research", "source_type": "research", "source_status": "candidate", "base_weight": 1.0, "homepage_url": "https://research.binance.com/"},
    {"name": "Coinbase Blog", "slug": "coinbase-blog", "source_type": "company", "source_status": "candidate", "base_weight": 1.1, "homepage_url": "https://www.coinbase.com/blog"},
    {"name": "Ethereum Foundation", "slug": "ethereum-foundation", "source_type": "foundation", "source_status": "canonical", "base_weight": 1.2, "homepage_url": "https://ethereum.foundation/"},
    {"name": "Solana Foundation", "slug": "solana-foundation", "source_type": "foundation", "source_status": "candidate", "base_weight": 1.1, "homepage_url": "https://solana.org/"},

    # 4차: 해석 proxy 층
    {"name": "Messari", "slug": "messari", "source_type": "research", "source_status": "canonical", "base_weight": 1.2, "homepage_url": "https://messari.io/"},
    {"name": "Delphi Digital", "slug": "delphi-digital", "source_type": "research", "source_status": "canonical", "base_weight": 1.2, "homepage_url": "https://www.delphidigital.io/"},
    {"name": "Coin Metrics", "slug": "coin-metrics", "source_type": "research", "source_status": "canonical", "base_weight": 1.2, "homepage_url": "https://coinmetrics.io/"},
    {"name": "The Block Research", "slug": "the-block-research", "source_type": "research", "source_status": "candidate", "base_weight": 1.0, "homepage_url": "https://www.theblock.co/research"},
    {"name": "Galaxy Research", "slug": "galaxy-research", "source_type": "research", "source_status": "candidate", "base_weight": 1.0, "homepage_url": "https://www.galaxy.com/insights/research/"},

    # 5~6차: proxy / micro-proxy
    {"name": "Bankless", "slug": "bankless", "source_type": "proxy", "source_status": "candidate", "base_weight": 0.9, "homepage_url": "https://www.bankless.com/"},
    {"name": "Unchained", "slug": "unchained", "source_type": "proxy", "source_status": "candidate", "base_weight": 0.9, "homepage_url": "https://unchainedcrypto.com/"},
    {"name": "Blockworks Research", "slug": "blockworks-research", "source_type": "research", "source_status": "candidate", "base_weight": 1.0, "homepage_url": "https://blockworks.co/research"},

    # 7차: 대중 / 표면층
    {"name": "CoinDesk", "slug": "coindesk", "source_type": "media", "source_status": "observed", "base_weight": 0.8, "homepage_url": "https://www.coindesk.com/"},
    {"name": "The Defiant", "slug": "the-defiant", "source_type": "media", "source_status": "observed", "base_weight": 0.8, "homepage_url": "https://thedefiant.io/"},
]


def run() -> None:
    db = SessionLocal()
    try:
        existing = {s.slug for s in db.query(Source).all()}
        created = 0
        for item in SEED_SOURCES:
            if item["slug"] in existing:
                continue
            db.add(Source(**item))
            created += 1
        db.commit()
        print(f"Seeded {created} sources")
    finally:
        db.close()


if __name__ == "__main__":
    run()
