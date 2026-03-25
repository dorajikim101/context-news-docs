'use client';

import { useState } from 'react';
import { apiPost } from '../../../../lib';

export default function NewClaimPage() {
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ narrative_id: '', claim_text: '', claim_type: 'interpretation', confidence: '0.5' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await apiPost('/claims', {
        narrative_id: form.narrative_id,
        claim_text: form.claim_text,
        claim_type: form.claim_type,
        confidence: Number(form.confidence),
      });
      setStatus('Saved');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Failed');
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1>New Claim</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder='narrative id' value={form.narrative_id} onChange={(e) => setForm({ ...form, narrative_id: e.target.value })} />
        <textarea placeholder='claim text' value={form.claim_text} onChange={(e) => setForm({ ...form, claim_text: e.target.value })} rows={6} />
        <input placeholder='claim type' value={form.claim_type} onChange={(e) => setForm({ ...form, claim_type: e.target.value })} />
        <input placeholder='confidence' value={form.confidence} onChange={(e) => setForm({ ...form, confidence: e.target.value })} />
        <button type='submit'>Create claim</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
