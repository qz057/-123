import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const journey = [
  {
    title: "Diagnose",
    summary: "当你还不确定问题属于哪一层时，先从这里开始。",
    detail: "负责先归类：连接、配置、会话还是工具接入。",
    href: "/diagnose",
    cta: "先体检配置",
  },
  {
    title: "Templates",
    summary: "当方向已经明确，就直接去拿可复用方案。",
    detail: "负责承接执行：模板详情页已经包含适配判断、步骤、验收和回滚。",
    href: "/templates",
    cta: "查看模板中心",
  },
  {
    title: "Use Cases",
    summary: "如果你更习惯按任务而不是按功能进入，就走这里。",
    detail: "负责用场景视角组织入口，帮助你更快选对第一步。",
    href: "/use-cases",
    cta: "按场景找入口",
  },
  {
    title: "Docs",
    summary: "当你需要补规则、边界和验证方式时，再回这里。",
    detail: "负责把使用顺序、产品边界和可验证路径讲清楚。",
    href: "/docs",
    cta: "查看文档路径",
  },
] as const;

export function ProductJourneySection() {
  return (
    <section className="border-b border-slate-200 bg-white/80">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-medium text-sky-700">Product Journey</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">FlowDock 不是一堆页面，是一条可执行路径</h2>
            <p className="text-sm leading-6 text-slate-600 sm:text-base">
              首页的目标不是把所有内容一次讲完，而是让你更快进入正确入口。默认顺序是：先 Diagnose，再 Templates，必要时用 Use Cases 和 Docs 做承接与收口。
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
            <p className="text-sm font-medium text-white">为什么这里很重要</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              很多工具站看起来内容很多，但第一步并不清楚。这个区块的任务就是把入口关系直接说透，避免用户在错误页面里浪费时间。
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {journey.map((item, index) => (
            <Card
              key={item.title}
              className={index === 0 ? "rounded-3xl border border-slate-200 bg-slate-950 py-0 text-white shadow-sm" : "rounded-3xl border border-slate-200 bg-white py-0 shadow-sm"}
            >
              <CardHeader>
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className={index === 0 ? "text-lg text-white" : "text-lg text-slate-950"}>{item.title}</CardTitle>
                  <span className={index === 0 ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-medium text-slate-950" : "inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white"}>
                    {index + 1}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <p className={index === 0 ? "text-sm leading-6 text-slate-200" : "text-sm leading-6 text-slate-700"}>{item.summary}</p>
                <p className={index === 0 ? "text-xs leading-5 text-slate-400" : "text-xs leading-5 text-slate-500"}>{item.detail}</p>
                <Link href={item.href} className={index === 0 ? "inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10" : "inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"}>
                  {item.cta}
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
