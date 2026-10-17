import type { Metadata } from "next";
import { Suspense } from "react";
import { topics } from "@/topics";
import { Hledani, HledaniFallback } from "@/components/Hledani";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Hledat",
  description:
    "Hledej v celé hospodářské strategii PEER: 14 témat, opatření, slovník pojmů, časté otázky a plné znění kapitol. Stačí napsat slovo, třeba hypotéka nebo exekuce.",
  alternates: { canonical: "/hledat" },
};

/* /hledat: stránka je statická, výsledky počítá prohlížeč nad public/hledat.json
   (vyrábí ho scripts/build-search-index.mjs před buildem). useSearchParams potřebuje Suspense. */
export default function HledatPage() {
  const temata = Object.fromEntries(topics.map((t) => [t.slug, t.kratkyNazev]));
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <p className="eyebrow">Hledání na webu</p>
        <h1>Hledat</h1>
        <p className={`muted ${styles.lede}`}>Témata, opatření, slovník, otázky i plné znění strategie na jednom místě.</p>
      </section>
      <section className={`wrap ${styles.results}`} aria-label="Hledání">
        <Suspense fallback={<HledaniFallback />}>
          <Hledani temata={temata} />
        </Suspense>
      </section>
    </article>
  );
}
