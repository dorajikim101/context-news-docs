export function DeltaText({ values }: { values: number[] }) {
  if (values.length < 2) return <span style={{ color: '#7f89aa' }}>No delta</span>;
  const delta = values[values.length - 1] - values[values.length - 2];
  const color = delta > 0 ? '#74d7c3' : delta < 0 ? '#ff8c9a' : '#a9b1cf';
  const sign = delta > 0 ? '+' : '';
  return <span style={{ color }}>{sign}{delta}</span>;
}
