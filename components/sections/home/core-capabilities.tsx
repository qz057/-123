import Link from "next/link";
import { capabilities } from "@/data/home/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const outputs = ["先判断层级", "给可执行路径", "留下可验证结果"] as const;
const capabilityTargets = ["定位问题", "承接执行", "推动落地"] as const;

const capabilityActions = [
  {
    label: "打开 Diagnose",
    href: "/diagnose",
    note: "当你还分不清问题属于哪层时，先让诊断器帮你压层。",
  },
  {
    label: "进入模板中心",
    href: "/templates",
    note: "方向已经明确后，就别停在解释层，直接拿执行路径。",
  },
  {
    label: "按场景找入口",
    href: "/use-cases",
    note: "当任务比单个模板更长时，用场景页把整段路径拉顺。",
  },
] as const;

export function CoreCapabilitiesSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[linear-gradient(180deg,#f5f7ff_0%,#eef2ff_100%)]">
      <div className="absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-violet-400/12 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 grid gap-6 md:grid-cols-[1fr_0.78fr] md:items-end">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className="border-indigo-200 bg-white/80 text-indigo-700">
              Capabilities
            </Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">这个站不讲抽象概念，直接帮你解决 3 类推进障碍</h2>
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                每个模块都围绕“先定位，再执行，再验证”设计。目标不是补知识密度，而是把你稳稳推向下一步动作，并且让每个动作都更容易回头验证。
              </p>
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur md:block">
            <p className="text-sm font-medium text-slate-900">能力区该回答什么</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              不是“我们有哪些功能”，而是“当前这一步到底能替你解决哪类推进障碍，以及更自然的下一跳在哪”。
            </p>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-white/85 bg-white/85 px-4 py-3 text-sm leading-6 text-slate-600 shadow-sm sm:hidden">
          默认结果：先判断层级，再给路径，最后留下可验证结果。
        </div>

        <div className="mb-4 rounded-[1.5rem] border border-white/85 bg-white/90 p-3.5 shadow-sm sm:hidden">
          <p className="text-sm font-semibold text-slate-950">手机上先记住这 3 个能力</p>
          <div className="mt-3 grid gap-2 text-sm leading-6 text-slate-700">
            <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5">先帮你判断问题在哪一层，不继续并排怀疑。</div>
            <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5">再把它接到正确执行路径，不停在说明层。</div>
            <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5">最后留下可验证结果，避免只剩“好像好了”。</div>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <Link href="/diagnose" className="inline-flex rounded-full bg-indigo-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-900">
              打开 Diagnose
            </Link>
            <Link href="/templates" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700">
              <span>进入模板中心</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <div className="mb-5 hidden flex-wrap gap-2 text-xs text-slate-500 sm:flex">
          {outputs.map((item) => (
            <span key={item} className="rounded-full border border-white/90 bg-white/90 px-3 py-1.5 shadow-sm">
              {item}
            </span>
          ))}
        </div>

        <div className="hidden gap-3 sm:grid sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((item, index) => {
            const action = capabilityActions[index];
            const primary = index === 1;

            return (
              <Card
                key={item.title}
                className={
                  primary
                    ? "rounded-[1.5rem] border border-slate-200 bg-indigo-950 py-0 text-white shadow-[0_20px_60px_-34px_rgba(15,23,42,0.5)] sm:rounded-[1.75rem]"
                    : index === 2
                      ? "hidden rounded-[1.75rem] border border-slate-200 bg-white py-0 shadow-sm sm:block md:col-span-2 xl:col-span-1"
                      : "rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm sm:rounded-[1.75rem]"
                }
              >
                <CardHeader className="space-y-3 pb-3 sm:space-y-4 sm:pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <Badge
                      variant="outline"
                      className={primary ? "w-fit border-white/15 bg-white/10 text-violet-200" : "w-fit border-indigo-200 bg-indigo-50 text-indigo-700"}
                    >
                      能力 {index + 1}
                    </Badge>
                    <span className={primary ? "text-xs text-slate-400" : "text-xs text-slate-500"}>{capabilityTargets[index]}</span>
                  </div>
                  <CardTitle className={primary ? "text-lg text-white sm:text-xl" : "text-lg text-slate-950 sm:text-xl"}>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-5 sm:space-y-4 sm:pb-6">
                  <p className={primary ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>{item.description}</p>
                  <div
                    className={
                      primary
                        ? "rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                        : "rounded-2xl border border-slate-200 bg-indigo-50/80 px-4 py-3"
                    }
                  >
                    <p className={primary ? "text-[11px] font-medium uppercase tracking-[0.16em] text-violet-200" : "text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400"}>
                      更自然下一跳
                    </p>
                    <p className={primary ? "mt-2 hidden text-sm leading-[1.6] text-slate-300 sm:block" : "mt-2 hidden text-sm leading-[1.6] text-slate-600 sm:block"}>{action.note}</p>
                    <Link
                      href={action.href}
                      className={
                        primary
                          ? "mt-3 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                          : "mt-3 inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700"
                      }
                    >
                      <span>{action.label}</span>
                      {!primary ? <span aria-hidden>→</span> : null}
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-5 hidden rounded-[28px] border border-white/85 bg-white/85 px-4 py-4 shadow-sm sm:mt-6 sm:block sm:px-5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Default loop</p>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
            {[
              "先用 Diagnose 压层，不先靠感觉并排怀疑多层问题。",
              "再用 Templates / Use Cases 承接执行，不停在说明层。",
              "最后回 Docs 做验证、边界确认和失败分支复核。",
            ].map((item, index) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-indigo-50/80 px-3.5 py-3 text-sm leading-[1.6] text-slate-600">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-950 text-xs font-medium text-white">
                  {index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
