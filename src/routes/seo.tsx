import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Award, KeyRound, Link2, TrendingUp } from "lucide-react";

import { ChannelPage, Section } from "@/components/dashboard/ChannelPage";
import type { Metric } from "@/components/dashboard/MetricCard";

export const Route = createFileRoute("/seo")({
  head: () => ({
    meta: [
      { title: "SEO & Content Strategy — InsightFlow by Ignishun Tech" },
      { name: "description", content: "Domain authority, organic keywords, backlinks and top-ranking keyword positions." },
      { property: "og:title", content: "SEO & Content Strategy — InsightFlow" },
      { property: "og:description", content: "Domain authority, keywords and backlinks for your search presence." },
    ],
  }),
  component: Seo,
});

const metrics: Metric[] = [
  { label: "Domain Authority", value: "54", trend: "+8 this year", tone: "brand", icon: Award },
  { label: "Organic Keywords", value: "3,812", trend: "Ranking Momentum", tone: "sky", icon: KeyRound },
  { label: "Backlinks", value: "12.6K", trend: "Authority Rising", tone: "mint", icon: Link2 },
  { label: "Organic Traffic", value: "+143%", trend: "Consistent Growth", tone: "sky", icon: TrendingUp },
];

const keywords = [
  { term: "b2b growth agency", volume: 8100, position: 2, change: 3 },
  { term: "omnichannel marketing", volume: 14800, position: 4, change: 5 },
  { term: "core web vitals audit", volume: 3600, position: 1, change: 2 },
  { term: "paid ads management", volume: 9900, position: 6, change: -1 },
  { term: "social media strategy b2b", volume: 5400, position: 3, change: 4 },
  { term: "seo content strategy", volume: 12100, position: 7, change: 6 },
];

function Seo() {
  return (
    <ChannelPage title="SEO & Content Strategy" subtitle="Compounding organic growth, month over month." metrics={metrics}>
      <Section title="Top-Ranking Keywords" subtitle="Current Google positions">
        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="pb-3 font-semibold">Keyword</th>
                <th className="pb-3 text-right font-semibold">Volume</th>
                <th className="pb-3 text-right font-semibold">Position</th>
                <th className="pb-3 text-right font-semibold">Change</th>
              </tr>
            </thead>
            <tbody>
              {keywords.map((k) => (
                <tr key={k.term} className="border-t border-slate-200/70 transition-colors duration-300 hover:bg-white">
                  <td className="py-3 font-medium text-slate-800">{k.term}</td>
                  <td className="py-3 text-right text-slate-500">{k.volume.toLocaleString()}</td>
                  <td className="py-3 text-right">
                    <span className="rounded-lg bg-brand-soft px-2 py-0.5 font-bold text-brand">#{k.position}</span>
                  </td>
                  <td className={`py-3 text-right font-semibold ${k.change > 0 ? "text-mint-ink" : "text-slate-500"}`}>
                    <span className="inline-flex items-center gap-0.5">
                      {k.change > 0 ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
                      {Math.abs(k.change)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </ChannelPage>
  );
}
