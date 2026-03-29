import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const principles = [
  "先定位，再执行，再验证",
  "优先解决真实卡点，不做空泛 AI 展示",
  "把诊断、模板和文档组织成连续可用路径",
] as const;

const currentBoundaries = [
  "Diagnose 当前仍是规则型 V1，重点是稳定归类，不是万能自由诊断。",
  "Templates 已具备首批 8 个详情页，但后续还会继续补更多角色化案例。",
  "Docs 与 Use Cases 已能承接主路径，但更深的内容层仍在继续完善。",
] as const;

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.84fr] lg:items-start">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">About</Badge>
            <Badge variant="outline">AI 自动化工作台</Badge>
          </div>
          <p className="text-sm font-medium text-sky-700">FlowDock / About</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">关于 FlowDock</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
            FlowDock 的目标不是再做一个泛 AI 展示站，而是把复杂的 AI 配置、连接、会话和自动化流程整理成真正能用的工具入口。它更像一个帮你少绕弯的工作台，而不是一个只讲概念的网站。
          </p>
        </div>

        <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-950">一句话理解它</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-6 text-sm leading-6 text-slate-600">
            <p>FlowDock = 官网 + 配置诊断器 + 工作流模板 + 文档路径 + 场景入口。</p>
            <p>重点不是“知道很多”，而是“把现在这件事继续做下去”。</p>
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
                FlowDock 想解决的不是“如何写一个更聪明的提示词”，而是更实际的三个问题：配置写了为什么不生效、模型切了为什么没切过去、工具很多为什么始终串不起来。
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
              <ul className="space-y-3 text-sm leading-6 text-slate-600">
                {principles.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-200 p-4">• {item}</li>
                ))}
              </ul>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-sm leading-6 text-slate-600">
                简单说：如果问题模糊，先 Diagnose；如果方向明确，直接 Templates；如果需要理解边界和规则，再回 Docs。
              </div>
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

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">如果你更喜欢按任务进入</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-6 text-sm leading-6 text-slate-600">
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
