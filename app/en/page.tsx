import type { Metadata } from "next";
import Link from "next/link";
import { Garant } from "@/components/Garant";
import { GarantBubble } from "@/components/GarantBubble";
import en from "@/data/en.json";
import styles from "./page.module.css";

const PDF_URL = "https://majak.pirati.cz/documents/647/Piratska_Hospodarska_strategie.pdf";
const DESCRIPTION =
  "Czechia makes things like an elite but grows only like an average economy. The Pirate Expert Economic Council (PEER) has a plan for one percentage point more growth a year: CZK 1,000 billion more output a year by 2035. An English summary of the 14 topics.";

export const metadata: Metadata = {
  title: { absolute: "Czechia can do better – PEER Economic Strategy 2026–2035" },
  description: DESCRIPTION,
  alternates: { canonical: "/en", languages: { cs: "/", en: "/en" } },
  openGraph: {
    title: "Czechia can do better – PEER Economic Strategy 2026–2035",
    description: DESCRIPTION,
    url: "/en",
    locale: "en_GB",
    alternateLocale: ["cs_CZ"],
  },
};

/* Překlad z češtiny: DeepL (viz data/en.json, pole "generated"). Text v data/en.json se tu neupravuje.
   about[0..2] = o PEER, about[3] = jak web vznikl. */
export default function EnglishPage() {
  const aboutPeer = en.about.slice(0, 3);
  const aboutSite = en.about[3];
  return (
    <div lang="en" className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">{en.hero.eyebrow}</p>
          <h1>{en.hero.h1}</h1>
          <p className={styles.lead}>{en.hero.lede}</p>
          <p className={`muted ${styles.langNote}`}>
            Czech original: <Link href="/">Česko má na víc!</Link>
          </p>
        </div>
        <div className={styles.heroBobr}>
          <GarantBubble kdo="rada" mood="thinking" pointing>
            {en.hero.bobr}
          </GarantBubble>
        </div>
      </section>

      <section className={styles.band} aria-labelledby="numbers">
        <div className="wrap">
          <h2 id="numbers" className={styles.bandTitle}>Three numbers for the end of the decade</h2>
          <ul className={styles.impacts}>
            {en.numbers.map((n) => (
              <li key={n.value} className={styles.impact}>
                <span className={`display ${styles.impactValue}`}>{n.value}</span>
                <span className={styles.impactLabel}>{n.label}</span>
              </li>
            ))}
          </ul>
          <p className={`src ${styles.bandSrc}`}>
            Source: PEER Economic Strategy 2026–2035, summary of impact (p. 88). The study itself calls these a target and an
            order-of-magnitude estimate, not an accounting sum.
          </p>
        </div>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="topics">
        <h2 id="topics">The 14 topics</h2>
        <p className={`prose muted ${styles.sectionIntro}`}>
          Each chapter of the strategy starts from one number. Links lead to the full Czech pages with charts, calculators,
          video and sources.
        </p>
        <ol className={styles.topics}>
          {en.topics.map((t, i) => (
            <li key={t.slug} className={`card ${styles.topic}`}>
              <div className={styles.topicHead}>
                <span className={`num ${styles.topicNo}`} aria-hidden="true">{i + 1}</span>
                <h3>{t.title}</h3>
              </div>
              <p className={styles.topicHook}>{t.hook}</p>
              <p className={styles.figure}>
                <span className={`display ${styles.figureValue}`}>{t.number}</span>
                {t.unit ? <span className={`num ${styles.figureUnit}`}>{t.unit}</span> : null}
              </p>
              <p className={`num muted ${styles.figureLabel}`}>{t.label}</p>
              <p className={styles.topicLede}>{t.lede}</p>
              <p className={`muted ${styles.guarantor}`}>
                <b>Guarantor:</b> {t.guarantor}, {t.role}
              </p>
              <Link className={styles.readCz} href={`/${t.slug}`} hrefLang="cs" lang="cs">
                <span lang="en">Read in Czech</span> <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={`wrap ${styles.section}`} aria-labelledby="about">
        <h2 id="about">About PEER</h2>
        <div className={`prose ${styles.stack}`}>
          {aboutPeer.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p>
          <a className="btn sun" href={PDF_URL} target="_blank" rel="noreferrer" hrefLang="cs">
            Download the study (PDF, Czech)
          </a>
        </p>
      </section>

      <section className={`wrap ${styles.section} ${styles.madeWith}`} aria-labelledby="site">
        <div className={styles.madeText}>
          <h2 id="site">How this site was made</h2>
          <div className={`prose ${styles.stack}`}>
            <p>{aboutSite}</p>
            {en.site.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p>
            <Link className="btn secondary" href="/jak-vznikl" hrefLang="cs">
              How it was built (Czech)
            </Link>
          </p>
        </div>
        <div className={styles.madeBobr}>
          <Garant kdo="rada" mood="happy" pointing size={180} />
        </div>
      </section>

      <p className={`wrap src ${styles.generated}`}>Machine translation from Czech: {en.generated}.</p>
    </div>
  );
}
