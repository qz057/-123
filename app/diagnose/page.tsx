"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { analyzeDiagnose } from "@/lib/diagnose/analyzer";
import type { DiagnoseInput, DiagnoseIssueType, DiagnoseResult } from "@/types/diagnose";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { docsCatalog } from "@/data/docs/catalog";
import { templatesCatalog } from "@/data/templates/catalog";

const issueTypes: { label: string; value: DiagnoseIssueType }[] = [
  { label: "模型连接问题", value: "model_connection" },
  { label: "配置不生效", value: "config_not_applied" },
  { label: "模型切换 / Session 异常", value: "model_switch_session_mismatch" },
  { label: "本地助手 / 工具接入问题", value: "local_tool_integration" },
];

const scenarios = [
  { label: "OpenClaw", value: "openclaw" },
  { label: "Control UI", value: "control_ui" },
  { label: "本地 AI 助手", value: "local_ai_assistant" },
  { label: "桌面工具 / Wrapper", value: "desktop_wrapper" },
  { label: "自动化工作流", value: "workflow_automation" },
  { label: "MCP / 工具链", value: "mcp_tooling" },
  { label: "其他", value: "other" },
] as const;

const authModes = ["oauth", "api_key", "env", "auth_profile", "unknown"];
const transports = ["auto", "websocket", "sse", "http", "unknown"];

const templateHrefByTitle = new Map(templatesCatalog.map((item) => [item.title, `/templates/${item.slug}`]));
const docHrefByTitle = new Map(docsCatalog.map((item) => [item.title, `/docs/${item.slug}`]));

function resolveDocHref(title: string) {
  const direct = docHrefByTitle.get(title);
  if (direct) return direct;

  const byAlias = docsCatalog.find((item) => item.aliases?.includes(title));
  return byAlias ? `/docs/${byAlias.slug}` : undefined;
}

function resolveResourceHref(kind: "template" | "doc", title: string) {
  return kind === "template" ? templateHrefByTitle.get(title) : resolveDocHref(title);
}

const issueTypeMeta: Record<DiagnoseIssueType, { label: string; focus: string; avoid: string }> = {
  model_connection: {
    label: "模型连接问题",
    focus: "先确认 provider / auth / transport 有没有真的打出最小请求。",
    avoid: "别在连通性还没证实时，同时继续改 session、模板和展示层。",
  },
  config_not_applied: {
    label: "配置不生效",
    focus: "先确认运行态到底吃到了哪份配置、谁覆盖了谁。",
    avoid: "别把文件改动或 UI 显示直接当成运行态已经更新。",
  },
  model_switch_session_mismatch: {
    label: "模型切换 / Session 异常",
    focus: "先确认当前会话是否真的切到目标模型，而不是只看默认值。",
    avoid: "别在旧会话里靠感觉判断是否切换成功。",
  },
  local_tool_integration: {
    label: "本地助手 / 工具接入问题",
    focus: "先确认入口可见性和真实执行链路是不是都通了。",
    avoid: "别把按钮可见或菜单存在直接当成接入已经完成。",
  },
};

const inputPriorityHints = [
  "issueType / scenario：先把问题压到更接近真实现场的分支",
  "provider / model / auth / transport：帮助区分连接层和运行态层",
  "symptom / error / expected：决定诊断依据、缺失项和建议质量",
] as const;

const initialForm: DiagnoseInput = {
  issueType: "model_switch_session_mismatch",
  scenario: "control_ui",
  provider: "openai-codex",
  model: "openai-codex/gpt-5.4",
  authMode: "oauth",
  transport: "auto",
  symptomText: "UI 显示切到了 Codex，但当前会话还是旧模型",
  errorText: "session 还是 relay / thinking 显示不一致",
  configSnippet: "agents.defaults.model.primary = openai-codex/gpt-5.4",
  expectedOutcome: "当前会话真实切到 openai-codex/gpt-5.4",
};

export default function DiagnosePage() {
  const [form, setForm] = useState<DiagnoseInput>(initialForm);
  const [result, setResult] = useState<DiagnoseResult>(() => analyzeDiagnose(initialForm));
  const [mobileStep, setMobileStep] = useState(1);

  const issueTypeValue = useMemo(() => form.issueType ?? "config_not_applied", [form.issueType]);
  const currentIssueMeta = issueTypeMeta[issueTypeValue];

  function updateField<K extends keyof DiagnoseInput>(key: K, value: DiagnoseInput[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function runDiagnose() {
    setResult(analyzeDiagnose(form));
    setMobileStep(4);
  }

  function loadExample() {
    setForm(initialForm);
    setResult(analyzeDiagnose(initialForm));
    setMobileStep(1);
  }

  function resetForm() {
    const next = {
      issueType: "config_not_applied" as const,
      scenario: "openclaw" as const,
      symptomText: "改了配置但还是旧结果",
    };
    setForm(next);
    setResult(analyzeDiagnose(next));
    setMobileStep(1);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col gap-4 md:mb-10">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline">FlowDock</Badge>
          <Badge variant="secondary">Diagnose</Badge>
          <Badge variant="outline">规则型 V2</Badge>
        </div>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">配置诊断器</h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            输入你的场景、配置和报错信息，快速得到问题判断与修复建议。当前首版按规则型诊断输出，重点是结构稳定、结论可解释、下一步明确。
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">这次先盯什么</p>
            <p className="mt-2 text-sm font-medium text-slate-950">{currentIssueMeta.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{currentIssueMeta.focus}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-amber-700">这次先别做</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{currentIssueMeta.avoid}</p>
          </div>
          <div className="hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 md:block">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">最值钱输入</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
              {inputPriorityHints.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <div className="space-y-6 md:hidden">
        {mobileStep === 1 && (
          <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">第 1 步：选择问题类型</CardTitle>
              <CardDescription>先确定问题属于哪一层，后面的诊断结果会更稳。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6">
              {issueTypes.map((item) => (
                <button
                  key={item.value}
                  onClick={() => updateField("issueType", item.value)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${issueTypeValue === item.value ? "border-sky-300 bg-sky-50 text-sky-900" : "border-slate-200 text-slate-700 hover:bg-slate-50"}`}
                >
                  {item.label}
                </button>
              ))}
              <Button className="mt-2 rounded-full" onClick={() => setMobileStep(2)}>
                下一步
              </Button>
            </CardContent>
          </Card>
        )}

        {mobileStep === 2 && (
          <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">第 2 步：填写基础信息</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6">
              <NativeSelect value={form.scenario ?? "openclaw"} onChange={(value) => updateField("scenario", value as DiagnoseInput["scenario"])} options={scenarios} />
              <Input value={form.provider ?? ""} onChange={(event) => updateField("provider", event.target.value)} placeholder="provider" />
              <Input value={form.model ?? ""} onChange={(event) => updateField("model", event.target.value)} placeholder="model" />
              <NativeSelect value={form.authMode ?? "unknown"} onChange={(value) => updateField("authMode", value)} options={authModes.map((item) => ({ label: item, value: item }))} />
              <NativeSelect value={form.transport ?? "auto"} onChange={(value) => updateField("transport", value)} options={transports.map((item) => ({ label: item, value: item }))} />
              <div className="mt-2 flex gap-3">
                <Button variant="outline" className="rounded-full" onClick={() => setMobileStep(1)}>
                  上一步
                </Button>
                <Button className="rounded-full" onClick={() => setMobileStep(3)}>
                  下一步
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {mobileStep === 3 && (
          <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">第 3 步：输入配置 / 报错</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6">
              <Textarea value={form.configSnippet ?? ""} onChange={(event) => updateField("configSnippet", event.target.value)} placeholder="配置片段" />
              <Textarea value={form.errorText ?? ""} onChange={(event) => updateField("errorText", event.target.value)} placeholder="报错信息" />
              <Textarea value={form.symptomText ?? ""} onChange={(event) => updateField("symptomText", event.target.value)} placeholder="当前现象" />
              <Textarea value={form.expectedOutcome ?? ""} onChange={(event) => updateField("expectedOutcome", event.target.value)} placeholder="期望结果" />
              <div className="mt-2 flex flex-wrap gap-3">
                <Button variant="outline" className="rounded-full" onClick={() => setMobileStep(2)}>
                  上一步
                </Button>
                <Button variant="outline" className="rounded-full" onClick={loadExample}>
                  载入示例
                </Button>
                <Button className="rounded-full" onClick={runDiagnose}>
                  开始诊断
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {mobileStep === 4 && <ResultCard result={result} onReset={resetForm} onLoadExample={loadExample} />}
      </div>

      <div className="hidden lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-6">
        <DesktopForm form={form} setForm={updateField} issueTypeValue={issueTypeValue} issueMeta={currentIssueMeta} onAnalyze={runDiagnose} onLoadExample={loadExample} onReset={resetForm} />
        <ResultCard result={result} />
      </div>

      <div className="hidden space-y-6 md:block lg:hidden">
        <TabletForm form={form} setForm={updateField} issueTypeValue={issueTypeValue} issueMeta={currentIssueMeta} onAnalyze={runDiagnose} onLoadExample={loadExample} onReset={resetForm} />
        <ResultCard result={result} />
      </div>
    </div>
  );
}

function DesktopForm({ form, setForm, issueTypeValue, issueMeta, onAnalyze, onLoadExample, onReset }: FormProps) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-slate-950">输入</CardTitle>
        <CardDescription>先定问题层，再补现场上下文和最小证据，不靠一句“不对”硬猜。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pb-6">
        <div className="grid gap-3 xl:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">这轮先盯</p>
            <p className="mt-2 text-sm font-medium text-slate-950">{issueMeta.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{issueMeta.focus}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-amber-700">别先这样做</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{issueMeta.avoid}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Step 1 · 先定问题层</p>
          <div className="mt-3">
            <IssueTypeSelector value={issueTypeValue} onChange={(value) => setForm("issueType", value)} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Step 2 · 补基础上下文</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <NativeSelect value={form.scenario ?? "openclaw"} onChange={(value) => setForm("scenario", value as DiagnoseInput["scenario"])} options={scenarios} />
            <Input value={form.provider ?? ""} onChange={(event) => setForm("provider", event.target.value)} placeholder="provider" />
            <Input value={form.model ?? ""} onChange={(event) => setForm("model", event.target.value)} placeholder="model" />
            <NativeSelect value={form.authMode ?? "unknown"} onChange={(value) => setForm("authMode", value)} options={authModes.map((item) => ({ label: item, value: item }))} />
            <NativeSelect value={form.transport ?? "auto"} onChange={(value) => setForm("transport", value)} options={transports.map((item) => ({ label: item, value: item }))} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Step 3 · 补现场证据</p>
            <span className="text-xs text-slate-400">越接近真实现场，结果越稳</span>
          </div>
          <div className="mt-3 grid gap-3">
            <Textarea value={form.configSnippet ?? ""} onChange={(event) => setForm("configSnippet", event.target.value)} placeholder="配置片段" className="min-h-28" />
            <Textarea value={form.errorText ?? ""} onChange={(event) => setForm("errorText", event.target.value)} placeholder="报错信息" className="min-h-28" />
            <Textarea value={form.symptomText ?? ""} onChange={(event) => setForm("symptomText", event.target.value)} placeholder="当前现象" />
            <Textarea value={form.expectedOutcome ?? ""} onChange={(event) => setForm("expectedOutcome", event.target.value)} placeholder="期望结果" />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">启动前检查</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
            {inputPriorityHints.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button className="rounded-full" onClick={onAnalyze}>开始诊断</Button>
          <Button variant="outline" className="rounded-full" onClick={onLoadExample}>载入示例</Button>
          <Button variant="outline" className="rounded-full" onClick={onReset}>清空</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TabletForm({ form, setForm, issueTypeValue, issueMeta, onAnalyze, onLoadExample, onReset }: FormProps) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-slate-950">输入</CardTitle>
        <CardDescription>先压层，再补上下文和现场证据。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pb-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">这次先盯</p>
            <p className="mt-2 text-sm font-medium text-slate-950">{issueMeta.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{issueMeta.focus}</p>
          </div>
          <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-amber-700">先别这样做</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{issueMeta.avoid}</p>
          </div>
        </div>
        <IssueTypeSelector value={issueTypeValue} onChange={(value) => setForm("issueType", value)} />
        <div className="grid gap-3 sm:grid-cols-2">
          <NativeSelect value={form.scenario ?? "openclaw"} onChange={(value) => setForm("scenario", value as DiagnoseInput["scenario"])} options={scenarios} />
          <Input value={form.provider ?? ""} onChange={(event) => setForm("provider", event.target.value)} placeholder="provider" />
          <Input value={form.model ?? ""} onChange={(event) => setForm("model", event.target.value)} placeholder="model" />
          <NativeSelect value={form.authMode ?? "unknown"} onChange={(value) => setForm("authMode", value)} options={authModes.map((item) => ({ label: item, value: item }))} />
          <NativeSelect value={form.transport ?? "auto"} onChange={(value) => setForm("transport", value)} options={transports.map((item) => ({ label: item, value: item }))} />
        </div>
        <div className="grid gap-3">
          <Textarea value={form.configSnippet ?? ""} onChange={(event) => setForm("configSnippet", event.target.value)} placeholder="配置片段" />
          <Textarea value={form.errorText ?? ""} onChange={(event) => setForm("errorText", event.target.value)} placeholder="报错信息" />
          <Textarea value={form.symptomText ?? ""} onChange={(event) => setForm("symptomText", event.target.value)} placeholder="当前现象" />
          <Textarea value={form.expectedOutcome ?? ""} onChange={(event) => setForm("expectedOutcome", event.target.value)} placeholder="期望结果" />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">最值钱输入</p>
          <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
            {inputPriorityHints.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button className="rounded-full" onClick={onAnalyze}>开始诊断</Button>
          <Button variant="outline" className="rounded-full" onClick={onLoadExample}>载入示例</Button>
          <Button variant="outline" className="rounded-full" onClick={onReset}>清空</Button>
        </div>
      </CardContent>
    </Card>
  );
}

type FormProps = {
  form: DiagnoseInput;
  setForm: <K extends keyof DiagnoseInput>(key: K, value: DiagnoseInput[K]) => void;
  issueTypeValue: DiagnoseIssueType;
  issueMeta: { label: string; focus: string; avoid: string };
  onAnalyze: () => void;
  onLoadExample: () => void;
  onReset: () => void;
};

function IssueTypeSelector({ value, onChange }: { value: DiagnoseIssueType; onChange: (value: DiagnoseIssueType) => void }) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {issueTypes.map((item) => {
        const selected = value === item.value;
        const meta = issueTypeMeta[item.value];
        return (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
              selected ? "border-sky-300 bg-sky-50 text-sky-900" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <p className="font-medium">{item.label}</p>
            <p className={`mt-1 text-xs leading-5 ${selected ? "text-sky-800" : "text-slate-500"}`}>{meta.focus}</p>
          </button>
        );
      })}
    </div>
  );
}

function NativeSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly { label: string; value: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-sky-400"
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}

function ResultCard({ result, onReset, onLoadExample }: { result: DiagnoseResult; onReset?: () => void; onLoadExample?: () => void }) {
  const issueMeta = issueTypeMeta[result.issueType];
  const primaryResource = result.recommendedResources?.find((item) => item.priority === "high") ?? result.recommendedResources?.[0];
  const primaryResourceHref = primaryResource ? resolveResourceHref(primaryResource.kind, primaryResource.title) : undefined;
  const primaryResourceLabel = primaryResource ? (primaryResource.kind === "template" ? "模板" : "文档") : undefined;
  const topWarning = result.missingInputs?.[0] ?? issueMeta.avoid;
  const topCause = result.causes[0];

  return (
    <Card className="rounded-3xl border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <CardTitle className="text-xl text-white">诊断结果</CardTitle>
          <Badge variant="secondary" className="border border-white/15 bg-white/10 text-slate-100">
            {issueMeta.label}
          </Badge>
          <Badge variant="secondary" className="border border-white/15 bg-white/10 text-slate-100">
            {result.riskLevel.toUpperCase()}
          </Badge>
        </div>
        <CardDescription className="text-sm leading-6 text-slate-300">{result.summary}</CardDescription>
        {result.confidenceNote && (
          <p className="rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-xs leading-5 text-slate-200">
            判断稳定性：{result.confidenceNote}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-5 pb-6">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">当前更像</p>
            <p className="mt-2 text-sm font-medium text-white">{issueMeta.label}</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">{issueMeta.focus}</p>
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

        {!!result.diagnosisBasis?.length && (
          <div>
            <h3 className="text-sm font-medium text-white">判断依据</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-300">
              {result.diagnosisBasis.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-white">当前最值得先处理的原因</h3>
          <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {result.causes.map((cause, index) => (
              <div key={cause.title} className={index === 0 ? "rounded-2xl border border-white/10 bg-white/5 p-4" : "rounded-2xl border border-white/10 bg-white/5 p-4"}>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-white">{cause.title}</p>
                  <Badge variant="outline" className="border-white/20 text-slate-100">
                    {cause.confidence.toUpperCase()}
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">{cause.reason}</p>
                {index === 0 && topCause ? <p className="mt-2 text-xs leading-5 text-cyan-100">优先从这个原因开始做最小验证。</p> : null}
              </div>
            ))}
          </div>
        </div>

        {!!result.missingInputs?.length && (
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
        )}

        <div>
          <h3 className="text-sm font-medium text-white">建议执行顺序</h3>
          <div className="mt-3 grid gap-3">
            {result.fixSteps.map((step) => (
              <div key={step.step} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950">
                      {step.step}
                    </span>
                    <p className="text-sm font-medium text-white">{step.action}</p>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-slate-100">
                    顺序 {step.step}
                  </Badge>
                </div>
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 px-3.5 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">为什么先做</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{step.why}</p>
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

        {!!result.scoreBreakdown?.length && (
          <div>
            <h3 className="text-sm font-medium text-white">归类评分解释</h3>
            <div className="mt-3 space-y-3">
              {result.scoreBreakdown.map((item, index) => {
                const maxScore = Math.max(...(result.scoreBreakdown ?? []).map((entry) => entry.score), 1);
                const width = `${Math.max((item.score / maxScore) * 100, item.score > 0 ? 18 : 8)}%`;
                return (
                  <div key={item.issueType} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">{item.label}</span>
                        {index === 0 ? (
                          <Badge variant="secondary" className="border border-white/15 bg-white/10 text-slate-100">
                            当前最高
                          </Badge>
                        ) : null}
                      </div>
                      <span className="text-xs font-medium text-slate-300">得分 {item.score}</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-sky-400 to-cyan-300" style={{ width }} />
                    </div>
                    <ul className="mt-3 space-y-1 text-xs leading-5 text-slate-300">
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>• {highlight}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {!!result.patternSignals?.length && (
          <div>
            <h3 className="text-sm font-medium text-white">典型失败信号模板</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              {result.patternSignals.map((item) => (
                <div key={item.title} className="rounded-2xl border border-rose-200/20 bg-rose-400/5 p-4">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!result.scenarioExamples?.length && (
          <div>
            <h3 className="text-sm font-medium text-white">相似场景参考</h3>
            <div className="mt-3 space-y-3">
              {result.scenarioExamples.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">场景：{item.context}</p>
                  <p className="mt-2 text-sm leading-6 text-cyan-100">判断重点：{item.implication}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {!!result.recommendedResources?.length && (
          <div>
            <h3 className="text-sm font-medium text-white">推荐资源优先级</h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {result.recommendedResources.map((resource) => {
                const href = resolveResourceHref(resource.kind, resource.title);
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
                    <p className="mt-2 text-sm leading-6 text-slate-300">{resource.reason}</p>
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
        )}

        <div>
          <h3 className="text-sm font-medium text-white">下一步与资源</h3>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {result.nextActions.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {result.relatedTemplates.map((item) => {
              const href = templateHrefByTitle.get(item);
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
              const href = resolveDocHref(item);
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

        {(onReset || onLoadExample) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {onLoadExample && <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={onLoadExample}>载入示例</Button>}
            {onReset && <Button variant="outline" className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white" onClick={onReset}>重新开始</Button>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
