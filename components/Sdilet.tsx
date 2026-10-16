"use client";

import { useEffect, useState } from "react";
import styles from "./Sdilet.module.css";

/* Sdílení stránky: na telefonu nativní dialog (Web Share API), jinak odkazy na sítě a kopírování adresy.
   Adresa se bere z prohlížeče, takže funguje i na náhledech a bez nastavené domény. */
export function Sdilet({ titulek, text }: { titulek: string; text: string }) {
  const [url, setUrl] = useState("");
  const [nativni, setNativni] = useState(false);
  const [stav, setStav] = useState<"" | "ok" | "chyba">("");
  useEffect(() => {
    setUrl(window.location.href.split("#")[0]);
    setNativni(typeof navigator.share === "function");
  }, []);

  const share = async () => {
    try {
      await navigator.share({ title: titulek, text, url });
    } catch {
      /* zavření dialogu není chyba */
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setStav("ok");
    } catch {
      setStav("chyba");
    }
    setTimeout(() => setStav(""), 2000);
  };
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(`${titulek} – ${text}`);
  return (
    <div className={styles.root} aria-label="Sdílet stránku">
      <span className={styles.label}>Sdílet:</span>
      {nativni && (
        <button type="button" className={styles.btn} onClick={share}>
          Sdílet…
        </button>
      )}
      <a className={styles.btn} href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noreferrer">
        Facebook
      </a>
      <a className={styles.btn} href={`https://x.com/intent/post?text=${t}&url=${u}`} target="_blank" rel="noreferrer">
        X
      </a>
      <a className={styles.btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a className={styles.btn} href={`https://bsky.app/intent/compose?text=${t}%20${u}`} target="_blank" rel="noreferrer">
        Bluesky
      </a>
      <button type="button" className={styles.btn} onClick={copy}>
        {stav === "ok" ? "Zkopírováno" : stav === "chyba" ? "Nejde zkopírovat" : "Kopírovat odkaz"}
      </button>
    </div>
  );
}
