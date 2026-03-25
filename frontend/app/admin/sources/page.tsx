import Link from 'next/link';
import { SectionCard } from '../../../components/SectionCard';
import { apiGet, type Source } from '../../../lib';

export default async function AdminSourcesPage() {
  let rows: Source[] = [];
  let error: string | null = null;

  try {
    rows = await apiGet<Source[]>('/sources');
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load sources';
  }

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <h1>Admin / Sources</h1>
      <p><Link href='/admin/sources/new' style={{ color: '#a8b6ff' }}>Create new source</Link></p>
      <SectionCard title="Source List">
        {error ? (
          <p style={{ color: '#d7def5' }}>{error}</p>
        ) : rows.length === 0 ? (
          <p style={{ color: '#d7def5' }}>No sources yet.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', paddingBottom: 8 }}>Name</th>
                <th style={{ textAlign: 'left', paddingBottom: 8 }}>Type</th>
                <th style={{ textAlign: 'left', paddingBottom: 8 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td style={{ padding: '8px 0' }}>{row.name}</td>
                  <td>{row.source_type}</td>
                  <td>{row.source_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </SectionCard>
    </main>
  );
}
