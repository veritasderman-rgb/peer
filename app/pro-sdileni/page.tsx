import type { Metadata } from "next";
import Link from "next/link";
import { topics } from "@/topics";
import { abs } from "@/lib/site";
import sdileni from "@/data/sdileni.json";
import { GarantBubble } from "@/components/GarantBubble";
import { KopirovatText } from "@/components/KopirovatText";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Balíček pro sítě",
  description:
    "Hotové příspěvky pro Facebook, X, Instagram a LinkedIn ke všem 14 tématům strategie, s hashtagy a odkazy na reel, široké video a náhledový obrázek. Ke zkopírování a sdílení.",
  alternates: { canonical: "/pro-sdileni" },
  /* podklad pro členy a novináře: odkaz je na /podklady, do vyhledávačů ne */
  robots: { index: false, follow: true },
};

type Balicek = { facebook: string; x: string; instagram: string; linkedin: string; hashtagy: string[] };
const data = sdileni as Record<string, Balicek>;

/* X počítá každý odkaz jako 23 znaků a celkem povoluje 280 znaků. */
const X_LIMIT = 280;
const X_URL = 23;
const xDelka = (text: string, url: string) => Array.from(text.replaceAll(url, "x".repeat(X_URL))).length;

const radky = (text: string) => Math.min(14, Math.max(4, Math.ceil(text.length / 44) + (text.match(/\n/g)?.length ?? 0)));

const PRAVIDLA = [
  <>
    <b>Cituj zdroj.</b> Každý příspěvek vede na stránku tématu, kde jsou zdroje a plné znění studie. Odkaz z textu neodstraňuj.
  </>,
  <>
    <b>Neměň čísla.</b> Text si klidně přeformuluj do vlastního stylu, ale čísla, jednotky a roky nech přesně tak, jak jsou.
  </>,
  <>
    <b>Připoj video nebo obrázek.</b> Reel (9:16) je pro Instagram, TikTok a Shorts, široké video (16:9) pro Facebook, YouTube a LinkedIn. Náhled se hodí k odkazu.
  </>,
  <>
    <b>Označ oficiální účty strany.</b> Ať se příspěvek dostane i k týmu. Konkrétní jména účtů tu neuvádíme; použij oficiální účty strany.
  </>,
  <>
    <b>Piš, že je to návrh.</b> Strategie PEER je návrh, ne hotový zákon. Používej „navrhuje“, „chce“, ne „zavede“.
  </>,
];

function Blok({ sit, nazev, text, url, ariaLabel }: { sit: string; nazev: string; text: string; url: string; ariaLabel: string }) {
  const hotovy = text.replaceAll("{{URL}}", url);
  const jeX = sit === "x";
  const delka = jeX ? xDelka(hotovy, url) : 0;
  return (
    <div className={styles.blok}>
      <div className={styles.blokHead}>
        <h4>{nazev}</h4>
        {jeX && (
          <span className={`num ${styles.pocitadlo} ${delka > X_LIMIT ? styles.moc : ""}`} title="Odkaz se na X počítá jako 23 znaků">
            {delka} / {X_LIMIT}
          </span>
        )}
        <KopirovatText text={hotovy} className={styles.kopie} ariaLabel={ariaLabel} />
      </div>
      <textarea className={styles.pole} readOnly value={hotovy} rows={radky(hotovy)} aria-label={`Text pro ${nazev}`} />
    </div>
  );
}

/* Balíček pro tým a dobrovolníky: hotové texty pro sítě ke každému tématu (data/sdileni.json) + odkazy na média. */
export default function ProSdileniPage() {
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">Pro tým a dobrovolníky</p>
          <h1>Balíček pro sítě</h1>
          <p className={styles.lede}>
            Ke každému z {topics.length} témat tu najdeš hotové příspěvky pro Facebook, X, Instagram a LinkedIn, hashtagy a odkazy na
            video i náhledový obrázek. Rozbal téma, zkopíruj text, přilož video a odešli.
          </p>
          <p className={styles.akce}>
            <a className="btn sun" href="/pro-sdileni/balicek.json" download="balicek.json">
              Stáhnout vše (JSON)
            </a>
            <Link className={styles.odkaz} href="/videa">
              Všechna videa na jednom místě
            </Link>
          </p>
        </div>
        <GarantBubble kdo="rada" mood="happy" pointing side="left">
          Texty jsou hotové k vložení. Stačí zkopírovat, přidat video a poslat dál. Čísla neměň, jsou ze studie.
        </GarantBubble>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="pravidla">
        <div className={`card ${styles.pravidla}`}>
          <h2 id="pravidla">Pravidla</h2>
          <ul>
            {PRAVIDLA.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`wrap ${styles.section} ${styles.last}`} aria-labelledby="temata">
        <h2 id="temata">Po tématech</h2>
        <ol className={styles.temata}>
          {topics.map((t) => {
            const d = data[t.slug];
            if (!d) return null;
            const url = abs(`/${t.slug}`);
            const v = t.video;
            const nahledReel = v?.poster?.replace(/-poster\.jpg$/, "-poster-reel.jpg");
            return (
              <li key={t.slug} className={`card ${styles.tema}`} id={t.slug}>
                <details className={styles.detail}>
                  <summary className={styles.temaHead}>
                    <span className={`display ${styles.num}`}>{t.cislo}</span>
                    <span className={styles.temaTitul}>
                      <span className={styles.temaNazev}>{t.kratkyNazev}</span>
                      <span className={`muted ${styles.podtitul}`}>{t.hook.h1}</span>
                    </span>
                  </summary>
                  <div className={styles.obsah}>
                    <p className={styles.odkazy}>
                      <Link className="btn" href={`/${t.slug}`}>
                        Stránka tématu
                      </Link>
                      {v && (
                        <>
                          <a className="btn secondary" href={v.reel} download>
                            Reel 9:16 (MP4)
                          </a>
                          <a className="btn secondary" href={v.wide} download>
                            Široké 16:9 (MP4)
                          </a>
                          {v.poster && (
                            <a className="btn secondary" href={v.poster} download>
                              Náhled JPG
                            </a>
                          )}
                          {nahledReel && (
                            <a className="btn secondary" href={nahledReel} download>
                              Náhled reelu JPG
                            </a>
                          )}
                          {v.titulky && (
                            <a className="btn secondary" href={v.titulky} download>
                              Titulky VTT
                            </a>
                          )}
                        </>
                      )}
                    </p>
                    <p className={`muted ${styles.url}`}>
                      Odkaz v textech: <span className="num">{url}</span>
                    </p>

                    <div className={styles.bloky}>
                      <Blok sit="facebook" nazev="Facebook" text={d.facebook} url={url} ariaLabel={`Kopírovat text pro Facebook: ${t.kratkyNazev}`} />
                      <Blok sit="x" nazev="X" text={d.x} url={url} ariaLabel={`Kopírovat text pro X: ${t.kratkyNazev}`} />
                      <Blok sit="instagram" nazev="Instagram" text={d.instagram} url={url} ariaLabel={`Kopírovat text pro Instagram: ${t.kratkyNazev}`} />
                      <Blok sit="linkedin" nazev="LinkedIn" text={d.linkedin} url={url} ariaLabel={`Kopírovat text pro LinkedIn: ${t.kratkyNazev}`} />
                    </div>

                    <div className={styles.tagy}>
                      <h4>Hashtagy</h4>
                      <p className={`num ${styles.tagyText}`}>{d.hashtagy.join(" ")}</p>
                      <KopirovatText
                        text={d.hashtagy.join(" ")}
                        label="Kopírovat hashtagy"
                        className={styles.kopie}
                        ariaLabel={`Kopírovat hashtagy: ${t.kratkyNazev}`}
                      />
                    </div>
                  </div>
                </details>
              </li>
            );
          })}
        </ol>
      </section>
    </article>
  );
}
