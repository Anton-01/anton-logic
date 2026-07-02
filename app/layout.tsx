import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { siteData } from "@/lib/siteData";

const SITE_URL = "https://antonlogic.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteData.meta_data.title,
    template: "%s | Anton Logic",
  },
  description: siteData.meta_data.description,
  keywords: [
    "desarrollo de software a medida",
    "modernización de sistemas legacy",
    "desarrollo web SEO",
    "APIs RESTful",
    "microservicios",
    "software cloud",
    "Anton Logic",
    "Morelia",
  ],
  authors: [{ name: "Anton Logic" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    siteName: "Anton Logic",
    title: siteData.meta_data.title,
    description: siteData.meta_data.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anton Logic — Desarrollo de Software a Medida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteData.meta_data.title,
    description: siteData.meta_data.description,
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/**
 * JSON-LD Schema Markup (ProfessionalService + OfferCatalog).
 * Estructura los servicios del sitio para que Google pueda mostrarlos
 * como Sitelinks / fragmentos enriquecidos.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: "Anton Logic",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  image: `${SITE_URL}/og-image.png`,
  description: siteData.meta_data.description,
  telephone: siteData.contact_section.contact_info.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Morelia",
    addressRegion: "Michoacán",
    addressCountry: "MX",
  },
  areaServed: {
    "@type": "Country",
    name: "México",
  },
  knowsAbout: [
    "Desarrollo de software a medida",
    "Modernización de sistemas legacy",
    "Desarrollo web y SEO técnico",
    "APIs RESTful y microservicios",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: siteData.services_section.section_title,
    itemListElement: siteData.services_section.items.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      url: `${SITE_URL}/#${service.id}`,
      itemOffered: {
        "@type": "Service",
        "@id": `${SITE_URL}/#${service.id}`,
        name: service.name,
        description: service.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        serviceType: service.name,
      },
    })),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
