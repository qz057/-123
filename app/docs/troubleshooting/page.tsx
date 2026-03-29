import { DocShell } from "@/components/docs/doc-shell";

export default function TroubleshootingDocsPage() {
  return (
    <DocShell
      eyebrow="FlowDock / Docs / Troubleshooting"
      title="Troubleshooting 文档"
      intro="FlowDock 的排障文档不追求把所有可能性一次列完，而是优先给顺序感：先判断问题属于哪一层，再决定该改哪里、该验证什么。"
      badges={["Docs", "Troubleshooting"]}
      summary={[
        { label: "首版原则", value: "先归类，再按层排，最后用最小验证收口" },
        { label: "常见误区", value: "把显示层变化误当运行层生效；把模板阅读误当执行完成" },
        { label: "验证方式", value: "优先最小请求、最小会话、最小工具链路" },
      ]}
      checklist={[
        {
          title: "排障时先做什么",
          items: [
            "先确认是连接问题、配置问题、会话问题还是接入问题",
            "先找最近一次稳定可用状态，别在混乱状态里继续叠功能",
            "先决定验证口径：看真实请求、真实 session、真实链路，不只看 UI",
          ],
        },
        {
          title: "排障时尽量别做什么",
          items: [
            "同时修改 provider、auth、transport、session 多层参数",
            "没有回滚点时继续叠新尝试",
            "只根据‘像是’来判断，不做最小验证",
          ],
        },
        {
          title: "什么时候该跳其他页面",
          items: [
            "问题归类不清：回 Diagnose",
            "归类清楚但不知道具体怎么做：跳 Templates",
            "需要理解规则和边界：继续看 Docs 子页",
          ],
        },
      ]}
      sections={[
        {
          title: "首版排障顺序",
          body: "最稳的顺序通常是：先归类问题，再定位层级，再做最小验证。很多排障失败不是因为不会修，而是因为一开始就进入了错误分支。",
          bullets: [
            "连接问题：先 provider / auth / transport",
            "配置问题：先配置位置 / 覆盖优先级 / 运行态刷新",
            "会话问题：先区分 UI 显示与真实执行结果",
            "接入问题：先区分入口可见与执行链路可用",
          ],
          links: [
            { href: "/docs/diagnose", label: "看 Diagnose 的判断逻辑" },
            { href: "/diagnose", label: "打开 Diagnose", tone: "primary" },
          ],
        },
        {
          title: "为什么一定要做最小验证",
          body: "没有最小验证，你看到的往往只是系统某一层的表象。最小请求、最小会话、最小工具链路能帮助你快速判断：问题到底出在链路建立之前、请求发出之后，还是结果返回之后。",
          bullets: [
            "最小请求：验证 provider / auth / transport 是否真的可用",
            "最小会话：验证当前 session 是否真的写入了目标参数",
            "最小工具链路：验证入口触发后是否有真实返回",
          ],
        },
        {
          title: "排障结束的标准不只是‘看起来好了’",
          body: "真正结束排障，至少要满足两件事：一是核心行为已经被重新验证；二是你知道问题根因属于哪一层，下一次能更快识别。否则只是暂时碰巧恢复。",
          bullets: [
            "结果层：目标行为已经稳定复现",
            "原因层：知道是 auth、配置覆盖、session 绑定还是工具链路断裂",
            "交接层：如果要复用，最好顺手沉淀成模板或文档路径",
          ],
          links: [
            { href: "/templates", label: "用模板收口执行路径" },
            { href: "/docs/product-notes", label: "查看当前产品边界" },
          ],
        },
      ]}
      ctaLinks={[
        { href: "/diagnose", label: "先做问题归类", tone: "primary" },
        { href: "/templates", label: "再进模板执行" },
      ]}
    />
  );
}
