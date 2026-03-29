import Link from "next/link";

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

export function FinalCtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white shadow-[0_28px_90px_-40px_rgba(15,23,42,0.6)] sm:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="relative">
            <div className="absolute -left-10 top-0 hidden h-28 w-28 rounded-full bg-sky-400/10 blur-3xl lg:block" />
            <p className="relative text-sm font-medium text-sky-300">Ready to Start</p>
            <h2 className="relative mt-3 text-3xl font-semibold tracking-tight">从聊天式 AI，走到真正可用的自动化</h2>
            <p className="relative mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
              如果你已经在尝试用 AI 提高效率，下一步不该只是继续聊天，而是把它真正接进你的工作流程里。
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">最稳的首版路径</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-200">
              {steps.map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-medium text-slate-950">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {ctas.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.primary ? "inline-flex justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100" : "inline-flex justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
