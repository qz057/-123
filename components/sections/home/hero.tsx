import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const quickEntries = [
  {
    title: "先定位问题",
    description: "问题还模糊，就先 Diagnose。",
    href: "/diagnose",
    label: "打开 Diagnose",
  },
  {
    title: "直接执行",
    description: "方向明确，就直接进模板。",
    href: "/templates",
    label: "进入模板中心",
  },
  {
    title: "按任务找入口",
    description: "不按功能页，按场景选第一步。",
    href: "/use-cases",
    label: "查看 Use Cases",
  },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#f4f6ff_0%,#e9edff_28%,#ede9fe_62%,#faf5ff_100%)]">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(79,70,229,0.34),transparent_58%)]" />
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-400/18 blur-3xl" />
      <div className="absolute right-[8%] top-24 h-56 w-56 rounded-full bg-sky-400/12 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-10">
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
                先 Diagnose 判断问题层级；方向明确后进 Templates 或 Use Cases；最后回 Docs 做验证与收口。
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
            </div>

          </div>

          <Card className="overflow-hidden rounded-[1.75rem] border border-indigo-100/80 bg-white/72 py-0 shadow-[0_24px_72px_-42px_rgba(79,70,229,0.22)] backdrop-blur-xl fd-glass-card">
            <CardHeader className="border-b border-indigo-100/80 pb-4">
              <div className="space-y-1.5">
                <CardTitle className="text-lg text-slate-950">直接点这里开始</CardTitle>
                <CardDescription className="text-sm leading-6 text-slate-600">
                  首页只保留最常用的 3 个入口，不再把说明堆在首屏。
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pb-5 pt-5">
              {quickEntries.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    index === 0
                      ? "block rounded-[1.25rem] border border-slate-200 bg-indigo-950 px-4 py-3.5 text-white shadow-sm"
                      : "block rounded-[1.25rem] border border-indigo-100/80 bg-indigo-50/65 px-4 py-3.5 text-slate-700 transition hover:bg-indigo-50"
                  }
                >
                  <p className={index === 0 ? "text-sm font-medium text-white" : "text-sm font-medium text-slate-950"}>{item.title}</p>
                  <p className={index === 0 ? "mt-1.5 text-sm leading-6 text-slate-200" : "mt-1.5 text-sm leading-6 text-slate-600"}>{item.description}</p>
                  <p className={index === 0 ? "mt-3 text-sm font-medium text-violet-200" : "mt-3 text-sm font-medium text-indigo-700"}>{item.label} →</p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
