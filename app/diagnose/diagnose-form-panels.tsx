import type { ReactNode } from "react";
import type { DiagnoseIssueMeta, DiagnoseOption } from "./diagnose-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { DiagnoseInput, DiagnoseIssueType } from "@/types/diagnose";

export type DiagnoseFormSetter = <K extends keyof DiagnoseInput>(key: K, value: DiagnoseInput[K]) => void;

type DiagnoseFormPanelProps = {
  form: DiagnoseInput;
  setForm: DiagnoseFormSetter;
  issueTypeValue: DiagnoseIssueType;
  issueMeta: DiagnoseIssueMeta;
  issueTypes: readonly DiagnoseOption<DiagnoseIssueType>[];
  issueTypeMeta: Record<DiagnoseIssueType, DiagnoseIssueMeta>;
  scenarios: readonly DiagnoseOption<NonNullable<DiagnoseInput["scenario"]>>[];
  authModes: readonly string[];
  transports: readonly string[];
  inputPriorityHints: readonly string[];
  onAnalyze: () => void;
  onLoadExample: () => void;
  onReset: () => void;
  isPending: boolean;
};

type DiagnoseMobileFlowProps = DiagnoseFormPanelProps & {
  mobileStep: number;
  onStepChange: (step: number) => void;
  resultPanel: ReactNode;
};

export function DiagnoseMobileFlow({
  form,
  setForm,
  issueTypeValue,
  issueTypes,
  scenarios,
  authModes,
  transports,
  onAnalyze,
  onLoadExample,
  mobileStep,
  onStepChange,
  isPending,
  resultPanel,
}: DiagnoseMobileFlowProps) {
  return (
    <div id="diagnose-input-mobile" className="space-y-6 md:hidden">
      {mobileStep === 1 ? (
        <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-950">第 1 步：选择问题类型</CardTitle>
            <CardDescription>先确定问题属于哪一层，后面的诊断结果会更稳。</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 pb-6">
            {issueTypes.map((item) => (
              <button
                key={item.value}
                onClick={() => setForm("issueType", item.value)}
                className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  issueTypeValue === item.value ? "border-violet-300 bg-indigo-50 text-indigo-900" : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <Button className="mt-2 rounded-full" onClick={() => onStepChange(2)}>
              下一步
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {mobileStep === 2 ? (
        <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-950">第 2 步：填写基础信息</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 pb-6">
            <BaseContextFields form={form} setForm={setForm} scenarios={scenarios} authModes={authModes} transports={transports} />
            <div className="mt-2 flex gap-3">
              <Button variant="outline" className="rounded-full" onClick={() => onStepChange(1)}>
                上一步
              </Button>
              <Button className="rounded-full" onClick={() => onStepChange(3)}>
                下一步
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {mobileStep === 3 ? (
        <Card className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-950">第 3 步：输入配置 / 报错</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 pb-6">
            <EvidenceFields form={form} setForm={setForm} compact />
            <div className="mt-2 flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full" onClick={() => onStepChange(2)}>
                上一步
              </Button>
              <Button variant="outline" className="rounded-full" onClick={onLoadExample}>
                载入示例
              </Button>
              <Button className="rounded-full" onClick={onAnalyze} disabled={isPending}>
                开始诊断
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {mobileStep === 4 ? resultPanel : null}
    </div>
  );
}

export function DiagnoseDesktopForm(props: DiagnoseFormPanelProps) {
  const { issueMeta, inputPriorityHints } = props;

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-slate-950">输入</CardTitle>
        <CardDescription>先定问题层，再补现场上下文和最小证据，不靠一句“不对”硬猜。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pb-6">
        <IssueMetaStrip issueMeta={issueMeta} />

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Step 1 · 先定问题层</p>
          <div className="mt-3">
            <IssueTypeSelector value={props.issueTypeValue} onChange={(value) => props.setForm("issueType", value)} issueTypes={props.issueTypes} issueTypeMeta={props.issueTypeMeta} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Step 2 · 补基础上下文</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <BaseContextFields form={props.form} setForm={props.setForm} scenarios={props.scenarios} authModes={props.authModes} transports={props.transports} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">Step 3 · 补现场证据</p>
            <span className="text-xs text-slate-400">越接近真实现场，结果越稳</span>
          </div>
          <div className="mt-3 grid gap-3">
            <EvidenceFields form={props.form} setForm={props.setForm} withTallTextareas />
          </div>
        </div>

        <PriorityHintsCard title="启动前检查" hints={inputPriorityHints} />
        <FormActionRow onAnalyze={props.onAnalyze} onLoadExample={props.onLoadExample} onReset={props.onReset} isPending={props.isPending} />
      </CardContent>
    </Card>
  );
}

export function DiagnoseTabletForm(props: DiagnoseFormPanelProps) {
  return (
    <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl text-slate-950">输入</CardTitle>
        <CardDescription>先压层，再补上下文和现场证据。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 pb-6">
        <IssueMetaStrip issueMeta={props.issueMeta} compact />
        <IssueTypeSelector value={props.issueTypeValue} onChange={(value) => props.setForm("issueType", value)} issueTypes={props.issueTypes} issueTypeMeta={props.issueTypeMeta} />
        <div className="grid gap-3 sm:grid-cols-2">
          <BaseContextFields form={props.form} setForm={props.setForm} scenarios={props.scenarios} authModes={props.authModes} transports={props.transports} />
        </div>
        <div className="grid gap-3">
          <EvidenceFields form={props.form} setForm={props.setForm} compact />
        </div>
        <PriorityHintsCard title="最值钱输入" hints={props.inputPriorityHints} />
        <FormActionRow onAnalyze={props.onAnalyze} onLoadExample={props.onLoadExample} onReset={props.onReset} isPending={props.isPending} />
      </CardContent>
    </Card>
  );
}

function IssueMetaStrip({ issueMeta, compact = false }: { issueMeta: DiagnoseIssueMeta; compact?: boolean }) {
  return (
    <div className={`grid gap-3 ${compact ? "sm:grid-cols-2" : "xl:grid-cols-2"}`}>
      <div className="rounded-2xl border border-slate-200 bg-indigo-50/80 px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">这轮先盯</p>
        <p className="mt-2 text-sm font-medium text-slate-950">{issueMeta.label}</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">{issueMeta.focus}</p>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50/80 px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-amber-700">别先这样做</p>
        <p className="mt-2 text-sm leading-6 text-slate-700">{issueMeta.avoid}</p>
      </div>
    </div>
  );
}

function BaseContextFields({
  form,
  setForm,
  scenarios,
  authModes,
  transports,
}: {
  form: DiagnoseInput;
  setForm: DiagnoseFormSetter;
  scenarios: readonly DiagnoseOption<NonNullable<DiagnoseInput["scenario"]>>[];
  authModes: readonly string[];
  transports: readonly string[];
}) {
  return (
    <>
      <NativeSelect value={form.scenario ?? "openclaw"} onChange={(value) => setForm("scenario", value as DiagnoseInput["scenario"])} options={scenarios} />
      <Input value={form.provider ?? ""} onChange={(event) => setForm("provider", event.target.value)} placeholder="provider" />
      <Input value={form.model ?? ""} onChange={(event) => setForm("model", event.target.value)} placeholder="model" />
      <NativeSelect value={form.authMode ?? "unknown"} onChange={(value) => setForm("authMode", value)} options={authModes.map((item) => ({ label: item, value: item }))} />
      <NativeSelect value={form.transport ?? "auto"} onChange={(value) => setForm("transport", value)} options={transports.map((item) => ({ label: item, value: item }))} />
    </>
  );
}

function EvidenceFields({
  form,
  setForm,
  withTallTextareas = false,
  compact = false,
}: {
  form: DiagnoseInput;
  setForm: DiagnoseFormSetter;
  withTallTextareas?: boolean;
  compact?: boolean;
}) {
  const tallClass = withTallTextareas ? "min-h-28" : undefined;
  const maybeCompactClass = compact ? "min-h-24" : tallClass;

  return (
    <>
      <Textarea value={form.configSnippet ?? ""} onChange={(event) => setForm("configSnippet", event.target.value)} placeholder="配置片段" className={maybeCompactClass} />
      <Textarea value={form.errorText ?? ""} onChange={(event) => setForm("errorText", event.target.value)} placeholder="报错信息" className={maybeCompactClass} />
      <Textarea value={form.symptomText ?? ""} onChange={(event) => setForm("symptomText", event.target.value)} placeholder="当前现象" />
      <Textarea value={form.expectedOutcome ?? ""} onChange={(event) => setForm("expectedOutcome", event.target.value)} placeholder="期望结果" />
    </>
  );
}

function PriorityHintsCard({ title, hints }: { title: string; hints: readonly string[] }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-indigo-50/80 px-4 py-3">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{title}</p>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
        {hints.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </div>
  );
}

function FormActionRow({
  onAnalyze,
  onLoadExample,
  onReset,
  isPending,
}: {
  onAnalyze: () => void;
  onLoadExample: () => void;
  onReset: () => void;
  isPending: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button className="rounded-full" onClick={onAnalyze} disabled={isPending}>
        开始诊断
      </Button>
      <Button variant="outline" className="rounded-full" onClick={onLoadExample}>
        载入示例
      </Button>
      <Button variant="outline" className="rounded-full" onClick={onReset}>
        清空
      </Button>
    </div>
  );
}

function IssueTypeSelector({
  value,
  onChange,
  issueTypes,
  issueTypeMeta,
}: {
  value: DiagnoseIssueType;
  onChange: (value: DiagnoseIssueType) => void;
  issueTypes: readonly DiagnoseOption<DiagnoseIssueType>[];
  issueTypeMeta: Record<DiagnoseIssueType, DiagnoseIssueMeta>;
}) {
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
              selected ? "border-violet-300 bg-indigo-50 text-indigo-900" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <p className="font-medium">{item.label}</p>
            <p className={`mt-1 text-xs leading-5 ${selected ? "text-indigo-800" : "text-slate-500"}`}>{meta.focus}</p>
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
      className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-violet-400"
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
