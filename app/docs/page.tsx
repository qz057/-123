import Link from "next/link";
import { docsCatalog } from "@/data/docs/catalog";
import { useCasesCatalog } from "@/data/use-cases/catalog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const linkClass =
  "inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

const readingPaths = [
  {
    title: "第一次使用 FlowDock",
    summary: "先建立整体理解，再进入诊断与模板，避免盲目试错。",
    steps: [
      { label: "1) Getting Started", href: "/docs/getting-started" },
      { label: "2) Diagnose", href: "/docs/diagnose" },
      { label: "3) Templates", href: "/docs/templates" },
    ],
  },
  {
    title: "正在排查问题",
    summary: "先按层级定位，再按稳定顺序修复。",
    steps: [
      { label: "1) Diagnose", href: "/docs/diagnose" },
      { label: "2) Troubleshooting", href: "/docs/troubleshooting" },
      { label: "3) Product Notes", href: "/docs/product-notes" },
    ],
  },
  {
    title: "准备搭流程与模板",
    summary: "先理解模板结构，再按场景找可复用方案。",
    steps: [
      { label: "1) Templates", href: "/docs/templates" },
      { label: "2) Use Cases", href: "/use-cases" },
      { label: "3) 模板中心", href: "/templates" },
    ],
  },
] as const;

const quickActions = [
  {
    title: "我现在不知道问题在哪一层",
    description: "先从 Diagnose 文档和配置诊断器开始，别急着翻模板。",
    primary: { label: "看 Diagnose 文档", href: "/docs/diagnose" },
    secondary: { label: "直接打开 Diagnose", href: "/diagnose" },
  },
  {
    title: "我已经知道方向，想直接做",
    description: "先用 Templates 文档理解模板结构，再去模板中心挑方案。",
    primary: { label: "看 Templates 文档", href: "/docs/templates" },
    secondary: { label: "去模板中心", href: "/templates" },
  },
  {
    title: "我想看产品当前边界和阶段",
    description: "先看 Product Notes，避免把首版骨架误当成完整产品。",
    primary: { label: "看 Product Notes", href: "/docs/product-notes" },
    secondary: { label: "回 Getting Started", href: "/docs/getting-started" },
  },
] as const;

const docRoles = [
  {
    title: "Getting Started",
    detail: "负责建立整体理解，告诉你首版最稳的起步方式和默认闭环。",
    href: "/docs/getting-started",
  },
  {
    title: "Diagnose",
    detail: "负责解释配置诊断器怎么输入、怎么读结果、什么时候该信哪条结论。",
    href: "/docs/diagnose",
  },
  {
    title: "Templates",
    detail: "负责说明模板详情页怎么用、什么时候该直接套方案、什么时候先别急着套。",
    href: "/docs/templates",
  },
  {
    title: "Troubleshooting",
    detail: "负责收纳排障顺序、常见误判和应该优先验证的层级。",
    href: "/docs/troubleshooting",
  },
  {
    title: "Product Notes",
    detail: "负责说明当前版本边界、阶段状态和不要误判的能力范围。",
    href: "/docs/product-notes",
  },
] as const;

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">Docs</Badge>
            <Badge variant="outline">先定位，再执行</Badge>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">文档</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            FlowDock 的文档不是百科目录，而是帮助你更快选对阅读顺序。重点不是把内容堆满，而是把“先判断、再执行、再验证”的主路径讲清楚。
          </p>
        </div>

        <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-950">先抓住文档的职责</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 pb-6 sm:grid-cols-3 lg:grid-cols-1">
            <StatCard label="第一入口" value="Diagnose / Getting Started" />
            <StatCard label="第二入口" value="Templates / Use Cases" />
            <StatCard label="这页作用" value="帮你选阅读顺序，不替代执行页" />
          </CardContent>
        </Card>
      </header>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-950">现在最常见的三种进入方式</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {quickActions.map((item) => (
            <Card key={item.title} className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-950">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-5 sm:space-y-4 sm:pb-6">
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                <div className="flex flex-wrap gap-3">
                  <Link href={item.primary.href} className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                    {item.primary.label}
                  </Link>
                  <Link href={item.secondary.href} className={linkClass}>
                    {item.secondary.label}
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-950">五份文档分别负责什么</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {docRoles.map((item, index) => (
            <Card
              key={item.title}
              className={
                index >= 3
                  ? "hidden rounded-2xl border border-slate-200 bg-white py-0 shadow-sm sm:flex"
                  : index === 1
                    ? "rounded-2xl border border-slate-200 bg-slate-950 py-0 text-white shadow-sm"
                    : "rounded-2xl border border-slate-200 bg-white py-0 shadow-sm"
              }
            >
              <CardHeader>
                <CardTitle className={index === 1 ? "text-lg text-white" : "text-lg text-slate-950"}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <p className={index === 1 ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>{item.detail}</p>
                {index === 2 ? <p className="text-xs leading-5 text-slate-400 sm:hidden">其余 Troubleshooting / Product Notes 可在下方全部文档继续查看。</p> : null}
                <Link href={item.href} className={index === 1 ? "inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10" : linkClass}>
                  打开文档
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-slate-950">推荐阅读路径</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {readingPaths.map((path) => (
            <Card key={path.title} className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-950">{path.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-6 text-slate-600">{path.summary}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  {path.steps.map((step) => (
                    <li key={step.href}>
                      <Link href={step.href} className="inline-flex hover:text-sky-700">
                        {step.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold text-slate-950">按场景和动作选择下一步</h2>
        </div>
        <Card className="rounded-3xl border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-950">结合使用场景看文档入口</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 pb-6 sm:grid-cols-2">
            {useCasesCatalog.map((item, index) => (
              <div key={item.slug} className={index >= 2 ? "hidden rounded-2xl border border-slate-200 bg-white p-4 sm:block" : "rounded-2xl border border-slate-200 bg-white p-4"}>
                <p className="text-sm font-medium text-slate-950">{item.title}</p>
                <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:block">{item.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <Link href={`/use-cases/${item.slug}`} className="inline-flex rounded-full border border-slate-300 px-3 py-1.5 text-slate-700 transition hover:bg-slate-50">
                    场景页
                  </Link>
                  <Link href="/templates" className="inline-flex rounded-full border border-slate-300 px-3 py-1.5 text-slate-700 transition hover:bg-slate-50">
                    模板中心
                  </Link>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-950">如果你要更快落地</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-6 text-sm leading-6 text-slate-600">
            <p>• 问题还模糊：先看 Diagnose 文档，再进 Diagnose 页面</p>
            <p>• 方向已经明确：先看 Templates 文档，再进模板详情</p>
            <p>• 要确认阶段边界：补看 Product Notes，避免误判产品能力</p>
            <div className="pt-2">
              <Link href="/diagnose" className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                不确定从哪开始？先体检配置
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">全部文档</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 sm:hidden">移动端这里保留紧凑入口，详细说明放在上面的职责区和各子页正文里。</p>
          </div>
          <Link href="/diagnose" className="hidden text-sm font-medium text-sky-700 sm:inline-flex">
            不确定从哪开始？先体检配置
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {docsCatalog.map((item) => (
            <Card key={item.slug} className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-slate-950 sm:text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="hidden space-y-3 sm:block">
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                {item.aliases?.length ? (
                  <p className="text-xs leading-5 text-slate-400">已映射 {item.aliases.length} 个相关主题，适合从不同问题入口跳回来。</p>
                ) : null}
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/docs/${item.slug}`} className="inline-flex rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:px-4 sm:py-2">
                  <span className="sm:hidden">查看</span>
                  <span className="hidden sm:inline">查看文档</span>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium leading-6 text-slate-900">{value}</p>
    </div>
  );
}
