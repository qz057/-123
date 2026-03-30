import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const journey = [
  {
    title: "Diagnose",
    summary: "当你还不确定问题属于哪一层时，先从这里开始。",
    detail: "负责先归类：连接、配置、会话还是工具接入。",
    href: "/diagnose",
    cta: "先体检配置",
    stage: "定位入口",
  },
  {
    title: "Templates",
    summary: "当方向已经明确，就直接去拿可复用方案。",
    detail: "负责承接执行：模板详情页已经包含适配判断、步骤、验收和回滚。",
    href: "/templates",
    cta: "查看模板中心",
    stage: "执行入口",
  },
  {
    title: "Use Cases",
    summary: "如果你更习惯按任务而不是按功能进入，就走这里。",
    detail: "负责用场景视角组织入口，帮助你更快选对第一步。",
    href: "/use-cases",
    cta: "按场景找入口",
    stage: "场景入口",
  },
  {
    title: "Docs",
    summary: "当你需要补规则、边界和验证方式时，再回这里。",
    detail: "负责把使用顺序、产品边界和可验证路径讲清楚。",
    href: "/docs",
    cta: "查看文档路径",
    stage: "验证收口",
  },
] as const;

const routeSignals = [
  { label: "适合谁先来", value: "先不确定问题属于哪层的人" },
  { label: "最稳默认路径", value: "Diagnose → Templates → Docs" },
  { label: "避免的问题", value: "一上来就进错页、拿错方案、漏掉验证" },
] as const;

const branchMap = [
  {
    title: "还不知道问题在哪层",
    detail: "别先跳模板，先用 Diagnose 把层级压清。",
    href: "/diagnose",
    label: "先做 Diagnose",
  },
  {
    title: "已经知道方向，只缺执行路径",
    detail: "别继续停在解释层，直接切到 Templates。",
    href: "/templates",
    label: "去模板中心",
  },
  {
    title: "执行后要回头验证边界",
    detail: "不要把可用首版误当成全场景终版，回 Docs / Product Notes 收口。",
    href: "/docs",
    label: "去文档路径",
  },
] as const;

export function ProductJourneySection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-end">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
              Product Journey
            </Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                FlowDock 不是一堆页面，
                <span className="block text-slate-600">而是一条把问题送进正确入口的执行路径</span>
              </h2>
              <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                首页的任务不是把所有内容一次讲完，而是让用户更快走到正确第一步。先定位，再执行，最后验证收口，这是整个产品首页最该传达清楚的结构。
              </p>
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_56px_-32px_rgba(15,23,42,0.45)] md:block">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">为什么这个区块值得放首页前排</p>
              <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-300">入口关系</span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {routeSignals.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-sky-200 via-slate-200 to-slate-200 xl:block" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {journey.map((item, index) => {
              const isPrimary = index === 0;
              const hideOnMobile = index === 3;
              return (
                <Card
                  key={item.title}
                  className={
                    isPrimary
                      ? hideOnMobile
                        ? "relative hidden rounded-[1.75rem] border border-slate-200 bg-slate-950 py-0 text-white shadow-[0_22px_60px_-32px_rgba(15,23,42,0.5)] sm:block"
                        : "relative rounded-[1.75rem] border border-slate-200 bg-slate-950 py-0 text-white shadow-[0_22px_60px_-32px_rgba(15,23,42,0.5)]"
                      : hideOnMobile
                        ? "relative hidden rounded-[1.75rem] border border-slate-200 bg-white py-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-34px_rgba(15,23,42,0.25)] sm:block"
                        : "relative rounded-[1.75rem] border border-slate-200 bg-white py-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-34px_rgba(15,23,42,0.25)]"
                  }
                >
                  <CardHeader className="space-y-4 pb-4">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={
                          isPrimary
                            ? "rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-sky-200"
                            : "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500"
                        }
                      >
                        {item.stage}
                      </span>
                      <span
                        className={
                          isPrimary
                            ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950"
                            : "inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white"
                        }
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <CardTitle className={isPrimary ? "text-xl text-white" : "text-xl text-slate-950"}>{item.title}</CardTitle>
                      <p className={isPrimary ? "text-sm leading-6 text-slate-200" : "text-sm leading-6 text-slate-700"}>{item.summary}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col space-y-4 pb-6">
                    <p className={isPrimary ? "hidden text-xs leading-5 text-slate-400 sm:block" : "hidden text-xs leading-5 text-slate-500 sm:block"}>{item.detail}</p>
                    <Link
                      href={item.href}
                      className={
                        isPrimary
                          ? "mt-auto inline-flex w-fit rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                          : "mt-auto inline-flex w-fit rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      }
                    >
                      {item.cta}
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5 shadow-sm sm:p-6">
          <div className="mb-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Branch map</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">当你已经走进首页，最该怎么选第一步</h3>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                这不是另外一组功能介绍，而是把“问题模糊 / 方向明确 / 需要收口”三种最常见现场压成一张更容易执行的路径图。
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-xs leading-5 text-slate-500">
              首页最终视觉统一的关键，不是卡片更多，而是让用户从第一屏到第一步之间的判断更短。
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {branchMap.map((item, index) => (
              <div
                key={item.title}
                className={
                  index === 0
                    ? "rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.45)]"
                    : "rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
                }
              >
                <p className={index === 0 ? "text-lg font-semibold text-white" : "text-lg font-semibold text-slate-950"}>{item.title}</p>
                <p className={index === 0 ? "mt-3 text-sm leading-6 text-slate-300" : "mt-3 text-sm leading-6 text-slate-600"}>{item.detail}</p>
                <Link
                  href={item.href}
                  className={
                    index === 0
                      ? "mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                      : "mt-5 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  }
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
