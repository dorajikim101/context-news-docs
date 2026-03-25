'use client';

import { useState } from 'react';
import { apiPost } from '../../../../lib';

export default function NewEvidencePage() {
  const [status, setStatus] = useState('');
  const [form, setForm] = useState({ title: '', url: '', evidence_type: 'article', excerpt: '' });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('Saving...');
    try {
      await apiPost('/evidence', form);
      setStatus('Saved');
    } catch (e) {
      setStatus(e instanceof Error ? e.message : 'Failed');
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1>New Evidence</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder='title' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder='url' value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} />
        <input placeholder='evidence type' value={form.evidence_type} onChange={(e) => setForm({ ...form, evidence_type: e.target.value })} />
        <textarea placeholder='excerpt' value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={6} />
        <button type='submit'>Create evidence</button>
      </form>
      <p>{status}</p>
    </main>
  );
}
