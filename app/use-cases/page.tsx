import Link from "next/link";
import { useCasesCatalog } from "@/data/use-cases/catalog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const primaryButtonClass =
  "inline-flex rounded-full bg-indigo-950 fd-primary-glow px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-900";

export default function UseCasesPage() {
  return (
    <div className="fd-page-chrome mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
      <header className="mb-8">
        <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline">FlowDock</Badge>
          <Badge variant="secondary">使用场景 / Use Cases</Badge>
          <Badge variant="outline">按任务找第一步</Badge>
        </div>
        <p className="text-sm font-medium text-indigo-700">FlowDock / 使用场景</p>
        <h1 className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-950 sm:text-[2.35rem]">使用场景</h1>
        <p className="mt-3.5 max-w-3xl text-sm leading-[1.72] text-slate-600 sm:text-[15px]">
          如果你不想按功能页来回跳，就按任务进这里。场景页负责帮你选第一跳，不负责替代 Diagnose 或模板详情页。
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
          <Link href="#use-case-grid" className={primaryButtonClass}>
            直接看场景入口
          </Link>
          <Link href="/diagnose" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700">
            <span>问题不清？先 Diagnose</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </header>

      <section id="use-case-grid">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">场景总览</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">当前场景入口</h2>
          </div>
          <Link href="/docs/getting-started" className="hidden text-sm font-medium text-indigo-700 sm:inline-flex">
            需要先建立顺序？看起步指南
          </Link>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-4 xl:gap-3">
          {useCasesCatalog.map((item, index) => (
            <Card key={item.slug} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm fd-glass-card">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">场景 0{index + 1}</p>
                  <Badge variant="outline">{item.audience.length} 类适用对象</Badge>
                </div>
                <CardTitle className="mt-1 text-lg text-slate-950">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-[1.65] text-slate-600">{item.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                <div className="rounded-2xl bg-indigo-50/80 px-3.5 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">建议第一跳</p>
                  <p className="mt-1.5 text-sm leading-[1.6] text-slate-600">{item.primaryAction.label}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">完成信号</p>
                  <p className="mt-1.5 text-sm leading-[1.6] text-slate-600">{item.proofOfDone[0] ?? "完成后应能明确判断自己是否走对路径。"}</p>
                </div>

                <div className="hidden rounded-2xl border border-amber-100 bg-amber-50/70 px-3.5 py-2.5 text-sm leading-[1.55] text-slate-700 sm:block">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">常见误区</p>
                  <p className="mt-1">{item.pitfalls[0] ?? "先确认当前阶段，再决定是否继续深入。"}</p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-3 pt-0">
                <Link href={`/use-cases/${item.slug}`} className="inline-flex rounded-full bg-indigo-950 fd-primary-glow px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-900">
                  查看场景路径
                </Link>
                <Link href={item.secondaryAction.href} className="hidden items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700 sm:inline-flex">
                  <span>{item.secondaryAction.label}</span>
                  <span aria-hidden>→</span>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
