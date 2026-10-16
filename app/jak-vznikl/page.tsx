import type { Metadata } from "next";
import Link from "next/link";
import { Bobr } from "@/components/Bobr";
import { BobrBubble } from "@/components/BobrBubble";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Jak vznikl tento web",
  description: "Strategii napsal tým ekonomů PEER. Web k ní postavila, napsala a nakreslila umělá inteligence. Kolik to ušetřilo a proč to děláme takhle.",
};

/* Členové PEER podle peer.pirati.cz (stav k říjnu 2026). */
const tym = [
  { jmeno: "Libor Dušek", role: "ekonom a akademik, dostupné bydlení a moderní infrastruktura" },
  { jmeno: "Jiří Hlavenka", role: "podnikatel a investor, digitální stát, AI a efektivní instituce" },
  { jmeno: "Tereza Nislerová", role: "ekonomka, evropská integrace a euro" },
  { jmeno: "Zuzana Freitas Lopesová", role: "mobilizace trhu práce a rovné šance" },
  { jmeno: "Jan Kříž", role: "vzdělávání pro budoucnost a silné regiony" },
  { jmeno: "Václav Vislous", role: "moderní průmysl a bezpečná energetika" },
  { jmeno: "Milan Damborský", role: "spravedlivý trh, chytré daně a udržitelné finance" },
  { jmeno: "Josef Pavlovic", role: "zdravý národ a udržitelné důchody" },
];

/* Odhad ceny pilotní stránky u české agentury. Je to odhad bez zdroje, založený na běžných sazbách
   (grafik a animátor 800–1 500 Kč/h, vývojář 1 200–2 000 Kč/h). Rozpětí je schválně široké. */
const odhad = [
  { polozka: "Maskot: návrh, 5 nálad, varianta s klacíkem, animace", lidi: "ilustrátor a animátor, 5–8 dní", cena: "60–120 tis. Kč" },
  { polozka: "Web: návrh, kódování, grafy, 2 kalkulačky, scrollytelling, tmavý režim, mobil", lidi: "designér a vývojář, 15–25 dní", cena: "180–350 tis. Kč" },
  { polozka: "Texty: převyprávění kapitoly, persona, slovník, popisky", lidi: "copywriter, 3–5 dní", cena: "30–60 tis. Kč" },
  { polozka: "Řízení, korektury, nasazení", lidi: "projektový manažer", cena: "30–50 tis. Kč" },
];

export default function JakVzniklPage() {
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">O webu</p>
          <h1>Strategii napsali lidé. Web postavila AI.</h1>
          <p className={styles.lede}>
            Na původním dokumentu pracoval celý tým ekonomů a odborníků. Tenhle web k němu napsala, nakreslila,
            naprogramovala a animovala umělá inteligence. Jeden člověk ji řídil a kontroloval.
          </p>
        </div>
        <BobrBubble mood="thinking" side="left">
          Já jsem taky z AI. Nakreslila mě za pár hodin, včetně klobouku.
        </BobrBubble>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="tym">
        <h2 id="tym">Kdo napsal strategii</h2>
        <p className="prose muted">
          Hospodářskou strategii 2026–2035 zpracovala Pirátská expertní ekonomická rada (PEER) ve spolupráci s Institutem π
          a dalšími odborníky. Členové rady a jejich témata:
        </p>
        <ul className={styles.team}>
          {tym.map((t) => (
            <li key={t.jmeno} className="card">
              <span className={`display ${styles.name}`}>{t.jmeno}</span>
              <span className={`muted ${styles.role}`}>{t.role}</span>
            </li>
          ))}
        </ul>
        <p className="src">
          <b>Zdroj:</b> <a href="https://peer.pirati.cz/" target="_blank" rel="noreferrer">peer.pirati.cz</a>, představení rady 2. 9. 2026.
        </p>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="ai">
        <h2 id="ai">Kdo postavil web</h2>
        <div className={styles.twoCol}>
          <div className="prose">
            <p>
              Celý web vznikl za jeden den s pomocí AI (Claude). Jeden člověk zadal, co má web dělat, vybral bobra a klobouk a
              kontroloval výsledek. AI přečetla 99 stran studie, vytěžila z ní čísla a zdroje, napsala lidskou verzi textu,
              nakreslila a rozpohybovala bobra, naprogramovala grafy a kalkulačky a web otestovala na mobilu i na počítači.
            </p>
            <p>
              Různé části dělaly různě silné modely: jednodušší vytěžování dat levnější, kreslení a skládání stránky ty nejsilnější.
              Přesně tak, jak strategie píše o práci obecně: nejlepší nástroj na každou práci, ne nejdražší na všechno.
            </p>
            <p>
              Co AI neumí: ručit za čísla. Každé číslo na webu má pod sebou zdroj ze studie a plné znění kapitoly je o jedno
              kliknutí dál. Za správnost strategie ručí její autoři, ne web.
            </p>
          </div>
          <div className={styles.bobrCol}>
            <Bobr mood="happy" pointing size={220} />
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="usetreno">
        <h2 id="usetreno">Kolik by to stálo postaru</h2>
        <p className="prose muted">
          Odhad, co by pilotní stránka o bydlení stála u běžné české agentury. Je to náš odhad podle obvyklých hodinových
          sazeb, žádná nabídka jsme nepoptávali.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Co</th>
                <th>Kdo a jak dlouho</th>
                <th>Odhad</th>
              </tr>
            </thead>
            <tbody>
              {odhad.map((o) => (
                <tr key={o.polozka}>
                  <td>{o.polozka}</td>
                  <td className="muted">{o.lidi}</td>
                  <td className="num">{o.cena}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Pilotní stránka celkem</td>
                <td className="muted">4–6 týdnů práce</td>
                <td className={`num ${styles.total}`}>300–580 tis. Kč</td>
              </tr>
              <tr>
                <td>Celý web se 13 tématy a videi</td>
                <td className="muted">půl roku práce týmu</td>
                <td className={`num ${styles.total}`}>2–4 mil. Kč</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className={`card ${styles.sunBox}`}>
          <p className={`display ${styles.sunBig}`}>Pilot: 1 den a 1 člověk místo 6 týdnů a 4 lidí</p>
          <p>
            Stál zhruba cenu jednodenního předplatného AI a jeden pracovní den. Ušetřené peníze nejsou cíl. Cíl je, aby se
            s nápady dalo pracovat rychle a levně. Strategie říká, že Česko musí přestat vydělávat levnou prací a začít
            vydělávat chytrou. Tenhle web je malý důkaz, že to jde.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.section}`}>
        <p>
          <Link className="btn" href="/bydleni">Podívej se na výsledek: Bydlení</Link>{" "}
          <Link className="btn secondary" href="/proc-bobr">Proč bobr</Link>
        </p>
      </section>
    </article>
  );
}
