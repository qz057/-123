import Link from "next/link";
import type {
  DiagnoseHintLink,
  DiagnoseIssueMeta,
  DiagnoseOption,
  DiagnoseResourceHrefLookup,
  PreparedDiagnoseExampleCase,
} from "./diagnose-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DiagnoseInput, DiagnoseIssueType, DiagnoseResult } from "@/types/diagnose";

type DiagnoseResultPanelProps = {
  result: DiagnoseResult;
  currentScenario?: DiagnoseInput["scenario"];
  isPending: boolean;
  issueTypeMeta: Record<DiagnoseIssueType, DiagnoseIssueMeta>;
  scenarios: readonly DiagnoseOption<NonNullable<DiagnoseInput["scenario"]>>[];
  adjacentBranchHints: Record<DiagnoseIssueType, DiagnoseHintLink[]>;
  verificationMismatchHints: Record<DiagnoseIssueType, DiagnoseHintLink[]>;
  scenarioRouteHints: Partial<Record<NonNullable<DiagnoseInput["scenario"]>, DiagnoseHintLink[]>>;
  diagnoseExampleCases: readonly PreparedDiagnoseExampleCase[];
  resourceHrefLookup: DiagnoseResourceHrefLookup;
  onReset?: () => void;
  onLoadExample?: () => void;
  onApplyExample?: (example: PreparedDiagnoseExampleCase) => void;
  onJumpToExamples?: () => void;
  onJumpToInput?: () => void;
};

export function DiagnoseResultPanel({
  result,
  currentScenario,
  isPending,
  issueTypeMeta,
  scenarios,
  adjacentBranchHints,
  verificationMismatchHints,
  scenarioRouteHints,
  diagnoseExampleCases,
  resourceHrefLookup,
  onReset,
  onLoadExample,
  onApplyExample,
  onJumpToExamples,
  onJumpToInput,
}: DiagnoseResultPanelProps) {
  const issueMeta = issueTypeMeta[result.issueType];
  const currentScenarioLabel = scenarios.find((item) => item.value === currentScenario)?.label;
  const primaryResource = result.recommendedResources?.find((item) => item.priority === "high") ?? result.recommendedResources?.[0];
  const matchingExamples = [...diagnoseExampleCases]
    .filter((item) => item.form.issueType === result.issueType)
    .sort((a, b) => {
      const aScore = a.form.scenario === currentScenario ? 2 : a.form.scenario ? 1 : 0;
      const bScore = b.form.scenario === currentScenario ? 2 : b.form.scenario ? 1 : 0;
      return bScore - aScore;
    })
    .slice(0, 2);
  const branchHints = adjacentBranchHints[result.issueType];
  const scenarioHints = currentScenario ? scenarioRouteHints[currentScenario] ?? [] : [];
  const verificationHints = verificationMismatchHints[result.issueType];
  const primaryResourceHref = primaryResource ? resolveResourceHref(resourceHrefLookup, primaryResource.kind, primaryResource.title) : undefined;
  const primaryResourceLabel = primaryResource ? (primaryResource.kind === "template" ? "模板" : "文档") : undefined;
  const topWarning = result.missingInputs?.[0] ?? issueMeta.avoid;
  const topCause = result.causes[0];

  return (
    <Card id="diagnose-result-panel" className="rounded-3xl border border-slate-200 bg-indigo-950 py-0 text-white shadow-sm fd-dark-card" aria-busy={isPending}>
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <CardTitle className="text-xl text-white">诊断结果</CardTitle>
          <Badge variant="secondary" className="border border-white/15 bg-white/10 text-slate-100">
            {issueMeta.label}
          </Badge>
          <Badge variant="secondary" className="border border-white/15 bg-white/10 text-slate-100">
            {result.riskLevel.toUpperCase()}
          </Badge>
          {isPending ? (
            <Badge variant="secondary" className="border border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
              正在更新
            </Badge>
          ) : null}
        </div>
        <CardDescription className="text-sm leading-6 text-slate-200">{result.summary}</CardDescription>
        {result.confidenceNote ? <p className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs leading-5 text-slate-200">判断稳定性：{result.confidenceNote}</p> : null}
      </CardHeader>
      <CardContent className="space-y-4 pb-5">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-200">当前更像</p>
            <p className="mt-2 text-sm font-medium text-white">{issueMeta.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{issueMeta.focus}</p>
          </div>

          <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-emerald-200">建议第一跳</p>
            <p className="mt-2 text-sm font-medium text-white">{primaryResource?.title ?? result.nextActions[0] ?? "先确认归类是否抓对"}</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{primaryResource?.reason ?? "先按当前最高概率路径推进，再用最小验证确认结果。"}</p>
            {primaryResourceHref && primaryResourceLabel ? (
              <div className="mt-3">
                <Link href={primaryResourceHref} className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                  打开{primaryResourceLabel}
                </Link>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-amber-300/15 bg-amber-400/10 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-amber-200">现在先别做</p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{topWarning}</p>
          </div>
        </div>

        {matchingExamples.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">相近示例现场 / 推荐入口</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {matchingExamples.map((example) => (
                <div key={example.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">{example.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{example.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                    {onApplyExample ? (
                      <button onClick={() => onApplyExample(example)} className="inline-flex items-center gap-1 text-sm font-medium text-violet-200 transition hover:text-white">
                        <span>载入这个示例</span>
                        <span aria-hidden>→</span>
                      </button>
                    ) : null}
                    <Link href={example.entry.href} className="inline-flex items-center gap-1 text-sm font-medium text-slate-200 transition hover:text-white">
                      <span>{example.entry.label}</span>
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {result.diagnosisBasis?.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">判断依据</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-200">
              {result.diagnosisBasis.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div>
          <h3 className="text-sm font-medium text-white">当前最值得先处理的原因</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {result.causes.map((cause, index) => (
              <div key={cause.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">{cause.title}</p>
                  <Badge variant="outline" className="border-white/20 text-slate-100">
                    {cause.confidence.toUpperCase()}
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-200">{cause.reason}</p>
                {index === 0 && topCause ? <p className="mt-2 text-xs leading-5 text-cyan-100">优先从这个原因开始做最小验证。</p> : null}
              </div>
            ))}
          </div>
        </div>

        {result.missingInputs?.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">建议补充信息</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {result.missingInputs.map((item) => (
                <div key={item} className="rounded-2xl border border-amber-300/15 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <h3 className="text-sm font-medium text-white">建议执行顺序</h3>
          <div className="mt-3 grid gap-3">
            {result.fixSteps.map((step) => (
              <div key={step.step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950">{step.step}</span>
                    <p className="text-sm font-medium text-white">{step.action}</p>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-slate-100">
                    顺序 {step.step}
                  </Badge>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-indigo-950/35 px-3.5 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-200">为什么先做</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{step.why}</p>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 px-3.5 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-cyan-200">完成证明</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{step.verify}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {result.scoreBreakdown?.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">归类评分解释</h3>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {result.scoreBreakdown.map((item, index) => {
                const maxScore = Math.max(...(result.scoreBreakdown ?? []).map((entry) => entry.score), 1);
                const width = `${Math.max((item.score / maxScore) * 100, item.score > 0 ? 18 : 8)}%`;
                return (
                  <div key={item.issueType} className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{item.label}</span>
                        {index === 0 ? (
                          <Badge variant="secondary" className="border border-white/15 bg-white/10 text-slate-100">
                            当前最高
                          </Badge>
                        ) : null}
                      </div>
                      <span className="text-xs font-medium text-slate-200">得分 {item.score}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" style={{ width }} />
                    </div>
                    <ul className="mt-3 space-y-1 text-xs leading-5 text-slate-200">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>• {highlight}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {result.patternSignals?.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">典型失败信号模板</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {result.patternSignals.map((item) => (
                <div key={item.title} className="rounded-2xl border border-rose-200/20 bg-rose-400/5 p-3.5">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {result.scenarioExamples?.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">相似场景参考</h3>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              {result.scenarioExamples.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">场景：{item.context}</p>
                  <p className="mt-2 text-sm leading-6 text-cyan-100">判断重点：{item.implication}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {branchHints.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">相邻误判分支：什么时候该转到旁边那条路</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {branchHints.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.detail}</p>
                  <Link href={item.href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-violet-200 transition hover:text-white">
                    <span>{item.label}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {scenarioHints.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">按当前场景继续跳</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {scenarioHints.map((item) => (
                <div key={item.title} className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-3.5">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.detail}</p>
                  <Link href={item.href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-cyan-100 transition hover:text-white">
                    <span>{item.label}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {verificationHints.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">如果最小验证打出来的结果和当前判断不一致</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {verificationHints.map((item) => (
                <div key={item.title} className="rounded-2xl border border-amber-300/15 bg-amber-400/10 p-3.5">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{item.detail}</p>
                  <Link href={item.href} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-100 transition hover:text-white">
                    <span>{item.label}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {result.recommendedResources?.length ? (
          <div>
            <h3 className="text-sm font-medium text-white">推荐资源优先级</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {result.recommendedResources.map((resource) => {
                const href = resolveResourceHref(resourceHrefLookup, resource.kind, resource.title);
                const label = resource.kind === "template" ? "模板" : "文档";
                return (
                  <div key={`${resource.kind}-${resource.title}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge variant="outline" className="border-white/20 text-slate-100">
                        {label}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={resource.priority === "high" ? "border border-emerald-300/20 bg-emerald-400/10 text-emerald-100" : "border border-white/15 bg-white/10 text-slate-100"}
                      >
                        {resource.priority === "high" ? "优先" : "备选"}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm font-medium text-white">{resource.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{resource.reason}</p>
                    {href ? (
                      <div className="mt-3">
                        <Link href={href} className="inline-flex rounded-full border border-white/20 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/10">
                          打开{label}
                        </Link>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        <div>
          <h3 className="text-sm font-medium text-white">下一步与资源</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            {result.nextActions.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {result.relatedTemplates.map((item) => {
              const href = resourceHrefLookup.templateByTitle[item];
              return href ? (
                <Link key={`template-${item}`} href={href} className="inline-flex">
                  <Badge variant="outline" className="cursor-pointer border-white/20 text-slate-100 transition hover:bg-white/10">
                    模板：{item}
                  </Badge>
                </Link>
              ) : (
                <Badge key={`template-${item}`} variant="outline" className="border-white/20 text-slate-100">
                  模板：{item}
                </Badge>
              );
            })}
            {result.relatedDocs.map((item) => {
              const href = resourceHrefLookup.docByTitle[item];
              return href ? (
                <Link key={`doc-${item}`} href={href} className="inline-flex">
                  <Badge variant="outline" className="cursor-pointer border-white/20 text-slate-100 transition hover:bg-white/10">
                    文档：{item}
                  </Badge>
                </Link>
              ) : (
                <Badge key={`doc-${item}`} variant="outline" className="border-white/20 text-slate-100">
                  文档：{item}
                </Badge>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">复查与交接</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-200">复查时先保留</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-200">
                <li>• 当前判断：{issueMeta.label}</li>
                <li>• 最小验证：{result.fixSteps[0]?.verify ?? "先做一条最小真测"}</li>
                <li>• 当前场景：{currentScenarioLabel ?? "未指定场景"}</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-300/15 bg-amber-400/10 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-200">复查时先别做</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-200">
                <li>• 别同时改多个层级再看结果</li>
                <li>• 别把一次偶发恢复直接当成稳定结论</li>
                <li>• 别在 {topWarning} 还没澄清前继续放大动作</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-300/15 bg-rose-400/10 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-rose-200">先暂停继续试如果</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-200">
                <li>• 你已经连续两轮都在扩动作而不是缩变量</li>
                <li>• 每轮都像有点变化，但没有一条稳定验证</li>
                <li>• 当前现象已经超出这页现有判断能解释的范围</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-200">交给下一位时最少带上</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-200">
                <li>• 当前最高原因：{topCause?.title ?? "待确认"}</li>
                <li>• 第一跳资源：{primaryResource?.title ?? "先按当前第一跳继续"}</li>
                <li>• 如果验证反证当前判断，就直接按上面的转分支卡改路</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">如果二次排查后你又回到了这里</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-200">继续沿当前判断如果</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-200">
                <li>• 最小验证仍支持当前判断</li>
                <li>• 当前第一跳资源还没有被反证</li>
                <li>• 场景没有变，异常也没有换层</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-300/15 bg-amber-400/10 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-amber-200">改走旁边那条分支如果</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-200">
                <li>• 最小验证开始直接反证当前判断</li>
                <li>• 问题越来越像相邻误判分支里的描述</li>
                <li>• 当前资源已经不能解释新现象</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-emerald-300/15 bg-emerald-400/10 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-200">升级到哪个处理层</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-200">
                <li>• 方向对但结果乱：先回 Troubleshooting</li>
                <li>• 预期过满：先看 Product Notes / Docs</li>
                <li>• 现象已经换层：先回 Diagnose 重判</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-200">升级处理前先带上</p>
              <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-200">
                <li>• 这轮最值钱的最小验证结论</li>
                <li>• 当前不该再放大的动作是什么</li>
                <li>• 下一位先开哪张卡 / 哪条资源</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-200">二次排查摘要</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              <p className="text-sm leading-6 text-slate-200">先缩变量，不继续放大动作。</p>
              <p className="text-sm leading-6 text-slate-200">再看最小验证是支持、反证，还是只给噪音。</p>
              <p className="text-sm leading-6 text-slate-200">最后再决定继续当前分支、转旁支，还是升级处理层。</p>
            </div>
          </div>
        </div>

        {onReset || onLoadExample || onJumpToExamples || onJumpToInput ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {onJumpToInput ? (
              <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={onJumpToInput}>
                回输入区补信息
              </Button>
            ) : null}
            {onJumpToExamples ? (
              <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={onJumpToExamples}>
                回示例层换现场
              </Button>
            ) : null}
            {onLoadExample ? (
              <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={onLoadExample}>
                载入示例
              </Button>
            ) : null}
            {onReset ? (
              <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={onReset}>
                重新开始
              </Button>
            ) : null}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}

function resolveResourceHref(lookup: DiagnoseResourceHrefLookup, kind: "template" | "doc", title: string) {
  return kind === "template" ? lookup.templateByTitle[title] : lookup.docByTitle[title];
}
