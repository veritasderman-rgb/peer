import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import data from "@/data/otazky.json";
import { getTopic } from "@/topics";
import { PrintButton } from "./PrintButton";
import styles from "./argumentar.module.css";

export const metadata: Metadata = {
  title: "Argumentář pro kandidáty a mluvčí",
  description:
    "Jak odpovědět na nejčastější námitky proti hospodářské strategii PEER 2026–2035: jedna věta, čísla se zdrojem, nejsilnější protiargument a kam odkázat. K vytištění i ke stažení jako PDF.",
  alternates: { canonical: "/argumentar" },
};

type Otazka = {
  id: string;
  otazka: string;
  temata: string[];
  kratce: string;
  argument: string[];
  odkazy?: { href: string; text: string }[];
};
type Skupina = { id: string; nazev: string; otazky: Otazka[] };

const skupiny: Skupina[] = data.skupiny;
const pocet = skupiny.reduce((n, s) => n + s.otazky.length, 0);

/* Odstavec argumentu: štítek před první dvojtečkou (Odpověď, Čísla, Námitka, Kam odkázat) je tučně, odkazy na zdroje
   ve tvaru „(téma: id_faktu)“ jsou menším šedým písmem a v odstavci „Kam odkázat“ jsou cesty „/téma“ odkazy. */
const REF = /(\([a-z]+: [a-z0-9_, ]+\))/g;
const PATH = /(\/[a-z]+(?:-[a-z]+)*)(?=[\s,.)]|$)/g;

function inline(text: string, linkPaths: boolean): ReactNode[] {
  return text.split(REF).flatMap((part, i): ReactNode[] => {
    if (i % 2 === 1) {
      return [
        <span key={i} className={styles.ref}>
          {part}
        </span>,
      ];
    }
    if (!linkPaths) return [part];
    return part.split(PATH).map((s, j) =>
      j % 2 === 1 ? (
        <Link key={`${i}-${j}`} href={s} className={styles.path}>
          {s}
        </Link>
      ) : (
        s
      ),
    );
  });
}

function Odstavec({ text }: { text: string }) {
  const m = /^([^:]{2,32}): ([\s\S]*)$/.exec(text);
  const kam = m?.[1] === "Kam odkázat";
  return (
    <p className={styles.para}>
      {m && <b className={styles.label}>{m[1]}: </b>}
      {inline(m ? m[2] : text, kam)}
    </p>
  );
}

/* Odkazy z dat otázky, které v textu „Kam odkázat“ ještě nejsou (témata a související stránky). */
function dalsiOdkazy(q: Otazka) {
  const text = q.argument.join(" ");
  const out: { href: string; text: string }[] = [];
  for (const slug of q.temata) {
    const t = getTopic(slug);
    if (t && !text.includes(`/${slug}`)) out.push({ href: `/${slug}`, text: t.kratkyNazev });
  }
  for (const o of q.odkazy ?? []) {
    if (!text.includes(o.href)) out.push(o);
  }
  return out;
}

/* /argumentar: tahák pro kandidáty a mluvčí. Obsah (kratce + argument) je u každé otázky v data/otazky.json,
   stejná data jako na /otazky. Stránka je zároveň předlohou pro PDF (npm run argumentar:pdf). */
export default function ArgumentarPage() {
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <p className="eyebrow">Pro kandidáty a mluvčí</p>
        <h1>Argumentář</h1>
        <div className={`prose ${styles.lede}`}>
          <p>
            Tahák pro všechny, kdo na ulici, v debatě nebo na sítích odpovídají na námitky proti hospodářské strategii PEER
            2026–2035. {pocet} nejčastějších otázek, u každé jedna věta k řečení, čísla se zdrojem, nejsilnější protiargument
            a odkaz, kam lidi poslat.
          </p>
          <ol className={styles.rules}>
            <li>
              <b>Začni tučnou větou.</b> Je napsaná tak, aby se dala říct nahlas. Zbytek použij, když se tě protivník
              nebo posluchač ptá dál.
            </li>
            <li>
              <b>Číslo vždy se zdrojem.</b> V závorce je téma a označení údaje v datech webu; na stránce tématu najdeš
              k číslu zdroj ze studie. Nepoužívej čísla, která tu nejsou.
            </li>
            <li>
              <b>Slabá místa přiznej.</b> Studie některé věci nevyčísluje nebo si odporuje. U každé otázky je řečeno kde
              (web uvádí jedno číslo, studie jiné). Upřímné „to studie neříká“ je lepší než vymyšlené číslo.
            </li>
          </ol>
          <p className="muted">
            Čísla jsou převzatá ze studie, ne autory kapitol potvrzená. Veřejná verze bez tahů pro mluvčí je na{" "}
            <Link href="/otazky">stránce Otázky a námitky</Link>.
          </p>
        </div>
        <div className={styles.actions}>
          <a className="btn sun" href="/argumentar.pdf" download>
            Stáhnout PDF
          </a>
          <PrintButton className="btn secondary" />
        </div>
      </section>

      <nav className={`wrap ${styles.toc}`} aria-labelledby="obsah-argumentare">
        <h2 id="obsah-argumentare" className={styles.tocH}>
          Obsah
        </h2>
        <ol className={styles.tocList}>
          {skupiny.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className={styles.tocGroup}>
                {s.nazev}
              </a>
              <ul className={styles.tocQs}>
                {s.otazky.map((q) => (
                  <li key={q.id}>
                    <a href={`#arg-${q.id}`}>{q.otazka}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </nav>

      {skupiny.map((s) => (
        <section key={s.id} className={`wrap ${styles.group}`} aria-labelledby={s.id}>
          <h2 id={s.id} className={styles.groupH}>
            {s.nazev}
          </h2>
          <ul className={styles.list}>
            {s.otazky.map((q) => {
              const dalsi = dalsiOdkazy(q);
              return (
                <li key={q.id} id={`arg-${q.id}`} className={`card ${styles.q}`}>
                  <h3 className={styles.qH}>{q.otazka}</h3>
                  <p className={styles.kratce}>{q.kratce}</p>
                  <div className={styles.body}>
                    {q.argument.map((p, i) => (
                      <Odstavec key={i} text={p} />
                    ))}
                  </div>
                  {dalsi.length > 0 && (
                    <p className={styles.more}>
                      <b>Na webu:</b>{" "}
                      {dalsi.map((o, i) => (
                        <span key={o.href}>
                          {i > 0 && ", "}
                          <Link href={o.href}>{o.text}</Link>
                        </span>
                      ))}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <p className={`wrap muted ${styles.foot}`}>
        Zdroj: Hospodářská strategie 2026–2035, Pirátská expertní ekonomická rada (PEER). Odkazy ve tvaru /téma patří na web
        Česko má na víc!
      </p>
    </article>
  );
}
