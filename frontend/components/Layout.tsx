import Link from 'next/link';

export function Layout({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 72px' }}>
      <header style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          <div>
            <p style={{ color: '#98a2c7', margin: '0 0 8px', letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: 12 }}>{eyebrow}</p>
            <h1 style={{ fontSize: 42, lineHeight: 1.05, margin: 0 }}>{title}</h1>
          </div>
          <nav style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/demo" style={{ color: '#a8b6ff' }}>Demo Home</Link>
            <Link href="/demo/narratives/crypto-policy-pivot" style={{ color: '#a8b6ff' }}>Policy Pivot</Link>
            <Link href="/demo/narratives/ai-infra-overbuild" style={{ color: '#a8b6ff' }}>AI Infra</Link>
          </nav>
        </div>
        {subtitle ? <p style={{ color: '#c8d0ea', lineHeight: 1.65, maxWidth: 820, margin: 0 }}>{subtitle}</p> : null}
      </header>
      {children}
    </main>
  );
}
