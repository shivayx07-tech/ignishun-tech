import type { LucideIcon } from "lucide-react";
import { useCountUp, parseMetricValue } from "@/hooks/useCountUp";

export type Metric = {
  label: string;
  value: string;
  trend: string;
  tone: "brand" | "sky" | "mint";
  icon: LucideIcon;
  sparkline?: number[];
};

const toneStyles: Record<
  Metric["tone"],
  { icon: string; trend: string; sparkColor: string; sparkFill: string }
> = {
  brand: {
    icon: "bg-brand-soft text-brand",
    trend: "text-brand",
    sparkColor: "#008080",
    sparkFill: "rgba(0,128,128,0.12)",
  },
  sky: {
    icon: "bg-sky-soft text-sky",
    trend: "text-mint-ink",
    sparkColor: "#00BFFF",
    sparkFill: "rgba(0,191,255,0.12)",
  },
  mint: {
    icon: "bg-brand-soft text-brand",
    trend: "text-mint-ink",
    sparkColor: "#008080",
    sparkFill: "rgba(0,128,128,0.12)",
  },
};

function Sparkline({
  data,
  color,
  fill,
}: {
  data: number[];
  color: string;
  fill: string;
}) {
  const w = 80;
  const h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 4) - 2;
    return `${x},${y}`;
  });

  const linePath = `M${pts.join(" L")}`;
  const areaPath = `${linePath} L${w},${h} L0,${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden="true">
      <path d={areaPath} fill={fill} />
      <path d={linePath} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function MetricCard({ metric, delay }: { metric: Metric; delay: number }) {
  const Icon = metric.icon;
  const tone = toneStyles[metric.tone];
  const sparkData = metric.sparkline ?? [3, 7, 4, 9, 6, 11, 8, 13, 10, 15];

  // Fraction values (e.g. "4/4") need special treatment
  const { denominator } = parseMetricValue(metric.value);
  const animatedValue = useCountUp(metric.value, 1200, delay);
  // For "4/4" style the hook returns "4/4" via prefix+suffix logic;
  // reconstruct cleanly if denominator exists
  const displayValue = denominator
    ? `${animatedValue.replace(/\/\d+$/, "")}/${denominator}`
    : animatedValue;

  return (
    <article
      className="panel lift rise cursor-pointer p-5 relative overflow-hidden"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="min-w-0 text-sm font-medium text-slate-500">{metric.label}</p>
        <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${tone.icon}`}>
          <Icon className="size-5" />
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-2">
        <p className="text-3xl font-extrabold tracking-tight text-slate-800 shrink-0 tabular-nums">
          {displayValue}
        </p>
        <div className="opacity-80 shrink-0 mb-0.5">
          <Sparkline data={sparkData} color={tone.sparkColor} fill={tone.sparkFill} />
        </div>
      </div>

      <p className={`mt-1 text-xs font-semibold ${tone.trend}`}>{metric.trend}</p>
    </article>
  );
}
