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
          <div style={{ display: 'grid', gap: 8 }}>
            <Link href="/admin/sources" style={{ color: '#a8b6ff' }}>Open sources</Link>
          </div>
        </SectionCard>
        <SectionCard title="Narratives">
          <p style={{ color: '#cfd7ef' }}>Create and edit narratives, claims, evidence, counterpoints, and action signals.</p>
          <div style={{ display: 'grid', gap: 8 }}>
            <Link href="/admin/narratives" style={{ color: '#a8b6ff' }}>Open narratives</Link>
            <Link href="/admin/narratives/new" style={{ color: '#a8b6ff' }}>New narrative</Link>
          </div>
        </SectionCard>
        <SectionCard title="Quick create">
          <p style={{ color: '#cfd7ef' }}>Add first operational records directly.</p>
          <div style={{ display: 'grid', gap: 8 }}>
            <Link href="/admin/claims/new" style={{ color: '#a8b6ff' }}>New claim</Link>
            <Link href="/admin/evidence/new" style={{ color: '#a8b6ff' }}>New evidence</Link>
            <Link href="/admin/counterpoints/new" style={{ color: '#a8b6ff' }}>New counterpoint</Link>
            <Link href="/admin/action-signals/new" style={{ color: '#a8b6ff' }}>New action signal</Link>
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
