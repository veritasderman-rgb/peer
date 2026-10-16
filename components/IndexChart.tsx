import s from "./IndexChart.module.css";

export type IndexSeries = {
  label: string; // plný název do legendy
  short: string; // krátký popisek u koncového bodu
  end: number; // index v koncovém roce (základ 100)
  color: "alert" | "river" | "sun";
};
export type IndexChartProps = {
  series?: IndexSeries[];
  startYear?: number;
  endYear?: number;
  title?: string;
  source?: string;
};

const DEFAULT_SERIES: IndexSeries[] = [
  { label: "Kupní ceny bytů", short: "kupní ceny", end: 288, color: "alert" },
  { label: "Nabídkové nájmy", short: "nájmy", end: 208, color: "river" },
  { label: "Čisté příjmy domácností", short: "příjmy", end: 182, color: "sun" },
];
const DEFAULT_SOURCE =
  "Index 2014 = 100. Přesné jsou jen hodnoty v roce 2014 a 2025; průběh mezi nimi je ilustrativní (lineární interpolace). Zdroj: ČSÚ.";

const W = 380;
const H = 290;
const L = 38;
const R = 298;
const T = 14;
const B = 252;
const VMIN = 100;
const VMAX = 300;
const nf = new Intl.NumberFormat("cs-CZ");

/**
 * Tři sparkline linie z indexu 100 do koncových hodnot.
 * POZOR: mezilehlé body se jen lineárně dopočítávají (ilustrace), přesné jsou pouze koncové hodnoty (ČSÚ).
 */
export function IndexChart({
  series = DEFAULT_SERIES,
  startYear = 2014,
  endYear = 2025,
  title,
  source = DEFAULT_SOURCE,
}: IndexChartProps) {
  const years = endYear - startYear;
  const x = (yr: number) => L + ((yr - startYear) / years) * (R - L);
  const y = (v: number) => T + ((VMAX - v) / (VMAX - VMIN)) * (B - T);
  const grid = [100, 200, 300];
  const yearTicks = [startYear, Math.round((startYear + endYear) / 2), endYear];

  return (
    <figure className={`card ${s.root}`}>
      {title ? <figcaption className={s.title}>{title}</figcaption> : null}
      <svg
        className={s.svg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${title ?? "Index"} ${startYear} až ${endYear}, základ 100: ${series.map((r) => `${r.label} ${r.end}`).join(", ")}`}
      >
        {grid.map((g) => (
          <g key={g}>
            <line className={g === 100 ? s.base : s.grid} x1={L} x2={R} y1={y(g)} y2={y(g)} />
            <text className={s.tick} x={L - 6} y={y(g) + 4} textAnchor="end">
              {g}
            </text>
          </g>
        ))}
        {yearTicks.map((yr) => (
          <text key={yr} className={s.tick} x={x(yr)} y={B + 20} textAnchor="middle">
            {yr}
          </text>
        ))}
        {series.map((r) => {
          // ilustrativní lineární interpolace mezi 100 a koncovou hodnotou
          const pts = Array.from({ length: years + 1 }, (_, i) => {
            const v = VMIN + ((r.end - VMIN) * i) / years;
            return `${x(startYear + i).toFixed(1)},${y(v).toFixed(1)}`;
          }).join(" ");
          return (
            <g key={r.label}>
              <polyline className={`${s.line} ${s[r.color]}`} points={pts} />
              <circle className={`${s.dot} ${s[`f_${r.color}`]}`} cx={x(startYear)} cy={y(VMIN)} r="4" />
              <circle className={`${s.dot} ${s[`f_${r.color}`]}`} cx={R} cy={y(r.end)} r="5.5" />
              <text className={s.endValue} x={R + 11} y={y(r.end) + 1}>
                {nf.format(r.end)}
              </text>
              <text className={s.endName} x={R + 11} y={y(r.end) + 13}>
                {r.short}
              </text>
            </g>
          );
        })}
      </svg>
      <ul className={s.legend}>
        {series.map((r) => (
          <li key={r.label} className={s.legendItem}>
            <span className={`${s.swatch} ${s[`f_${r.color}`]}`} aria-hidden="true" />
            <span>
              {r.label} <b className="num">+&nbsp;{nf.format(r.end - 100)}&nbsp;%</b>
            </span>
          </li>
        ))}
      </ul>
      {source ? <figcaption className={`src ${s.source}`}>{source}</figcaption> : null}
    </figure>
  );
}
