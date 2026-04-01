import Link from "next/link";
import { docsCatalog } from "@/data/docs/catalog";
import { templatesCatalog } from "@/data/templates/catalog";
import { useCasesCatalog } from "@/data/use-cases/catalog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const docRoles = {
  "getting-started": {
    role: "建立顺序感",
    when: "第一次进入，先搞清 FlowDock 各入口分工时",
    next: "通常下一跳是 Diagnose 或 Templates",
  },
  diagnose: {
    role: "解释 Diagnose 怎么用",
    when: "问题还没压到具体层级时",
    next: "通常下一跳是 Diagnose 页面或 Troubleshooting",
  },
  templates: {
    role: "解释模板怎么真正用起来",
    when: "方向明确，只差执行路径时",
    next: "通常下一跳是模板中心或具体模板详情页",
  },
  troubleshooting: {
    role: "解释排障顺序和停手点",
    when: "现场已经开始乱，需要收回单变量节奏时",
    next: "通常下一跳是 Diagnose 或具体模板页",
  },
  "product-notes": {
    role: "解释当前阶段与边界",
    when: "怕把首版能力误判成终版承诺时",
    next: "通常下一跳是回首页、继续执行或先收预期",
  },
} as const;

const taskRoutes = [
  {
    title: "我现在先要定位问题",
    detail: "问题还模糊时，不要先翻模板和说明；先把问题压层。",
    href: "/diagnose",
    label: "直接进入 Diagnose",
    tone: "primary",
  },
  {
    title: "我已经知道方向，要直接推进",
    detail: "方向明确后，直接进模板或场景页，不继续停在目录层。",
    href: "/templates",
    label: "先去模板中心",
    tone: "default",
  },
  {
    title: "我想先确认当前边界",
    detail: "当你怕误判成熟度时，再回 Product Notes 收口。",
    href: "/docs/product-notes",
    label: "先看 Product Notes",
    tone: "default",
  },
] as const;

const readingPaths = [
  {
    title: "第一次使用 FlowDock",
    summary: "先建立顺序感，再决定第一跳，不在首页和目录层来回横跳。",
    steps: [
      { label: "1. Getting Started", href: "/docs/getting-started" },
      { label: "2. Diagnose", href: "/docs/diagnose" },
      { label: "3. Templates / Use Cases", href: "/templates" },
    ],
  },
  {
    title: "正在排查问题",
    summary: "先归类，再做单变量验证，再决定是否回模板或看边界。",
    steps: [
      { label: "1. Diagnose", href: "/docs/diagnose" },
      { label: "2. Troubleshooting", href: "/docs/troubleshooting" },
      { label: "3. Product Notes", href: "/docs/product-notes" },
    ],
  },
  {
    title: "准备搭流程和方案",
    summary: "先看模板怎么用，再按场景组织路径，而不是只逛目录。",
    steps: [
      { label: "1. Templates 文档", href: "/docs/templates" },
      { label: "2. 模板中心", href: "/templates" },
      { label: "3. Use Cases", href: "/use-cases" },
    ],
  },
] as const;

const exitSignals = [
  "现在第一跳已经明确了。",
  "不需要把整页看完才行动。",
  "如果还犹豫，默认先回 Diagnose。",
] as const;

export default function DocsPage() {
  return (
    <div className="fd-page-chrome mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <div>
          <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">Docs</Badge>
            <Badge variant="outline">先判断，再执行，再验证</Badge>
          </div>
          <p className="text-sm font-medium text-indigo-700">FlowDock / Docs</p>
          <h1 className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-950 sm:text-[2.35rem]">文档总览</h1>
          <p className="mt-3.5 max-w-3xl text-sm leading-[1.72] text-slate-600 sm:text-[15px]">
            这页不是资料目录，而是帮你更快选对阅读顺序。Docs 在 FlowDock 里不负责替代 Diagnose、Templates 或 Use Cases，
            它负责让你知道：什么时候先判层、什么时候该直接执行、什么时候该回来补边界和验证。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <Link
              href="/docs/getting-started"
              className="inline-flex rounded-full bg-indigo-950 fd-primary-glow px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-900"
            >
              先看 Getting Started
            </Link>
            <Link href="/docs/diagnose" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700">
              <span>看 Diagnose 文档</span>
              <span aria-hidden>→</span>
            </Link>
            <Link href="/diagnose" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900">
              <span>直接打开 Diagnose</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <Card className="rounded-[28px] border border-slate-200 bg-indigo-950 py-0 text-white shadow-sm fd-dark-card">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">Doc lens</p>
            <CardTitle className="text-2xl text-white">先抓住 Docs 的真正职责</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 pb-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">不是</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">不是百科目录，也不是执行页的替代品。</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">默认读法</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">先选入口，再跳执行页，最后回来补验证与边界。</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-violet-200">读完要做</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">马上决定第一跳，不继续停在目录层。</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8 grid gap-3 md:grid-cols-3">
        {taskRoutes.map((item, index) => {
          const primary = item.tone === "primary";
          return (
            <Card
              key={item.title}
              className={
                primary
                  ? "rounded-[28px] border border-slate-200 bg-indigo-950 py-0 text-white shadow-sm fd-dark-card"
                  : "rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm fd-glass-card"
              }
            >
              <CardHeader>
                <p className={primary ? "text-xs font-medium uppercase tracking-[0.18em] text-violet-200" : "text-xs font-medium uppercase tracking-[0.18em] text-slate-400"}>
                  Route 0{index + 1}
                </p>
                <CardTitle className={primary ? "text-lg text-white" : "text-lg text-slate-950"}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 pb-5">
                <p className={primary ? "text-sm leading-6 text-slate-200" : "text-sm leading-6 text-slate-600"}>{item.detail}</p>
                <Link
                  href={item.href}
                  className={
                    primary
                      ? "inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                      : "inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700"
                  }
                >
                  <span>{item.label}</span>
                  {!primary ? <span aria-hidden>→</span> : null}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mb-8 rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-4 shadow-sm sm:p-5">
        <div className="mb-4 grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Reading paths</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950 sm:text-[1.35rem]">最常见的三种阅读顺序</h2>
            <p className="mt-2.5 max-w-3xl text-sm leading-[1.65] text-slate-600 sm:text-[15px]">
              读文档最稳的方式不是把每页都看完，而是先按当前任务选对顺序。顺序对了，Docs 才是加速器；顺序错了，Docs 只会变成新的停留层。
            </p>
          </div>
          <div className="hidden rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-xs leading-5 text-slate-500 lg:block">
            文档层的目标不是让你更懂“页面”，而是让你更快进入下一步执行动作。
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {readingPaths.map((path, index) => (
            <Card
              key={path.title}
              className={
                index === 0
                  ? "rounded-[28px] border border-slate-200 bg-indigo-950 py-0 text-white shadow-sm fd-dark-card"
                  : "rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm fd-glass-card"
              }
            >
              <CardHeader>
                <p className={index === 0 ? "text-xs font-medium uppercase tracking-[0.18em] text-violet-200" : "text-xs font-medium uppercase tracking-[0.18em] text-slate-400"}>
                  Path 0{index + 1}
                </p>
                <CardTitle className={index === 0 ? "text-lg text-white" : "text-lg text-slate-950"}>{path.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 pb-5">
                <p className={index === 0 ? "text-sm leading-6 text-slate-200" : "text-sm leading-6 text-slate-600"}>{path.summary}</p>
                <div className="space-y-2.5">
                  {path.steps.map((step) => (
                    <Link
                      key={step.href}
                      href={step.href}
                      className={
                        index === 0
                          ? "flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-100 transition hover:bg-white/10"
                          : "flex items-center justify-between rounded-2xl border border-slate-200 bg-indigo-50/70 px-3.5 py-2.5 text-sm text-slate-700 transition hover:bg-indigo-50"
                      }
                    >
                      <span>{step.label}</span>
                      <span aria-hidden className={index === 0 ? "text-violet-200" : "text-indigo-500"}>→</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Docs map</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">每一页文档分别负责什么</h2>
          </div>
          <p className="hidden max-w-md text-sm leading-6 text-slate-500 lg:block">
            这层是“看哪页值不值”，不是“每页都去读一遍”。
          </p>
        </div>
        <div className="grid gap-3.5 lg:grid-cols-2 xl:grid-cols-3">
          {docsCatalog.map((doc) => {
            const meta = docRoles[doc.slug as keyof typeof docRoles];
            return (
              <Card key={doc.slug} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm fd-glass-card">
                <CardHeader>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{meta.role}</p>
                  <CardTitle className="text-lg text-slate-950">{doc.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3.5 pb-5">
                  <p className="text-sm leading-6 text-slate-600">{doc.description}</p>
                  <div className="rounded-2xl border border-slate-200 bg-indigo-50/70 px-3.5 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">什么时候先读</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{meta.when}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">读完之后</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{meta.next}</p>
                  </div>
                  <Link href={`/docs/${doc.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700">
                    <span>打开这页文档</span>
                    <span aria-hidden>→</span>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="rounded-[28px] border border-slate-200 bg-indigo-50/70 py-0 shadow-sm fd-soft-card">
          <CardHeader>
            <CardTitle className="text-xl text-slate-950">读完这页，默认不要做的 3 件事</CardTitle>
            <CardDescription>这些动作会让文档层重新变成拖延层。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 pb-5 sm:grid-cols-3">
            {exitSignals.map((item, index) => (
              <div key={item} className={index === 1 ? "rounded-2xl border border-slate-200 bg-indigo-950 px-4 py-3 text-white" : "rounded-2xl border border-slate-200 bg-white px-4 py-3"}>
                <p className={index === 1 ? "text-sm leading-6 text-slate-200" : "text-sm leading-6 text-slate-700"}>{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm fd-glass-card">
          <CardHeader>
            <CardTitle className="text-xl text-slate-950">当前内容范围</CardTitle>
            <CardDescription>文档、模板、场景都已经可以互相承接，不再是空目录。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-5 text-sm leading-6 text-slate-600">
            <p>当前文档入口：{docsCatalog.length} 页</p>
            <p>当前模板入口：{templatesCatalog.length} 个模板</p>
            <p>当前场景入口：{useCasesCatalog.length} 个场景</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Link href="/templates" className="inline-flex rounded-full border border-indigo-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                去模板中心
              </Link>
              <Link href="/use-cases" className="inline-flex rounded-full border border-indigo-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                去 Use Cases
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
