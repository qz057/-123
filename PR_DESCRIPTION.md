# Summary

This PR hardens the Diagnose path on top of the existing FlowDock beta baseline.

Main outcomes:
- keeps the existing homepage / templates / use-cases / docs baseline intact
- preserves the Diagnose server-page + server-action boundary
- splits the oversized Diagnose client shell into focused modules
- adds a dedicated `npm run smoke:diagnose` regression path
- adds explicit Diagnose edit / regression guidance to `/docs/diagnose`
- standardizes this repo’s push workflow around GitHub SSH over 443 in the local operator notes

# Why

The previous Diagnose refactor fixed the main server/client boundary, but the client layer was still too large and follow-up edits were too easy to regress quietly.

This PR makes the Diagnose surface easier to maintain and gives future edits a small, repeatable regression path instead of relying only on `lint` / `build`.

# What changed

## Diagnose structure

Refactored the client shell into focused files:
- `app/diagnose/diagnose-header.tsx`
- `app/diagnose/diagnose-form-panels.tsx`
- `app/diagnose/diagnose-result-panel.tsx`
- `app/diagnose/diagnose-example-cases.tsx`
- `app/diagnose/use-diagnose-flow.ts`

Preserved the existing boundary rules:
- `app/diagnose/page.tsx` stays a small server page
- `analyzeDiagnose` stays out of the client import chain
- client-side execution still goes through the server action path

## Regression guardrail

Added:
- `scripts/diagnose-smoke.sh`
- `package.json` script: `npm run smoke:diagnose`

The smoke path checks:
- Diagnose server/client boundary did not regress
- key file-size / composition assumptions still hold
- `/diagnose` renders expected key copy
- `/docs/diagnose` renders the expected operator guidance

## Docs / operator guidance

Updated `/docs/diagnose` so future edits have a clear minimum-safe workflow:
1. preserve the analyzer boundary
2. run `npm run smoke:diagnose`
3. run `npm run lint && npm run build`

## Closeout notes

Synced closeout docs to the current Diagnose-hardening state:
- `PR_DESCRIPTION.md`
- `DELIVERY.md`
- `NEXT-ITERATION.md`

# Validation

Passed locally:

```bash
npm run lint
npm run build
npm run smoke:diagnose
```

Smoke confirmed:
- `/diagnose`
- `/docs/diagnose`

# Commit shape

Relevant commits in order:
- `b3ef5b6` — `refactor(diagnose): split page into server page, client shell and server action`
- `d821974` — `perf(fonts): slim Noto Sans SC bundle and ignore local .codex marker`
- `3bec232` — `refactor(diagnose): split client shell into focused modules`
- `4cbec9e` — `test(diagnose): add smoke regression and docs guardrails`
- `97a0bb8` — `docs: sync closeout notes for diagnose hardening`

# Notes

Known limits:
- Diagnose is still a rule-based system, not a free-form diagnostic engine
- some text-heavy pages still need more concrete examples / snippets
- local `origin/master` tracking may lag if fetch over 443 times out, even when push already succeeded

Follow-up candidates:
- consistency closeout for CN/EN naming and CTA phrasing
- real beta / product QA path walk-throughs
- further presentational splitting only if Diagnose UI grows again
