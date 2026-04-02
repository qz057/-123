# FlowDock Delivery Note

## Repo Reality

- Repo path: `/home/qz057/.openclaw/workspace/flowdock`
- Branch: `master`
- Remote fetch URL: `git@github.com:qz057/-123.git`
- Remote push URL: `ssh://git@ssh.github.com:443/qz057/-123.git`
- Push route is now hardened via local repo config: `remote.origin.pushurl`
- Tracking target: `master -> origin/master`
- Working tree at closeout: **clean after commit**

## Current Verified Baseline

Validation command:

```bash
npm run lint && npm run build && npm run smoke:diagnose
```

Latest local result: **passed**

Production smoke (verified live):

- `https://flowdock-eta.vercel.app/` → `200`, contains `FlowDock`
- `https://flowdock-eta.vercel.app/diagnose` → `200`, contains `配置诊断器`
- `https://flowdock-eta.vercel.app/docs/diagnose` → `200`, contains `smoke:diagnose`
- `https://flowdock-eta.vercel.app/docs` → `200`
- `https://flowdock-eta.vercel.app/docs/product-notes` → `200`
- `https://flowdock-eta.vercel.app/templates/config-not-applied` → `200`
- `https://flowdock-eta.vercel.app/templates/model-switch-session-mismatch` → `200`
- `https://flowdock-eta.vercel.app/templates/automation-health-check` → `200`
- `https://flowdock-eta.vercel.app/templates/desktop-tool-integration` → `200`

## Current Live Deployment

- Production URL: <https://flowdock-eta.vercel.app>
- Current production deployment URL: <https://flowdock-3b0nef6ls-qz67651024-9181s-projects.vercel.app>
- Deployment ID: `dpl_2iEvt91khNjj8A9wPwFWZb5vu6na`
- Inspect URL: <https://vercel.com/qz67651024-9181s-projects/flowdock/2iEvt91khNjj8A9wPwFWZb5vu6na>

## Deployment Recovery Note

On 2026-04-02, production drift was investigated and fixed.

What happened:
- GitHub `master` already had the latest commits
- Vercel had created a newer deployment, but it was only a `preview` deployment
- `flowdock-eta.vercel.app` was still aliased to an older production deployment, so `/docs/diagnose` served stale content

What was done:
- promoted `flowdock-pzm5dtgqd-qz67651024-9181s-projects.vercel.app`
- confirmed that promoted deployment still did not contain the latest docs copy
- ran a fresh production deploy from current local HEAD with `npx vercel --prod --yes`
- Vercel aliased `flowdock-eta.vercel.app` to the new production deployment `flowdock-3b0nef6ls-qz67651024-9181s-projects.vercel.app`

Final proof:
- production `/docs/diagnose` now contains:
  - `smoke:diagnose`
  - `改页时最小回归`
  - `如果你正在迭代 Diagnose 本页本身`

## What Is Now Landed

### Product surface
- Homepage has been tightened into a framework-first landing page with practical clickable entries
- Header / footer / page chrome / card language are unified enough for beta presentation
- About page is aligned to the current product framing

### Diagnose
- `/diagnose` is live as an explainable, rule-based diagnostic router
- server page + server action boundary is preserved
- Diagnose client shell is now further split into focused modules:
  - `diagnose-header.tsx`
  - `diagnose-form-panels.tsx`
  - `diagnose-result-panel.tsx`
  - `diagnose-example-cases.tsx`
  - `use-diagnose-flow.ts`
- Diagnose docs now explain when to use it, how to read it, what it does **not** claim to solve, and how to run the minimum safe regression path after edits
- a dedicated regression command now exists: `npm run smoke:diagnose`

### Templates
- `/templates` center is live
- All 8 template detail pages are now execution-oriented instead of shallow placeholders
- The 8 templates cover:
  - local-ai-assistant-starter
  - openclaw-bootstrap
  - model-connection-debug
  - config-not-applied
  - model-switch-session-mismatch
  - automation-health-check
  - ai-workflow-starter
  - desktop-tool-integration

### Use Cases
- `/use-cases` center is live
- All 4 use-case detail pages are now scenario execution pages, not just summaries

### Docs
- `/docs` index now works as a practical reading / routing hub
- Core docs are execution / decision docs, not overview placeholders:
  - `getting-started`
  - `diagnose`
  - `templates`
  - `troubleshooting`
  - `product-notes`

## Latest Commit Shape

Most recent pushed commits:

1. `4cbec9e` — `test(diagnose): add smoke regression and docs guardrails`
2. `3bec232` — `refactor(diagnose): split client shell into focused modules`
3. `d821974` — `perf(fonts): slim Noto Sans SC bundle and ignore local .codex marker`
4. `b3ef5b6` — `refactor(diagnose): split page into server page, client shell and server action`

Earlier commits on the same branch already contain the homepage / templates / use-cases / docs baseline.

## Push Status

Latest push succeeded with GitHub SSH over 443.

Repo-local hardening now set:

```bash
git config remote.origin.pushurl ssh://git@ssh.github.com:443/qz057/-123.git
```

One-shot fallback command if needed:

```bash
GIT_SSH_COMMAND='ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new -p 443' \
  git push ssh://git@ssh.github.com:443/qz057/-123.git master:master
```

## Local Proof Artifacts

Local screenshot / QA artifacts were intentionally kept out of git and ignored via `.gitignore`:

- `.task-state/docs-content-pass-v1/`
- `.task-state/phase-next-pass/`
- `.task-state/template-content-pass-v3/`
- `.task-state/usecase-content-pass-v1/`

## Known Limits

- The product is now **beta-presentable and practically usable**, but not a final polish-complete release
- Mixed Chinese / English naming still has some inconsistency (`Getting Started`, `Templates`, `Product Notes`, etc.)
- Some pages are still text-dense and could benefit from more examples, snippets, or operator-style mini tables
- Diagnose is still a rule-based system, not a free-form all-scenarios diagnostic engine

## Recommended Next Phase

Pick one of these, not both at once:

1. **Consistency closeout**
   - unify terminology / CTA phrasing / bilingual naming
   - tighten sidebar wording and page rhythm
   - add 1–2 concrete examples or snippets to the densest execution pages

2. **Beta / product QA loop**
   - walk real user paths end to end
   - collect confusion points / hesitation points / dead-end links
   - promote repeated findings into the docs / templates / diagnose logic

3. **Diagnose UI further split only if needed**
   - current split is already workable and regression-guarded
   - continue拆分时，优先拆 presentational sections，不要破坏 server/client 边界与 smoke 路径
