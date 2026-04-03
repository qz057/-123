import Link from "next/link";
import type { PreparedDiagnoseExampleCase } from "./diagnose-content";
import { Button } from "@/components/ui/button";

type DiagnoseExampleCasesProps = {
  diagnoseExampleCases: readonly PreparedDiagnoseExampleCase[];
  onApplyExample: (example: PreparedDiagnoseExampleCase) => void;
};

export function DiagnoseExampleCases({ diagnoseExampleCases, onApplyExample }: DiagnoseExampleCasesProps) {
  return (
    <section id="diagnose-examples" className="mt-8 rounded-[28px] border border-slate-200 bg-indigo-50/70 p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Example cases</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950 sm:text-xl">如果你不想从空白输入开始，再从这些典型现场起步</h2>
        </div>
        <p className="hidden max-w-md text-sm leading-6 text-slate-500 lg:block">这层放到后面，是为了先让你直接进入输入动作；只有需要时再借示例起步。</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {diagnoseExampleCases.map((example, index) => (
          <div
            key={example.title}
            className={index === 0 ? "rounded-[24px] border border-slate-200 bg-indigo-950 p-3.5 text-white shadow-sm fd-dark-card" : "rounded-[24px] border border-slate-200 bg-white p-3.5 shadow-sm fd-glass-card"}
          >
            <p className={index === 0 ? "text-sm font-medium text-white" : "text-sm font-medium text-slate-950"}>{example.title}</p>
            <p className={index === 0 ? "mt-2 text-sm leading-6 text-slate-300" : "mt-2 text-sm leading-6 text-slate-600"}>{example.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Button
                variant={index === 0 ? "secondary" : "outline"}
                className={index === 0 ? "rounded-full border border-white/15 bg-white text-slate-950 hover:bg-slate-100" : "rounded-full"}
                onClick={() => onApplyExample(example)}
              >
                载入并看结果
              </Button>
              <Link
                href={example.entry.href}
                className={index === 0 ? "inline-flex items-center gap-1 text-sm font-medium text-violet-200 transition hover:text-white" : "inline-flex items-center gap-1 text-sm font-medium text-indigo-700 transition hover:text-violet-700"}
              >
                <span>{example.entry.label}</span>
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
