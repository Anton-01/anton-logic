# Anton Logic

> Modern SaaS landing page built with Next.js 14 (App Router), TypeScript and Tailwind CSS

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

Refactored from a static HTML/CSS/Vanilla JS site (preserved in [`legacy/`](legacy/)) to a component-based Next.js architecture with SSR/SSG, clean routing and first-class SEO via the Next.js Metadata API.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | SSR/SSG, routing, Metadata API for SEO |
| TypeScript | Type safety across components |
| Tailwind CSS | Utility-first styling, design system |
| Plus Jakarta Sans (self-hosted via Fontsource) | Modern geometric sans-serif typography |

## Project Structure

```
anton-logic/
├── app/
│   ├── layout.tsx            # Root layout + SEO metadata (Open Graph, Twitter, robots)
│   ├── page.tsx              # Landing page orchestrating all sections
│   └── globals.css           # Tailwind entry point
├── components/
│   ├── Navbar.tsx            # Dark navbar, mobile menu (useState)
│   ├── Hero.tsx              # Navy hero with floating dashboard cards
│   ├── FeatureSplit.tsx      # Mint/sky split blocks with overlapping user cards
│   ├── TabsSection.tsx       # "Data & Systems" tabbed section (useState)
│   ├── FaqAccordion.tsx      # Two-column FAQ with accordion (useState)
│   ├── ContactSection.tsx    # Contact cards + General Inquiries form
│   └── Footer.tsx
├── public/                   # Static assets (favicon, OG image)
└── legacy/                   # Previous static HTML/CSS/JS site
```

## Design System

Inspired by modern SaaS UI (Hisaab style):

| Token | Value | Usage |
|-------|-------|-------|
| Navy | `#0b1727` (`bg-navy`) | Hero, navbar, footer, dark cards |
| Purple | `purple-500` / `purple-600` | Primary buttons, accents, active tabs |
| Mint | `emerald-200/50` – `emerald-500` | Section backgrounds, secondary CTA |
| Sky | `sky-200/50` | Section backgrounds |
| Surfaces | White cards, `shadow-lg`, `rounded-2xl` | Dashboards, lists, forms |

## Getting Started

```bash
npm install
npm run dev      # Development server at http://localhost:3000
npm run build    # Production build
npm run start    # Serve production build
```

## SEO

Metadata is centralized in `app/layout.tsx` using the Next.js Metadata API: title template, description, keywords, Open Graph, Twitter Cards, canonical `metadataBase` and robots directives.
