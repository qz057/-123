export type FlowDockDoc = {
  slug: string;
  title: string;
  description: string;
  aliases?: readonly string[];
};

export const docsCatalog: readonly FlowDockDoc[] = [
  {
    slug: "getting-started",
    title: "起步指南",
    description: "快速建立对 FlowDock 与首批核心路径的整体理解。",
    aliases: ["Getting Started", "本地接入起步指南", "工作流设计说明", "自动化工作流起步说明"],
  },
  {
    slug: "diagnose",
    title: "配置诊断器",
    description: "了解 Diagnose 的输入字段、输出结构与使用方式。",
    aliases: [
      "Diagnose",
      "Provider 配置说明",
      "Auth 使用说明",
      "Transport 说明",
      "配置优先级说明",
      "配置生效路径说明",
      "Reload / Restart 说明",
      "Session 模型绑定说明",
      "参数覆盖优先级说明",
      "工具链路检查说明",
    ],
  },
  {
    slug: "templates",
    title: "模板说明",
    description: "查看模板分类、详情结构与复用方式。",
    aliases: ["Templates"],
  },
  {
    slug: "troubleshooting",
    title: "排障指南",
    description: "集中整理排障顺序、优先级与常见误区。",
    aliases: ["Troubleshooting", "排障优先级说明"],
  },
  {
    slug: "product-notes",
    title: "产品说明",
    description: "记录当前版本边界、成熟度与后续迭代方向。",
    aliases: ["Product Notes"],
  },
] as const;

export function getDocByTitle(title: string) {
  const normalized = title.trim();
  return docsCatalog.find((item) => item.title === normalized || item.aliases?.includes(normalized));
}
