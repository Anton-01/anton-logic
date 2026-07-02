"use client";

import { useState } from "react";
import Link from "next/link";
import { siteData } from "@/lib/siteData";

function Logo() {
  return (
    <Link href="#home" className="flex items-center gap-2">
      <span className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-emerald-400" />
        <span className="absolute bottom-0 right-0 h-5 w-5 rounded-full bg-purple-500 mix-blend-screen" />
      </span>
      <span className="text-xl font-bold tracking-tight text-white">
        Anton Logic
      </span>
    </Link>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Logo />

        {/* Center links (desktop) */}
        <ul className="hidden items-center gap-8 md:flex">
          {siteData.navigation.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Primary CTA (desktop) */}
        <div className="hidden md:block">
          <Link
            href="#contact"
            className="rounded-full bg-purple-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-600"
          >
            Hablemos
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg p-2 text-white transition hover:bg-white/10 md:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 px-6 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col gap-4">
            {siteData.navigation.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="mt-6 block rounded-full bg-purple-500 px-6 py-2.5 text-center text-sm font-semibold text-white"
          >
            Hablemos
          </Link>
        </div>
      )}
    </header>
  );
}
