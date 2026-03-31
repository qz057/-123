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
                如果你更习惯按任务进入，而不是按功能进入，就从场景页开始。首页这里不再只告诉你“能做什么”，而是先帮你判断第一跳和 done signal 应该长什么样。
              </p>
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-slate-200 bg-slate-50/90 p-5 shadow-sm md:block">
            <p className="text-sm font-medium text-slate-900">场景页最该解决的问题</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              不是“这个产品能做什么”，而是“我当前这个任务，第一步应该先进哪一页，以及什么样才算真的走对了”。
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-3">
          {useCasesCatalog.map((item, index) => {
            const primary = index === 0;
            return (
              <Card
                key={item.slug}
                className={
                  primary
                    ? "rounded-[1.5rem] border border-slate-200 bg-slate-950 py-0 text-white shadow-[0_22px_60px_-34px_rgba(15,23,42,0.5)] sm:rounded-[1.75rem]"
                    : index === 2
                      ? "hidden rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm md:block sm:rounded-[1.75rem]"
                      : index === 3
                        ? "hidden rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm xl:block sm:rounded-[1.75rem]"
                        : "rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm sm:rounded-[1.75rem]"
                }
              >
                <CardHeader className="space-y-3 pb-3 sm:space-y-4 sm:pb-4">
                  <div className="flex items-center justify-between gap-3">
                    <CardTitle className={primary ? "text-lg text-white sm:text-xl" : "text-lg text-slate-950 sm:text-xl"}>{item.title}</CardTitle>
                    <span
                      className={
                        primary
                          ? "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-sky-200"
                          : "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500"
                      }
                    >
                      场景入口
                    </span>
                  </div>
                  <p className={primary ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>{item.summary}</p>
                </CardHeader>
                <CardContent className="space-y-3 pb-4 sm:space-y-4">
                  <div className={primary ? "rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3" : "rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-3"}>
                    <p className={primary ? "text-[11px] font-medium uppercase tracking-[0.16em] text-sky-200" : "text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400"}>
                      建议第一跳
                    </p>
                    <p className={primary ? "mt-2 text-sm leading-[1.6] text-slate-300" : "mt-2 text-sm leading-[1.6] text-slate-600"}>{item.primaryAction.label}</p>
                  </div>

                  <div className={primary ? "rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3" : "rounded-2xl border border-amber-100 bg-amber-50/70 px-3.5 py-3"}>
                    <p className={primary ? "text-[11px] font-medium uppercase tracking-[0.16em] text-slate-300" : "text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500"}>
                      Done signal
                    </p>
                    <p className={primary ? "mt-2 text-sm leading-[1.6] text-slate-200" : "mt-2 text-sm leading-[1.6] text-slate-700"}>{item.proofOfDone[0]}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-3 pb-5 sm:pb-6">
                  <Link
                    href={`/use-cases/${item.slug}`}
                    className={
                      primary
                        ? "inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                        : "inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    }
                  >
                    查看场景路径
                  </Link>
                  <Link
                    href={item.primaryAction.href}
                    className={
                      primary
                        ? "hidden items-center gap-1 text-sm font-medium text-sky-200 transition hover:text-white sm:inline-flex"
                        : "hidden items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800 sm:inline-flex"
                    }
                  >
                    <span>{item.primaryAction.label}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
          <Link href="/use-cases" className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
            查看全部场景
          </Link>
          <Link href="/templates" className="hidden rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex">
            继续看模板中心
          </Link>
        </div>
      </div>
    </section>
  );
}
