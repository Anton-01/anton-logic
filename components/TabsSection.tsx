"use client";

import { useState } from "react";

type TabId = "investment" | "earnings" | "maintenance" | "marketing" | "growth";

type Tab = {
  id: TabId;
  label: string;
  icon: JSX.Element;
  heading: string;
  bullets: string[];
};

const iconProps = {
  className: "h-5 w-5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const tabs: Tab[] = [
  {
    id: "investment",
    label: "Investment",
    icon: (
      <svg {...iconProps}>
        <path d="M3 21h18M7 21V9m5 12V5m5 16v-8" />
      </svg>
    ),
    heading: "See where every dollar of programming budget goes.",
    bullets: [
      "Track spend per show, slot and campaign in real time",
      "Compare projected vs. actual return for every investment",
      "Flag underperforming budget lines before month close",
      "Export board-ready reports in one click",
    ],
  },
  {
    id: "earnings",
    label: "Earnings",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.5 0-2.5 1-2.5 2s1 1.7 2.5 2 2.5 1 2.5 2-1 2-2.5 2c-1 0-2-.5-2.5-1.5M12 6.5v11" />
      </svg>
    ),
    heading: "Revenue tied directly to the schedule that produced it.",
    bullets: [
      "Attribute ad revenue to specific slots and audiences",
      "Watch daily earnings roll up into live dashboards",
      "Reconcile payouts across every channel automatically",
      "Spot your highest-margin hours at a glance",
    ],
  },
  {
    id: "maintenance",
    label: "Maintenance",
    icon: (
      <svg {...iconProps}>
        <path d="M14.7 6.3a4.5 4.5 0 0 0-6 6L3 18l3 3 5.7-5.7a4.5 4.5 0 0 0 6-6L14 13l-3-3 3.7-3.7z" />
      </svg>
    ),
    heading: "Keep studios, gear and integrations healthy without tickets.",
    bullets: [
      "Automated health checks on every connected system",
      "Preventive maintenance windows placed in low-impact slots",
      "Incident timelines linked to the shows they affected",
      "One dashboard for engineering and programming teams",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: (
      <svg {...iconProps}>
        <path d="M3 11l16-6v14L3 13v-2zM7 14v4a2 2 0 0 0 4 0v-3" />
      </svg>
    ),
    heading: "Promote every show to the audience most likely to tune in.",
    bullets: [
      "Sync campaigns with schedule changes automatically",
      "Segment audiences by listening and viewing behavior",
      "Measure promo lift against real tune-in numbers",
      "Coordinate social, email and on-air pushes in one place",
    ],
  },
  {
    id: "growth",
    label: "Growth",
    icon: (
      <svg {...iconProps}>
        <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
      </svg>
    ),
    heading: "Turn insight into a compounding audience advantage.",
    bullets: [
      "Forecast audience growth per slot with trend models",
      "A/B test schedule changes against control weeks",
      "Benchmark your grid against market averages",
      "Get weekly recommendations ranked by projected impact",
    ],
  },
];

function CheckIcon() {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100">
      <svg
        className="h-3 w-3 text-purple-600"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </span>
  );
}

function AbstractIllustration() {
  return (
    <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-2xl bg-navy p-8">
      <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-purple-500/30 blur-2xl" />
      <div className="absolute -bottom-10 -right-6 h-44 w-44 rounded-full bg-emerald-400/20 blur-2xl" />
      <div className="relative grid w-full max-w-xs gap-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur">
          <span className="h-8 w-8 rounded-full bg-purple-500" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-white/40" />
            <div className="h-2 w-1/2 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="ml-8 flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur">
          <span className="h-8 w-8 rounded-full bg-emerald-400" />
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-2/3 rounded-full bg-white/40" />
            <div className="h-2 w-1/3 rounded-full bg-white/20" />
          </div>
        </div>
        <div className="flex h-16 items-end gap-1.5 rounded-xl bg-white/10 p-3 backdrop-blur">
          {[40, 65, 50, 80, 60, 95, 70, 55].map((height, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-500 to-emerald-400"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState<TabId>("investment");
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section id="pricing" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Bring Your Business Data &amp; Systems Together
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            One platform for every operational signal — pick an area and see
            how Anton Logic connects it to your schedule.
          </p>
        </div>

        {/* Tab list */}
        <div
          role="tablist"
          aria-label="Business areas"
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                    : "bg-white text-slate-600 shadow-sm hover:text-navy"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Active panel */}
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-12 grid items-center gap-12 rounded-3xl bg-white p-8 shadow-card lg:grid-cols-2 lg:p-12"
        >
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-navy">
              {active.heading}
            </h3>
            <ul className="mt-6 space-y-4">
              {active.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm leading-relaxed text-slate-600">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <AbstractIllustration />
        </div>
      </div>
    </section>
  );
}
