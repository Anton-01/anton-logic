import type { Metadata } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://antonlogic.com"),
  title: {
    default: "Anton Logic — Scheduling Driven By Actual Media Insight",
    template: "%s | Anton Logic",
  },
  description:
    "Anton Logic brings your business data and systems together: scheduling, earnings, maintenance and growth insights in a single modern platform.",
  keywords: [
    "Anton Logic",
    "SaaS",
    "scheduling",
    "media insight",
    "business data",
    "analytics dashboard",
  ],
  authors: [{ name: "Anton Logic" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://antonlogic.com",
    siteName: "Anton Logic",
    title: "Anton Logic — Scheduling Driven By Actual Media Insight",
    description:
      "Bring your business data & systems together with Anton Logic's modern scheduling and analytics platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Anton Logic — Scheduling Driven By Actual Media Insight",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anton Logic — Scheduling Driven By Actual Media Insight",
    description:
      "Bring your business data & systems together with Anton Logic's modern scheduling and analytics platform.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
