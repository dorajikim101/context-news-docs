'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '../../../../lib';

export default function NewNarrativePage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', slug: '', one_line_summary: '', state: 'emerging' });
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await apiPost('/narratives', { ...form, description: '', domain: 'crypto', is_public: true });
      router.push('/admin/narratives');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1>New Narrative</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <input placeholder="one line summary" value={form.one_line_summary} onChange={(e) => setForm({ ...form, one_line_summary: e.target.value })} />
        <input placeholder="state" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} />
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Create narrative'}</button>
      </form>
    </main>
  );
}
