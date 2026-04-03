import { DocShell } from "@/components/docs/doc-shell";

export default function GettingStartedPage() {
  return (
    <DocShell
      eyebrow="FlowDock / 文档 / 起步指南"
      title="起步指南"
      intro="这份起步文档不想让你把整个站都看一遍，而是帮你在第一次进入 FlowDock 时快速完成三个判断：我现在更像在定位问题、在执行方案，还是在补规则与验证。只要这三件事判对，首版已经足够开始真正使用。"
      badges={["文档 / Docs", "起步指南"]}
      summary={[
        { label: "第一次最该先开", value: "Diagnose：当你还分不清问题在第几层时" },
        { label: "方向明确后进入", value: "Templates / Use Cases：当你已经知道要做什么" },
        { label: "Docs 真正职责", value: "补顺序、边界、验证与失败分支，不是首页的替代品" },
      ]}
      checklist={[
        {
          title: "什么人最该先看这页",
          items: [
            "第一次接触 FlowDock，不知道首页、Diagnose、Templates、Use Cases、Docs 应该怎么分工",
            "已经在用 AI 工具，但流程总断在连接、配置、切换或落地执行环节",
            "想先建立一条最稳使用路径，而不是从不同页面乱跳",
          ],
        },
        {
          title: "第一次最该避免的动作",
          items: [
            "一上来就同时改 provider、transport、session 和工具链路",
            "问题还没判层，就开始连开多个模板页并行试",
            "只看 UI 变化，不做最小请求或最小执行验证",
          ],
        },
        {
          title: "读完这页后至少应该做到",
          items: [
            "知道什么情况先进 Diagnose",
            "知道什么情况直接进 Templates 或 Use Cases",
            "知道什么时候回 Docs 补验证与边界，而不是继续横跳页面",
          ],
        },
      ]}
      workflow={{
        eyebrow: "起步顺序",
        title: "第一次进入 FlowDock，最稳的使用闭环",
        description:
          "首版最怕的不是信息不够，而是入口顺序错。更稳的节奏永远是：先判断你现在最缺的是归类、执行还是验证，再决定页面顺序。只有先把入口选对，后面的内容才会开始节省时间。",
        steps: [
          {
            title: "先判断你现在更像哪种现场",
            detail: "问题还模糊、说不清卡在哪层，就说明现在最缺的是归类；方向已经明确，就说明现在最缺的是执行路径。",
            cue: "起点判断",
            href: "/diagnose",
            actionLabel: "先看 Diagnose",
            tone: "primary",
          },
          {
            title: "问题模糊：先 Diagnose",
            detail: "先把问题压回连接、配置、Session 或接入层，不要一开始就横跳模板、文档和不同配置。",
            cue: "先定层",
          },
          {
            title: "方向明确：进 Templates / Use Cases",
            detail: "当目标已经清楚，就直接切到执行页，不继续停在概念理解和目录浏览。",
            cue: "转执行",
            href: "/templates",
            actionLabel: "打开模板中心",
          },
          {
            title: "最后回 Docs 收口",
            detail: "当你需要边界、顺序、失败分支和验证口径时，再回文档，不把文档当第一入口。",
            cue: "收口验证",
            href: "/docs/troubleshooting",
            actionLabel: "补看排障顺序",
          },
        ],
      }}
      sections={[
        {
          title: "FlowDock 首版真正解决的，不是“信息不足”，而是“顺序混乱”",
          body: "大多数人第一次用 FlowDock 的问题，不是找不到页面，而是不知道先去哪一页最关键。首页、Diagnose、Templates、Use Cases、Docs 看起来都像入口，但它们并不是并列关系。首版真正想解决的，是让你先抓住顺序感：先定层，再执行，最后再验证。",
          highlights: [
            { label: "首页负责", value: "建立框架和第一跳，不负责讲完所有细节" },
            { label: "Diagnose 负责", value: "把问题先压回更正确的层级", tone: "success" },
            { label: "执行层负责", value: "把方向变成一条能照着走的路径", tone: "success" },
            { label: "Docs 负责", value: "补边界、优先级、验证与失败分支", tone: "warning" },
          ],
          bullets: [
            "如果你把所有页面都当第一入口，得到的不是更多帮助，而是更多噪音",
            "FlowDock 最关键的价值，不是页面数量，而是它们之间的分工是否清楚",
            "先把顺序抓住，首版已经足够开始真正使用",
          ],
        },
        {
          title: "第一次进入，先只做这 3 个判断",
          body: "真正决定你下一步去哪的，不是你已经读了多少，而是你能不能先判断：问题是否模糊、方向是否明确、当前最需要的是归类还是执行。第一次起步时，只做这三个判断就够了。",
          highlights: [
            { label: "判断 01", value: "问题还模糊吗？如果模糊，先 Diagnose" },
            { label: "判断 02", value: "目标已经明确吗？如果明确，直接进 Templates / Use Cases", tone: "success" },
            { label: "判断 03", value: "你现在缺的是规则与验证吗？如果是，再回 Docs" },
          ],
          bullets: [
            "不要在还没判层时先翻很多模板",
            "不要在方向已明确时继续停在目录页理解概念",
            "不要把 Docs 当首页第二版，而要把它当收口层",
          ],
          links: [
            { href: "/diagnose", label: "先去 Diagnose", tone: "primary" },
            { href: "/templates", label: "直接看模板中心" },
            { href: "/use-cases", label: "按场景找入口" },
          ],
        },
        {
          title: "起步时最关键的，不是看更多页面，而是补对输入",
          body: "首版里多数误判，根本原因不是页面不够，而是你提供的现场信息不够。最值得先补齐的是：当前现象、你本来想达成什么、用了哪个 provider / model、有没有报错、最近改了什么。只要这些输入足够，Diagnose 和模板页命中率都会明显提高。",
          highlights: [
            { label: "当前现象", value: "到底哪里不对，不要只说“它不行了”" },
            { label: "目标结果", value: "你本来想让它做成什么" },
            { label: "关键环境", value: "provider / model / auth / transport / session", tone: "success" },
            { label: "最近变更", value: "最近一次改动常常就是最好用的排查起点" },
          ],
          bullets: [
            "输入越像真实现场，Diagnose 越容易抓对层",
            "模板页和场景页也更依赖输入质量，而不是只依赖你是否看懂说明",
            "第一次起步时，补输入比补更多想法更有价值",
          ],
        },
        {
          title: "第一天最稳的最小闭环：只求跑通一次真链路",
          body: "第一次用 FlowDock，不要追求一下子把所有能力接完。更稳的目标是拿一个真实任务，完成一次最小闭环：能判断、能执行、能验证。只要这个闭环出现，后面所有扩展才有基线。",
          highlights: [
            { label: "最小闭环的标准", value: "不是打开界面，而是完成一次真实任务链路", tone: "success" },
            { label: "最小闭环里包含", value: "明确目标、一次执行、一次验证、一次下一跳判断" },
            { label: "别追求", value: "首页逛完、模板看懂、文档理解完就算开始了", tone: "warning" },
          ],
          bullets: [
            "如果还没有最小闭环，就先别急着扩自动化、插件包和桌面接入",
            "第一次的重点是确认 FlowDock 对你是不是已经开始“有用”，不是是不是“看起来完整”",
            "闭环一旦跑通，后面每一层扩展都会更容易定位问题",
          ],
          links: [
            { href: "/templates/local-ai-assistant-starter", label: "看本地助手起步模板", tone: "primary" },
            { href: "/templates/ai-workflow-starter", label: "看 AI 工作流起步模板" },
          ],
        },
        {
          title: "失败分支：如果第一天就开始横跳多个入口，怎么把现场收回来",
          body: "第一次起步最容易出问题的一种情况，是刚接触 FlowDock 就同时开 Diagnose、Templates、Use Cases、Docs，还顺手改了几份配置。这样最难受的不是信息不够，而是你已经说不清哪一步真正改变了状态。更稳的做法是先把现场收回来：只保留一个主入口，再按“一步一验”的节奏继续。",
          highlights: [
            { label: "如果问题还模糊", value: "只保留 Diagnose 作为唯一主入口", tone: "success" },
            { label: "如果方向已明确", value: "只保留一份模板或一个 use case，不要三页并行读" },
            { label: "每一步之后", value: "都做一次最小验证，不把 4 个动作堆到最后一起验" },
          ],
          bullets: [
            "横跳入口不是积极探索，很多时候只是顺序感丢失",
            "起步时先收缩动作，比继续补更多入口更值钱",
            "只要顺序回来了，FlowDock 的页面分工才会开始发挥作用",
          ],
          links: [
            { href: "/diagnose", label: "回 Diagnose 重新起步", tone: "primary" },
            { href: "/templates", label: "只保留模板主链路" },
          ],
        },
        {
          title: "读完这页之后，下一步不该停在理解层",
          body: "起步指南的意义，不是让你理解完整站点，而是让你现在就能更稳地决定第一跳。只要你已经知道现在该先 Diagnose、先模板中心还是先使用场景，这页的任务就完成了。真正的价值在下一页，而不是这页本身。",
          highlights: [
            { label: "这页完成的标志", value: "你知道第一跳该去哪里", tone: "success" },
            { label: "不该发生的事", value: "你还准备继续多读两页再决定第一步", tone: "warning" },
            { label: "更稳的做法", value: "马上切到对应入口，并带着真实任务或真实异常去用" },
          ],
          bullets: [
            "如果你现在还模糊，就直接开 Diagnose",
            "如果你现在已经明确方向，就直接进模板或场景页",
            "如果你下一步需要的是验证和边界，再回对应 Docs 子页",
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
