import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export type DocShellLink = {
  href: string;
  label: string;
  description?: string;
  tone?: "primary" | "secondary";
};

export type DocShellSection = {
  title: string;
  body: string;
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
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <Badge variant="outline">FlowDock</Badge>
        {badges.map((item) => (
          <Badge key={item} variant="secondary">
            {item}
          </Badge>
        ))}
      </div>

      <p className="mt-4 text-sm font-medium text-sky-700">{eyebrow}</p>
      <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_0.84fr] lg:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{intro}</p>
        </div>

        {summary.length ? (
          <Card className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-slate-950">阅读前先抓住这几件事</CardTitle>
              <CardDescription>先建立框架感，再进入正文，会更容易快速定位。</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 pb-6 sm:grid-cols-2 lg:grid-cols-1">
              {summary.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3">
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
          {checklist.map((block) => (
            <Card key={block.title} className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-slate-950">{block.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <ul className="space-y-2 text-sm leading-6 text-slate-600">
                  {block.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>
      ) : null}

      <div className="mt-8 space-y-4">
        {sections.map((section) => (
          <Card key={section.title} className="rounded-3xl border border-slate-200 bg-white py-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl text-slate-950">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pb-6">
              <p className="text-sm leading-7 text-slate-600 sm:text-base">{section.body}</p>
              {section.bullets?.length ? (
                <ul className="space-y-2 text-sm leading-6 text-slate-600">
                  {section.bullets.map((item) => (
                    <li key={item}>• {item}</li>
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
      </div>

      {ctaLinks.length ? (
        <div className="mt-8 flex flex-wrap gap-3">
          {ctaLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                link.tone === "primary"
                  ? "inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                  : "inline-flex rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}
