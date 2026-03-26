# Demo Mode

GitHub Pages deploys a dedicated static site from `pages-demo/`.

## Why
The repository contains both a real app scaffold and a static concept demo. For Pages, the cleanest path is to deploy a pure static demo rather than force the entire Next.js app through static export.

## Demo pages
- `/`
- `/narratives/crypto-policy-pivot.html`
- `/narratives/ai-infra-overbuild.html`

## Current demo semantics
- Landing shows a combined narrative overview first
- Below that, cards show individual narratives
- The overview includes not only strong narratives but also lower-layer weak signals and rumor-level narratives
- thickness = attention share
- y-position = conviction-first, confidence-adjusted composite
