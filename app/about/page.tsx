import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const principles = [
  {
    title: "先定位，再执行，再验证",
    detail: "先把问题送进正确层级，再拿模板推进，最后用文档做边界和结果确认。",
  },
  {
    title: "优先解决真实卡点",
    detail: "不做空泛 AI 展示，不把首页做成概念堆叠，而是优先处理配置、会话、接入和工作流问题。",
  },
  {
    title: "把内容组织成连续路径",
    detail: "Diagnose、Templates、Use Cases 和 Docs 不是平铺页面，而是一条可以继续往前走的工作路径。",
  },
] as const;

const coreProblems = [
  "配置明明写了，但运行态就是没生效。",
  "模型明明切了，但当前 session 像还停在旧参数上。",
  "工具和入口很多，但始终串不成一条稳定可用链路。",
  "流程已经有雏形，却总是在最后一段验证和收口上掉链子。",
] as const;

const currentBoundaries = [
  "Diagnose 当前仍是规则型 V2，重点是稳定归类和可解释结果，不是万能自由诊断。",
  "Templates 已具备首批 8 个详情页，但后续仍会继续补更多角色化案例与更深执行版本。",
  "Docs 与 Use Cases 已能承接主路径，但更深的内容层、角色指引和异常分支还在持续补强。",
] as const;

const notThisSite = [
  "不是一个只展示‘AI 很强’的宣传页。",
  "不是把零散教程硬堆在一起的资料站。",
  "不是让你从首页自己猜第一步该去哪的工具集合。",
] as const;

const goodFitUsers = [
  "已经在用 AI，但总卡在配置不生效、会话没切对、工具串不起来的人。",
  "知道自己想搭什么，但不想每次都从空白页重新整理方案的人。",
  "需要一条更稳的‘先判断 → 再执行 → 再验证’路径，而不是更多泛建议的人。",
] as const;

const productShape = [
  { label: "官网首页", value: "建立整体理解，告诉你入口关系" },
  { label: "Diagnose", value: "先归类，把问题送到正确层" },
  { label: "Templates", value: "承接执行，给出可复用方案" },
  { label: "Docs / Use Cases", value: "补规则、边界、验证和场景入口" },
] as const;

const recommendedEntrances = [
  {
    title: "问题还说不清",
    detail: "先 Diagnose，别急着翻模板。先把问题送到正确层，后面才不会一直走偏。",
    action: { label: "先做问题归类", href: "/diagnose" },
  },
  {
    title: "目标已经明确",
    detail: "直接进 Templates 或 Use Cases，用现成路径推进，不要从空白页重想一遍。",
    action: { label: "直接看模板中心", href: "/templates" },
  },
  {
    title: "想先确认边界",
    detail: "先读 Docs / Product Notes，避免把当前首版误当成已经覆盖所有场景的成熟产品。",
    action: { label: "先看文档路径", href: "/docs" },
  },
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">About</Badge>
            <Badge variant="outline">AI 自动化工作台</Badge>
          </div>
          <p className="text-sm font-medium text-sky-700">FlowDock / About</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">关于 FlowDock</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            FlowDock 的目标不是再做一个泛 AI 展示站，而是把复杂的 AI 配置、连接、会话和自动化流程整理成真正能推进事情的工具入口。它更像一个帮你少绕弯、少走错页、把当前任务继续做下去的工作台，而不是一个只讲概念的网站。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/diagnose"
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              从 Diagnose 开始
            </Link>
            <Link
              href="/templates"
              className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              先看模板中心
            </Link>
            <Link
              href="/docs"
              className="inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              看文档路径
            </Link>
          </div>
        </div>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">At a glance</p>
            <CardTitle className="text-2xl text-white">一句话理解它</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-6 text-sm leading-6 text-slate-300">
            <p>FlowDock = 官网入口 + 配置诊断器 + 工作流模板 + 文档路径 + 场景入口。</p>
            <p>重点不是“知道很多”，而是“把现在这件事继续做下去”。</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <StatCard label="默认第一步" value="Diagnose" />
              <StatCard label="默认闭环" value="先定位 → 再执行 → 再验证" />
              <StatCard label="当前阶段" value="可用首版已跑通，正在继续产品化收口" />
            </div>
          </CardContent>
        </Card>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="space-y-6">
          <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Why it exists</p>
              <CardTitle className="text-xl text-slate-950">FlowDock 不是在解决抽象问题，而是在解决这些真实卡点</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                FlowDock 想解决的不是“如何写一个更聪明的提示词”，而是更实际的几个问题：配置写了为什么不生效、模型切了为什么没切过去、工具很多为什么始终串不起来、自动化流程为什么看起来快搭好了却总差最后一段。
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {coreProblems.map((item, index) => (
                  <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">0{index + 1}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">How it works</p>
              <CardTitle className="text-xl text-slate-950">FlowDock 的工作方式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="grid gap-3 lg:grid-cols-3">
                {principles.map((item, index) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Principle 0{index + 1}</p>
                    <p className="mt-2 text-sm font-medium text-slate-950">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm leading-6 text-slate-600">
                简单说：如果问题模糊，先 Diagnose；如果方向明确，直接 Templates；如果需要理解边界和规则，再回 Docs。
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Product shape</p>
              <CardTitle className="text-xl text-slate-950">它当前更像什么，不像什么</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="text-sm font-medium text-slate-950">当前更像</p>
                <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                  {productShape.map((item) => (
                    <p key={item.label}>
                      <span className="font-medium text-slate-900">{item.label}</span>：{item.value}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-950">当前不是</p>
                <div className="mt-3 space-y-3 text-sm leading-6 text-slate-600">
                  {notThisSite.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Entry routes</p>
              <CardTitle className="text-xl text-slate-950">现在最推荐的进入方式</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6 md:grid-cols-3">
              {recommendedEntrances.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-sm font-medium text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                  <Link href={item.action.href} className="mt-4 inline-flex text-sm font-medium text-sky-700 hover:text-sky-800">
                    {item.action.label}
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
            <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Best fit</p>
                <CardTitle className="text-xl text-slate-950">更适合这几类人</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-6 text-sm leading-6 text-slate-600">
                {goodFitUsers.map((item) => (
                  <p key={item} className="rounded-2xl bg-slate-50/80 px-4 py-3">
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Current boundaries</p>
                <CardTitle className="text-xl text-slate-950">当前阶段与边界</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-6 text-sm leading-6 text-slate-600">
                {currentBoundaries.map((item) => (
                  <p key={item} className="rounded-2xl border border-slate-200 p-4">
                    {item}
                  </p>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <Card className="rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Start here</p>
              <CardTitle className="text-2xl text-white">从这里开始更合适</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-6">
              <Link href="/diagnose" className="rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-slate-950 transition hover:bg-slate-100">
                进入配置诊断器
              </Link>
              <Link href="/templates" className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10">
                查看模板中心
              </Link>
              <Link href="/docs" className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10">
                查看文档路径
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Task-first hints</p>
              <CardTitle className="text-lg text-slate-950">如果你更喜欢按任务进入</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6 text-sm leading-6 text-slate-600">
              <p className="rounded-2xl bg-slate-50/80 px-4 py-3">搭本地助手：先看 Use Cases / 本地 AI 助手搭建</p>
              <p className="rounded-2xl bg-slate-50/80 px-4 py-3">排查切换问题：先去 Diagnose 或模型切换场景页</p>
              <p className="rounded-2xl bg-slate-50/80 px-4 py-3">做自动化流程：先看 AI 工作流起步模板</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium leading-6 text-white">{value}</p>
    </div>
  );
}
