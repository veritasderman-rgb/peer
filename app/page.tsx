import type { Metadata } from "next";
import Link from "next/link";
import { Garant } from "@/components/Garant";
import { GarantBubble } from "@/components/GarantBubble";
import { garantTematu } from "@/lib/garanti";
import { TopicVideo } from "@/components/TopicVideo";
import { uvodVideo } from "@/topics";
import { getTopic } from "@/topics";
import { Situace } from "@/components/Situace";
import { buildSituaceView } from "@/lib/situace-view";
import styles from "./page.module.css";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const impacts = [
  { value: "+1 p. b.", label: "růstu ročně" },
  { value: "1 bilion Kč", label: "vyšší výkon ekonomiky ročně na konci dekády" },
  { value: "68 000 Kč", label: "ročně navíc na pracujícího" },
];

const topicList = [
  { n: 1, slug: "bydleni", title: "Bydlení tam, kde jsou příležitosti", hook: "15 ročních platů na byt" },
  { n: 2, slug: "vzdelanost", title: "Vzdělanost", hook: "4 % dětí do 3 let ve školce" },
  { n: 3, slug: "prace", title: "Práce a mzdy", hook: "Minimální mzda 43 % průměru" },
  { n: 4, slug: "zeny", title: "Ženy na trhu práce", hook: "Mzdový rozdíl 18,5 %" },
  { n: 5, slug: "exekuce", title: "Exekuce", hook: "590 000 lidí" },
  { n: 6, slug: "zdravi", title: "Zdraví a péče", hook: "700 mld. Kč ročně" },
  { n: 7, slug: "oligarchie", title: "Oligarchie a férové dotace", hook: "20–30 mld. Kč dotací ročně" },
  { n: 8, slug: "euro", title: "Euro", hook: "1,24 mil. Kč na hypotéce" },
  { n: 9, slug: "kapital", title: "Spící kapitál", hook: "4 000 mld. Kč na účtech" },
  { n: 10, slug: "prumysl", title: "Od montovny k vlastnímu produktu", hook: "340 mld. Kč dividend" },
  { n: 11, slug: "energie", title: "Energie", hook: "262 mld. Kč za dovoz paliv" },
  { n: 12, slug: "inovace", title: "Inovace", hook: "131 startupů na milion obyvatel" },
  { n: 13, slug: "regiony", title: "Úspěšné regiony", hook: "2 % příjmů obcí z místní ekonomiky" },
  { n: 14, slug: "stat", title: "Stát jako lídr", hook: "18 % státních služeb digitálně" },
];
/* Karta je aktivní, jakmile téma existuje v registru. */
const topics = topicList.map((t) => ({ ...t, href: getTopic(t.slug) ? `/${t.slug}` : undefined }));

const depths = [
  { time: "10 vteřin", text: "Jedna věta a jedno číslo. Hned víš, o co jde." },
  { time: "2 minuty", text: "Krátký výklad s garantem kapitoly, grafem a přepočtem na tvůj život." },
  { time: "20 minut", text: "Plné znění strategie se zdroji. Pro ty, kdo chtějí vidět každé číslo." },
];

export default function Home() {
  return (
    <>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">Hospodářská strategie 2026–2035 · PEER</p>
          <h1>Česko má na víc!</h1>
          <p className={styles.lead}>
            Vyrábíme jako elita, jsme 7. nejsložitější ekonomika světa. Bohatneme ale jen průměrně.
            Pirátská expertní ekonomická rada napsala plán, jak zrychlit růst o 1 procentní bod ročně.
            Tenhle web ho vysvětluje bez ekonomické hantýrky.
          </p>
          <div className={styles.actions}>
            <Link className="btn" href="/pribeh">Přečti si příběh</Link>
            <Link className="btn secondary" href="/bydleni">Začni bydlením</Link>
            <Link className="btn secondary" href="/kdo-je-kdo">Kdo je kdo</Link>
          </div>
        </div>
        <div className={styles.heroBobr}>
          <GarantBubble kdo="rada" mood="neutral" pointing>
            Jsme PEER, osm lidí, kteří strategii napsali. Začni bydlením: na byt dnes potřebuješ 15 ročních platů.
          </GarantBubble>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="uvodni-video">
        <p className="eyebrow">Za minutu</p>
        <h2 id="uvodni-video">Celá strategie v jednom videu</h2>
        <p className={`prose ${styles.depthIntro}`}>
          Co je špatně, proč, co navrhujeme a co to přinese. Namluvené, s titulky. Každé ze 14 témat má pak vlastní minutu.
        </p>
        <TopicVideo {...uvodVideo} />
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="situace">
        <p className="eyebrow">Nevíš, kde začít?</p>
        <h2 id="situace">Vyber, co se tě týká</h2>
        <p className={`prose ${styles.depthIntro}`}>
          Strategie má čtrnáct kapitol. Tebe se ale netýkají všechny stejně. Řekni, v jaké jsi situaci, a vybereme
          ti, co z ní pro tebe plyne.
        </p>
        <Situace data={buildSituaceView()} />
      </section>

      <section className={styles.band} aria-labelledby="prinos">
        <div className="wrap">
          <h2 id="prinos" className={styles.bandTitle}>Co to přinese</h2>
          <ul className={styles.impacts}>
            {impacts.map((i) => (
              <li key={i.value} className={styles.impact}>
                <span className={`display ${styles.impactValue}`}>{i.value}</span>
                <span className={styles.impactLabel}>{i.label}</span>
              </li>
            ))}
          </ul>
          <p className={`src ${styles.bandSrc}`}>
            Zdroj: Hospodářská strategie PEER, souhrnný dopad (s. 88); peer.pirati.cz.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="temata">
        <h2 id="temata">Témata</h2>
        <ol className={styles.topics}>
          {topics.map((t) => {
            const inner = (
              <>
                <span className={`num ${styles.topicNum}`}>{t.n}</span>
                <div className={styles.topicBody}>
                  <h3>{t.title}</h3>
                  <p className={`num ${styles.hook}`}>{t.hook}</p>
                  {t.href ? null : <p className={styles.soon}>připravujeme</p>}
                </div>
                {t.href ? <Garant kdo={garantTematu(t.slug)} mood="happy" size={64} /> : null}
              </>
            );
            return (
              <li key={t.n} className={styles.topicItem}>
                {t.href ? (
                  <Link href={t.href} className={`card ${styles.topic} ${styles.active}`}>
                    {inner}
                  </Link>
                ) : (
                  <div className={`card ${styles.topic} ${styles.disabled}`}>{inner}</div>
                )}
              </li>
            );
          })}
        </ol>
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`} aria-labelledby="hloubky">
        <h2 id="hloubky">Tři hloubky</h2>
        <p className={`prose ${styles.depthIntro}`}>
          Každé téma si přečteš ve třech hloubkách. Zastavíš se, kdy chceš.
        </p>
        <ol className={styles.depths}>
          {depths.map((d) => (
            <li key={d.time} className={`card ${styles.depth}`}>
              <span className={`display ${styles.depthTime}`}>{d.time}</span>
              <p>{d.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
