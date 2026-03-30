import Link from "next/link";
import { templates } from "@/data/home/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
                如果 Diagnose 已经帮你判断了方向，下一步就该去 Templates 拿可复用方案，而不是回到空白文档重新拼装。
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

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template, index) => (
            <Card
              key={template.title}
              className={
                index === 0
                  ? "rounded-[1.5rem] border border-slate-200 bg-slate-950 py-0 text-white shadow-[0_22px_60px_-34px_rgba(15,23,42,0.5)] sm:rounded-[1.75rem]"
                  : index === 3
                    ? "hidden rounded-[1.75rem] border border-slate-200 bg-white py-0 shadow-sm md:flex"
                    : index >= 4
                      ? "hidden rounded-[1.75rem] border border-slate-200 bg-white py-0 shadow-sm xl:flex"
                      : "rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm sm:rounded-[1.75rem]"
              }
            >
              <CardHeader className="space-y-3 pb-3 sm:space-y-4 sm:pb-4">
                <Badge variant="outline" className={index === 0 ? "w-fit border-white/15 bg-white/10 text-sky-200" : "w-fit"}>
                  {template.category}
                </Badge>
                <div className="space-y-2">
                  <CardTitle className={index === 0 ? "text-lg text-white" : "text-lg text-slate-950"}>{template.title}</CardTitle>
                  <CardDescription className={index === 0 ? "text-sm leading-6 text-slate-300" : "text-sm leading-6 text-slate-600"}>
                    {template.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pb-5 text-xs sm:space-y-4 sm:pb-6">
                <p className={index === 0 ? "leading-5 text-slate-300" : "leading-5 text-slate-500"}>
                  适合从当前问题快速过渡到下一步动作，而不是停在概念层。
                </p>
                <div
                  className={
                    index === 0
                      ? "hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-3 leading-5 text-slate-300 sm:block"
                      : "hidden rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 leading-5 text-slate-500 sm:block"
                  }
                >
                  当前详情结构：适配判断 / 步骤 / 验收 / 回滚 / 案例
                </div>
              </CardContent>
            </Card>
          ))}
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
  )
}
