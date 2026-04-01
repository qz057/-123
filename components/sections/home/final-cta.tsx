import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const launchRoutes = [
  {
    title: "我现在就有问题要排",
    detail: "先 Diagnose，把问题压到正确层，不在首页继续找说明。",
    href: "/diagnose",
    label: "先体检配置",
  },
  {
    title: "我已经知道方向，要直接做",
    detail: "先去 Templates 或 Use Cases，把方向切成可执行步骤。",
    href: "/templates",
    label: "进入执行页",
  },
  {
    title: "我需要规则、边界和完成判断",
    detail: "最后回 Docs，把验证口径和产品边界收清。",
    href: "/docs",
    label: "看 Docs",
  },
] as const;

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-indigo-950 px-4 py-7 text-white shadow-[0_34px_100px_-48px_rgba(79,70,229,0.72)] fd-dark-card sm:px-8 sm:py-10 lg:px-10">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.32),transparent_70%)]" />
        <div className="absolute -right-12 top-8 hidden h-44 w-44 rounded-full bg-violet-400/10 blur-3xl lg:block" />

        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
          <div>
            <Badge variant="outline" className="border-violet-300/20 bg-violet-400/10 text-violet-200">
              Start Here
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              首页看到这里就够了，
              <span className="block text-slate-200">下一步直接进对应页面</span>
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-200 sm:text-base">
              现在首页只保留三种最常见的开始方式。其余更深的说明、案例、排障细节和场景判断，都交给内页，不再继续拉长首页。
            </p>
          </div>

          <Card className="hidden rounded-[28px] border border-white/10 bg-white/5 py-0 text-white lg:block">
            <CardHeader className="pb-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">Default loop</p>
              <CardTitle className="text-lg text-white">最稳的默认顺序</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 pb-5 text-sm leading-[1.65] text-slate-200">
              <p className="rounded-2xl border border-white/10 bg-indigo-950/35 px-3.5 py-2.5">1. 先 Diagnose</p>
              <p className="rounded-2xl border border-white/10 bg-indigo-950/35 px-3.5 py-2.5">2. 再 Templates / Use Cases</p>
              <p className="rounded-2xl border border-white/10 bg-indigo-950/35 px-3.5 py-2.5">3. 最后 Docs 收口</p>
            </CardContent>
          </Card>
        </div>

        <div className="relative mt-6 grid gap-3 md:grid-cols-3">
          {launchRoutes.map((item, index) => {
            const primary = index === 0;
            return (
              <div
                key={item.title}
                className={
                  primary
                    ? "rounded-[1.5rem] border border-white/10 bg-white px-4 py-4 text-slate-950"
                    : "rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-white"
                }
              >
                <p className={primary ? "text-sm font-medium text-slate-950" : "text-sm font-medium text-white"}>{item.title}</p>
                <p className={primary ? "mt-2 text-sm leading-6 text-slate-600" : "mt-2 text-sm leading-6 text-slate-200"}>{item.detail}</p>
                <Link
                  href={item.href}
                  className={
                    primary
                      ? "mt-4 inline-flex rounded-full bg-indigo-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-900"
                      : "mt-4 inline-flex items-center gap-1 text-sm font-medium text-violet-200 transition hover:text-white"
                  }
                >
                  <span>{item.label}</span>
                  {!primary ? <span aria-hidden>→</span> : null}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
