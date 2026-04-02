"use client";

import { DiagnoseExampleCases } from "./diagnose-example-cases";
import { DiagnoseDesktopForm, DiagnoseMobileFlow, DiagnoseTabletForm } from "./diagnose-form-panels";
import { DiagnoseHeader } from "./diagnose-header";
import { DiagnoseResultPanel } from "./diagnose-result-panel";
import { useDiagnoseFlow } from "./use-diagnose-flow";
import type {
  DiagnoseHintLink,
  DiagnoseIssueMeta,
  DiagnoseOption,
  DiagnoseResourceHrefLookup,
  PreparedDiagnoseExampleCase,
} from "./diagnose-content";
import type { DiagnoseInput, DiagnoseIssueType, DiagnoseResult } from "@/types/diagnose";

type DiagnoseClientPageProps = {
  issueTypes: readonly DiagnoseOption<DiagnoseIssueType>[];
  scenarios: readonly DiagnoseOption<NonNullable<DiagnoseInput["scenario"]>>[];
  authModes: readonly string[];
  transports: readonly string[];
  issueTypeMeta: Record<DiagnoseIssueType, DiagnoseIssueMeta>;
  inputPriorityHints: readonly string[];
  adjacentBranchHints: Record<DiagnoseIssueType, DiagnoseHintLink[]>;
  verificationMismatchHints: Record<DiagnoseIssueType, DiagnoseHintLink[]>;
  scenarioRouteHints: Partial<Record<NonNullable<DiagnoseInput["scenario"]>, DiagnoseHintLink[]>>;
  diagnoseExampleCases: readonly PreparedDiagnoseExampleCase[];
  initialForm: DiagnoseInput;
  initialResult: DiagnoseResult;
  resetForm: DiagnoseInput;
  resetResult: DiagnoseResult;
  resourceHrefLookup: DiagnoseResourceHrefLookup;
};

export function DiagnoseClientPage({
  issueTypes,
  scenarios,
  authModes,
  transports,
  issueTypeMeta,
  inputPriorityHints,
  adjacentBranchHints,
  verificationMismatchHints,
  scenarioRouteHints,
  diagnoseExampleCases,
  initialForm,
  initialResult,
  resetForm,
  resetResult,
  resourceHrefLookup,
}: DiagnoseClientPageProps) {
  const {
    form,
    result,
    mobileStep,
    isPending,
    setMobileStep,
    updateField,
    runDiagnose,
    loadExample,
    applyExample,
    resetCurrentForm,
  } = useDiagnoseFlow({
    initialForm,
    initialResult,
    resetForm,
    resetResult,
  });

  const issueTypeValue = form.issueType ?? "config_not_applied";
  const currentIssueMeta = issueTypeMeta[issueTypeValue];

  function jumpToAny(ids: string[]) {
    for (const id of ids) {
      const node = document.getElementById(id);
      if (node) {
        node.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
  }

  const resultPanel = (
    <DiagnoseResultPanel
      result={result}
      currentScenario={form.scenario}
      isPending={isPending}
      issueTypeMeta={issueTypeMeta}
      scenarios={scenarios}
      adjacentBranchHints={adjacentBranchHints}
      verificationMismatchHints={verificationMismatchHints}
      scenarioRouteHints={scenarioRouteHints}
      diagnoseExampleCases={diagnoseExampleCases}
      resourceHrefLookup={resourceHrefLookup}
      onApplyExample={applyExample}
      onReset={resetCurrentForm}
      onLoadExample={loadExample}
      onJumpToExamples={() => jumpToAny(["diagnose-examples"])}
      onJumpToInput={() => jumpToAny(["diagnose-input-mobile", "diagnose-input-tablet", "diagnose-input-desktop"])}
    />
  );

  const formPanelProps = {
    form,
    setForm: updateField,
    issueTypeValue,
    issueMeta: currentIssueMeta,
    issueTypes,
    issueTypeMeta,
    scenarios,
    authModes,
    transports,
    inputPriorityHints,
    onAnalyze: runDiagnose,
    onLoadExample: loadExample,
    onReset: resetCurrentForm,
    isPending,
  };

  return (
    <div className="fd-page-chrome mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <DiagnoseHeader
        currentIssueMeta={currentIssueMeta}
        inputPriorityHints={inputPriorityHints}
        onJumpToInput={() => jumpToAny(["diagnose-input-mobile", "diagnose-input-tablet", "diagnose-input-desktop"])}
        onJumpToResult={() => jumpToAny(["diagnose-result-panel"])}
        onJumpToExamples={() => jumpToAny(["diagnose-examples"])}
      />

      <DiagnoseMobileFlow {...formPanelProps} mobileStep={mobileStep} onStepChange={setMobileStep} resultPanel={resultPanel} />

      <div id="diagnose-input-desktop" className="hidden lg:grid lg:grid-cols-[0.92fr_1.08fr] lg:gap-6">
        <DiagnoseDesktopForm {...formPanelProps} />
        {resultPanel}
      </div>

      <div id="diagnose-input-tablet" className="hidden space-y-6 md:block lg:hidden">
        <DiagnoseTabletForm {...formPanelProps} />
        {resultPanel}
      </div>

      <DiagnoseExampleCases diagnoseExampleCases={diagnoseExampleCases} onApplyExample={applyExample} />
    </div>
  );
}
