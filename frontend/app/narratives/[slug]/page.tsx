import { SectionCard } from '../../../components/SectionCard';
import { apiGet, type Narrative } from '../../../lib';

type Claim = { id: string; claim_text: string; claim_type: string; confidence: number };
type Counterpoint = { id: string; counterpoint_text: string; counterpoint_type: string; strength: number };
type ActionSignal = { id: string; title?: string | null; signal_type: string; description?: string | null; strength: number };
type Evidence = { id: string; title?: string | null; evidence_type: string; excerpt?: string | null; url?: string | null };

type Overview = {
  narrative: Narrative;
  claims: Claim[];
  counterpoints: Counterpoint[];
  action_signals: ActionSignal[];
  evidence: Evidence[];
};

export default async function NarrativeDetailPage({ params }: { params: { slug: string } }) {
  let narrative: Narrative | null = null;
  let overview: Overview | null = null;
  let error: string | null = null;

  try {
    narrative = await apiGet<Narrative>(`/public/narratives/${params.slug}`);
    overview = await apiGet<Overview>(`/overview/narratives/${narrative.id}`);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load narrative';
  }

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px', display: 'grid', gap: 16 }}>
      {error || !narrative || !overview ? (
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
          <SectionCard title="Claims">
            {overview.claims.length === 0 ? <p>No claims yet.</p> : overview.claims.map((c) => <p key={c.id}>• {c.claim_text}</p>)}
          </SectionCard>
          <SectionCard title="Counterpoints">
            {overview.counterpoints.length === 0 ? <p>No counterpoints yet.</p> : overview.counterpoints.map((c) => <p key={c.id}>• {c.counterpoint_text}</p>)}
          </SectionCard>
          <SectionCard title="Action Signals">
            {overview.action_signals.length === 0 ? <p>No action signals yet.</p> : overview.action_signals.map((a) => <p key={a.id}>• {a.title || a.signal_type}</p>)}
          </SectionCard>
          <SectionCard title="Evidence">
            {overview.evidence.length === 0 ? <p>No evidence yet.</p> : overview.evidence.map((e) => <p key={e.id}>• {e.title || e.evidence_type}</p>)}
          </SectionCard>
        </>
      )}
    </main>
  );
}
