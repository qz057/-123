import Link from "next/link";
import { useCasesCatalog } from "@/data/use-cases/catalog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function UseCasesPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 grid gap-6 md:mb-10 md:grid-cols-[1fr_0.82fr] md:items-end">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
              Use Cases
            </Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">适合这些真实工作场景</h2>
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                如果你更习惯按任务进入，而不是按功能进入，就从场景页开始。它的作用不是重复模板内容，而是帮你找到最短入口。
              </p>
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-5 shadow-sm md:block">
            <p className="text-sm font-medium text-slate-900">场景页最该解决的问题</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              不是“这个产品能做什么”，而是“我当前这个任务，第一步应该先进哪一页”。
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          {useCasesCatalog.map((item, index) => (
            <Card
              key={item.slug}
              className={
                index === 0
                  ? "rounded-[1.5rem] border border-slate-200 bg-slate-950 py-0 text-white shadow-[0_22px_60px_-34px_rgba(15,23,42,0.5)] sm:rounded-[1.75rem]"
                  : index === 1
                    ? "hidden rounded-[1.75rem] border border-slate-200 bg-white py-0 shadow-sm sm:flex"
                    : "hidden rounded-[1.75rem] border border-slate-200 bg-white py-0 shadow-sm md:flex"
              }
            >
              <CardHeader className="space-y-3 pb-3 sm:space-y-4 sm:pb-4">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className={index === 0 ? "text-lg text-white sm:text-xl" : "text-lg text-slate-950 sm:text-xl"}>{item.title}</CardTitle>
                  <span
                    className={
                      index === 0
                        ? "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-sky-200"
                        : "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500"
                    }
                  >
                    场景入口
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-4 sm:space-y-4">
                <p className={index === 0 ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>{item.summary}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {item.goals.slice(0, 2).map((goal, goalIndex) => (
                    <span
                      key={goal}
                      className={
                        index === 0
                          ? goalIndex === 1
                            ? "hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300 sm:inline-flex"
                            : "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300"
                          : goalIndex === 1
                            ? "hidden rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-500 sm:inline-flex"
                            : "rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-500"
                      }
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pb-5 sm:pb-6">
                <Link
                  href={`/use-cases/${item.slug}`}
                  className={
                    index === 0
                      ? "inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                      : "inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  }
                >
                  查看场景路径
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
