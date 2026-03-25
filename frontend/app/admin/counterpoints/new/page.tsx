'use client';

import { useState } from 'react';
import { apiPost } from '../../../../lib';

export default function NewCounterpointPage() {
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ narrative_id: '', counterpoint_text: '', counterpoint_type: 'rebuttal', strength: '0.5' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await apiPost('/counterpoints', {
        narrative_id: form.narrative_id,
        counterpoint_text: form.counterpoint_text,
        counterpoint_type: form.counterpoint_type,
        strength: Number(form.strength),
      });
      setStatus('Saved');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Failed');
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1>New Counterpoint</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder='narrative id' value={form.narrative_id} onChange={(e) => setForm({ ...form, narrative_id: e.target.value })} />
        <textarea placeholder='counterpoint text' value={form.counterpoint_text} onChange={(e) => setForm({ ...form, counterpoint_text: e.target.value })} rows={6} />
        <input placeholder='counterpoint type' value={form.counterpoint_type} onChange={(e) => setForm({ ...form, counterpoint_type: e.target.value })} />
        <input placeholder='strength' value={form.strength} onChange={(e) => setForm({ ...form, strength: e.target.value })} />
        <button type='submit'>Create counterpoint</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
