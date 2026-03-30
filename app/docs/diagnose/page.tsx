import { DocShell } from "@/components/docs/doc-shell";

export default function DiagnoseDocsPage() {
  return (
    <DocShell
      eyebrow="FlowDock / Docs / Diagnose"
      title="Diagnose 文档"
      intro="Diagnose 当前更像一个规则型诊断路由器：它不负责替你包办所有判断，而是先把问题压回更正确的层级，再给出可解释的归类、优先级和下一跳资源。它的价值不在‘像万能助手’，而在真实现场里帮你少走错路。"
      badges={["Docs", "Diagnose", "规则型 V2"]}
      summary={[
        { label: "当前定位", value: "先把问题归对层，再把你送去更合适的模板和文档入口" },
        { label: "最适合的现场", value: "知道有问题，但还判断不出是连接、配置、Session 还是工具接入层" },
        { label: "最该避免的误判", value: "把 Diagnose 当成最终答案，而不是下一步执行顺序的生成器" },
      ]}
      checklist={[
        {
          title: "什么情况下最该先开 Diagnose",
          items: [
            "你只知道‘现在不对’，但还分不清问题属于连接层、配置层、Session 层还是工具接入层",
            "你已经改过两轮，但不确定到底是没修好，还是一开始就改错层了",
            "你想先拿到一条更稳的排查顺序，而不是靠感觉继续横跳多个入口",
          ],
        },
        {
          title: "哪几类输入最能显著提高判断稳定性",
          items: [
            "问题类型 / 场景：让诊断器优先走更接近真实现场的分支",
            "provider / model / auth / transport：帮助区分模型连接问题和会话/配置问题",
            "当前现象 / 报错文本 / 配置片段 / 期望结果：决定判断依据、缺失项提示和资源推荐质量",
          ],
        },
        {
          title: "读结果别跳步",
          items: [
            "先看 summary 和 risk level，判断现在该继续试还是先停手收缩变量",
            "再看判断依据、缺失输入和评分拆解，确认 Diagnose 有没有抓住你的真实问题",
            "最后按修复步骤和资源优先级推进，不把 Diagnose 结果当成最终结案",
          ],
        },
      ]}
      workflow={{
        eyebrow: "Use flow",
        title: "Diagnose 最稳的现场使用顺序",
        description:
          "把 Diagnose 用得稳，不在于你一次填多少，而在于你有没有按顺序：先定问题层，再补关键字段，再确认判断依据，最后再跳执行页。这样结果才不会重新滑回盲试。",
        steps: [
          {
            title: "先压层级",
            detail: "先判断自己现在更像连接、配置、Session 还是工具接入问题，别一开始就把不同层的信号混在一起。",
            cue: "起点",
            href: "/diagnose",
            actionLabel: "打开 Diagnose",
            tone: "primary",
          },
          {
            title: "再补最值钱的字段",
            detail: "优先补 issueType / scenario / provider / model / auth / transport / symptom / error / expected，不靠一句‘不对’硬猜。",
            cue: "输入质量",
          },
          {
            title: "先验证归类，再看动作",
            detail: "先看 summary、risk、diagnosisBasis、missingInputs、scoreBreakdown，确认它抓住的是你的真实现场。",
            cue: "解释层",
          },
          {
            title: "最后才跳模板或文档",
            detail: "当 Diagnose 已把方向压清，你再进入 Templates 或 Troubleshooting；不要反过来把建议当成直接结案。",
            cue: "下一跳",
            href: "/templates",
            actionLabel: "去模板中心",
          },
        ],
      }}
      sections={[
        {
          title: "Diagnose 现在最该被理解成什么：规则型路由器，不是万能诊断器",
          body: "Diagnose 当前故意保持规则型 V2，而不是直接走自由生成式全覆盖。这样做不是保守，而是为了保证结果更可解释：为什么判成这一类、哪些字段让它这么判、还缺什么输入、下一步该先点模板还是先补文档。对首版来说，这种稳定的‘先归类、再引导’比表面上更聪明但不可控的输出更有价值。",
          highlights: [
            { label: "它最擅长", value: "把问题先压回连接、配置、Session、工具接入 4 个主层级" },
            { label: "它不负责", value: "替你自动生成所有复杂策略或覆盖全部异常长尾", tone: "warning" },
            { label: "它最重要的价值", value: "让下一步动作更清楚，而不是让页面看起来更聪明", tone: "success" },
            { label: "最危险误判", value: "把规则型结果误当成全场景结论，而不是可解释的起步判断", tone: "warning" },
          ],
          bullets: [
            "首版阶段更需要稳定可解释的归类，而不是看起来很强但无法复盘的黑箱输出",
            "Diagnose 的真正作用，是在你还没搞清问题之前，先减少错误方向上的试错成本",
            "只要它能更快把你送到对的模板或文档，它就在做对的事",
          ],
        },
        {
          title: "案例 01：你知道有问题，但完全说不清错在第几层",
          body: "这是 Diagnose 最典型、也最值得优先使用的现场。比如你只知道‘连不上’、‘切了还像旧模型’、‘入口在但执行没反应’，但还分不清这是 provider / auth / transport、配置没生效、Session 没更新，还是工具接入链路没通。此时如果直接改参数或跳模板，很容易一开始就走偏。",
          highlights: [
            { label: "现场症状", value: "问题存在，但你还没有正确层级感" },
            { label: "为什么适合 Diagnose", value: "它先做分层归类，不要求你一开始就知道精确修法", tone: "success" },
            { label: "最小输入", value: "至少给出问题类型、场景、当前现象或报错中的一类明确信息" },
            { label: "别先做", value: "别一上来就同时改 auth、配置、Session 和工具入口", tone: "warning" },
          ],
          bullets: [
            "如果你当前最缺的是‘问题到底属于哪类’，那 Diagnose 比模板更该先开",
            "它给你的第一价值不是修复步骤本身，而是把判断口径先压到正确层级",
            "分层一旦判对，后面的模板和排障文档才真正开始节省时间",
          ],
          links: [
            { href: "/diagnose", label: "打开 Diagnose", tone: "primary" },
            { href: "/docs/troubleshooting", label: "看排障顺序文档" },
          ],
        },
        {
          title: "案例 02：你已经改了两轮，开始怀疑自己是不是一开始就改错层了",
          body: "当现场已经出现‘改过两轮，但还是说不清到底哪一步生效’这种信号时，Diagnose 的作用就不再只是起步，而是帮你把已经发散的现场重新收回来。它会把显式问题类型、场景、关键词命中和字段完整度一起纳入归类，让你看见当前更像哪一类，而不是继续凭感觉硬试。",
          highlights: [
            { label: "常见现场", value: "UI 看着像切了，结果却还是旧的；或配置写了，但行为始终没变" },
            { label: "稳定做法", value: "先让 Diagnose 帮你把问题重新压回更像真的层，再决定要不要回滚或换模板", tone: "success" },
            { label: "它提供的帮助", value: "判断依据、缺失信息、评分拆解，而不是一句模糊结论" },
            { label: "高频误区", value: "看到一个像样的建议，就立刻继续扩大动作，而不先确认归类是否抓对", tone: "warning" },
          ],
          bullets: [
            "当你已经失去顺序感时，Diagnose 的价值在于帮你恢复‘先做什么’的秩序",
            "先看它判的是哪一层，再去看判断依据是否贴合你的真实现象",
            "如果它抓错层，也能通过缺失输入与评分拆解更快发现为什么会抓错",
          ],
        },
        {
          title: "案例 03：为什么输入越完整，结果越稳",
          body: "Diagnose 不是纯关键词匹配页，也不是只靠一个下拉框做判断。当前 V2 会综合显式问题类型、场景加权、关键词命中、字段完整度来做归类。也正因此，输入越像真实现场，结果越容易稳定；输入只剩一句‘不对’，它仍能给方向，但可信度自然会下降。",
          highlights: [
            { label: "高价值输入 01", value: "issueType / scenario：先把问题推向更接近真实现场的分支" },
            { label: "高价值输入 02", value: "provider / model / auth / transport：帮助区分连接层和运行态层" },
            { label: "高价值输入 03", value: "symptom / error / config / expected：决定判断依据、缺失项和建议质量", tone: "success" },
            { label: "输入不足时", value: "仍会返回结果，但会主动提示稳定性不足与缺失字段", tone: "warning" },
          ],
          bullets: [
            "如果你只填了现象，没有填期望结果，Diagnose 可能知道哪里不对，却不一定知道你想修到哪种状态",
            "如果你只给了模型名，没有给 auth / transport，连接类问题的归类会更像粗分而不是细分",
            "最稳的方式不是一次写很多，而是至少把能明确区分问题层级的字段补齐",
          ],
        },
        {
          title: "案例 04：结果要按什么顺序读，才不会又跳回盲试",
          body: "Diagnose 的输出不是让你整页平均浏览的。更稳的阅读顺序是：先看 summary 和 risk level，判断现在该继续推进还是先停手；再看 judgement basis、missing inputs、confidence note，确认它有没有抓住你的真实现象；然后再看 score breakdown、pattern signals、scenario examples，最后才进入 fix steps 和 recommended resources。顺序一反过来，就容易把建议当成结论。",
          highlights: [
            { label: "第一眼先看", value: "summary + risk level：先判断问题性质与当前风险" },
            { label: "第二步再看", value: "diagnosisBasis / missingInputs / confidenceNote：确认它是不是抓对了现场" },
            { label: "第三步补判断", value: "scoreBreakdown / patternSignals / scenarioExamples：看它为什么更像这一类", tone: "success" },
            { label: "最后才执行", value: "fixSteps + recommendedResources：别还没确认归类就直接照着做", tone: "warning" },
          ],
          bullets: [
            "summary 是方向，不是证明；真正的证明来自判断依据和可对照的现场信号",
            "missing inputs 不是可有可无的提示，而是它在提醒你为什么这轮别下太满的结论",
            "resource priority 的作用，是告诉你下一跳最值钱的入口，而不是让你所有资源都点一遍",
          ],
          links: [
            { href: "/templates/model-connection-debug", label: "看模型连接排查模板", tone: "primary" },
            { href: "/docs/templates", label: "看模板使用文档" },
          ],
        },
        {
          title: "失败分支：如果 Diagnose 暂时抓不准，别继续乱填，而是补最小证据",
          body: "真实现场里最容易出问题的一种情况，是 Diagnose 已经给了结果，但你自己也觉得‘不像完全抓对’。这时候最危险的不是工具不够聪明，而是你顺着一个半对半错的归类继续叠动作。更稳的做法是先把现场收缩回来：补一条更像真的 symptom / error / expected，或者把问题重新压到更明确的问题类型与场景，而不是继续塞更多模糊描述。",
          highlights: [
            { label: "该怀疑归类的信号", value: "评分拆解、判断依据和你的真实现象明显对不上", tone: "warning" },
            { label: "先补什么", value: "补最小可复现现象、关键报错和期望结果，而不是继续写长描述", tone: "success" },
            { label: "什么时候回 Troubleshooting", value: "当你已经能大致判层，但需要更稳的停手 / 回滚 / 单变量节奏" },
            { label: "什么时候回 Templates", value: "当方向已清楚，只是需要一个更稳的执行顺序", tone: "success" },
          ],
          bullets: [
            "Diagnose 的失败分支，不是‘工具废了’，而是提醒你现在需要更小、更真、更能区分层级的输入",
            "如果你已经能确认方向，却总在 Diagnose 里兜圈，说明该切执行页而不是继续求更长结论",
            "当解释层与现场不贴时，优先修正输入质量，不要继续扩大操作面",
          ],
          links: [
            { href: "/docs/troubleshooting", label: "转排障顺序文档", tone: "primary" },
            { href: "/templates", label: "直接看模板中心" },
          ],
        },
        {
          title: "最容易误判的地方：把 Diagnose 当成最终答案，而不是下一跳路由",
          body: "Diagnose 现在最容易被误用的地方，就是因为它输出已经有解释、评分和资源推荐，看起来很像‘已经分析完了’，于是用户直接把它当最终结论。其实它当前更像一个高质量路由器：先帮你收缩变量、划对层级、指出高概率路径，然后再把你送去更适合执行和验证的页面。",
          highlights: [
            { label: "它像什么", value: "一个会解释原因的起步诊断器 / 路由器", tone: "success" },
            { label: "它不像什么", value: "全场景万能分析器或自动结案器", tone: "warning" },
            { label: "最稳用法", value: "先用它定层，再用模板或排障文档把真实验证做完" },
            { label: "最危险用法", value: "看完一页结果就继续大改现场，而不做最小验证", tone: "warning" },
          ],
          bullets: [
            "如果 Diagnose 把你送去 Templates，说明现在更需要执行顺序，不只是理解说明",
            "如果它更推荐 Docs，说明当前更需要先补边界、优先级或验证口径",
            "真正完成排障的证明，永远来自后续验证，不来自 Diagnose 页面本身",
          ],
          links: [
            { href: "/templates", label: "进入模板中心", tone: "primary" },
            { href: "/docs/troubleshooting", label: "看排障收口标准" },
          ],
        },
        {
          title: "当前边界：为什么首版只覆盖 4 类问题，而且还保留规则型",
          body: "Diagnose 当前只聚焦 4 类问题：模型连接、配置不生效、模型切换 / Session 异常、本地助手 / 工具接入问题。这个范围不是随便定的，而是围绕当前产品最常见、最值得形成统一入口的现场来收。首版先把高频路径做稳，再继续往 Diagnose V2+ 的解释密度、失败信号和资源贴合度扩。",
          highlights: [
            { label: "当前覆盖", value: "连接问题 / 配置问题 / Session 切换问题 / 工具接入问题" },
            { label: "暂不承诺", value: "所有长尾异常、自由生成式深推理、全场景一页解决", tone: "warning" },
            { label: "当前优势", value: "范围收窄后，解释和推荐资源更容易保持稳定", tone: "success" },
            { label: "下一步方向", value: "继续增强解释密度、失败信号模板和资源贴合度" },
          ],
          bullets: [
            "如果你的问题明显超出这 4 类，Diagnose 仍可能给方向，但不该把它当完整覆盖承诺",
            "规则型不是缺点，前提是它能持续减少误判并把你送到更合适的下一步",
            "对首版来说，边界清楚比表面上更大更全更重要",
          ],
        },
        {
          title: "Diagnose 和 Templates / Docs 的关系：它负责定层，后两者负责落地与收口",
          body: "Diagnose 的自然位置不是终点，而是入口中枢。它先帮你判断问题更像哪一层、当前该先修什么，再把你送到模板、排障文档、产品边界文档或起步文档。只有这三层形成清晰分工，整个 FlowDock 才会更像工作台，而不是资料堆。",
          highlights: [
            { label: "Diagnose 负责", value: "分层归类、解释判断、给出下一跳" },
            { label: "Templates 负责", value: "把方向变成按步骤执行的主链路", tone: "success" },
            { label: "Docs 负责", value: "补边界、优先级、验证口径和失败分支" },
            { label: "正确节奏", value: "先定层，再执行，再复核，而不是三边同时跳", tone: "success" },
          ],
          bullets: [
            "如果方向还模糊，先开 Diagnose；如果方向已清楚但不会推进，进 Templates；如果缺边界与判断口径，再看 Docs",
            "这也是 Diagnose 文档需要案例层表达的原因：它的价值来自真实现场中的使用顺序，而不是字段列表本身",
            "当这三层配合顺了，产品路径感就会明显强于单页完成度",
          ],
          links: [
            { href: "/diagnose", label: "打开 Diagnose", tone: "primary" },
            { href: "/templates", label: "查看模板中心" },
            { href: "/docs/getting-started", label: "回起步文档" },
          ],
        },
      ]}
      ctaLinks={[
        { href: "/diagnose", label: "直接进入 Diagnose", tone: "primary" },
        { href: "/templates", label: "查看可承接模板" },
        { href: "/docs/troubleshooting", label: "补排障顺序文档" },
      ]}
    />
  );
}
