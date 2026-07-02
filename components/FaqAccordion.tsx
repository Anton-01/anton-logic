"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    question: "Can I trial Anton Logic before paying?",
    answer:
      "Yes. Every plan starts with a 14-day free trial with full access to scheduling, analytics and integrations. No credit card required — you only pay when you decide to keep going.",
  },
  {
    question: "How does the audience data get into my schedule?",
    answer:
      "Anton Logic connects to your existing analytics, streaming and ad platforms through native integrations. Data syncs automatically and appears as an overlay on your scheduling grid within minutes.",
  },
  {
    question: "Can my whole team collaborate on the same grid?",
    answer:
      "Absolutely. Producers, hosts and managers share one live schedule with role-based permissions, so everyone edits what they own and sees changes the moment they happen.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data is always yours. You can export schedules, reports and raw analytics at any time, and we permanently delete your workspace data 30 days after cancellation.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer:
      "Yes — annual plans save you two months compared to paying monthly, and nonprofit and educational organizations get an additional discount. Contact us for details.",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="blog" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
        {/* Left column */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            In Case You Missed Anything.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
            Quick answers to the questions we hear most. Still curious? Start a
            trial and see everything first-hand.
          </p>
          <Link
            href="#get-started"
            className="mt-8 inline-block rounded-full bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600"
          >
            Start Free Trial
          </Link>
        </div>

        {/* Right column: accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-navy sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                      isOpen
                        ? "bg-purple-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div id={`faq-panel-${index}`} className="px-6 pb-6">
                    <p className="text-sm leading-relaxed text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
