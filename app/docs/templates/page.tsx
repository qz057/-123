import { DocShell } from "@/components/docs/doc-shell";

export default function TemplatesDocsPage() {
  return (
    <DocShell
      eyebrow="FlowDock / Docs / Templates"
      title="Templates 文档"
      intro="Templates 不是文章目录，也不是纯展示区。它是承接 Diagnose 结果和明确目标任务的执行层，重点是让你快速拿到一套可复用、可验证、可扩展的推进路径。"
      badges={["Docs", "Templates"]}
      summary={[
        { label: "适合什么时候进", value: "方向已经比较明确，想直接开始做" },
        { label: "当前分类", value: "搭建类、排障类、自动化类、产品化类" },
        { label: "详情页目标", value: "不是介绍模板，而是帮你真正执行并验收" },
      ]}
      checklist={[
        {
          title: "模板页应该解决什么",
          items: [
            "先判断这个模板是不是你现在该用的模板",
            "知道执行前需要准备什么输入与前置条件",
            "知道执行失败时该怎么回滚，而不是一路硬扛",
          ],
        },
        {
          title: "不该怎么用模板",
          items: [
            "把模板当文章读完就算完成",
            "跳过前置条件直接照抄步骤",
            "失败后继续叠加更多动作，不先回滚到稳定层",
          ],
        },
        {
          title: "模板与其他页面的关系",
          items: [
            "方向不明确：先回 Diagnose",
            "需要理解字段或规则：再回 Docs",
            "需要找更贴近任务的入口：看 Use Cases",
          ],
        },
      ]}
      sections={[
        {
          title: "分类体系为什么这样划分",
          body: "首版按 4 类组织，是为了贴近真实任务心智，而不是按抽象功能模块分类。这样用户更容易判断自己当前处在搭建、排障、自动化扩展还是产品化接入阶段。",
          bullets: [
            "搭建类：从 0 到 1 跑通最小闭环",
            "排障类：配置、连接、切换异常优先处理",
            "自动化类：把一次性使用升级成稳定流程",
            "产品化类：把能力接进桌面壳或更完整的工作环境",
          ],
        },
        {
          title: "模板详情页现在包含哪些关键块",
          body: "首版模板详情页已经不是简单正文，而是执行型结构：问题定义、适用场景、前置条件、输入/输出、步骤、执行检查、失败信号、回滚策略、案例和 FAQ。它的目标是让你在一页内完成‘判断能不能做 + 具体怎么做 + 做完怎么验收’。",
          bullets: [
            "适用判断：先看这份模板是不是现在该用",
            "步骤与检查：避免只看懂、不验证",
            "失败信号与回滚：避免越修越乱",
            "相关模板与文档：让下一跳明确，而不是断在当前页",
          ],
          links: [
            { href: "/templates", label: "打开模板中心", tone: "primary" },
            { href: "/docs/troubleshooting", label: "补看排障顺序" },
          ],
        },
        {
          title: "什么时候先回 Diagnose，而不是继续翻模板",
          body: "如果你已经开始怀疑自己选错模板，或者发现当前问题同时像连接、配置、会话三种问题混在一起，就该先回 Diagnose 重新归类。Templates 擅长承接明确方向，不擅长替代问题归类。",
          bullets: [
            "现象描述不稳定，今天像 auth、明天像 session",
            "已经换了两个模板仍然无法推进",
            "你能描述现象，但说不清问题真正属于哪一层",
          ],
          links: [
            { href: "/diagnose", label: "回 Diagnose 重新判断" },
            { href: "/use-cases", label: "按使用场景找入口" },
          ],
        },
      ]}
      ctaLinks={[
        { href: "/templates", label: "打开模板中心", tone: "primary" },
        { href: "/diagnose", label: "先做问题归类" },
      ]}
    />
  );
}
