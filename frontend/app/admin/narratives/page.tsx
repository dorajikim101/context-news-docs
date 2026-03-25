import Link from 'next/link';
import { SectionCard } from '../../../components/SectionCard';

const narratives = [
  ['AI Infra Overbuild', 'growing', 'ai-infra-overbuild'],
  ['Crypto Policy Pivot', 'contested', 'crypto-policy-pivot'],
];

export default function AdminNarrativesPage() {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <h1>Admin / Narratives</h1>
      <div style={{ display: 'grid', gap: 16 }}>
        {narratives.map(([title, state, slug]) => (
          <SectionCard key={slug} title={title}>
            <p style={{ color: '#cfd7ef' }}>State: {state}</p>
            <Link href={`/narratives/${slug}`} style={{ color: '#a8b6ff' }}>Preview public page</Link>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
