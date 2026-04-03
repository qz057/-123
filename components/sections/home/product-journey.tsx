import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const frameworkSteps = [
  {
    title: "Diagnose",
    summary: "问题还模糊，先归类。",
    href: "/diagnose",
    label: "先做 Diagnose",
  },
  {
    title: "模板 / 使用场景",
    summary: "方向明确，直接执行。",
    href: "/templates",
    label: "进入执行页",
  },
  {
    title: "文档",
    summary: "最后补验证与边界。",
    href: "/docs",
    label: "回文档收口",
  },
] as const;

export function ProductJourneySection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f5f7ff_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="mb-6 max-w-3xl space-y-3">
          <Badge variant="outline" className="border-indigo-200 bg-indigo-50/80 text-indigo-700">
            主路径
          </Badge>
          <div className="space-y-2">
            <h2 className="text-[1.8rem] font-semibold tracking-tight text-slate-950 sm:text-[2.1rem]">首页只负责这 3 步</h2>
            <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-[15px]">看完就该直接去对应内页，不继续留在首页读解释。</p>
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
                  <p className={primary ? "text-xs font-medium uppercase tracking-[0.18em] text-violet-200" : "text-xs font-medium uppercase tracking-[0.18em] text-slate-500"}>步骤 0{index + 1}</p>
                  <CardTitle className={primary ? "text-xl text-white" : "text-xl text-slate-950"}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3.5 pb-5">
                  <p className={primary ? "text-sm leading-[1.65] text-slate-200" : "text-sm leading-[1.65] text-slate-600"}>{item.summary}</p>
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
