"use client";

import { useEffect, useRef, useState } from "react";
import { videoPrehrano } from "@/lib/analytics";
import styles from "./TopicVideo.module.css";

/* Video k tématu: na výšku (telefon) se načte reel 9:16, jinak široké 16:9.
   Obě verze jsou ke stažení, aby se daly sdílet na sítích. */
export function TopicVideo({
  wide,
  reel,
  poster,
  titulek,
  popis,
  titulky,
  prepis,
}: {
  wide: string;
  reel: string;
  poster?: string;
  titulek: string;
  popis?: string;
  titulky?: string;
  prepis?: string[];
}) {
  const [portrait, setPortrait] = useState(false);
  const prehrano = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait) and (max-width: 760px)");
    const update = () => setPortrait(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const src = portrait ? reel : wide;
  /* reel má vlastní náhled na výšku: <slug>-poster-reel.jpg vedle <slug>-poster.jpg */
  const posterSrc = portrait && poster ? poster.replace(/-poster\.jpg$/, "-poster-reel.jpg") : poster;
  return (
    <figure className={`card ${styles.root}`}>
      <video
        key={src}
        className={portrait ? styles.reel : styles.wide}
        controls
        playsInline
        preload="metadata"
        poster={posterSrc}
        aria-label={titulek}
        onPlay={() => {
          if (prehrano.current) return;
          prehrano.current = true;
          videoPrehrano(wide.split("/").pop()?.replace(/-wide\.mp4$/, "") ?? titulek, portrait ? "reel" : "wide");
        }}
      >
        <source src={src} type="video/mp4" />
        {/* titulky k mluvenému komentáři: text v obraze je kratší než hlas, tohle je přepis hlasu */}
        {titulky && <track kind="subtitles" src={titulky} srcLang="cs" label="Česky (komentář)" />}
        Tvůj prohlížeč video nepřehraje. <a href={src}>Stáhni si ho.</a>
      </video>
      <figcaption className={styles.caption}>
        <span className={styles.title}>{titulek}</span>
        {popis && <span className="muted">{popis}</span>}
        <span className={styles.links}>
          <a href={wide} download>Stáhnout široké (16:9)</a>
          <a href={reel} download>Stáhnout reel (9:16)</a>
          {titulky && <a href={titulky} download>Titulky (VTT)</a>}
        </span>
        {prepis && prepis.length > 0 && (
          <details className={styles.prepis}>
            <summary>Přepis komentáře</summary>
            {prepis.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </details>
        )}
      </figcaption>
    </figure>
  );
}
