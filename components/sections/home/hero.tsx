import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const workflowSteps = ["Diagnose", "Templates / Use Cases", "Docs"] as const;

const featuredGroups = [
  {
    title: "实用工具",
    moreLabel: "看更多工具",
    moreHref: "/diagnose",
    items: [
      { label: "Diagnose 配置诊断器", href: "/diagnose" },
      { label: "Diagnose 文档", href: "/docs/diagnose" },
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
  {
    title: "AI 技能",
    moreLabel: "看更多技能",
    moreHref: "/templates",
    items: [
      { label: "本地 AI 助手起步", href: "/templates/local-ai-assistant-starter" },
      { label: "模型连接排障", href: "/templates/model-connection-debug" },
      { label: "AI 工作流起步", href: "/templates/ai-workflow-starter" },
    ],
  },
  {
    title: "插件包 / 集成",
    moreLabel: "看更多集成",
    moreHref: "/use-cases",
    items: [
      { label: "OpenClaw 初次搭建", href: "/templates/openclaw-bootstrap" },
      { label: "自动化任务巡检", href: "/templates/automation-health-check" },
      { label: "桌面工具接入", href: "/templates/desktop-tool-integration" },
    ],
  },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#f4f6ff_0%,#e9edff_28%,#ede9fe_62%,#faf5ff_100%)]">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.34),transparent_58%)]" />
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-400/18 blur-3xl" />
      <div className="absolute right-[8%] top-24 h-56 w-56 rounded-full bg-sky-400/12 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(rgba(99,102,241,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.045)_1px,transparent_1px)] bg-[size:88px_88px] opacity-50 [mask-image:linear-gradient(180deg,rgba(255,255,255,0.9),transparent_72%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_436px] lg:items-center lg:gap-10">
          <div className="space-y-5 sm:space-y-6">
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge variant="outline" className="border-indigo-200 bg-white/80 text-indigo-700 backdrop-blur">
                山谷神奇 FlowDock
              </Badge>
              <Badge variant="secondary" className="bg-indigo-950 text-white">
                AI 自动化工作台
              </Badge>
            </div>

            <div className="space-y-3.5">
              <h1 className="max-w-4xl text-[2.7rem] font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.04]">
                把 AI 自动化
                <span className="block bg-[linear-gradient(90deg,#312e81_0%,#4f46e5_55%,#8b5cf6_100%)] bg-clip-text text-transparent">
                  变成真正可执行的工作系统
                </span>
              </h1>
              <p className="max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-[17px]">
                首页只保留主框架，但把真正有用的入口直接挂出来。先 Diagnose，后执行，最后 Docs 收口；如果你已经知道要做什么，右侧这些工具、技能和插件包可以直接点进去用。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
              <Link
                href="/diagnose"
                className="inline-flex items-center justify-center rounded-full bg-indigo-950 fd-primary-glow px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-900"
              >
                立即体检配置
              </Link>
              <Link href="/templates" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700">
                <span>查看工作流模板</span>
                <span aria-hidden>→</span>
              </Link>
              <Link href="/use-cases" className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900">
                <span>按任务找入口</span>
                <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="rounded-[1.5rem] border border-white/80 bg-white/74 p-4 shadow-[0_28px_80px_-42px_rgba(79,70,229,0.34)] backdrop-blur-xl sm:rounded-[1.75rem]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-slate-900">首页主框架</p>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-medium text-indigo-700">先看这个就够</span>
              </div>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
                {workflowSteps.map((item, index) => (
                  <div key={item} className="rounded-2xl border border-slate-100 bg-indigo-50/80 px-3.5 py-3 text-sm text-slate-700">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-950 text-xs font-medium text-white">
                      {index + 1}
                    </span>
                    <p className="mt-2 font-medium text-slate-950">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

function HeroPreview() {
  return (
    <Card className="overflow-hidden rounded-[1.75rem] border border-indigo-100/80 bg-white/72 py-0 shadow-[0_24px_72px_-42px_rgba(79,70,229,0.22)] backdrop-blur-xl fd-glass-card">
      <CardHeader className="relative overflow-hidden border-b border-indigo-100/80 pb-4">
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.14),transparent_70%)]" />
        <div className="relative space-y-2.5">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-indigo-700/80">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live entries
          </div>
          <div className="space-y-1.5">
            <CardTitle className="text-lg text-slate-950">可直接点击的真实入口</CardTitle>
            <CardDescription className="max-w-xl text-sm leading-6 text-slate-600">
              右侧只放快捷入口，不再抢首页主信息。
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-5 pt-5">
        {featuredGroups.map((group) => (
          <div key={group.title} className="rounded-[1.25rem] border border-indigo-100/80 bg-indigo-50/65 p-3">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-950">{group.title}</p>
              <Link href={group.moreHref} className="text-[11px] font-medium text-indigo-600 transition hover:text-violet-700">
                {group.moreLabel} →
              </Link>
            </div>
            <div className="mt-2.5 space-y-2 text-sm leading-6">
              {group.items.slice(0, 2).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl border border-indigo-100/80 bg-white/84 px-3 py-2 text-slate-700 transition hover:border-violet-200 hover:bg-white hover:text-indigo-700"
                >
                  <span>{item.label}</span>
                  <span aria-hidden className="text-indigo-500">→</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
