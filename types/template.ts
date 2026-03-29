export type TemplateCategory = "搭建类" | "排障类" | "自动化类" | "产品化类";
export type TemplateDifficulty = "新手" | "进阶" | "技术向";

export type FlowDockTemplateCase = {
  context: string;
  action: string;
  outcome: string;
};

export type FlowDockTemplate = {
  slug: string;
  title: string;
  category: TemplateCategory;
  difficulty: TemplateDifficulty;
  summary: string;
  audience: string[];
  problem: string;
  scenario: string;
  fitSignals: string[];
  notFitSignals: string[];
  prerequisites: string[];
  inputs: string[];
  outputs: string[];
  steps: string[];
  failureSignals: string[];
  rollbackSteps: string[];
  caseExample: FlowDockTemplateCase;
  faqs: string[];
  relatedTemplates: string[];
  relatedDocs: string[];
};
