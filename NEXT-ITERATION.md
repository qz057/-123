# FlowDock Next Iteration

## Recommended priority order

### P1 — homepage design-grade polish
Focus:
- stronger graphic hierarchy
- more memorable visual identity
- tighter spacing rhythm
- better contrast and emphasis between key sections

Primary targets:
- Hero
- Product Journey
- Final CTA
- section transitions / rhythm

### P2 — deeper scenario content
Focus:
- expand Docs / About / Use Cases with more scenario-specific content
- add more concrete examples, role-specific guidance, and edge-case notes

Primary targets:
- `/docs/*`
- `/about`
- `/use-cases/*`

### P3 — Diagnose V2+
Focus:
- richer weighting model
- more scenario examples
- more failure-signal patterns
- more precise resource recommendations

Primary targets:
- `app/diagnose/page.tsx`
- `lib/diagnose/analyzer.ts`
- `types/diagnose.ts`

## Current stable baseline

```bash
npm run lint && npm run build
```

Status: passed

## Important current fact

This repo has already been:
- commit-split
- author-corrected
- pushed to `origin/master`

So future work should start as **new follow-up commits**, not by rebuilding old local closeout steps.
