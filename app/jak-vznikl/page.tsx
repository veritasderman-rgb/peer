import type { Metadata } from "next";
import Link from "next/link";
import { Garant } from "@/components/Garant";
import { GarantBubble } from "@/components/GarantBubble";
import { Socialni } from "@/components/Socialni";
import { NahlasitChybu } from "@/components/NahlasitChybu";
import { clenove, tymPoznamka } from "@/lib/tym";
import { topics } from "@/topics";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Jak vznikl tento web",
  description: "Strategii napsal tým ekonomů PEER. Web k ní postavila, napsala a nakreslila umělá inteligence. Kolik to ušetřilo a proč to děláme takhle.",
  alternates: { canonical: "/jak-vznikl" },
};

/* Co AI udělala, v pořadí, jak to šlo. Čísla jsou skutečná (počty stránek, videí, kalkulaček z registru). */
const kroky = [
  { n: "01", nazev: "Přečetla studii", text: "99 stran, 14 kapitol, přes 200 odkazů na zdroje." },
  { n: "02", nazev: "Vytěžila čísla", text: "Každé číslo se zdrojem do strojově čitelných dat. Z nich čte text, grafy i videa." },
  { n: "03", nazev: "Napsala lidskou verzi", text: "Tři hloubky čtení, modelové postavy, slovník, řádek „pro tebe“ u každého opatření." },
  { n: "04", nazev: "Nakreslila garanty", text: "Osm avatarů podle fotek, pět nálad, ukazovátko a pirátský klobouk. Každý z garantů s použitím souhlasil." },
  { n: "05", nazev: "Naprogramovala web", text: "Grafy, kalkulačky, scrollytelling, tmavý režim, mobil. A otestovala ho." },
  { n: "06", nazev: "Natočila a namluvila videa", text: "Scénář z dat, render, syntetický hlas, hudba, titulky. Široké i na výšku." },
];

/* Odhad ceny pilotní stránky u české agentury. Je to odhad bez zdroje, založený na běžných sazbách
   (grafik a animátor 800–1 500 Kč/h, vývojář 1 200–2 000 Kč/h). Rozpětí je schválně široké. */
const odhad = [
  { polozka: "Avatary: 8 postav podle fotek, 5 nálad, animace", lidi: "ilustrátor a animátor, 5–8 dní", cena: "60–120 tis. Kč", max: 120 },
  { polozka: "Web: návrh, kódování, grafy, 2 kalkulačky, scrollytelling, tmavý režim, mobil", lidi: "designér a vývojář, 15–25 dní", cena: "180–350 tis. Kč", max: 350 },
  { polozka: "Texty: převyprávění kapitoly, persona, slovník, popisky", lidi: "copywriter, 3–5 dní", cena: "30–60 tis. Kč", max: 60 },
  { polozka: "Video za minutu: scénář, motion design, dvě verze (16:9 a 9:16), namluvení, hudba", lidi: "motion designér 3–5 dní, dabér a studio, zvukař", cena: "60–110 tis. Kč", max: 110 },
  { polozka: "Řízení, korektury, nasazení", lidi: "projektový manažer", cena: "30–50 tis. Kč", max: 50 },
];

const initials = (jmeno: string) =>
  jmeno
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

export default function JakVzniklPage() {
  const pocetKalkulacek = topics.reduce((n, t) => n + (t.kalkulacky?.length ?? 0), 0);
  const pocetVidei = topics.filter((t) => t.video).length * 2;
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">O webu</p>
          <h1>Strategii napsali lidé. Web postavila AI.</h1>
          <p className={styles.lede}>
            Na studii pracoval celý tým ekonomů a odborníků. Tenhle web k ní napsala, nakreslila, naprogramovala
            a namluvila umělá inteligence. Jeden člověk ji zadal, řídil a kontroloval.
          </p>
        </div>
        <GarantBubble kdo="rada" mood="thinking" side="left">
          I naše avatary jsou z AI. Nakreslila je podle fotek za pár hodin, včetně klobouků.
        </GarantBubble>
      </section>

      {/* dva sloupce: lidé vs. AI, v číslech */}
      <section className={`wrap ${styles.section}`} aria-label="Lidé a AI v číslech">
        <div className={styles.duo}>
          <div className={`card ${styles.duoCard}`}>
            <p className="eyebrow">Studie · lidé</p>
            <p className={`display ${styles.duoBig}`}>8 autorů</p>
            <ul className={styles.duoList}>
              <li><b>99</b> stran</li>
              <li><b>14</b> kapitol</li>
              <li><b>200+</b> odkazů na zdroje</li>
              <li><b>měsíce</b> práce expertní rady</li>
            </ul>
          </div>
          <div className={`card ${styles.duoCard} ${styles.duoAi}`}>
            <p className="eyebrow">Web · AI</p>
            <p className={`display ${styles.duoBig}`}>1 člověk, pár dní</p>
            <ul className={styles.duoList}>
              <li><b>{topics.length}</b> témat ve třech hloubkách</li>
              <li><b>{pocetVidei}</b> namluvených videí</li>
              <li><b>{pocetKalkulacek}</b> kalkulaček</li>
              <li><b>8</b> avatarů v pěti náladách</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="tym">
        <h2 id="tym">Kdo napsal strategii</h2>
        <p className="prose muted">
          Hospodářskou strategii 2026–2035 zpracovala Pirátská expertní ekonomická rada (PEER) ve spolupráci s Institutem π
          a dalšími odborníky. Členové rady a jejich témata:
        </p>
        <ul className={styles.team}>
          {clenove.map((c) => {
            const temata = topics.filter((t) => c.temata.includes(t.slug));
            return (
              <li key={c.jmeno} className={`card ${styles.clen}`}>
                <div className={styles.avatar} aria-hidden="true">{initials(c.jmeno)}</div>
                <div className={styles.clenBody}>
                  <p className={`display ${styles.name}`}>{c.jmeno}</p>
                  <p className={`muted ${styles.role}`}>{c.role}</p>
                  {temata.length > 0 && (
                    <p className={styles.temata}>
                      {temata.map((t) => (
                        <Link key={t.slug} href={`/${t.slug}`}>{t.kratkyNazev}</Link>
                      ))}
                    </p>
                  )}
                  <Socialni jmeno={c.jmeno} compact />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="src">
          <b>Zdroj:</b> <a href="https://peer.pirati.cz/" target="_blank" rel="noreferrer">peer.pirati.cz</a>, představení rady 2. 9. 2026. {tymPoznamka}
        </p>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="ai">
        <h2 id="ai">Co udělala AI</h2>
        <p className="prose muted">
          Web zadal a řídil <a href="https://josefpavlovic.cz" target="_blank" rel="noreferrer">Josef Pavlovic</a>, člen PEER.
          Různé části dělaly různě silné modely: jednodušší vytěžování dat ty levnější, kreslení a skládání stránek ty
          nejsilnější. Přesně tak, jak strategie píše o práci obecně: nejlepší nástroj na každou práci, ne nejdražší na všechno.
        </p>
        <ol className={styles.kroky}>
          {kroky.map((k) => (
            <li key={k.n} className={`card ${styles.krok}`}>
              <span className={`display ${styles.krokN}`}>{k.n}</span>
              <h3 className={styles.krokH}>{k.nazev}</h3>
              <p className={styles.krokP}>{k.text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.rucime}>
          <Garant kdo="rada" mood="neutral" size={140} />
          <div className={`card ${styles.rucimeBox}`}>
            <h3>Co AI neumí: ručit za čísla</h3>
            <p>
              Každé číslo na webu má pod sebou zdroj ze studie a plné znění kapitoly je o jedno kliknutí dál. Za správnost
              strategie ručí její autoři, ne web. Kde si studie odporuje nebo kde jsme museli něco dopočítat, je to napsané
              a garanti to kontrolují.
            </p>
            <NahlasitChybu kde="Jak vznikl web" kompaktni />
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="usetreno">
        <h2 id="usetreno">Kolik by to stálo postaru</h2>
        <p className="prose muted">
          Odhad, co by pilotní stránka o bydlení stála u běžné české agentury. Je to náš odhad podle obvyklých hodinových
          sazeb, žádná nabídka jsme nepoptávali.
        </p>
        <ol className={styles.odhad}>
          {odhad.map((o) => (
            <li key={o.polozka} className={styles.polozka}>
              <div className={styles.polozkaText}>
                <span>{o.polozka}</span>
                <span className={`muted ${styles.polozkaLidi}`}>{o.lidi}</span>
              </div>
              <div className={styles.bar} aria-hidden="true">
                <span className={styles.barFill} style={{ width: `${Math.round((o.max / 350) * 100)}%` }} />
              </div>
              <span className={`num ${styles.polozkaCena}`}>{o.cena}</span>
            </li>
          ))}
        </ol>
        <div className={styles.souhrn}>
          <div className={`card ${styles.souhrnCard}`}>
            <span className="eyebrow">Pilotní stránka</span>
            <span className={`display ${styles.souhrnBig}`}>360–690 tis. Kč</span>
            <span className="muted">5–7 týdnů práce pěti lidí</span>
          </div>
          <div className={`card ${styles.souhrnCard}`}>
            <span className="eyebrow">Celý web se 14 tématy a videi</span>
            <span className={`display ${styles.souhrnBig}`}>2–4 mil. Kč</span>
            <span className="muted">půl roku práce týmu</span>
          </div>
          <div className={`card ${styles.souhrnCard} ${styles.souhrnAi}`}>
            <span className="eyebrow">Tenhle web</span>
            <span className={`display ${styles.souhrnBig}`}>předplatné AI</span>
            <span>a pár dní jednoho člověka; hlas a hudba za kredity za pár stokorun</span>
          </div>
        </div>
        <div className={`card ${styles.sunBox}`}>
          <p className={`display ${styles.sunBig}`}>Ušetřené peníze nejsou cíl. Cíl je pracovat chytře.</p>
          <p>
            Strategie říká, že Česko musí přestat vydělávat levnou prací a začít vydělávat chytrou. Tenhle web je malý
            důkaz, že to jde: s nápady se dá pracovat rychle, levně a poctivě, s každým číslem na dosah zdroje.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`}>
        <p className={styles.actions}>
          <Link className="btn" href="/bydleni">Podívej se na výsledek: Bydlení</Link>
          <Link className="btn secondary" href="/kdo-je-kdo">Kdo je kdo</Link>
          <Link className="btn secondary" href="/videa">Videa</Link>
        </p>
      </section>
    </article>
  );
}
