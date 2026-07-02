const contactChannels = [
  {
    label: "Phone",
    value: "+1 (555) 010-2030",
    note: "Mon–Fri, 9am to 6pm",
    bgClass: "bg-navy",
    textClass: "text-white",
    noteClass: "text-slate-400",
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: "Email",
    value: "hello@antonlogic.com",
    note: "We reply within one business day",
    bgClass: "bg-emerald-300",
    textClass: "text-navy",
    noteClass: "text-navy/60",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 6L2 7" />
      </>
    ),
  },
  {
    label: "Location",
    value: "San José, Costa Rica",
    note: "Remote-first, worldwide",
    bgClass: "bg-purple-500",
    textClass: "text-white",
    noteClass: "text-purple-200",
    icon: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

const formFields = [
  { id: "firstName", label: "First Name", type: "text", placeholder: "Jane" },
  { id: "lastName", label: "Last Name", type: "text", placeholder: "Doe" },
  { id: "email", label: "Email", type: "email", placeholder: "jane@company.com" },
  { id: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Channel cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {contactChannels.map((channel) => (
            <div
              key={channel.label}
              className={`rounded-2xl p-8 ${channel.bgClass} ${channel.textClass}`}
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
                  {channel.icon}
                </svg>
              </span>
              <p className="mt-6 text-sm font-semibold uppercase tracking-wide opacity-70">
                {channel.label}
              </p>
              <p className="mt-1 text-lg font-bold">{channel.value}</p>
              <p className={`mt-1 text-sm ${channel.noteClass}`}>
                {channel.note}
              </p>
            </div>
          ))}
        </div>

        {/* General inquiries form */}
        <div className="mt-10 rounded-xl bg-white p-8 shadow-sm lg:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            General Inquiries
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
            Tell us a bit about yourself and we&apos;ll get back to you shortly.
          </p>
          <form className="mt-8 grid gap-6 sm:grid-cols-2">
            {formFields.map((field) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="mb-2 block text-sm font-semibold text-navy"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border-0 bg-slate-100 px-4 py-3 text-sm text-navy placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-purple-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-600"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
