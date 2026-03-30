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
    detail: "Diagnose、Templates、Use Cases 和 Docs 不是平铺页面，而是一条可执行的工作路径。",
  },
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
  { label: "官网首页", value: "建立理解，告诉你入口关系" },
  { label: "Diagnose", value: "先归类，把问题送到正确层" },
  { label: "Templates", value: "承接执行，给出可复用方案" },
  { label: "Docs / Use Cases", value: "补规则、边界、验证和场景入口" },
] as const;

const recommendedEntrances = [
  {
    title: "问题还说不清",
    detail: "先 Diagnose，别急着翻模板。先把问题送到正确层，后面才不会一直走偏。",
  },
  {
    title: "目标已经明确",
    detail: "直接进 Templates 或 Use Cases，用现成路径推进，不要从空白页重想一遍。",
  },
  {
    title: "想先确认边界",
    detail: "先读 Docs / Product Notes，避免把当前首版误当成已经覆盖所有场景的成熟产品。",
  },
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-9 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.84fr] lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">About</Badge>
            <Badge variant="outline">AI 自动化工作台</Badge>
          </div>
          <p className="text-sm font-medium text-sky-700">FlowDock / About</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">关于 FlowDock</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            FlowDock 的目标不是再做一个泛 AI 展示站，而是把复杂的 AI 配置、连接、会话和自动化流程整理成真正能用的工具入口。它更像一个帮你少绕弯、少走错页的工作台，而不是一个只讲概念的网站。
          </p>
        </div>

        <Card className="rounded-3xl border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-white">一句话理解它</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-6 text-sm leading-6 text-slate-300">
            <p>FlowDock = 官网 + 配置诊断器 + 工作流模板 + 文档路径 + 场景入口。</p>
            <p>重点不是“知道很多”，而是“把现在这件事继续做下去”。</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <StatCard label="默认第一步" value="Diagnose" />
              <StatCard label="默认闭环" value="先定位 → 再执行 → 再验证" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div className="space-y-6">
          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">这站到底在做什么</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-6 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                FlowDock 想解决的不是“如何写一个更聪明的提示词”，而是更实际的几个问题：配置写了为什么不生效、模型切了为什么没切过去、工具很多为什么始终串不起来、自动化流程为什么看起来快搭好了却总差最后一段。
              </p>
              <p>
                所以首版一开始就把主入口定在 Diagnose，而不是首页内容本身。先把问题归到正确层，再用模板、文档和场景页承接，这样用户才不会在错误方向上反复试错。
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">FlowDock 的工作方式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="grid gap-3">
                {principles.map((item) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-medium text-slate-950">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm leading-6 text-slate-600">
                简单说：如果问题模糊，先 Diagnose；如果方向明确，直接 Templates；如果需要理解边界和规则，再回 Docs。
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
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

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">现在最推荐的进入方式</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6 md:grid-cols-3">
              {recommendedEntrances.map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-sm font-medium text-slate-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
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

        <aside className="space-y-4 lg:sticky lg:top-24">
          <Card className="rounded-3xl border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white">从这里开始更合适</CardTitle>
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

          <Card className="hidden rounded-3xl border border-slate-200 bg-white py-0 shadow-sm md:block">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">更适合这几类人</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6 text-sm leading-6 text-slate-600">
              {goodFitUsers.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">如果你更喜欢按任务进入</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-6 text-sm leading-6 text-slate-600 sm:space-y-3">
              <p>• 搭本地助手：先看 Use Cases / 本地 AI 助手搭建</p>
              <p>• 排查切换问题：先去 Diagnose 或模型切换场景页</p>
              <p>• 做自动化流程：先看 AI 工作流起步模板</p>
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
