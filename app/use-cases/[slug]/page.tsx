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
