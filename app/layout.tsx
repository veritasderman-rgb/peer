import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: { default: "Česko má na víc!", template: "%s · Česko má na víc!" },
  description: "Hospodářská strategie Pirátské expertní ekonomické rady (PEER) vysvětlená pro běžné lidi. S bobrem, kalkulačkami a plným zněním.",
};

/* Písma podle styleguide.pirati.cz: Bebas Neue (nadpisy), Roboto (text), Roboto Condensed (popisky, čísla).
   Načítají se z Google Fonts přes <link>; CSS proměnné --font-* definuje globals.css. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&family=Roboto+Condensed:wght@400;700&display=swap"
        />
      </head>
      <body>
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
