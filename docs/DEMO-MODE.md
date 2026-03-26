# Demo Mode

GitHub Pages now deploys a dedicated static site from `pages-demo/`.

## Why
The repository contains both a real app scaffold and a static concept demo. For Pages, the cleanest path is to deploy a pure static demo rather than force the entire Next.js app through static export.

## Demo pages
- `/`
- `/narratives/crypto-policy-pivot.html`
- `/narratives/ai-infra-overbuild.html`


## Landing decision
The landing page should show:
1. a combined narrative overview graph first
2. summary metrics second
3. individual narrative cards below

Graph semantics currently chosen:
- thickness = attention share
- y-position = conviction-first, confidence-adjusted composite axis
- right edge = current time
- left drag/pan = historical flow exploration (target interaction for richer implementation)
