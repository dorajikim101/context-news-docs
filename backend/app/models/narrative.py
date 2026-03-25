import uuid
from datetime import date, datetime
from sqlalchemy import Boolean, Date, DateTime, ForeignKey, Numeric, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column
from app.db.base import Base


class Narrative(Base):
    __tablename__ = "narratives"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    slug: Mapped[str] = mapped_column(Text, nullable=False, unique=True)
    one_line_summary: Mapped[str | None] = mapped_column(Text)
    description: Mapped[str | None] = mapped_column(Text)
    state: Mapped[str] = mapped_column(Text, nullable=False, default="emerging")
    attention_score: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=0)
    conviction_score: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=0)
    attention_share: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=0)
    conviction_share: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=0)
    confidence_score: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=0)
    domain: Mapped[str] = mapped_column(Text, nullable=False, default="crypto")
    is_public: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)


class NarrativeRelation(Base):
    __tablename__ = "narrative_relations"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    from_narrative_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("narratives.id", ondelete="CASCADE"), nullable=False)
    to_narrative_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("narratives.id", ondelete="CASCADE"), nullable=False)
    relation_type: Mapped[str] = mapped_column(Text, nullable=False)
    confidence: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=1.0)
    note: Mapped[str | None] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)


class NarrativeSnapshot(Base):
    __tablename__ = "narrative_snapshots"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    narrative_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("narratives.id", ondelete="CASCADE"), nullable=False)
    snapshot_date: Mapped[date] = mapped_column(Date, nullable=False)
    attention_score: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=0)
    conviction_score: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=0)
    attention_share: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=0)
    conviction_share: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False, default=0)
    state: Mapped[str] = mapped_column(Text, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.utcnow)
