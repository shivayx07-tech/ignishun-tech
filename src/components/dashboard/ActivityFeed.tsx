import { Megaphone, Rocket, TrendingUp, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ActivityItem = {
  icon: LucideIcon;
  iconStyle: string;
  iconBg: string;
  text: string;
  time: string;
  badge: string;
};

const activity: ActivityItem[] = [
  {
    icon: TrendingUp,
    iconStyle: "text-mint-ink",
    iconBg: "bg-mint/20",
    text: "E-commerce SEO Score Improved by 12%",
    time: "2 hours ago",
    badge: "SEO",
  },
  {
    icon: Rocket,
    iconStyle: "text-brand",
    iconBg: "bg-brand-soft",
    text: "Instagram & TikTok Growth Campaign Launched",
    time: "5 hours ago",
    badge: "Social",
  },
  {
    icon: Megaphone,
    iconStyle: "text-sky",
    iconBg: "bg-sky-soft",
    text: "Google Performance Max Ads Rolled Out",
    time: "Yesterday",
    badge: "Paid Ads",
  },
  {
    icon: Zap,
    iconStyle: "text-slate-500",
    iconBg: "bg-slate-100",
    text: "Website Page Speed Optimization Completed",
    time: "2 days ago",
    badge: "Core Web",
  },
];

export function ActivityFeed({ delay = 0 }: { delay?: number }) {
  return (
    <section className="panel rise p-5 sm:p-6" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-extrabold tracking-tight text-slate-800">
          Recent Agency Activity
        </h2>
        <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-xs font-semibold text-brand">
          {activity.length} updates
        </span>
      </div>
      <ul className="mt-4 flex flex-col gap-1">
        {activity.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.text}>
              <div className="flex cursor-pointer flex-col gap-1 rounded-xl px-3 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-card sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <span className="flex min-w-0 items-center gap-3">
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-xl ${item.iconBg}`}
                  >
                    <Icon className={`size-4 ${item.iconStyle}`} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-slate-800">
                      {item.text}
                    </span>
                    <span className="mt-0.5 inline-block rounded-md bg-slate-100 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                      {item.badge}
                    </span>
                  </span>
                </span>
                <span className="pl-11 text-xs text-slate-400 sm:shrink-0 sm:pl-0">
                  {item.time}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
