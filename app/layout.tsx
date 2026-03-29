import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/data/site/navigation";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.subtitle}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["AI 自动化", "工作流", "配置诊断", "模板中心", "FlowDock"],
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.subtitle}`,
    description: `${siteConfig.description} ${siteConfig.tagline}`,
    siteName: siteConfig.name,
    locale: "zh_CN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full bg-[linear-gradient(to_bottom,#ffffff,#f8fafc)] text-slate-950">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
