export function Sparkline({ values }: { values: number[] }) {
  if (!values.length) return <span style={{ color: '#7f89aa' }}>No trend</span>;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(max - min, 1);
  const points = values
    .map((v, i) => `${(i / Math.max(values.length - 1, 1)) * 100},${40 - ((v - min) / range) * 30}`)
    .join(' ');
  return (
    <svg width="120" height="40" viewBox="0 0 100 40" preserveAspectRatio="none">
      <polyline fill="none" stroke="#a8b6ff" strokeWidth="2" points={points} />
    </svg>
  );
}
