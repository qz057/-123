import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDocByTitle } from "@/data/docs/catalog";
import { getTemplateBySlug, getTemplateByTitle, templatesCatalog } from "@/data/templates/catalog";

export function generateStaticParams() {
  return templatesCatalog.map((template) => ({ slug: template.slug }));
}

const primaryLink =
  "rounded-full bg-slate-950 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800";

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  const relatedTemplates = template.relatedTemplates
    .map((title) => getTemplateByTitle(title))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const relatedDocs = template.relatedDocs
    .map((title) => getDocByTitle(title))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4">
        <p className="text-sm font-medium text-sky-700">FlowDock / Templates / {template.category}</p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline">{template.category}</Badge>
          <Badge variant="secondary">{template.difficulty}</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{template.title}</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{template.summary}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
        <div className="space-y-6">
          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">这份模板解决什么问题</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">用更直接的方式判断这个模板是否适合你当前阶段。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
              <InfoBlock title="适合对象" items={template.audience} />
              <TextBlock title="问题定义" text={template.problem} />
              <TextBlock title="适用场景" text={template.scenario} />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">什么时候该用 / 什么时候先别用</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">先判断模板匹配度，再执行步骤，效率会高很多。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-2">
              <ChecklistBlock title="适合现在就用" items={template.fitSignals} tone="success" />
              <ChecklistBlock title="先别急着用" items={template.notFitSignals} tone="warning" />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">使用前准备</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">先确认前置条件、输入和预期输出，避免直接照抄导致中途卡住。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pb-6">
              <InfoBlock title="前置条件" items={template.prerequisites} />
              <InfoBlock title="输入" items={template.inputs} />
              <InfoBlock title="输出" items={template.outputs} />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">推荐推进步骤</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">首版先给你一条能照着走的路径，后续再继续细化正文与案例。</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <ol className="space-y-4">
                {template.steps.map((item, index) => (
                  <li key={item} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-medium text-sky-700">Step {index + 1}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">执行检查与验收</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">这部分用于判断“是否真的跑通”，避免只停在看懂模板。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <ChecklistBlock title="开始前检查" items={template.prerequisites.map((item) => `已确认：${item}`)} />
              <ChecklistBlock
                title="执行中检查"
                items={template.steps.map((item, index) => `Step ${index + 1}：${item}`)}
              />
              <ChecklistBlock title="完成验收" items={template.outputs.map((item) => `已产出：${item}`)} />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-rose-200 bg-rose-50/40 py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">失败信号与回滚策略</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">当你出现这些信号时，优先回退到稳定层，先恢复可用再扩展。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-2">
              <ChecklistBlock title="常见失败信号" items={template.failureSignals} tone="danger" />
              <ChecklistBlock title="优先回滚动作" items={template.rollbackSteps} tone="neutral" />
            </CardContent>
          </Card>

          <Card className="hidden rounded-3xl border border-slate-200 bg-white py-0 shadow-sm sm:block">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">失败分支怎么缩回去，才不会越改越乱</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">重点不是“再试一次”，而是知道什么时候该停、该退、该留什么证据。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-2">
              <ChecklistBlock
                title="别继续放大动作如果"
                items={[
                  "已经改了两轮，但还是说不清哪一步真正起效",
                  "为了追结果开始同时改 provider、session、配置和入口",
                  "你只能说“好像好一点了”，却拿不出最小验证证据",
                ]}
                tone="warning"
              />
              <ChecklistBlock
                title="回滚后要保留的证据"
                items={[
                  "哪一步动作前是最后一个稳定点",
                  "哪条最小验证证明问题仍在 / 已恢复",
                  "这次最容易误判的信号到底是什么",
                ]}
                tone="success"
              />
            </CardContent>
          </Card>

          <Card className="hidden rounded-3xl border border-slate-200 bg-white py-0 shadow-sm sm:block">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">实战案例</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">看一条完整闭环：从问题出现，到如何处理，再到结果是否可复用。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <CaseBlock label="场景" text={template.caseExample.context} />
              <CaseBlock label="动作" text={template.caseExample.action} />
              <CaseBlock label="结果" text={template.caseExample.outcome} />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">执行后怎么收口，才不会只停在“跑过一次”</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">这层不是重复步骤，而是把“验收 / 沉淀 / 下一跳”补完整。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <ChecklistBlock title="最小验收" items={template.outputs.map((item) => `确认已产出：${item}`)} tone="success" />
              <ChecklistBlock title="收口动作" items={[
                "把这次有效配置、输入和验证结果留成可复现记录",
                "如果中间有回滚或停手点，顺手记下最值钱的判断依据",
                "确认下次再做时，你知道该先从哪一步开始",
              ]} />
              <ChecklistBlock title="准备下一跳" items={[
                relatedDocs[0] ? `补看文档：${relatedDocs[0].title}` : "补看对应文档，确认边界和验证口径",
                relatedTemplates[0] ? `可继续关联模板：${relatedTemplates[0].title}` : "如果方向已稳定，再决定是否扩到下一个模板",
                "如果执行后现象和预期仍不一致，先回 Diagnose 重判层",
              ]} tone="warning" />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">常见问题</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">把最常见的追问拆成更容易判断的短块，而不是一列长问题。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6 md:grid-cols-2">
              {template.faqs.map((item, index) => (
                <div key={item} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">FAQ 0{index + 1}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:col-span-2">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">继续判断</p>
                <div className="mt-2 grid gap-3 md:grid-cols-3">
                  <p className="text-sm leading-6 text-slate-600">方向还是糊：先回 Diagnose，别继续横跳模板。</p>
                  <p className="text-sm leading-6 text-slate-600">执行后结果不稳：回 Troubleshooting 把停手点和回滚顺序收清。</p>
                  <p className="text-sm leading-6 text-slate-600">这份模板已稳定：再决定是否扩到相关模板或 use case。</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hidden rounded-3xl border border-slate-200 bg-white py-0 shadow-sm sm:block">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">案例分支：执行后最常见的两种走向</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">让案例不只停在“看过”，而是直接对应下一跳动作。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <ChecklistBlock
                title="分支 A · 已经跑通，但还不稳"
                items={[
                  "先保留一个最小可复现版本，不急着继续扩步骤",
                  "把这次有效输入、输出和最小验证写成可复用记录",
                  "优先回 Troubleshooting 收清停手点与回滚顺序",
                ]}
                tone="success"
              />
              <ChecklistBlock
                title="分支 B · 结果还不对，但方向大致对"
                items={[
                  "不要一口气换模板、换入口、换 provider 一起救",
                  "先退回最后一个稳定动作，再做一次最小验证",
                  "如果已经说不清当前卡在哪层，先回 Diagnose 重判层",
                ]}
                tone="warning"
              />
              <ChecklistBlock
                title="FAQ 下一跳"
                items={[
                  relatedDocs[0] ? `先补文档：${relatedDocs[0].title}` : "先补对应文档，确认边界和验证口径",
                  relatedTemplates[0] ? `再看相关模板：${relatedTemplates[0].title}` : "再决定是否切到相邻模板",
                  "如果结果和案例完全不在一个分支，别硬套，先回 Diagnose",
                ]}
              />
            </CardContent>
          </Card>

          <Card className="hidden rounded-3xl border border-slate-200 bg-slate-50/70 py-0 shadow-sm sm:block">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">交付后复盘：怎么让下次不用再从零判断</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">把这次结果沉淀成下次更快的入口，而不是只留一句“之前试过”。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <ChecklistBlock
                title="要留下的最小事实"
                items={[
                  "哪一步之前是最后一个稳定点",
                  "哪条最小验证最能证明这次真的恢复",
                  "这次最容易误判的分支到底是什么",
                ]}
              />
              <ChecklistBlock
                title="下次直接复用如果"
                items={[
                  "目标没变、输入没变、环境也没变",
                  "这次 done signal 还能稳定复现",
                  "你还能准确复述这次最值钱的停手点",
                ]}
                tone="success"
              />
              <ChecklistBlock
                title="别复用旧结论如果"
                items={[
                  "目标已经换了，但你还想沿同一模板硬推",
                  "输入、环境、入口层都变了，却还拿旧验证当证明",
                  "这次异常更像新的分支，而不是旧案例的复读",
                ]}
                tone="warning"
                className="hidden sm:block"
              />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-slate-50/70 py-0 shadow-sm sm:hidden">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">继续推进前，只看这 3 件事</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">把底部重复判断层收成一个更短的 mobile 收口卡，先保证下一跳清楚。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6">
              <ChecklistBlock
                title="结果不稳"
                items={[
                  "先保最后一个稳定动作",
                  "回 Troubleshooting 收清停手点与回滚顺序",
                ]}
                tone="success"
              />
              <ChecklistBlock
                title="方向变糊"
                items={[
                  "别继续横跳模板或 provider",
                  "先回 Diagnose 重新判层",
                ]}
                tone="warning"
              />
              <ChecklistBlock
                title="准备交付 / 交接"
                items={[
                  "至少留下稳定点、done signal、下一跳资源",
                  relatedDocs[0] ? `优先补看：${relatedDocs[0].title}` : "优先补对应文档，确认边界和验证口径",
                ]}
              />
            </CardContent>
          </Card>

          <Card className="hidden rounded-3xl border border-slate-200 bg-white py-0 shadow-sm sm:block">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">如果这次要交给别人继续做</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">别把交接留成一句“照这个试试”，而是留下别人能直接接上的最小包。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <ChecklistBlock
                title="交接最少要给"
                items={[
                  "最后一个稳定点是什么",
                  "哪条最小验证最能证明当前状态",
                  "下一步优先开哪个模板 / 文档 / Diagnose",
                ]}
              />
              <ChecklistBlock
                title="别人接手前先确认"
                items={[
                  "目标和输入是否仍与这次一致",
                  "环境 / provider / session 有没有变化",
                  "done signal 是否还能被独立复现",
                ]}
                tone="success"
              />
              <ChecklistBlock
                title="别直接交接旧结论如果"
                items={[
                  "这次结果本身就不稳定",
                  "环境已经变了，却还想照旧结论继续推进",
                  "新现象更像别的层，不再是这份模板的主分支",
                ]}
                tone="warning"
                className="hidden sm:block"
              />
            </CardContent>
          </Card>

          <Card className="hidden rounded-3xl border border-slate-200 bg-slate-50/70 py-0 shadow-sm sm:block">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">什么时候该升级处理，而不是继续在这份模板里硬推</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">模板页不只回答“怎么做”，也要回答“什么时候该切换处理层”。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <ChecklistBlock
                title="先升级 Diagnose 如果"
                items={[
                  "你已经说不清当前到底卡在哪层",
                  "最小验证直接反证了这份模板的主判断",
                  "现在更像新分支，而不是模板里的同类问题",
                ]}
              />
              <ChecklistBlock
                title="先升级 Troubleshooting 如果"
                items={[
                  "方向大致没错，但结果时好时坏",
                  "你开始需要明确停手点和回滚顺序",
                  "需要一条更稳的最小验证 / 收口顺序",
                ]}
                tone="success"
              />
              <ChecklistBlock
                title="先升级 Product Notes 如果"
                items={[
                  "你现在的问题其实是预期过满，不是单点执行错误",
                  "当前要求已经明显超过首版能力边界",
                  "需要先校正阶段判断，再决定要不要继续推进",
                ]}
                tone="warning"
                className="hidden sm:block"
              />
            </CardContent>
          </Card>

          <Card className="hidden rounded-3xl border border-slate-200 bg-white py-0 shadow-sm sm:block">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">如果这次要升级成正式交付包</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">别把“已经跑通一次”直接当成可交付；至少要把最小交付包和升级前检查留清楚。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <ChecklistBlock
                  title="最小交付包"
                  items={[
                    "最后一个稳定版本 / 稳定入口",
                    "最小验证口径与 done signal",
                    "默认第一跳资源与回滚顺序",
                  ]}
                />
                <ChecklistBlock
                  title="升级前先确认"
                  items={[
                    "这次结果已经不只是偶发成功",
                    "关键输入、环境、目标都已固定",
                    "交给别人执行时不会先卡在第一步",
                  ]}
                  tone="success"
                />
                <ChecklistBlock
                  title="先别打包交付如果"
                  items={[
                    "最小验证还在摇摆",
                    "同一现象还能把你带回别的分支",
                    "现在更像临时救火，而不是稳定方案",
                  ]}
                  tone="warning"
                />
                <ChecklistBlock
                  title="升级处理前别漏掉"
                  items={[
                    "先写清当前页已不再是最佳处理层",
                    "把下一位默认第一跳写明白",
                    "把最值钱的回滚证据一起留住",
                  ]}
                  className="hidden sm:block"
                />
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">交付前最后确认</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                    <p className="text-sm leading-6 text-slate-600">第一跳别人一看就知道从哪开。</p>
                    <p className="text-sm leading-6 text-slate-600">done signal 不是一次偶发，而是还能复现。</p>
                    <p className="text-sm leading-6 text-slate-600">如果还会被别的分支拉走，就先别当正式交付。</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">完成定义</p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                    <p className="text-sm leading-6 text-slate-600">别人接手不需要先猜当前层级。</p>
                    <p className="text-sm leading-6 text-slate-600">最小验证和 done signal 都说得清。</p>
                    <p className="text-sm leading-6 text-slate-600">回滚顺序和下一跳资源都已经写明白。</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <Card className="rounded-3xl border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white">推荐下一步</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-300">如果你还不确定模板方向，先体检配置；如果方向明确，再继续看相关文档。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-6">
              <Link href="/diagnose" className={primaryLink}>
                先体检配置
              </Link>
              <Link href="/docs" className="hidden rounded-full border border-white/20 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10 sm:block">
                查看文档总览
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">相关模板</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-6 text-sm text-slate-600">
              {relatedTemplates.length ? (
                relatedTemplates.map((item) => (
                  <Link key={item.slug} href={`/templates/${item.slug}`} className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
                    {item.title}
                  </Link>
                ))
              ) : (
                <p>后续补充。</p>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">推荐文档</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-6 text-sm text-slate-600">
              {relatedDocs.length ? (
                relatedDocs.map((item) => (
                  <Link key={item.slug} href={`/docs/${item.slug}`} className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
                    {item.title}
                  </Link>
                ))
              ) : (
                <p>后续补充。</p>
              )}
            </CardContent>
          </Card>

          <Card className="hidden rounded-3xl border border-slate-200 bg-white py-0 shadow-sm sm:block">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">执行后别断在这里</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-6 text-sm text-slate-600">
              <Link href="/docs/troubleshooting" className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
                执行后现象不对：回 Troubleshooting 收口
              </Link>
              <Link href="/diagnose" className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
                方向开始变糊：回 Diagnose 重新判层
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-slate-950">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function TextBlock({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="text-lg font-medium text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function ChecklistBlock({
  title,
  items,
  tone = "neutral",
  className,
}: {
  title: string;
  items: readonly string[];
  tone?: "neutral" | "danger" | "warning" | "success";
  className?: string;
}) {
  const toneClass =
    tone === "danger"
      ? "border-rose-200 bg-white"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50/50"
        : tone === "success"
          ? "border-emerald-200 bg-emerald-50/50"
          : "border-slate-200 bg-white";

  return (
    <div className={`rounded-2xl border p-4 ${toneClass} ${className ?? ""}`}>
      <h2 className="text-sm font-medium text-slate-950">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
        {items.length ? (
          items.map((item) => <li key={item}>• {item}</li>)
        ) : (
          <li>• 暂无，先按上方步骤推进。</li>
        )}
      </ul>
    </div>
  );
}

function CaseBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}
