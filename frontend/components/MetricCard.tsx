export function MetricCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div style={{ padding: 18, borderRadius: 16, background: '#171c30', border: '1px solid rgba(255,255,255,0.08)' }}>
      <p style={{ margin: '0 0 6px', color: '#93a0c8', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
      <p style={{ margin: '0 0 6px', color: '#f3f6ff', fontSize: 28, fontWeight: 700 }}>{value}</p>
      {hint ? <p style={{ margin: 0, color: '#98a2c7', fontSize: 14 }}>{hint}</p> : null}
    </div>
  );
}
