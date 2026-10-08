import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteProviders } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "FORIXA | AI Solutions, Websites & Full-Stack Development",
  description: "FORIXA builds modern websites, AI agents, chatbots, APIs, and full-stack applications for businesses and startups.",
  icons: { icon: "/images/favIcon.png" }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="en" dir="ltr"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css" />
  </head><body><SiteProviders>{children}</SiteProviders></body></html>;
}
