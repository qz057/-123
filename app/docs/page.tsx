import Link from "next/link";
import { docsCatalog } from "@/data/docs/catalog";
import { useCasesCatalog } from "@/data/use-cases/catalog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const inlineLinkClass =
  "inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800";

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
    title: "我想确认当前产品边界",
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
    label: "起步入口",
  },
  {
    title: "Diagnose",
    detail: "负责解释配置诊断器怎么输入、怎么读结果、什么时候该信哪条结论。",
    href: "/docs/diagnose",
    label: "归类入口",
  },
  {
    title: "Templates",
    detail: "负责说明模板详情页怎么用、什么时候该直接套方案、什么时候先别急着套。",
    href: "/docs/templates",
    label: "执行入口",
  },
  {
    title: "Troubleshooting",
    detail: "负责收纳排障顺序、常见误判和应该优先验证的层级。",
    href: "/docs/troubleshooting",
    label: "排障入口",
  },
  {
    title: "Product Notes",
    detail: "负责说明当前版本边界、阶段状态和不要误判的能力范围。",
    href: "/docs/product-notes",
    label: "边界入口",
  },
] as const;

const roleStats = [
  { label: "第一入口", value: "Diagnose / Getting Started" },
  { label: "第二入口", value: "Templates / Use Cases" },
  { label: "这页作用", value: "帮你选阅读顺序，不替代执行页" },
] as const;

const decisionMap = [
  {
    title: "先判断问题是否还模糊",
    description: "问题仍混在一起，就先走 Diagnose；别直接翻模板或硬改配置。",
    cta: { label: "看 Diagnose 文档", href: "/docs/diagnose" },
    tone: "primary",
  },
  {
    title: "再决定是否已经进入执行阶段",
    description: "方向已清楚，就别继续停在说明层，直接切 Templates 或模板中心。",
    cta: { label: "看 Templates 文档", href: "/docs/templates" },
    tone: "default",
  },
  {
    title: "排障时先看顺序，不先看情绪",
    description: "当现场越做越乱，先回 Troubleshooting 把单变量、停手点和回滚顺序拉正。",
    cta: { label: "看 Troubleshooting", href: "/docs/troubleshooting" },
    tone: "default",
  },
  {
    title: "最后确认当前边界和阶段",
    description: "当页面已经很像产品时，更需要 Product Notes 帮你防止预期过满。",
    cta: { label: "看 Product Notes", href: "/docs/product-notes" },
    tone: "default",
  },
] as const;

const branchCards = [
  {
    title: "我越看越糊涂",
    detail: "回 Diagnose，把问题重新压回连接 / 配置 / Session / 接入层，而不是继续增加动作。",
    href: "/docs/diagnose",
  },
  {
    title: "我已经知道方向，但不会往下走",
    detail: "切 Templates，把方向变成按步骤推进的执行路径，而不是继续停在概念理解。",
    href: "/docs/templates",
  },
  {
    title: "我怕把首版误当终版",
    detail: "补 Product Notes，先把当前版本成熟度和边界讲清，再决定要不要继续加码。",
    href: "/docs/product-notes",
  },
] as const;

export default function DocsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
      <header className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">Docs</Badge>
            <Badge variant="outline">先定位，再执行</Badge>
          </div>
          <p className="text-sm font-medium text-sky-700">FlowDock / Docs</p>
          <h1 className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-950 sm:text-[2.35rem]">文档</h1>
          <p className="mt-3.5 max-w-3xl text-sm leading-[1.72] text-slate-600 sm:text-[15px]">
            FlowDock 的文档不是百科目录，而是帮助你更快选对阅读顺序。重点不是把内容堆满，而是把“先判断、再执行、再验证”的主路径拉顺，让你知道下一步该去哪，而不是继续在多个页面之间横跳。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <Link
              href="/docs/diagnose"
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              先看 Diagnose 文档
            </Link>
            <Link href="/docs/getting-started" className={inlineLinkClass}>
              <span>先看 Getting Started</span>
              <span aria-hidden>→</span>
            </Link>
            <Link href="/diagnose" className={inlineLinkClass}>
              <span>直接打开 Diagnose</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Doc map</p>
            <CardTitle className="text-2xl text-white">先抓住文档的职责</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2.5 pb-5 sm:grid-cols-3 lg:grid-cols-1">
            {roleStats.map((item) => (
              <DarkStatCard key={item.label} label={item.label} value={item.value} />
            ))}
          </CardContent>
        </Card>
      </header>

      <section className="mb-7">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Entry routes</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">现在最常见的三种进入方式</h2>
          </div>
        </div>
        <div className="grid gap-3.5 lg:grid-cols-3">
          {quickActions.map((item, index) => (
            <Card key={item.title} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Route 0{index + 1}</p>
                <CardTitle className="text-lg text-slate-950">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 pb-5">
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                  <Link href={item.primary.href} className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                    {item.primary.label}
                  </Link>
                  <Link href={item.secondary.href} className={inlineLinkClass}>
                    <span>{item.secondary.label}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-4 shadow-sm sm:p-5">
        <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Decision map</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950 sm:text-[1.35rem]">这组文档真正想把你带向哪条路径</h2>
            <p className="mt-2.5 max-w-3xl text-sm leading-[1.65] text-slate-600 sm:text-[15px]">
              先判断问题是否仍然模糊，再决定是去 Diagnose、Templates、Troubleshooting 还是 Product Notes。文档层的价值不是让你多看，而是帮你少走错入口。
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/90 px-3.5 py-2.5 text-xs leading-5 text-slate-500">
            这块是图示化路径，不是目录装饰。它对应的是 FlowDock 当前最稳的实际使用节奏。
          </div>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-4">
          {decisionMap.map((item, index) => {
            const primary = item.tone === "primary";
            return (
              <Card
                key={item.title}
                className={
                  primary
                    ? "rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.45)]"
                    : "rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm"
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-3">
                    <p className={primary ? "text-xs font-medium uppercase tracking-[0.18em] text-sky-200" : "text-xs font-medium uppercase tracking-[0.18em] text-slate-400"}>
                      Step 0{index + 1}
                    </p>
                    <span
                      className={
                        primary
                          ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950"
                          : "inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white"
                      }
                    >
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className={primary ? "text-lg text-white" : "text-lg text-slate-950"}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3.5 pb-5">
                  <p className={primary ? "text-sm leading-[1.65] text-slate-300" : "text-sm leading-[1.65] text-slate-600"}>{item.description}</p>
                  <Link
                    href={item.cta.href}
                    className={
                      primary
                        ? "inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                        : inlineLinkClass
                    }
                  >
                    <span>{item.cta.label}</span>
                    {!primary ? <span aria-hidden>→</span> : null}
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Roles</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">五份文档分别负责什么</h2>
        </div>
        <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-5">
          {docRoles.map((item, index) => (
            <Card
              key={item.title}
              className={
                index === 1
                  ? "rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm"
                  : "rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm"
              }
            >
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                <CardTitle className={index === 1 ? "text-lg text-white" : "text-lg text-slate-950"}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 pb-5">
                <p className={index === 1 ? "text-sm leading-[1.65] text-slate-300" : "text-sm leading-[1.65] text-slate-600"}>{item.detail}</p>
                <Link
                  href={item.href}
                  className={
                    index === 1
                      ? "inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                      : inlineLinkClass
                  }
                >
                  <span>打开文档</span>
                  {index !== 1 ? <span aria-hidden>→</span> : null}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Reading paths</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">推荐阅读路径</h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          {readingPaths.map((path, index) => (
            <Card key={path.title} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Path 0{index + 1}</p>
                <CardTitle className="text-lg text-slate-950">{path.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <p className="text-sm leading-6 text-slate-600">{path.summary}</p>
                <div className="space-y-2">
                  {path.steps.map((step) => (
                    <Link
                      key={step.href}
                      href={step.href}
                      className="flex rounded-2xl border border-slate-200 bg-slate-50/80 px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                    >
                      {step.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8 grid gap-3.5 xl:grid-cols-[1.02fr_0.98fr]">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Failure branches</p>
            <CardTitle className="text-xl text-slate-950">如果你在这里卡住，最该往哪边跳</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 pb-5 sm:grid-cols-3">
            {branchCards.map((item, index) => (
              <div key={item.title} className={index === 0 ? "rounded-2xl border border-slate-200 bg-slate-950 p-3.5 text-white" : "rounded-2xl border border-slate-200 bg-white p-3.5"}>
                <p className={index === 0 ? "text-sm font-medium text-white" : "text-sm font-medium text-slate-950"}>{item.title}</p>
                <p className={index === 0 ? "mt-2 text-sm leading-[1.65] text-slate-300" : "mt-2 text-sm leading-[1.65] text-slate-600"}>{item.detail}</p>
                <Link
                  href={item.href}
                  className={
                    index === 0
                      ? "mt-3.5 inline-flex rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
                      : "mt-3.5 inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800"
                  }
                >
                  <span>直接跳转</span>
                  {index !== 0 ? <span aria-hidden>→</span> : null}
                </Link>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Fast lane</p>
            <CardTitle className="text-xl text-slate-950">如果你要更快落地</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-5 text-sm leading-6 text-slate-600">
            <p className="rounded-2xl bg-slate-50/80 px-4 py-3">问题还模糊：先看 Diagnose 文档，再进 Diagnose 页面</p>
            <p className="rounded-2xl bg-slate-50/80 px-4 py-3">方向已经明确：先看 Templates 文档，再进模板详情</p>
            <p className="rounded-2xl bg-slate-50/80 px-4 py-3">要确认阶段边界：补看 Product Notes，避免误判产品能力</p>
            <div className="pt-1.5">
              <Link href="/diagnose" className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                不确定从哪开始？先体检配置
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8 grid gap-3.5 xl:grid-cols-[1.06fr_0.94fr]">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Use cases</p>
            <CardTitle className="text-xl text-slate-950">结合使用场景看文档入口</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 pb-5 sm:grid-cols-2">
            {useCasesCatalog.map((item, index) => (
              <div key={item.slug} className={index >= 2 ? "hidden rounded-2xl border border-slate-200 bg-white p-3.5 sm:block" : "rounded-2xl border border-slate-200 bg-white p-3.5"}>
                <p className="text-sm font-medium text-slate-950">{item.title}</p>
                <p className="mt-2 hidden text-sm leading-[1.65] text-slate-600 sm:block">{item.summary}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                  <Link href={`/use-cases/${item.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800">
                    <span>场景页</span>
                    <span aria-hidden>→</span>
                  </Link>
                  <span className="text-slate-400">关联执行在模板中心</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Doc promise</p>
            <CardTitle className="text-xl text-white">这页的承诺不是更全，而是更少走弯路</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-5 text-sm leading-6 text-slate-300">
            <p className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">不让你在 Diagnose、Templates、Docs 之间盲跳</p>
            <p className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">不把首版能力误判成完整承诺</p>
            <p className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">不把看懂说明误当成已经完成执行与验证</p>
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">All docs</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">全部文档</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 sm:hidden">移动端这里保留紧凑入口，详细说明已尽量提前放在上面的职责区、决策图和阅读路径里。</p>
          </div>
          <Link href="/diagnose" className="hidden text-sm font-medium text-sky-700 sm:inline-flex">
            不确定从哪开始？先体检配置
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:gap-3.5">
          {docsCatalog.map((item, index) => (
            <Card key={item.slug} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader className="pb-3">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Doc 0{index + 1}</p>
                <CardTitle className="text-base text-slate-950 sm:text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                <p className="text-sm leading-[1.65] text-slate-600">{item.description}</p>
                {item.aliases?.length ? (
                  <p className="text-xs leading-5 text-slate-400">已映射 {item.aliases.length} 个相关主题，适合从不同问题入口跳回来。</p>
                ) : null}
              </CardContent>
              <CardFooter className="pt-0">
                <Link href={`/docs/${item.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800">
                  <span>查看文档</span>
                  <span aria-hidden>→</span>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function DarkStatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium leading-6 text-white">{value}</p>
    </div>
  );
}
