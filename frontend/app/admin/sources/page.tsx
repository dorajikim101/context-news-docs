import Link from 'next/link';
import { SectionCard } from '../../../components/SectionCard';

const rows = [
  ['a16z crypto', 'vc', 'canonical'],
  ['Paradigm', 'vc', 'canonical'],
  ['Coin Metrics', 'research', 'candidate'],
];

export default function AdminSourcesPage() {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <h1>Admin / Sources</h1>
      <p><Link href='/admin/sources/new' style={{ color: '#a8b6ff' }}>Create new source</Link></p>
      <SectionCard title="Source List">
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
              <tr key={row[0]}>
                <td style={{ padding: '8px 0' }}>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </main>
  );
}
