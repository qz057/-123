import Link from "next/link";
import { templatesCatalog } from "@/data/templates/catalog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const featuredTemplates = templatesCatalog.slice(0, 4);

const templateSignals = ["适用判断", "执行检查", "失败信号", "回滚策略", "实战案例"] as const;

export function TemplatesPreviewSection() {
  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 grid gap-6 md:mb-10 md:grid-cols-[1fr_0.85fr] md:items-end">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className="border-sky-200 bg-white text-sky-700">
              Templates
            </Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">现成模板，不从空白页重新开始</h2>
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                如果 Diagnose 已经帮你判断了方向，下一步就该去 Templates 拿可复用方案，而不是回到空白文档重新拼装。首页这里不再只展示模板名，而是先告诉你它适合谁、会产出什么、最像哪类入口。
              </p>
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-sm backdrop-blur md:block">
            <p className="text-sm font-medium text-slate-900">模板页已经不是文章页</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
              {templateSignals.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-sm leading-6 text-slate-600 shadow-sm sm:hidden">
          模板详情重点：适用判断、步骤、验收、回滚和案例，不是再讲一遍概念。
        </div>

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-3">
          {featuredTemplates.map((template, index) => {
            const primary = index === 0;
            return (
              <Card
                key={template.slug}
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
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className={primary ? "border-white/15 bg-white/10 text-sky-200" : "w-fit"}>
                      {template.category}
                    </Badge>
                    <Badge variant={primary ? "outline" : "secondary"} className={primary ? "border-white/15 bg-white/10 text-slate-200" : ""}>
                      {template.difficulty}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <CardTitle className={primary ? "text-lg text-white" : "text-lg text-slate-950"}>{template.title}</CardTitle>
                    <CardDescription className={primary ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>
                      {template.summary}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pb-4 sm:space-y-4">
                  <div className={primary ? "rounded-2xl border border-white/10 bg-white/5 px-3.5 py-3" : "rounded-2xl border border-slate-200 bg-slate-50/70 px-3.5 py-3"}>
                    <p className={primary ? "text-[11px] font-medium uppercase tracking-[0.16em] text-sky-200" : "text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400"}>
                      适合你如果
                    </p>
                    <p className={primary ? "mt-2 text-sm leading-[1.6] text-slate-300" : "mt-2 text-sm leading-[1.6] text-slate-600"}>
                      {template.fitSignals[0]}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center text-xs text-slate-500">
                    <div className={primary ? "rounded-2xl border border-white/10 bg-white/5 px-2.5 py-2.5" : "rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5"}>
                      <p className={primary ? "font-medium text-white" : "font-medium text-slate-950"}>{template.steps.length}</p>
                      <p className="mt-1">步骤</p>
                    </div>
                    <div className={primary ? "rounded-2xl border border-white/10 bg-white/5 px-2.5 py-2.5" : "rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5"}>
                      <p className={primary ? "font-medium text-white" : "font-medium text-slate-950"}>{template.outputs.length}</p>
                      <p className="mt-1">输出</p>
                    </div>
                  </div>

                  <div className="hidden flex-wrap gap-2 sm:flex">
                    {template.outputs.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className={
                          primary
                            ? "rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                            : "rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500"
                        }
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between gap-3 pb-5 sm:pb-6">
                  <Link
                    href={`/templates/${template.slug}`}
                    className={
                      primary
                        ? "inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                        : "inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                    }
                  >
                    查看模板
                  </Link>
                  <Link
                    href="/templates"
                    className={
                      primary
                        ? "hidden items-center gap-1 text-sm font-medium text-sky-200 transition hover:text-white sm:inline-flex"
                        : "hidden items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800 sm:inline-flex"
                    }
                  >
                    <span>模板中心</span>
                    <span aria-hidden>→</span>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
          <Link href="/templates" className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
            查看全部模板
          </Link>
          <Link href="/docs/templates" className="hidden rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex">
            先看模板文档
          </Link>
        </div>
      </div>
    </section>
  );
}
