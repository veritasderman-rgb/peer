import styles from "./Opatreni.module.css";

export type Opatreni = { cislo: number; nazev: string; popis: string; klicoveCislo?: string | null; proTebe: string };

/* Karty opatření: krátký lidský souhrn „co to znamená pro tebe“ nahoře,
   plný text opatření ze studie rozbalovací pod ním. */
export function OpatreniGrid({ polozky }: { polozky: Opatreni[] }) {
  return (
    <ol className={styles.grid}>
      {polozky.map((o) => (
        <li key={o.cislo} className={styles.card} id={`opatreni-${o.cislo}`}>
          <span className={styles.num}>{o.cislo}</span>
          <h3 className={styles.title}>{o.nazev}</h3>
          {o.klicoveCislo && <span className={styles.key}>{o.klicoveCislo}</span>}
          <p className={styles.forYou}><span className="eyebrow">Pro tebe</span> {o.proTebe}</p>
          <details className={styles.details}>
            <summary>Jak to studie navrhuje</summary>
            <p>{o.popis}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}
