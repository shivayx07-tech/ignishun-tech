import type { ReactNode } from "react";

import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { EcosystemHub } from "@/components/dashboard/EcosystemHub";
import { MetricCard, type Metric } from "@/components/dashboard/MetricCard";

/** Shared shell for channel tabs: metric cards on top, tab-specific detail below. */
export function ChannelPage({
  title,
  subtitle,
  metrics,
  children,
  showHub = true,
}: {
  title: string;
  subtitle: string;
  metrics: Metric[];
  children?: ReactNode;
  showHub?: boolean;
}) {
  return (
    <DashboardLayout title={title} subtitle={subtitle}>
      <div className="flex flex-col gap-6">
        {showHub && <EcosystemHub delay={60} />}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, i) => (
            <MetricCard key={metric.label} metric={metric} delay={120 + i * 90} />
          ))}
        </div>
        {children}
      </div>
    </DashboardLayout>
  );
}

/** Neumorphic section panel with a heading. */
export function Section({
  title,
  subtitle,
  action,
  children,
  delay = 500,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  delay?: number;
}) {
  return (
    <section className="panel rise min-w-0 p-5 sm:p-6" style={{ animationDelay: `${delay}ms` }}>
      <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-slate-800">{title}</h2>
          {subtitle && <p className="truncate text-xs text-slate-500 sm:text-sm">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
