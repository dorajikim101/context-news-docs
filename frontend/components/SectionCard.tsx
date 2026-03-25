export function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        padding: 20,
        borderRadius: 16,
        background: '#171c30',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: 20 }}>{title}</h2>
      {children}
    </section>
  );
}
