import Link from "next/link";
import type { TopicConfig } from "@/lib/topics";
import { Garant } from "@/components/Garant";
import { GarantBubble } from "@/components/GarantBubble";
import { garantTematu } from "@/lib/garanti";
import { BigNumber } from "@/components/BigNumber";
import { Chart } from "@/components/Chart";
import { Story } from "@/components/Story";
import { Spirala } from "@/components/Spirala";
import { OpatreniGrid } from "@/components/Opatreni";
import { PlneZneni } from "@/components/PlneZneni";
import { Slovnik } from "@/components/Slovnik";
import { TopicVideo } from "@/components/TopicVideo";
import { Sdilet } from "@/components/Sdilet";
import { Socialni } from "@/components/Socialni";
import { NahlasitChybu } from "@/components/NahlasitChybu";
import styles from "./TopicPage.module.css";

const nf = new Intl.NumberFormat("cs-CZ");

/* Šablona tématu ve třech hloubkách: 10 vteřin (háček) → 2 minuty (příběh, proč, návrh, dopad,
   kalkulačky, garant) → 20 minut (plné znění se zdroji, slovník). */
export function TopicPage({ t }: { t: TopicConfig }) {
  /* Na stránce tématu mluví garant té kapitoly (podle data/tym.json). */
  const kdo = garantTematu(t.slug);
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`} id="hook">
        <div className={styles.heroText}>
          <nav className={styles.crumbs} aria-label="Kde jsi">
            <ol>
              <li><Link href="/">Úvod</Link></li>
              <li><Link href="/#temata">Témata</Link></li>
              <li aria-current="page">{t.kratkyNazev}</li>
            </ol>
          </nav>
          <p className="eyebrow">Téma {t.cislo} · Pilíř {t.pilir} · 10 vteřin</p>
          <h1 className={styles.h1}>{t.hook.h1}</h1>
          <BigNumber value={t.hook.value} decimals={t.hook.decimals} unit={t.hook.unit} label={t.hook.label} />
          <p className={styles.lede}>{t.hook.lede}</p>
          <p className="src"><b>Zdroj:</b> {t.hook.source}</p>
          <nav className={styles.depthNav} aria-label="Hloubka čtení">
            {t.video && <a href="#video">1 minuta: video</a>}
            <a href="#pribeh">2 minuty: příběh a návrh</a>
            <a href="#plne-zneni">20 minut: plné znění</a>
          </nav>
          <div className={styles.sdilet}>
            <Sdilet titulek={t.hook.h1} text={`${nf.format(t.hook.value)} ${t.hook.unit}: ${t.hook.label}`} />
          </div>
        </div>
        <div className={styles.heroBobr}>
          <GarantBubble kdo={kdo} mood={t.hook.bobrMood ?? "surprised"} side="left">{t.hook.bobr}</GarantBubble>
        </div>
      </section>

      {t.video && (
        <section className={`wrap ${styles.section}`} id="video" aria-labelledby="video-h">
          <p className="eyebrow">1 minuta</p>
          <h2 id="video-h">Strategie za minutu</h2>
          <TopicVideo
            wide={t.video.wide}
            reel={t.video.reel}
            poster={t.video.poster}
            titulek={t.video.titulek}
            popis={t.video.popis}
            titulky={t.video.titulky}
            prepis={t.video.prepis}
          />
        </section>
      )}

      {t.srovnani && (
        <section className={`wrap ${styles.section}`} aria-labelledby="srovnani">
          <h2 id="srovnani">{t.srovnani.nadpis}</h2>
          <div className={styles.twoCol}>
            {t.srovnani.grafy.map((g, i) => <Chart key={i} spec={g} />)}
          </div>
          {t.srovnani.poznamka && <p className="src">{t.srovnani.poznamka}</p>}
        </section>
      )}

      <section className={`wrap ${styles.section}`} id="pribeh" aria-labelledby="pribeh-h">
        <p className="eyebrow">2 minuty</p>
        <h2 id="pribeh-h">{t.pribehNadpis}</h2>
        <Story steps={t.steps} persona={t.persona} kdo={kdo} />
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="proc">
        <h2 id="proc">Proč to tak je</h2>
        <p className="prose muted">{t.proc.uvod}</p>
        <Spirala kroky={t.proc.retezec} loop={t.proc.loop} />
        {t.proc.dalsi.length > 0 && (
          <div className={styles.causeGrid}>
            {t.proc.dalsi.map((p) => (
              <div key={p.nazev} className={`card ${styles.cause}`}>
                <h3>{p.nazev}</h3>
                <p className="muted">{p.popis}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {t.cisla && (
        <section className={`wrap ${styles.section}`} aria-labelledby="cisla">
          <h2 id="cisla">{t.cisla.nadpis}</h2>
          <div className={styles.threeCol}>
            {t.cisla.grafy.map((g, i) => <Chart key={i} spec={g} />)}
          </div>
          {t.cisla.poznamka && <p className="src">{t.cisla.poznamka}</p>}
        </section>
      )}

      <section className={`wrap ${styles.section}`} id="navrh" aria-labelledby="navrh-h">
        <h2 id="navrh-h">Co navrhujeme</h2>
        <p className="prose muted">{t.opatreniUvod}</p>
        <OpatreniGrid polozky={t.opatreni} />
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="prinese">
        <div className={styles.twoCol}>
          <div>
            <h2 id="prinese">Co to přinese</h2>
            <ul className={styles.goals}>
              {t.cile.map((c) => (
                <li key={c.cil}>
                  <span className={`display ${styles.goalValue}`}>{typeof c.hodnota === "number" ? nf.format(c.hodnota) : c.hodnota}</span>
                  <span className={styles.goalUnit}>{c.jednotka}</span>
                  <span className="muted">{c.cil}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`card ${styles.cost}`} id="stoji">
            <h3>A co to stojí</h3>
            {t.stoji.odstavce.map((o, i) => <p key={i}>{o}</p>)}
            <GarantBubble kdo={kdo} mood="thinking" size={120}>{t.stoji.bobr}</GarantBubble>
          </div>
        </div>
      </section>

      {t.kalkulacky && t.kalkulacky.length > 0 && (
        <section className={`wrap ${styles.section}`} id="spocitej" aria-labelledby="spocitej-h">
          <h2 id="spocitej-h">Spočítej si</h2>
          <div className={styles.twoCol}>
            {t.kalkulacky.map((K, i) => <K key={i} />)}
          </div>
        </section>
      )}

      <section className={`wrap ${styles.section}`} aria-labelledby="kdo">
        <h2 id="kdo">Kdo za tím stojí</h2>
        <div className={`card ${styles.garant}`}>
          <div className={styles.garantInitials} aria-hidden="true">{t.garant.initials}</div>
          <div>
            <p className={`display ${styles.garantName}`}>{t.garant.jmeno}</p>
            <p className="muted">{t.garant.role}, člen Pirátské expertní ekonomické rady</p>
            <Socialni jmeno={t.garant.jmeno} />
            {t.garant.citace && <blockquote className={styles.quote}>„{t.garant.citace}“</blockquote>}
            {t.garant.citaceZdroj && (
              <p className="src">
                <b>Zdroj:</b>{" "}
                <a href={t.garant.citaceZdroj.url} target="_blank" rel="noreferrer">{t.garant.citaceZdroj.text}</a>
              </p>
            )}
          </div>
        </div>
        <NahlasitChybu kde={`${t.kratkyNazev} (/${t.slug})`} />
      </section>

      <section className={`wrap ${styles.section}`} id="plne-zneni" aria-labelledby="plne-h">
        <p className="eyebrow">20 minut</p>
        <h2 id="plne-h">{t.plneZneniNadpis}</h2>
        <p className="prose muted">
          Celý text tak, jak ho napsala Pirátská expertní ekonomická rada, s odkazy do rejstříku zdrojů. Grafy jsou výše na stránce.
        </p>
        <details className={styles.fullText}>
          <summary>Rozbalit plné znění (asi 20 minut čtení)</summary>
          <PlneZneni bloky={t.plneZneni} zdroje={t.zdroje} prefix={`k${t.slug}`} />
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
        <Slovnik polozky={t.slovnik} />
      </section>

      <section className={`wrap ${styles.section} ${styles.outro}`}>
        <Garant kdo={kdo} mood="sleepy" size={140} />
        <div>
          <p className="display" style={{ fontSize: "var(--s2)" }}>{t.dalsi ?? "Další témata"}</p>
          <p className="muted">
            Vyber si další téma na <Link href="/#temata">úvodní stránce</Link>, nebo se podívej, <Link href="/kdo-je-kdo">kdo je kdo</Link> mezi autory strategie.
          </p>
        </div>
      </section>
      <section className={`wrap ${styles.sdiletKonec}`}>
        <Sdilet titulek={t.hook.h1} text={`${nf.format(t.hook.value)} ${t.hook.unit}: ${t.hook.label}`} />
      </section>
    </article>
  );
}
