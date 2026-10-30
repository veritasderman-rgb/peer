import type { Metadata } from "next";
import Link from "next/link";
import dopad from "@/data/dopad.json";
import media from "@/data/media.json";
import { topics } from "@/topics";
import { clenove } from "@/lib/tym";
import { GARANT_IDS, jmenoMluvciho } from "@/lib/garanti";
import { abs } from "@/lib/site";
import { Socialni } from "@/components/Socialni";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pro média",
  description:
    "Podklady pro novináře: strategie na jednu stranu, 14 čísel se zdroji, citace garantů, kontakt na tiskovou mluvčí, loga a obrázky ke stažení a jak citovat.",
  alternates: { canonical: "/pro-media" },
};

const PDF = "https://majak.pirati.cz/documents/647/Piratska_Hospodarska_strategie.pdf";
const STUDIE_WEB = "https://peer.pirati.cz/hospodarska-strategie/";

const nf = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 });
const cislo = (v: number, decimals = 0) =>
  new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(v);

/* Souhrn na jednu stranu. Stejné věty skládá i app/pro-media/souhrn.txt/route.ts (držet shodné). */
function souhrnVety(): string[] {
  const d = dopad.souhrn;
  const jmena = clenove.map((c) => c.jmeno).join(", ");
  return [
    `Hospodářská strategie 2026–2035 je dokument Pirátské expertní ekonomické rady (PEER), který rada zpracovala ve spolupráci s Institutem π a dalšími odborníky a představila 2. 9. 2026.`,
    `Cílem je zrychlit růst ekonomiky o ${d.rustNavicPb} procentní bod ročně oproti dnešnímu stavu; autoři uvádějí, že navrhované kroky ho zvýší minimálně o tolik.`,
    `Za deset let to podle strategie znamená na konci dekády o ${nf.format(d.hdpNavicMldRocneKonecDekady)} mld. Kč (bilion) vyšší roční HDP, o ${nf.format(d.mzdyNavicMld)} mld. Kč více na mzdách a odměnách (v superhrubé hodnotě), přes ${nf.format(d.rozpocetNavicMld)} mld. Kč ročně navíc do státního rozpočtu a v průměru ${nf.format(d.naPracujicihoKc)} Kč ročně navíc na ekonomicky aktivního člověka.`,
    `Strategie má ${topics.length} témat ve čtyřech pilířích: lidský potenciál, férový trh a dostupný kapitál, moderní energetika a průmysl, stát jako motor, ne brzda.`,
    `Rada má osm členů (${jmena}); každé téma má svého garanta.`,
    `Jde o odhad autorů vůči situaci, kdy stát nedělá nic nebo jen velmi málo: studie sama píše, že vývoj HDP nelze přesně modelovat, a druhotné dopady (například vyšší investice firem) nevyčísluje.`,
    `Plné znění je v PDF (${PDF}) a na ${STUDIE_WEB}.`,
  ];
}

/* Odkazy v textu zdroje změníme na <a>. */
function Zdroj({ text }: { text: string }) {
  const casti = text.split(/(https?:\/\/[^\s)]+)/g);
  return (
    <>
      {casti.map((c, i) =>
        /^https?:\/\//.test(c) ? (
          <a key={i} href={c} target="_blank" rel="noreferrer">
            {c.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
          </a>
        ) : (
          <span key={i}>{c}</span>
        ),
      )}
    </>
  );
}

const telHref = (t: string) => `tel:${t.replace(/[^+\d]/g, "")}`;

export default function ProMediaPage() {
  const vety = souhrnVety();
  const kontakt = media.kontakty[0];
  const dalsiKontakty = media.kontakty.slice(1);

  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <p className="eyebrow">Pro novináře a redaktory</p>
        <h1>Pro média</h1>
        <p className={styles.lede}>
          Všechno, co potřebuješ k textu o strategii: souhrn na jednu stranu, čísla se zdroji, citace, kontakt, loga a obrázky.
          Nic z toho není nové tvrzení, vše pochází ze studie a z oficiálních výstupů PEER a Pirátů.
        </p>
        <p className={styles.jump}>
          <a href="#strana">Na jednu stranu</a> · <a href="#cisla">14 čísel</a> · <a href="#citace">Citace</a> ·{" "}
          <a href="#peer">Kdo je PEER</a> · <a href="#stazeni">Ke stažení</a> · <a href="#kontakt">Kontakt</a> ·{" "}
          <a href="#citovat">Jak citovat</a>
        </p>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="strana-h" id="strana">
        <h2 id="strana-h">Na jednu stranu</h2>
        <div className={`card ${styles.strana}`}>
          {vety.map((v, i) => (
            <p key={i}>{v}</p>
          ))}
          <p className="src">
            <b>Zdroj:</b> kapitola Závěr a dopad, <a href={PDF} target="_blank" rel="noreferrer">studie (PDF)</a>; přehled po
            tématech na stránce <Link href="/dopad">Velký obraz</Link>. Text ke zkopírování:{" "}
            <a href="/pro-media/souhrn.txt">souhrn.txt</a>.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="cisla-h" id="cisla">
        <h2 id="cisla-h">14 čísel</h2>
        <p className="prose muted">Jedno číslo za téma, tak jak je ukazuje úvod tématu na webu, i s tím, odkud pochází.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Téma</th>
                <th>Číslo</th>
                <th>Co to je</th>
                <th>Zdroj</th>
                <th>Odkaz</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((t) => (
                <tr key={t.slug}>
                  <td className={styles.tema}>
                    <span className={`display ${styles.cisloTema}`}>{t.cislo}</span> {t.kratkyNazev}
                  </td>
                  <td className={`num ${styles.hodnota}`}>
                    {cislo(t.hook.value, t.hook.decimals ?? 0)} <span className={styles.jednotka}>{t.hook.unit}</span>
                  </td>
                  <td>{t.hook.label}</td>
                  <td className="muted">{t.hook.source}</td>
                  <td>
                    <Link href={`/${t.slug}`}>/{t.slug}</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="citace-h" id="citace">
        <h2 id="citace-h">Citace garantů</h2>
        <p className="prose muted">Přesné znění z představení PEER 2. 9. 2026. Citace smíš použít se zdrojem.</p>
        <ul className={styles.citace}>
          {media.citace.map((c) => (
            <li key={c.jmeno} className="card">
              <blockquote>
                <p>„{c.text}“</p>
              </blockquote>
              <p className={styles.autor}>
                <b>{c.jmeno}</b>, <span className="muted">{c.role}</span>
              </p>
              <p className="src">
                <b>Zdroj:</b> <a href={c.url} target="_blank" rel="noreferrer">{c.zdroj}</a>
              </p>
              <Socialni jmeno={c.jmeno} compact />
            </li>
          ))}
        </ul>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="peer-h" id="peer">
        <h2 id="peer-h">Kdo je PEER</h2>
        <div className={`card ${styles.strana}`}>
          <p>{media.boilerplate}</p>
          <p className="src">
            <b>Zdroj:</b> <Zdroj text={media.boilerplateZdroj} />
          </p>
        </div>
        <ul className={styles.team}>
          {clenove.map((t) => (
            <li key={t.jmeno} className="card">
              <span className={`display ${styles.name}`}>{t.jmeno}</span>
              <span className={`muted ${styles.role}`}>{t.role}</span>
              <Socialni jmeno={t.jmeno} />
            </li>
          ))}
        </ul>
        <p className="src">
          <b>Zdroj:</b> <a href="https://peer.pirati.cz/" target="_blank" rel="noreferrer">peer.pirati.cz</a>. Odkazy na profily
          jsou jen ověřené; kdo žádný nemá, tu žádný nemá. <Link href="/jak-vznikl">Víc o tom, kdo je kdo a kdo postavil tento web</Link>.
        </p>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="stazeni-h" id="stazeni">
        <h2 id="stazeni-h">Ke stažení</h2>

        <div className={styles.dl}>
          <div className={`card ${styles.dlBox}`}>
            <h3>Studie</h3>
            <ul>
              <li>
                <a href={PDF} target="_blank" rel="noreferrer">Pirátská hospodářská strategie 2026–2035 (PDF)</a>
              </li>
              <li>
                <a href={STUDIE_WEB} target="_blank" rel="noreferrer">Strategie online na peer.pirati.cz</a>
              </li>
            </ul>
          </div>

          <div className={`card ${styles.dlBox}`}>
            <h3>Značky garantů</h3>
            <ul>
              <li><a href="/garanti/rada.svg" download>{jmenoMluvciho("rada")} (SVG)</a></li>
            </ul>
            <p className="muted">Značky jednotlivých garantů, monogram se jménem a rolí (SVG):</p>
            <ul>
              {GARANT_IDS.map((id) => (
                <li key={id}><a href={`/garanti/${id}.svg`} download>{jmenoMluvciho(id)}</a></li>
              ))}
            </ul>
            <p className="muted">Značky slouží jen k označení garanta u kapitol tohoto webu; nejsou to oficiální loga PEER ani Pirátů.</p>
          </div>

          <div className={`card ${styles.dlBox}`}>
            <h3>Videa</h3>
            <ul>
              <li>
                <Link href="/videa">Strategie za minutu: {topics.length} videí, 16:9 i 9:16, s titulky</Link>
              </li>
            </ul>
          </div>

          <div className={`card ${styles.dlBox}`}>
            <h3>Sdílecí obrázky (1200 × 630)</h3>
            <ul>
              <li><a href="/opengraph-image">Výchozí obrázek webu</a></li>
              {topics.map((t) => (
                <li key={t.slug}>
                  <a href={`/${t.slug}/opengraph-image`}>
                    {t.cislo}. {t.kratkyNazev}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <h3 className={styles.podnadpis}>Oficiální loga a značka Pirátů</h3>
        <ul className={styles.loga}>
          {media.loga.filter((l) => !l.url.startsWith("/garanti/")).map((l) => (
            <li key={l.url} className="card">
              <a href={l.url} target="_blank" rel="noreferrer" className={styles.logoNazev}>{l.nazev}</a>
              <span className={`muted ${styles.logoPozn}`}>{l.poznamka}</span>
              <span className="src"><b>Zdroj:</b> <Zdroj text={l.zdroj} /></span>
            </li>
          ))}
        </ul>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="kontakt-h" id="kontakt">
        <h2 id="kontakt-h">Kontakt pro média</h2>
        <div className={`card ${styles.kontakt}`}>
          <p className={styles.kontaktRole}>{kontakt.role}</p>
          <p className={`display ${styles.kontaktJmeno}`}>{kontakt.jmeno}</p>
          <p className={styles.kontaktSpoj}>
            <a href={`mailto:${kontakt.email}`}>{kontakt.email}</a>
            {kontakt.telefon && (
              <>
                {" · "}
                <a href={telHref(kontakt.telefon)}>{kontakt.telefon}</a>
              </>
            )}
          </p>
          <p className="src">
            <b>Ověřeno:</b> <Zdroj text={kontakt.zdroj} />
          </p>
        </div>

        <ul className={styles.dalsi}>
          {dalsiKontakty.map((k) => (
            <li key={k.email} className="card">
              <span className={styles.kontaktRole}>{k.role}</span>
              {k.jmeno && <b>{k.jmeno}</b>}
              <span>
                <a href={`mailto:${k.email}`}>{k.email}</a>
                {k.telefon && (
                  <>
                    {" · "}
                    <a href={telHref(k.telefon)}>{k.telefon}</a>
                  </>
                )}
              </span>
              <span className="src"><b>Ověřeno:</b> <Zdroj text={k.zdroj} /></span>
            </li>
          ))}
        </ul>

        <h3 className={styles.podnadpis}>Oficiální účty České pirátské strany</h3>
        <ul className={styles.ucty}>
          {media.ucty.map((u) => (
            <li key={u.url}>
              <a className="btn secondary" href={u.url} target="_blank" rel="noreferrer me">{u.sit}</a>
            </li>
          ))}
        </ul>
        <p className="src">
          <b>Ověřeno:</b> <a href="https://www.pirati.cz/kontakt/" target="_blank" rel="noreferrer">pirati.cz/kontakt</a>;{" "}
          {media.poznamka}
        </p>

        <div className={`card ${styles.nenalezeno}`}>
          <h3>Co není zveřejněno</h3>
          <ul>
            {media.nenalezeno.map((n, i) => (
              <li key={i}><Zdroj text={n} /></li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`} aria-labelledby="citovat-h" id="citovat">
        <h2 id="citovat-h">Jak citovat</h2>
        <div className={`card ${styles.citovat}`}>
          <p className={styles.citovatText}>Hospodářská strategie 2026–2035, Pirátská expertní ekonomická rada, 2026.</p>
          <p>
            Plné znění: <a href={PDF} target="_blank" rel="noreferrer">{PDF.replace("https://", "")}</a>
          </p>
          <p>
            Vysvětlení pro lidi, s čísly a zdroji: <a href={abs("/")}>{abs("/")}</a>
          </p>
          <p className="src">
            Číslo cituj ze studie, ne z tohoto webu: u každého čísla je uvedena kapitola a strana. Tento web je převyprávění,
            vznikl s pomocí AI a za správnost strategie ručí její autoři.
          </p>
        </div>
      </section>
    </article>
  );
}
