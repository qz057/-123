import Link from "next/link";
import { templatesCatalog } from "@/data/templates/catalog";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const categories = ["全部", "搭建类", "排障类", "自动化类", "产品化类"] as const;
const linkClass =
  "inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-10 flex flex-col gap-3">
        <p className="text-sm font-medium text-sky-700">FlowDock / Templates</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">工作流模板中心</h1>
        <p className="max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
          从搭建、排障到自动化落地，直接找到适合当前阶段的模板。找不到时，先去配置诊断器确认方向。
        </p>
      </header>

      <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
        <CardContent className="p-5">
          <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-400">搜索模板名 / 场景 / 问题类型</div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((item, index) => (
              <Badge key={item} variant={index === 0 ? "default" : "outline"} className="px-3 py-1 text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <section className="mt-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-slate-950">首批模板</h2>
          <Link href="/diagnose" className="text-sm font-medium text-sky-700">
            不知道选哪个？先体检配置
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {templatesCatalog.map((template) => (
            <Card key={template.slug} className="rounded-2xl border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{template.category}</Badge>
                  <Badge variant="secondary">{template.difficulty}</Badge>
                </div>
                <CardTitle className="mt-2 text-lg text-slate-950">{template.title}</CardTitle>
                <CardDescription className="text-sm leading-6 text-slate-600">{template.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  {template.audience.slice(0, 2).map((item) => (
                    <span key={item} className="rounded-full bg-slate-100 px-3 py-1">
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href={`/templates/${template.slug}`} className={linkClass}>
                  查看模板
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
