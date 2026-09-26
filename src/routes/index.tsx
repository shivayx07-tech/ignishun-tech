import { createFileRoute } from "@tanstack/react-router";
import { Gauge, Share2, Target, Workflow } from "lucide-react";

import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EcosystemHub } from "@/components/dashboard/EcosystemHub";
import { GrowthChart } from "@/components/dashboard/GrowthChart";
import { MetricCard, type Metric } from "@/components/dashboard/MetricCard";
import { TrafficPieChart } from "@/components/dashboard/TrafficPieChart";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — InsightFlow by Ignishun Tech" },
      {
        name: "description",
        content:
          "Omni-channel vital signs: engagement, cost per lead, page speed and active channels in one client dashboard.",
      },
      { property: "og:title", content: "Overview — InsightFlow by Ignishun Tech" },
      {
        property: "og:description",
        content: "One agency. Every channel. Zero hand-offs.",
      },
    ],
  }),
  component: Overview,
});

const metrics: Metric[] = [
  {
    label: "Avg. Engagement",
    value: "+212%",
    trend: "Consistent Growth",
    tone: "mint",
    icon: Share2,
    sparkline: [4, 6, 5, 9, 7, 12, 10, 14, 11, 16],
  },
  {
    label: "Cost Per Lead",
    value: "-30%",
    trend: "Highly Optimized",
    tone: "sky",
    icon: Target,
    sparkline: [14, 12, 13, 10, 11, 8, 9, 6, 7, 5],
  },
  {
    label: "Page Load Speed",
    value: "98%",
    trend: "+15% Conversion",
    tone: "sky",
    icon: Gauge,
    sparkline: [7, 8, 7, 9, 8, 10, 9, 11, 10, 12],
  },
  {
    label: "Active Channels",
    value: "4/4",
    trend: "Zero Hand-offs",
    tone: "brand",
    icon: Workflow,
    sparkline: [2, 2, 3, 3, 4, 4, 4, 4, 4, 4],
  },
];

function Overview() {
  return (
    <DashboardLayout
      title="Welcome, Client — Your Omni-channel Growth"
      subtitle="One agency. Every channel. Zero hand-offs."
    >
      <div className="flex flex-col gap-6">
        <EcosystemHub delay={60} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} delay={120 + i * 90} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GrowthChart delay={540} />
          <TrafficPieChart delay={610} />
        </div>
        <ActivityFeed delay={680} />
      </div>
    </DashboardLayout>
  );
}
