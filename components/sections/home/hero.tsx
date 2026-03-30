import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const workflowSteps = [
  "先用 Diagnose 判断问题层级",
  "再用 Templates 拿可复用方案",
  "最后回 Docs 做验证与收口",
] as const;

const deviceModes = [
  { label: "电脑端", value: "双栏工作台", note: "适合边看诊断边执行" },
  { label: "平板端", value: "上下分区", note: "适合会议、演示与临时排障" },
  { label: "手机端", value: "步骤式任务流", note: "适合现场定位和快速决策" },
] as const;

const capabilitySignals = ["配置诊断", "工作流模板", "场景入口", "文档收口"] as const;

const proofPoints = [
  { label: "默认入口", value: "Diagnose" },
  { label: "模板状态", value: "8 个首批模板" },
  { label: "页面结构", value: "官网 + 真工具" },
] as const;

const entryRoutes = [
  {
    title: "问题还模糊",
    detail: "先归类层级，不直接进模板。",
    href: "/diagnose",
    label: "先开 Diagnose",
  },
  {
    title: "方向已经明确",
    detail: "直接进入模板与执行页。",
    href: "/templates",
    label: "去模板中心",
  },
  {
    title: "需要规则与边界",
    detail: "回 Docs 看验证口径与失败分支。",
    href: "/docs",
    label: "看文档路径",
  },
] as const;

const outputSignals = [
  { title: "先给结论", value: "定位最可能问题层" },
  { title: "再给动作", value: "直接指向修复路径" },
  { title: "最后收口", value: "回到模板与文档验证" },
] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#eef6ff_38%,#f8fafc_62%,#ffffff_100%)]">
      <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.22),transparent_58%)]" />
      <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="hidden items-center gap-10 lg:grid lg:grid-cols-[1fr_1.08fr]">
          <HeroCopy />
          <HeroPreview />
        </div>

        <div className="hidden gap-8 md:flex md:flex-col lg:hidden">
          <HeroCopy compact />
          <HeroPreview />
        </div>

        <div className="flex flex-col gap-5 md:hidden">
          <HeroCopy mobile />
        </div>
      </div>
    </section>
  );
}

function HeroCopy({ compact = false, mobile = false }: { compact?: boolean; mobile?: boolean }) {
  return (
    <div className={mobile ? "space-y-5" : "space-y-6 sm:space-y-7"}>
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge variant="outline" className="border-sky-200 bg-white/80 text-sky-700 backdrop-blur">
          FlowDock
        </Badge>
        <Badge variant="secondary" className="bg-slate-950 text-white">
          AI 自动化工作台
        </Badge>
        {!mobile ? (
          <Badge variant="outline" className="border-slate-200 bg-white/80 text-slate-600 backdrop-blur">
            Diagnose → Templates → Docs
          </Badge>
        ) : null}
      </div>

      <div className="space-y-4 sm:space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-xs text-slate-600 shadow-sm backdrop-blur">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-950 text-[10px] font-semibold text-white">FD</span>
          <span>把 AI 从“能聊”推进到“能交付”</span>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <h1
            className={
              mobile
                ? "max-w-3xl text-[2.55rem] font-semibold tracking-tight leading-[1.02] text-slate-950"
                : "max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 lg:text-[3.7rem] lg:leading-[1.05]"
            }
          >
            把 AI 自动化
            <span className="block bg-[linear-gradient(90deg,#0f172a_0%,#0369a1_55%,#38bdf8_100%)] bg-clip-text text-transparent">
              变成真正可执行的工作系统
            </span>
          </h1>

          <p className={mobile ? "max-w-2xl text-[15px] leading-6 text-slate-600" : "max-w-2xl text-base leading-7 text-slate-600 sm:text-lg"}>
            从配置诊断、连接排障到工作流模板，FlowDock 不是继续陪你泛聊，而是帮你把问题送进正确入口，把执行送进可复用路径。
          </p>
        </div>
      </div>

      {!mobile && (
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {capabilitySignals.map((item) => (
            <span key={item} className="rounded-full border border-white/80 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur">
              {item}
            </span>
          ))}
        </div>
      )}

      {!mobile && (
        <div className="grid gap-3 sm:grid-cols-3">
          {proofPoints.map((item) => (
            <MiniStat key={item.label} title={item.label} value={item.value} />
          ))}
        </div>
      )}

      <div className={compact || mobile ? "flex flex-wrap gap-2.5" : "flex flex-col gap-3 sm:flex-row"}>
        <Link
          href="/diagnose"
          className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 sm:px-5 sm:py-3"
        >
          立即体检配置
        </Link>
        <Link
          href="/templates"
          className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/70 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:px-5 sm:py-3"
        >
          查看工作流模板
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <div className={mobile ? "rounded-[1.5rem] border border-white/80 bg-white/80 p-4 shadow-[0_16px_48px_-28px_rgba(15,23,42,0.25)] backdrop-blur" : "rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_16px_48px_-28px_rgba(15,23,42,0.25)] backdrop-blur"}>
          <div className="flex items-center justify-between gap-3">
            <p className={mobile ? "text-[13px] font-medium text-slate-900" : "text-sm font-medium text-slate-900"}>FlowDock 的默认使用顺序</p>
            <span className={mobile ? "rounded-full bg-sky-50 px-2.5 py-1 text-[10px] font-medium text-sky-700" : "rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700"}>推荐从这里起步</span>
          </div>
          <ul className={mobile ? "mt-3 space-y-2.5 text-[13px] leading-5 text-slate-600" : "mt-4 space-y-3 text-sm leading-6 text-slate-600"}>
            {workflowSteps.map((item, index) => (
              <li key={item} className={mobile ? "flex items-start gap-2.5 rounded-xl border border-slate-100 bg-slate-50/80 px-3 py-2.5" : "flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"}>
                <span className={mobile ? "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-950 text-[11px] font-medium text-white" : "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-medium text-white"}>
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {!mobile && (
          <div className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-[0_18px_50px_-30px_rgba(15,23,42,0.55)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">三端不是缩放版，而是分别设计</p>
              <span className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-slate-300">多设备入口</span>
            </div>
            <div className="mt-4 space-y-3">
              {deviceModes.map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white">{item.label}</span>
                    <span className="text-xs text-sky-300">{item.value}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={mobile ? "space-y-2.5" : "grid gap-3 md:grid-cols-3"}>
        {entryRoutes.map((item, index) => {
          if (mobile && index === 2) {
            return (
              <div key={item.title} className="rounded-[1.25rem] border border-sky-100 bg-sky-50/70 p-3.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-slate-900">{item.title}</p>
                  <span className="text-[11px] font-medium text-sky-700">最后收口</span>
                </div>
                <p className="mt-2 text-[13px] leading-5 text-slate-600">{item.detail}</p>
                <Link
                  href={item.href}
                  className="mt-3 inline-flex rounded-full border border-sky-200 px-3.5 py-1.5 text-sm font-medium text-sky-700 transition hover:bg-white/70"
                >
                  {item.label}
                </Link>
              </div>
            );
          }

          const primaryCard = index === 0;
          return (
            <div
              key={item.title}
              className={
                mobile
                  ? primaryCard
                    ? "rounded-[1.25rem] border border-slate-200 bg-slate-950 p-3.5 text-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.45)]"
                    : "rounded-[1.25rem] border border-slate-200 bg-white/90 p-3.5 shadow-sm backdrop-blur"
                  : primaryCard
                    ? "rounded-[1.5rem] border border-slate-200 bg-slate-950 p-4 text-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.45)]"
                    : "rounded-[1.5rem] border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur"
              }
            >
              <p className={primaryCard ? "text-sm font-medium text-white" : "text-sm font-medium text-slate-950"}>{item.title}</p>
              <p className={mobile ? primaryCard ? "mt-2 text-[13px] leading-5 text-slate-300" : "mt-2 text-[13px] leading-5 text-slate-600" : primaryCard ? "mt-2 text-sm leading-6 text-slate-300" : "mt-2 text-sm leading-6 text-slate-600"}>{item.detail}</p>
              <Link
                href={item.href}
                className={
                  primaryCard
                    ? mobile
                      ? "mt-3 inline-flex rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
                      : "mt-4 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                    : mobile
                      ? "mt-3 inline-flex rounded-full border border-slate-300 px-3.5 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      : "mt-4 inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                }
              >
                {item.label}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HeroPreview() {
  return (
    <Card className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 py-0 text-slate-100 shadow-[0_32px_110px_-48px_rgba(15,23,42,0.65)]">
      <CardHeader className="relative overflow-hidden border-b border-white/10 pb-5">
        <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.24),transparent_70%)]" />
        <div className="relative flex items-start justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-sky-300/90">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Live workflow preview
            </div>
            <div>
              <CardTitle className="text-lg text-white">先试一个真工具，再进入可复用执行路径</CardTitle>
              <CardDescription className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                这里不是纯展示页，而是把 Diagnose、Templates 和 Docs 串成一条真正能落地的工作路径。
              </CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-slate-700 bg-white/5 text-slate-200">
            Diagnose
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-6 pt-6">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">输入工作台</p>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-slate-400">问题输入</span>
            </div>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-300">
              <li>• provider / model</li>
              <li>• auth / transport</li>
              <li>• 配置片段与环境信息</li>
              <li>• 报错信息与当前现象</li>
              <li>• 你期望的目标结果</li>
            </ul>
          </div>

          <div className="rounded-[1.5rem] border border-sky-400/20 bg-sky-400/10 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-white">输出工作台</p>
              <span className="rounded-full border border-sky-300/20 px-2.5 py-1 text-[11px] text-sky-200">结果解释</span>
            </div>
            <div className="mt-4 space-y-3">
              {outputSignals.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white">{item.title}</span>
                    <span className="text-[11px] text-sky-300">0{index + 1}</span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-400">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="rounded-full border border-slate-700 px-2.5 py-1">规则型 V2</span>
              <span className="rounded-full border border-slate-700 px-2.5 py-1">可解释结果</span>
              <span className="rounded-full border border-slate-700 px-2.5 py-1">资源优先级</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              当前阶段重点不是“像 AI 一样说很多”，而是稳定把问题送到正确入口，并把执行步骤压成清晰的下一步。
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium text-white">默认路径</p>
            <div className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
              {workflowSteps.map((item, index) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3">
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
    <div className="rounded-2xl border border-white/80 bg-white/80 px-4 py-3 shadow-sm backdrop-blur">
      <p className="text-xs font-medium text-slate-500">{title}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
    </div>
  );
}
