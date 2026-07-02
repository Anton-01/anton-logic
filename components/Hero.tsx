import Link from "next/link";
import { siteData } from "@/lib/siteData";

function DeployCard() {
  return (
    <div className="w-64 rounded-2xl bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Deploys esta semana
        </p>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-600">
          +32%
        </span>
      </div>
      <p className="mt-2 text-3xl font-bold text-navy">128</p>
      {/* Bar chart */}
      <div className="mt-4 flex h-20 items-end gap-2">
        {[35, 55, 40, 70, 50, 90, 65].map((height, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-md ${
              i === 5 ? "bg-purple-500" : "bg-purple-200"
            }`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function CodeCard() {
  return (
    <div className="w-72 rounded-2xl bg-white p-5 shadow-card">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs font-medium text-slate-400">
          api/deploy.ts
        </span>
      </div>
      <pre className="mt-4 overflow-hidden rounded-xl bg-navy p-4 text-xs leading-relaxed">
        <code>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-sky-300">app</span>{" "}
          <span className="text-slate-400">=</span>{" "}
          <span className="text-emerald-300">buildCloud</span>
          <span className="text-slate-400">({"{"}</span>
          {"\n"}
          <span className="text-slate-300">  scale</span>
          <span className="text-slate-400">:</span>{" "}
          <span className="text-amber-300">&quot;auto&quot;</span>
          <span className="text-slate-400">,</span>
          {"\n"}
          <span className="text-slate-300">  uptime</span>
          <span className="text-slate-400">:</span>{" "}
          <span className="text-amber-300">&quot;99.9%&quot;</span>
          {"\n"}
          <span className="text-slate-400">{"}"});</span>
        </code>
      </pre>
    </div>
  );
}

function UptimeCard() {
  return (
    <div className="flex w-56 items-center gap-4 rounded-2xl bg-white p-5 shadow-card">
      <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          className="stroke-slate-100"
          strokeWidth="4"
        />
        <circle
          cx="18"
          cy="18"
          r="15.9"
          fill="none"
          className="stroke-purple-500"
          strokeWidth="4"
          strokeDasharray="99 100"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className="text-2xl font-bold text-navy">99.9%</p>
        <p className="text-xs text-slate-400">Disponibilidad</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const { headline, subheadline, primary_cta } = siteData.hero_section;

  return (
    <section id="home" className="bg-navy">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2 lg:px-8 lg:pt-24">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Software · Cloud · Modernización
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            {subheadline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#contact"
              className="rounded-full bg-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-600"
            >
              {primary_cta}
            </Link>
            <Link
              href="#services"
              className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
            >
              Ver Servicios
            </Link>
          </div>
        </div>

        {/* Floating dashboard cards */}
        <div className="relative mx-auto h-[420px] w-full max-w-md lg:max-w-none">
          <div className="absolute inset-x-8 inset-y-4 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-emerald-400/10 blur-2xl" />
          <div className="absolute left-0 top-0 rotate-[-3deg]">
            <DeployCard />
          </div>
          <div className="absolute right-0 top-24 rotate-[2deg]">
            <CodeCard />
          </div>
          <div className="absolute bottom-0 left-10 rotate-[1deg]">
            <UptimeCard />
          </div>
        </div>
      </div>
    </section>
  );
}
