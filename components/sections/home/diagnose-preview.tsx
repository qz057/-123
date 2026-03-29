import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const scoreSignals = ["关键词命中", "场景加权", "字段完整度"] as const;

export function DiagnosePreviewSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-medium text-sky-700">Diagnose Preview</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">先别看介绍，先试配置诊断</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
          这一页的目标不是“像 AI 一样说很多”，而是把问题稳定送到正确执行路径上。
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-950">你只需要提供这些信息</CardTitle>
            <CardDescription>先说清场景，再补 provider / model / 报错信息，诊断结果会更稳。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <ul className="space-y-3 text-sm leading-6 text-slate-600">
              <li>• 你正在处理什么问题</li>
              <li>• provider / model</li>
              <li>• auth / transport</li>
              <li>• 配置片段 / 报错信息</li>
              <li>• 当前现象与期望结果</li>
            </ul>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm font-medium text-slate-900">首版判断依据</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                {scoreSignals.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <CardTitle className="text-lg text-white">你会得到这样的结果</CardTitle>
              <Badge variant="outline" className="border-white/20 text-slate-100">规则型 V1</Badge>
              <Badge variant="outline" className="border-white/20 text-slate-100">可解释结果</Badge>
            </div>
            <CardDescription className="text-slate-300">先给结论，再给原因、评分和资源优先级。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-6 text-sm leading-6 text-slate-200">
            <p>当前问题更像是会话没有真正切到目标模型，而不是 provider 本身不可用。</p>
            <div className="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-slate-300">
              <p>• 高概率原因：UI 显示已切换，但当前 session 仍绑定旧模型</p>
              <p>• 归类得分：Session 异常分支最高</p>
              <p>• 下一跳：先点模板，再补文档，不用全看</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/diagnose" className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
          开始诊断
        </Link>
        <Link href="/docs/diagnose" className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          先看 Diagnose 文档
        </Link>
      </div>
    </section>
  );
}
