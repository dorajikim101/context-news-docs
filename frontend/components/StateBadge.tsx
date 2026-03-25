const COLORS: Record<string, string> = {
  emerging: '#8aa1ff',
  growing: '#74d7c3',
  contested: '#ffbf73',
  stabilizing: '#c2b6ff',
  fading: '#ff8c9a',
};

export function StateBadge({ state }: { state: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: 999,
        background: 'rgba(255,255,255,0.06)',
        border: `1px solid ${COLORS[state] || '#a8b6ff'}`,
        color: COLORS[state] || '#a8b6ff',
        fontSize: 12,
        textTransform: 'capitalize',
      }}
    >
      {state}
    </span>
  );
}
