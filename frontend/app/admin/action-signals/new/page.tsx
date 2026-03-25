'use client';

import { useState } from 'react';
import { apiPost } from '../../../../lib';

export default function NewActionSignalPage() {
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ narrative_id: '', signal_type: 'investment', title: '', description: '', strength: '0.5' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await apiPost('/action-signals', {
        narrative_id: form.narrative_id,
        signal_type: form.signal_type,
        title: form.title,
        description: form.description,
        strength: Number(form.strength),
      });
      setStatus('Saved');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Failed');
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1>New Action Signal</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder='narrative id' value={form.narrative_id} onChange={(e) => setForm({ ...form, narrative_id: e.target.value })} />
        <input placeholder='signal type' value={form.signal_type} onChange={(e) => setForm({ ...form, signal_type: e.target.value })} />
        <input placeholder='title' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <textarea placeholder='description' value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={6} />
        <input placeholder='strength' value={form.strength} onChange={(e) => setForm({ ...form, strength: e.target.value })} />
        <button type='submit'>Create action signal</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
