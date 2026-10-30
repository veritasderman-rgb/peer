"use client";

import { chybaNahlasena } from "@/lib/analytics";
import { KONTAKT_EMAIL, REPO_URL } from "@/lib/site";
import styles from "./NahlasitChybu.module.css";

/* „Našel jsi chybu?“: předvyplněný e-mail (NEXT_PUBLIC_KONTAKT_EMAIL) a odkaz na nové issue v repu.
   Bez backendu; stačí, aby odpověď dorazila lidem, kteří web spravují. */
export function NahlasitChybu({ kde, kompaktni = false }: { kde: string; kompaktni?: boolean }) {
  const predmet = `Chyba na webu Česko má na víc: ${kde}`;
  const telo = `Kde: ${kde}\nCo je špatně:\n\nSprávně má být (a zdroj):\n`;
  const mailto = KONTAKT_EMAIL
    ? `mailto:${KONTAKT_EMAIL}?subject=${encodeURIComponent(predmet)}&body=${encodeURIComponent(telo)}`
    : null;
  const issue = REPO_URL ? `${REPO_URL}/issues/new?title=${encodeURIComponent(predmet)}&body=${encodeURIComponent(telo)}` : null;
  if (!mailto && !issue) return null;
  return (
    <div className={`${styles.root} ${kompaktni ? styles.kompaktni : ""}`}>
      {!kompaktni && (
        <p className={styles.text}>
          <b>Našel jsi chybu?</b> Špatné číslo, mrtvý odkaz, nesrozumitelná věta. Napiš nám, opravíme to a zapíšeme změnu.
        </p>
      )}
      <span className={styles.links} onClick={(e) => { if ((e.target as HTMLElement).closest("a")) chybaNahlasena(kde); }}>
        {mailto && <a className={`btn secondary ${styles.btn}`} href={mailto}>Nahlásit e-mailem</a>}
        {issue && (
          <a className={`btn secondary ${styles.btn}`} href={issue} target="_blank" rel="noreferrer">
            Nahlásit na GitHubu
          </a>
        )}
      </span>
    </div>
  );
}
