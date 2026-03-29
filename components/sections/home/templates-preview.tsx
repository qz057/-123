import Link from "next/link";
import { templates } from "@/data/home/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function TemplatesPreviewSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-sky-700">Templates</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">现成模板，直接拿去改</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              如果你不想从空白页开始，这里已经整理好一批能直接复用的 AI 自动化模板和搭建路径。
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-900">模板页现在不只是文章</p>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              首批详情页已经包含适用判断、执行检查、失败信号、回滚策略和实战案例。
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.title} className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <Badge variant="outline" className="w-fit">{template.category}</Badge>
                <CardTitle className="mt-2 text-lg text-slate-950">{template.title}</CardTitle>
                <CardDescription className="text-sm leading-6 text-slate-600">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-6 text-xs text-slate-500">
                <p>适合从当前问题快速过渡到下一步动作，而不是停在概念层。</p>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
                  当前详情结构：适配判断 / 步骤 / 验收 / 回滚 / 案例
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/templates" className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
            查看全部模板
          </Link>
          <Link href="/docs/templates" className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            先看模板文档
          </Link>
        </div>
      </div>
    </section>
  );
}
