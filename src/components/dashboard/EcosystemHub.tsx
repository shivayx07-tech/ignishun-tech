import { useState } from "react";
import { Globe, Megaphone, Search, Share2, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Channel = {
  id: string;
  label: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  dotColor: string;
  glowRgb: string;
};

const CHANNELS: Channel[] = [
  {
    id: "web",
    label: "Web Design",
    icon: Globe,
    iconBg: "bg-sky/10",
    iconColor: "text-sky",
    dotColor: "#00BFFF",
    glowRgb: "0,191,255",
  },
  {
    id: "social",
    label: "Social Media",
    icon: Share2,
    iconBg: "bg-mint/15",
    iconColor: "text-mint-ink",
    dotColor: "#3ecf72",
    glowRgb: "62,207,114",
  },
  {
    id: "ads",
    label: "Paid Ads",
    icon: Megaphone,
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    dotColor: "#008080",
    glowRgb: "0,128,128",
  },
  {
    id: "seo",
    label: "SEO & Content",
    icon: Search,
    iconBg: "bg-sky/10",
    iconColor: "text-sky",
    dotColor: "#00BFFF",
    glowRgb: "0,191,255",
  },
];

/* ── Animated connector line ─────────────────────────────── */
function Connector({ channel, active }: { channel: Channel; active: boolean }) {
  return (
    <div
      className="relative flex h-px shrink-0 items-center overflow-visible"
      style={{ width: "clamp(18px, 5vw, 56px)" }}
    >
      {/* Static base line */}
      <div
        className="h-px w-full rounded-full transition-all duration-500"
        style={{
          background: active
            ? `linear-gradient(90deg, rgba(${channel.glowRgb},0.1), rgba(${channel.glowRgb},0.9), rgba(${channel.glowRgb},0.1))`
            : "rgba(148,163,184,0.2)",
          boxShadow: active
            ? `0 0 8px 2px rgba(${channel.glowRgb},0.5)`
            : "none",
        }}
      />
      {/* Traveling pulse dot — only when active */}
      {active && (
        <span
          className="absolute size-[5px] rounded-full"
          style={{
            backgroundColor: channel.dotColor,
            boxShadow: `0 0 8px 3px rgba(${channel.glowRgb},0.7)`,
            animation: "connector-pulse 1.4s ease-in-out infinite",
          }}
        />
      )}
    </div>
  );
}

/* ── Channel node chip ───────────────────────────────────── */
function ChannelNode({
  channel,
  active,
  onEnter,
  onLeave,
}: {
  channel: Channel;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const Icon = channel.icon;
  return (
    <button
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="group relative flex flex-col items-center focus:outline-none"
      aria-label={channel.label}
    >
      {/* Tooltip */}
      <span
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2 py-1 text-[9px] font-bold tracking-wide text-white shadow-lg transition-all duration-300 ${
          active
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0"
        }`}
        style={{
          background: "rgba(15,23,42,0.88)",
          backdropFilter: "blur(8px)",
        }}
        role="tooltip"
      >
        ✦ Synchronized · Zero Hand-offs
      </span>

      {/* Icon chip */}
      <span
        className={`grid size-8 place-items-center rounded-xl transition-all duration-300 ${channel.iconBg}`}
        style={{
          transform: active ? "scale(1.18)" : "scale(1)",
          boxShadow: active
            ? `0 4px 18px -4px rgba(${channel.glowRgb},0.6), 0 0 0 1.5px rgba(${channel.glowRgb},0.35)`
            : "none",
        }}
      >
        <Icon
          className={`size-3.5 transition-all duration-300 ${channel.iconColor}`}
          strokeWidth={active ? 2.5 : 2}
        />
      </span>

      {/* Label */}
      <span
        className="mt-1 whitespace-nowrap text-[9px] font-semibold transition-all duration-300"
        style={{ color: active ? "#1e293b" : "#94a3b8" }}
      >
        {channel.label}
      </span>

      {/* Active indicator dot */}
      <span
        className="mt-0.5 size-1 rounded-full transition-all duration-300"
        style={{
          backgroundColor: active ? channel.dotColor : "transparent",
          boxShadow: active ? `0 0 6px 2px rgba(${channel.glowRgb},0.7)` : "none",
        }}
      />
    </button>
  );
}

/* ── Main component ─────────────────────────────────────── */
export function EcosystemHub({ delay = 0 }: { delay?: number }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <>
      <style>{`
        @keyframes connector-pulse {
          0%   { left: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes hub-halo {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(1.95); opacity: 0; }
        }
        @keyframes badge-breathe {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,128,128,0); }
          50%       { box-shadow: 0 0 0 5px rgba(0,128,128,0.18); }
        }
      `}</style>

      <div
        className="panel rise overflow-hidden"
        style={{
          animationDelay: `${delay}ms`,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-0 gap-y-4 px-4 py-3.5 sm:flex-nowrap sm:gap-y-0 sm:px-6">

          {/* ── Left two nodes ── */}
          {CHANNELS.slice(0, 2).map((ch) => (
            <div key={ch.id} className="flex items-center">
              <ChannelNode
                channel={ch}
                active={activeId === ch.id}
                onEnter={() => setActiveId(ch.id)}
                onLeave={() => setActiveId(null)}
              />
              <Connector channel={ch} active={activeId === ch.id} />
            </div>
          ))}

          {/* ── Central Hub ── */}
          <div className="relative mx-2 flex shrink-0 flex-col items-center">
            {/* Layered halo rings */}
            <span
              className="absolute size-12 rounded-2xl bg-brand"
              style={{ animation: "hub-halo 2.2s ease-out infinite" }}
            />
            <span
              className="absolute size-12 rounded-2xl bg-brand opacity-30"
              style={{ animation: "hub-halo 2.2s ease-out 1.1s infinite" }}
            />

            {/* Hub body */}
            <span
              className="relative z-10 grid size-9 place-items-center rounded-xl bg-brand"
              style={{
                boxShadow:
                  "0 0 0 2px rgba(0,128,128,0.25), 0 4px 20px -4px rgba(0,128,128,0.55)",
              }}
            >
              <BarChart3 className="size-4 text-white" strokeWidth={2.5} />
            </span>

            {/* Label */}
            <span className="mt-1 text-[9px] font-extrabold tracking-tight text-brand">
              Ignishun Tech
            </span>

            {/* Live pill */}
            <span className="mt-0.5 flex items-center gap-1 rounded-full bg-brand/10 px-1.5 py-px">
              <span className="size-1 animate-pulse rounded-full bg-brand" />
              <span className="text-[7.5px] font-bold uppercase tracking-widest text-brand">
                Live
              </span>
            </span>
          </div>

          {/* ── Right two nodes ── */}
          {CHANNELS.slice(2, 4).map((ch) => (
            <div key={ch.id} className="flex items-center">
              <Connector channel={ch} active={activeId === ch.id} />
              <ChannelNode
                channel={ch}
                active={activeId === ch.id}
                onEnter={() => setActiveId(ch.id)}
                onLeave={() => setActiveId(null)}
              />
            </div>
          ))}

          {/* ── Right status pill ── */}
          <div className="hidden items-center gap-2.5 sm:ml-auto sm:flex sm:shrink-0">
            <span className="text-[10px] font-medium text-slate-400">
              Zero hand-offs
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-3 py-1 text-[10px] font-bold text-brand"
              style={{ animation: "badge-breathe 3s ease-in-out infinite" }}
            >
              <span className="size-1.5 animate-pulse rounded-full bg-brand" />
              4 / 4 Active
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
