export type DiagnoseIssueType =
  | "model_connection"
  | "config_not_applied"
  | "model_switch_session_mismatch"
  | "local_tool_integration";

export type DiagnoseScenario =
  | "openclaw"
  | "control_ui"
  | "local_ai_assistant"
  | "desktop_wrapper"
  | "workflow_automation"
  | "mcp_tooling"
  | "other";

export type RiskLevel = "high" | "medium" | "low";

export type DiagnoseInput = {
  issueType?: DiagnoseIssueType;
  scenario?: DiagnoseScenario;
  provider?: string;
  model?: string;
  authMode?: string;
  transport?: string;
  symptomText?: string;
  errorText?: string;
  configSnippet?: string;
  expectedOutcome?: string;
};

export type DiagnoseScoreBreakdownItem = {
  issueType: DiagnoseIssueType;
  label: string;
  score: number;
  highlights: string[];
};

export type DiagnoseRecommendedResource = {
  kind: "template" | "doc";
  title: string;
  priority: "high" | "medium";
  reason: string;
};

export type DiagnosePatternSignal = {
  title: string;
  description: string;
};

export type DiagnoseScenarioExample = {
  title: string;
  context: string;
  implication: string;
};

export type DiagnoseResult = {
  issueType: DiagnoseIssueType;
  riskLevel: RiskLevel;
  summary: string;
  causes: {
    title: string;
    confidence: RiskLevel;
    reason: string;
  }[];
  fixSteps: {
    step: number;
    action: string;
    why: string;
    verify: string;
  }[];
  nextActions: string[];
  relatedTemplates: string[];
  relatedDocs: string[];
  diagnosisBasis?: string[];
  missingInputs?: string[];
  confidenceNote?: string;
  scoreBreakdown?: DiagnoseScoreBreakdownItem[];
  recommendedResources?: DiagnoseRecommendedResource[];
  patternSignals?: DiagnosePatternSignal[];
  scenarioExamples?: DiagnoseScenarioExample[];
};
