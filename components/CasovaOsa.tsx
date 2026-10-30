import Link from "next/link";
import { getTopic } from "@/topics";
import styles from "./CasovaOsa.module.css";

/* Časová osa 2026–2035 (a za horizont): milníky z data/osa.json. Svislá osa funguje stejně na telefonu
   i na počítači. Rok bez datovaného milníku se slučuje se sousedy do jednoho tichého řádku, aby bylo
   vidět, že studie pro něj termín nedává, ale osa nebyla samá prázdná políčka. */

export type Milnik = { rok: number; slug?: string | null; text: string; typ: "opatreni" | "cil" | "dopad"; explicitni: boolean; zdroj: string };

const TYP: Record<Milnik["typ"], string> = { opatreni: "Opatření", cil: "Cíl", dopad: "Dopad" };

export function CasovaOsa({ milniky, celkovyDopad, od = 2026, do_ = 2035 }: { milniky: Milnik[]; celkovyDopad: Milnik[]; od?: number; do_?: number }) {
  const all = [...milniky, ...celkovyDopad.map((m) => ({ ...m, slug: null }))].sort(
    (a, b) => a.rok - b.rok || (a.slug ?? "").localeCompare(b.slug ?? ""),
  );
  const byYear = new Map<number, Milnik[]>();
  for (const m of all) byYear.set(m.rok, [...(byYear.get(m.rok) ?? []), m]);

  /* řádky: každý rok dekády; prázdné sousední roky se slučují; roky za horizontem jeden řádek */
  type Row = { label: string; rok: number; items: Milnik[]; tichy?: boolean };
  const rows: Row[] = [];
  let gap: number[] = [];
  const flush = () => {
    if (!gap.length) return;
    rows.push({ label: gap.length === 1 ? String(gap[0]) : `${gap[0]}–${gap[gap.length - 1]}`, rok: gap[0], items: [], tichy: true });
    gap = [];
  };
  for (let y = od; y <= do_; y++) {
    const items = byYear.get(y);
    if (items?.length) {
      flush();
      rows.push({ label: String(y), rok: y, items });
    } else gap.push(y);
  }
  flush();
  const later = all.filter((m) => m.rok > do_);
  if (later.length) {
    const roky = new Set(later.map((m) => m.rok));
    rows.push({ label: roky.size === 1 ? String(later[0].rok) : `po ${do_}`, rok: do_ + 1, items: later });
  }

  return (
    <ol className={styles.osa}>
      {rows.map((r) => (
        <li key={r.label} className={`${styles.row} ${r.tichy ? styles.tichy : ""}`}>
          <div className={styles.rok}>
            <span className={`display ${styles.rokText}`}>{r.label}</span>
          </div>
          <div className={styles.obsah}>
            {r.tichy ? (
              <p className={`muted ${styles.tichyText}`}>Pro tyto roky studie termín nedává. Opatření běží průběžně.</p>
            ) : (
              <ul className={styles.items}>
                {r.items.map((m, i) => {
                  const t = m.slug ? getTopic(m.slug) : undefined;
                  return (
                    <li key={i} className={`card ${styles.item} ${styles[m.typ]}`}>
                      <div className={styles.meta}>
                        {t ? (
                          <Link href={`/${t.slug}`} className={styles.tema}>{t.kratkyNazev}</Link>
                        ) : (
                          <span className={`${styles.tema} ${styles.temaCela}`}>Celá strategie</span>
                        )}
                        <span className={styles.typ}>{TYP[m.typ]}</span>
                        {!m.explicitni && <span className={styles.odhad} title="Rok je odvozený z lhůty ve studii, ne výslovně uvedený">odvozený rok</span>}
                      </div>
                      <p className={styles.text}>{m.text}</p>
                      <details className={styles.zdroj}>
                        <summary>Zdroj</summary>
                        <p>{m.zdroj}</p>
                      </details>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
