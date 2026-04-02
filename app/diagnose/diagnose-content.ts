import { docsCatalog } from "@/data/docs/catalog";
import { templatesCatalog } from "@/data/templates/catalog";
import type { DiagnoseInput, DiagnoseIssueType, DiagnoseResult } from "@/types/diagnose";

export type DiagnoseOption<T extends string> = {
  label: string;
  value: T;
};

export type DiagnoseIssueMeta = {
  label: string;
  focus: string;
  avoid: string;
};

export type DiagnoseHintLink = {
  title: string;
  detail: string;
  href: string;
  label: string;
};

export type DiagnoseExampleCase = {
  title: string;
  description: string;
  entry: { label: string; href: string };
  form: DiagnoseInput;
};

export type PreparedDiagnoseExampleCase = DiagnoseExampleCase & {
  result: DiagnoseResult;
};

export type DiagnoseResourceHrefLookup = {
  templateByTitle: Record<string, string>;
  docByTitle: Record<string, string>;
};

export type DiagnosePageData = {
  issueTypes: readonly DiagnoseOption<DiagnoseIssueType>[];
  scenarios: readonly DiagnoseOption<NonNullable<DiagnoseInput["scenario"]>>[];
  authModes: readonly string[];
  transports: readonly string[];
  issueTypeMeta: Record<DiagnoseIssueType, DiagnoseIssueMeta>;
  inputPriorityHints: readonly string[];
  adjacentBranchHints: Record<DiagnoseIssueType, DiagnoseHintLink[]>;
  verificationMismatchHints: Record<DiagnoseIssueType, DiagnoseHintLink[]>;
  scenarioRouteHints: Partial<Record<NonNullable<DiagnoseInput["scenario"]>, DiagnoseHintLink[]>>;
  diagnoseExampleCases: readonly DiagnoseExampleCase[];
  initialForm: DiagnoseInput;
  resetForm: DiagnoseInput;
  resourceHrefLookup: DiagnoseResourceHrefLookup;
};

const issueTypes: readonly DiagnoseOption<DiagnoseIssueType>[] = [
  { label: "模型连接问题", value: "model_connection" },
  { label: "配置不生效", value: "config_not_applied" },
  { label: "模型切换 / Session 异常", value: "model_switch_session_mismatch" },
  { label: "本地助手 / 工具接入问题", value: "local_tool_integration" },
];

const scenarios: readonly DiagnoseOption<NonNullable<DiagnoseInput["scenario"]>>[] = [
  { label: "OpenClaw", value: "openclaw" },
  { label: "Control UI", value: "control_ui" },
  { label: "本地 AI 助手", value: "local_ai_assistant" },
  { label: "桌面工具 / Wrapper", value: "desktop_wrapper" },
  { label: "自动化工作流", value: "workflow_automation" },
  { label: "MCP / 工具链", value: "mcp_tooling" },
  { label: "其他", value: "other" },
];

const authModes = ["oauth", "api_key", "env", "auth_profile", "unknown"] as const;
const transports = ["auto", "websocket", "sse", "http", "unknown"] as const;

const issueTypeMeta: Record<DiagnoseIssueType, DiagnoseIssueMeta> = {
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

const adjacentBranchHints: Record<DiagnoseIssueType, DiagnoseHintLink[]> = {
  model_connection: [
    {
      title: "如果最小请求已经能通，就别继续卡在连接层",
      detail: "这时更可能是配置没落到运行态，或 session 仍沿用旧结果。",
      href: "/docs/troubleshooting",
      label: "转排障顺序",
    },
    {
      title: "如果入口能点但结果链路还是空的",
      detail: "更像工具接入或 wrapper / MCP 链路问题，而不是 provider 本身不可用。",
      href: "/use-cases/desktop-tool-integration",
      label: "看接入场景",
    },
  ],
  config_not_applied: [
    {
      title: "如果新会话里也完全没变化",
      detail: "别只怀疑 refresh；也可能是你一开始改错层，或者其实是 session 错配。",
      href: "/use-cases/model-switch-debug",
      label: "看模型切换场景",
    },
    {
      title: "如果配置看起来对，但请求本身一直失败",
      detail: "那更像连接层问题，先做最小连通性验证。",
      href: "/templates/model-connection-debug",
      label: "看连接排查模板",
    },
  ],
  model_switch_session_mismatch: [
    {
      title: "如果最小请求都打不出去，就不是 session 先出问题",
      detail: "先回连接层，排 provider / auth / transport。",
      href: "/templates/model-connection-debug",
      label: "回连接排查",
    },
    {
      title: "如果新会话和重开页面后仍完全没变化",
      detail: "别只盯 session，也可能是配置覆盖或持久化链路没更新。",
      href: "/docs/troubleshooting",
      label: "看排障顺序",
    },
  ],
  local_tool_integration: [
    {
      title: "如果开发态正常、正式包异常",
      detail: "更像桌面壳 / preload / 权限 / 路径问题，而不是模型层问题。",
      href: "/use-cases/desktop-tool-integration",
      label: "看桌面接入场景",
    },
    {
      title: "如果工具链路正常但输出仍旧不对",
      detail: "先回 Diagnose 看是不是又滑回配置层或 session 层。",
      href: "/docs/troubleshooting",
      label: "回排障顺序",
    },
  ],
};

const verificationMismatchHints: Record<DiagnoseIssueType, DiagnoseHintLink[]> = {
  model_connection: [
    {
      title: "验证发现请求其实能通",
      detail: "那就别继续在 auth / transport 上放大动作，优先转配置或 session 分支。",
      href: "/docs/troubleshooting",
      label: "转排障顺序",
    },
    {
      title: "验证发现入口层才是问题",
      detail: "如果 provider 正常但入口不可用，更像桌面 / MCP / 工具接入层。",
      href: "/use-cases/desktop-tool-integration",
      label: "看接入场景",
    },
  ],
  config_not_applied: [
    {
      title: "验证发现配置其实已经生效",
      detail: "那就别再纠结配置层，优先回 session 或显示层错配。",
      href: "/use-cases/model-switch-debug",
      label: "看切换场景",
    },
    {
      title: "验证发现每次结果都像换模型失败",
      detail: "更可能是连接层或 provider 层，而不是单纯配置没吃进去。",
      href: "/templates/model-connection-debug",
      label: "看连接模板",
    },
  ],
  model_switch_session_mismatch: [
    {
      title: "验证发现最小请求都失败",
      detail: "这说明 session 不是首因，应先回连接层判断。",
      href: "/templates/model-connection-debug",
      label: "回连接排查",
    },
    {
      title: "验证发现新会话已经正常，但正式链路仍不稳",
      detail: "别继续盯 session，先收口到模板 / 排障顺序层。",
      href: "/docs/troubleshooting",
      label: "看排障顺序",
    },
  ],
  local_tool_integration: [
    {
      title: "验证发现底层链路正常，但入口行为仍怪",
      detail: "说明问题更像产品化接入或场景组织，不是基础模型问题。",
      href: "/use-cases/desktop-tool-integration",
      label: "看桌面场景",
    },
    {
      title: "验证发现结果内容不对而不是入口失效",
      detail: "那就先回 Diagnose，看是不是又滑回配置层或 session 层。",
      href: "/diagnose",
      label: "回 Diagnose",
    },
  ],
};

const scenarioRouteHints: Partial<Record<NonNullable<DiagnoseInput["scenario"]>, DiagnoseHintLink[]>> = {
  control_ui: [
    {
      title: "Control UI 场景优先补哪层",
      detail: "如果切换结果和页面显示不一致，先看 Session / Troubleshooting，不要先怀疑文案层。",
      href: "/docs/troubleshooting",
      label: "看排障顺序",
    },
    {
      title: "Control UI 里方向清楚后去哪",
      detail: "方向明确就直接切到模型切换模板，不继续停在解释层。",
      href: "/templates/model-switch-session-mismatch",
      label: "看切换模板",
    },
  ],
  openclaw: [
    {
      title: "OpenClaw 场景更该先核哪层",
      detail: "优先核配置生效路径与覆盖优先级，再决定是否继续改模型入口。",
      href: "/docs/product-notes",
      label: "补边界说明",
    },
    {
      title: "OpenClaw 方向清楚后去哪",
      detail: "先回模板中心或 OpenClaw 起步模板，把判断压成执行顺序。",
      href: "/templates/openclaw-bootstrap",
      label: "看 OpenClaw 模板",
    },
  ],
  desktop_wrapper: [
    {
      title: "桌面封装场景先别只盯 UI",
      detail: "先核开发态 / 打包态最小闭环，再看入口视觉是否正确。",
      href: "/use-cases/desktop-tool-integration",
      label: "看桌面场景",
    },
    {
      title: "桌面接入方向明确后去哪",
      detail: "优先走桌面接入模板，把依赖、入口、回调链路按顺序收清。",
      href: "/templates/desktop-tool-integration",
      label: "看桌面模板",
    },
  ],
  workflow_automation: [
    {
      title: "自动化场景先看主链，不先扩复杂分支",
      detail: "先用最小流程证明输入 / 输出闭环，再决定是否加 cron 或多入口。",
      href: "/use-cases/workflow-automation",
      label: "看自动化场景",
    },
    {
      title: "自动化方向稳定后去哪",
      detail: "回 AI 工作流起步模板，把流程、验证和回退点真正固定下来。",
      href: "/templates/ai-workflow-starter",
      label: "看工作流模板",
    },
  ],
  mcp_tooling: [
    {
      title: "MCP / 工具链优先核哪层",
      detail: "先确认 effective inventory、注册和回调链路，不要被入口可见性误导。",
      href: "/docs/troubleshooting",
      label: "看排障顺序",
    },
  ],
  local_ai_assistant: [
    {
      title: "本地助手场景先保最小闭环",
      detail: "先保一个真实任务能跑通，再考虑继续叠记忆、工具和自动化层。",
      href: "/use-cases/local-ai-assistant",
      label: "看本地助手场景",
    },
  ],
};

const diagnoseExampleCases: readonly DiagnoseExampleCase[] = [
  {
    title: "UI 已切模型，但当前会话还是旧模型",
    description: "适合先看 session / 运行态错配，而不是继续怀疑 provider 本身。",
    entry: { label: "看模型切换异常模板", href: "/templates/model-switch-session-mismatch" },
    form: {
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
    },
  },
  {
    title: "配置写了，但运行结果还是旧值",
    description: "适合先查配置优先级、覆盖层和运行态刷新，而不是继续叠改动。",
    entry: { label: "看配置不生效模板", href: "/templates/config-not-applied" },
    form: {
      issueType: "config_not_applied",
      scenario: "openclaw",
      provider: "relay",
      model: "relay/gpt-5.4",
      authMode: "auth_profile",
      transport: "auto",
      symptomText: "改了 defaults 配置，但实际回复表现还是旧参数",
      errorText: "没有显式报错，但行为没有变化",
      configSnippet: "agents.defaults.model.primary = relay/gpt-5.4",
      expectedOutcome: "重启或新会话后真实吃到新配置",
    },
  },
  {
    title: "按钮和入口都在，但执行链路没真的通",
    description: "适合先确认工具可见性、权限范围和最小真实调用，而不是继续做展示层。",
    entry: { label: "看桌面/接入模板", href: "/templates/desktop-tool-integration" },
    form: {
      issueType: "local_tool_integration",
      scenario: "desktop_wrapper",
      provider: "openai",
      model: "gpt-5.4",
      authMode: "api_key",
      transport: "http",
      symptomText: "入口按钮可见，但点击后没有真实返回或没有调用痕迹",
      errorText: "桌面壳里无明显报错，打包后行为和开发态不一致",
      configSnippet: "wrapper exposes tool entry but runtime inventory seems empty",
      expectedOutcome: "入口存在且能稳定触发一次真实能力调用",
    },
  },
];

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

const resetForm: DiagnoseInput = {
  issueType: "config_not_applied",
  scenario: "openclaw",
  symptomText: "改了配置但还是旧结果",
};

function buildResourceHrefLookup(): DiagnoseResourceHrefLookup {
  const templateByTitle = templatesCatalog.reduce<Record<string, string>>((acc, item) => {
    acc[item.title] = `/templates/${item.slug}`;
    return acc;
  }, {});

  const docByTitle = docsCatalog.reduce<Record<string, string>>((acc, item) => {
    const href = `/docs/${item.slug}`;
    acc[item.title] = href;

    for (const alias of item.aliases ?? []) {
      acc[alias] = href;
    }

    return acc;
  }, {});

  return { templateByTitle, docByTitle };
}

export function getDiagnosePageData(): DiagnosePageData {
  return {
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
    resetForm,
    resourceHrefLookup: buildResourceHrefLookup(),
  };
}
