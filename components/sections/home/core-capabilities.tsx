import { capabilities } from "@/data/home/content";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const outputs = ["先判断层级", "给可执行路径", "留下可验证结果"] as const;

export function CoreCapabilitiesSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl space-y-3">
          <p className="text-sm font-medium text-sky-700">Capabilities</p>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950">这个站不讲概念，直接帮你解决 3 类问题</h2>
          <p className="text-sm leading-6 text-slate-600 sm:text-base">
            每个模块都围绕“先定位，再执行，再验证”设计，不让你停在抽象建议。
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2 text-xs text-slate-500">
          {outputs.map((item) => (
            <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1.5">
              {item}
            </span>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {capabilities.map((item, index) => (
            <Card key={item.title} className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <Badge variant="outline" className="w-fit border-sky-200 bg-sky-50 text-sky-700">
                  能力 {index + 1}
                </Badge>
                <CardTitle className="mt-3 text-xl text-slate-950">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs leading-5 text-slate-500">
                  输出目标：给出可以直接继续推进的下一步，不只解释原理。
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
