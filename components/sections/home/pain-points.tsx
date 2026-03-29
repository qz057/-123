import { painPoints } from "@/data/home/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function PainPointsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-medium text-sky-700">Pain Points</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">你不是缺 AI，你是缺一套真正能跑起来的方式</h2>
          <p className="text-sm leading-6 text-slate-600 sm:text-base">
            这些是我们在真实搭建和排障中最常见的卡点。先把问题说清楚，后面的诊断和模板才会更稳。
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm">
          <p className="text-sm font-medium text-white">典型问题长这样</p>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            看起来每个环节都“差一点就好了”，但始终没有一条稳定链路真正闭环。这正是 FlowDock 要优先解决的地方。
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {painPoints.map((item, index) => (
          <Card key={item.title} className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <CardHeader>
              <span className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                0{index + 1}
              </span>
              <CardTitle className="mt-3 text-lg leading-7 text-slate-950">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6">
              <p className="text-sm leading-6 text-slate-600">{item.description}</p>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-xs leading-5 text-slate-500">
                对应解决方式：先去 Diagnose 归类，再用 Templates / Docs 承接。
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
