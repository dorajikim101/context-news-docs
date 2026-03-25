import Link from 'next/link';
import narratives from '../../../../demo-data/narratives.json';
import { SectionCard } from '../../../../components/SectionCard';
import { Layout } from '../../../../components/Layout';
import { StateBadge } from '../../../../components/StateBadge';
import { Sparkline } from '../../../../components/Sparkline';
import { DeltaText } from '../../../../components/DeltaText';
import { MetricCard } from '../../../../components/MetricCard';
import { KeyList } from '../../../../components/KeyList';

export function generateStaticParams() {
  return narratives.map((item) => ({ slug: item.slug }));
}

export default function DemoNarrativeDetailPage({ params }: { params: { slug: string } }) {
  const narrative = narratives.find((item) => item.slug === params.slug);

  if (!narrative) {
    return (
      <Layout eyebrow="Static Demo" title="Narrative not found">
        <SectionCard title="Missing narrative">
          <p>No demo narrative matched this slug.</p>
          <Link href="/demo" style={{ color: '#a8b6ff' }}>Back to demo home</Link>
        </SectionCard>
      </Layout>
    );
  }

  return (
    <Layout
      eyebrow="Static Demo / Narrative Detail"
      title={narrative.title}
      subtitle={narrative.one_line_summary}
    >
      <section style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 28 }}>
        <MetricCard label="State" value={narrative.state} hint="Current narrative state" />
        <MetricCard label="Attention" value={String(narrative.attention_score)} hint="Mock attention score" />
        <MetricCard label="Claims" value={String(narrative.claims.length)} hint="Structured argument units" />
        <MetricCard label="Counterpoints" value={String(narrative.counterpoints.length)} hint="Structured pressure against the narrative" />
      </section>

      <SectionCard title="Narrative pulse">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10 }}>
              <StateBadge state={narrative.state} />
              <DeltaText values={narrative.trend} />
            </div>
            <p style={{ margin: 0, color: '#c8d0ea', maxWidth: 560 }}>
              This block simulates the “ongoing narrative” reading layer: state, trajectory, and structured interpretation.
            </p>
          </div>
          <Sparkline values={narrative.trend} />
        </div>
      </SectionCard>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1.1fr 0.9fr' }}>
        <SectionCard title="Claims">
          <KeyList items={narrative.claims} />
        </SectionCard>
        <SectionCard title="Counterpoints">
          <KeyList items={narrative.counterpoints} />
        </SectionCard>
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
        <SectionCard title="Action Signals">
          <KeyList items={narrative.actionSignals} />
        </SectionCard>
        <SectionCard title="Evidence">
          <KeyList items={narrative.evidence} />
        </SectionCard>
      </div>

      <SectionCard title="Why this demo exists">
        <p style={{ color: '#d7def5', lineHeight: 1.7 }}>
          This static demo is designed to show the product concept visually on GitHub Pages before full deployment. It intentionally focuses on narrative structure, state, trend, and opposing pressure rather than live backend-backed editing.
        </p>
      </SectionCard>
    </Layout>
  );
}
