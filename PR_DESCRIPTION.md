# FlowDock: diagnose hardening follow-up on top of beta-presentable baseline

## Summary

This branch no longer just ships the first beta-presentable FlowDock surface — it also hardens the Diagnose path so follow-up iteration is safer and easier to verify.

Core result:
- homepage / templates / use-cases / docs baseline remains intact
- Diagnose still keeps the server-page + server-action boundary from the previous refactor
- the Diagnose client shell is now split into focused modules instead of one giant client file
- a dedicated `smoke:diagnose` regression path now exists
- `/docs/diagnose` now documents the minimum safe regression path for future edits
- push routing for this repo is now intended to use GitHub SSH over 443 for reliability in this environment

## What changed

### 1) Kept the existing beta baseline intact
Previously landed product work remains the base of this branch:
- homepage is framework-first and action-oriented
- Diagnose is live as an explainable diagnostic router
- template pages are execution-oriented
- use-case pages are scenario execution pages
- docs function as routing / decision / boundary docs
- product notes clearly state maturity and current limits

### 2) Split the Diagnose client shell into focused modules
The client layer is no longer a single oversized implementation file.

New structure:
- `app/diagnose/diagnose-header.tsx`
- `app/diagnose/diagnose-form-panels.tsx`
- `app/diagnose/diagnose-result-panel.tsx`
- `app/diagnose/diagnose-example-cases.tsx`
- `app/diagnose/use-diagnose-flow.ts`

Key intent:
- keep `app/diagnose/page.tsx` as a small server page
- keep `analyzeDiagnose` out of the client import chain
- isolate form flow / state / result rendering / examples into reusable slices

### 3) Added a real Diagnose smoke regression path
New command:

```bash
npm run smoke:diagnose
```

This smoke path verifies:
- server/client boundary did not regress
- `page.tsx` remains small and server-owned
- `diagnose-client-page.tsx` stays as a thin composition layer
- `/diagnose` renders with expected key copy
- `/docs/diagnose` renders with expected regression guidance

### 4) Upgraded Diagnose docs into change-safe operator guidance
`/docs/diagnose` now includes explicit guidance for future page edits:
- run `npm run smoke:diagnose` before calling the page done
- preserve the server-side analyzer boundary
- follow with `npm run lint && npm run build`

### 5) Closed the remaining operator drift for this repo round
- updated delivery / closeout notes to reflect the new Diagnose follow-up state
- updated next-iteration guidance to start from the new stable baseline
- repo push routing is now meant to prefer GitHub SSH over 443 in this environment

## Validation

Validated locally with:

```bash
npm run lint && npm run build && npm run smoke:diagnose
```

Result: **passed**

Smoke confirmed:
- `/diagnose`
- `/docs/diagnose`

Live production base remains:
- <https://flowdock-eta.vercel.app>

## Latest commit shape

This follow-up was intentionally grouped into logical slices:
1. `b3ef5b6` — split Diagnose page into server page, client shell, server action
2. `d821974` — slim Noto Sans SC bundle and ignore local `.codex` marker
3. `3bec232` — split Diagnose client shell into focused modules
4. `4cbec9e` — add Diagnose smoke regression and docs guardrails

## Known limits

- mixed CN/EN naming is still not fully unified
- some dense pages still need more concrete snippets / worked examples
- Diagnose is still a rule-based system, not a full free-form diagnostic engine
- `origin/master` local tracking can lag in this environment when fetch over 443 times out, even if push already succeeded

## Suggested next steps

1. run a consistency closeout pass (terminology / CTA / scanability)
2. or switch to real beta / product QA and collect path-level friction
3. if Diagnose keeps growing, continue splitting large UI sections into smaller presentational units
