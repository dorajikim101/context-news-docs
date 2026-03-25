import Link from 'next/link';
import { SectionCard } from '../components/SectionCard';

const narratives = [
  { slug: 'ai-infra-overbuild', title: 'AI Infra Overbuild', state: 'Growing', summary: 'CAPEX and power demand are outpacing proven monetization.' },
  { slug: 'crypto-policy-pivot', title: 'Crypto Policy Pivot', state: 'Contested', summary: 'Policy signals are improving, but durability is not yet clear.' },
];

export default function HomePage() {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <p style={{ color: '#98a2c7', marginBottom: 8 }}>Public Reading Surface</p>
      <h1 style={{ fontSize: 40, margin: '0 0 24px' }}>Context News MVP</h1>
      <div style={{ display: 'grid', gap: 16 }}>
        {narratives.map((item) => (
          <SectionCard key={item.slug} title={item.title}>
            <p style={{ margin: '0 0 8px', color: '#d7def5' }}>{item.summary}</p>
            <p style={{ margin: 0, color: '#9aa5c8' }}>State: {item.state}</p>
            <div style={{ marginTop: 12 }}>
              <Link href={`/narratives/${item.slug}`} style={{ color: '#a8b6ff' }}>
                Open narrative
              </Link>
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
