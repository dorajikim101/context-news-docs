import { SectionCard } from '../../../components/SectionCard';
import { apiGet, type Narrative } from '../../../lib';

export default async function NarrativeDetailPage({ params }: { params: { slug: string } }) {
  let narrative: Narrative | null = null;
  let error: string | null = null;

  try {
    narrative = await apiGet<Narrative>(`/public/narratives/${params.slug}`);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load narrative';
  }

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px', display: 'grid', gap: 16 }}>
      {error || !narrative ? (
        <SectionCard title="Narrative not available">
          <p>{error || 'No narrative found.'}</p>
        </SectionCard>
      ) : (
        <>
          <p style={{ color: '#98a2c7', marginBottom: 0 }}>Narrative Detail</p>
          <h1 style={{ marginTop: 0 }}>{narrative.title}</h1>
          <SectionCard title="Summary">
            <p>{narrative.one_line_summary || 'No summary yet.'}</p>
            <p style={{ color: '#9aa5c8', marginBottom: 0 }}>State: {narrative.state}</p>
          </SectionCard>
          <SectionCard title="Why it is rising">
            <p>Supportive policy moves, capital spending, and repeated framing by key actors.</p>
          </SectionCard>
          <SectionCard title="Why it is not settled">
            <p>Counterarguments, execution delays, and mixed real-world signals still remain.</p>
          </SectionCard>
          <SectionCard title="Current judgment">
            <p>The narrative is directionally strengthening, but the system should still display clear counterpressure.</p>
          </SectionCard>
        </>
      )}
    </main>
  );
}
