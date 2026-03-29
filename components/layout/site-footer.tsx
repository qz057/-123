import Link from "next/link";
import { siteConfig } from "@/data/site/navigation";

const footerLinks = [
  { label: "Diagnose", href: "/diagnose" },
  { label: "Templates", href: "/templates" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 text-sm text-slate-600 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="font-medium text-slate-900">{siteConfig.name}</p>
          <p className="mt-2 max-w-xl leading-6">把复杂的 AI 配置、连接和自动化流程，整理成真正能用的工具。</p>
          <p className="mt-3 text-xs leading-5 text-slate-500">{siteConfig.subtitle} · {siteConfig.tagline}</p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex flex-wrap gap-3 text-sm">
            {footerLinks.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-slate-950">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-slate-500">默认路径：先 Diagnose → 再 Templates → 最后 Docs 验证收口。</p>
        </div>
      </div>
    </footer>
  );
}
