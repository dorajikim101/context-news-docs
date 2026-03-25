const sections = [
  'Admin CMS first',
  'Narrative list home',
  'Narrative detail page',
  'Minimal personalization',
];

export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '48px 24px' }}>
      <p style={{ color: '#98a2c7', marginBottom: 8 }}>Context News MVP</p>
      <h1 style={{ fontSize: 40, margin: '0 0 16px' }}>Narrative editing CMS + reading surface</h1>
      <p style={{ color: '#c8d0ea', lineHeight: 1.6, maxWidth: 720 }}>
        This scaffold is the implementation starting point for the first MVP: a crypto-focused,
        semi-automated narrative editing system with an external reading surface.
      </p>
      <section style={{ marginTop: 32, display: 'grid', gap: 12 }}>
        {sections.map((item) => (
          <div key={item} style={{ padding: 16, borderRadius: 12, background: '#171c30', border: '1px solid rgba(255,255,255,0.08)' }}>
            {item}
          </div>
        ))}
      </section>
    </main>
  );
}
