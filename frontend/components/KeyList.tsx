export function KeyList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {items.map((item) => (
        <div key={item} style={{ padding: '12px 14px', borderRadius: 12, background: 'rgba(255,255,255,0.04)', color: '#dde4f8' }}>
          {item}
        </div>
      ))}
    </div>
  );
}
