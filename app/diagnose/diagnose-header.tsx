import { Badge } from "@/components/ui/badge";
import type { DiagnoseIssueMeta } from "./diagnose-content";

type DiagnoseHeaderProps = {
  currentIssueMeta: DiagnoseIssueMeta;
  inputPriorityHints: readonly string[];
  onJumpToInput: () => void;
  onJumpToResult: () => void;
  onJumpToExamples: () => void;
};

export function DiagnoseHeader({ currentIssueMeta, inputPriorityHints, onJumpToInput, onJumpToResult, onJumpToExamples }: DiagnoseHeaderProps) {
  return (
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
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
        <button onClick={onJumpToInput} className="inline-flex items-center gap-1 font-medium text-indigo-700 transition hover:text-violet-700">
          <span>直接开始输入</span>
          <span aria-hidden>→</span>
        </button>
        <button onClick={onJumpToResult} className="inline-flex items-center gap-1 font-medium text-indigo-700 transition hover:text-violet-700">
          <span>看当前结果</span>
          <span aria-hidden>→</span>
        </button>
        <button onClick={onJumpToExamples} className="inline-flex items-center gap-1 font-medium text-slate-600 transition hover:text-slate-900">
          <span>需要时再看示例</span>
          <span aria-hidden>→</span>
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-indigo-50/80 px-4 py-3">
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
  );
}
