import styles from "./NabehChart.module.css";

/* Náběh ročního přínosu: roky 1–4 ze zdroje, roky 5–9 lineárně dopočítané k cíli v roce 10
   (označeno jako ilustrativní). Jedna škála pro všechny sloupce. */
export function NabehChart({ body, cil, startYear }: { body: { rok: number; mld: number }[]; cil: number; startYear?: number }) {
  const last = body[body.length - 1];
  const years = Array.from({ length: 10 }, (_, i) => i + 1);
  const value = (rok: number) => {
    const known = body.find((b) => b.rok === rok);
    if (known) return { v: known.mld, est: false };
    if (rok === 10) return { v: cil, est: false };
    const t = (rok - last.rok) / (10 - last.rok);
    return { v: Math.round(last.mld + (cil - last.mld) * t), est: true };
  };
  const max = cil;
  const W = 100;
  const H = 240;
  const pad = 36;
  const bw = (W - 4) / 10;
  return (
    <figure className={`card ${styles.root}`}>
      <svg className={styles.svg} viewBox={`0 0 ${W} ${H + pad}`} preserveAspectRatio="none" role="img" aria-label={`Přínos navíc ročně: rok 1 ${body[0].mld} mld. Kč, rok ${last.rok} ${last.mld} mld. Kč, rok 10 ${cil} mld. Kč`}>
        {years.map((y, i) => {
          const { v, est } = value(y);
          const h = (v / max) * H;
          return (
            <g key={y}>
              <rect className={est ? styles.est : styles.bar} x={2 + i * bw + bw * 0.12} y={H - h} width={bw * 0.76} height={h} />
            </g>
          );
        })}
      </svg>
      <div className={styles.labels}>
        {years.map((y) => {
          const { v, est } = value(y);
          return (
            <div key={y} className={styles.label}>
              <span className={`num ${styles.val} ${est ? styles.estText : ""}`}>{est ? "~" : ""}{v}</span>
              <span className={styles.year}>{startYear ? startYear + y - 1 : `rok ${y}`}</span>
            </div>
          );
        })}
      </div>
      <figcaption className="src">Miliardy Kč navíc oproti dnešnímu růstu, každý rok. Šrafované sloupce (rok 5–9) jsou dopočítané.</figcaption>
    </figure>
  );
}
