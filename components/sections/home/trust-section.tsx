import { trustPoints } from "@/data/home/content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TrustSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm font-medium text-sky-700">Why FlowDock</p>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950">不是泛 AI 内容站，而是从真实问题里长出来的工具站</h2>
            <p className="text-sm leading-6 text-slate-600 sm:text-base">
              我们不追求“看起来很全”，而是优先保证你能把当前任务继续推进。
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-900">这页最重要的信号</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              每个模块都应该把用户带向下一步动作，而不是把用户留在说明页里。
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {trustPoints.map((item, index) => (
            <Card
              key={item.title}
              className={index === 1 ? "rounded-3xl border border-slate-200 bg-slate-950 py-0 text-white shadow-sm" : "rounded-3xl border border-slate-200 bg-white py-0 shadow-sm"}
            >
              <CardHeader>
                <CardTitle className={index === 1 ? "text-lg text-white" : "text-lg text-slate-950"}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-6">
                <p className={index === 1 ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>{item.description}</p>
                <div className={index === 1 ? "rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs leading-5 text-slate-300" : "rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-xs leading-5 text-slate-500"}>
                  目标不是“内容看上去很满”，而是让用户真正走到 Diagnose / Templates / Docs 的下一步。
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
