import { createFileRoute } from "@tanstack/react-router";
import { Eye, Heart, MessageCircle, Share2, Users } from "lucide-react";
import { useState } from "react";

import { ChannelPage, Section } from "@/components/dashboard/ChannelPage";
import type { Metric } from "@/components/dashboard/MetricCard";

export const Route = createFileRoute("/social-media")({
  head: () => ({
    meta: [
      { title: "Social Media Growth — InsightFlow by Ignishun Tech" },
      { name: "description", content: "Followers, reach and top campaign posts across Instagram, TikTok and LinkedIn." },
      { property: "og:title", content: "Social Media Growth — InsightFlow" },
      { property: "og:description", content: "Followers, reach and top posts across every social channel." },
    ],
  }),
  component: SocialMedia,
});

const metrics: Metric[] = [
  { label: "Total Followers", value: "128.4K", trend: "+18.4K this quarter", tone: "brand", icon: Users },
  { label: "Impression Reach", value: "2.3M", trend: "Consistent Growth", tone: "sky", icon: Eye },
  { label: "Avg. Engagement", value: "+212%", trend: "Compounding", tone: "mint", icon: Heart },
  { label: "Share Rate", value: "7.2%", trend: "Highly Shareable", tone: "sky", icon: Share2 },
];

const channels = [
  { name: "Instagram", followers: "58.2K", growth: "+14%", pct: 45 },
  { name: "TikTok", followers: "41.7K", growth: "+31%", pct: 33 },
  { name: "LinkedIn", followers: "28.5K", growth: "+9%", pct: 22 },
];

const initialPosts = [
  { id: 1, channel: "Instagram", title: "Behind-the-build reel", likes: 12400, comments: 842 },
  { id: 2, channel: "TikTok", title: "60s product teardown", likes: 38900, comments: 2110 },
  { id: 3, channel: "LinkedIn", title: "Q3 growth case study", likes: 4210, comments: 388 },
  { id: 4, channel: "Instagram", title: "Customer spotlight carousel", likes: 9870, comments: 516 },
  { id: 5, channel: "TikTok", title: "Myth vs fact series", likes: 27300, comments: 1450 },
  { id: 6, channel: "LinkedIn", title: "Founder AMA recap", likes: 3180, comments: 274 },
];

const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}K` : `${n}`);

function SocialMedia() {
  const [filter, setFilter] = useState("All");
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const posts = initialPosts.filter((p) => filter === "All" || p.channel === filter);

  return (
    <ChannelPage title="Social Media Growth" subtitle="Consistent publishing across every platform." metrics={metrics}>
      <Section title="Channel Breakdown" subtitle="Share of total followers">
        <div className="flex flex-col gap-4">
          {channels.map((c) => (
            <div key={c.name}>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-slate-800">{c.name}</span>
                <span className="text-slate-500">
                  {c.followers} <span className="font-semibold text-mint-ink">{c.growth}</span>
                </span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-brand" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Top Campaign Posts"
        subtitle="Tap the heart to boost"
        action={
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl bg-white px-3 py-2 text-sm text-slate-800 ring-1 ring-slate-200"
          >
            {["All", "Instagram", "TikTok", "LinkedIn"].map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        }
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {posts.map((p) => (
            <article key={p.id} className="rounded-2xl bg-white p-4 ring-1 ring-white/90 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
              <p className="text-xs font-semibold text-brand">{p.channel}</p>
              <p className="mt-1 truncate text-sm font-semibold text-slate-800">{p.title}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                <button
                  onClick={() => setLiked((s) => ({ ...s, [p.id]: !s[p.id] }))}
                  className={`flex items-center gap-1.5 transition-colors ${liked[p.id] ? "text-mint-ink" : "hover:text-slate-800"}`}
                  aria-pressed={!!liked[p.id]}
                >
                  <Heart className={`size-4 ${liked[p.id] ? "fill-current" : ""}`} />
                  {fmt(p.likes + (liked[p.id] ? 1 : 0))}
                </button>
                <span className="flex items-center gap-1.5">
                  <MessageCircle className="size-4" />
                  {fmt(p.comments)}
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>
    </ChannelPage>
  );
}
