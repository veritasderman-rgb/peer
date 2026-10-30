import Link from "next/link";
import z from "@/data/zaplaceni.json";
import { getTopic } from "@/topics";
import styles from "./page.module.css";

type Tema = (typeof z.temata)[number];

const KDO: Record<string, string> = { stát: "Stát", obce: "Obce", firmy: "Firmy", lidé: "Lidé", investoři: "Investoři" };

function Blok({ nadpis, items, prazdne }: { nadpis: string; items: string[]; prazdne: string }) {
  return (
    <div className={styles.blok}>
      <h4>{nadpis}</h4>
      {items.length ? (
        <ul>
          {items.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      ) : (
        <p className="muted">{prazdne}</p>
      )}
    </div>
  );
}

function TemaKarta({ t }: { t: Tema }) {
  const topic = getTopic(t.slug);
  if (!topic) return null;
  const pocty = [
    [t.zaplati.length, "kdo zaplatí"],
    [t.prinese.length, "co přinese"],
    [t.neutralni.length, "neutrální"],
    [t.nevycisleno.length, "nevyčísleno"],
  ] as const;
  return (
    <li className={`card ${styles.tema}`} id={t.slug}>
      {/* každé téma je sbalené: nadpis a počty, detail na kliknutí, aby stránka nebyla nekonečná */}
      <details className={styles.detail}>
        <summary className={styles.temaHead}>
          <span className={`display ${styles.num}`}>{topic.cislo}</span>
          <span className={styles.temaTitul}>
            <span className={styles.temaNazev}>{topic.nazev}</span>
            <span className={`muted ${styles.pocty}`}>
              {pocty.map(([n, l]) => `${n} ${l}`).join(" · ")}
            </span>
          </span>
        </summary>
      <div className={styles.bloky}>
        <div className={styles.blok}>
          <h4>Kdo zaplatí</h4>
          {t.zaplati.length ? (
            <ul>
              {t.zaplati.map((p, i) => (
                <li key={i}>
                  <span className={styles.kdo}>{KDO[p.kdo] ?? p.kdo}</span> {p.co}
                  {p.kolik && <span className={`num ${styles.kolik}`}>{p.kolik}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Studie u tohoto tématu žádné náklady neuvádí.</p>
          )}
        </div>
        <div className={styles.blok}>
          <h4>Co to přinese</h4>
          {t.prinese.length ? (
            <ul>
              {t.prinese.map((p, i) => (
                <li key={i}>
                  {p.co}
                  {p.kolik && <span className={`num ${styles.kolik} ${styles.kolikPlus}`}>{p.kolik}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <p className="muted">Přínos studie nevyčísluje.</p>
          )}
        </div>
        <Blok nadpis="Neutrální nebo bez uvedeného nákladu" items={t.neutralni} prazdne="Nic z toho studie neoznačuje za neutrální." />
        <Blok nadpis="Studie nevyčísluje" items={t.nevycisleno} prazdne="Vše podstatné má číslo." />
      </div>
      <p className={styles.odkaz}>
        <Link href={`/${t.slug}`}>{topic.kratkyNazev}: celé téma</Link> · <Link href={`/${t.slug}#stoji`}>A co to stojí</Link> ·{" "}
        <span className="muted">kapitola {t.zdroj}</span>
      </p>
      </details>
    </li>
  );
}

/* Kdo zaplatí a co z toho bude (data/zaplaceni.json) jako sekce stránky Velký obraz (/dopad). Dřív samostatná
   stránka /zaplaceni, ta teď přesměrovává sem (next.config.ts). Tři čísla na konci dekády jsou na /dopad výš. */
export function ZaplaceniSekce() {
  return (
    <>
      <section className={`wrap ${styles.section}`} aria-labelledby="zaplaceni">
        <h2 id="zaplaceni">Jak se to zaplatí</h2>
        <div className={`prose ${styles.lede}`}>
          {z.uvod.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <h3>Z čeho se to platí</h3>
        <ol className={styles.principy}>
          {z.principy.map((p) => (
            <li key={p.nadpis} className={`card ${styles.princip}`}>
              <h4>{p.nadpis}</h4>
              <p>{p.text}</p>
              <p className="src">
                <b>Zdroj:</b> {p.zdroj}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`} aria-labelledby="zaplaceni-temata">
        <h2 id="zaplaceni-temata">Kdo zaplatí, po tématech</h2>
        <p className="prose muted">
          U každého tématu čtyři sloupce: kdo zaplatí, co to přinese, co studie označuje za neutrální (nebo u čeho žádný
          náklad neuvádí) a co přiznaně nespočítala. Čísla jsou tak, jak je studie uvádí; nic jsme nedopočítávali. Tam, kde
          plátce ze studie jen logicky plyne, je to řečeno podmíněně.
        </p>
        <ol className={styles.temata}>
          {z.temata.map((t) => (
            <TemaKarta key={t.slug} t={t} />
          ))}
        </ol>
      </section>
    </>
  );
}
