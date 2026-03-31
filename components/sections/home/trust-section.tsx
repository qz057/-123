import Link from "next/link";
import { trustPoints } from "@/data/home/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const trustSignals = ["真实问题驱动", "结果优先", "可回头验证"] as const;

const trustActions = [
  { label: "先做问题归类", href: "/diagnose" },
  { label: "进入模板中心", href: "/templates" },
  { label: "补文档与边界", href: "/docs" },
] as const;

export function TrustSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#eef6ff_100%)]">
      <div className="absolute right-10 top-12 hidden h-40 w-40 rounded-full bg-sky-300/10 blur-3xl lg:block" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 grid gap-6 md:mb-10 md:grid-cols-[1fr_0.82fr] md:items-end">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className="border-sky-200 bg-white/80 text-sky-700">
              Why FlowDock
            </Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                不是泛 AI 内容站，
                <span className="block text-slate-600">而是从真实问题里长出来的工具站</span>
              </h2>
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                我们不追求“看起来很全”，而是优先保证你能把当前任务继续推进。首页每个区块都应该把用户带向下一步，而不是把用户留在说明页里。
              </p>
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur md:block">
            <p className="text-sm font-medium text-slate-900">这页最重要的信号</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              工具、模板、文档和场景页存在的目的，不是内容堆满，而是让当前任务真正继续往前走。
            </p>
          </div>
        </div>

        <div className="mb-6 hidden flex-wrap gap-2 text-xs text-slate-500 sm:flex">
          {trustSignals.map((item) => (
            <span key={item} className="rounded-full border border-white/90 bg-white/90 px-3 py-1.5 shadow-sm">
              {item}
            </span>
          ))}
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trustPoints.map((item, index) => (
            <Card
              key={item.title}
              className={
                index === 1
                  ? "rounded-[1.5rem] border border-slate-200 bg-slate-950 py-0 text-white shadow-[0_20px_60px_-34px_rgba(15,23,42,0.52)] sm:rounded-[1.75rem]"
                  : index === 2
                    ? "hidden rounded-[1.75rem] border border-slate-200 bg-white py-0 shadow-sm sm:flex md:col-span-2 xl:col-span-1"
                    : "rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm sm:rounded-[1.75rem]"
              }
            >
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className={index === 1 ? "text-lg text-white sm:text-xl" : "text-lg text-slate-950 sm:text-xl"}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-5 sm:space-y-4 sm:pb-6">
                <p className={index === 1 ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>{item.description}</p>
                <div
                  className={
                    index === 1
                      ? "hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs leading-5 text-slate-300 sm:block"
                      : "hidden rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-xs leading-5 text-slate-500 sm:block"
                  }
                >
                  目标不是“内容看上去很满”，而是让用户真正走到 Diagnose / Templates / Docs 的下一步。
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-5 rounded-[28px] border border-slate-200 bg-white/85 px-4 py-4 shadow-sm sm:mt-6 sm:px-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Trust, translated into action</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-950 sm:text-xl">如果你只记住一件事：可信，不是因为说得多，而是因为下一步接得住</h3>
            </div>
            <p className="hidden max-w-md text-sm leading-6 text-slate-500 lg:block">
              所以信任区不只讲理念，必须把用户继续送回 Diagnose、Templates 和 Docs 三条主路径里。
            </p>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {trustActions.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  index === 0
                    ? "inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                    : "inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                }
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
