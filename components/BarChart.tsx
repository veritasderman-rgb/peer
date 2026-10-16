import s from "./BarChart.module.css";

export type BarItem = { label: string; value: number; note?: string; highlight?: boolean };
export type BarChartProps = {
  items: BarItem[];
  unit?: string;
  max?: number;
  goal?: { value: number; label: string };
  title?: string;
  source?: string;
};

const fmt = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 });
const ROW = 52; // výška jednoho řádku
const BAR_H = 16;
const SCALE = 78; // % šířky, které zabere sloupec s hodnotou max (zbytek = popisek hodnoty)

/**
 * Horizontální sloupcový graf, jedna škála pro všechny sloupce i cílovou čáru.
 * SVG bez viewBoxu: osa X v procentech, text v pixelech, takže se na mobilu nezmenšuje.
 */
export function BarChart({ items, unit, max, goal, title, source }: BarChartProps) {
  const top = Math.max(0, ...items.map((i) => i.value), goal?.value ?? 0);
  const domain = max ?? top;
  const pct = (v: number) => (SCALE * v) / domain;
  const head = goal ? 28 : 4;
  const height = head + items.length * ROW;
  const withUnit = (v: number) => `${fmt.format(v)}${unit ? " " + unit : ""}`;
  const goalPct = goal ? pct(goal.value) : 0;
  const goalAnchorEnd = goalPct > 50;
  const summary = items.map((i) => `${i.label} ${withUnit(i.value)}${i.note ? ` (${i.note})` : ""}`).join("; ");

  return (
    <figure className={`card ${s.root}`}>
      {title ? <figcaption className={s.title}>{title}</figcaption> : null}
      <svg
        className={s.svg}
        style={{ height }}
        width="100%"
        height={height}
        role="img"
        aria-label={`${title ?? "Graf"}: ${summary}${goal ? `. ${goal.label}` : ""}`}
      >
        {items.map((it, i) => (
          <rect
            key={it.label}
            className={it.highlight ? s.barHi : s.bar}
            x="0"
            y={head + i * ROW + 24}
            width={`${pct(it.value)}%`}
            height={BAR_H}
            rx="2"
          />
        ))}
        <line className={s.axis} x1="0" x2="0" y1={head} y2={height - 4} />
        {goal ? (
          <g>
            <line className={s.goalLine} x1={`${goalPct}%`} x2={`${goalPct}%`} y1={head - 8} y2={height - 4} />
            <text
              className={s.goalText}
              x={`${goalPct}%`}
              dx={goalAnchorEnd ? -6 : 6}
              y={head - 12}
              textAnchor={goalAnchorEnd ? "end" : "start"}
            >
              {goal.label}
            </text>
          </g>
        ) : null}
        {items.map((it, i) => {
          /* Dlouhý sloupec: popisek dovnitř, aby na úzkém displeji nevyjel z grafu. */
          const inside = pct(it.value) > 60;
          return (
            <text
              key={`v-${it.label}`}
              className={`${s.valueText} ${it.highlight ? s.strong : ""} ${inside ? (it.highlight ? s.insideHi : s.inside) : ""}`}
              x={`${pct(it.value)}%`}
              dx={inside ? -8 : 8}
              y={head + i * ROW + 37}
              textAnchor={inside ? "end" : "start"}
            >
              {withUnit(it.value)}
            </text>
          );
        })}
        {items.map((it, i) => {
          const y = head + i * ROW;
          return (
            <text key={it.label} className={`${s.labelText} ${it.highlight ? s.strong : ""}`} x="0" y={y + 14}>
              {it.label}
              {it.note ? <tspan className={s.note} dx="8">{it.note}</tspan> : null}
            </text>
          );
        })}
      </svg>
      {source ? <figcaption className={`src ${s.source}`}>{source}</figcaption> : null}
    </figure>
  );
}
