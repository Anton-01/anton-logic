import { siteData } from "@/lib/siteData";

const pointIcons = [
  // Calidad Premium
  <path key="quality" d="M12 2l2.9 6.26L21 9.27l-5 4.6L17.18 21 12 17.4 6.82 21 8 13.87l-5-4.6 6.1-1.01L12 2z" />,
  // Entrega Rápida
  <path key="speed" d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />,
  // Soporte Continuo
  <>
    <circle key="c" cx="12" cy="12" r="9" />
    <path key="support" d="M12 7v5l3 3" />
  </>,
];

export default function AboutSection() {
  const { section_title, points } = siteData.about_section;

  return (
    <section id="about" className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
      <div className="rounded-3xl bg-emerald-200/50 px-8 py-14 lg:px-14">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Nosotros
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {section_title}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {points.map((point, index) => (
            <div
              key={point.title}
              className="rounded-2xl bg-white p-7 shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {pointIcons[index]}
                </svg>
              </span>
              <h3 className="mt-5 text-lg font-bold text-navy">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {point.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
