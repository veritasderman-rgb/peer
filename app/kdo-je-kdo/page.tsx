import type { Metadata } from "next";
import Link from "next/link";
import { Garant } from "@/components/Garant";
import { GarantBubble } from "@/components/GarantBubble";
import { JsonLd } from "@/components/JsonLd";
import { TymFoto } from "@/components/TymFoto";
import { Socialni } from "@/components/Socialni";
import tym from "@/data/tym.json";
import { garantPodleJmena } from "@/lib/garanti";
import { abs } from "@/lib/site";
import { clenove, odkazyClena, tymPoznamka } from "@/lib/tym";
import { topics } from "@/topics";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Kdo je kdo: garanti strategie",
  description:
    "Osm ekonomů a odborníků PEER, kteří ručí za kapitoly hospodářské strategie 2026–2035: krátké medailonky, jejich témata, ověřené odkazy a zdroje.",
  alternates: { canonical: "/kdo-je-kdo" },
};

const URL_RE = /(https?:\/\/[^\s;,)]+)/g;

/* „Zdroj: …“ z data/tym.json: adresy v textu se změní na odkazy, popis v závorkách zůstane. */
function Zdroj({ text }: { text: string }) {
  return (
    <>
      {text.split(URL_RE).map((cast, i) => {
        if (i % 2 === 0) return cast;
        const kratce = cast.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
        const label = kratce.length > 32 ? `${kratce.slice(0, 32)}…` : kratce;
        return (
          <a key={i} href={cast} target="_blank" rel="noreferrer">
            {label}
          </a>
        );
      })}
    </>
  );
}

/* Strukturovaná data: seznam osob s funkcí v PEER a ověřenými odkazy (stejné, jaké jsou vidět na stránce). */
const seznam = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Garanti hospodářské strategie PEER 2026–2035",
  inLanguage: "cs",
  url: abs("/kdo-je-kdo"),
  numberOfItems: clenove.length,
  itemListElement: clenove.map((c, i) => {
    const sameAs = odkazyClena(c).map((o) => o.url);
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Person",
        name: c.jmeno,
        jobTitle: c.role,
        ...(sameAs.length ? { sameAs } : {}),
      },
    };
  }),
};

export default function KdoJeKdoPage() {
  return (
    <article className={styles.page}>
      <JsonLd data={seznam} />

      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">PEER</p>
          <h1>Kdo za strategií stojí</h1>
          <p className={styles.lede}>
            PEER je osm ekonomů a odborníků. Každý z nich ručí za určité kapitoly strategie, a proto je každé video
            i každá stránka tohoto webu podepsaná jménem garanta.
          </p>
        </div>
        <GarantBubble kdo="rada" mood="happy" side="left">
          Za každou kapitolou stojí jeden z nás, takže vždycky vidíš, kdo za čísly ručí.
        </GarantBubble>
      </section>

      <section className={`wrap ${styles.section}`} aria-label="Fotka rady">
        <TymFoto priority />
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="garanti">
        <h2 id="garanti">Osm garantů</h2>
        <ul className={styles.team}>
          {clenove.map((c) => {
            const id = garantPodleJmena(c.jmeno);
            const temata = topics.filter((t) => c.temata.includes(t.slug));
            return (
              <li key={c.jmeno} className={`card ${styles.clen}`}>
                <div className={styles.head}>
                  {id && (
                    <div className={styles.avatar}>
                      <Garant kdo={id} size={72} />
                    </div>
                  )}
                  <div className={styles.who}>
                    <h3 className={`display ${styles.name}`}>{c.jmeno}</h3>
                    <p className={`muted ${styles.role}`}>{c.role}</p>
                  </div>
                </div>
                <p className={styles.bio}>{c.medailonek}</p>
                {temata.length > 0 && (
                  <p className={styles.temata}>
                    {temata.map((t) => (
                      <Link key={t.slug} href={`/${t.slug}`}>
                        {t.kratkyNazev}
                      </Link>
                    ))}
                  </p>
                )}
                <Socialni jmeno={c.jmeno} compact />
                <p className={`src ${styles.zdroj}`}>
                  <b>Zdroj:</b> <Zdroj text={c.medailonekZdroj} />
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="podpisy">
        <h2 id="podpisy">Proč jsou kapitoly podepsané</h2>
        <div className={`prose ${styles.text}`}>
          <p>
            Videa a stránky s jednotlivými tématy uvádí vždy garant příslušné kapitoly: jménem, rolí a monogramem.
            Díky tomu je vidět, kdo za čísly a návrhy ručí, a nemluví za ně anonymní maskot ani kreslená postava.
          </p>
          <p>
            {tym.podpisyPoznamka} Jak web vznikl, popisujeme na stránce{" "}
            <Link href="/jak-vznikl">Jak vznikl tento web</Link>.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`} aria-labelledby="rada">
        <h2 id="rada">Rada</h2>
        <div className={`prose ${styles.text}`}>
          <p>
            Pirátská expertní ekonomická rada (PEER) je tým ekonomů, podnikatelů a dalších odborníků, který zpracoval
            Hospodářskou strategii 2026–2035. Víc o radě je na{" "}
            <a href="https://peer.pirati.cz/" target="_blank" rel="noreferrer">peer.pirati.cz</a> a celou strategii
            najdeš v{" "}
            <a href="https://majak.pirati.cz/documents/647/Piratska_Hospodarska_strategie.pdf" target="_blank" rel="noreferrer">
              PDF na webu Pirátů
            </a>.
          </p>
          <p className="src">
            <b>Zdroj:</b> {tymPoznamka}
          </p>
        </div>
        <p className={styles.actions}>
          <Link className="btn" href="/jak-vznikl">Jak vznikl tento web</Link>
          <Link className="btn secondary" href="/videa">Videa</Link>
        </p>
      </section>
    </article>
  );
}
