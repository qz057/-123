import Link from "next/link";
import { templatesCatalog } from "@/data/templates/catalog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const inlineLinkClass =
  "inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800";

const primaryButtonClass =
  "inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800";

const categoryOrder = ["搭建类", "排障类", "自动化类", "产品化类"] as const;

const categoryStats = categoryOrder.map((category) => ({
  label: category,
  count: templatesCatalog.filter((item) => item.category === category).length,
}));

const difficultyStats = ["新手", "进阶", "技术向"] as const;

const templateStats = [
  { label: "当前模板数", value: `${templatesCatalog.length} 个` },
  { label: "默认第一步", value: "方向不清时先 Diagnose" },
  {
    label: "页面职责",
    value: "把问题归到正确模板，再进入详情执行",
  },
] as const;

const entryRoutes = [
  {
    title: "我还不知道该从哪一类模板开始",
    description: "先判断问题在搭建、排障还是自动化，再决定要不要直接进模板详情。",
    primary: { label: "先去 Diagnose", href: "/diagnose" },
    secondary: { label: "看 Templates 文档", href: "/docs/templates" },
  },
  {
    title: "我已经知道自己要解决什么问题",
    description: "直接进模板卡片，优先找和当前问题最像、失败信号最接近的一项。",
    primary: { label: "直接看模板列表", href: "#template-grid" },
    secondary: { label: "看使用场景页", href: "/use-cases" },
  },
  {
    title: "我怕选错模板浪费时间",
    description: "先看模板是否真的适配当前阶段，再看步骤数、输出物和失败信号是否匹配。",
    primary: { label: "先看筛选原则", href: "#template-rules" },
    secondary: { label: "回 Getting Started", href: "/docs/getting-started" },
  },
] as const;

const decisionPoints = [
  {
    title: "先判断你在哪一层",
    description: "搭建、排障、自动化、产品化先分开，不要按页面标题凭感觉选。",
  },
  {
    title: "再确认模板会产出什么",
    description: "先看 outputs、steps 和 failure signals，确认它真能把你带到下一步。",
  },
  {
    title: "列表页负责选路，详情页负责执行",
    description: "列表页是入口分流器；真正的步骤、验收和回退逻辑在详情页里。",
  },
] as const;

const selectionRules = [
  "先按“搭建 / 排障 / 自动化”判断问题阶段，不先按页面好不好看来选。",
  "优先看 failure signals 和 outputs，确认模板能不能真的带你到下一步。",
  "如果你连问题在哪一层都说不清，先去 Diagnose，不要硬套模板。",
] as const;

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
      <header className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">Templates</Badge>
            <Badge variant="outline">先选阶段，再进模板</Badge>
          </div>
          <p className="text-sm font-medium text-sky-700">FlowDock / Templates</p>
          <h1 className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-950 sm:text-[2.35rem]">工作流模板中心</h1>
          <p className="mt-3.5 max-w-3xl text-sm leading-[1.72] text-slate-600 sm:text-[15px]">
            这里不是把模板堆满的目录页，而是帮助你更快找到“当前最该套哪条执行路径”。从搭建、排障到自动化落地，重点不是看得多，而是选得准、走得稳。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <Link href="/diagnose" className={primaryButtonClass}>
              不知道选哪个？先体检配置
            </Link>
            <Link href="/docs/templates" className={`${inlineLinkClass} hidden sm:inline-flex`}>
              <span>先看 Templates 文档</span>
              <span aria-hidden>→</span>
            </Link>
            <Link href="/use-cases" className="hidden items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800 sm:inline-flex">
              <span>按使用场景找入口</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Template map</p>
            <CardTitle className="text-2xl text-white">先抓住模板页的作用</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2.5 pb-5 sm:grid-cols-3 lg:grid-cols-1">
            {templateStats.map((item) => (
              <DarkStatCard key={item.label} label={item.label} value={item.value} />
            ))}
          </CardContent>
        </Card>
      </header>

      <section className="mb-8 sm:hidden">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Mobile pick guide</p>
            <CardTitle className="text-xl text-slate-950">手机上先这样选模板</CardTitle>
            <CardDescription className="text-sm leading-6 text-slate-600">
              先把最值钱的判断压短：先判层，再看模板卡里的适配信号，不在上面几层说明里来回读。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pb-5 text-sm leading-[1.65] text-slate-600">
            <p className="rounded-2xl bg-white px-4 py-3">问题还糊：先 Diagnose，不要直接按模板标题猜。</p>
            <p className="rounded-2xl bg-white px-4 py-3">方向已清：直接进模板卡，优先看“适合你如果 / 先别用如果 / 输出”。</p>
            <p className="rounded-2xl bg-white px-4 py-3">怕选错：先看 failure signals 和 outputs，别先被卡片数量带着走。</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5 pt-1">
              <Link href="/diagnose" className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                先去 Diagnose
              </Link>
              <Link href="#template-grid" className={inlineLinkClass}>
                <span>直接看模板列表</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-8 hidden sm:block">
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Entry routes</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">现在最常见的三种进模板方式</h2>
        </div>
        <div className="grid gap-3.5 lg:grid-cols-3">
          {entryRoutes.map((item, index) => (
            <Card key={item.title} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Route 0{index + 1}</p>
                <CardTitle className="text-lg text-slate-950">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3.5 pb-5">
                <p className="text-sm leading-[1.65] text-slate-600">{item.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2.5">
                  <Link href={item.primary.href} className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                    {item.primary.label}
                  </Link>
                  <Link href={item.secondary.href} className={inlineLinkClass}>
                    <span>{item.secondary.label}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-7 hidden sm:block">
        <div className="mb-3.5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Decision points</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">这页真正帮你决定的，不只是“点哪个模板”</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {decisionPoints.map((item) => (
            <Card key={item.title} className="rounded-[24px] border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
              <CardHeader className="pb-2.5">
                <CardTitle className="text-base text-slate-950 sm:text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm leading-[1.6] text-slate-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="template-rules" className="mb-8 hidden gap-3.5 xl:grid-cols-[1.04fr_0.96fr] sm:grid">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Selection rules</p>
            <CardTitle className="text-xl text-slate-950">模板应该怎么选，才不会选成目录浏览</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pb-5 text-sm leading-[1.65] text-slate-600">
            {selectionRules.map((rule) => (
              <p key={rule} className="rounded-2xl bg-white px-4 py-3">
                {rule}
              </p>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Category map</p>
            <CardTitle className="text-xl text-slate-950">先按问题阶段，而不是按页面名字筛</CardTitle>
            <CardDescription className="text-sm leading-6 text-slate-600">
              现在的模板中心更适合先判断你是在搭建、排障，还是已经进入自动化与产品化阶段。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-5">
            <div className="flex flex-wrap gap-2.5">
              {categoryStats.map((item, index) => (
                <Badge key={item.label} variant={index === 0 ? "default" : "outline"} className="px-3 py-1 text-xs">
                  {item.label} · {item.count}
                </Badge>
              ))}
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3 lg:grid-cols-1">
              {difficultyStats.map((difficulty) => (
                <div key={difficulty} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-3.5 py-2.5 text-sm text-slate-600">
                  <p className="font-medium text-slate-950">{difficulty}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    {templatesCatalog.filter((item) => item.difficulty === difficulty).length} 个模板覆盖这一层难度
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="template-grid">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">All templates</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">首批模板</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 sm:hidden">移动端优先保留适配判断、输出物和动作入口，详细步骤放进模板详情页。</p>
          </div>
          <Link href="/diagnose" className="hidden text-sm font-medium text-sky-700 sm:inline-flex">
            不知道选哪个？先体检配置
          </Link>
        </div>
        <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-4 xl:gap-3">
          {templatesCatalog.map((template, index) => (
            <Card key={template.slug} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Template 0{index + 1}</p>
                  <Badge variant="outline">{template.category}</Badge>
                  <Badge variant="secondary">{template.difficulty}</Badge>
                </div>
                <CardTitle className="mt-1 text-lg text-slate-950">{template.title}</CardTitle>
                <CardDescription className="text-sm leading-[1.65] text-slate-600">{template.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                <div className="rounded-2xl bg-slate-50/80 px-3.5 py-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Scenario</p>
                  <p className="mt-1.5 text-sm leading-[1.6] text-slate-600">{template.scenario}</p>
                  <div className="mt-3 space-y-2">
                    <CompactDecisionRow
                      label="适合你如果"
                      tone="sky"
                      text={template.fitSignals[0] ?? "先看当前问题是不是这类模板要解决的对象。"}
                    />
                    <CompactDecisionRow
                      label="先别用如果"
                      tone="rose"
                      text={template.notFitSignals[0] ?? "如果当前阶段不匹配，先回 Diagnose 或换入口。"}
                    />
                  </div>
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

                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 sm:block">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Expected outputs</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                    {template.outputs.slice(0, 2).map((item) => (
                      <span key={item} className="rounded-full bg-white px-3 py-1">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden flex-wrap gap-2 text-xs text-slate-500 sm:flex">
                  {template.audience.slice(0, 2).map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-3 pt-0">
                <Link href={`/templates/${template.slug}`} className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                  查看模板
                </Link>
                <Link href="/use-cases" className={`${inlineLinkClass} hidden sm:inline-flex`}>
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

function DarkStatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium leading-6 text-white">{value}</p>
    </div>
  );
}

function CompactDecisionRow({
  label,
  text,
  tone,
}: {
  label: string;
  text: string;
  tone: "sky" | "rose";
}) {
  const toneClass =
    tone === "sky"
      ? "border-sky-100 bg-sky-50/80 text-slate-700"
      : "border-rose-100 bg-rose-50/70 text-slate-700";

  return (
    <div className={`rounded-xl border px-3 py-2.5 ${toneClass}`}>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm leading-[1.55]">{text}</p>
    </div>
  );
}
