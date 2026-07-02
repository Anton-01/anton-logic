import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-navy">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between lg:px-8">
        <div className="flex items-center gap-2">
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute left-0 top-0 h-3 w-3 rounded-full bg-emerald-400" />
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-purple-500 mix-blend-screen" />
          </span>
          <span className="text-lg font-bold text-white">Anton Logic</span>
        </div>
        <ul className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-slate-400 transition hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} Anton Logic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
