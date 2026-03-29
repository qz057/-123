import { DocShell } from "@/components/docs/doc-shell";

export default function ProductNotesPage() {
  return (
    <DocShell
      eyebrow="FlowDock / Docs / Product Notes"
      title="Product Notes"
      intro="这页不负责教学，而是负责把首版当前到了哪里、边界在哪、后面要往哪推说清楚，避免把骨架阶段误当成完整产品。"
      badges={["Docs", "Product Notes"]}
      summary={[
        { label: "当前阶段", value: "首版骨架已跑通，进入核心页面与内容层打磨阶段" },
        { label: "当前重点", value: "首页、Diagnose、Templates 三个主页面持续增强" },
        { label: "当前边界", value: "Diagnose 仍是规则型 V1，Docs 与模板正文还在继续补深" },
      ]}
      checklist={[
        {
          title: "已经具备的内容",
          items: [
            "首页、Diagnose、Templates、Use Cases、Docs、About 基础路由已落地",
            "Diagnose 已支持结构化输入、规则诊断、结果解释与资源跳转",
            "Templates 已有首批 8 个模板详情页与互链结构",
          ],
        },
        {
          title: "还在继续打磨的部分",
          items: [
            "首页视觉层级、品牌细节与卡片体系继续统一",
            "Diagnose 的评分解释、失败信号模板与资源优先级继续增强",
            "Docs 正文深度、跨页互链与场景化说明继续补齐",
          ],
        },
        {
          title: "当前阅读建议",
          items: [
            "第一次接触：先看 Getting Started",
            "要开始动手：进 Diagnose 或 Templates",
            "要了解版本边界和阶段判断：看这页",
          ],
        },
      ]}
      sections={[
        {
          title: "当前版本阶段判断",
          body: "FlowDock 已经从纯方案层进入可运行首版阶段，不再只是蓝图。现在的工作重点是把核心路径打磨到更像一个可用产品：页面结构更完整、内容更可执行、互链更清晰。",
        },
        {
          title: "当前明确边界",
          body: "首版还不是‘什么都能诊断、什么都能自动做’的成熟系统。Diagnose 目前仍然是规则型 V1，Templates 与 Docs 的重点也仍然是先保证主链路可用，而不是一开始追求覆盖所有场景。",
          bullets: [
            "Diagnose 不是自由生成式万能诊断器",
            "Templates 先服务 8 个高频首批模板",
            "Docs 先把起步、排障、模板使用的主路径写实，再继续扩",
          ],
        },
        {
          title: "下一阶段默认方向",
          body: "接下来会继续沿着‘更像真产品’这个方向推进：一边补视觉一致性，一边增强 Diagnose 解释力、模板正文深度和 Docs 互链质量，让首页到执行页之间真正形成闭环。",
          links: [
            { href: "/docs/getting-started", label: "查看起步文档" },
            { href: "/diagnose", label: "打开 Diagnose", tone: "primary" },
            { href: "/templates", label: "查看 Templates" },
          ],
        },
      ]}
      ctaLinks={[
        { href: "/docs/getting-started", label: "回到起步文档" },
        { href: "/diagnose", label: "进入 Diagnose", tone: "primary" },
      ]}
    />
  );
}
