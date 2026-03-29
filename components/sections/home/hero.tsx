import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const workflowSteps = [
  "先用 Diagnose 判断问题层级",
  "再用 Templates 拿可复用方案",
  "最后回 Docs 做验证与收口",
] as const;

const deviceModes = [
  { label: "电脑端", value: "双栏工作台" },
  { label: "平板端", value: "上下分区" },
  { label: "手机端", value: "步骤式任务流" },
] as const;

const capabilitySignals = ["配置诊断", "工作流模板", "场景入口", "文档收口"] as const;

export function HeroSection() {
  return (
    <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top,rgba(186,230,253,0.45),transparent_38%),linear-gradient(to_bottom,#f8fafc,white)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="hidden items-center gap-10 lg:grid lg:grid-cols-[1fr_1.05fr]">
          <HeroCopy />
          <HeroPreview />
        </div>

        <div className="hidden gap-8 md:flex md:flex-col lg:hidden">
          <HeroCopy compact />
          <HeroPreview />
        </div>

        <div className="flex flex-col gap-6 md:hidden">
          <HeroCopy mobile />
        </div>
      </div>
    </section>
  );
}

function HeroCopy({ compact = false, mobile = false }: { compact?: boolean; mobile?: boolean }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge variant="outline">FlowDock</Badge>
        <Badge variant="secondary">AI 自动化工作台</Badge>
        {!mobile ? <Badge variant="outline">官网 + 真工具 + 模板层</Badge> : null}
      </div>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs text-slate-500 shadow-sm backdrop-blur">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-[10px] font-semibold text-white">FD</span>
          <span>先定位，再执行，再验证</span>
        </div>

        <h1 className={mobile ? "max-w-3xl text-4xl font-semibold tracking-tight text-slate-950" : "max-w-4xl text-5xl font-semibold tracking-tight text-slate-950"}>
          把 AI 自动化
          <span className="block bg-[linear-gradient(90deg,#0f172a,#334155)] bg-clip-text text-transparent">真正接进工作</span>
        </h1>

        <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
          从配置诊断、连接排障到工作流模板，帮你把 AI 助手、模型和自动化流程真正跑起来。
        </p>
      </div>

      {!mobile && (
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {capabilitySignals.map((item) => (
            <span key={item} className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur">
              {item}
            </span>
          ))}
        </div>
      )}

      {!mobile && (
        <p className="max-w-xl text-sm leading-6 text-slate-500">
          不是泛聊 AI，不卖空话。这里提供的是可执行的诊断结果、可复用的模板和可落地的方案。
        </p>
      )}

      <div className={compact ? "flex flex-wrap gap-3" : "flex flex-col gap-3 sm:flex-row"}>
        <Link href="/diagnose" className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800">
          立即体检配置
        </Link>
        <Link href="/templates" className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
          查看工作流模板
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <MiniStat title="主入口" value="Diagnose" />
        <MiniStat title="模板池" value="8 个首批模板" />
        <MiniStat title="当前形态" value="官网 + 工具" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
          <p className="text-sm font-medium text-slate-900">FlowDock 的默认使用顺序</p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            {workflowSteps.map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {!mobile && (
          <div className="rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur">
            <p className="text-sm font-medium text-slate-900">三端不是缩放版，而是分别设计</p>
            <div className="mt-4 space-y-3">
              {deviceModes.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                  <span className="text-sm font-medium text-slate-900">{item.label}</span>
                  <span className="text-xs text-slate-500">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function HeroPreview() {
  return (
    <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 py-0 text-slate-100 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.45)]">
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),transparent_70%)]" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-base text-white">先试一个真工具</CardTitle>
            <CardDescription className="text-sm text-slate-400">输入配置、报错或场景，快速得到可执行结论</CardDescription>
          </div>
          <Badge variant="outline" className="border-slate-700 text-slate-200">
            Diagnose
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-6">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="mb-3 text-sm font-medium text-white">输入</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• provider / model</li>
              <li>• auth / transport</li>
              <li>• 配置片段</li>
              <li>• 报错信息</li>
              <li>• 当前现象与期望结果</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="mb-3 text-sm font-medium text-white">输出</p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• 诊断结论</li>
              <li>• 风险等级</li>
              <li>• 高概率原因</li>
              <li>• 修复步骤</li>
              <li>• 相关模板 / 文档</li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="rounded-full border border-slate-700 px-2.5 py-1">规则型 V1</span>
              <span className="rounded-full border border-slate-700 px-2.5 py-1">可解释结果</span>
              <span className="rounded-full border border-slate-700 px-2.5 py-1">资源优先级</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              当前页面重点不是“像 AI 一样说很多”，而是稳定把问题送到正确执行路径上。
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
            <p className="text-sm font-medium text-white">默认路径</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {workflowSteps.map((item, index) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-medium text-slate-950">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniStat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
