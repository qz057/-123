export type FlowDockDoc = {
  slug: string;
  title: string;
  description: string;
  aliases?: readonly string[];
};

export const docsCatalog: readonly FlowDockDoc[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "快速建立对 FlowDock 和首批功能的整体理解。",
    aliases: ["本地接入起步指南", "工作流设计说明", "自动化工作流起步说明"],
  },
  {
    slug: "diagnose",
    title: "Diagnose",
    description: "了解配置诊断器的输入字段、输出结构和使用方式。",
    aliases: [
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
    title: "Templates",
    description: "查看模板分类、模板详情字段和复用方法。",
  },
  {
    slug: "troubleshooting",
    title: "Troubleshooting",
    description: "集中整理排障说明、优先级和常见问题。",
    aliases: ["排障优先级说明"],
  },
  {
    slug: "product-notes",
    title: "Product Notes",
    description: "记录版本变化、功能边界和后续迭代方向。",
  },
] as const;

export function getDocByTitle(title: string) {
  const normalized = title.trim();
  return docsCatalog.find((item) => item.title === normalized || item.aliases?.includes(normalized));
}
