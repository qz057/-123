import Link from "next/link";
import { docsCatalog } from "@/data/docs/catalog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const quickRoutes = [
  {
    title: "我现在还没判清问题层",
    detail: "先 Diagnose，不先读太多文档。",
    href: "/diagnose",
    label: "直接进入 Diagnose",
    tone: "primary",
  },
  {
    title: "我已经知道方向，要直接做",
    detail: "先去模板或场景页，文档只负责补验证。",
    href: "/templates",
    label: "先去模板中心",
    tone: "default",
  },
  {
    title: "我想先确认当前边界",
    detail: "不确定成熟度时，再看 Product Notes。",
    href: "/docs/product-notes",
    label: "先看 Product Notes",
    tone: "default",
  },
] as const;

const docRoles = {
  "getting-started": { when: "第一次进入", next: "下一跳通常是 Diagnose 或 Templates" },
  diagnose: { when: "问题还没压层", next: "下一跳通常是 Diagnose 页面或 Troubleshooting" },
  templates: { when: "方向已经明确", next: "下一跳通常是模板中心或具体模板页" },
  troubleshooting: { when: "现场已经开始乱", next: "下一跳通常是 Diagnose 或具体模板页" },
  "product-notes": { when: "你在判断成熟度和边界", next: "下一跳通常是回首页或继续执行" },
} as const;

export default function DocsPage() {
  return (
    <div className="fd-page-chrome mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="mb-8">
        <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline">FlowDock</Badge>
          <Badge variant="secondary">Docs</Badge>
          <Badge variant="outline">先选入口，再读文档</Badge>
        </div>
        <p className="text-sm font-medium text-indigo-700">FlowDock / Docs</p>
        <h1 className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-950 sm:text-[2.35rem]">文档总览</h1>
        <p className="mt-3.5 max-w-3xl text-sm leading-[1.72] text-slate-600 sm:text-[15px]">
          这页只做一件事：帮你更快决定先读哪篇。Docs 负责补顺序、验证和边界，不负责替代 Diagnose、Templates 或 Use Cases。
        </p>
      </section>

      <section className="mb-8 grid gap-3 md:grid-cols-3">
        {quickRoutes.map((item, index) => {
          const primary = item.tone === "primary";
          return (
            <Card
              key={item.title}
              className={
                primary
                  ? "rounded-[28px] border border-slate-200 bg-indigo-950 py-0 text-white shadow-sm fd-dark-card"
                  : "rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm fd-glass-card"
              }
            >
              <CardHeader>
                <p className={primary ? "text-xs font-medium uppercase tracking-[0.18em] text-violet-200" : "text-xs font-medium uppercase tracking-[0.18em] text-slate-400"}>Route 0{index + 1}</p>
                <CardTitle className={primary ? "text-lg text-white" : "text-lg text-slate-950"}>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 pb-5">
                <p className={primary ? "text-sm leading-6 text-slate-200" : "text-sm leading-6 text-slate-600"}>{item.detail}</p>
                <Link
                  href={item.href}
                  className={
                    primary
                      ? "inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                      : "inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700"
                  }
                >
                  <span>{item.label}</span>
                  {!primary ? <span aria-hidden>→</span> : null}
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Docs map</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">现在该读哪篇，读完后去哪</h2>
          </div>
        </div>
        <div className="grid gap-3.5 lg:grid-cols-2 xl:grid-cols-3">
          {docsCatalog.map((doc) => {
            const meta = docRoles[doc.slug as keyof typeof docRoles];
            return (
              <Card key={doc.slug} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm fd-glass-card">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-950">{doc.title}</CardTitle>
                  <CardDescription className="text-sm leading-6 text-slate-600">{doc.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3.5 pb-5">
                  <div className="rounded-2xl border border-slate-200 bg-indigo-50/70 px-3.5 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">什么时候先读</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{meta.when}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-3.5 py-3">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">读完之后</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{meta.next}</p>
                  </div>
                  <Link href={`/docs/${doc.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700">
                    <span>打开这页文档</span>
                    <span aria-hidden>→</span>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
