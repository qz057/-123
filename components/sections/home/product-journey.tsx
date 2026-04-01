import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const frameworkSteps = [
  {
    title: "Diagnose",
    summary: "先判断问题属于哪一层，不在首页并排怀疑。",
    detail: "适合：配置没生效、模型没切对、工具链路不清这类现场。",
    href: "/diagnose",
    label: "先做 Diagnose",
  },
  {
    title: "Templates / Use Cases",
    summary: "方向明确后，直接进入执行路径，不继续停在说明层。",
    detail: "适合：已经知道大方向，只差现成步骤、模板或任务入口。",
    href: "/templates",
    label: "进入执行页",
  },
  {
    title: "Docs",
    summary: "最后用文档做验证、边界确认和收口。",
    detail: "适合：需要确认当前阶段、失败分支或完成判断的时候。",
    href: "/docs",
    label: "回 Docs 收口",
  },
] as const;

export function ProductJourneySection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f5f7ff_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="mb-7 max-w-3xl space-y-3.5">
          <Badge variant="outline" className="border-indigo-200 bg-indigo-50/80 text-indigo-700">
            Main Framework
          </Badge>
          <div className="space-y-2.5">
            <h2 className="text-[1.95rem] font-semibold tracking-tight text-slate-950 sm:text-[2.35rem]">
              首页只保留这 3 个主要内容框架，
              <span className="block text-slate-600">看完就该直接去对应内页</span>
            </h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-6">
              FlowDock 的首页现在只负责回答一件事：你最该从哪一步开始。更深的说明、案例、模板细节和场景判断，都回对应页面处理，不再继续堆在首页。
            </p>
          </div>
        </div>

        <div className="grid gap-3.5 md:grid-cols-3">
          {frameworkSteps.map((item, index) => {
            const primary = index === 0;
            return (
              <Card
                key={item.title}
                className={
                  primary
                    ? "rounded-[28px] border border-slate-200 bg-indigo-950 py-0 text-white shadow-[0_28px_84px_-46px_rgba(79,70,229,0.72)] fd-dark-card"
                    : "rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm fd-glass-card"
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className={primary ? "text-xs font-medium uppercase tracking-[0.18em] text-violet-200" : "text-xs font-medium uppercase tracking-[0.18em] text-slate-500"}>
                      Step 0{index + 1}
                    </p>
                    <span
                      className={
                        primary
                          ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950"
                          : "inline-flex h-7 w-7 items-center justify-center rounded-full bg-indigo-950 text-xs font-semibold text-white"
                      }
                    >
                      {index + 1}
                    </span>
                  </div>
                  <CardTitle className={primary ? "text-xl text-white" : "text-xl text-slate-950"}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3.5 pb-5">
                  <p className={primary ? "text-sm leading-[1.65] text-slate-200" : "text-sm leading-[1.65] text-slate-600"}>{item.summary}</p>
                  <p className={primary ? "text-sm leading-[1.65] text-slate-200/90" : "text-sm leading-[1.65] text-slate-500"}>{item.detail}</p>
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
        </div>
      </div>
    </section>
  );
}
