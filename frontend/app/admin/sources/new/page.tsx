'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '../../../../lib';

export default function NewSourcePage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', slug: '', source_type: 'research', source_status: 'candidate' });
  const [saving, setSaving] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await apiPost('/sources', { ...form, base_weight: 1.0, active: true });
      router.push('/admin/sources');
    } finally {
      setSaving(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>
      <h1>New Source</h1>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        <input placeholder="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        <input placeholder="source type" value={form.source_type} onChange={(e) => setForm({ ...form, source_type: e.target.value })} />
        <input placeholder="source status" value={form.source_status} onChange={(e) => setForm({ ...form, source_status: e.target.value })} />
        <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Create source'}</button>
      </form>
    </main>
  );
}
