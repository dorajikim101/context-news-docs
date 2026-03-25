# Context News Frontend

## Two modes

### 1. Static demo (GitHub Pages-friendly)
Uses mock data under `demo-data/`.

Relevant routes:
- `/demo`
- `/demo/narratives/[slug]`

### 2. App scaffold
Uses backend API when available.

Relevant routes:
- `/`
- `/admin`
- `/admin/sources`
- `/admin/narratives`
- `/settings/sources`
- `/personalized`

## Local run
```bash
npm install
export NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
export NEXT_PUBLIC_ADMIN_TOKEN=dev-admin-token
npm run dev
```
