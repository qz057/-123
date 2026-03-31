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

const decisionPoints = [
  {
    title: "我现在更像在定位，还是在执行",
    detail: "FlowDock 先帮你分辨该先 Diagnose，还是已经可以直接进 Templates / Use Cases。",
  },
  {
    title: "它当前到底能承接到哪一步",
    detail: "不是泛 AI 概念站，而是把配置、入口、模板和验证真正串成一条主路径。",
  },
  {
    title: "什么时候该继续做，什么时候先收口",
    detail: "当路径明确就继续推进；当边界不清就先回 Docs / Product Notes 校正预期。",
  },
] as const;

const taskFirstRoutes = [
  {
    title: "我现在更像在定位问题",
    detail: "先走 Diagnose，把问题压回正确层，不先停在概念理解。",
    href: "/diagnose",
    label: "进入 Diagnose",
  },
  {
    title: "我已经知道目标，要直接做",
    detail: "直接去 Templates 或 Use Cases，把理解切成执行路径。",
    href: "/templates",
    label: "先看模板中心",
  },
  {
    title: "我怕把产品阶段理解过满",
    detail: "先回 Docs / Product Notes，把首版边界和预期校正清楚。",
    href: "/docs",
    label: "先看文档路径",
  },
] as const;

const pageLens = [
  { label: "这页不是", value: "泛 AI 宣传页" },
  { label: "默认判断", value: "先分清定位 / 执行 / 边界" },
  { label: "读完要做", value: "马上决定从哪一页继续" },
] as const;

const rhythmStrip = [
  { label: "先想清哪层", value: "定位 / 执行 / 边界" },
  { label: "再选入口", value: "Diagnose / Templates / Docs" },
  { label: "最后收口", value: "别把首版误判成终版" },
] as const;

const quickReadStrip = [
  "先看顶部 lens，确认这页不是宣传页。",
  "再看 task-first / decision points，决定从哪一页继续。",
  "最后才回边界 / 适合对象 / 产品形态补细节。",
] as const;

const leavePageStrip = [
  { label: "现在更像在定位", href: "/diagnose", value: "先去 Diagnose" },
  { label: "现在就是要执行", href: "/templates", value: "先去 Templates" },
  { label: "现在要校正预期", href: "/docs", value: "先看 Docs" },
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
      <header className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">About</Badge>
            <Badge variant="outline">AI 自动化工作台</Badge>
          </div>
          <p className="text-sm font-medium text-sky-700">FlowDock / About</p>
          <h1 className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-950 sm:text-[2.35rem]">关于 FlowDock</h1>
          <p className="mt-3.5 max-w-3xl text-sm leading-[1.72] text-slate-600 sm:text-[15px]">
            FlowDock 的目标不是再做一个泛 AI 展示站，而是把复杂的 AI 配置、连接、会话和自动化流程整理成真正能推进事情的工具入口。它更像一个帮你少绕弯、少走错页、把当前任务继续做下去的工作台，而不是一个只讲概念的网站。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <Link
              href="/diagnose"
              className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              从 Diagnose 开始
            </Link>
            <Link href="/templates" className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800">
              <span>先看模板中心</span>
              <span aria-hidden>→</span>
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800">
              <span>看文档路径</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">At a glance</p>
            <CardTitle className="text-2xl text-white">一句话理解它</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5 pb-5 text-sm leading-6 text-slate-300">
            <p>FlowDock = 官网入口 + 配置诊断器 + 工作流模板 + 文档路径 + 场景入口。</p>
            <p>重点不是“知道很多”，而是“把现在这件事继续做下去”。</p>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
              <StatCard label="默认第一步" value="Diagnose" />
              <StatCard label="默认闭环" value="先定位 → 再执行 → 再验证" />
              <StatCard label="当前阶段" value="可用首版已跑通，正在继续产品化收口" />
            </div>
          </CardContent>
        </Card>
      </header>

      <section className="mb-8 grid gap-3 sm:grid-cols-3">
        {pageLens.map((item, index) => (
          <div key={item.label} className={index === 1 ? "rounded-[24px] border border-slate-200 bg-slate-950 px-4 py-3.5 text-white shadow-sm" : "rounded-[24px] border border-slate-200 bg-slate-50/70 px-4 py-3.5 shadow-sm"}>
            <p className={index === 1 ? "text-xs font-medium uppercase tracking-[0.18em] text-sky-200" : "text-xs font-medium uppercase tracking-[0.18em] text-slate-400"}>{item.label}</p>
            <p className={index === 1 ? "mt-2 text-sm font-medium leading-6 text-white" : "mt-2 text-sm font-medium leading-6 text-slate-900"}>{item.value}</p>
          </div>
        ))}
      </section>

      <section className="mb-8 rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Page rhythm</p>
          <CardTitle className="text-lg text-slate-950">About 这页最稳的阅读节奏</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pb-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {rhythmStrip.map((item, index) => (
              <div key={item.label} className={index === 1 ? "rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-white" : "rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3"}>
                <p className={index === 1 ? "text-xs font-medium uppercase tracking-[0.18em] text-sky-200" : "text-xs font-medium uppercase tracking-[0.18em] text-slate-400"}>{item.label}</p>
                <p className={index === 1 ? "mt-2 text-sm font-medium leading-6 text-white" : "mt-2 text-sm font-medium leading-6 text-slate-900"}>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">30 秒读法</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              {quickReadStrip.map((item) => (
                <p key={item} className="text-sm leading-6 text-slate-600">{item}</p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">离开这页默认动作</p>
            <div className="mt-2 grid gap-3 sm:grid-cols-3">
              {leavePageStrip.map((item, index) => (
                <Link key={item.label} href={item.href} className={index === 1 ? "rounded-2xl border border-slate-200 bg-slate-950 px-4 py-3 text-white shadow-sm" : "rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 shadow-sm"}>
                  <p className={index === 1 ? "text-xs font-medium uppercase tracking-[0.18em] text-sky-200" : "text-xs font-medium uppercase tracking-[0.18em] text-slate-400"}>{item.label}</p>
                  <p className={index === 1 ? "mt-2 text-sm font-medium leading-6 text-white" : "mt-2 text-sm font-medium leading-6 text-slate-900"}>{item.value}</p>
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </section>

      <section className="mb-8">
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">What this page helps you decide</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">About 这页真正帮你判断的三件事</h2>
        </div>
        <div className="grid gap-3.5 lg:grid-cols-3">
          {decisionPoints.map((item, index) => (
            <Card key={item.title} className={index === 2 ? "hidden rounded-[28px] border border-slate-200 bg-slate-50/70 py-0 shadow-sm lg:block" : "rounded-[28px] border border-slate-200 bg-slate-50/70 py-0 shadow-sm"}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-slate-950">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-5">
                <p className="text-sm leading-[1.65] text-slate-600">{item.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8 rounded-[32px] border border-slate-200 bg-slate-50/70 p-3.5 shadow-sm sm:p-4">
        <div className="mb-3.5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Task-first routes</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-950 sm:text-[1.35rem]">如果你读完 About 不想停在理解层，最自然的三种继续方式</h2>
          </div>
          <p className="hidden max-w-md text-sm leading-6 text-slate-500 lg:block">
            这层和 Docs 页保持同一套产品语言：读完就继续走，不让 About 停在概念层。
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {taskFirstRoutes.map((item, index) => (
            <div key={item.title} className={index === 0 ? "rounded-[24px] border border-slate-200 bg-slate-950 p-3.5 text-white shadow-sm" : index === 2 ? "hidden rounded-[24px] border border-slate-200 bg-white p-3.5 shadow-sm md:block" : "rounded-[24px] border border-slate-200 bg-white p-3.5 shadow-sm"}>
              <p className={index === 0 ? "text-sm font-medium text-white" : "text-sm font-medium text-slate-950"}>{item.title}</p>
              <p className={index === 0 ? "mt-2 text-sm leading-6 text-slate-300" : "mt-2 hidden text-sm leading-6 text-slate-600 sm:block"}>{item.detail}</p>
              <Link
                href={item.href}
                className={
                  index === 0
                    ? "mt-3 inline-flex rounded-full border border-white/15 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-white/10"
                    : "mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800"
                }
              >
                <span>{item.label}</span>
                {index !== 0 ? <span aria-hidden>→</span> : null}
              </Link>
            </div>
          ))}
        </div>
      </section>

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
                  <div key={item} className={index === 3 ? "hidden rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 md:block" : "rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4"}>
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
                    <p className="mt-2 hidden text-sm leading-6 text-slate-600 sm:block">{item.detail}</p>
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
            <CardContent className="grid gap-2.5 pb-5 md:grid-cols-3">
              {recommendedEntrances.map((item, index) => (
                <div key={item.title} className={index === 2 ? "hidden rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 md:block" : "rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5"}>
                  <p className="text-sm font-medium text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-[1.65] text-slate-600">{item.detail}</p>
                  <Link href={item.action.href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800">
                    <span>{item.action.label}</span>
                    <span aria-hidden>→</span>
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

        <aside className="space-y-3.5 lg:sticky lg:top-24">
          <Card className="rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Start here</p>
              <CardTitle className="text-2xl text-white">从这里开始更合适</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 pb-5">
              <Link href="/diagnose" className="rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-slate-950 transition hover:bg-slate-100">
                进入配置诊断器
              </Link>
              <Link href="/templates" className="inline-flex items-center gap-1 text-sm font-medium text-sky-200 transition hover:text-white">
                <span>查看模板中心</span>
                <span aria-hidden>→</span>
              </Link>
              <Link href="/docs" className="inline-flex items-center gap-1 text-sm font-medium text-sky-200 transition hover:text-white">
                <span>查看文档路径</span>
                <span aria-hidden>→</span>
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Task-first hints</p>
              <CardTitle className="text-lg text-slate-950">如果你更喜欢按任务进入</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 pb-5 text-sm leading-6 text-slate-600">
              <p className="rounded-2xl bg-slate-50/80 px-3.5 py-2.5">搭本地助手：先看 Use Cases / 本地 AI 助手搭建</p>
              <p className="rounded-2xl bg-slate-50/80 px-3.5 py-2.5">排查切换问题：先去 Diagnose 或模型切换场景页</p>
              <p className="rounded-2xl bg-slate-50/80 px-3.5 py-2.5">做自动化流程：先看 AI 工作流起步模板</p>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium leading-6 text-white">{value}</p>
    </div>
  );
}
