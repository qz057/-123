import Link from "next/link";
import { siteConfig } from "@/data/site/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-indigo-100/80 bg-white/62 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-950 text-sm font-semibold text-white shadow-[0_14px_36px_-20px_rgba(79,70,229,0.6)]">
            FD
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-lg font-semibold tracking-tight text-slate-950">{siteConfig.name}</span>
            <span className="text-xs text-slate-500">{siteConfig.subtitle} · {siteConfig.tagline}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-600 transition hover:text-indigo-700">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/templates"
            className="hidden rounded-full border border-indigo-200/80 bg-white/70 px-4 py-2 text-sm text-indigo-700 transition hover:bg-indigo-50/80 backdrop-blur sm:inline-flex"
          >
            模板中心
          </Link>
          <Link
            href="/diagnose"
            className="rounded-full bg-indigo-950 fd-primary-glow px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-900"
          >
            立即体检配置
          </Link>
        </div>
      </div>
    </header>
  );
}
