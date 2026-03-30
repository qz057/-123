import { DocShell } from "@/components/docs/doc-shell";

export default function ProductNotesPage() {
  return (
    <DocShell
      eyebrow="FlowDock / Docs / Product Notes"
      title="Product Notes"
      intro="这页不负责教学，而是负责把首版当前到了哪里、边界在哪、后面要往哪推说清楚，避免把骨架阶段误当成完整产品。它的目标是帮你正确理解当前版本，而不是制造虚假的成熟感。"
      badges={["Docs", "Product Notes"]}
      summary={[
        { label: "当前阶段", value: "首版骨架已跑通，进入首页与内容层的可用化打磨阶段" },
        { label: "当前重点", value: "首页、Diagnose、Templates 以及 docs/about 内容层持续增强" },
        { label: "当前边界", value: "Diagnose 已到规则型 V2，但整体仍在从可用首版向产品级收口推进" },
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
            "Docs / About 的内容层、跨页互链与场景化说明继续补齐",
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
          body: "FlowDock 已经从纯方案层进入可运行首版阶段，不再只是蓝图。现在的工作重点是把核心路径打磨到更像一个可用产品：页面结构更完整、内容更可执行、互链更清晰。简单说，它已经不是‘只有想法’，但也还不是‘已经收死的成熟产品’。",
        },
        {
          title: "现在已经相对稳定的部分",
          body: "如果你现在进入 FlowDock，已经可以依赖几条相对稳定的主路径，而不是在一片空白里自己摸索。首版最重要的价值，已经从‘能不能打开页面’提升到‘能不能形成一条可执行的路径’。",
          bullets: [
            "首页已能建立入口关系，不再只是信息堆叠",
            "Diagnose 已有可解释结果、评分拆解与资源优先级",
            "Templates / Use Cases / Docs 之间已形成初步互链闭环",
          ],
        },
        {
          title: "当前明确边界",
          body: "首版还不是‘什么都能诊断、什么都能自动做’的成熟系统。Diagnose 目前已经升级到规则型 V2，但 Templates 与 Docs 的重点仍然是先保证主链路可用，而不是一开始追求覆盖所有场景。也就是说，现在的重点是可靠推进，不是无限扩面。",
          bullets: [
            "Diagnose 不是自由生成式万能诊断器，而是可解释的规则型归类器",
            "Templates 先服务 8 个高频首批模板",
            "Docs 先把起步、排障、模板使用与产品边界的主路径写实，再继续扩",
          ],
        },
        {
          title: "当前最容易被误判的 3 个点",
          body: "产品进入可用首版后，最危险的不是它不够强，而是用户和开发者容易把‘局部已成型’误判成‘整体已经成熟’。这 3 个点现在最值得主动提醒。",
          bullets: [
            "首页看起来更完整了，不代表所有子页都已经达到最终定稿状态",
            "Diagnose 已有解释层，不代表它已经覆盖所有异常场景",
            "模板和文档已经能承接主链路，不代表案例层和失败分支已经补全",
          ],
        },
        {
          title: "为什么现在还值得继续推进",
          body: "因为首版最难的一段其实已经过去了：核心结构、页面骨架、基础互链和可运行路径都已搭起来。后面的工作更像产品化收口——把体验做顺、把边界说清、把案例补实，而不是再从零开始重搭。",
          bullets: [
            "继续打磨的收益开始累积，而不是每轮都推倒重来",
            "浏览器实机审看与 DOM 审计已成为稳定工作流，可持续复用",
            "后续增强更容易围绕真实页面与真实路径做，而不是只停留在方案层",
          ],
        },
        {
          title: "下一阶段默认方向",
          body: "接下来会继续沿着‘更像真产品’这个方向推进：一边补视觉一致性，一边增强 Diagnose 解释力、模板正文深度和 Docs 互链质量，让首页到执行页之间真正形成闭环。默认优先级仍然是：首页与内容总览页最终收口 → docs 子页案例层 → Diagnose V2+ 深化。",
          bullets: [
            "继续做首页与内容页的设计稿级收口",
            "继续增强 Diagnose 的解释层、失败信号和案例贴合度",
            "继续补 docs 子页正文、about 说明层与 use-cases 深度",
          ],
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
