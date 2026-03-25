import narratives from '../../../../demo-data/narratives.json';
import { SectionCard } from '../../../../components/SectionCard';

export function generateStaticParams() {
  return narratives.map((item) => ({ slug: item.slug }));
}

export default function DemoNarrativeDetailPage({ params }: { params: { slug: string } }) {
  const narrative = narratives.find((item) => item.slug === params.slug);

  if (!narrative) {
    return (
      <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
        <SectionCard title="Narrative not found">
          <p>No demo narrative matched this slug.</p>
        </SectionCard>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px', display: 'grid', gap: 16 }}>
      <p style={{ color: '#98a2c7', marginBottom: 0 }}>Static Demo / Narrative Detail</p>
      <h1 style={{ marginTop: 0 }}>{narrative.title}</h1>
      <SectionCard title="Summary">
        <p>{narrative.one_line_summary}</p>
        <p style={{ color: '#9aa5c8', marginBottom: 0 }}>State: {narrative.state}</p>
      </SectionCard>
      <SectionCard title="Claims">
        {narrative.claims.map((item) => <p key={item}>• {item}</p>)}
      </SectionCard>
      <SectionCard title="Counterpoints">
        {narrative.counterpoints.map((item) => <p key={item}>• {item}</p>)}
      </SectionCard>
      <SectionCard title="Action Signals">
        {narrative.actionSignals.map((item) => <p key={item}>• {item}</p>)}
      </SectionCard>
      <SectionCard title="Evidence">
        {narrative.evidence.map((item) => <p key={item}>• {item}</p>)}
      </SectionCard>
    </main>
  );
}
