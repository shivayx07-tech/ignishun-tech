import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Section } from "@/components/dashboard/ChannelPage";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Client Settings — InsightFlow by Ignishun Tech" },
      { name: "description", content: "Update your company profile, notification preferences and email alerts." },
      { property: "og:title", content: "Client Settings — InsightFlow" },
      { property: "og:description", content: "Manage your company profile and alert preferences." },
    ],
  }),
  component: SettingsPage,
});

const STORAGE_KEY = "insightflow-settings";
const defaults = {
  company: "Acme Industries",
  email: "client@acme.com",
  frequency: "weekly",
  alerts: { performance: true, budget: true, reports: false },
};
type Prefs = typeof defaults;

const alertLabels: Record<keyof Prefs["alerts"], string> = {
  performance: "Performance drop alerts",
  budget: "Ad budget threshold alerts",
  reports: "Monthly report ready",
};

function SettingsPage() {
  const [prefs, setPrefs] = useState<Prefs>(defaults);
  // Load saved preferences after hydration.
  useEffect(() => {
    try {
      setPrefs({ ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") });
    } catch {
      /* ignore corrupt storage */
    }
  }, []);
  const [error, setError] = useState("");

  const save = (e: FormEvent) => {
    e.preventDefault();
    if (!prefs.company.trim()) return setError("Company name is required.");
    if (!/^\S+@\S+\.\S+$/.test(prefs.email)) return setError("Enter a valid email address.");
    setError("");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    toast.success("Settings saved");
  };

  const input = "mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm text-slate-800 ring-1 ring-slate-200 outline-none focus:ring-brand";

  return (
    <DashboardLayout title="Client Settings" subtitle="Your profile and notification preferences.">
      <form onSubmit={save} className="flex max-w-2xl flex-col gap-6">
        <Section title="Company Profile" delay={120}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-800">
              Company name
              <input className={input} value={prefs.company} onChange={(e) => setPrefs({ ...prefs, company: e.target.value })} />
            </label>
            <label className="text-sm font-medium text-slate-800">
              Contact email
              <input type="email" className={input} value={prefs.email} onChange={(e) => setPrefs({ ...prefs, email: e.target.value })} />
            </label>
            <label className="text-sm font-medium text-slate-800 sm:col-span-2">
              Report frequency
              <select className={input} value={prefs.frequency} onChange={(e) => setPrefs({ ...prefs, frequency: e.target.value })}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </label>
          </div>
        </Section>

        <Section title="Email Alerts" delay={240}>
          <div className="flex flex-col gap-3">
            {(Object.keys(alertLabels) as (keyof Prefs["alerts"])[]).map((k) => (
              <label key={k} className="flex items-center justify-between gap-3 rounded-xl bg-white p-3 ring-1 ring-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card">
                <span className="text-sm text-slate-800">{alertLabels[k]}</span>
                <Switch
                  checked={prefs.alerts[k]}
                  onCheckedChange={(v) => setPrefs({ ...prefs, alerts: { ...prefs.alerts, [k]: v } })}
                />
              </label>
            ))}
          </div>
        </Section>

        {error && <p className="text-sm font-medium text-destructive">{error}</p>}
        <button type="submit" className="self-start rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
          Save changes
        </button>
      </form>
    </DashboardLayout>
  );
}
