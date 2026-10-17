"use client";

import { useState } from "react";
import Link from "next/link";
import { GarantBubble } from "./GarantBubble";
import styles from "./Situace.module.css";

/* Vstup „podle mě“: místo kapitol si člověk vybere životní situaci a dostane témata a řádky „pro tebe“,
   které se jí týkají. Data (lib/situace.ts + registr témat) skládá server v app/page.tsx; tady je jen výběr. */

export type SituaceView = {
  id: string;
  label: string;
  uvod: string;
  temata: {
    slug: string;
    kratkyNazev: string;
    hook: string;
    polozky: { nazev: string; proTebe: string }[];
  }[];
};

export function Situace({ data }: { data: SituaceView[] }) {
  const [active, setActive] = useState<string | null>(null);
  const cur = data.find((s) => s.id === active) ?? null;
  return (
    <div className={styles.root}>
      <div className={styles.chips} role="group" aria-label="Vyber svoji situaci">
        {data.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`${styles.chip} ${s.id === active ? styles.chipOn : ""}`}
            aria-pressed={s.id === active}
            onClick={() => setActive(s.id === active ? null : s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {cur ? (
        <div className={styles.result} aria-live="polite">
          <GarantBubble kdo="rada" mood="happy" pointing size={120} className={styles.bubble}>
            {cur.uvod}
          </GarantBubble>
          <ol className={styles.list}>
            {cur.temata.map((t) => (
              <li key={t.slug} className={`card ${styles.topic}`}>
                <div className={styles.topicHead}>
                  <h3 className={styles.topicTitle}>
                    <Link href={`/${t.slug}`}>{t.kratkyNazev}</Link>
                  </h3>
                  <span className={`num ${styles.topicHook}`}>{t.hook}</span>
                </div>
                <ul className={styles.items}>
                  {t.polozky.map((p) => (
                    <li key={p.nazev}>
                      <b>{p.nazev}.</b> {p.proTebe}
                    </li>
                  ))}
                </ul>
                <Link className={styles.more} href={`/${t.slug}#navrh`}>
                  Všechna opatření tématu
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p className={`muted ${styles.hint}`}>Vyber jednu nebo si projdi témata níže.</p>
      )}
    </div>
  );
}
