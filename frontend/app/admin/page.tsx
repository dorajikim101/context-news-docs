import Link from 'next/link';
import { SectionCard } from '../../components/SectionCard';

export default function AdminPage() {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <p style={{ color: '#98a2c7', marginBottom: 8 }}>Admin CMS</p>
      <h1 style={{ fontSize: 40, margin: '0 0 24px' }}>Editing Surface</h1>
      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
        <SectionCard title="Sources">
          <p style={{ color: '#cfd7ef' }}>Manage canonical, candidate, observed, and personal sources.</p>
          <Link href="/admin/sources" style={{ color: '#a8b6ff' }}>Open sources</Link>
        </SectionCard>
        <SectionCard title="Narratives">
          <p style={{ color: '#cfd7ef' }}>Create and edit narratives, claims, evidence, counterpoints, and action signals.</p>
          <Link href="/admin/narratives" style={{ color: '#a8b6ff' }}>Open narratives</Link>
        </SectionCard>
      </div>
    </main>
  );
}
