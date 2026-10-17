import type { Metadata } from "next";
import { Bebas_Neue, Roboto, Roboto_Condensed } from "next/font/google";
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
   next/font je při buildu stáhne a servíruje z vlastní domény (žádný požadavek na Google, žádné blokující CSS);
   display: swap ukáže text hned v záložním písmu. latin-ext kvůli české diakritice. CSS proměnné --font-* se
   odvozují od tříd na <html> a používá je globals.css. */
const bebas = Bebas_Neue({ subsets: ["latin", "latin-ext"], weight: "400", display: "swap", variable: "--font-bebas" });
const roboto = Roboto({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-roboto",
});
const robotoCondensed = Roboto_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-roboto-condensed",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${bebas.variable} ${roboto.variable} ${robotoCondensed.variable}`}>
      <body>
        <JsonLd data={webJsonLd()} />
        <a className="skip" href="#obsah">Přeskočit na obsah</a>
        <SiteNav />
        <main id="obsah" tabIndex={-1}>{children}</main>
        <SiteFooter />
        {/* skript analytiky existuje jen na Vercelu; mimo něj (lokálně, CI) by vracel 404 */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
