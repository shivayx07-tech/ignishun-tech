import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  LayoutDashboard,
  Megaphone,
  Menu,
  Monitor,
  Search,
  Settings,
  Share2,
  Smartphone,
  Tablet,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { StatusBar } from "@/components/dashboard/StatusBar";

type ViewportMode = "desktop" | "tablet" | "mobile";

/** Sidebar navigation — each entry is its own route, switched client-side with no reloads. */
const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/web-design", label: "Web Design & Core Vitals", icon: Monitor },
  { to: "/social-media", label: "Social Media Growth", icon: Share2 },
  { to: "/paid-ads", label: "Paid Ads ROI & Spend", icon: Megaphone },
  { to: "/seo", label: "SEO & Content Strategy", icon: Search },
  { to: "/settings", label: "Client Settings", icon: Settings },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-8 p-5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-card">
          <BarChart3 className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold tracking-tight text-slate-800">
            InsightFlow
          </p>
          <p className="truncate text-xs text-slate-500">Ignishun Tech</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            activeOptions={{ exact: to === "/" }}
            activeProps={{
              className:
                "bg-slate-800 text-white shadow-card hover:bg-slate-800",
            }}
            inactiveProps={{
              className: "text-slate-500 hover:bg-white hover:text-slate-800",
            }}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300"
          >
            <Icon className="size-4 shrink-0" />
            <span className="truncate">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl bg-white p-4 shadow-card">
        <p className="text-xs font-semibold text-slate-800">
          One agency. Every channel.
        </p>
        <p className="mt-1 text-xs text-brand">Zero hand-offs.</p>
      </div>
    </div>
  );
}

export function DashboardLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [viewportMode, setViewportMode] = useState<ViewportMode>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("insightflow_viewport");
      if (saved === "tablet" || saved === "mobile" || saved === "desktop") {
        return saved;
      }
    }
    return "desktop";
  });

  const handleSetViewport = (mode: ViewportMode) => {
    setViewportMode(mode);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("insightflow_viewport", mode);
    }
  };

  const isSimulated = viewportMode !== "desktop";

  // Dynamic wrapper styles based on viewportMode
  const getContainerClasses = () => {
    switch (viewportMode) {
      case "tablet":
        return "max-w-[768px] mx-auto border-[12px] border-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden mt-6 h-[90vh] relative transition-all duration-500 ease-in-out bg-slate-50 flex flex-col";
      case "mobile":
        return "max-w-[375px] mx-auto border-[14px] border-slate-900 rounded-[3rem] shadow-2xl overflow-hidden mt-6 h-[85vh] relative transition-all duration-500 ease-in-out bg-slate-50 flex flex-col";
      case "desktop":
      default:
        return "w-full min-h-screen relative transition-all duration-500 ease-in-out bg-slate-50";
    }
  };

  const viewportControls = (
    <div
      className="flex shrink-0 items-center gap-1 rounded-full bg-slate-200/50 p-1 backdrop-blur-sm border border-slate-300/40"
      role="group"
      aria-label="Device Viewport Switcher"
    >
      <button
        onClick={() => handleSetViewport("desktop")}
        title="Desktop View (Full Screen)"
        aria-pressed={viewportMode === "desktop"}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs transition-all duration-200 focus:outline-none ${
          viewportMode === "desktop"
            ? "bg-white font-semibold text-teal-600 shadow-sm"
            : "font-medium text-slate-400 hover:text-slate-600"
        }`}
      >
        <Monitor className="size-3.5" />
        <span className="hidden md:inline">Desktop</span>
      </button>

      <button
        onClick={() => handleSetViewport("tablet")}
        title="Tablet View (iPad 768px)"
        aria-pressed={viewportMode === "tablet"}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs transition-all duration-200 focus:outline-none ${
          viewportMode === "tablet"
            ? "bg-white font-semibold text-teal-600 shadow-sm"
            : "font-medium text-slate-400 hover:text-slate-600"
        }`}
      >
        <Tablet className="size-3.5" />
        <span className="hidden md:inline">Tablet</span>
      </button>

      <button
        onClick={() => handleSetViewport("mobile")}
        title="Mobile View (iPhone 375px)"
        aria-pressed={viewportMode === "mobile"}
        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs transition-all duration-200 focus:outline-none ${
          viewportMode === "mobile"
            ? "bg-white font-semibold text-teal-600 shadow-sm"
            : "font-medium text-slate-400 hover:text-slate-600"
        }`}
      >
        <Smartphone className="size-3.5" />
        <span className="hidden md:inline">Mobile</span>
      </button>
    </div>
  );

  return (
    <div
      className={
        isSimulated
          ? "min-h-screen w-full bg-slate-200/60 py-4 px-3 sm:px-6 flex flex-col items-center justify-start overflow-y-auto transition-all duration-500 ease-in-out"
          : "min-h-screen w-full bg-slate-50 transition-all duration-500 ease-in-out"
      }
    >
      {/* Presentation Device Container */}
      <div className={getContainerClasses()}>
        {/* Simulated Camera / Dynamic Island */}
        {viewportMode === "mobile" && (
          <div className="pointer-events-none absolute top-0 left-1/2 z-50 flex h-4 w-28 -translate-x-1/2 items-center justify-center rounded-b-xl bg-slate-900 shadow-md">
            <span className="size-1.5 rounded-full bg-slate-800 ring-1 ring-slate-700/60 mr-2" />
            <span className="h-1 w-6 rounded-full bg-slate-800" />
          </div>
        )}

        {viewportMode === "tablet" && (
          <div className="pointer-events-none absolute top-1.5 left-1/2 z-50 size-2.5 -translate-x-1/2 rounded-full bg-slate-800 ring-1 ring-slate-700/60 shadow-inner" />
        )}

        {/* Inner Scroll Container when in simulated mode */}
        <div
          className={
            isSimulated
              ? "flex-1 w-full overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden relative"
              : "w-full min-h-screen relative"
          }
        >
          {/* Background Depth Graphics */}
          <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden opacity-50 mix-blend-multiply">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-sky/20 blur-[140px]" />
          </div>

          {/* Desktop Fixed Sidebar (Only rendered in full desktop mode) */}
          {!isSimulated && (
            <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] panel rounded-none lg:block bg-surface/80 backdrop-blur-xl">
              <SidebarContent />
            </aside>
          )}

          {/* Mobile/Tablet Drawer Menu */}
          {open && (
            <div
              className={
                isSimulated
                  ? "absolute inset-0 z-50"
                  : "fixed inset-0 z-50 lg:hidden"
              }
            >
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
              />
              <div className="absolute inset-y-0 left-0 w-[260px] max-w-[80vw] h-full animate-in slide-in-from-left bg-surface shadow-card-hover duration-300">
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-4 grid size-9 place-items-center rounded-xl text-slate-500 hover:bg-white"
                >
                  <X className="size-4" />
                </button>
                <SidebarContent onNavigate={() => setOpen(false)} />
              </div>
            </div>
          )}

          {/* Main Layout Area */}
          <div className={isSimulated ? "w-full pl-0" : "lg:pl-[260px]"}>
            <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-md">
              <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-3.5 sm:px-6 sm:py-4 lg:px-8">
                {/* Left: Menu & Page Title */}
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <button
                    aria-label="Open menu"
                    onClick={() => setOpen(true)}
                    className={`grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl bg-surface text-slate-800 shadow-card ${
                      isSimulated ? "block" : "lg:hidden"
                    }`}
                  >
                    <Menu className="size-4" />
                  </button>
                  <div className="min-w-0">
                    <h1 className="truncate text-sm sm:text-base font-extrabold tracking-tight text-slate-800 md:text-lg">
                      {title}
                    </h1>
                    <p className="truncate text-[11px] text-slate-500 sm:text-xs md:text-sm">
                      {subtitle}
                    </p>
                  </div>
                </div>

                {/* Right: Viewport Toggle & User Avatar */}
                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                  {viewportControls}
                  <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-xs sm:text-sm font-bold text-brand ring-1 ring-white/90 shadow-sm">
                    CL
                  </span>
                </div>
              </div>
            </header>

            {/* Dynamic Status Bar Ribbon */}
            <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 sm:pt-4 lg:px-8">
              <StatusBar />
            </div>

            {/* Page Content */}
            <main className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
