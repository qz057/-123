# FlowDock Next Iteration

## Current state

FlowDock is no longer in the “raw scaffold” phase.

Current real state:
- homepage / about / docs / templates / use-cases are all landed
- Diagnose is live as an explainable rule-based router
- all 8 template detail pages are execution-oriented
- all 4 use-case detail pages are scenario-oriented execution pages
- docs index + core docs + product notes are now practical routing / decision / boundary docs
- production deploy is live at: <https://flowdock-eta.vercel.app>

## Recommended priority order

### P1 — consistency closeout
Focus:
- unify CN/EN naming and terminology
- tighten CTA phrasing across homepage / docs / templates / use-cases
- reduce repeated wording patterns across structurally similar pages
- trim the most text-dense sections for scanability

Primary targets:
- `/docs`
- `/docs/product-notes`
- `/templates/[slug]`
- `/use-cases/[slug]`
- homepage right-rail / CTA language

### P2 — artifact-grade examples
Focus:
- add small concrete examples, snippets, mini checklists, and “if X, go to Y” blocks
- reduce “good guidance but still abstract” feeling on the densest pages

Primary targets:
- `app/docs/troubleshooting/page.tsx`
- `app/docs/templates/page.tsx`
- `app/templates/[slug]/page.tsx`
- `app/use-cases/[slug]/page.tsx`

### P3 — beta feedback / product QA
Focus:
- walk real user paths end to end
- identify hesitation / confusion / dead-end points
- tighten Diagnose → Templates / Use Cases → Docs loops based on actual friction

Primary targets:
- homepage entry routes
- `/diagnose`
- key template pages
- docs routing points

### P4 — Diagnose V2+
Focus:
- richer weighting model
- more scenario examples
- stronger failure-signal patterns
- tighter resource recommendation quality

Primary targets:
- `app/diagnose/page.tsx`
- `lib/diagnose/analyzer.ts`
- `types/diagnose.ts`

## Current stable baseline

```bash
npm run lint && npm run build
```

Status: passed

## Important current facts

- repo path: `/home/qz057/.openclaw/workspace/flowdock`
- branch: `master`
- latest pushed content closeout includes:
  - `867a8c9` — shell + homepage framing
  - `57614a3` — templates + use-cases content deepening
  - `200b39e` — docs system deepening
- production deploy confirmed live after the current closeout

## Working rule for future work

Future work should start as **new follow-up commits**, not by rebuilding the now-closed content baseline.
