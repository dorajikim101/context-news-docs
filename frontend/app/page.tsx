import Link from 'next/link';
import { SectionCard } from '../components/SectionCard';
import { apiGet, type Narrative } from '../lib';

export default async function HomePage() {
  let narratives: Narrative[] = [];
  let error: string | null = null;

  try {
    narratives = await apiGet<Narrative[]>('/public/narratives');
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load narratives';
  }

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <p style={{ color: '#98a2c7', marginBottom: 8 }}>Public Reading Surface</p>
      <h1 style={{ fontSize: 40, margin: '0 0 24px' }}>Context News MVP</h1>

      {error ? (
        <SectionCard title="API not connected yet">
          <p style={{ color: '#d7def5' }}>{error}</p>
          <p style={{ color: '#9aa5c8', marginBottom: 0 }}>
            Backend is expected at <code>NEXT_PUBLIC_API_BASE_URL</code>.
          </p>
        </SectionCard>
      ) : narratives.length === 0 ? (
        <SectionCard title="No narratives yet">
          <p style={{ color: '#d7def5' }}>Create narratives from the admin side first.</p>
          <Link href="/admin/narratives" style={{ color: '#a8b6ff' }}>Go to admin narratives</Link>
        </SectionCard>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {narratives.map((item) => (
            <SectionCard key={item.id} title={item.title}>
              <p style={{ margin: '0 0 8px', color: '#d7def5' }}>{item.one_line_summary || 'No summary yet.'}</p>
              <p style={{ margin: '0 0 8px', color: '#9aa5c8' }}>State: {item.state}</p>
              <p style={{ margin: 0, color: '#9aa5c8' }}>Attention score: {item.attention_score ?? 0}</p>
              <div style={{ marginTop: 12 }}>
                <Link href={`/narratives/${item.slug}`} style={{ color: '#a8b6ff' }}>
                  Open narrative
                </Link>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </main>
  );
}
