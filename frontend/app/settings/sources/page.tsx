'use client';

import { useEffect, useMemo, useState } from 'react';
import { API_BASE_URL, DEMO_USER_EMAIL, type Source, type SourcePreference, apiPut } from '../../../lib';

type Row = Source & { prefEnabled: boolean; prefWeight: 'low' | 'default' | 'high' };

export default function SourceSettingsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function load() {
      const [sourcesRes, prefsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/sources`),
        fetch(`${API_BASE_URL}/me/source-preferences`, { headers: { 'X-User-Email': DEMO_USER_EMAIL } }),
      ]);
      const sources: Source[] = await sourcesRes.json();
      const prefs: SourcePreference[] = await prefsRes.json();
      const prefMap = new Map(prefs.map((p) => [p.source_id, p]));
      setRows(
        sources.map((s) => ({
          ...s,
          prefEnabled: prefMap.get(s.id)?.enabled ?? true,
          prefWeight: prefMap.get(s.id)?.weight_level ?? 'default',
        }))
      );
    }
    load().catch((e) => setStatus(e instanceof Error ? e.message : 'Failed to load'));
  }, []);

  const sorted = useMemo(() => [...rows].sort((a, b) => a.name.localeCompare(b.name)), [rows]);

  async function save(sourceId: string, enabled: boolean, weight_level: 'low' | 'default' | 'high') {
    await apiPut(`/me/source-preferences/${sourceId}`, { enabled, weight_level }, { userEmail: DEMO_USER_EMAIL });
  }

  return (
    <main style={{ maxWidth: 1040, margin: '0 auto', padding: '48px 24px' }}>
      <h1>Source Preferences</h1>
      <p style={{ color: '#9aa5c8' }}>Minimal personalization for the MVP: source on/off and 3-level weighting.</p>
      {status ? <p>{status}</p> : null}
      <div style={{ display: 'grid', gap: 12 }}>
        {sorted.map((row) => (
          <div key={row.id} style={{ padding: 16, borderRadius: 12, background: '#171c30', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <strong>{row.name}</strong>
                <div style={{ color: '#9aa5c8', marginTop: 4 }}>{row.source_type} / {row.source_status}</div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <label>
                  <input
                    type='checkbox'
                    checked={row.prefEnabled}
                    onChange={async (e) => {
                      const enabled = e.target.checked;
                      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, prefEnabled: enabled } : r)));
                      await save(row.id, enabled, row.prefWeight);
                    }}
                  />{' '}enabled
                </label>
                <select
                  value={row.prefWeight}
                  onChange={async (e) => {
                    const weight = e.target.value as 'low' | 'default' | 'high';
                    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, prefWeight: weight } : r)));
                    await save(row.id, row.prefEnabled, weight);
                  }}
                >
                  <option value='low'>low</option>
                  <option value='default'>default</option>
                  <option value='high'>high</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
