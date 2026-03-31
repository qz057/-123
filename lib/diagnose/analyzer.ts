import type {
  DiagnoseInput,
  DiagnoseIssueType,
  DiagnoseRecommendedResource,
  DiagnoseResult,
  DiagnoseScenario,
  DiagnoseScenarioExample,
  DiagnoseScoreBreakdownItem,
  DiagnosePatternSignal,
} from "@/types/diagnose";

const issueTypeLabels: Record<DiagnoseIssueType, string> = {
  model_connection: "模型连接问题",
  config_not_applied: "配置不生效",
  model_switch_session_mismatch: "模型切换 / Session 异常",
  local_tool_integration: "本地助手 / 工具接入问题",
};

const keywordGroups: Record<DiagnoseIssueType, string[]> = {
  model_connection: [
    "401",
    "403",
    "429",
    "unauthorized",
    "forbidden",
    "invalid api key",
    "oauth",
    "token",
    "timeout",
    "cannot connect",
    "connection failed",
    "model not found",
    "provider not found",
    "连接失败",
    "连不上",
    "认证失败",
    "鉴权失败",
    "请求超时",
    "网络错误",
    "gateway timeout",
    "rate limit",
    "dns",
    "握手失败",
    "websocket",
    "sse",
  ],
  config_not_applied: [
    "不生效",
    "没生效",
    "没反应",
    "还是旧的",
    "参数没变",
    "明明写了",
    "配置没加载",
    "读取旧配置",
    "没有吃进去",
    "覆盖",
    "优先级",
    "env 覆盖",
    "缓存",
    "reload",
    "hot reload",
    "restart",
    "default",
  ],
  model_switch_session_mismatch: [
    "切了模型",
    "切换后",
    "session",
    "会话",
    "当前会话",
    "新会话",
    "还是 relay",
    "还是旧模型",
    "模型没变",
    "显示是",
    "实测是",
    "thinking",
    "reasoning",
    "ui 显示",
    "显示切换",
    "xhigh",
  ],
  local_tool_integration: [
    "mcp",
    "mcp server",
    "desktop",
    "wrapper",
    "tool",
    "接不上",
    "插件",
    "integration",
    "本地助手",
    "automation",
    "workflow",
    "stdio",
    "命令不存在",
    "插件加载失败",
    "工具不可用",
  ],
};

const scenarioBoostMap: Partial<Record<DiagnoseScenario, Partial<Record<DiagnoseIssueType, number>>>> = {
  control_ui: {
    model_switch_session_mismatch: 2,
    config_not_applied: 1,
  },
  openclaw: {
    config_not_applied: 2,
    model_connection: 1,
  },
  mcp_tooling: {
    local_tool_integration: 3,
    model_connection: 1,
  },
  desktop_wrapper: {
    local_tool_integration: 2,
    model_switch_session_mismatch: 1,
  },
  workflow_automation: {
    local_tool_integration: 2,
    config_not_applied: 1,
  },
  local_ai_assistant: {
    local_tool_integration: 1,
    model_connection: 1,
  },
};

const templateMap: Record<DiagnoseIssueType, string[]> = {
  model_connection: ["模型连接排障模板", "OpenClaw 初次搭建模板"],
  config_not_applied: ["配置不生效排查模板", "AI 工作流起步模板"],
  model_switch_session_mismatch: ["模型切换 / Session 异常模板", "模型连接排障模板"],
  local_tool_integration: ["桌面工具接入模板", "本地 AI 助手起步模板"],
};

const docsMap: Record<DiagnoseIssueType, string[]> = {
  model_connection: ["Provider 配置说明", "Auth 使用说明", "Transport 说明"],
  config_not_applied: ["配置优先级说明", "配置生效路径说明", "Reload / Restart 说明"],
  model_switch_session_mismatch: ["Session 模型绑定说明", "参数覆盖优先级说明"],
  local_tool_integration: ["本地接入起步指南", "工具链路检查说明"],
};

const resourceReasonMap: Record<DiagnoseIssueType, { template: string; doc: string }> = {
  model_connection: {
    template: "先按模板做最小连通性排查，最快能区分是 auth、provider 还是 transport。",
    doc: "先补齐 provider / auth / transport 规则，再执行会更稳。",
  },
  config_not_applied: {
    template: "模板更适合按生效路径、刷新链路和覆盖优先级顺序排查。",
    doc: "文档会帮你补齐配置层级与 reload / restart 的判断口径。",
  },
  model_switch_session_mismatch: {
    template: "模板更适合先区分 UI 显示和真实 session 运行结果。",
    doc: "文档会补 session 绑定和参数覆盖这两层判断逻辑。",
  },
  local_tool_integration: {
    template: "模板更适合按底层依赖、入口层、回调链路逐段排查。",
    doc: "文档会补工具接入和本地链路的检查顺序。",
  },
};

const patternSignalMap: Record<DiagnoseIssueType, DiagnosePatternSignal[]> = {
  model_connection: [
    { title: "同一请求在多个入口都 401 / 403", description: "更像认证或权限问题，不是 UI 层显示异常。" },
    { title: "模型可见但请求直接 timeout", description: "优先怀疑 transport、网络或网关握手，而不是模型名写错。" },
    { title: "切换 provider 后仍然无差别失败", description: "可能是凭据层或统一代理层出问题。" },
  ],
  config_not_applied: [
    { title: "UI 显示已保存，但真实行为始终是旧值", description: "优先看配置位置、覆盖优先级和运行态刷新。" },
    { title: "重启后仍无变化", description: "可能不是没重启，而是根本没改到真实生效层。" },
    { title: "同一参数在多个文件重复出现", description: "很容易被更高优先级配置或环境变量覆盖。" },
  ],
  model_switch_session_mismatch: [
    { title: "界面显示切过去了，但最小请求仍回旧模型", description: "这是最典型的 session 绑定未更新信号。" },
    { title: "刷新后设置闪回或恢复旧值", description: "说明写入、持久化或会话继承链路可能有问题。" },
    { title: "thinking / reasoning 与设置页不一致", description: "通常不是单一字段问题，而是旧参数仍在覆盖。" },
  ],
  local_tool_integration: [
    { title: "按钮或工具入口可见，但触发后无日志", description: "入口层到了，但执行链路没真正接通。" },
    { title: "开发环境可用，打包后失效", description: "更像 preload、权限、路径或跨进程问题。" },
    { title: "偶发成功、偶发无响应", description: "先查注册、通信或回调层是否稳定。" },
  ],
};

const scenarioExampleMap: Record<DiagnoseIssueType, DiagnoseScenarioExample[]> = {
  model_connection: [
    { title: "认证失效场景", context: "provider 存在，模型名也能看见，但请求一直报 unauthorized。", implication: "优先确认当前会话是否真的命中了正确 auth profile。" },
    { title: "transport 超时场景", context: "换模型没用、换入口没用，但日志里持续 timeout / websocket 握手失败。", implication: "优先把排查重点放到 transport 与网络链路。" },
  ],
  config_not_applied: [
    { title: "改了配置仍是旧行为", context: "defaults 已改，但页面、会话或请求结果都仍像旧配置。", implication: "优先检查配置真正生效位置和是否被 session / env 覆盖。" },
    { title: "重启后也没变化", context: "已经重启，但结果没有任何改善。", implication: "这通常说明不是没刷新，而是改错层或被更高优先级覆盖。" },
  ],
  model_switch_session_mismatch: [
    { title: "Control UI 切模型后结果不变", context: "UI 已显示切到新模型，但实际回答还是旧 provider。", implication: "先验证真实运行模型，再排 session 写入和旧会话继承。" },
    { title: "参数显示和结果不一致", context: "页面上 reasoning / thinking 已更新，但返回行为仍像旧参数。", implication: "说明旧参数可能仍通过 session 或持久化链路生效。" },
  ],
  local_tool_integration: [
    { title: "入口层已完成，但链路没闭环", context: "桌面按钮或 MCP 工具已出现，但执行后没有结果或回调。", implication: "优先排查依赖状态、注册层与通信回调。" },
    { title: "打包后能力失效", context: "开发环境正常，正式包中调用无响应。", implication: "更像产品化接入问题，而不是基础模型问题。" },
  ],
};

const requiredFieldsByIssue: Record<DiagnoseIssueType, (keyof DiagnoseInput)[]> = {
  model_connection: ["provider", "model", "authMode", "transport", "errorText"],
  config_not_applied: ["configSnippet", "symptomText", "expectedOutcome"],
  model_switch_session_mismatch: ["model", "symptomText", "errorText", "expectedOutcome"],
  local_tool_integration: ["scenario", "symptomText", "errorText"],
};

const fieldLabels: Record<keyof DiagnoseInput, string> = {
  issueType: "问题类型",
  scenario: "场景",
  provider: "provider",
  model: "model",
  authMode: "auth 方式",
  transport: "transport",
  symptomText: "当前现象",
  errorText: "报错信息",
  configSnippet: "配置片段",
  expectedOutcome: "期望结果",
};

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function countMatches(text: string, words: string[]) {
  const lower = text.toLowerCase();
  return words.reduce((count, word) => count + (lower.includes(word.toLowerCase()) ? 1 : 0), 0);
}

function scoreIssueType(issueType: DiagnoseIssueType, input: DiagnoseInput, combinedText: string) {
  let score = countMatches(combinedText, keywordGroups[issueType]);

  if (input.scenario) {
    score += scenarioBoostMap[input.scenario]?.[issueType] ?? 0;
  }

  if (issueType === "model_connection") {
    if (hasText(input.provider) || hasText(input.model)) score += 1;
    if (hasText(input.authMode) || hasText(input.transport)) score += 1;
  }

  if (issueType === "config_not_applied") {
    if (hasText(input.configSnippet)) score += 2;
    if (hasText(input.expectedOutcome)) score += 1;
  }

  if (issueType === "model_switch_session_mismatch") {
    if (hasText(input.model)) score += 1;
    if ((input.symptomText ?? "").includes("切换") || (input.errorText ?? "").includes("session")) score += 1;
  }

  if (issueType === "local_tool_integration") {
    if (input.scenario === "mcp_tooling" || input.scenario === "desktop_wrapper") score += 2;
    if (hasText(input.provider) && !hasText(input.model)) score += 0.5;
  }

  if (input.issueType === issueType) {
    score += 2;
  }

  return score;
}

function getIssueScores(input: DiagnoseInput, combined: string) {
  return (Object.keys(keywordGroups) as DiagnoseIssueType[]).map((issueType) => ({
    issueType,
    label: issueTypeLabels[issueType],
    score: scoreIssueType(issueType, input, combined),
  }));
}

function inferIssueType(input: DiagnoseInput, scores: ReturnType<typeof getIssueScores>): DiagnoseIssueType {
  if (input.issueType) return input.issueType;

  const sorted = [...scores].sort((a, b) => b.score - a.score);
  return sorted[0]?.score ? sorted[0].issueType : "config_not_applied";
}

function buildScoreHighlights(issueType: DiagnoseIssueType, input: DiagnoseInput, combinedRaw: string) {
  const highlights: string[] = [];
  const matchedKeywords = keywordGroups[issueType]
    .filter((word) => combinedRaw.toLowerCase().includes(word.toLowerCase()))
    .slice(0, 3);

  if (input.issueType === issueType) {
    highlights.push("你已显式选择这一类问题");
  }
  if (input.scenario && (scenarioBoostMap[input.scenario]?.[issueType] ?? 0) > 0) {
    highlights.push(`场景 ${input.scenario} 对这一类有加权`);
  }
  if (matchedKeywords.length) {
    highlights.push(`命中关键词：${matchedKeywords.join(" / ")}`);
  }

  return highlights.length ? highlights : ["当前更多依赖字段结构与默认推断"];
}

function buildScoreBreakdown(input: DiagnoseInput, combinedRaw: string, scores: ReturnType<typeof getIssueScores>): DiagnoseScoreBreakdownItem[] {
  return [...scores]
    .sort((a, b) => b.score - a.score)
    .map((item) => ({
      issueType: item.issueType,
      label: item.label,
      score: item.score,
      highlights: buildScoreHighlights(item.issueType, input, combinedRaw),
    }));
}

const scenarioPreferredResourceTitles: Partial<Record<DiagnoseScenario, string[]>> = {
  control_ui: ["模型切换 / Session 异常模板", "Session 模型绑定说明", "参数覆盖优先级说明"],
  openclaw: ["OpenClaw 初次搭建模板", "配置优先级说明", "Reload / Restart 说明"],
  desktop_wrapper: ["桌面工具接入模板", "工具链路检查说明", "本地接入起步指南"],
  mcp_tooling: ["桌面工具接入模板", "工具链路检查说明", "本地接入起步指南"],
  workflow_automation: ["AI 工作流起步模板", "配置优先级说明"],
  local_ai_assistant: ["本地 AI 助手起步模板", "本地接入起步指南"],
};

const instabilityActionMap: Record<DiagnoseIssueType, string> = {
  model_connection: "如果结果时好时坏，先别继续换 provider / transport，优先回最小连通性验证。",
  config_not_applied: "如果结果时好时坏，先别继续叠配置，优先回到真实生效路径与覆盖优先级检查。",
  model_switch_session_mismatch: "如果结果时好时坏，先别继续靠感觉判断，优先回新会话最小验证。",
  local_tool_integration: "如果结果时好时坏，先别继续加入口，优先回最小闭环与回调链路验证。",
};

function getAdjacentIssueType(scores: ReturnType<typeof getIssueScores>, issueType: DiagnoseIssueType) {
  return [...scores]
    .sort((a, b) => b.score - a.score)
    .find((item) => item.issueType !== issueType && item.score > 0)?.issueType;
}

function buildNextActions(issueType: DiagnoseIssueType, base: string[], adjacentIssueType?: DiagnoseIssueType) {
  const next = [...base];

  if (adjacentIssueType) {
    next.push(`如果最小验证直接反证当前判断，优先转向「${issueTypeLabels[adjacentIssueType]}」分支重判。`);
  }

  next.push(instabilityActionMap[issueType]);
  return next;
}

function buildRecommendedResources(issueType: DiagnoseIssueType, scenario?: DiagnoseScenario): DiagnoseRecommendedResource[] {
  const templates = templateMap[issueType].map((title, index) => ({
    kind: "template" as const,
    title,
    priority: index === 0 ? "high" as const : "medium" as const,
    reason: index === 0 ? resourceReasonMap[issueType].template : "作为备选模板，用于切换到相邻问题分支继续推进。",
  }));

  const docs = docsMap[issueType].map((title, index) => ({
    kind: "doc" as const,
    title,
    priority: index === 0 ? "high" as const : "medium" as const,
    reason: index === 0 ? resourceReasonMap[issueType].doc : "补齐这一类问题的规则、优先级或验证口径。",
  }));

  const merged = [...templates, ...docs];
  const preferredTitles = scenario ? scenarioPreferredResourceTitles[scenario] ?? [] : [];

  if (!preferredTitles.length) {
    return merged;
  }

  const ranked = [...merged].sort((a, b) => {
    const aIndex = preferredTitles.indexOf(a.title);
    const bIndex = preferredTitles.indexOf(b.title);
    const aRank = aIndex === -1 ? 999 : aIndex;
    const bRank = bIndex === -1 ? 999 : bIndex;
    if (aRank !== bRank) return aRank - bRank;
    if (a.priority !== b.priority) return a.priority === "high" ? -1 : 1;
    return 0;
  });

  return ranked.map((item, index) => ({
    ...item,
    priority: index === 0 || (preferredTitles.indexOf(item.title) !== -1 && index < 2) ? "high" : "medium",
    reason:
      preferredTitles.indexOf(item.title) !== -1
        ? `${item.reason} 当前场景 ${scenario} 与这条资源更贴近。`
        : item.reason,
  }));
}

function buildMeta(
  input: DiagnoseInput,
  issueType: DiagnoseIssueType,
  combined: string,
  flags: { hasAuth: boolean; hasTimeout: boolean; hasReload: boolean; hasSession: boolean; hasTool: boolean },
) {
  const basis: string[] = [];

  if (input.issueType) {
    basis.push(`已显式选择问题类型：${issueTypeLabels[input.issueType]}`);
  }
  if (hasText(input.scenario)) {
    basis.push(`场景：${input.scenario}`);
    const boosts = scenarioBoostMap[input.scenario];
    if (boosts) {
      const boostHint = Object.entries(boosts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([name]) => issueTypeLabels[name as DiagnoseIssueType])
        .join(" / ");
      if (boostHint) {
        basis.push(`场景加权优先考虑：${boostHint}`);
      }
    }
  }
  if (hasText(input.provider) || hasText(input.model)) {
    basis.push(`模型链路：${input.provider ?? "unknown"} / ${input.model ?? "unknown"}`);
  }
  if (hasText(input.authMode) || hasText(input.transport)) {
    basis.push(`链路参数：auth=${input.authMode ?? "unknown"}，transport=${input.transport ?? "unknown"}`);
  }

  const matchedKeywords = keywordGroups[issueType]
    .filter((word) => combined.toLowerCase().includes(word.toLowerCase()))
    .slice(0, 5);
  if (matchedKeywords.length) {
    basis.push(`命中关键词：${matchedKeywords.join(" / ")}`);
  }

  if (flags.hasAuth) basis.push("检测到认证相关特征（401/403/token/oauth）");
  if (flags.hasTimeout) basis.push("检测到连接/超时相关特征（timeout/websocket/sse）");
  if (flags.hasReload) basis.push("检测到配置刷新/覆盖相关特征（reload/覆盖/旧结果）");
  if (flags.hasSession) basis.push("检测到会话/显示不一致相关特征（session/ui/reasoning）");
  if (flags.hasTool) basis.push("检测到工具接入相关特征（mcp/wrapper/tool）");

  const missingInputs = requiredFieldsByIssue[issueType]
    .filter((field) => !hasText(input[field]))
    .map((field) => fieldLabels[field]);

  const confidenceScore = basis.length - missingInputs.length;
  let confidenceNote = "当前信息完整度一般，建议按修复步骤先做最小验证。";
  if (confidenceScore >= 6 && missingInputs.length <= 1) {
    confidenceNote = "当前判断依据较充足，优先按建议顺序执行，结论稳定性较高。";
  } else if (missingInputs.length >= 3) {
    confidenceNote = "当前关键输入缺失较多，建议补全缺失字段后再复查，结论会更稳。";
  }

  return {
    diagnosisBasis: basis,
    missingInputs,
    confidenceNote,
  };
}

export function analyzeDiagnose(input: DiagnoseInput): DiagnoseResult {
  const combinedRaw = [input.symptomText, input.errorText, input.configSnippet].filter(hasText).join("\n");
  const combined = combinedRaw.toLowerCase();
  const scores = getIssueScores(input, combinedRaw);
  const issueType = inferIssueType(input, scores);

  const hasAuth = /(401|403|429|unauthorized|forbidden|oauth|token|api key|认证失败|鉴权失败)/.test(combined);
  const hasTimeout = /(timeout|websocket|sse|cannot connect|connection failed|请求超时|网络错误|握手失败)/.test(combined);
  const hasReload = /(reload|hot reload|restart|不生效|没生效|还是旧的|覆盖|default|缓存|优先级)/.test(combined);
  const hasSession = /(session|会话|切换后|还是 relay|还是旧模型|模型没变|thinking|reasoning|ui 显示)/.test(combined);
  const hasTool = /(mcp|desktop|wrapper|tool|插件|integration|本地助手|workflow|stdio|工具不可用)/.test(combined);

  const meta = buildMeta(input, issueType, combinedRaw, { hasAuth, hasTimeout, hasReload, hasSession, hasTool });
  const scoreBreakdown = buildScoreBreakdown(input, combinedRaw, scores);
  const adjacentIssueType = getAdjacentIssueType(scores, issueType);
  const recommendedResources = buildRecommendedResources(issueType, input.scenario);
  const patternSignals = patternSignalMap[issueType];
  const scenarioExamples = scenarioExampleMap[issueType];

  switch (issueType) {
    case "model_connection":
      return {
        issueType,
        riskLevel: "high",
        summary: hasAuth
          ? "当前问题更像是 provider 已命中，但认证链路没有真正通过。"
          : hasTimeout
            ? "当前问题更像是 transport 层连接失败，而不是模型本身不可用。"
            : "当前问题更像是模型请求链路没有真正建立。",
        causes: [
          {
            title: hasAuth ? "认证未通过" : "provider / model 未正确命中",
            confidence: "high",
            reason: hasAuth
              ? "报错中已出现 unauthorized / token / oauth 相关特征。"
              : "当前现象更像是请求还没真正落到可用模型。",
          },
          {
            title: hasTimeout ? "transport 连接异常" : "权限或模型可见性问题",
            confidence: "medium",
            reason: hasTimeout
              ? "文本里出现了 timeout / websocket / sse 等连接关键词。"
              : "可能存在模型权限、provider 路由或配置别名问题。",
          },
        ],
        fixSteps: [
          {
            step: 1,
            action: "先确认当前 provider 与 model 是否真实存在且可见",
            why: "先排除名称写错、别名未注册或模型根本不可见。",
            verify: "执行一次最小请求，确认目标 provider / model 可以被发现。",
          },
          {
            step: 2,
            action: "检查 auth 是否有效并命中正确 profile",
            why: "认证通过前，后面的 transport 与参数检查都没有意义。",
            verify: "确认 token / oauth 未过期，且当前会话实际使用的是正确凭据。",
          },
          {
            step: 3,
            action: "再检查 transport 设置是否异常",
            why: "避免被 websocket / sse / auto 的链路问题误导。",
            verify: "修改 transport 后再次执行最小请求，确认是否恢复。",
          },
        ],
        nextActions: buildNextActions(issueType, ["先做最小连通性实测", "若仍失败，再看 auth 与 transport 分支"], adjacentIssueType),
        relatedTemplates: templateMap[issueType],
        relatedDocs: docsMap[issueType],
        ...meta,
        scoreBreakdown,
        recommendedResources,
        patternSignals,
        scenarioExamples,
      };

    case "config_not_applied":
      return {
        issueType,
        riskLevel: "medium",
        summary: hasReload
          ? "当前问题更像是配置已经修改，但运行态没有真正刷新。"
          : "当前问题更像是配置字段写对了，但没有落到实际生效位置。",
        causes: [
          {
            title: "配置未落到真实生效位置",
            confidence: "high",
            reason: "这类问题常见于改了表层配置，但真正生效的是另一层或更高优先级配置。",
          },
          {
            title: "运行态未刷新",
            confidence: hasReload ? "high" : "medium",
            reason: hasReload
              ? "文本中已经出现 reload / 不生效 / 还是旧的 等关键词。"
              : "配置更新后，旧进程、旧会话或缓存仍可能继续覆盖结果。",
          },
        ],
        fixSteps: [
          {
            step: 1,
            action: "先确认配置写在了正确位置",
            why: "避免改对字段但改错文件、改错层级。",
            verify: "对照真实生效路径，确认当前值确实来自你修改的位置。",
          },
          {
            step: 2,
            action: "再确认 reload / restart 是否真正触发",
            why: "很多“改了没反应”本质上是旧运行态没退出。",
            verify: "重启后重新观察行为，而不是只看界面文案。",
          },
          {
            step: 3,
            action: "检查是否存在更高优先级覆盖",
            why: "默认值、会话级、环境变量等都可能覆盖手动设置。",
            verify: "逐层排除后再次验证目标参数是否真正生效。",
          },
        ],
        nextActions: buildNextActions(issueType, ["先核对生效路径", "再检查覆盖优先级"], adjacentIssueType),
        relatedTemplates: templateMap[issueType],
        relatedDocs: docsMap[issueType],
        ...meta,
        scoreBreakdown,
        recommendedResources,
        patternSignals,
        scenarioExamples,
      };

    case "model_switch_session_mismatch":
      return {
        issueType,
        riskLevel: "medium",
        summary: hasSession
          ? "当前问题更像是 UI 显示切换成功，但当前会话仍绑定旧模型。"
          : "当前问题更像是模型切换发生在显示层，没有真正落到 session。",
        causes: [
          {
            title: "会话绑定未更新",
            confidence: "high",
            reason: "页面显示层已经变化，但真正执行请求的会话上下文仍可能保持旧值。",
          },
          {
            title: "旧参数仍在覆盖",
            confidence: "medium",
            reason: "thinking / reasoning / 旧 provider 配置仍可能通过更高优先级覆盖目标模型。",
          },
        ],
        fixSteps: [
          {
            step: 1,
            action: "先确认当前会话实际绑定模型",
            why: "先区分显示层问题和运行层问题。",
            verify: "做一次最小请求，确认返回的真实 provider / model。",
          },
          {
            step: 2,
            action: "检查 UI 切换是否真正写入 session",
            why: "避免页面显示切换成功，但后端状态还停在旧会话。",
            verify: "刷新页面或重开会话后，确认绑定结果仍然正确。",
          },
          {
            step: 3,
            action: "再检查旧参数覆盖与持久化链路",
            why: "防止旧 session、旧配置或思维参数继续影响结果。",
            verify: "重复最小任务，确认返回结果和目标模型一致。",
          },
        ],
        nextActions: buildNextActions(issueType, ["先验证真实运行模型", "再核对 session 与页面显示是否一致"], adjacentIssueType),
        relatedTemplates: templateMap[issueType],
        relatedDocs: docsMap[issueType],
        ...meta,
        scoreBreakdown,
        recommendedResources,
        patternSignals,
        scenarioExamples,
      };

    case "local_tool_integration":
    default:
      return {
        issueType: "local_tool_integration",
        riskLevel: hasTool ? "medium" : "low",
        summary: hasTool
          ? "当前问题更像是工具入口存在，但执行链路没有真正接通。"
          : "当前问题更像是本地接入完成了一半，显示层先到了，能力层没跟上。",
        causes: [
          {
            title: "底层依赖未就绪",
            confidence: "high",
            reason: "本地工具、桌面壳、插件或服务其中至少有一层没有真正准备好。",
          },
          {
            title: "接入链路断在中间层",
            confidence: "medium",
            reason: "入口可见不代表执行链路可用，很多问题卡在注册、通信或回调阶段。",
          },
        ],
        fixSteps: [
          {
            step: 1,
            action: "先确认底层依赖是否存在且已启动",
            why: "没有依赖就没有真正的执行链路。",
            verify: "确认本地服务、工具注册或插件状态都正常。",
          },
          {
            step: 2,
            action: "再确认工具入口是否只是可见而不可用",
            why: "避免被“按钮存在”误认为“功能已接通”。",
            verify: "实际触发一次工具，确认是否真的返回结果。",
          },
          {
            step: 3,
            action: "最后检查通信或回调链路",
            why: "很多接入问题都卡在请求发出后没有正确返回。",
            verify: "做最小闭环测试，确认从触发到返回全链路通。",
          },
        ],
        nextActions: buildNextActions("local_tool_integration", ["先确认依赖就绪", "再做最小闭环测试"], adjacentIssueType),
        relatedTemplates: templateMap.local_tool_integration,
        relatedDocs: docsMap.local_tool_integration,
        ...meta,
        scoreBreakdown,
        recommendedResources,
        patternSignals,
        scenarioExamples,
      };
  }
}
