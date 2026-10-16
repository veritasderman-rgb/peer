import type { Metadata } from "next";
import Link from "next/link";
import data from "@/data/bydleni.json";
import { plneZneni, zdroje, slovnik } from "@/content/bydleni-plne-zneni";
import { Bobr } from "@/components/Bobr";
import { BobrBubble } from "@/components/BobrBubble";
import { BigNumber } from "@/components/BigNumber";
import { BarChart } from "@/components/BarChart";
import { Donut } from "@/components/Donut";
import { IndexChart } from "@/components/IndexChart";
import { KalkulackaByt } from "@/components/KalkulackaByt";
import { KalkulackaObec } from "@/components/KalkulackaObec";
import { Story, type StoryStep } from "@/components/Story";
import { Spirala } from "@/components/Spirala";
import { OpatreniGrid } from "@/components/Opatreni";
import { PlneZneni } from "@/components/PlneZneni";
import { Slovnik } from "@/components/Slovnik";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Bydlení tam, kde jsou příležitosti",
  description: "Na byt potřebuješ 15 ročních platů, nejvíc v EU. Proč to tak je a co s tím navrhuje Hospodářská strategie PEER. S bobrem, grafy a kalkulačkou.",
};

/* „Co to znamená pro tebe“: lidský překlad každého z devíti opatření.
   Čísla jsou ze studie (kapitola 1.1), formulace jsou redakční. */
const proTebe: Record<number, string> = {
  1: "Tvoje obec dostane za každý nový byt 210 000 až 560 000 Kč na školy, silnice a sítě. Výstavba pro ni přestane být zátěž.",
  2: "Když se staví v zóně, rozhodnutí přijde do 6 měsíců. Když úřad mlčí, platí souhlas.",
  3: "Víc bytů tam, kam dojdeš pěšky na vlak, tramvaj nebo metro. Méně dojíždění autem z polí za městem.",
  4: "Dvakrát víc obecních bytů. A pro nájemníky smlouva na dobu neurčitou s férovým nájmem, protože stát za ně ručí majiteli.",
  5: "Byt bez povinného parkovacího místa u zastávky MHD vyjde levněji o 700 000 až 1 000 000 Kč.",
  6: "Investiční byt přestane být daňově výhodnější než práce. Kdo prodá byt, ve kterém nebydlel, zdaní zisk.",
  7: "Kdo nechá byt nebo pozemek roky ladem, zaplatí vyšší daň. Kdo v bytě bydlí nebo ho dlouhodobě pronajímá, platí jako dnes.",
  8: "Daň podle hodnoty pozemku, ne podle toho, co jsi na něm postavil. Dnes platí majitel levného bytu v poměru k ceně až pětkrát víc než majitel drahého.",
  9: "Předem bude jasné, co se kde smí stavět. Spory se vyřeší jednou při plánu, ne znovu u každé stavby.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Smlouva na rok",
    text: <>Petra je zdravotní sestra v Brně. Se synem bydlí v nájmu. Smlouvu má na jeden rok, stejně jako <b>70 % nájemníků</b> v Česku. Každý podzim neví, co bude v létě.</>,
    bobr: "Rok je krátká doba, když máš dítě ve školce.",
  },
  {
    mood: "thinking",
    title: "45 let spoření",
    text: <>Na vlastní byt by potřebovala <b>15 ročních platů</b>. Kdyby odkládala třetinu každé výplaty, šetřila by <b>45 let</b>. Průměr v EU je 8 až 10 platů.</>,
    bobr: "To není chyba Petry. To je nejhorší poměr v celé EU.",
  },
  {
    mood: "surprised",
    title: "Prázdné byty, pomalé stavby",
    text: <>Přitom v Česku stojí <b>200 000 prázdných bytů</b> v bytových domech. A Praha staví <b>2,7× méně</b> bytů na obyvatele než Varšava.</>,
    bobr: "Byty jsou. Jen se nestaví a nepouštějí na trh.",
  },
  {
    mood: "neutral",
    title: "Proč obec řekne ne",
    text: <>Když obec povolí nové byty, dostane jen nové náklady: školu, silnici, kanalizaci. Z daní nových obyvatel jí skoro nic nepřiteče. Tak raději <b>nepovolí</b>.</>,
    bobr: "Dnes se obci vyplatí stavbu brzdit. To chce otočit.",
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Petru změní",
    text: <>Obec dostane za každý byt peníze na infrastrukturu, povolení přijde do <b>6 měsíců</b> a byty porostou u zastávek. Cíl: byt pod <b>10 ročních platů</b> a nájem do <b>30 % mzdy</b>. Petře stát zaručí majiteli nájem, a ona dostane smlouvu <b>na dobu neurčitou</b>.</>,
    bobr: "Devět opatření. Ukážu ti je jedno po druhém.",
  },
];

const retezec = data.priciny
  .filter((p) => p.typ === "řetězec")
  .map((p) => ({ nazev: p.pricina, popis: p.popis }));

const opatreni = data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" }));

export default function BydleniPage() {
  const g = data.grafy;
  return (
    <article className={styles.page}>
      {/* HLOUBKA 1: 10 vteřin */}
      <section className={`wrap ${styles.hero}`} id="hook">
        <div className={styles.heroText}>
          <p className="eyebrow">Téma 1 · Pilíř Lidský potenciál · 10 vteřin</p>
          <h1 className={styles.h1}>Kolik ročních platů stojí byt?</h1>
          <BigNumber value={15.1} decimals={1} unit="ročních platů" label="Česko, nový průměrný byt, 2025" />
          <p className={styles.lede}>
            Nejvíc v celé Evropské unii. Průměr je 8 až 10. V Belgii necelých 5.
          </p>
          <p className="src"><b>Zdroj:</b> Deloitte Property Index 2025, studie s. 8.</p>
          <nav className={styles.depthNav} aria-label="Hloubka čtení">
            <a href="#pribeh">2 minuty: příběh a návrh</a>
            <a href="#plne-zneni">20 minut: plné znění</a>
          </nav>
        </div>
        <div className={styles.heroBobr}>
          <BobrBubble mood="surprised" side="left">
            Patnáct. Tolik let bys musel dát celou výplatu jen na byt. Pojď, ukážu ti, proč to tak je.
          </BobrBubble>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="srovnani">
        <h2 id="srovnani">Jak jsme na tom proti sousedům</h2>
        <div className={styles.twoCol}>
          <BarChart
            title={g.rocniPlatyNaByt.titulek}
            unit="platů"
            items={g.rocniPlatyNaByt.polozky.map((p) => ({ label: p.zeme, value: p.hodnota, note: "poznamka" in p ? p.poznamka : undefined, highlight: p.zeme === "Česko" }))}
            goal={{ value: g.rocniPlatyNaByt.cil, label: "Cíl strategie: pod 10" }}
            source="Deloitte Property Index 2025"
          />
          <IndexChart />
        </div>
      </section>

      {/* HLOUBKA 2: 2 minuty */}
      <section className={`wrap ${styles.section}`} id="pribeh" aria-labelledby="pribeh-h">
        <p className="eyebrow">2 minuty</p>
        <h2 id="pribeh-h">Petra a byt, na který se nedá našetřit</h2>
        <Story steps={steps} persona={{ who: "Petra, 31", ctx: "zdravotní sestra, Brno, syn 18 měsíců, bydlí v nájmu" }} />
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="proc">
        <h2 id="proc">Proč to tak je</h2>
        <p className="prose muted">
          Studie popisuje řetězec, který se sám roztáčí. Čtyři kroky, a pak znovu od začátku.
        </p>
        <Spirala kroky={retezec} />
        <div className={styles.causeGrid}>
          {data.priciny.filter((p) => p.typ !== "řetězec").map((p) => (
            <div key={p.poradi} className={`card ${styles.cause}`}>
              <h3>{p.pricina}</h3>
              <p className="muted">{p.popis}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="cisla">
        <h2 id="cisla">Tři čísla, která to vysvětlují</h2>
        <div className={styles.threeCol}>
          <BarChart
            title="Kolik bytů se staví na 1 000 obyvatel ročně"
            unit="bytů"
            items={g.intenzitaVystavby.polozky.map((p) => ({ label: p.mesto, value: p.hodnota, highlight: p.mesto === "Praha" }))}
            goal={{ value: g.intenzitaVystavby.cilPraha, label: "Praha potřebuje aspoň 6,5" }}
            source="Deloitte Property Index, ČSÚ, IPR Praha, Statistik Austria, GUS"
          />
          <Donut
            parts={[
              { label: "V bytových domech, většinou ve městech", value: g.neobydleneByty.vBytovychDomech, color: "sun" },
              { label: "Rodinné domy, chalupy a ostatní", value: g.neobydleneByty.ostatni, color: "muted" },
            ]}
            centerValue="860 000"
            centerLabel="neobydlených bytů v ČR"
          />
          <BarChart
            title="Kolik bytů vlastní město"
            unit="%"
            items={g.podilObecnichBytu.polozky.map((p) => ({ label: p.mesto, value: p.hodnota, note: "poznamka" in p ? p.poznamka : undefined, highlight: p.mesto === "Praha" }))}
            max={50}
            source="Wiener Wohnbaubericht 2024, IPR Praha"
          />
        </div>
        <p className="src">
          Vídeň díky silnému městskému fondu tlumí nájmy. Vídeňský průměrný nájem je v poměru k platům nižší než v Praze (studie s. 10).
        </p>
      </section>

      <section className={`wrap ${styles.section}`} id="navrh" aria-labelledby="navrh-h">
        <h2 id="navrh-h">Co navrhujeme</h2>
        <p className="prose muted">
          Devět provázaných opatření. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.
        </p>
        <OpatreniGrid polozky={opatreni} />
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="prinese">
        <div className={styles.twoCol}>
          <div>
            <h2 id="prinese">Co to přinese</h2>
            <ul className={styles.goals}>
              {data.cile.map((c) => (
                <li key={c.cil}>
                  <span className={`display ${styles.goalValue}`}>{typeof c.hodnota === "number" ? new Intl.NumberFormat("cs-CZ").format(c.hodnota) : c.hodnota}</span>
                  <span className={styles.goalUnit}>{c.jednotka}</span>
                  <span className="muted">{c.cil}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`card ${styles.cost}`}>
            <h3>A co to stojí</h3>
            <p>
              Víc zaplatí ti, kdo byty drží prázdné nebo je mají jako investici: vyšší daň z prázdných bytů a pozemků, konec
              daňového osvobození při prodeji investičního bytu a omezení uznatelných nákladů pronajímatelů.
            </p>
            <p>
              Stát zaplatí podíl obcím z DPH ze stavebních prací, dotace a úvěry na obecní byty a Garanční fond. Studie tyto
              náklady v kapitole o bydlení nevyčísluje, počítá s tím, že se vrátí ve vyšší mobilitě práce a nižších výdajích na
              dávky na bydlení.
            </p>
            <BobrBubble mood="thinking" size={120}>
              Každý návrh má dvě strany účtu. Tuhle druhou ti nezatajím.
            </BobrBubble>
          </div>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} id="spocitej" aria-labelledby="spocitej-h">
        <h2 id="spocitej-h">Spočítej si</h2>
        <div className={styles.twoCol}>
          <KalkulackaByt />
          <KalkulackaObec />
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="kdo">
        <h2 id="kdo">Kdo za tím stojí</h2>
        <div className={`card ${styles.garant}`}>
          <div className={styles.garantInitials} aria-hidden="true">LD</div>
          <div>
            <p className={`display ${styles.garantName}`}>{data.garant.jmeno}</p>
            <p className="muted">{data.garant.role}, člen Pirátské expertní ekonomické rady</p>
            <blockquote className={styles.quote}>
              „Zhoršující se dostupnost bydlení není jen sociální problém, ale má široké dopady na celou ekonomiku. Snižuje pracovní
              mobilitu a udržuje strukturální nezaměstnanost v chudších okresech.“
            </blockquote>
            <p className="src">
              <b>Zdroj:</b>{" "}
              <a href="https://www.pirati.cz/jak-pirati-pracuji/pirati-predstavuji-novou-expertni-ekonomickou-radu-peer-prichazi-s-hospodarskou-strategii-a-s-planem-jak-z-ceska-udelat-v-ekonomice-evropskeho-tygra/" target="_blank" rel="noreferrer">
                představení PEER, pirati.cz, 2. 9. 2026
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* HLOUBKA 3: 20 minut */}
      <section className={`wrap ${styles.section}`} id="plne-zneni" aria-labelledby="plne-h">
        <p className="eyebrow">20 minut</p>
        <h2 id="plne-h">Plné znění kapitoly 1.1</h2>
        <p className="prose muted">
          Celý text kapitoly tak, jak ho napsala Pirátská expertní ekonomická rada, s odkazy do rejstříku zdrojů. Grafy jsou výše na stránce.
        </p>
        <details className={styles.fullText}>
          <summary>Rozbalit plné znění (asi 20 minut čtení)</summary>
          <PlneZneni bloky={plneZneni} zdroje={zdroje} />
        </details>
        <p>
          <a className="btn secondary" href="https://majak.pirati.cz/documents/647/Piratska_Hospodarska_strategie.pdf" target="_blank" rel="noreferrer">
            Stáhnout celou strategii (PDF, 99 stran)
          </a>
        </p>
      </section>

      <section className={`wrap ${styles.section}`} id="slovnik" aria-labelledby="slovnik-h">
        <h2 id="slovnik-h">Slovník</h2>
        <p className="prose muted">Pojmy z kapitoly vysvětlené jednou větou.</p>
        <Slovnik polozky={slovnik} />
      </section>

      <section className={`wrap ${styles.section} ${styles.outro}`}>
        <Bobr mood="sleepy" size={140} />
        <div>
          <p className="display" style={{ fontSize: "var(--s2)" }}>Další témata připravujeme</p>
          <p className="muted">Exekuce, euro, školky, energie. Zatím se podívej, <Link href="/proc-bobr">proč to vysvětluje zrovna bobr</Link>.</p>
        </div>
      </section>
    </article>
  );
}
