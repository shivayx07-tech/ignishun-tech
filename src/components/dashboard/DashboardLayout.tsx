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
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { StatusBar } from "@/components/dashboard/StatusBar";

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

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Depth Graphics */}
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden opacity-50 mix-blend-multiply">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-sky/20 blur-[140px]" />
      </div>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[260px] panel rounded-none lg:block bg-surface/80 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
          />
          <div className="absolute inset-y-0 left-0 w-[260px] max-w-[80vw] animate-in slide-in-from-left bg-surface shadow-card-hover duration-300">
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

      <div className="lg:pl-[260px]">
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/70 backdrop-blur-md">
          <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                aria-label="Open menu"
                onClick={() => setOpen(true)}
                className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-slate-800 shadow-card lg:hidden"
              >
                <Menu className="size-4" />
              </button>
              <div className="min-w-0">
                <h1 className="truncate text-base font-extrabold tracking-tight text-slate-800 sm:text-lg">
                  {title}
                </h1>
                <p className="truncate text-xs text-slate-500 sm:text-sm">{subtitle}</p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-bold text-brand ring-1 ring-white/90">
                CL
              </span>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <StatusBar />
        </div>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
