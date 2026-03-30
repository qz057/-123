import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export type DocShellLink = {
  href: string;
  label: string;
  description?: string;
  tone?: "primary" | "secondary";
};

export type DocShellHighlight = {
  label: string;
  value: string;
  tone?: "default" | "warning" | "success";
};

export type DocShellSection = {
  title: string;
  body: string;
  highlights?: readonly DocShellHighlight[];
  bullets?: readonly string[];
  links?: readonly DocShellLink[];
};

export type DocShellChecklist = {
  title: string;
  items: readonly string[];
};

export function DocShell({
  eyebrow,
  title,
  intro,
  badges = [],
  summary = [],
  checklist = [],
  sections,
  ctaLinks = [],
}: {
  eyebrow: string;
  title: string;
  intro: string;
  badges?: readonly string[];
  summary?: readonly { label: string; value: string }[];
  checklist?: readonly DocShellChecklist[];
  sections: readonly DocShellSection[];
  ctaLinks?: readonly DocShellLink[];
}) {
  const sectionEntries = sections.map((section, index) => ({
    ...section,
    index,
    anchor: createSectionAnchor(section.title, index),
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Badge variant="outline">FlowDock</Badge>
        {badges.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>

      <p className="mt-4 text-sm font-medium text-sky-700">{eyebrow}</p>
      <div className="mt-3 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{intro}</p>
        </div>

        {summary.length ? (
          <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">阅读前先抓住这几件事</CardTitle>
              <CardDescription>先建立框架，再进入正文，会更容易快速判断下一步。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-1">
              {summary.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white px-4 py-3"
                >
                  <p className="text-xs font-medium text-slate-500">{item.label}</p>
                  <p className="mt-1 text-sm font-medium leading-6 text-slate-900">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>

      {checklist.length ? (
        <section className="mt-8 grid gap-4 lg:grid-cols-3">
          {checklist.map((block, index) => (
            <Card key={block.title} className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Checklist {String(index + 1).padStart(2, "0")}
                </p>
                <CardTitle className="text-lg text-slate-950">{block.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-2.5 text-sm leading-6 text-slate-600">
                  {block.items.map((item) => (
                    <li key={item} className="rounded-2xl bg-slate-50/80 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : null}

      {sectionEntries.length ? (
        <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
          {sectionEntries.map((section) => (
            <a
              key={section.anchor}
              href={`#${section.anchor}`}
              className="inline-flex rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
            >
              {section.title}
            </a>
          ))}
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-4">
          {sectionEntries.map((section) => (
            <Card
              key={section.anchor}
              id={section.anchor}
              className="scroll-mt-24 rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm"
            >
              <CardHeader className="gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  Section {String(section.index + 1).padStart(2, "0")}
                </p>
                <CardTitle className="text-xl text-slate-950">{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <p className="text-sm leading-7 text-slate-600 sm:text-base">{section.body}</p>
                {section.highlights?.length ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {section.highlights.map((item) => (
                      <div key={`${section.title}-${item.label}`} className={highlightToneClass(item.tone)}>
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">{item.label}</p>
                        <p className="mt-2 text-sm font-medium leading-6 text-slate-900">{item.value}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
                {section.bullets?.length ? (
                  <ul className="grid gap-2 text-sm leading-6 text-slate-600 sm:gap-3">
                    {section.bullets.map((item) => (
                      <li key={item} className="rounded-2xl bg-slate-50/80 px-3 py-2.5">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.links?.length ? (
                  <div className="flex flex-wrap gap-3">
                    {section.links.map((link) => (
                      <Link
                        key={`${section.title}-${link.href}`}
                        href={link.href}
                        className={
                          link.tone === "primary"
                            ? "inline-flex rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                            : "inline-flex rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                        }
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}

          {ctaLinks.length ? (
            <Card className="rounded-[28px] border border-slate-200 bg-slate-950 py-0 text-white shadow-sm">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">Next Step</p>
                <CardTitle className="text-2xl text-white">读完这页，别停在理解层</CardTitle>
                <CardDescription className="text-slate-300">
                  这页的目标不是让你多看一层，而是帮你更快切到下一步动作。
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3 pb-6">
                {ctaLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={
                      link.tone === "primary"
                        ? "inline-flex rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
                        : "inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <Card className="rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-950">本页导航</CardTitle>
                <CardDescription>先跳到你最需要的部分，再决定是否通读。</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pb-6">
                {sectionEntries.map((section) => (
                  <a
                    key={section.anchor}
                    href={`#${section.anchor}`}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 px-3 py-3 transition hover:bg-slate-50"
                  >
                    <span className="mt-0.5 text-xs font-medium text-slate-400">
                      {String(section.index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium leading-6 text-slate-700">{section.title}</span>
                  </a>
                ))}
              </CardContent>
            </Card>

            {ctaLinks.length ? (
              <Card className="rounded-[28px] border border-slate-200 bg-slate-50/80 py-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-950">读完之后做什么</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pb-6">
                  {ctaLinks.map((link) => (
                    <Link
                      key={`aside-${link.href}`}
                      href={link.href}
                      className={
                        link.tone === "primary"
                          ? "flex rounded-2xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                          : "flex rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                      }
                    >
                      {link.label}
                    </Link>
                  ))}
                </CardContent>
              </Card>
            ) : null}
          </div>
        </aside>
      </div>
    </div>
  );
}

function createSectionAnchor(title: string, index: number) {
  return `section-${index + 1}-${title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;
}

function highlightToneClass(tone: DocShellHighlight["tone"] = "default") {
  if (tone === "warning") {
    return "rounded-2xl border border-amber-200 bg-amber-50/90 px-4 py-3";
  }

  if (tone === "success") {
    return "rounded-2xl border border-emerald-200 bg-emerald-50/90 px-4 py-3";
  }

  return "rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3";
}
