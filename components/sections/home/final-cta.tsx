import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const steps = [
  "先用 Diagnose 把问题定位到正确层级",
  "再从 Templates 里挑最接近的可复用方案",
  "最后按 Docs 的路径完成验证与落地",
] as const;

const ctas = [
  { label: "立即体检配置", href: "/diagnose", primary: true },
  { label: "进入模板中心", href: "/templates", primary: false },
  { label: "查看文档路径", href: "/docs", primary: false },
  { label: "查看适用场景", href: "/use-cases", primary: false },
] as const;

const outcomeSignals = [
  { title: "不是继续聊天", detail: "而是先判断问题层级，再进入执行路径" },
  { title: "不是继续试错", detail: "而是拿现成模板、检查项和回滚策略" },
  { title: "不是停在感觉可用", detail: "而是回到文档把边界和验证讲清楚" },
] as const;

const launchModes = [
  {
    title: "我现在就有卡点",
    detail: "直接从 Diagnose 起步，把问题送进正确层级。",
    href: "/diagnose",
    label: "先体检配置",
  },
  {
    title: "我已经知道方向",
    detail: "直接进模板中心，把理解变成执行顺序。",
    href: "/templates",
    label: "进入模板中心",
  },
  {
    title: "我要先确认边界",
    detail: "回文档路径和 Product Notes，先把预期讲清再推进。",
    href: "/docs",
    label: "查看文档路径",
  },
] as const;

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 px-5 py-8 text-white shadow-[0_34px_100px_-48px_rgba(15,23,42,0.72)] sm:px-10 sm:py-12 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.28),transparent_70%)]" />
        <div className="absolute -right-12 top-10 hidden h-44 w-44 rounded-full bg-sky-400/10 blur-3xl lg:block" />

        <div className="relative grid gap-6 sm:gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div>
            <Badge variant="outline" className="border-sky-300/20 bg-sky-400/10 text-sky-200">
              Ready to Start
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              从聊天式 AI，
              <span className="block text-slate-300">走到真正可用的自动化工作流</span>
            </h2>
            <p className="mt-2 text-xs font-medium uppercase tracking-[0.22em] text-sky-200/80">FlowDock 默认闭环</p>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
              如果你已经在尝试用 AI 提高效率，下一步不该只是继续聊天，而是把它接进真实工作：先诊断，后执行，再验证，让每一步都有承接关系。
            </p>

            <div className="mt-6 hidden gap-3 md:grid md:grid-cols-3">
              {outcomeSignals.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4 backdrop-blur sm:rounded-[1.75rem] sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-white">最稳的首版路径</p>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-slate-300">默认顺序</span>
              </div>
              <div className="mt-3 space-y-2.5 text-sm leading-6 text-slate-200 sm:mt-4 sm:space-y-3">
                {steps.map((item, index) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2.5 sm:rounded-2xl sm:px-4 sm:py-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-medium text-slate-950">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden rounded-[1.75rem] border border-sky-300/15 bg-sky-400/10 p-5 md:block">
              <p className="text-sm font-medium text-white">为什么这里值得现在开始</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                因为你真正缺的通常不是“更多 AI 建议”，而是一个能把问题快速导向正确动作、并且能回头验证的工作台结构。
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:mt-8 sm:rounded-[1.75rem] sm:p-5">
          <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Launch lanes</p>
              <h3 className="mt-1 text-xl font-semibold text-white">如果你现在就要开始，先选这三条起步路之一</h3>
            </div>
            <p className="hidden max-w-md text-sm leading-6 text-slate-300 lg:block">
              这里不是重复按钮，而是把“我现在最像哪种现场”压成一个更短的第一步判断。
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {launchModes.map((item, index) => {
              const hiddenOnMobile = index === 2;
              return (
                <div
                  key={item.title}
                  className={
                    index === 0
                      ? "rounded-[1.35rem] border border-white/10 bg-slate-950 px-4 py-4 text-white"
                      : hiddenOnMobile
                        ? "hidden rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-white md:block"
                        : "rounded-[1.35rem] border border-white/10 bg-white/5 px-4 py-4 text-white"
                  }
                >
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
                  <Link
                    href={item.href}
                    className={
                      index === 0
                        ? "mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
                        : "mt-4 inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    }
                  >
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:mt-8 xl:grid-cols-4">
          {ctas.map((item) => {
            const hiddenOnMobile = item.href === "/use-cases";
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.primary
                    ? hiddenOnMobile
                      ? "hidden justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100 sm:inline-flex"
                      : "inline-flex justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
                    : hiddenOnMobile
                      ? "hidden justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10 sm:inline-flex"
                      : "inline-flex justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
