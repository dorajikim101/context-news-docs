export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
export const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN || 'dev-admin-token';
export const DEMO_USER_EMAIL = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL || 'demo@context.news';

async function parseJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function apiGet<T>(path: string, options?: { userEmail?: string }): Promise<T> {
  const headers: Record<string, string> = {};
  if (options?.userEmail) headers['X-User-Email'] = options.userEmail;
  const res = await fetch(`${API_BASE_URL}${path}`, { cache: 'no-store', headers });
  return parseJson<T>(res);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Admin-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify(body),
  });
  return parseJson<T>(res);
}

export async function apiPut<T>(path: string, body: unknown, options?: { userEmail?: string }): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (options?.userEmail) headers['X-User-Email'] = options.userEmail;
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });
  return parseJson<T>(res);
}

export type Narrative = {
  id: string;
  title: string;
  slug: string;
  one_line_summary?: string | null;
  state: string;
  attention_score?: number;
  attention_share?: number;
  conviction_score?: number;
  conviction_share?: number;
  confidence_score?: number;
};

export type Source = {
  id: string;
  name: string;
  slug: string;
  source_type: string;
  source_status: string;
  base_weight: number;
  active: boolean;
};

export type SourcePreference = {
  id: string;
  user_id: string;
  source_id: string;
  enabled: boolean;
  weight_level: 'low' | 'default' | 'high';
};
