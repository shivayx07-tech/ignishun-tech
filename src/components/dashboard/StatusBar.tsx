import { useLocation } from '@tanstack/react-router';
import { BarChart3 } from 'lucide-react';

type TabConfig = {
  pathname: string;
  label: string;
  status: string;
};

const TAB_CONFIGS: TabConfig[] = [
  { pathname: '/', label: 'Overview', status: 'Omni-channel Engine Active' },
  { pathname: '/web-design', label: 'Web Design', status: 'Core Vitals Optimized' },
  { pathname: '/social-media', label: 'Social Media', status: 'Live Sync Running' },
  { pathname: '/paid-ads', label: 'Paid Ads', status: 'ROAS Tracking Active' },
  { pathname: '/seo', label: 'SEO', status: 'Keyword Ranking Live' },
  { pathname: '/settings', label: 'Settings', status: 'Secure Mode' },
];

export function StatusBar() {
  const { pathname } = useLocation();
  const cfg = TAB_CONFIGS.find((c) => c.pathname === pathname) ?? TAB_CONFIGS[0];

  return (
    <div
      className="panel rise overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md shadow-card"
      style={{
        background: 'rgba(255,255,255,0.80)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Animation keyframes */}
      <style>{`
        @keyframes pulse-dot {
          0%,100% { transform: scale(0.6); opacity:0.4; }
          50%      { transform: scale(1);   opacity:1; }
        }
        @keyframes wave {
          0%   { d: path('M0 20 Q30 0 60 20 T120 20'); opacity:0.4; }
          100% { d: path('M0 20 Q30 40 60 20 T120 20'); opacity:0.8; }
        }
        @keyframes badge-breathe {
          0%,100% { box-shadow:0 0 0 0 rgba(0,128,128,0); }
          50% { box-shadow:0 0 0 5px rgba(0,128,128,0.18); }
        }
      `}</style>

      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 sm:flex-nowrap">
        {/* Left pulsing dot + text */}
        <div className="flex items-center gap-2">
          <span
            className="size-3 rounded-full bg-teal-500"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          <span className="text-sm font-medium text-slate-700">
            {cfg.label}: {cfg.status}
          </span>
        </div>

        {/* Center wave */}
        <svg
          viewBox="0 0 120 30"
          className="h-6 w-32 flex-shrink-0"
          aria-hidden="true"
        >
          <path
            fill="none"
            stroke="rgba(0,128,128,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            d="M0 20 Q30 0 60 20 T120 20"
            style={{ animation: 'wave 3s ease-in-out infinite alternate' }}
          />
        </svg>

        {/* Right quick‑action pills */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-100 px-2.5 py-0.5 text-[10px] font-semibold text-teal-800 transition-all duration-300 hover:scale-105 hover:shadow-md">
            Live Sync: ON
          </span>
          <span
            className="inline-flex items-center gap-1 rounded-full bg-mint-100 px-2.5 py-0.5 text-[10px] font-semibold text-mint-800 transition-all duration-300 hover:scale-105 hover:shadow-md"
            style={{ animation: 'badge-breathe 2.8s ease-in-out infinite' }}
          >
            Zero Hand‑offs
          </span>
        </div>
      </div>
    </div>
  );
}
