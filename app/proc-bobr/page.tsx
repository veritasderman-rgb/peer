import type { Metadata } from "next";
import Link from "next/link";
import { Bobr } from "@/components/Bobr";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Proč bobr",
  description: "Proč je maskotem webu bobr, jak se chová a jak se bude jmenovat.",
  alternates: { canonical: "/proc-bobr" },
};

const reasons = [
  {
    n: "1",
    title: "Stavitel",
    text: "Bobr staví hráze a hrady z toho, co má kolem sebe. Strategie je hlavně o stavění: 50 000 bytů ročně, čtvrti u zastávek, školky, sítě.",
  },
  {
    n: "2",
    title: "Hospodář",
    text: "Bobr zadržuje vodu v krajině a šetří s ní. Strategie chce využít, co leží ladem: 200 000 prázdných bytů, 4 000 miliard na účtech, 20 GW zablokované kapacity sítě.",
  },
  {
    n: "3",
    title: "Vrátil se",
    text: "V Česku byl bobr skoro vyhuben, dnes žije na většině řek. Česko má taky na víc, než ukazuje. Stačí přestat si šlapat po potenciálu.",
  },
];

const rules = [
  {
    title: "Ptá se za tebe",
    text: "Klade naivní otázky, které by si člověk sám nedovolil.",
  },
  {
    title: "Ukazuje, nekáže",
    text: "Přepočítá číslo, ukáže graf, shrne jednou větou.",
  },
  {
    title: "Přizná, co stojí",
    text: "Každé opatření má i druhou stranu účtu.",
  },
  {
    title: "Je všude stejný",
    text: "Web, video, sítě, leták.",
  },
];

const moods = [
  { mood: "neutral", name: "Vysvětluje", when: "Když přijde na řadu výklad." },
  { mood: "surprised", name: "Žasne", when: "U šokujícího čísla." },
  { mood: "thinking", name: "Přemýšlí", when: "Nad otázkou." },
  { mood: "happy", name: "Raduje se", when: "U řešení." },
  { mood: "sleepy", name: "Odpočívá", when: "Když je potřeba pauza." },
] as const;

export default function ProcBobr() {
  return (
    <>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">Maskot webu</p>
          <h1>Proč zrovna bobr?</h1>
          <p className={`prose muted ${styles.lead}`}>
            Na webu tě provází bobr. Tady je, proč zrovna on, jak se chová a co s jeho jménem.
          </p>
        </div>
        <div className={styles.heroBobr}>
          <Bobr mood="happy" size={260} />
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="tri-duvody">
        <h2 id="tri-duvody">Tři důvody</h2>
        <div className={styles.grid3}>
          {reasons.map((r) => (
            <article key={r.n} className={`card ${styles.reason}`}>
              <span className={`display ${styles.reasonNum}`} aria-hidden="true">{r.n}</span>
              <h3>{r.title}</h3>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="klobouk">
        <div className={styles.split}>
          <div className={styles.splitText}>
            <h2 id="klobouk">Klobouk</h2>
            <p className={`prose ${styles.body}`}>
              Bobr nosí třírohý pirátský klobouk. Je to značka Pirátů, kteří strategii zadali a stojí za ní.
            </p>
            <p className={`prose ${styles.body}`}>
              Klobouk mu jde sundat, když má vysvětlovat jen čísla.
            </p>
          </div>
          <div className={styles.splitBobr}>
            <Bobr mood="neutral" pointing size={220} />
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="chovani">
        <h2 id="chovani">Jak se chová</h2>
        <div className={styles.grid4}>
          {rules.map((r) => (
            <article key={r.title} className={`card ${styles.rule}`}>
              <h3>{r.title}</h3>
              <p className="muted">{r.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="nalady">
        <h2 id="nalady">Nálady</h2>
        <div className={styles.grid5}>
          {moods.map((m) => (
            <figure key={m.mood} className={`card ${styles.mood}`}>
              <Bobr mood={m.mood} size={120} />
              <figcaption>
                <h3>{m.name}</h3>
                <p className="muted">{m.when}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="jmeno">
        <div className={`card ${styles.name}`}>
          <h2 id="jmeno">Jak se jmenuje?</h2>
          <p className={`prose ${styles.body}`}>
            Zatím nemá jméno. Jméno vyberou lidé v anketě, až web poběží.
          </p>
          <p>
            <a className="btn sun" href="https://peer.pirati.cz/" target="_blank" rel="noopener noreferrer">
              Napiš nám tip na jméno
            </a>
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`}>
        <Link className="btn" href="/bydleni">
          Podívej se, jak bobr vysvětluje bydlení
        </Link>
      </section>
    </>
  );
}
