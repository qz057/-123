import Link from "next/link";
import { useCasesCatalog } from "@/data/use-cases/catalog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const linkClass =
  "inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

export default function UseCasesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.84fr] lg:items-end">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">Use Cases</Badge>
          </div>
          <p className="text-sm font-medium text-sky-700">FlowDock / Use Cases</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">使用场景</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            用真实场景来组织 FlowDock，而不是只按功能堆页面。先看自己属于哪类任务，再进入 Diagnose、Templates 和 Docs。
          </p>
        </div>

        <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-950">场景页的正确打开方式</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-6 text-sm leading-6 text-slate-600">
            <p>• 先用任务视角判断入口，而不是先翻所有功能页</p>
            <p>• 再通过场景页跳到对应模板、诊断器和文档</p>
            <p>• 目标是更快选对第一步，不是把场景页当终点</p>
          </CardContent>
        </Card>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {useCasesCatalog.map((item) => (
          <Card key={item.slug} className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-slate-600">{item.summary}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                {item.goals.map((goal) => (
                  <span key={goal} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                    {goal}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 pb-6">
              <Link href={`/use-cases/${item.slug}`} className={linkClass}>
                查看场景
              </Link>
              <Link href={item.primaryAction.href} className={linkClass}>
                {item.primaryAction.label}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
