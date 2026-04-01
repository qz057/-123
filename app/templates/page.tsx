import Link from "next/link";
import { templatesCatalog } from "@/data/templates/catalog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const primaryButtonClass =
  "inline-flex rounded-full bg-indigo-950 fd-primary-glow px-5 py-3 text-sm font-medium text-white shadow-[0_18px_44px_-24px_rgba(79,70,229,0.55)] transition hover:bg-violet-900";

export default function TemplatesPage() {
  return (
    <div className="fd-page-chrome mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
      <header className="mb-8">
        <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline">FlowDock</Badge>
          <Badge variant="secondary">Templates</Badge>
          <Badge variant="outline">方向明确后直接来这里</Badge>
        </div>
        <p className="text-sm font-medium text-indigo-700">FlowDock / Templates</p>
        <h1 className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-950 sm:text-[2.35rem]">工作流模板中心</h1>
        <p className="mt-3.5 max-w-3xl text-sm leading-[1.72] text-slate-600 sm:text-[15px]">
          如果你已经知道自己要解决什么，这页就该直接给你模板，而不是先让你读很多说明。方向还不清，就先回 Diagnose。
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
          <Link href="#template-grid" className={primaryButtonClass}>
            直接看模板列表
          </Link>
          <Link href="/diagnose" className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700">
            <span>方向不清？先 Diagnose</span>
            <span aria-hidden>→</span>
          </Link>
        </div>
      </header>

      <section id="template-grid">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">All templates</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">首批模板</h2>
          </div>
          <Link href="/docs/templates" className="hidden text-sm font-medium text-indigo-700 sm:inline-flex">
            需要规则说明？看 Templates 文档
          </Link>
        </div>
        <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-4 xl:gap-3">
          {templatesCatalog.map((template, index) => (
            <Card key={template.slug} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm fd-glass-card">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Template 0{index + 1}</p>
                  <Badge variant="outline">{template.category}</Badge>
                  <Badge variant="secondary">{template.difficulty}</Badge>
                </div>
                <CardTitle className="mt-1 text-lg text-slate-950">{template.title}</CardTitle>
                <CardDescription className="text-sm leading-[1.65] text-slate-600">{template.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                <div className="rounded-2xl bg-indigo-50/80 px-3.5 py-3 shadow-[0_20px_52px_-40px_rgba(79,70,229,0.24)]">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">适合你如果</p>
                  <p className="mt-1.5 text-sm leading-[1.6] text-slate-600">{template.fitSignals[0] ?? "先看当前问题是不是这类模板要解决的对象。"}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs text-slate-500 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5">
                    <p className="font-medium text-slate-950">{template.steps.length}</p>
                    <p className="mt-1">步骤</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5">
                    <p className="font-medium text-slate-950">{template.outputs.length}</p>
                    <p className="mt-1">输出</p>
                  </div>
                  <div className="hidden rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5 sm:block">
                    <p className="font-medium text-slate-950">{template.relatedDocs.length}</p>
                    <p className="mt-1">相关文档</p>
                  </div>
                </div>

                <div className="hidden rounded-2xl border border-amber-100 bg-amber-50/70 px-3.5 py-2.5 text-sm leading-[1.55] text-slate-700 sm:block">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">先别用如果</p>
                  <p className="mt-1">{template.notFitSignals[0] ?? "如果当前阶段不匹配，先回 Diagnose 或换入口。"}</p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-3 pt-0">
                <Link href={`/templates/${template.slug}`} className="inline-flex rounded-full bg-indigo-950 fd-primary-glow px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-900">
                  查看模板
                </Link>
                <Link href="/use-cases" className="hidden items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700 sm:inline-flex">
                  <span>按场景找入口</span>
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
