import Link from "next/link";

function StatCard() {
  return (
    <div className="w-64 rounded-2xl bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Weekly Reach
        </p>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-600">
          +24%
        </span>
      </div>
      <p className="mt-2 text-3xl font-bold text-navy">48.2k</p>
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

function TeamCard() {
  const members = [
    { initials: "MP", name: "Marcus P.", role: "Prime slot · 8:00 PM", color: "bg-purple-500" },
    { initials: "AR", name: "Alicia R.", role: "Morning show · 7:30 AM", color: "bg-emerald-400" },
    { initials: "JT", name: "Jordan T.", role: "Drive time · 5:00 PM", color: "bg-sky-400" },
  ];

  return (
    <div className="w-72 rounded-2xl bg-white p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        Today&apos;s Schedule
      </p>
      <ul className="mt-4 space-y-4">
        {members.map((member) => (
          <li key={member.name} className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${member.color}`}
            >
              {member.initials}
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">{member.name}</p>
              <p className="text-xs text-slate-400">{member.role}</p>
            </div>
            <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function DonutCard() {
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
          strokeDasharray="72 100"
          strokeLinecap="round"
        />
      </svg>
      <div>
        <p className="text-2xl font-bold text-navy">72%</p>
        <p className="text-xs text-slate-400">Audience match</p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="bg-navy">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 lg:grid-cols-2 lg:px-8 lg:pt-24">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            New: real-time audience analytics
          </span>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Scheduling Driven By Actual Media Insight
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Stop guessing your programming. Anton Logic connects live audience
            data to your scheduling workflow so every slot, show and campaign
            is backed by real numbers.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#get-started"
              className="rounded-full bg-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-600"
            >
              Start Free Trial
            </Link>
            <Link
              href="#about"
              className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition hover:border-white hover:bg-white/5"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Floating dashboard cards */}
        <div className="relative mx-auto h-[420px] w-full max-w-md lg:max-w-none">
          <div className="absolute inset-x-8 inset-y-4 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-emerald-400/10 blur-2xl" />
          <div className="absolute left-0 top-0 rotate-[-3deg]">
            <StatCard />
          </div>
          <div className="absolute right-0 top-24 rotate-[2deg]">
            <TeamCard />
          </div>
          <div className="absolute bottom-0 left-10 rotate-[1deg]">
            <DonutCard />
          </div>
        </div>
      </div>
    </section>
  );
}
