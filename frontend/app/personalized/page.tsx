import Link from 'next/link';
import { SectionCard } from '../../components/SectionCard';
import { apiGet, DEMO_USER_EMAIL } from '../../lib';

type Row = {
  id: string;
  title: string;
  slug: string;
  one_line_summary?: string | null;
  state: string;
  attention_score: number;
  personal_attention_score: number;
};

export default async function PersonalizedPage() {
  let rows: Row[] = [];
  let error: string | null = null;

  try {
    rows = await apiGet<Row[]>('/personalized/narratives', { userEmail: DEMO_USER_EMAIL });
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load personalized narratives';
  }

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <p style={{ color: '#98a2c7', marginBottom: 8 }}>Personalized View</p>
      <h1 style={{ fontSize: 40, margin: '0 0 24px' }}>My Narrative Ranking</h1>
      <p style={{ color: '#9aa5c8' }}>Minimal MVP demo: source preferences slightly adjust ranking order.</p>
      {error ? (
        <SectionCard title="Load error"><p>{error}</p></SectionCard>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {rows.map((row) => (
            <SectionCard key={row.id} title={row.title}>
              <p style={{ color: '#d7def5' }}>{row.one_line_summary || 'No summary yet.'}</p>
              <p style={{ color: '#9aa5c8' }}>Base score: {row.attention_score} / Personal score: {row.personal_attention_score.toFixed(2)}</p>
              <div style={{ display: 'flex', gap: 16 }}>
                <Link href={`/narratives/${row.slug}`} style={{ color: '#a8b6ff' }}>Open narrative</Link>
                <Link href="/settings/sources" style={{ color: '#a8b6ff' }}>Adjust sources</Link>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </main>
  );
}
