import { DocShell } from "@/components/docs/doc-shell";

export default function TroubleshootingDocsPage() {
  return (
    <DocShell
      eyebrow="FlowDock / 文档 / 排障指南"
      title="排障指南"
      intro="这页不想把你推进更复杂的排障，而是想帮你更快看见：当前卡点更像哪一层、最常见的误判是什么、下一步到底该收缩动作还是升级验证。相比“多试几次”，FlowDock 当前更强调真实现场里的判断顺序。"
      badges={["文档 / Docs", "排障指南"]}
      summary={[
        { label: "排障起点", value: "先判层，再做单变量验证，不在噪音里猜" },
        { label: "高频现场", value: "切模型像是生效了、入口像是通了、文档像是都懂了，但真实链路仍没闭环" },
        { label: "收口标准", value: "不仅要恢复结果，还要知道根因在第几层、下次该怎么更快复现与规避" },
      ]}
      checklist={[
        {
          title: "动手前一定先做的判断",
          items: [
            "先判断卡点更像 provider / auth / transport、配置覆盖、session 绑定，还是入口接入层的问题",
            "先找最近一次稳定状态，不在已经混乱的现场上继续叠改动",
            "先定这轮只验证一个变量，别同时改模型、auth、配置文件和入口暴露",
          ],
        },
        {
          title: "这些信号出现时先别继续硬试",
          items: [
            "你已经改了两轮方案，但仍说不清到底哪一步真正生效",
            "开始同时查看 UI、配置、日志、会话和入口列表，却没有一个最小真测结果",
            "结果开始偶发成功一次，就想直接判定已经修好",
          ],
        },
        {
          title: "什么时候跳去其他入口更省时间",
          items: [
            "归类还模糊：先回 Diagnose，让问题先落到更明确的层级",
            "方向清楚但执行顺序不稳：切 Templates，按单变量节奏推进",
            "怀疑自己在拿首版能力强行做成熟产品预期：补看 Product Notes",
          ],
          mobileHidden: true,
        },
      ]}
      workflow={{
        eyebrow: "排障顺序",
        title: "把坏现场重新拉回可解释区间的顺序",
        description:
          "真正稳的排障不是动作更多，而是顺序更清楚：先判层，再做最小真测，再按结果选分支，最后把根因和回滚口径收干净。",
        steps: [
          {
            title: "先判层",
            detail: "先把问题压回连接、配置、会话或接入层，不要一开始就多层并排怀疑。",
            cue: "收缩现场",
            href: "/diagnose",
            actionLabel: "先做问题归类",
            tone: "primary",
          },
          {
            title: "做一次最小真测",
            detail: "只证明一件事：最小请求、最小会话或最小链路到底通没通，别同时改四件事再看结果。",
            cue: "真测",
          },
          {
            title: "按结果选分支",
            detail: "如果验证和猜测不一致，就回到更小粒度继续判层；如果一致，再去模板或回滚顺序。",
            cue: "分支判断",
          },
          {
            title: "收口结论",
            detail: "写清根因在哪层、哪一步证明确认、下次先从哪一步开始，不把“现在好了”当结束。",
            cue: "收口",
            href: "/docs/product-notes",
            actionLabel: "补看产品边界",
          },
        ],
      }}
      sections={[
        {
          title: "先把问题压回四层，不然越试越乱",
          body: "真实排障最常见的问题，不是不会修，而是一开始就在错层里加动作。FlowDock 当前最稳的办法，是先把问题压回四层：连接建立之前、配置生效之前、会话执行之中、入口触发之后。层级一旦判对，动作反而会变少。",
          highlights: [
            { label: "连接层", value: "provider / auth / transport 有没有真的打出有效请求" },
            { label: "配置层", value: "配置写在哪、谁覆盖谁、运行态有没有吃到" },
            { label: "会话层", value: "当前 session 是否还绑定旧模型、旧 profile、旧参数" },
            { label: "接入层", value: "入口可见不等于真实执行链路已经打通", tone: "warning" },
          ],
          bullets: [
            "如果你还说不清问题在哪一层，先别急着翻更多日志或多改几份配置",
            "如果已经有一个层级很像真因，就优先做这个层级的最小验证，而不是四处散射排查",
            "FlowDock 的 Diagnose / Templates / Docs 是按这套顺序感设计的，不是让你同时并排使用",
          ],
          links: [
            { href: "/diagnose", label: "先做问题归类", tone: "primary" },
            { href: "/docs/diagnose", label: "看 Diagnose 文档" },
          ],
        },
        {
          title: "案例 01：看起来已经切模型，输出却还是旧味道",
          body: "这是最容易被误判成“模型切换失败”的一类现场。很多时候并不是新模型不可用，而是当前 session 仍绑着旧参数、旧 profile，或者你只改了默认配置，却没触发真实运行态刷新。结果就是：页面、命令回显、配置文件都像是换了，实际输出还是旧行为。",
          highlights: [
            { label: "现场症状", value: "设置里显示已切换，但长会话里的表现几乎没变" },
            { label: "最常见误判", value: "把默认模型变化，误认成当前会话已完成切换", tone: "warning" },
            { label: "稳定处理", value: "先用最小新会话验证，再检查 session 绑定和运行态刷新", tone: "success" },
            { label: "不要先做", value: "不要一边怀疑模型本身，一边又同时改 auth、transport 和温度参数", tone: "warning" },
          ],
          bullets: [
            "先区分默认配置变了，还是当前会话真正吃到了新配置",
            "先用最小会话 / 最小请求验证，不要拿重上下文老会话当唯一依据",
            "如果配置文件已改但结果没变，优先怀疑加载路径、覆盖优先级和 session 复用，而不是先怀疑模型服务商挂了",
          ],
        },
        {
          title: "案例 02：入口能看到，但执行链路其实没真的通",
          body: "这类问题最容易骗过人。因为入口、按钮、菜单、工具列表看起来都在，用户会自然认为链路已经通了。但一旦开始真实执行，就可能发现工具不在 effective inventory、权限范围不对，或调用根本没发出。此时继续打磨展示层，往往只会延长误判。",
          highlights: [
            { label: "现场症状", value: "入口可见、列表可见，但真实动作没有结果或走错分支" },
            { label: "根因高发区", value: "工具暴露策略、权限范围、当前会话可见性、effective inventory" },
            { label: "稳定处理", value: "看一次最小真实执行，而不是只看 UI 截图或配置文本", tone: "success" },
            { label: "最危险误区", value: "把“看得到入口”直接等同于“执行链路已闭环”", tone: "warning" },
          ],
          bullets: [
            "新接入项先确认暴露规则、权限范围和当前 session 是否真的可见",
            "真实排障一定要有一次可复现的调用证据，而不是只停在配置或菜单状态",
            "如果入口存在但调用失败，优先去看链路哪一层没打通，而不是先补更多入口说明文案",
          ],
          links: [
            { href: "/templates/model-connection-debug", label: "看模型连接排查模板", tone: "primary" },
            { href: "/docs/product-notes", label: "补看当前产品边界" },
          ],
        },
        {
          title: "案例 03：文档都看过了，现场还是越做越乱",
          body: "这不是理解力问题，通常是执行顺序失控。你可能已经看了 Diagnose、Templates、Docs，甚至还额外开了几个页面和配置文件，但每一步都缺一个小验证。最后最难受的不是没思路，而是已经分不清自己是在修问题，还是在堆更多变量。",
          mobileHidden: true,
          highlights: [
            { label: "现场症状", value: "看了很多入口、改了很多地方，但说不清哪一步让状态变化" },
            { label: "常见源头", value: "并行开太多路径，缺少“一步一验”的节奏" },
            { label: "稳定处理", value: "强制收回到一条主链路，每完成一步就做一次小验证", tone: "success" },
            { label: "升级条件", value: "如果顺序感已经完全丢失，先回滚到最近稳定状态再继续" },
          ],
          bullets: [
            "先只选一个入口：归类、模板、或起步文档，不要三条线一起走",
            "每完成一步就留一个真测结果，不把 5 个动作堆到最后再一次性验",
            "如果开始靠感觉判断是否生效，说明你已经该回到更小粒度的验证节奏",
          ],
          links: [
            { href: "/docs/getting-started", label: "回起步文档" },
            { href: "/docs/templates", label: "按模板单变量推进", tone: "primary" },
          ],
        },
        {
          title: "分支图：最小验证打出来后，下一步到底往哪边走",
          body: "很多排障不是败在不会做，而是败在最小验证已经打出来了，却不知道下一步该去哪个入口。更稳的做法是按结果选分支：如果结果推翻了你的猜测，就回 Diagnose 重判层；如果结果支持你的猜测，但执行顺序还乱，就进 Templates；如果问题其实是预期过满，就补看 Product Notes。",
          highlights: [
            { label: "验证推翻猜测", value: "说明你一开始判层可能错了，先回 Diagnose 重归类", tone: "warning" },
            { label: "验证支持猜测", value: "说明可以往模板和具体执行步骤推进", tone: "success" },
            { label: "验证显示入口层都正常", value: "别继续执着技术排障，改去确认产品边界与期望管理" },
            { label: "最危险动作", value: "验证刚出来，就一口气再叠三四个变化", tone: "warning" },
          ],
          bullets: [
            "最小验证的价值，不只是证明一次对错，更是帮你决定该换哪个入口继续",
            "如果验证和认知不一致，先收缩，不要立刻升级动作强压过去",
            "当你知道为什么跳入口，FlowDock 的路径设计才真正开始生效",
          ],
          links: [
            { href: "/diagnose", label: "回 Diagnose 重归类", tone: "primary" },
            { href: "/templates", label: "转模板继续推进" },
          ],
        },
        {
          title: "失败分支：什么时候该停手，而不是继续叠动作",
          body: "很多排障并不是败在技术难度，而是败在没有及时停手。你越想用更多动作把不确定性压过去，越容易把原本可以定位的问题扩成整体混乱。真正稳的排障，往往都知道什么时候该暂停、该回滚、该换成更小验证。",
          highlights: [
            { label: "该停手的信号", value: "你已经无法明确说出这轮在验证哪个唯一变量", tone: "warning" },
            { label: "该回滚的信号", value: "两轮改动后仍无可复现结论，且每轮都改了不止一个层级", tone: "warning" },
            { label: "该升级验证的信号", value: "原则已很清楚，但缺真实最小调用、最小会话或最小链路证据" },
            { label: "更稳做法", value: "停掉扩散式试错，改成一次只证明一件事", tone: "success" },
          ],
          bullets: [
            "“我再顺手改一个地方看看”通常就是排障开始漂移的标志",
            "停手不是放弃，而是保护你还剩下的判断信息不被继续污染",
            "如果必须升级动作，也要先把上一轮的结论写清，不然你会失去复盘基线",
          ],
        },
        {
          title: "最稳的回滚顺序：不是全删重来，而是一层层撤",
          body: "当你已经叠了几轮修改，最稳的回滚方式通常不是一次全盘清空，而是从最近一层新增改动开始，逐层撤回，并且每撤一层就做一次最小验证。这样你不会把“到底哪一步有效”这条线索一起删掉。",
          highlights: [
            { label: "回滚第一步", value: "先撤最近新增的一层改动，不直接做全盘清空" },
            { label: "每层动作", value: "撤一层，立刻做一次最小验证，看状态是否回到可解释区间" },
            { label: "重新前进", value: "稳定后再一层层引入新变化，保持单变量节奏", tone: "success" },
            { label: "别这样做", value: "不要一次删干净再凭印象重配，那会让因果信息一起丢失", tone: "warning" },
          ],
          bullets: [
            "回滚的目标不是恢复表面平静，而是把问题重新压回可解释状态",
            "如果撤一层后立刻恢复，说明问题很可能就在最近一层新增改动里",
            "如果撤两层仍没有明确变化，说明一开始问题分层可能就判错了，需要回到 Diagnose 重归类",
          ],
          links: [
            { href: "/diagnose", label: "回 Diagnose 重新归类", tone: "primary" },
            { href: "/templates", label: "按模板重新推进" },
          ],
        },
        {
          title: "排障完成的标准：不是“看起来恢复了”，而是你能更快再做一次",
          body: "真正的排障收口至少满足三件事：目标行为已经稳定复现、你知道根因属于哪一层、下一次遇到时能更快定位。如果只满足第一件，那往往只是暂时恢复。FlowDock 这套文档、模板和诊断入口的意义，就是帮你把一次修复沉淀成下次更稳的路径。",
          mobileHidden: true,
          highlights: [
            { label: "结果层", value: "目标行为已稳定复现，而不是偶发成功一次", tone: "success" },
            { label: "原因层", value: "能明确归因到 auth、配置覆盖、session 绑定或接入链路中的某一层" },
            { label: "复用层", value: "下一次遇到时，你知道先从哪一步验证、何时该停手回滚", tone: "success" },
            { label: "不算完成", value: "只是“现在好像好了”，但仍说不清为什么会好", tone: "warning" },
          ],
          bullets: [
            "如果问题有复发概率，最好顺手把结论沉淀到模板、检查清单或文档入口里",
            "排障收口不是为了写得很像结案报告，而是为了下次少走弯路",
            "当你能把根因、验证和回滚顺序说清时，文档才真正开始为产品加分",
          ],
          links: [
            { href: "/templates", label: "把经验沉淀到模板" },
            { href: "/docs/product-notes", label: "再看当前边界" },
          ],
        },
      ]}
      ctaLinks={[
        { href: "/diagnose", label: "先做问题归类", tone: "primary" },
        { href: "/templates", label: "按模板单变量推进" },
        { href: "/docs/product-notes", label: "确认当前产品边界" },
      ]}
    />
  );
}
