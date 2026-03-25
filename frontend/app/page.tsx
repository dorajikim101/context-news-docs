import Link from 'next/link';
import { SectionCard } from '../components/SectionCard';
import { Sparkline } from '../components/Sparkline';
import { StateBadge } from '../components/StateBadge';
import { DeltaText } from '../components/DeltaText';
import { apiGet, type Narrative } from '../lib';

type Snapshot = { snapshot_date: string; attention_score: number };

export default async function HomePage() {
  let narratives: Narrative[] = [];
  let error: string | null = null;

  try {
    narratives = await apiGet<Narrative[]>('/public/narratives');
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load narratives';
  }

  const withSnapshots = await Promise.all(
    narratives.map(async (item) => {
      try {
        const snapshots = await apiGet<Snapshot[]>(`/snapshots/narratives/${item.slug}`);
        return { ...item, snapshots };
      } catch {
        return { ...item, snapshots: [] as Snapshot[] };
      }
    })
  );

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
      ) : withSnapshots.length === 0 ? (
        <SectionCard title="No narratives yet">
          <p style={{ color: '#d7def5' }}>Create narratives from the admin side first.</p>
          <Link href="/admin/narratives" style={{ color: '#a8b6ff' }}>Go to admin narratives</Link>
        </SectionCard>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {withSnapshots.map((item) => {
            const values = item.snapshots.map((s) => Number(s.attention_score));
            return (
              <SectionCard key={item.id} title={item.title}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 260 }}>
                    <p style={{ margin: '0 0 8px', color: '#d7def5' }}>{item.one_line_summary || 'No summary yet.'}</p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                      <StateBadge state={item.state} />
                      <DeltaText values={values} />
                    </div>
                    <p style={{ margin: 0, color: '#9aa5c8' }}>Attention score: {item.attention_score ?? 0}</p>
                    <div style={{ marginTop: 12 }}>
                      <Link href={`/narratives/${item.slug}`} style={{ color: '#a8b6ff' }}>
                        Open narrative
                      </Link>
                    </div>
                  </div>
                  <div style={{ minWidth: 120 }}>
                    <Sparkline values={values} />
                  </div>
                </div>
              </SectionCard>
            );
          })}
        </div>
      )}
    </main>
  );
}
