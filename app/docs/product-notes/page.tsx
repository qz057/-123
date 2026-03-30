import { DocShell } from "@/components/docs/doc-shell";

export default function ProductNotesPage() {
  return (
    <DocShell
      eyebrow="FlowDock / Docs / Product Notes"
      title="Product Notes"
      intro="这页不负责教你怎么操作，而是负责把 FlowDock 当前到底完成到哪一步、哪些部分已经可以放心使用、哪些地方还不该被误判成成熟产品说清楚。它的价值不在制造完成感，而在帮你建立正确预期。"
      badges={["Docs", "Product Notes"]}
      summary={[
        { label: "当前阶段", value: "首版主链路已跑通，正在从可用骨架继续往产品级收口" },
        { label: "相对稳定", value: "首页入口关系、Diagnose 主链路、Templates/Docs 互链已具备基本闭环" },
        { label: "还没收死", value: "视觉细抠、案例层深度、失败分支覆盖和 Diagnose V2+ 仍在持续增强" },
      ]}
      checklist={[
        {
          title: "现在已经具备的能力",
          items: [
            "首页、Diagnose、Templates、Use Cases、Docs、About 六条主路径都已落地",
            "Diagnose 已支持结构化输入、规则分析、解释层和资源跳转",
            "Templates / Use Cases / Docs 之间已形成初步互链闭环，不再是孤页堆叠",
          ],
        },
        {
          title: "现在还在继续增强的部分",
          items: [
            "首页品牌感、信息节奏和卡片语言还在继续统一",
            "docs 子页的案例层、失败分支和更像真实现场的说明仍在补",
            "Diagnose 的解释精度、失败信号模板和资源贴合度会继续往 V2+ 推",
          ],
        },
        {
          title: "读这页最适合的时机",
          items: [
            "你想判断现在能不能拿它直接推进真实任务",
            "你担心某个能力只是页面看起来完整，实际还没完全成熟",
            "你想知道下一阶段默认优先级，而不是只盯当前静态页面",
          ],
        },
      ]}
      sections={[
        {
          title: "FlowDock 现在到底到了哪一步",
          body: "FlowDock 已经明确越过‘只有方案和蓝图’的阶段，进入了可运行首版。也就是说，现在你看到的不是一套空壳页面，而是一条能够建立入口关系、给出诊断判断、承接模板与文档的主路径。但它当前更接近‘已经能工作、仍在产品化收口’的状态，而不是所有细节都已经定稿。",
          bullets: [
            "已经不是概念站：核心页面与真实内容层都已落地",
            "已经不是孤立页面：首页、Diagnose、Templates、Docs 之间能互相承接",
            "也还不是终版：视觉、案例层和边界表达仍在继续收口",
          ],
        },
        {
          title: "今天可以相对放心依赖的主链路",
          body: "如果你现在进入 FlowDock，最值得依赖的不是某一个漂亮页面，而是它已经形成了几条相对稳定的使用路径：先用首页判断入口，再用 Diagnose 做归类，再进入 Templates / Docs / Use Cases 找落地方案。这种‘路径感’是它目前最重要的成熟信号。",
          bullets: [
            "首页已经能解释主入口关系，不再只是展示文案",
            "Diagnose 已具备规则型解释层，不只是输入表单 + 一句结论",
            "Templates / Use Cases / Docs 已能互相导流，降低用户横跳成本",
          ],
          links: [
            { href: "/", label: "回首页看入口关系" },
            { href: "/diagnose", label: "直接打开 Diagnose", tone: "primary" },
          ],
        },
        {
          title: "现在最不该误判成‘已经做完’的部分",
          body: "首版最危险的误判不是它不够强，而是因为局部已经很像成品，就被当成整体已经成熟。当前最需要主动防止的，就是把‘主链路已打通’误读成‘所有深层案例都补齐了’，把‘首页更完整了’误读成‘所有子页都已经设计定稿了’。",
          bullets: [
            "首页更像产品官网了，不等于每个正文页都已经达到终稿层级",
            "Diagnose 已能解释高频问题，不等于它已经覆盖所有异常场景",
            "模板与文档已能承接主路径，不等于案例库和失败分支已经补满",
          ],
        },
        {
          title: "哪些人最适合现在就用它",
          body: "当前版本最适合两类人：一类是已经知道自己要解决什么问题，但缺一个更有顺序感入口的人；另一类是正在搭自动化流程，需要把方案、诊断和模板组织成可执行路径的人。它已经不只是用来‘看想法’，而是适合拿来帮助真实任务起步。",
          bullets: [
            "需要先快速判断问题方向，而不是盲目调配置的人",
            "需要把常见执行路径沉淀成模板的人",
            "需要把官网、工具入口和文档说明放到同一套产品结构里的人",
          ],
        },
        {
          title: "哪些期待现在还不该强加给它",
          body: "如果你期待的是‘全场景自动诊断、全失败分支覆盖、所有内容页设计稿级定稿’，那现在还不是它的当前形态。FlowDock 现阶段更强调可靠推进和主链路清晰，而不是用很大的外观成熟感掩盖还没补完的深层工作。",
          bullets: [
            "别把 Diagnose 当成自由生成式万能诊断器",
            "别把首批模板当成已经覆盖全部自动化场景的模板库",
            "别把 docs 当前的执行型正文，误判成案例库已经完整成册",
          ],
          links: [
            { href: "/docs/troubleshooting", label: "看排障边界" },
            { href: "/docs/getting-started", label: "回起步文档" },
          ],
        },
        {
          title: "为什么它现在仍然值得继续推进",
          body: "因为最难的那段‘从 0 到 1 搭出核心结构’已经过去了。当前已经有真实路由、真实内容、真实互链、真实浏览器审看与 DOM 审计流程，后面的增强会开始累计收益，而不是每次都重新开荒。对一个正在收口的产品来说，这个阶段的每次优化都会更靠近真正可交付。",
          bullets: [
            "后续增强会围绕真实页面和真实路径继续推进，而不是回到纯方案层",
            "视觉复看、浏览器截图、DOM 审计已经形成可复用工作流",
            "现在的改动更像产品 polish，而不是继续补最初骨架",
          ],
        },
        {
          title: "下一阶段默认优先级",
          body: "接下来默认仍然沿着‘更像真产品’这条线推进：先继续收口首页和内容总览页的视觉层与品牌一致性，再把 docs 子页的案例层补深，最后继续增强 Diagnose V2+ 的解释密度与场景贴合度。优先级并没有乱，而是在越来越明确。",
          bullets: [
            "第一优先级：首页 / about / docs 总览继续做设计稿级收口",
            "第二优先级：docs/troubleshooting / product-notes 等子页继续补案例层",
            "第三优先级：Diagnose V2+ 继续细化归类、失败信号和资源贴合度",
          ],
          links: [
            { href: "/docs/getting-started", label: "回起步文档" },
            { href: "/templates", label: "看模板中心" },
            { href: "/diagnose", label: "打开 Diagnose", tone: "primary" },
          ],
        },
      ]}
      ctaLinks={[
        { href: "/docs/getting-started", label: "先建立整体理解" },
        { href: "/diagnose", label: "直接进入 Diagnose", tone: "primary" },
        { href: "/templates", label: "查看模板中心" },
      ]}
    />
  );
}
