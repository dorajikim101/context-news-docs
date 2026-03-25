import Link from 'next/link';
import { SectionCard } from '../../../components/SectionCard';
import { apiGet, type Narrative } from '../../../lib';

export default async function AdminNarrativesPage() {
  let narratives: Narrative[] = [];
  let error: string | null = null;

  try {
    narratives = await apiGet<Narrative[]>('/narratives');
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load narratives';
  }

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <h1>Admin / Narratives</h1>
      <p><Link href='/admin/narratives/new' style={{ color: '#a8b6ff' }}>Create new narrative</Link></p>
      {error ? (
        <SectionCard title="Load error">
          <p style={{ color: '#d7def5' }}>{error}</p>
        </SectionCard>
      ) : narratives.length === 0 ? (
        <SectionCard title="No narratives yet">
          <p style={{ color: '#d7def5' }}>Create the first narrative.</p>
        </SectionCard>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {narratives.map((item) => (
            <SectionCard key={item.id} title={item.title}>
              <p style={{ color: '#cfd7ef' }}>State: {item.state}</p>
              <p style={{ color: '#9aa5c8' }}>{item.one_line_summary || 'No summary yet.'}</p>
              <Link href={`/narratives/${item.slug}`} style={{ color: '#a8b6ff' }}>Preview public page</Link>
            </SectionCard>
          ))}
        </div>
      )}
    </main>
  );
}
