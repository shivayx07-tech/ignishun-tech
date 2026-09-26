import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Point = { day: number; label: string; current: number; previous: number };

const data: Point[] = Array.from({ length: 90 }, (_, i) => {
  const wave = Math.sin(i / 7) * 5 + Math.sin(i / 3) * 2.5;
  return {
    day: i + 1,
    label: `Day ${i + 1}`,
    current: Math.round(42 + i * 1.35 + wave + 10),
    previous: Math.round(38 + i * 0.62 + wave * 0.6),
  };
});

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string | number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-white/60 bg-white/70 px-3 py-2 shadow-card backdrop-blur-md">
      <p className="text-xs font-semibold text-slate-800">Day {label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="mt-0.5 text-xs text-slate-500">
          <span
            className="mr-1.5 inline-block size-2 rounded-full align-middle"
            style={{ backgroundColor: entry.color }}
          />
          {entry.name}: <span className="font-semibold text-slate-800">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

export function GrowthChart({ delay = 0 }: { delay?: number }) {
  return (
    <section className="panel rise w-full p-5 sm:p-6" style={{ animationDelay: `${delay}ms` }}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h2 className="truncate text-base font-extrabold tracking-tight text-slate-800">
            Cross-Channel Growth
          </h2>
          <p className="text-xs text-slate-500 sm:text-sm">Last 90 days, all channels combined</p>
        </div>
        <div className="flex shrink-0 flex-col gap-1.5 text-xs text-slate-500 sm:flex-row sm:gap-4">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-brand" /> This quarter
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded-full bg-sky" /> Previous quarter
          </span>
        </div>
      </div>

      <div className="mt-6 h-[260px] w-full sm:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: -18 }}>
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#008080" stopOpacity={0.28} />
                <stop offset="100%" stopColor="#008080" stopOpacity={0} />
              </linearGradient>
              <filter id="growthGlow" x="-20%" y="-40%" width="140%" height="200%">
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="6"
                  floodColor="#008080"
                  floodOpacity="0.35"
                />
              </filter>
            </defs>
            <CartesianGrid vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={28}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={44}
              tick={{ fill: "#94a3b8", fontSize: 11 }}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey="current"
              name="This quarter"
              stroke="#008080"
              strokeWidth={2.5}
              fill="url(#growthFill)"
              filter="url(#growthGlow)"
              dot={false}
              activeDot={{ r: 4, fill: "#008080", stroke: "#fff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="previous"
              name="Previous quarter"
              stroke="#00BFFF"
              strokeWidth={2}
              strokeDasharray="6 6"
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
