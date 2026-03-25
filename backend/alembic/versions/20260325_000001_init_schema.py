"""init schema

Revision ID: 20260325_000001
Revises: 
Create Date: 2026-03-25
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '20260325_000001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'sources',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.Text(), nullable=False),
        sa.Column('slug', sa.Text(), nullable=False),
        sa.Column('source_type', sa.Text(), nullable=False),
        sa.Column('source_status', sa.Text(), nullable=False, server_default='candidate'),
        sa.Column('base_weight', sa.Numeric(10,4), nullable=False, server_default='1.0'),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('homepage_url', sa.Text(), nullable=True),
        sa.Column('active', sa.Boolean(), nullable=False, server_default=sa.text('true')),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint('slug')
    )
    op.create_index('ix_sources_source_type', 'sources', ['source_type'])
    op.create_index('ix_sources_source_status', 'sources', ['source_status'])

    op.create_table(
        'actors',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('name', sa.Text(), nullable=False),
        sa.Column('slug', sa.Text(), nullable=False),
        sa.Column('actor_type', sa.Text(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('primary_source_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('sources.id'), nullable=True),
        sa.Column('active', sa.Boolean(), nullable=False, server_default=sa.text('true')),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint('slug')
    )
    op.create_index('ix_actors_actor_type', 'actors', ['actor_type'])

    op.create_table(
        'actor_aliases',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('actor_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('actors.id', ondelete='CASCADE'), nullable=False),
        sa.Column('alias', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    )
    op.create_index('ix_actor_aliases_actor_id', 'actor_aliases', ['actor_id'])
    op.create_index('ix_actor_aliases_alias', 'actor_aliases', ['alias'])

    op.create_table(
        'narratives',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('title', sa.Text(), nullable=False),
        sa.Column('slug', sa.Text(), nullable=False),
        sa.Column('one_line_summary', sa.Text(), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('state', sa.Text(), nullable=False, server_default='emerging'),
        sa.Column('attention_score', sa.Numeric(10,4), nullable=False, server_default='0'),
        sa.Column('conviction_score', sa.Numeric(10,4), nullable=False, server_default='0'),
        sa.Column('attention_share', sa.Numeric(10,4), nullable=False, server_default='0'),
        sa.Column('conviction_share', sa.Numeric(10,4), nullable=False, server_default='0'),
        sa.Column('confidence_score', sa.Numeric(10,4), nullable=False, server_default='0'),
        sa.Column('domain', sa.Text(), nullable=False, server_default='crypto'),
        sa.Column('is_public', sa.Boolean(), nullable=False, server_default=sa.text('true')),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint('slug')
    )
    op.create_index('ix_narratives_state', 'narratives', ['state'])
    op.create_index('ix_narratives_domain', 'narratives', ['domain'])
    op.create_index('ix_narratives_is_public', 'narratives', ['is_public'])

    op.create_table(
        'narrative_relations',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('from_narrative_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('narratives.id', ondelete='CASCADE'), nullable=False),
        sa.Column('to_narrative_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('narratives.id', ondelete='CASCADE'), nullable=False),
        sa.Column('relation_type', sa.Text(), nullable=False),
        sa.Column('confidence', sa.Numeric(10,4), nullable=False, server_default='1.0'),
        sa.Column('note', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
    )

    op.create_table(
        'claims',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('narrative_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('narratives.id', ondelete='CASCADE'), nullable=False),
        sa.Column('actor_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('actors.id'), nullable=True),
        sa.Column('source_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('sources.id'), nullable=True),
        sa.Column('claim_text', sa.Text(), nullable=False),
        sa.Column('claim_type', sa.Text(), nullable=False),
        sa.Column('stance', sa.Text(), nullable=True),
        sa.Column('claim_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('confidence', sa.Numeric(10,4), nullable=False, server_default='0.5'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    )

    op.create_table(
        'evidence',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('source_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('sources.id'), nullable=True),
        sa.Column('title', sa.Text(), nullable=True),
        sa.Column('url', sa.Text(), nullable=True),
        sa.Column('evidence_type', sa.Text(), nullable=False),
        sa.Column('excerpt', sa.Text(), nullable=True),
        sa.Column('published_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    )

    op.create_table(
        'claim_evidence_links',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('claim_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('claims.id', ondelete='CASCADE'), nullable=False),
        sa.Column('evidence_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('evidence.id', ondelete='CASCADE'), nullable=False),
        sa.Column('link_type', sa.Text(), nullable=False),
        sa.Column('weight', sa.Numeric(10,4), nullable=False, server_default='1.0'),
        sa.Column('note', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint('claim_id', 'evidence_id', name='uq_claim_evidence')
    )

    op.create_table(
        'counterpoints',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('narrative_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('narratives.id', ondelete='CASCADE'), nullable=True),
        sa.Column('claim_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('claims.id', ondelete='CASCADE'), nullable=True),
        sa.Column('actor_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('actors.id'), nullable=True),
        sa.Column('source_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('sources.id'), nullable=True),
        sa.Column('counterpoint_text', sa.Text(), nullable=False),
        sa.Column('counterpoint_type', sa.Text(), nullable=False),
        sa.Column('strength', sa.Numeric(10,4), nullable=False, server_default='0.5'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    )

    op.create_table(
        'action_signals',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('narrative_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('narratives.id', ondelete='CASCADE'), nullable=True),
        sa.Column('actor_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('actors.id'), nullable=True),
        sa.Column('source_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('sources.id'), nullable=True),
        sa.Column('signal_type', sa.Text(), nullable=False),
        sa.Column('title', sa.Text(), nullable=True),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('signal_date', sa.DateTime(timezone=True), nullable=True),
        sa.Column('strength', sa.Numeric(10,4), nullable=False, server_default='0.5'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
    )

    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('email', sa.Text(), nullable=True),
        sa.Column('role', sa.Text(), nullable=False, server_default='viewer'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint('email')
    )

    op.create_table(
        'user_source_preferences',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('source_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('sources.id', ondelete='CASCADE'), nullable=False),
        sa.Column('enabled', sa.Boolean(), nullable=False, server_default=sa.text('true')),
        sa.Column('weight_level', sa.Text(), nullable=False, server_default='default'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint('user_id', 'source_id', name='uq_user_source_preference')
    )

    op.create_table(
        'narrative_snapshots',
        sa.Column('id', postgresql.UUID(as_uuid=True), primary_key=True),
        sa.Column('narrative_id', postgresql.UUID(as_uuid=True), sa.ForeignKey('narratives.id', ondelete='CASCADE'), nullable=False),
        sa.Column('snapshot_date', sa.Date(), nullable=False),
        sa.Column('attention_score', sa.Numeric(10,4), nullable=False, server_default='0'),
        sa.Column('conviction_score', sa.Numeric(10,4), nullable=False, server_default='0'),
        sa.Column('attention_share', sa.Numeric(10,4), nullable=False, server_default='0'),
        sa.Column('conviction_share', sa.Numeric(10,4), nullable=False, server_default='0'),
        sa.Column('state', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint('narrative_id', 'snapshot_date')
    )


def downgrade() -> None:
    for table in [
        'narrative_snapshots','user_source_preferences','users','action_signals','counterpoints',
        'claim_evidence_links','evidence','claims','narrative_relations','narratives',
        'actor_aliases','actors','sources'
    ]:
        op.drop_table(table)
