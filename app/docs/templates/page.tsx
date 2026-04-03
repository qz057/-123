import { DocShell } from "@/components/docs/doc-shell";

export default function TemplatesDocsPage() {
  return (
    <DocShell
      eyebrow="FlowDock / 文档 / 模板说明"
      title="模板说明"
      intro="Templates 不是文章目录，也不是纯展示区。它是承接 Diagnose 结果和明确目标任务的执行层，重点是让你快速拿到一套可复用、可验证、可扩展的推进路径。它真正的价值，不是让你读懂模板，而是让你照着模板完成一轮真实推进。"
      badges={["文档 / Docs", "模板说明"]}
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
      workflow={{
        eyebrow: "执行顺序",
        title: "把模板用成执行路径，而不是阅读材料",
        description:
          "模板真正的价值不在于内容多，而在于它能把“我接下来先做什么”压成更稳的主链路。更稳的顺序是：先确认模板选对，再补输入，按单变量推进，最后把 done signal 与回滚口径收清。",
        steps: [
          {
            title: "先判断模板是不是选对了",
            detail: "先看 fit signals / not fit signals，而不是看到标题接近就直接开始做。",
            cue: "先选对",
            href: "/templates",
            actionLabel: "打开模板中心",
            tone: "primary",
          },
          {
            title: "再补齐最关键的输入",
            detail: "把账号、报错、配置片段、运行环境和目标结果先补齐，不在输入残缺时硬推进。",
            cue: "补输入",
          },
          {
            title: "执行时坚持单变量推进",
            detail: "一次只改一层、验一层，不把 4 个动作一起堆到最后再判断是否成功。",
            cue: "主链路",
          },
          {
            title: "最后看 done signal 和回滚口径",
            detail: "模板不是看到最后就算完成，必须确认真实输出、失败信号和回滚步骤都可复用。",
            cue: "验收 / 回滚",
            href: "/docs/troubleshooting",
            actionLabel: "补看排障顺序",
          },
        ],
      }}
      sections={[
        {
          title: "分类体系为什么这样划分",
          body: "首版按 4 类组织，是为了贴近真实任务心智，而不是按抽象功能模块分类。这样用户更容易判断自己当前处在搭建、排障、自动化扩展还是产品化接入阶段。",
          highlights: [
            { label: "搭建类", value: "从 0 到 1 跑通最小闭环" },
            { label: "排障类", value: "配置、连接、切换异常优先处理", tone: "success" },
            { label: "自动化类", value: "把一次性使用升级成稳定流程" },
            { label: "产品化类", value: "把能力接进桌面壳或更完整的工作环境", tone: "warning" },
          ],
          bullets: [
            "分类的目标不是学术准确，而是帮助你更快选对当前阶段",
            "只要能更快把你送进正确模板，这套分类就算有效",
            "分类一旦选对，详情页里的步骤、回滚和验收才真正开始值钱",
          ],
        },
        {
          title: "真正开始用模板前，先做这 3 个判断",
          body: "模板最常见的误用，不是步骤看不懂，而是拿错模板就开始做。首版更稳的做法是先判断：这份模板是不是当前阶段该用、你手里的输入是否够、做完以后你准备怎么验收。先想清楚这三件事，再执行会顺很多。",
          highlights: [
            { label: "阶段判断", value: "你现在是搭建、排障、自动化，还是产品化接入" },
            { label: "输入判断", value: "账号、配置片段、报错文本、运行环境是否齐了" },
            { label: "验收判断", value: "做完以后你要用什么最小验证证明它真的跑通", tone: "success" },
          ],
          bullets: [
            "如果阶段都判不清，就先回 Diagnose，不要继续挑模板",
            "如果输入残缺，模板再好也只能给你半截帮助",
            "如果没有验收口径，执行越多，误判概率越高",
          ],
          links: [
            { href: "/diagnose", label: "先回 Diagnose", tone: "primary" },
            { href: "/use-cases", label: "按场景重新选入口" },
          ],
        },
        {
          title: "模板详情页现在真正包含哪些关键块",
          body: "当前模板详情页已经不是简单正文，而是执行型结构：问题定义、适用场景、前置条件、输入/输出、步骤、执行检查、失败信号、回滚策略、案例和 FAQ。它的目标是让你在一页内完成“判断能不能做 + 具体怎么做 + 做完怎么验收”。",
          highlights: [
            { label: "适用判断", value: "先看这份模板是不是现在该用" },
            { label: "步骤与检查", value: "避免只看懂、不验证", tone: "success" },
            { label: "失败信号与回滚", value: "避免越修越乱", tone: "warning" },
            { label: "相关模板与文档", value: "让下一跳明确，而不是断在当前页" },
          ],
          bullets: [
            "模板页的价值，不是文字多，而是结构能不能支撑真实推进",
            "看懂步骤不是结束，做到 done signal 才算真正用到了模板",
            "回滚和 FAQ 不是附录，而是首版模板是否可信的关键部分",
          ],
          links: [
            { href: "/templates", label: "打开模板中心", tone: "primary" },
            { href: "/docs/troubleshooting", label: "补看排障顺序" },
          ],
        },
        {
          title: "最稳的执行方式：单变量推进",
          body: "模板真正有价值的地方，不是给你一份长步骤，而是让你按稳定顺序推进。执行时最稳的方式通常不是同时改很多层，而是一次只推进一个变量：改一处、验一处、确认无误后再进入下一步。这样即使失败，也更容易知道该回滚哪里。",
          highlights: [
            { label: "先改关键路径", value: "不先改边缘优化项" },
            { label: "每阶段都验", value: "每做完一个阶段，就做一次最小验证", tone: "success" },
            { label: "如果结果不对", value: "优先回到上一个稳定点，而不是继续叠动作", tone: "warning" },
          ],
          bullets: [
            "一次只验证一个变量，你才知道哪一步真正改变了状态",
            "模板越实用，越不会鼓励你一次改四层",
            "FlowDock 的模板页应该帮助你减少动作，而不是扩大动作面",
          ],
        },
        {
          title: "什么时候先回 Diagnose，而不是继续翻模板",
          body: "如果你已经开始怀疑自己选错模板，或者发现当前问题同时像连接、配置、会话三种问题混在一起，就该先回 Diagnose 重新归类。Templates 擅长承接明确方向，不擅长替代问题归类。",
          highlights: [
            { label: "该回 Diagnose 的信号 01", value: "现象描述不稳定，今天像 auth、明天像 session" },
            { label: "该回 Diagnose 的信号 02", value: "已经换了两个模板仍然无法推进", tone: "warning" },
            { label: "该回 Diagnose 的信号 03", value: "你能描述现象，但说不清问题真正属于哪一层" },
          ],
          bullets: [
            "模板是承接层，不是判层层",
            "当问题层级都不稳定时，继续翻模板只会加重混乱",
            "一旦回到正确层级，再回来用模板，效率会高很多",
          ],
          links: [
            { href: "/diagnose", label: "回 Diagnose 重新判断", tone: "primary" },
            { href: "/use-cases", label: "按使用场景找入口" },
          ],
        },
        {
          title: "失败分支：模板越换越乱时，怎么把现场收回来",
          body: "模板使用里最常见的失败分支，不是模板内容不够，而是你一旦发现这份模板没立刻解决问题，就开始横跳第二份、第三份。结果不是路径更多，而是顺序感更差。更稳的做法是先停手，把现场收回到一条主链路：确认你现在到底是选错模板，还是输入不足，还是执行时一次改了太多变量。",
          highlights: [
            { label: "如果问题层级本身还模糊", value: "先回 Diagnose，不要继续横跳模板", tone: "success" },
            { label: "如果模板方向没错", value: "先检查是不是输入不全或缺最小验证" },
            { label: "如果状态越来越乱", value: "优先按回滚步骤撤到上一稳定点再继续", tone: "warning" },
          ],
          bullets: [
            "模板不是越多越好，真正值钱的是当前只保留一条最像正确的主链路",
            "如果你开始靠感觉判断模板是否生效，说明已经该收缩动作了",
            "把模板用成“一个入口接一个入口”的节奏，会明显比“并排多页试”更稳",
          ],
          links: [
            { href: "/diagnose", label: "回 Diagnose 重新归类", tone: "primary" },
            { href: "/docs/troubleshooting", label: "看回滚与停手顺序" },
          ],
        },
        {
          title: "什么时候该从模板升级到场景页",
          body: "如果你发现自己看的已经不只是某一份模板，而是一整段任务链，例如“先接模型、再接工具、再做自动化、最后接桌面壳”，这时更适合切到 Use Cases。模板适合解决一段明确动作，场景页适合帮你组织完整流程。",
          highlights: [
            { label: "模板适合", value: "单段动作、明确目标、明确输入" },
            { label: "场景页适合", value: "多段任务、多个决策点、需要整体顺序感", tone: "success" },
            { label: "两者关系", value: "局部执行和整体组织，不是谁替代谁" },
          ],
          bullets: [
            "模板页帮你把一段动作做实，场景页帮你把整段路径组织起来",
            "当你已经开始跨多个模板做决策，就说明更适合转场景页了",
            "模板与场景页配合顺了，FlowDock 才更像工作台而不是资料站",
          ],
          links: [
            { href: "/use-cases", label: "查看使用场景", tone: "primary" },
            { href: "/docs/getting-started", label: "回到起步文档" },
          ],
        },
      ]}
      ctaLinks={[
        { href: "/templates", label: "打开模板中心", tone: "primary" },
        { href: "/diagnose", label: "先做问题归类" },
        { href: "/use-cases", label: "按场景选路径" },
      ]}
    />
  );
}
