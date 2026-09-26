import { createFileRoute } from "@tanstack/react-router";
import { BadgeDollarSign, MousePointerClick, Target, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { ChannelPage, Section } from "@/components/dashboard/ChannelPage";
import type { Metric } from "@/components/dashboard/MetricCard";

export const Route = createFileRoute("/paid-ads")({
  head: () => ({
    meta: [
      { title: "Paid Ads ROI & Spend — InsightFlow by Ignishun Tech" },
      { name: "description", content: "Total ad spend, cost per click and ROAS with 7, 30 and 90-day views." },
      { property: "og:title", content: "Paid Ads ROI & Spend — InsightFlow" },
      { property: "og:description", content: "Ad spend, CPC and return on ad spend across campaigns." },
    ],
  }),
  component: PaidAds,
});

type Range = 7 | 30 | 90;

/** Deterministic dummy data per range. */
function buildData(days: Range) {
  const buckets = days === 7 ? 7 : days === 30 ? 10 : 12;
  return Array.from({ length: buckets }, (_, i) => ({
    label: days === 7 ? `D${i + 1}` : days === 30 ? `D${i * 3 + 1}` : `W${i + 1}`,
    spend: Math.round((days === 7 ? 420 : days === 30 ? 1250 : 2900) + Math.sin(i * 1.3) * 180 + i * 35),
    revenue: Math.round((days === 7 ? 1900 : days === 30 ? 5700 : 13800) + Math.cos(i) * 600 + i * 220),
  }));
}

function PaidAds() {
  const [range, setRange] = useState<Range>(30);
  const data = useMemo(() => buildData(range), [range]);
  const spend = data.reduce((s, d) => s + d.spend, 0);
  const revenue = data.reduce((s, d) => s + d.revenue, 0);
  const cpc = { 7: 0.84, 30: 0.79, 90: 0.72 }[range];

  const metrics: Metric[] = [
    { label: "Total Ad Spend", value: `$${spend.toLocaleString()}`, trend: `Last ${range} days`, tone: "brand", icon: Wallet },
    { label: "Cost Per Click", value: `$${cpc.toFixed(2)}`, trend: "Below Benchmark", tone: "sky", icon: MousePointerClick },
    { label: "ROAS", value: `${(revenue / spend).toFixed(1)}x`, trend: "Profitable Scaling", tone: "mint", icon: BadgeDollarSign },
    { label: "Cost Per Lead", value: "-30%", trend: "Highly Optimized", tone: "sky", icon: Target },
  ];

  return (
    <ChannelPage title="Paid Ads ROI & Spend" subtitle="Spend routed to the channels that return." metrics={metrics}>
      <Section
        title="Spend vs Revenue"
        subtitle={`Last ${range} days`}
        action={
          <select
            value={range}
            onChange={(e) => setRange(Number(e.target.value) as Range)}
            className="rounded-xl bg-white px-3 py-2 text-sm text-slate-800 ring-1 ring-slate-200"
          >
            <option value={7}>Last 7 Days</option>
            <option value={30}>Last 30 Days</option>
            <option value={90}>Last 90 Days</option>
          </select>
        }
      >
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ left: -10, right: 4 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: "var(--brand-soft)" }} />
              <Bar dataKey="spend" name="Spend ($)" fill="var(--brand)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="revenue" name="Revenue ($)" fill="var(--sky)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>
    </ChannelPage>
  );
}
