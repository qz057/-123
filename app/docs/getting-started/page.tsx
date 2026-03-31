import { DocShell } from "@/components/docs/doc-shell";

export default function GettingStartedPage() {
  return (
    <DocShell
      eyebrow="FlowDock / Docs / Getting Started"
      title="Getting Started"
      intro="这份起步说明不是带你把所有能力一次看完，而是先帮你抓住 FlowDock 首版最重要的使用路径：先判断问题在哪一层，再决定该进 Diagnose、Templates 还是 Docs。"
      badges={["Docs", "Getting Started"]}
      summary={[
        { label: "首版主入口", value: "Diagnose，用来先判断问题属于哪一层" },
        { label: "第二入口", value: "Templates，适合已经知道方向、想直接套方案的人" },
        { label: "推荐顺序", value: "先定位 → 再套模板 → 最后用文档补齐验证与细节" },
      ]}
      checklist={[
        {
          title: "适合现在读这页的人",
          items: [
            "第一次接触 FlowDock，还不清楚首页、诊断器、模板中心分别做什么",
            "已经在用 AI 工具，但流程总是断在配置、接入或排障阶段",
            "想知道首版最稳的使用入口，而不是从一堆页面里自己猜",
          ],
        },
        {
          title: "先别急着做的事",
          items: [
            "一上来就同时改 provider、transport、session 和工具链",
            "还没判断问题归类，就直接翻一堆模板逐个试",
            "只看界面显示，不做最小验证就判断已经成功切换",
          ],
        },
        {
          title: "读完这页后应该做到",
          items: [
            "知道什么情况先进 Diagnose",
            "知道什么情况直接用 Templates",
            "知道 Docs 在流程里是补细节和补验证，不是第一入口",
          ],
        },
      ]}
      workflow={{
        eyebrow: "Start flow",
        title: "第一次进入 FlowDock，最稳的使用顺序",
        description:
          "起步时最怕的不是信息不够，而是一开始就走错入口。更稳的节奏是：先判断你现在更像在定位问题，还是已经明确要执行什么，再决定 Diagnose、Templates、Use Cases 和 Docs 的先后顺序。",
        steps: [
          {
            title: "先判断你现在更像哪种现场",
            detail: "如果你还说不清问题在哪层，说明现在最缺的是归类；如果你已经明确要做什么，说明现在更缺执行路径。",
            cue: "起点判断",
            href: "/diagnose",
            actionLabel: "先看 Diagnose",
            tone: "primary",
          },
          {
            title: "问题模糊先 Diagnose",
            detail: "先把问题压回连接、配置、Session 或接入层，不要一开始就横跳模板和文档。",
            cue: "先压层",
          },
          {
            title: "方向明确再进 Templates / Use Cases",
            detail: "当目标已经清楚，就直接切执行层，不再继续停在概念理解和目录浏览。",
            cue: "转执行",
            href: "/templates",
            actionLabel: "打开模板中心",
          },
          {
            title: "最后才回 Docs 收口验证",
            detail: "当你需要边界、顺序、失败分支和验证口径时，再回到文档，不把文档当成第一入口。",
            cue: "收口",
            href: "/docs/troubleshooting",
            actionLabel: "补看排障顺序",
          },
        ],
      }}
      sections={[
        {
          title: "FlowDock 首版到底是什么",
          body: "FlowDock 当前不是泛 AI 内容站，也不是只展示概念的官网。它是一个工具型网站骨架，核心由官网首页、配置诊断器、模板中心、文档和使用场景页组成，目标是把‘知道 AI 很强’推进到‘真的能接进工作流’。",
          bullets: [
            "首页负责建立理解：告诉你它解决什么问题、主入口在哪",
            "Diagnose 负责先归类：把问题快速落到连接、配置、会话或接入层",
            "Templates 负责给方案：当方向明确后，直接给你可复用路径",
            "Docs 负责补结构：把关键规则、验证方式和互链说明写清楚",
          ],
        },
        {
          title: "30 秒选入口：先去哪一页最稳",
          body: "判断标准很简单：如果你现在还说不清问题到底卡在哪，就先去 Diagnose；如果你已经能明确说出目标，例如‘我要做自动化巡检’或‘我要排查模型切换异常’，那就直接去 Templates。Docs 则更像第二层说明书，用来补原理、顺序和验证方法。",
          bullets: [
            "问题模糊：先 Diagnose",
            "方向明确：先 Templates",
            "需要确认顺序、边界、验证方式：再 Docs",
          ],
          links: [
            { href: "/diagnose", label: "先去 Diagnose", tone: "primary" },
            { href: "/templates", label: "直接看 Templates" },
            { href: "/docs/diagnose", label: "补看 Diagnose 文档" },
          ],
        },
        {
          title: "首版建议的使用闭环",
          body: "不要把 FlowDock 当成信息列表去逛。更有效的方式是按闭环用它：先判断问题层级，再使用模板推进，再用文档验证自己没有漏层。这样能避免大量无效试错。",
          bullets: [
            "第 1 步：明确当前任务或异常现象",
            "第 2 步：用 Diagnose 做问题归类",
            "第 3 步：跳到对应模板页，照步骤执行",
            "第 4 步：回到 Docs 检查优先级、验证方式和边界",
          ],
        },
        {
          title: "第一次起步时最值得补齐的输入",
          body: "多数人不是不会做，而是描述问题时缺关键字段，导致一直在错误层打转。首版最值得先补齐的是：当前现象、你本来想达成什么、用了哪个 provider / model、有没有报错、最近改了什么。只要这些信息能说清，Diagnose 和模板的命中率都会明显更高。",
          bullets: [
            "当前现象：到底哪里不对，不要只说‘它不行了’",
            "目标结果：你本来想让它做成什么",
            "关键环境：provider / model / auth / transport / session",
            "最近变更：最近一次改动常常就是最好用的排查起点",
          ],
        },
        {
          title: "失败分支：如果第一天就开始横跳多个入口，怎么收回来",
          body: "起步最容易出问题的一种情况，是刚接触 FlowDock 就同时打开 Diagnose、Templates、Use Cases、Docs，还顺手改了几份配置。这样最难受的不是信息不够，而是你已经说不清哪一步真正改变了状态。更稳的做法是先把现场收回来：重新只保留一个主入口，再按‘一步一验’的节奏继续。",
          bullets: [
            "如果问题还模糊，只保留 Diagnose 作为唯一主入口，先别继续翻模板",
            "如果方向已经明确，只保留一份模板或一个 use case，不要三页并行读",
            "每完成一步就做一次最小验证，不把 4 个动作堆到最后一起验",
          ],
          links: [
            { href: "/diagnose", label: "回 Diagnose 重新起步", tone: "primary" },
            { href: "/templates", label: "只保留模板主链路" },
          ],
        },
        {
          title: "常见起步误区",
          body: "多数起步失败不是因为工具不够，而是顺序错了。尤其是把界面变化误当成真实生效、把模板阅读误当成已经跑通、或者在没有最小验证时同时改太多层。FlowDock 首版所有页面都在试图减少这种误判。",
          bullets: [
            "UI 显示切换成功，不代表当前会话真的已经切过去",
            "配置写进文件，不代表运行态已经加载新值",
            "模板看懂了，不代表链路已经闭环",
          ],
          links: [
            { href: "/docs/troubleshooting", label: "查看排障顺序" },
            { href: "/docs/templates", label: "查看模板使用方式" },
          ],
        },
      ]}
      ctaLinks={[
        { href: "/diagnose", label: "进入配置诊断器", tone: "primary" },
        { href: "/templates", label: "查看模板中心" },
        { href: "/use-cases", label: "查看使用场景" },
      ]}
    />
  );
}
