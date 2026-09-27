import { useState } from "react";
import { Globe, Megaphone, Search, Share2, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "@tanstack/react-router";

type Channel = {
  id: string;
  to: "/" | "/web-design" | "/social-media" | "/paid-ads" | "/seo";
  label: string;
  tooltipText: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  dotColor: string;
  glowRgb: string;
};

const CHANNELS: Channel[] = [
  {
    id: "web",
    to: "/web-design",
    label: "Web Design",
    tooltipText: "✦ Web Design & Core Vitals",
    icon: Globe,
    iconBg: "bg-sky/10",
    iconColor: "text-sky",
    dotColor: "#00BFFF",
    glowRgb: "0,191,255",
  },
  {
    id: "social",
    to: "/social-media",
    label: "Social Media",
    tooltipText: "✦ Social Media Growth",
    icon: Share2,
    iconBg: "bg-mint/15",
    iconColor: "text-mint-ink",
    dotColor: "#3ecf72",
    glowRgb: "62,207,114",
  },
  {
    id: "ads",
    to: "/paid-ads",
    label: "Paid Ads",
    tooltipText: "✦ Paid Ads ROI & Spend",
    icon: Megaphone,
    iconBg: "bg-brand/10",
    iconColor: "text-brand",
    dotColor: "#008080",
    glowRgb: "0,128,128",
  },
  {
    id: "seo",
    to: "/seo",
    label: "SEO & Content",
    tooltipText: "✦ SEO & Content Strategy",
    icon: Search,
    iconBg: "bg-sky/10",
    iconColor: "text-sky",
    dotColor: "#00BFFF",
    glowRgb: "0,191,255",
  },
];

/* ── Animated connector line with min-width and shrink protection ── */
function Connector({ channel, active }: { channel: Channel; active: boolean }) {
  return (
    <div
      className="relative flex h-px min-w-[16px] shrink-0 items-center overflow-visible"
      style={{ width: "clamp(16px, 4vw, 52px)" }}
    >
      {/* Static base line */}
      <div
        className="h-px w-full rounded-full transition-all duration-500"
        style={{
          background: active
            ? `linear-gradient(90deg, rgba(${channel.glowRgb},0.1), rgba(${channel.glowRgb},0.9), rgba(${channel.glowRgb},0.1))`
            : "rgba(148,163,184,0.25)",
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
  isHovered,
  onClick,
  onEnter,
  onLeave,
}: {
  channel: Channel;
  active: boolean;
  isHovered: boolean;
  onClick: () => void;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const Icon = channel.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="group relative flex shrink-0 flex-col items-center focus:outline-none cursor-pointer active:scale-95 transition-transform duration-150"
      aria-label={`${channel.label} navigation tab`}
    >
      {/* Tooltip */}
      <span
        className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2 py-0.5 text-[8.5px] sm:text-[9px] font-bold tracking-wide text-white shadow-lg transition-all duration-300 z-30 ${
          isHovered
            ? "translate-y-0 opacity-100"
            : "translate-y-1 opacity-0"
        }`}
        style={{
          background: "rgba(15,23,42,0.92)",
          backdropFilter: "blur(8px)",
        }}
        role="tooltip"
      >
        {channel.tooltipText}
      </span>

      {/* Icon chip */}
      <span
        className={`grid size-7 sm:size-8 place-items-center rounded-lg sm:rounded-xl transition-all duration-300 ${channel.iconBg}`}
        style={{
          transform: active ? "scale(1.15)" : "scale(1)",
          boxShadow: active
            ? `0 4px 16px -3px rgba(${channel.glowRgb},0.6), 0 0 0 1.5px rgba(${channel.glowRgb},0.35)`
            : "none",
        }}
      >
        <Icon
          className={`size-3 sm:size-3.5 transition-all duration-300 ${channel.iconColor}`}
          strokeWidth={active ? 2.5 : 2}
        />
      </span>

      {/* Label: text-[10px] on mobile, md:text-xs on desktop */}
      <span
        className={`mt-1 whitespace-nowrap text-[10px] md:text-xs font-semibold tracking-tight transition-all duration-300 ${
          active ? "text-slate-900 font-bold" : "text-slate-500 group-hover:text-slate-800"
        }`}
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
  const navigate = useNavigate();
  const location = useLocation();

  // Match current route to a channel ID or "overview" for the central node
  const currentRouteId =
    CHANNELS.find((ch) => ch.to === location.pathname)?.id ??
    (location.pathname === "/" ? "overview" : null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Active channel is the hovered one if hovering, otherwise the current route
  const activeId = hoveredId ?? currentRouteId;

  return (
    <>
      <style>{`
        @keyframes connector-pulse {
          0%   { left: 0%;   opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes hub-halo-sm {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        @keyframes hub-halo-lg {
          0%   { transform: scale(1);   opacity: 0.55; }
          100% { transform: scale(1.85); opacity: 0; }
        }
        @keyframes badge-breathe {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,128,128,0); }
          50%       { box-shadow: 0 0 0 5px rgba(0,128,128,0.18); }
        }
      `}</style>

      <div
        className="panel rise relative w-full overflow-hidden rounded-2xl"
        style={{
          animationDelay: `${delay}ms`,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
        aria-label="Omni-Channel Status Bar"
      >
        {/* Horizontal scroll container with touch snap, hidden scrollbars, and single-line flex-nowrap */}
        <div className="flex w-full flex-nowrap items-center overflow-x-auto overflow-y-hidden px-3 py-3 sm:px-6 sm:py-3.5 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max flex-nowrap items-center justify-between sm:justify-center w-full gap-2 sm:gap-0">

            {/* ── Left two nodes (Web Design, Social Media) ── */}
            {CHANNELS.slice(0, 2).map((ch) => (
              <div key={ch.id} className="flex shrink-0 items-center snap-start">
                <ChannelNode
                  channel={ch}
                  active={activeId === ch.id}
                  isHovered={hoveredId === ch.id}
                  onClick={() => navigate({ to: ch.to })}
                  onEnter={() => setHoveredId(ch.id)}
                  onLeave={() => setHoveredId(null)}
                />
                <Connector channel={ch} active={activeId === ch.id} />
              </div>
            ))}

            {/* ── Central Hub: scaled and padded compactly on mobile ── */}
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              onMouseEnter={() => setHoveredId("overview")}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId("overview")}
              onBlur={() => setHoveredId(null)}
              className="group relative mx-1.5 sm:mx-3 flex shrink-0 flex-col items-center snap-center focus:outline-none cursor-pointer active:scale-95 transition-transform duration-150"
              aria-label="Ignishun Tech — Overview tab"
            >
              {/* Tooltip */}
              <span
                className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-2 py-0.5 text-[8.5px] sm:text-[9px] font-bold tracking-wide text-white shadow-lg transition-all duration-300 z-30 ${
                  hoveredId === "overview"
                    ? "translate-y-0 opacity-100"
                    : "translate-y-1 opacity-0"
                }`}
                style={{
                  background: "rgba(15,23,42,0.92)",
                  backdropFilter: "blur(8px)",
                }}
                role="tooltip"
              >
                ✦ Hub Core · Overview
              </span>

              {/* Layered halo rings: compact on mobile, expansive on sm+ */}
              <span
                className="absolute size-9 sm:size-11 rounded-xl sm:rounded-2xl bg-brand"
                style={{
                  animation: "hub-halo-sm 2.2s ease-out infinite",
                }}
              />
              <span
                className="absolute size-9 sm:size-11 rounded-xl sm:rounded-2xl bg-brand opacity-25"
                style={{
                  animation: "hub-halo-sm 2.2s ease-out 1.1s infinite",
                }}
              />

              {/* Hub body */}
              <span
                className={`relative z-10 grid size-7 sm:size-9 place-items-center rounded-lg sm:rounded-xl bg-brand shadow-card transition-all duration-300 ${
                  activeId === "overview" ? "scale-105" : "group-hover:scale-105"
                }`}
                style={{
                  boxShadow:
                    activeId === "overview"
                      ? "0 0 0 2px rgba(0,128,128,0.35), 0 3px 14px -3px rgba(0,128,128,0.6)"
                      : "0 0 0 1.5px rgba(0,128,128,0.2), 0 3px 14px -3px rgba(0,128,128,0.5)",
                }}
              >
                <BarChart3 className="size-3.5 sm:size-4 text-white" strokeWidth={2.5} />
              </span>

              {/* Central Label */}
              <span
                className={`mt-1 whitespace-nowrap text-[9px] md:text-xs font-extrabold tracking-tight transition-colors duration-300 ${
                  activeId === "overview" ? "text-brand underline decoration-brand/40 underline-offset-2" : "text-brand"
                }`}
              >
                Ignishun Tech
              </span>

              {/* Live pill */}
              <span className="mt-0.5 flex items-center gap-1 rounded-full bg-brand/10 px-1.5 py-px">
                <span className="size-1 animate-pulse rounded-full bg-brand" />
                <span className="text-[7px] sm:text-[7.5px] font-bold uppercase tracking-widest text-brand">
                  Live
                </span>
              </span>
            </button>

            {/* ── Right two nodes (Paid Ads, SEO & Content) ── */}
            {CHANNELS.slice(2, 4).map((ch) => (
              <div key={ch.id} className="flex shrink-0 items-center snap-start">
                <Connector channel={ch} active={activeId === ch.id} />
                <ChannelNode
                  channel={ch}
                  active={activeId === ch.id}
                  isHovered={hoveredId === ch.id}
                  onClick={() => navigate({ to: ch.to })}
                  onEnter={() => setHoveredId(ch.id)}
                  onLeave={() => setHoveredId(null)}
                />
              </div>
            ))}

            {/* ── Right status pill (visible on sm+ screens) ── */}
            <div className="ml-3 hidden items-center gap-2 sm:flex sm:shrink-0 lg:ml-6">
              <span className="text-[10px] md:text-xs font-medium text-slate-400 whitespace-nowrap">
                Zero hand-offs
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] md:text-xs font-bold text-brand whitespace-nowrap"
                style={{ animation: "badge-breathe 3s ease-in-out infinite" }}
              >
                <span className="size-1.5 animate-pulse rounded-full bg-brand" />
                4 / 4 Active
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
