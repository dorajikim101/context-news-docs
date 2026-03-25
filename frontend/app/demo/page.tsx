import Link from 'next/link';
import narratives from '../../demo-data/narratives.json';
import { SectionCard } from '../../components/SectionCard';
import { Sparkline } from '../../components/Sparkline';
import { StateBadge } from '../../components/StateBadge';
import { DeltaText } from '../../components/DeltaText';

export default function DemoHomePage() {
  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <p style={{ color: '#98a2c7', marginBottom: 8 }}>Static Demo</p>
      <h1 style={{ fontSize: 40, margin: '0 0 16px' }}>Context News Demo</h1>
      <p style={{ color: '#c8d0ea', lineHeight: 1.6, maxWidth: 760 }}>
        This is a GitHub Pages-friendly static demo of the Context News concept: narrative-first reading,
        state badges, trend indication, and narrative detail pages with claims, counterpoints, evidence, and action signals.
      </p>
      <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
        {narratives.map((item) => (
          <SectionCard key={item.id} title={item.title}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 260 }}>
                <p style={{ margin: '0 0 8px', color: '#d7def5' }}>{item.one_line_summary}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <StateBadge state={item.state} />
                  <DeltaText values={item.trend} />
                </div>
                <p style={{ margin: 0, color: '#9aa5c8' }}>Attention score: {item.attention_score}</p>
                <div style={{ marginTop: 12 }}>
                  <Link href={`/demo/narratives/${item.slug}`} style={{ color: '#a8b6ff' }}>
                    Open demo narrative
                  </Link>
                </div>
              </div>
              <div style={{ minWidth: 120 }}>
                <Sparkline values={item.trend} />
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </main>
  );
}
