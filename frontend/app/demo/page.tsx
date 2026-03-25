import Link from 'next/link';
import narratives from '../../demo-data/narratives.json';
import { SectionCard } from '../../components/SectionCard';
import { Sparkline } from '../../components/Sparkline';
import { StateBadge } from '../../components/StateBadge';
import { DeltaText } from '../../components/DeltaText';
import { Layout } from '../../components/Layout';
import { MetricCard } from '../../components/MetricCard';

export default function DemoHomePage() {
  const rising = narratives.filter((n) => n.trend[n.trend.length - 1] > n.trend[n.trend.length - 2]).length;
  const contested = narratives.filter((n) => n.state === 'contested').length;

  return (
    <Layout
      eyebrow="Static Demo"
      title="Context News Demo"
      subtitle="A GitHub Pages-friendly narrative-first concept demo. It shows how ongoing narratives can be presented as structured reading objects with state, trend, claims, counterpoints, evidence, and action signals."
    >
      <section style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', marginBottom: 28 }}>
        <MetricCard label="Narratives" value={String(narratives.length)} hint="Current mock set" />
        <MetricCard label="Rising" value={String(rising)} hint="Positive last-step delta" />
        <MetricCard label="Contested" value={String(contested)} hint="Needs active counter-reading" />
        <MetricCard label="Mode" value="Static" hint="GitHub Pages compatible" />
      </section>

      <section style={{ display: 'grid', gap: 18 }}>
        {narratives.map((item) => (
          <SectionCard key={item.id} title={item.title}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
                  <StateBadge state={item.state} />
                  <DeltaText values={item.trend} />
                  <span style={{ color: '#8e99bb', fontSize: 14 }}>Attention score {item.attention_score}</span>
                </div>
                <p style={{ margin: '0 0 12px', color: '#d7def5', lineHeight: 1.65 }}>{item.one_line_summary}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                  {item.claims.slice(0, 2).map((claim) => (
                    <span key={claim} style={{ padding: '6px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.05)', color: '#bfc8e6', fontSize: 13 }}>
                      {claim.slice(0, 56)}{claim.length > 56 ? '…' : ''}
                    </span>
                  ))}
                </div>
                <Link href={`/demo/narratives/${item.slug}`} style={{ color: '#a8b6ff' }}>
                  Open demo narrative
                </Link>
              </div>
              <div style={{ minWidth: 180, display: 'grid', alignContent: 'space-between', gap: 14 }}>
                <div style={{ padding: 14, borderRadius: 14, background: 'rgba(255,255,255,0.04)' }}>
                  <p style={{ margin: '0 0 6px', color: '#8e99bb', fontSize: 12, textTransform: 'uppercase' }}>Trend</p>
                  <Sparkline values={item.trend} />
                </div>
                <div style={{ color: '#9aa5c8', fontSize: 14 }}>
                  Claims {item.claims.length} · Counterpoints {item.counterpoints.length} · Evidence {item.evidence.length}
                </div>
              </div>
            </div>
          </SectionCard>
        ))}
      </section>
    </Layout>
  );
}
