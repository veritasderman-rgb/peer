import type { Metadata } from "next";
import Link from "next/link";
import data from "@/data/otazky.json";
import { getTopic } from "@/topics";
import { BobrBubble } from "@/components/BobrBubble";
import { JsonLd } from "@/components/JsonLd";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Časté otázky a námitky",
  description:
    "Kde na to vezmete? Nezadluží to stát? Je daň z prázdných bytů vyvlastnění? Nejčastější námitky proti hospodářské strategii PEER a odpovědi výhradně ze studie, s číslem, zdrojem a poctivým přiznáním, kde si studie odporuje nebo odpověď nemá.",
  alternates: { canonical: "/otazky" },
};

type Otazka = {
  id: string;
  otazka: string;
  odpoved: string[];
  temata: string[];
  zdroj: string;
  odkazy?: { href: string; text: string }[];
};
type Skupina = { id: string; nazev: string; otazky: Otazka[] };

const skupiny: Skupina[] = data.skupiny;
const pocet = skupiny.reduce((n, s) => n + s.otazky.length, 0);

/* Strukturovaná data pro vyhledávače a AI asistenty: stejné otázky a odpovědi, které jsou vidět na stránce,
   odstavce spojené do jednoho prostého textu. */
const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  name: "Časté otázky a námitky k hospodářské strategii PEER 2026–2035",
  inLanguage: "cs",
  mainEntity: skupiny.flatMap((s) =>
    s.otazky.map((q) => ({
      "@type": "Question",
      name: q.otazka,
      acceptedAnswer: { "@type": "Answer", text: q.odpoved.join(" ") },
    })),
  ),
};

/* /otazky: námitky a odpovědi z textu studie. Obsah je v data/otazky.json, každá odpověď má téma a zdroj. */
export default function OtazkyPage() {
  return (
    <article className={styles.page}>
      <JsonLd data={faq} />

      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">Argumenty · námitky</p>
          <h1>Časté otázky a námitky</h1>
          <div className={`prose ${styles.lede}`}>
            <p>
              {pocet} nejčastějších otázek a námitek, které lidé proti strategii vznášejí, a odpovědi, které dává samotná
              studie. Nic nad její rámec.
            </p>
            <p className="muted">
              U každé odpovědi je téma a zdroj. Kde si studie odporuje, něco nevyčísluje nebo na námitku odpověď nemá, je to
              u otázky řečeno.
            </p>
          </div>
        </div>
        <BobrBubble mood="thinking" side="left">
          Ptát se je v pořádku: odpovědi jsou jen z textu studie, i s tím, co studie neví.
        </BobrBubble>
      </section>

      <nav className={`wrap ${styles.chips}`} aria-label="Skupiny otázek">
        <ul className={styles.chipList}>
          {skupiny.map((s) => (
            <li key={s.id}>
              <a className={styles.chip} href={`#${s.id}`}>
                {s.nazev} <span className={styles.chipN}>{s.otazky.length}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {skupiny.map((s, si) => (
        <section
          key={s.id}
          className={`wrap ${styles.section} ${si === skupiny.length - 1 ? styles.last : ""}`}
          aria-labelledby={s.id}
        >
          <h2 id={s.id}>{s.nazev}</h2>
          <ul className={styles.list}>
            {s.otazky.map((q, qi) => (
              <li key={q.id} className="card" id={q.id}>
                <details className={styles.detail} open={qi === 0}>
                  <summary className={styles.summary}>
                    <h3 className={styles.q}>{q.otazka}</h3>
                  </summary>
                  <div className={styles.body}>
                    <div className={`prose ${styles.odpoved}`}>
                      {q.odpoved.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                    {(q.temata.length > 0 || (q.odkazy?.length ?? 0) > 0) && (
                      <p className={styles.links}>
                        {q.temata.length > 0 && (
                          <span>
                            <b>Téma:</b>{" "}
                            {q.temata.map((slug, i) => {
                              const t = getTopic(slug);
                              if (!t) return null;
                              return (
                                <span key={slug}>
                                  {i > 0 && ", "}
                                  <Link href={`/${slug}`}>{t.kratkyNazev}</Link>
                                </span>
                              );
                            })}
                          </span>
                        )}
                        {(q.odkazy?.length ?? 0) > 0 && (
                          <span>
                            <b>{q.temata.length > 0 ? "Související:" : "Více:"}</b>{" "}
                            {q.odkazy!.map((o, i) => (
                              <span key={o.href}>
                                {i > 0 && ", "}
                                <Link href={o.href}>{o.text}</Link>
                              </span>
                            ))}
                          </span>
                        )}
                      </p>
                    )}
                    <p className="src">
                      <b>Zdroj:</b> {q.zdroj}
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  );
}
