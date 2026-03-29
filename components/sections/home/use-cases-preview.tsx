import Link from "next/link";
import { useCasesCatalog } from "@/data/use-cases/catalog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function UseCasesPreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-end">
        <div className="max-w-3xl space-y-3">
          <p className="text-sm font-medium text-sky-700">Use Cases</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">适合这些真实工作场景</h2>
          <p className="text-sm leading-6 text-slate-600 sm:text-base">
            先找你当前任务所属场景，再进入对应模板和诊断路径，效率会更高。
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-900">场景页的价值</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            它不是重复模板内容，而是帮用户从任务视角找到最短入口。
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {useCasesCatalog.map((item) => (
          <Card key={item.slug} className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-6 text-slate-600">{item.summary}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                {item.goals.slice(0, 2).map((goal) => (
                  <span key={goal} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                    {goal}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3 pb-6">
              <Link href={`/use-cases/${item.slug}`} className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                查看场景路径
              </Link>
              <Link href="/templates" className="inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                去模板中心
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
