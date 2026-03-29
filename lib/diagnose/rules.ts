import type { DiagnoseResult } from "@/types/diagnose";

export const diagnoseExamples: DiagnoseResult[] = [
  {
    issueType: "model_switch_session_mismatch",
    riskLevel: "medium",
    summary: "当前问题更像是 UI 显示已切换，但当前会话仍绑定旧模型。",
    causes: [
      {
        title: "会话绑定未更新",
        confidence: "high",
        reason: "页面显示层完成切换，但 session 层还停留在旧模型配置。",
      },
      {
        title: "旧参数仍在覆盖",
        confidence: "medium",
        reason: "thinking / reasoning 或更高优先级参数仍由旧会话控制。",
      },
    ],
    fixSteps: [
      {
        step: 1,
        action: "先确认当前会话实际绑定模型",
        why: "区分显示问题和运行问题。",
        verify: "执行最小请求，确认真实 provider / model。",
      },
      {
        step: 2,
        action: "检查 UI 切换是否真正写入 session",
        why: "避免界面显示切换成功，但后端仍停在旧状态。",
        verify: "刷新后确认当前会话仍保持目标模型。",
      },
      {
        step: 3,
        action: "再检查 transport 与持久化链路",
        why: "排除旧会话缓存或参数覆盖。",
        verify: "再次执行最小任务，结果与目标模型一致。",
      },
    ],
    nextActions: ["查看模型切换 / Session 异常模板", "查看 Session 相关文档"],
    relatedTemplates: ["模型切换 / Session 异常模板"],
    relatedDocs: ["Session 模型绑定说明", "参数覆盖优先级说明"],
  },
];
