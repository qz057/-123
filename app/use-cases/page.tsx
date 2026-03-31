import Link from "next/link";
import { useCasesCatalog } from "@/data/use-cases/catalog";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const inlineLinkClass =
  "inline-flex items-center gap-1 text-sm font-medium text-sky-700 transition hover:text-sky-800";

const primaryButtonClass =
  "inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800";

const overviewStats = [
  { label: "当前场景数", value: `${useCasesCatalog.length} 个` },
  { label: "适合什么时候用", value: "你知道任务，但还没决定入口顺序" },
  { label: "页面目标", value: "先选对第一步，再跳去 Diagnose / Templates / Docs" },
] as const;

const entryRoutes = [
  {
    title: "我知道自己要做什么事，但不知道先开哪个页面",
    description: "先用场景判断这是搭建、排障、自动化还是桌面整合，再决定是先 Diagnose 还是先进模板。",
    primary: { label: "先看场景列表", href: "#use-case-grid" },
    secondary: { label: "不确定就先 Diagnose", href: "/diagnose" },
  },
  {
    title: "我想按真实任务组织信息，不想按功能页来回跳",
    description: "Use Cases 更像任务入口图，不是功能总览。每个场景都会把 Diagnose、Templates 和 Docs 串起来。",
    primary: { label: "先按任务找入口", href: "#use-case-rules" },
    secondary: { label: "看模板中心", href: "/templates" },
  },
  {
    title: "我怕一上来就走错方向",
    description: "先看每个场景的 diagnose focus、执行路径和 done 标准，确认它是不是你当前阶段该走的路径。",
    primary: { label: "先看选择原则", href: "#use-case-rules" },
    secondary: { label: "回 Getting Started", href: "/docs/getting-started" },
  },
] as const;

const pageQuestions = [
  {
    title: "我现在到底在做哪类任务",
    description: "场景页先帮你把“搭建 / 排障 / 自动化 / 桌面整合”这些任务入口分开。",
  },
  {
    title: "我最该先跳到哪一页",
    description: "不是每个问题都该先 Diagnose，也不是所有任务都该先进模板。Use Cases 负责给你第一跳。",
  },
  {
    title: "怎么判断自己真的走对了",
    description: "先看 diagnose focus、执行路径和 done signal，再决定要不要继续深入详情页。",
  },
] as const;

const selectionRules = [
  "先按“你现在要完成的任务”筛场景，而不是先按产品页面名字去猜。",
  "优先看 diagnose focus 和 proof of done，确认这个场景是不是你当前阶段真正该走的路径。",
  "如果你连卡点都还说不清，先去 Diagnose，不要硬用 Use Cases 代替诊断。",
] as const;

export default function UseCasesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-9 lg:px-8">
      <header className="mb-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <div className="mb-2.5 flex flex-wrap items-center gap-2 text-xs">
            <Badge variant="outline">FlowDock</Badge>
            <Badge variant="secondary">Use Cases</Badge>
            <Badge variant="outline">先按任务找入口</Badge>
          </div>
          <p className="text-sm font-medium text-sky-700">FlowDock / Use Cases</p>
          <h1 className="mt-2 text-[1.95rem] font-semibold tracking-tight text-slate-950 sm:text-[2.35rem]">使用场景</h1>
          <p className="mt-3.5 max-w-3xl text-sm leading-[1.72] text-slate-600 sm:text-[15px]">
            这里不是把功能页重新命名一遍，而是把 FlowDock 重新组织成真实任务入口。你先判断自己在做哪类事情，再跳到 Diagnose、Templates 和 Docs，而不是先在产品页之间来回试错。
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <Link href="#use-case-grid" className={primaryButtonClass}>
              直接看场景入口
            </Link>
            <Link href="/diagnose" className={inlineLinkClass}>
              <span>不确定方向？先 Diagnose</span>
              <span aria-hidden>→</span>
            </Link>
            <Link href="/templates" className={`${inlineLinkClass} hidden sm:inline-flex`}>
              <span>先看模板中心</span>
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <Card className="rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Use-case map</p>
            <CardTitle className="text-2xl text-white">先抓住场景页的职责</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2.5 pb-5 sm:grid-cols-3 lg:grid-cols-1">
            {overviewStats.map((item) => (
              <DarkStatCard key={item.label} label={item.label} value={item.value} />
            ))}
          </CardContent>
        </Card>
      </header>

      <section className="mb-8">
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Entry routes</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">现在最常见的三种进场景页方式</h2>
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

      <section className="mb-7">
        <div className="mb-3.5">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Page questions</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">Use Cases 这页真正帮你回答的三件事</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {pageQuestions.map((item) => (
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

      <section id="use-case-rules" className="mb-8 grid gap-3.5 xl:grid-cols-[1.04fr_0.96fr]">
        <Card className="rounded-[28px] border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
          <CardHeader>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Selection rules</p>
            <CardTitle className="text-xl text-slate-950">场景应该怎么选，才不会又退回功能页视角</CardTitle>
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
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Page promise</p>
            <CardTitle className="text-xl text-slate-950">Use Cases 不是终点，而是更快选对第一步</CardTitle>
            <CardDescription className="text-sm leading-6 text-slate-600">
              每个场景页都应该帮助你回答三件事：我现在在做什么、我最该先点哪一类入口、做完后怎么判断自己真的走对了。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2.5 pb-5">
            <PromiseCard text="不让你在 Diagnose、Templates、Docs 之间盲跳" />
            <PromiseCard text="不把“我知道页面名”误当成“我知道入口顺序”" />
            <PromiseCard text="不把场景页当成终点，而是当成执行路径分流器" />
          </CardContent>
        </Card>
      </section>

      <section id="use-case-grid">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">All use cases</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">当前场景入口</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500 sm:hidden">移动端优先保留诊断焦点、done signal 和动作入口，详细判断交给场景详情页。</p>
          </div>
          <Link href="/diagnose" className="hidden text-sm font-medium text-sky-700 sm:inline-flex">
            还是拿不准？先体检配置
          </Link>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2 xl:grid-cols-4 xl:gap-3">
          {useCasesCatalog.map((item, index) => (
            <Card key={item.slug} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Use case 0{index + 1}</p>
                  <Badge variant="outline">{item.audience.length} 类适用对象</Badge>
                </div>
                <CardTitle className="mt-1 text-lg text-slate-950">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-[1.65] text-slate-600">{item.summary}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                <div className="rounded-2xl bg-slate-50/80 px-3.5 py-3 text-sm leading-[1.6] text-slate-600">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Diagnose focus</p>
                  <p className="mt-1.5">{item.diagnoseFocus}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/60 px-3.5 py-3">
                  <div className="space-y-2">
                    <CompactInfoRow label="建议第一跳" tone="sky" text={item.primaryAction.label} />
                    <CompactInfoRow
                      label="Done signal"
                      tone="emerald"
                      text={item.proofOfDone[0] ?? "完成后应能明确判断自己是否走对路径。"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs text-slate-500 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5">
                    <p className="font-medium text-slate-950">{item.goals.length}</p>
                    <p className="mt-1">目标</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5">
                    <p className="font-medium text-slate-950">{item.executionPath.length}</p>
                    <p className="mt-1">步骤</p>
                  </div>
                  <div className="hidden rounded-2xl border border-slate-200 bg-white px-2.5 py-2.5 sm:block">
                    <p className="font-medium text-slate-950">{item.relatedTemplates.length}</p>
                    <p className="mt-1">相关模板</p>
                  </div>
                </div>

                <div className="hidden rounded-2xl border border-slate-200 bg-slate-50/60 px-3.5 py-3 sm:block">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Current goals</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                    {item.goals.slice(0, 2).map((goal) => (
                      <span key={goal} className="rounded-full bg-white px-3 py-1">
                        {goal}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden rounded-2xl border border-amber-100 bg-amber-50/70 px-3.5 py-2.5 text-sm leading-[1.55] text-slate-700 sm:block">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Common pitfall</p>
                  <p className="mt-1">{item.pitfalls[0] ?? "先确认当前阶段，再决定是否继续深入。"}</p>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between gap-3 pt-0">
                <Link href={`/use-cases/${item.slug}`} className="inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800">
                  查看场景路径
                </Link>
                <Link href={item.secondaryAction.href} className={`${inlineLinkClass} hidden sm:inline-flex`}>
                  <span>{item.secondaryAction.label}</span>
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

function PromiseCard({ text }: { text: string }) {
  return <p className="rounded-2xl bg-slate-50/80 px-3.5 py-2.5 text-sm leading-[1.65] text-slate-600">{text}</p>;
}

function CompactInfoRow({
  label,
  text,
  tone,
}: {
  label: string;
  text: string;
  tone: "sky" | "emerald";
}) {
  const toneClass =
    tone === "sky"
      ? "border-sky-100 bg-sky-50/80 text-slate-700"
      : "border-emerald-100 bg-emerald-50/70 text-slate-700";

  return (
    <div className={`rounded-xl border px-3 py-2.5 ${toneClass}`}>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm leading-[1.55]">{text}</p>
    </div>
  );
}
