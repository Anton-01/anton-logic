"use client";

import { useState } from "react";
import Link from "next/link";
import { siteData, type Service } from "@/lib/siteData";

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function ServiceIcon({
  hint,
  className,
}: {
  hint: Service["icon_hint"];
  className: string;
}) {
  switch (hint) {
    case "cloud-code":
      return (
        <svg {...iconProps} className={className}>
          <path d="M17.5 19a4.5 4.5 0 0 0 .42-8.98 6 6 0 0 0-11.7 1.62A4 4 0 0 0 7 19h10.5z" />
          <path d="m10 12-2 2 2 2m4-4 2 2-2 2" />
        </svg>
      );
    case "database-refresh":
      return (
        <svg {...iconProps} className={className}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v6c0 1.4 2.8 2.6 6.5 2.9M4 11v6c0 1.3 2.4 2.4 5.6 2.8" />
          <path d="M20 5v5" />
          <path d="M15 17a4 4 0 0 1 7-1.5M22 20a4 4 0 0 1-7 1.5" />
          <path d="M22 14v2.5h-2.5M15 24v-2.5h2.5" />
        </svg>
      );
    case "layout-fluid":
      return (
        <svg {...iconProps} className={className}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
      );
    case "server-network":
      return (
        <svg {...iconProps} className={className}>
          <rect x="4" y="3" width="16" height="6" rx="1.5" />
          <rect x="4" y="15" width="16" height="6" rx="1.5" />
          <path d="M12 9v6M7.5 6h.01M7.5 18h.01" />
        </svg>
      );
  }
}

function ServiceIllustration({ hint }: { hint: Service["icon_hint"] }) {
  return (
    <div className="relative flex h-full min-h-[260px] items-center justify-center overflow-hidden rounded-2xl bg-navy p-8">
      <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-purple-500/30 blur-2xl" />
      <div className="absolute -bottom-10 -right-6 h-44 w-44 rounded-full bg-emerald-400/20 blur-2xl" />
      <div className="relative grid w-full max-w-xs gap-3">
        <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-500 text-white">
            <ServiceIcon hint={hint} className="h-5 w-5" />
          </span>
          <div className="flex-1 space-y-1.5">
            <div className="h-2 w-3/4 rounded-full bg-white/40" />
            <div className="h-2 w-1/2 rounded-full bg-white/20" />
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
        <div className="ml-8 flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur">
          <span className="h-8 w-8 rounded-full bg-emerald-400/80" />
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

export default function ServicesSection() {
  const { section_title, section_subtitle, items } = siteData.services_section;
  const [activeId, setActiveId] = useState<Service["id"]>(items[0].id);
  const active = items.find((service) => service.id === activeId) ?? items[0];

  return (
    <section id="services" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Servicios
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {section_title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            {section_subtitle}
          </p>
        </div>

        {/* Interactive service cards (tab triggers) */}
        <div
          role="tablist"
          aria-label={section_title}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map((service) => {
            const isActive = service.id === activeId;
            return (
              <button
                key={service.id}
                role="tab"
                id={`tab-${service.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${service.id}`}
                onClick={() => setActiveId(service.id)}
                className={`group rounded-2xl p-6 text-left transition ${
                  isActive
                    ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30"
                    : "bg-white text-navy shadow-sm hover:-translate-y-1 hover:shadow-lg"
                }`}
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-purple-100 text-purple-600 group-hover:bg-purple-500 group-hover:text-white"
                  }`}
                >
                  <ServiceIcon hint={service.icon_hint} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-base font-bold">{service.name}</h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    isActive ? "text-purple-100" : "text-slate-500"
                  }`}
                >
                  {service.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active service detail panel */}
        <div
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          className="mt-8 grid items-center gap-10 rounded-3xl bg-white p-8 shadow-card lg:grid-cols-2 lg:p-12"
        >
          <div id={active.id}>
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <ServiceIcon hint={active.icon_hint} className="h-7 w-7" />
            </span>
            <h3 className="mt-6 text-2xl font-bold tracking-tight text-navy">
              {active.name}
            </h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
              {active.description}
            </p>
            <Link
              href="#contact"
              className="mt-8 inline-block rounded-full bg-purple-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-600"
            >
              Iniciar Proyecto
            </Link>
          </div>
          <ServiceIllustration hint={active.icon_hint} />
        </div>
      </div>
    </section>
  );
}
