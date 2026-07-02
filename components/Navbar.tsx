"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#blog" },
];

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

function CartIcon() {
  return (
    <button
      type="button"
      aria-label="Shopping cart"
      className="relative rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-purple-500" />
    </button>
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
          {navLinks.map((link) => (
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

        {/* Right actions (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <CartIcon />
          <Link
            href="#login"
            className="rounded-full border border-slate-500 px-5 py-2 text-sm font-semibold text-white transition hover:border-white"
          >
            Log In
          </Link>
          <Link
            href="#get-started"
            className="rounded-full bg-purple-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition hover:bg-purple-600"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
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
            {navLinks.map((link) => (
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
          <div className="mt-6 flex items-center gap-3">
            <CartIcon />
            <Link
              href="#login"
              className="flex-1 rounded-full border border-slate-500 px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Log In
            </Link>
            <Link
              href="#get-started"
              className="flex-1 rounded-full bg-purple-500 px-5 py-2 text-center text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
