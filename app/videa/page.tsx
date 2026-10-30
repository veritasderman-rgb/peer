import type { Metadata } from "next";
import Link from "next/link";
import { topics, uvodVideo } from "@/topics";
import { GarantBubble } from "@/components/GarantBubble";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Videa Strategie za minutu",
  description: "Každé téma strategie za minutu: široká verze pro YouTube a web, reel pro Instagram, TikTok a Shorts. Obojí ke stažení a sdílení.",
  alternates: { canonical: "/videa" },
};

/* Přehled všech videí: na telefonu na výšku se přehraje reel, jinak široká verze (viz TopicVideo).
   Tady jsou vedle sebe obě verze ke stažení, aby šly sdílet na sítích. */
export default function VideaPage() {
  const withVideo = topics.filter((t) => t.video);
  return (
    <article className={styles.page}>
      <section className={`wrap ${styles.hero}`}>
        <div className={styles.heroText}>
          <p className="eyebrow">Videa · úvod a {withVideo.length} témat</p>
          <h1>Strategie za minutu</h1>
          <p className={styles.lede}>
            Každé téma strategie v jedné minutě: číslo, problém, proč to tak je, co navrhujeme a co to přinese. Namluvené, s hudbou
            a s titulky v obraze, aby se dalo koukat i potichu v tramvaji. Široká verze (16:9) je pro YouTube a web, reel (9:16)
            pro Instagram, TikTok a Shorts. Obě si můžeš stáhnout a sdílet.
          </p>
        </div>
        <GarantBubble kdo="rada" mood="happy" pointing side="left">
          Každé video vzniklo ze stejných čísel jako stránka tématu. Mluví v něm garant kapitoly.
        </GarantBubble>
      </section>

      <section className={`wrap ${styles.section}`}>
        <ol className={styles.list}>
          <li className={`card ${styles.item}`} id="uvod">
            <div className={styles.meta}>
              <span className={`display ${styles.num}`} aria-hidden="true">★</span>
              <div>
                <h2 className={styles.title}>{uvodVideo.titulek}</h2>
                <p className="muted">Úvod: celá strategie v jednom videu</p>
                <p className={styles.links}>
                  <a className="btn" href={uvodVideo.wide} download>Stáhnout široké (16:9)</a>
                  <a className="btn secondary" href={uvodVideo.reel} download>Stáhnout reel (9:16)</a>
                  <Link className={styles.topicLink} href="/dopad">Velký obraz</Link>
                </p>
              </div>
            </div>
            <div className={styles.players}>
              <video className={styles.wide} controls playsInline preload="none" poster={uvodVideo.poster} aria-label={`${uvodVideo.titulek}, široká verze`}>
                <source src={uvodVideo.wide} type="video/mp4" />
                {uvodVideo.titulky && <track kind="subtitles" src={uvodVideo.titulky} srcLang="cs" label="Česky (komentář)" />}
              </video>
              <video className={styles.reel} controls playsInline preload="none" poster={uvodVideo.poster?.replace(/-poster\.jpg$/, "-poster-reel.jpg")} aria-label={`${uvodVideo.titulek}, reel`}>
                <source src={uvodVideo.reel} type="video/mp4" />
                {uvodVideo.titulky && <track kind="subtitles" src={uvodVideo.titulky} srcLang="cs" label="Česky (komentář)" />}
              </video>
            </div>
            {uvodVideo.prepis && (
              <details className={styles.prepis}>
                <summary>Přepis komentáře</summary>
                {uvodVideo.prepis.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </details>
            )}
          </li>
          {withVideo.map((t) => (
            <li key={t.slug} className={`card ${styles.item}`} id={t.slug}>
              <div className={styles.meta}>
                <span className={`display ${styles.num}`}>{t.cislo}</span>
                <div>
                  <h2 className={styles.title}>{t.video!.titulek}</h2>
                  <p className="muted">{t.nazev} · kapitola {t.kapitola}</p>
                  <p className={styles.links}>
                    <a className="btn" href={t.video!.wide} download>Stáhnout široké (16:9)</a>
                    <a className="btn secondary" href={t.video!.reel} download>Stáhnout reel (9:16)</a>
                    <Link className={styles.topicLink} href={`/${t.slug}`}>Stránka tématu</Link>
                  </p>
                </div>
              </div>
              <div className={styles.players}>
                <video className={styles.wide} controls playsInline preload="none" poster={t.video!.poster} aria-label={`${t.video!.titulek}, široká verze`}>
                  <source src={t.video!.wide} type="video/mp4" />
                  {t.video!.titulky && <track kind="subtitles" src={t.video!.titulky} srcLang="cs" label="Česky (komentář)" />}
                </video>
                <video className={styles.reel} controls playsInline preload="none" poster={t.video!.poster?.replace(/-poster\.jpg$/, "-poster-reel.jpg")} aria-label={`${t.video!.titulek}, reel`}>
                  <source src={t.video!.reel} type="video/mp4" />
                  {t.video!.titulky && <track kind="subtitles" src={t.video!.titulky} srcLang="cs" label="Česky (komentář)" />}
                </video>
              </div>
              {t.video!.prepis && (
                <details className={styles.prepis}>
                  <summary>Přepis komentáře</summary>
                  {t.video!.prepis.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </details>
              )}
            </li>
          ))}
        </ol>
      </section>

      <section className={`wrap ${styles.section}`}>
        <div className={`card ${styles.note}`}>
          <h3>Jak videa vznikají</h3>
          <p>
            Videa se generují z dat webu (Remotion). Scénář každého tématu je krátký textový soubor; z něj se vyrenderuje široká
            verze i reel. Komentář je namluvený syntetickým hlasem (ElevenLabs) podle scénáře, čísla se v něm čtou slovy; hudba je
            také vygenerovaná. Délka každé scény se řídí délkou namluvené věty, takže oprava textu znamená nové namluvení a nový
            render, ne nový střih.
          </p>
        </div>
      </section>
    </article>
  );
}
