import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDocByTitle } from "@/data/docs/catalog";
import { getTemplateByTitle } from "@/data/templates/catalog";
import { getUseCaseBySlug, useCasesCatalog } from "@/data/use-cases/catalog";

export function generateStaticParams() {
  return useCasesCatalog.map((item) => ({ slug: item.slug }));
}

export default async function UseCaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);

  if (!useCase) {
    notFound();
  }

  const relatedTemplates = useCase.relatedTemplates
    .map((title) => getTemplateByTitle(title))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
  const relatedDocs = useCase.relatedDocs
    .map((title) => getDocByTitle(title))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4">
        <p className="text-sm font-medium text-sky-700">FlowDock / Use Cases</p>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline">场景入口</Badge>
          <Badge variant="secondary">任务视角</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{useCase.title}</h1>
        <p className="max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{useCase.summary}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.22fr_0.78fr] lg:items-start">
        <div className="space-y-6">
          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">这个场景适合谁</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">先判断自己是不是这个场景，再决定后面跳哪个页面。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5 pb-6 md:grid-cols-2">
              <InfoBlock title="适合对象" items={useCase.audience} />
              <InfoBlock title="目标" items={useCase.goals} />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">先判断卡点，再决定入口</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">不要把场景页当说明页看完就走，它应该帮你更快找到第一步。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <p className="text-sm leading-7 text-slate-600 sm:text-base">{useCase.diagnoseFocus}</p>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="text-sm font-medium text-slate-900">推荐推进模块</p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                  {useCase.blocks.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">建议推进顺序</CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <ol className="space-y-4">
                {useCase.executionPath.map((item, index) => (
                  <li key={item} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-xs font-medium text-sky-700">Step {index + 1}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-700">{item}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-amber-200 bg-amber-50/40 py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">这个场景最常见的误区</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">这些误区很容易让你一直忙，但一直没有真正推进。</CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <ul className="space-y-3 text-sm leading-6 text-slate-700">
                {useCase.pitfalls.map((item) => (
                  <li key={item} className="rounded-2xl border border-amber-200 bg-white p-4">• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">做到这一步，才算这个场景真的跑起来</CardTitle>
            </CardHeader>
            <CardContent className="pb-6">
              <ul className="space-y-3 text-sm leading-6 text-slate-700">
                {useCase.proofOfDone.map((item) => (
                  <li key={item} className="rounded-2xl border border-slate-200 p-4">• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">这个场景跑起来后，怎么把结果收住</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">场景页的价值不是告诉你“能做什么”，而是让这次结果能被下一次复用。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <InfoBlock title="先确认闭环" items={useCase.proofOfDone} />
              <InfoBlock
                title="顺手沉淀"
                items={[
                  "把这次有效的入口顺序、关键判断和最小验证写成可复用记录",
                  "如果某一步最容易误判，优先把那个停手点记清楚",
                  "确认下次再做时，你知道该先回场景页、模板还是 Diagnose",
                ]}
              />
              <InfoBlock
                title="下一跳别断"
                items={[
                  relatedTemplates[0] ? `继续补模板：${relatedTemplates[0].title}` : "方向稳定后，补一份最贴近的模板",
                  relatedDocs[0] ? `补文档：${relatedDocs[0].title}` : "补对应文档，把边界和验证口径收清",
                  "如果执行后现象和预期不一致，先回 Diagnose 重判层",
                ]}
              />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">场景常见追问</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">这层把最常见的“跑起来之后怎么办”拆成更像真实交付的判断块。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">追问 01</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">如果这个场景已经能稳定复现，下一步优先补模板，而不是继续把场景页当说明页反复读。</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">追问 02</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">如果你发现目标变了、输入变了、环境也变了，就先回 Diagnose 重判层，不要硬沿旧场景往下推。</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">追问 03</p>
                <p className="mt-2 text-sm leading-6 text-slate-700">如果已经跑通一次，最好把最值钱的停手点、误区和 done signal 留下来，下次会直接快很多。</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">失败分支与回滚证据</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">场景页最怕的不是失败，而是失败后继续沿着错误入口放大动作。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-2">
              <InfoBlock
                title="别继续往下推如果"
                items={[
                  "你已经说不清当前是在定位、执行还是补边界",
                  "为了救现场开始同时换入口、换模板、换配置",
                  "done signal 还没出现，就已经开始扩下一阶段目标",
                ]}
              />
              <InfoBlock
                title="回滚后先留住这些证据"
                items={[
                  "最后一个稳定入口是什么",
                  "哪条最小验证证明现在已经恢复 / 仍失败",
                  "这次最容易误判的分支是哪一条",
                ]}
              />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">案例分叉：跑到这里以后，下一步通常怎么选</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">把 FAQ 继续往前推一层，让场景页更像决策面，不只是说明面。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <InfoBlock
                title="分叉 A · 场景已跑通，准备扩下一层"
                items={[
                  "先保一个最小稳定入口，再考虑继续扩模板或文档",
                  "优先把 done signal 和最值钱停手点留下来",
                  "扩下一层前，确认当前目标没有偷偷变化",
                ]}
              />
              <InfoBlock
                title="分叉 B · 场景方向没错，但结果仍不稳"
                items={[
                  "先回最后一个稳定入口，不在错误链路上继续加动作",
                  "优先做一次最小真测，而不是继续看更多说明",
                  "如果开始混层，就回 Diagnose 或 Troubleshooting",
                ]}
              />
              <InfoBlock
                title="FAQ 分支下一跳"
                items={[
                  relatedTemplates[0] ? `先补模板：${relatedTemplates[0].title}` : "先补最贴近的模板",
                  relatedDocs[0] ? `再补文档：${relatedDocs[0].title}` : "再补对应文档，把边界收清",
                  "如果发现问题已经不是原场景，别硬推，先重判层",
                ]}
              />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">交付后复盘：什么时候该沿原场景继续，什么时候别再复用旧结论</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">场景页真正的价值，是让你下次更快决定入口，而不是重复看解释。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <InfoBlock
                title="这次至少要留下"
                items={[
                  "哪个入口是最后稳定入口",
                  "哪条最小真测最能证明 done signal 真的出现",
                  "这次最容易走错的是哪条分支",
                ]}
              />
              <InfoBlock
                title="可以沿原场景继续如果"
                items={[
                  "目标、输入、环境都没有明显变化",
                  "done signal 还能稳定复现",
                  "你还知道该从哪个入口重开最省时间",
                ]}
              />
              <InfoBlock
                title="别继续沿原场景硬推如果"
                items={[
                  "目标已经变了，但你还想沿旧路径直接复用",
                  "环境或入口换了，却还拿旧结论当证据",
                  "现在的问题更像别的层级，而不是原场景的重复",
                ]}
              />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">如果这次要交给别人继续做</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">把“场景入口”交接成别人也能快速判断第一跳，而不是只能复读原来的解释。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <InfoBlock
                title="交接最少要带上"
                items={[
                  "最后稳定入口是什么",
                  "哪条最小真测最能证明当前状态",
                  "下一步优先开哪个场景 / 模板 / Diagnose",
                ]}
              />
              <InfoBlock
                title="别人接手前先确认"
                items={[
                  "目标、输入、环境有没有变化",
                  "当前 done signal 是否还能独立复现",
                  "这次异常是否还属于原场景主分支",
                ]}
              />
              <InfoBlock
                title="别把旧判断直接交接如果"
                items={[
                  "现在问题已经更像别的层级",
                  "原场景只是部分重叠，不再是主因",
                  "你自己都已经说不清第一跳该去哪",
                ]}
              />
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-slate-50/70 py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">什么时候该升级处理，而不是继续沿这个场景硬推</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-600">场景页不只给入口，也要告诉你什么时候该切换处理层。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pb-6 md:grid-cols-3">
              <InfoBlock
                title="先升级 Diagnose 如果"
                items={[
                  "你已经说不清这还是不是原场景主分支",
                  "最小验证开始反证当前场景判断",
                  "第一跳已经不再明确，需要重新判层",
                ]}
              />
              <InfoBlock
                title="先升级 Troubleshooting 如果"
                items={[
                  "方向大致没错，但结果开始时好时坏",
                  "你需要更稳的停手点与回滚顺序",
                  "现在更像收口问题，而不是场景理解问题",
                ]}
              />
              <InfoBlock
                title="先升级 Product Notes / Docs 如果"
                items={[
                  "当前问题其实是预期和阶段判断不一致",
                  "要求已经明显超出首版当前可依赖范围",
                  "你需要先校正边界，再决定是否继续投入",
                ]}
              />
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <Card className="rounded-3xl border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-white">推荐下一步</CardTitle>
              <CardDescription className="text-sm leading-6 text-slate-300">先跳到最合适的执行入口，不用在这个场景页停太久。</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 pb-6">
              <Link href={useCase.primaryAction.href} className="rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-slate-950 transition hover:bg-slate-100">
                {useCase.primaryAction.label}
              </Link>
              <Link href={useCase.secondaryAction.href} className="rounded-full border border-white/20 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-white/10">
                {useCase.secondaryAction.label}
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">相关模板</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-6 text-sm text-slate-600">
              {relatedTemplates.map((item) => (
                <Link key={item.slug} href={`/templates/${item.slug}`} className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
                  {item.title}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">相关文档</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-6 text-sm text-slate-600">
              {relatedDocs.map((item) => (
                <Link key={item.slug} href={`/docs/${item.slug}`} className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
                  {item.title}
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">跑通后继续去哪</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-6 text-sm text-slate-600">
              <Link href={useCase.primaryAction.href} className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
                继续主入口：{useCase.primaryAction.label}
              </Link>
              <Link href="/docs/troubleshooting" className="block rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50">
                如果结果不稳：回 Troubleshooting 收口
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
