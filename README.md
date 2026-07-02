# Anton Logic

> Portafolio de servicios de desarrollo de software — Next.js 14 (App Router), TypeScript y Tailwind CSS

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
│   ├── layout.tsx            # Root layout + SEO metadata + JSON-LD (ProfessionalService/OfferCatalog)
│   ├── page.tsx              # Landing page orchestrating all sections
│   └── globals.css           # Tailwind entry point
├── components/
│   ├── Navbar.tsx            # Dark navbar, "Hablemos" CTA, mobile menu (useState)
│   ├── Hero.tsx              # Navy hero with floating dev-dashboard cards
│   ├── ServicesSection.tsx   # Core visual: interactive service cards + detail panel (useState)
│   ├── ProjectsSection.tsx   # Featured projects with real preview images
│   ├── AboutSection.tsx      # "¿Por qué elegir Anton Logic?" value points
│   ├── ContactSection.tsx    # Phone/location cards + project inquiry form
│   └── Footer.tsx
├── lib/
│   └── siteData.ts           # Single source of truth for all page content
├── public/                   # Static assets (favicon, OG image, project previews)
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

- Metadata centralized in `app/layout.tsx` via the Next.js Metadata API: title template, description, keywords, Open Graph (`es_MX`), Twitter Cards, canonical `metadataBase` and robots directives.
- JSON-LD Schema Markup (`ProfessionalService` with a nested `OfferCatalog`) is injected in the `<head>`, structuring the four services, phone and address so Google can surface them as Sitelinks / rich results. Content is generated from `lib/siteData.ts`, so schema and UI never drift apart.
