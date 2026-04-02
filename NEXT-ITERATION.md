# FlowDock Next Iteration

## Current state

FlowDock is no longer in the “raw scaffold” phase.

Current real state:
- homepage / about / docs / templates / use-cases are all landed
- Diagnose is live as an explainable rule-based router
- Diagnose keeps the server-page + server-action boundary from the previous refactor
- Diagnose client shell is now split into focused modules instead of one giant client file
- a dedicated `npm run smoke:diagnose` regression path now exists
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
- only continue UI拆分 when it clearly improves maintainability or testability

Primary targets:
- `app/diagnose/page.tsx`
- `app/diagnose/diagnose-client-page.tsx`
- `app/diagnose/diagnose-result-panel.tsx`
- `lib/diagnose/analyzer.ts`
- `types/diagnose.ts`

## Current stable baseline

```bash
npm run lint && npm run build && npm run smoke:diagnose
```

Status: passed

## Important current facts

- repo path: `/home/qz057/.openclaw/workspace/flowdock`
- branch: `master`
- latest pushed Diagnose follow-up includes:
  - `b3ef5b6` — split Diagnose page into server page, client shell, server action
  - `d821974` — slim Noto Sans SC bundle and ignore local `.codex`
  - `3bec232` — split Diagnose client shell into focused modules
  - `4cbec9e` — add Diagnose smoke regression and docs guardrails
- repo-local push hardening now prefers: `ssh://git@ssh.github.com:443/qz057/-123.git`
- production deploy confirmed live after the current closeout
- current production deployment: `dpl_2iEvt91khNjj8A9wPwFWZb5vu6na` (`flowdock-3b0nef6ls-qz67651024-9181s-projects.vercel.app`)
- 2026-04-02 deployment drift was fixed by checking Vercel alias state, then running a fresh `npx vercel --prod --yes` from current HEAD

## Working rule for future work

Future work should start as **new follow-up commits**, not by rebuilding the now-closed content baseline.
