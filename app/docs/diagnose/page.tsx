import { DocShell } from "@/components/docs/doc-shell";

export default function DiagnoseDocsPage() {
  return (
    <DocShell
      eyebrow="FlowDock / Docs / Diagnose"
      title="Diagnose 文档"
      intro="Diagnose 首版是规则型诊断器。它的目标不是万能推理，而是把问题稳定归类、输出可解释判断，并把用户送到更合适的模板和文档入口。"
      badges={["Docs", "Diagnose", "规则型 V1"]}
      summary={[
        { label: "核心作用", value: "先把问题归到正确层，再给出修复顺序" },
        { label: "当前覆盖", value: "连接问题、配置不生效、模型切换 / Session 异常、工具接入问题" },
        { label: "输出重点", value: "结论可解释、下一步明确、能跳到模板与文档" },
      ]}
      checklist={[
        {
          title: "什么情况该先用 Diagnose",
          items: [
            "你只知道‘有问题’，但还判断不出问题属于连接层、配置层还是会话层",
            "你已经尝试过几轮修改，但不确定是不是改错层了",
            "你想先拿到一条排查顺序，而不是自己盲试",
          ],
        },
        {
          title: "输入越完整，判断越稳",
          items: [
            "问题类型 / 场景：让诊断器优先走正确分支",
            "provider / model / auth / transport：帮助判断是否是模型链路问题",
            "配置片段 / 报错文本 / 当前现象：决定归类和修复建议的可信度",
          ],
        },
        {
          title: "读结果时先看哪里",
          items: [
            "先看结论与风险等级，判断是否要停下继续试错",
            "再看判断依据，确认是不是抓住了你的真实现象",
            "最后按修复步骤和资源优先级推进，不要跳步",
          ],
        },
      ]}
      sections={[
        {
          title: "首版覆盖范围为什么只做 4 类",
          body: "首版故意把范围收窄到 4 类问题：模型连接问题、配置不生效、模型切换 / Session 异常、本地助手 / 工具接入问题。这样做不是保守，而是为了保证归类结果足够稳定，并且每类都能给出结构化建议。",
          bullets: [
            "连接问题：优先看 provider / auth / transport",
            "配置问题：优先看配置位置、优先级和刷新链路",
            "会话问题：优先区分显示层与真实运行层",
            "工具接入问题：优先区分入口可见与执行链路可用",
          ],
        },
        {
          title: "当前输入结构和判断逻辑",
          body: "Diagnose 会综合显式选择的问题类型、场景加权、关键词命中、字段完整度来做归类。首版不是自由生成，而是为了把判断基础做得可解释：为什么判成这类、目前还缺哪些关键输入、资源为什么这么排。",
          bullets: [
            "显式选择的问题类型会优先影响归类",
            "场景会提供加权，例如 Control UI 更容易命中 Session / 切换类问题",
            "关键词会参与打分，例如 unauthorized、timeout、reload、session、mcp 等",
            "缺失字段过多时，结果仍会给，但会提示稳定性不足",
          ],
          links: [
            { href: "/diagnose", label: "打开 Diagnose", tone: "primary" },
            { href: "/docs/troubleshooting", label: "配合排障顺序一起看" },
          ],
        },
        {
          title: "首版输出结构该怎么读",
          body: "推荐按这个顺序读结果：先看 summary 和 risk level，判断问题性质；再看判断依据和缺失输入，确认归类是否抓对；再看修复步骤，不要跳步；最后看资源优先级，决定先跳模板还是先补文档。",
          bullets: [
            "summary：一句话告诉你当前最像哪类问题",
            "judgement basis：告诉你为什么这么判，不是黑箱",
            "missing inputs：告诉你还差哪些字段，补齐后结果会更稳",
            "resource priority：告诉你下一跳该先点哪个资源，而不是全看",
          ],
        },
        {
          title: "Diagnose 和 Templates / Docs 的关系",
          body: "Diagnose 不是终点，而是路由器。它负责把用户送去更适合的执行页面：当已经归类到具体方向后，优先跳模板页执行；当需要理解优先级、边界、验证方式时，再跳文档页补齐。",
          links: [
            { href: "/templates", label: "查看模板中心" },
            { href: "/docs/templates", label: "查看模板文档" },
            { href: "/docs/getting-started", label: "回到起步文档" },
          ],
        },
      ]}
      ctaLinks={[
        { href: "/diagnose", label: "打开 Diagnose", tone: "primary" },
        { href: "/templates", label: "查看可承接模板" },
      ]}
    />
  );
}
