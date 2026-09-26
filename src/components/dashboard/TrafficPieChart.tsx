import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from "recharts";

const data = [
  { name: "Organic / SEO", value: 45, color: "#008080" }, // Teal Green (brand)
  { name: "Paid Ads", value: 30, color: "#00BFFF" },     // Sky Blue (sky)
  { name: "Social Media", value: 15, color: "#98FF98" }, // Mint Green (mint)
  { name: "Direct / Other", value: 10, color: "#e2e8f0" }, // Light Grey (slate-200)
];

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export function TrafficPieChart({ delay = 0 }: { delay?: number }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };
  const onPieLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <section className="panel rise w-full p-5 sm:p-6" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-base font-extrabold tracking-tight text-slate-800">
            Channel Budget &amp; Traffic Distribution
          </h2>
          <p className="text-xs text-slate-500 sm:text-sm">
            Current allocation across all campaigns
          </p>
        </div>
      </div>
      
      <div className="mt-6 h-[260px] w-full sm:h-[340px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              onMouseLeave={onPieLeave}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value}%`, "Traffic"]}
              contentStyle={{ 
                borderRadius: '0.75rem', 
                border: 'none', 
                boxShadow: 'var(--shadow-card-hover)' 
              }}
              itemStyle={{ fontWeight: 600, color: '#1e293b' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="size-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
            <span className="text-xs font-semibold text-slate-700">{entry.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
