import { SectionCard } from '../../../components/SectionCard';

export default function NarrativeDetailPage({ params }: { params: { slug: string } }) {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px', display: 'grid', gap: 16 }}>
      <p style={{ color: '#98a2c7', marginBottom: 0 }}>Narrative Detail</p>
      <h1 style={{ marginTop: 0 }}>{params.slug}</h1>
      <SectionCard title="Why it is rising">
        <p>Supportive policy moves, capital spending, and repeated framing by key actors.</p>
      </SectionCard>
      <SectionCard title="Why it is not settled">
        <p>Counterarguments, execution delays, and mixed real-world signals still remain.</p>
      </SectionCard>
      <SectionCard title="Current judgment">
        <p>The narrative is directionally strengthening, but the system should still display clear counterpressure.</p>
      </SectionCard>
      <SectionCard title="Evidence / Counterpoints / Action Signals">
        <p>This section will later render linked claims, evidence, counterpoints, and real-world action signals.</p>
      </SectionCard>
    </main>
  );
}
