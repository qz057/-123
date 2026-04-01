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

export type DocShellFlowStep = {
  title: string;
  detail: string;
  cue?: string;
  href?: string;
  actionLabel?: string;
  tone?: "default" | "primary" | "warning";
  mobileHidden?: boolean;
};

export type DocShellFlow = {
  eyebrow?: string;
  title: string;
  description: string;
  steps: readonly DocShellFlowStep[];
};

export type DocShellSection = {
  title: string;
  body: string;
  highlights?: readonly DocShellHighlight[];
  bullets?: readonly string[];
  links?: readonly DocShellLink[];
  mobileHidden?: boolean;
};

export type DocShellChecklist = {
  title: string;
  items: readonly string[];
  mobileHidden?: boolean;
};

export function DocShell({
  eyebrow,
  title,
  intro,
  badges = [],
  summary = [],
  checklist = [],
  workflow,
  sections,
  ctaLinks = [],
}: {
  eyebrow: string;
  title: string;
  intro: string;
  badges?: readonly string[];
  summary?: readonly { label: string; value: string }[];
  checklist?: readonly DocShellChecklist[];
  workflow?: DocShellFlow;
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

      <p className="mt-4 text-sm font-medium text-indigo-700">{eyebrow}</p>
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
            <Card key={block.title} className={block.mobileHidden ? "hidden rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm md:block" : "rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm"}>
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
                  Checklist {String(index + 1).padStart(2, "0")}
                </p>
                <CardTitle className="text-lg text-slate-950">{block.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-2.5 text-sm leading-6 text-slate-600">
                  {block.items.map((item) => (
                    <li key={item} className="rounded-2xl bg-indigo-50/80 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : null}

      {workflow?.steps.length ? (
        <section className="mt-8 rounded-[32px] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">{workflow.eyebrow ?? "Workflow"}</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950 sm:text-2xl">{workflow.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">{workflow.description}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-xs leading-5 text-slate-500">
              这块不是装饰，而是把“现在先做什么 / 卡住时往哪跳”压成一条更容易执行的节奏。
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workflow.steps.map((step, index) => {
              const primary = step.tone === "primary" || index === 0;
              const warning = step.tone === "warning";
              const cardClass = primary
                ? "rounded-[28px] border border-slate-200 bg-indigo-950 px-5 py-5 text-white shadow-[0_18px_50px_-34px_rgba(15,23,42,0.45)]"
                : warning
                  ? "rounded-[28px] border border-amber-200 bg-amber-50/90 px-5 py-5"
                  : "rounded-[28px] border border-slate-200 bg-white px-5 py-5 shadow-sm";
              const titleClass = primary ? "text-lg text-white" : "text-lg text-slate-950";
              const bodyClass = primary ? "text-sm leading-6 text-slate-200" : warning ? "text-sm leading-6 text-amber-900/80" : "text-sm leading-6 text-slate-600";
              const cueClass = primary
                ? "rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-violet-200"
                : warning
                  ? "rounded-full border border-amber-200 bg-white px-3 py-1 text-[11px] font-medium text-amber-700"
                  : "rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500";
              const actionClass = primary
                ? "inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                : warning
                  ? "inline-flex rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
                  : "inline-flex rounded-full border border-indigo-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

              return (
                <div key={`${step.title}-${index}`} className={step.mobileHidden ? `${cardClass} hidden md:block` : cardClass}>
                  <div className="flex items-center justify-between gap-3">
                    <span className={cueClass}>{step.cue ?? `Step ${String(index + 1).padStart(2, "0")}`}</span>
                    <span
                      className={
                        primary
                          ? "inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-950"
                          : "inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-950 text-xs font-semibold text-white"
                      }
                    >
                      {index + 1}
                    </span>
                  </div>
                  <h3 className={`${titleClass} mt-4 font-semibold`}>{step.title}</h3>
                  <p className={`${bodyClass} mt-3`}>{step.detail}</p>
                  {step.href && step.actionLabel ? (
                    <Link href={step.href} className={`${actionClass} mt-5`}>
                      {step.actionLabel}
                    </Link>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {sectionEntries.length ? (
        <div className="mt-8 flex flex-wrap gap-2 lg:hidden">
          {sectionEntries.filter((section) => !section.mobileHidden).map((section) => (
            <a
              key={section.anchor}
              href={`#${section.anchor}`}
              className="inline-flex rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
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
              className={section.mobileHidden ? "hidden scroll-mt-24 rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm md:block" : "scroll-mt-24 rounded-[28px] border border-slate-200 bg-white py-0 shadow-sm"}
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
                      <li key={item} className="rounded-2xl bg-indigo-50/80 px-3 py-2.5">
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
                            ? "inline-flex rounded-full bg-indigo-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-900"
                            : "inline-flex rounded-full border border-indigo-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
            <Card className="rounded-[28px] border border-slate-200 bg-indigo-950 py-0 text-white shadow-sm">
              <CardHeader>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">Next Step</p>
                <CardTitle className="text-2xl text-white">读完这页，别停在理解层</CardTitle>
                <CardDescription className="text-slate-200">
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
                    <span className="mt-0.5 text-xs font-medium text-slate-300">
                      {String(section.index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium leading-6 text-slate-700">{section.title}</span>
                  </a>
                ))}
              </CardContent>
            </Card>

            {ctaLinks.length ? (
              <Card className="rounded-[28px] border border-slate-200 bg-indigo-50/80 py-0 shadow-sm">
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
                          ? "flex rounded-2xl bg-indigo-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-900"
                          : "flex rounded-2xl border border-indigo-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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

  return "rounded-2xl border border-slate-200 bg-indigo-50/80 px-4 py-3";
}
