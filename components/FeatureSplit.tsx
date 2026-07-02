const teamA = [
  { initials: "SB", name: "Sofia Blanco", color: "bg-purple-500" },
  { initials: "DK", name: "Daniel Kim", color: "bg-emerald-500" },
  { initials: "LM", name: "Lucia Mora", color: "bg-sky-500" },
];

const teamB = [
  { initials: "RA", name: "Rafael Acosta", color: "bg-amber-500" },
  { initials: "NV", name: "Nina Vargas", color: "bg-purple-500" },
  { initials: "TC", name: "Tomas Cruz", color: "bg-emerald-500" },
];

type Member = { initials: string; name: string; color: string };

function UserListCard({
  title,
  members,
  className = "",
}: {
  title: string;
  members: Member[];
  className?: string;
}) {
  return (
    <div className={`w-72 rounded-2xl bg-white p-5 shadow-lg ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      <ul className="mt-4 space-y-4">
        {members.map((member) => (
          <li key={member.name} className="flex items-center gap-3">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${member.color}`}
            >
              {member.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-navy">
                {member.name}
              </p>
              <div className="mt-1.5 h-2 w-3/4 rounded-full bg-slate-100" />
              <div className="mt-1 h-2 w-1/2 rounded-full bg-slate-100" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SplitBlock({
  eyebrow,
  title,
  description,
  bgClass,
  cardTitleA,
  cardTitleB,
  membersA,
  membersB,
  reverse = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  bgClass: string;
  cardTitleA: string;
  cardTitleB: string;
  membersA: Member[];
  membersB: Member[];
  reverse?: boolean;
}) {
  return (
    <div className={`rounded-3xl px-8 py-14 lg:px-14 ${bgClass}`}>
      <div
        className={`grid items-center gap-12 lg:grid-cols-2 ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Text */}
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
            {eyebrow}
          </span>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {title}
          </h3>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-600">
            {description}
          </p>
        </div>

        {/* Overlapping white cards */}
        <div className="relative mx-auto h-80 w-full max-w-sm">
          <UserListCard
            title={cardTitleA}
            members={membersA}
            className="absolute left-0 top-0 rotate-[-2deg]"
          />
          <UserListCard
            title={cardTitleB}
            members={membersB}
            className="absolute bottom-0 right-0 rotate-[2deg]"
          />
        </div>
      </div>
    </div>
  );
}

export default function FeatureSplit() {
  return (
    <section id="about" className="mx-auto max-w-7xl space-y-8 px-6 py-24 lg:px-8">
      <SplitBlock
        eyebrow="Team Visibility"
        title="Know exactly who is on air, on call and on deck."
        description="Every producer, host and editor in one live roster. Assignments update in real time so your whole team schedules from the same source of truth — no spreadsheets, no double bookings."
        bgClass="bg-emerald-200/50"
        cardTitleA="On Air Now"
        cardTitleB="Up Next"
        membersA={teamA}
        membersB={teamB}
      />
      <SplitBlock
        eyebrow="Audience Alignment"
        title="Match every slot to the audience that actually shows up."
        description="Anton Logic overlays listener and viewer data on your grid, surfacing the segments each host performs best with. Move a show, and the projected reach updates instantly."
        bgClass="bg-sky-200/50"
        cardTitleA="Top Performers"
        cardTitleB="Rising Segments"
        membersA={teamB}
        membersB={teamA}
        reverse
      />
    </section>
  );
}
