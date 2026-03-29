# FlowDock

**FlowDock = AI 自动化工作台**  
一句话定位：**把 AI 自动化真正接进工作。**

## 项目当前状态

当前这是一个已经跑通首版骨架、并进入产品化收口阶段的 Next.js 站点。

已完成的核心能力：
- 官网首页 `/`
- 配置诊断器 `/diagnose`
- 模板中心 `/templates`
- 模板详情页 `/templates/[slug]`
- 使用场景 `/use-cases`
- 场景详情页 `/use-cases/[slug]`
- 文档中心 `/docs`
- Docs 子页：
  - `/docs/getting-started`
  - `/docs/diagnose`
  - `/docs/templates`
  - `/docs/troubleshooting`
  - `/docs/product-notes`
- 关于页 `/about`

## 产品思路

FlowDock 不是泛 AI 内容站，也不是只展示概念的官网。

它的目标是把这些高频真实问题组织成可执行路径：
- 配置写了，但不生效
- 模型切了，但实际没切过去
- 工具很多，但不知道怎么串起来
- 想做自动化，但第一步就卡住

默认使用顺序：
1. **Diagnose**：先判断问题属于哪一层
2. **Templates**：再拿可复用方案推进
3. **Use Cases**：按任务视角找更短入口
4. **Docs**：最后补规则、边界与验证方式

## 当前首版重点

### 1) Diagnose
规则型诊断器，支持：
- 问题类型选择
- 场景选择
- provider / model / auth / transport 输入
- 配置片段 / 报错信息 / 当前现象 / 期望结果输入
- 可解释结果输出

当前结果页已包含：
- 诊断结论
- 风险等级
- 高概率原因
- 修复步骤
- 判断依据
- 缺失输入提示
- 归类评分解释
- 推荐资源优先级
- 典型失败信号模板
- 相似场景参考

> 注意：当前 Diagnose 仍是**规则型 V1**，不是自由生成式万能诊断器。

### 2) Templates
当前已落地首批 8 个模板，详情页已具备：
- 适合对象
- 问题定义 / 场景
- 什么时候该用 / 什么时候先别用
- 前置条件 / 输入 / 输出
- 推荐推进步骤
- 执行检查与验收
- 失败信号与回滚策略
- 实战案例
- 相关模板 / 相关文档

### 3) Use Cases
使用场景页已不是简单说明页，而是执行型场景页。

当前场景数据已支持：
- 适合对象
- 目标
- diagnoseFocus
- executionPath
- pitfalls
- proofOfDone
- relatedTemplates
- relatedDocs
- primaryAction / secondaryAction

### 4) Docs
Docs 当前重点不是“内容很多”，而是“路径清楚”。

已完成：
- Getting Started
- Diagnose 文档
- Templates 文档
- Troubleshooting 文档
- Product Notes 文档
- Docs 总览页（快速入口 + 阅读路径 + 场景联动）

## 技术栈

- **Next.js 16.2.1**
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui 基础组件**

## 本地开发

```bash
npm install
npm run dev
```

默认开发地址：
- <http://localhost:3000>

## 当前可用脚本

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## 已验证基线

本轮稳定验证命令：

```bash
npm run lint && npm run build
```

最新验证结果：**通过**。

## 当前边界 / 限制

- Diagnose 仍是规则型 V1
- 首页虽然已经达到较完整产品感，但如果要继续逼近设计稿级，还可以继续补更细的图形层次、插画/图标资产和品牌记忆点
- Docs / About / Use Cases 仍可继续补更深一层场景内容
- 当前 repo 还没有配置远程 `git remote`

## 下一阶段建议

如果继续往下推进，优先顺序建议是：
1. 首页更高完成度视觉细抠
2. 更多 use-cases / docs / about 深层内容
3. 最后一轮整站文案与导航收口
4. 如需要交付，再做提交拆分 / 推送 / 导出交付说明
