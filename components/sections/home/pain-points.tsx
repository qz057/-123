import Link from "next/link";
import { painPoints } from "@/data/home/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sectionSignals = ["配置失效", "会话错位", "工具断链", "自动化起步困难"] as const;

const routeHints = [
  {
    label: "先回 Diagnose",
    href: "/diagnose",
    note: "先确认这是不是配置层没真正生效，而不是继续叠改动。",
  },
  {
    label: "先做问题归类",
    href: "/diagnose",
    note: "先分清是不是 Session 层旧绑定，不要把 UI 变化直接当真。",
  },
  {
    label: "按场景找入口",
    href: "/use-cases",
    note: "先把任务链条拉顺，再决定模板和入口该怎么接。",
  },
  {
    label: "直接看模板",
    href: "/templates",
    note: "先拿可复用方案起步，不从空白页重新组织自动化。",
  },
] as const;

export function PainPointsSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-end md:gap-8 lg:mb-10">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
              Pain Points
            </Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                你不是缺 AI，
                <span className="block text-slate-600">你是缺一套真的能跑起来的方式</span>
              </h2>
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                很多项目不是完全不会做，而是每一层都只差一点，最后始终没有一条稳定链路真正闭环。先把这些卡点说透，后面的 Diagnose、Templates 和 Use Cases 才有价值。
              </p>
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_56px_-32px_rgba(15,23,42,0.45)] md:block">
            <p className="text-sm font-medium text-white">典型问题的共同点</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              表面看像是很多小问题，实际核心是：没有人先帮你判断问题属于哪层，也没有把下一步动作稳定接住。
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
              {sectionSignals.map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
          {painPoints.map((item, index) => {
            const route = routeHints[index];
            const hideOnMobile = index >= 2;

            return (
              <Card
                key={item.title}
                className={
                  hideOnMobile
                    ? "hidden rounded-[1.75rem] border border-slate-200 bg-white py-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-34px_rgba(15,23,42,0.2)] sm:block"
                    : "rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-34px_rgba(15,23,42,0.2)] sm:rounded-[1.75rem]"
                }
              >
                <CardHeader className="space-y-3 pb-3 sm:space-y-4 sm:pb-4">
                  <span className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500">
                    问题 0{index + 1}
                  </span>
                  <CardTitle className="text-lg leading-7 text-slate-950">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-5 sm:space-y-4 sm:pb-6">
                  <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">更自然下一跳</p>
                    <p className="mt-2 hidden text-sm leading-[1.6] text-slate-600 sm:block">{route.note}</p>
                    <Link href={route.href} className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800 sm:mt-3">
                      <span>{route.label}</span>
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
