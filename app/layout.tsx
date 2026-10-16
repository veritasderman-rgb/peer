import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { JsonLd } from "@/components/JsonLd";
import { webJsonLd } from "@/lib/seo";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

/* metadataBase dělá z relativních cest absolutní URL (OG obrázky, canonical). Adresa viz lib/site.ts. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s · ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: { type: "website", siteName: SITE_NAME, locale: "cs_CZ" },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
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
        <JsonLd data={webJsonLd()} />
        <a className="skip" href="#obsah">Přeskočit na obsah</a>
        <SiteNav />
        <main id="obsah" tabIndex={-1}>{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
