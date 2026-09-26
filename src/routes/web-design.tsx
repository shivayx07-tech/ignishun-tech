import { createFileRoute } from "@tanstack/react-router";
import { Activity, Gauge, Server, Smartphone } from "lucide-react";
import { useState } from "react";

import { ChannelPage, Section } from "@/components/dashboard/ChannelPage";
import type { Metric } from "@/components/dashboard/MetricCard";

export const Route = createFileRoute("/web-design")({
  head: () => ({
    meta: [
      { title: "Web Design & Core Vitals — InsightFlow by Ignishun Tech" },
      { name: "description", content: "Server response, uptime, mobile usability and Core Web Vitals for your website." },
      { property: "og:title", content: "Web Design & Core Vitals — InsightFlow" },
      { property: "og:description", content: "Server response, uptime and Core Web Vitals for your website." },
    ],
  }),
  component: WebDesign,
});

const metrics: Metric[] = [
  { label: "Server Response Time", value: "182ms", trend: "-41% vs last quarter", tone: "sky", icon: Server },
  { label: "Uptime", value: "99.9%", trend: "SLA Exceeded", tone: "mint", icon: Activity },
  { label: "Mobile Usability", value: "96/100", trend: "Fully Responsive", tone: "sky", icon: Smartphone },
  { label: "Page Load Speed", value: "98%", trend: "+15% Conversion", tone: "brand", icon: Gauge },
];

/** Core Web Vitals with Google's "good" thresholds. */
const vitals = [
  { key: "LCP", name: "Largest Contentful Paint", value: "1.8s", target: "≤ 2.5s", pct: 72, detail: "Hero image preloaded and served as AVIF; render-blocking CSS inlined." },
  { key: "FID", name: "First Input Delay", value: "12ms", target: "≤ 100ms", pct: 88, detail: "Third-party scripts deferred; main thread work split into small tasks." },
  { key: "CLS", name: "Cumulative Layout Shift", value: "0.03", target: "≤ 0.1", pct: 70, detail: "All media reserve explicit dimensions; fonts use size-adjusted fallbacks." },
];

function WebDesign() {
  const [active, setActive] = useState("LCP");
  const current = vitals.find((v) => v.key === active)!;

  return (
    <ChannelPage title="Web Design & Core Vitals" subtitle="Fast, stable pages built to convert." metrics={metrics}>
      <Section title="Core Web Vitals" subtitle="Tap a metric to see what we optimized">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {vitals.map((v) => (
            <button
              key={v.key}
              onClick={() => setActive(v.key)}
              className={`rounded-2xl p-4 text-left ring-1 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover ${
                active === v.key ? "bg-white ring-brand shadow-card" : "bg-white/60 ring-white/90"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-bold text-slate-800">{v.key}</span>
                <span className="rounded-full bg-mint/25 px-2 py-0.5 text-[11px] font-semibold text-mint-ink">Good</span>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-slate-800">{v.value}</p>
              <p className="text-xs text-slate-500">Target {v.target}</p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-mint-ink transition-all duration-500" style={{ width: `${v.pct}%` }} />
              </div>
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-white p-4 ring-1 ring-white/90">
          <p className="text-sm font-semibold text-slate-800">{current.name}</p>
          <p className="mt-1 text-sm text-slate-500">{current.detail}</p>
        </div>
      </Section>
    </ChannelPage>
  );
}
