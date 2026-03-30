import { capabilities } from "@/data/home/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const outputs = ["先判断层级", "给可执行路径", "留下可验证结果"] as const;
const capabilityTargets = ["定位问题", "承接执行", "推动落地"] as const;

export function CoreCapabilitiesSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]">
      <div className="absolute left-1/2 top-0 h-36 w-36 -translate-x-1/2 rounded-full bg-sky-300/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 grid gap-6 md:grid-cols-[1fr_0.78fr] md:items-end">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className="border-sky-200 bg-white/80 text-sky-700">
              Capabilities
            </Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">这个站不讲抽象概念，直接帮你解决 3 类问题</h2>
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                每个模块都围绕“先定位，再执行，再验证”设计。目标不是补知识密度，而是把你稳稳推向下一步动作。
              </p>
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-sm backdrop-blur md:block">
            <p className="text-sm font-medium text-slate-900">能力区该回答什么</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              不是“我们有哪些功能”，而是“当前这一步到底能替你解决哪类推进障碍”。
            </p>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-white/85 bg-white/85 px-4 py-3 text-sm leading-6 text-slate-600 shadow-sm sm:hidden">
          默认结果：先判断层级，再给路径，最后留下可验证结果。
        </div>

        <div className="mb-5 hidden flex-wrap gap-2 text-xs text-slate-500 sm:flex">
          {outputs.map((item) => (
            <span key={item} className="rounded-full border border-white/90 bg-white/90 px-3 py-1.5 shadow-sm">
              {item}
            </span>
          ))}
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {capabilities.map((item, index) => (
            <Card
              key={item.title}
              className={
                index === 1
                  ? "rounded-[1.5rem] border border-slate-200 bg-slate-950 py-0 text-white shadow-[0_20px_60px_-34px_rgba(15,23,42,0.5)] sm:rounded-[1.75rem]"
                  : index === 2
                    ? "rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm md:col-span-2 xl:col-span-1 sm:rounded-[1.75rem]"
                    : "rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm sm:rounded-[1.75rem]"
              }
            >
              <CardHeader className="space-y-3 pb-3 sm:space-y-4 sm:pb-4">
                <div className="flex items-center justify-between gap-3">
                  <Badge
                    variant="outline"
                    className={
                      index === 1 ? "w-fit border-white/15 bg-white/10 text-sky-200" : "w-fit border-sky-200 bg-sky-50 text-sky-700"
                    }
                  >
                    能力 {index + 1}
                  </Badge>
                  <span className={index === 1 ? "text-xs text-slate-400" : "text-xs text-slate-500"}>{capabilityTargets[index]}</span>
                </div>
                <CardTitle className={index === 1 ? "text-lg text-white sm:text-xl" : "text-lg text-slate-950 sm:text-xl"}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-5 sm:space-y-4 sm:pb-6">
                <p className={index === 1 ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>{item.description}</p>
                <div
                  className={
                    index === 1
                      ? "hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs leading-5 text-slate-300 sm:block"
                      : "hidden rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs leading-5 text-slate-500 sm:block"
                  }
                >
                  输出目标：给出可以直接继续推进的下一步，不只解释原理。
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
