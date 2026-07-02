import { siteData } from "@/lib/siteData";

export default function ContactSection() {
  const { section_title, contact_info } = siteData.contact_section;
  const services = siteData.services_section.items;

  return (
    <section id="contact" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Contacto
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            {section_title}
          </h2>
        </div>

        {/* Contact channel cards */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <a
            href={`tel:${contact_info.phone.replace(/\s/g, "")}`}
            className="rounded-2xl bg-navy p-8 text-white transition hover:-translate-y-1"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Teléfono
            </p>
            <p className="mt-1 text-lg font-bold">{contact_info.phone}</p>
          </a>

          <div className="rounded-2xl bg-purple-500 p-8 text-white">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-purple-200">
              Ubicación
            </p>
            <p className="mt-1 text-lg font-bold">{contact_info.location}</p>
          </div>
        </div>

        {/* Project inquiry form */}
        <div className="mt-10 rounded-xl bg-white p-8 shadow-sm lg:p-12">
          <h3 className="text-2xl font-bold tracking-tight text-navy">
            Cuéntanos sobre tu proyecto
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Completa el formulario y te contactaremos en menos de 24 horas.
          </p>
          <form className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-navy"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                className="w-full rounded-lg border-0 bg-slate-100 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-navy"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tu@empresa.com"
                className="w-full rounded-lg border-0 bg-slate-100 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label
                htmlFor="service"
                className="mb-2 block text-sm font-semibold text-navy"
              >
                Servicio de interés
              </label>
              <select
                id="service"
                name="service"
                defaultValue=""
                className="w-full rounded-lg border-0 bg-slate-100 px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="budget"
                className="mb-2 block text-sm font-semibold text-navy"
              >
                Presupuesto estimado
              </label>
              <input
                id="budget"
                name="budget"
                type="text"
                placeholder="Ej. $5,000 – $15,000 USD"
                className="w-full rounded-lg border-0 bg-slate-100 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-navy"
              >
                Cuéntanos sobre tu proyecto
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Describe tu idea, los problemas que quieres resolver y tus tiempos estimados..."
                className="w-full rounded-lg border-0 bg-slate-100 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-600"
              >
                Enviar mensaje
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
