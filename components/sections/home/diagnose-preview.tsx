import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const scoreSignals = ["关键词命中", "场景加权", "字段完整度"] as const;
const resultSignals = [
  "先给结论，再给原因",
  "直接指出高概率问题层",
  "把相关模板和文档排出优先级",
] as const;

export function DiagnosePreviewSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="mb-8 grid gap-6 md:mb-10 md:grid-cols-[0.92fr_1.08fr] md:items-end">
          <div className="max-w-3xl space-y-4">
            <Badge variant="outline" className="border-sky-200 bg-sky-50 text-sky-700">
              Diagnose Preview
            </Badge>
            <div className="space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">先别看长介绍，先试配置诊断</h2>
              <p className="text-sm leading-6 text-slate-600 sm:text-base">
                Diagnose 的角色不是“像 AI 一样说很多”，而是把问题稳定送到正确执行路径上。首页里最应该先被点击的，就是它。
              </p>
            </div>
          </div>

          <div className="hidden rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_56px_-32px_rgba(15,23,42,0.45)] md:block">
            <p className="text-sm font-medium text-white">这页真正输出什么</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {resultSignals.map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-medium text-slate-950">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-[0.95fr_1.05fr]">
          <Card className="rounded-[1.5rem] border border-slate-200 bg-white py-0 shadow-sm sm:rounded-[1.75rem]">
            <CardHeader className="space-y-3 pb-3 sm:space-y-4 sm:pb-4">
              <CardTitle className="text-lg text-slate-950 sm:text-xl">你只需要提供这些信息</CardTitle>
              <CardDescription className="text-sm leading-6">先说清场景，再补 provider / model / 报错信息，诊断结果会更稳。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pb-5 sm:space-y-4 sm:pb-6">
              <ul className="space-y-2.5 text-[13px] leading-5 text-slate-600 sm:space-y-3 sm:text-sm sm:leading-6">
                <li>• 你正在处理什么问题</li>
                <li>• provider / model</li>
                <li>• auth / transport</li>
                <li>• 配置片段 / 报错信息</li>
                <li>• 当前现象与期望结果</li>
              </ul>
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 sm:rounded-2xl sm:p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 sm:text-sm sm:normal-case sm:tracking-normal sm:text-slate-900">
                  首版判断依据
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500 sm:mt-3">
                  {scoreSignals.map((item) => (
                    <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.5rem] border border-slate-200 bg-slate-950 py-0 text-white shadow-[0_22px_64px_-34px_rgba(15,23,42,0.55)] sm:rounded-[1.75rem]">
            <CardHeader className="space-y-3 pb-3 sm:space-y-4 sm:pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-lg text-white sm:text-xl">你会得到这样的结果</CardTitle>
                <Badge variant="outline" className="border-white/20 bg-white/5 text-slate-100">
                  规则型 V2
                </Badge>
                <Badge variant="outline" className="hidden border-white/20 bg-white/5 text-slate-100 sm:inline-flex">
                  可解释结果
                </Badge>
              </div>
              <CardDescription className="text-slate-300">先给结论，再给原因、评分和资源优先级。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pb-5 text-sm leading-6 text-slate-200 sm:space-y-4 sm:pb-6">
              <div className="rounded-xl border border-sky-300/15 bg-sky-400/10 p-3.5 text-slate-100 sm:rounded-2xl sm:p-4">
                当前问题更像是会话没有真正切到目标模型，而不是 provider 本身不可用。
              </div>
              <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-3.5 text-slate-300 sm:rounded-2xl sm:p-4">
                <p>• 高概率原因：UI 显示已切换，但当前 session 仍绑定旧模型</p>
                <p>• 归类得分：Session 异常分支最高</p>
                <p>• 下一跳：先点模板，再补文档，不用全看</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
          <Link href="/diagnose" className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
            开始诊断
          </Link>
          <Link href="/docs/diagnose" className="hidden rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:inline-flex">
            先看 Diagnose 文档
          </Link>
        </div>
      </div>
    </section>
  );
}
