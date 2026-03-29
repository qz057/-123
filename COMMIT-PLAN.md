# FlowDock Commit Plan

> 目标：把当前庞杂但已验证通过的本地工作树，拆成**可复用、可读、可恢复**的 5 个提交切片。  
> 当前前提：`npm run lint && npm run build` 已通过；repo 还没有 remote。

## 当前事实

- Repo path: `/home/qz057/.openclaw/workspace/flowdock`
- Branch: `master`
- Remote: none
- Verified baseline:

```bash
npm run lint && npm run build
```

---

## Commit Slice 1 — scaffold / runtime base

### 目标
先把项目脚手架、运行时、基础 UI 和基础配置稳定下来。

### 建议包含
- `.gitignore`
- `package.json`
- `package-lock.json`
- `next.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `postcss.config.mjs`
- `components.json`
- `app/layout.tsx`
- `app/globals.css`
- `app/favicon.ico`
- `lib/utils.ts`
- `components/ui/button.tsx`
- `components/ui/badge.tsx`
- `components/ui/card.tsx`
- `components/ui/input.tsx`
- `components/ui/select.tsx`
- `components/ui/textarea.tsx`
- `public/file.svg`
- `public/globe.svg`
- `public/next.svg`
- `public/vercel.svg`
- `public/window.svg`

### 命令
```bash
git add .gitignore package.json package-lock.json next.config.ts tsconfig.json eslint.config.mjs postcss.config.mjs components.json \
  app/layout.tsx app/globals.css app/favicon.ico \
  lib/utils.ts \
  components/ui/button.tsx components/ui/badge.tsx components/ui/card.tsx components/ui/input.tsx components/ui/select.tsx components/ui/textarea.tsx \
  public/file.svg public/globe.svg public/next.svg public/vercel.svg public/window.svg

git commit -m "chore: scaffold FlowDock runtime and UI foundation"
```

---

## Commit Slice 2 — diagnose engine and interactive diagnose page

### 目标
把 Diagnose 作为首个真工具单独成一个完整提交。

### 建议包含
- `app/diagnose/page.tsx`
- `lib/diagnose/analyzer.ts`
- `lib/diagnose/rules.ts`
- `types/diagnose.ts`

### 命令
```bash
git add app/diagnose/page.tsx lib/diagnose/analyzer.ts lib/diagnose/rules.ts types/diagnose.ts

git commit -m "feat: add FlowDock diagnose tool with explainable results"
```

---

## Commit Slice 3 — templates / docs / use-cases / about content system

### 目标
把内容系统和执行型页面结构放到同一层，形成完整信息架构。

### 建议包含
- `app/templates/page.tsx`
- `app/templates/[slug]/page.tsx`
- `app/docs/page.tsx`
- `app/docs/diagnose/page.tsx`
- `app/docs/getting-started/page.tsx`
- `app/docs/product-notes/page.tsx`
- `app/docs/templates/page.tsx`
- `app/docs/troubleshooting/page.tsx`
- `app/use-cases/page.tsx`
- `app/use-cases/[slug]/page.tsx`
- `app/about/page.tsx`
- `data/docs/catalog.ts`
- `data/templates/catalog.ts`
- `data/use-cases/catalog.ts`
- `types/template.ts`
- `components/docs/doc-shell.tsx`

### 命令
```bash
git add app/templates/page.tsx app/templates/[slug]/page.tsx \
  app/docs/page.tsx app/docs/diagnose/page.tsx app/docs/getting-started/page.tsx app/docs/product-notes/page.tsx app/docs/templates/page.tsx app/docs/troubleshooting/page.tsx \
  app/use-cases/page.tsx app/use-cases/[slug]/page.tsx app/about/page.tsx \
  data/docs/catalog.ts data/templates/catalog.ts data/use-cases/catalog.ts \
  types/template.ts components/docs/doc-shell.tsx

git commit -m "feat: build FlowDock templates docs and use-case content system"
```

---

## Commit Slice 4 — homepage / branding / navigation polish

### 目标
把首页、品牌表达、导航关系和产品入口统一成更完整官网层。

### 建议包含
- `app/page.tsx`
- `components/layout/site-header.tsx`
- `components/layout/site-footer.tsx`
- `components/sections/home/core-capabilities.tsx`
- `components/sections/home/diagnose-preview.tsx`
- `components/sections/home/final-cta.tsx`
- `components/sections/home/hero.tsx`
- `components/sections/home/pain-points.tsx`
- `components/sections/home/product-journey.tsx`
- `components/sections/home/templates-preview.tsx`
- `components/sections/home/trust-section.tsx`
- `components/sections/home/use-cases-preview.tsx`
- `data/home/content.ts`
- `data/site/navigation.ts`

### 命令
```bash
git add app/page.tsx \
  components/layout/site-header.tsx components/layout/site-footer.tsx \
  components/sections/home/core-capabilities.tsx components/sections/home/diagnose-preview.tsx components/sections/home/final-cta.tsx components/sections/home/hero.tsx components/sections/home/pain-points.tsx components/sections/home/product-journey.tsx components/sections/home/templates-preview.tsx components/sections/home/trust-section.tsx components/sections/home/use-cases-preview.tsx \
  data/home/content.ts data/site/navigation.ts

git commit -m "feat: polish FlowDock homepage branding and navigation"
```

---

## Commit Slice 5 — operator / delivery docs

### 目标
把面向接手者和后续交付的说明单独留档。

### 建议包含
- `README.md`
- `DELIVERY.md`
- `COMMIT-PLAN.md`
- `AGENTS.md`
- `CLAUDE.md`

### 命令
```bash
git add README.md DELIVERY.md COMMIT-PLAN.md AGENTS.md CLAUDE.md

git commit -m "docs: align FlowDock operator and delivery notes"
```

---

## Commit Execution Notes

### 推荐执行顺序
1. Slice 1 — scaffold / runtime base
2. Slice 2 — diagnose engine
3. Slice 3 — content system
4. Slice 4 — homepage / branding
5. Slice 5 — operator / delivery docs

### 每个 slice 提交前建议做
```bash
git diff --staged --stat
```

### 全部完成后再做一次
```bash
npm run lint && npm run build
```

---

## 当前不能继续自动推进的地方

当前 repo **没有 remote**，所以后续“推送 / 发出”这一步还缺：
- 目标 remote/fork
- push 分支策略
- 是否需要 squash / 保留切片提交

## 下一步（如果继续做 Git closeout）

1. 按本文件切片逐个 `git add`
2. 逐个提交并验证 staged diff
3. 配置 remote
4. push 到目标仓库
