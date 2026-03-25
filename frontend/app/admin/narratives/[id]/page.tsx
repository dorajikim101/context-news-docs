import Link from 'next/link';
import { SectionCard } from '../../../../components/SectionCard';
import { API_BASE_URL, ADMIN_TOKEN } from '../../../../lib';

type Claim = { id: string; claim_text: string; claim_type: string; confidence: number };
type Counterpoint = { id: string; counterpoint_text: string; counterpoint_type: string; strength: number };
type ActionSignal = { id: string; title?: string | null; signal_type: string; description?: string | null };
type Evidence = { id: string; title?: string | null; evidence_type: string; excerpt?: string | null };
type Narrative = { id: string; title: string; one_line_summary?: string | null; state: string; description?: string | null };

type AdminNarrativeDetail = {
  narrative: Narrative;
  claims: Claim[];
  counterpoints: Counterpoint[];
  action_signals: ActionSignal[];
  evidence: Evidence[];
};

async function getAdminNarrative(id: string): Promise<AdminNarrativeDetail> {
  const res = await fetch(`${API_BASE_URL}/admin/narratives/${id}`, {
    cache: 'no-store',
    headers: { 'X-Admin-Token': ADMIN_TOKEN },
  });
  if (!res.ok) throw new Error('Failed to load admin narrative detail');
  return res.json();
}

export default async function AdminNarrativeDetailPage({ params }: { params: { id: string } }) {
  let data: AdminNarrativeDetail | null = null;
  let error: string | null = null;

  try {
    data = await getAdminNarrative(params.id);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load';
  }

  if (error || !data) {
    return (
      <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
        <SectionCard title="Admin narrative detail unavailable">
          <p>{error || 'No data'}</p>
        </SectionCard>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px', display: 'grid', gap: 16 }}>
      <p style={{ color: '#98a2c7', marginBottom: 0 }}>Admin Narrative Detail</p>
      <h1 style={{ marginTop: 0 }}>{data.narrative.title}</h1>
      <SectionCard title="Basic Info">
        <p>{data.narrative.one_line_summary || 'No summary yet.'}</p>
        <p style={{ color: '#9aa5c8' }}>State: {data.narrative.state}</p>
      </SectionCard>
      <SectionCard title="Claims">
        <p><Link href='/admin/claims/new' style={{ color: '#a8b6ff' }}>Add claim</Link></p>
        {data.claims.length === 0 ? <p>No claims yet.</p> : data.claims.map((c) => <p key={c.id}>• {c.claim_text}</p>)}
      </SectionCard>
      <SectionCard title="Evidence">
        <p><Link href='/admin/evidence/new' style={{ color: '#a8b6ff' }}>Add evidence</Link></p>
        {data.evidence.length === 0 ? <p>No evidence yet.</p> : data.evidence.map((e) => <p key={e.id}>• {e.title || e.evidence_type}</p>)}
      </SectionCard>
      <SectionCard title="Counterpoints">
        <p><Link href='/admin/counterpoints/new' style={{ color: '#a8b6ff' }}>Add counterpoint</Link></p>
        {data.counterpoints.length === 0 ? <p>No counterpoints yet.</p> : data.counterpoints.map((c) => <p key={c.id}>• {c.counterpoint_text}</p>)}
      </SectionCard>
      <SectionCard title="Action Signals">
        <p><Link href='/admin/action-signals/new' style={{ color: '#a8b6ff' }}>Add action signal</Link></p>
        {data.action_signals.length === 0 ? <p>No action signals yet.</p> : data.action_signals.map((a) => <p key={a.id}>• {a.title || a.signal_type}</p>)}
      </SectionCard>
    </main>
  );
}
