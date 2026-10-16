import s from "./Donut.module.css";

export type DonutPart = { label: string; value: number; color?: "sun" | "river" | "muted" };
export type DonutProps = {
  parts: DonutPart[];
  centerValue: string;
  centerLabel: string;
  title?: string;
  source?: string;
};

const R = 84;
const SW = 28;
const C = 2 * Math.PI * R;
const DEFAULTS: NonNullable<DonutPart["color"]>[] = ["sun", "river", "muted"];
const nf = new Intl.NumberFormat("cs-CZ");

/** Rozdělí popisek na dva řádky podle mezery nejblíž středu. */
function splitLabel(text: string): string[] {
  if (text.length <= 12 || !text.includes(" ")) return [text];
  const mid = text.length / 2;
  let best = -1;
  for (let i = 0; i < text.length; i++) if (text[i] === " " && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
  return [text.slice(0, best), text.slice(best + 1)];
}

export function Donut({ parts, centerValue, centerLabel, title, source }: DonutProps) {
  const total = parts.reduce((a, p) => a + p.value, 0);
  let acc = 0;
  const arcs = parts.map((p, i) => {
    const len = (p.value / total) * C;
    const gap = Math.min(3, len * 0.2);
    const arc = { ...p, color: p.color ?? DEFAULTS[i % DEFAULTS.length], len, gap, start: acc, pct: Math.round((p.value / total) * 100) };
    acc += len;
    return arc;
  });
  const lines = splitLabel(centerLabel);

  return (
    <figure className={`card ${s.root}`}>
      {title ? <figcaption className={s.title}>{title}</figcaption> : null}
      <div className={s.body}>
        <svg
          className={s.svg}
          viewBox="0 0 220 220"
          role="img"
          aria-label={`${centerValue} ${centerLabel}: ${arcs.map((a) => `${a.label} ${a.pct} %`).join(", ")}`}
        >
          <g transform="rotate(-90 110 110)">
            {arcs.map((a) => (
              <circle
                key={a.label}
                className={s[a.color]}
                cx="110"
                cy="110"
                r={R}
                fill="none"
                strokeWidth={SW}
                strokeDasharray={`${a.len - a.gap} ${C - a.len + a.gap}`}
                strokeDashoffset={-(a.start + a.gap / 2)}
              />
            ))}
          </g>
          <text className={s.centerValue} x="110" y={lines.length > 1 ? 112 : 122} textAnchor="middle">
            {centerValue}
          </text>
          {lines.map((l, i) => (
            <text key={i} className={s.centerLabel} x="110" y={(lines.length > 1 ? 128 : 140) + i * 14} textAnchor="middle">
              {l}
            </text>
          ))}
        </svg>
        <ul className={s.legend}>
          {arcs.map((a) => (
            <li key={a.label} className={s.item}>
              <span className={`${s.swatch} ${s[`sw_${a.color}`]}`} aria-hidden="true" />
              <span className={s.itemText}>
                <span className={`${s.pct} num`}>{a.pct}&nbsp;%</span>
                <span className={s.itemLabel}>{a.label}</span>
                <span className={`${s.itemVal} num`}>{nf.format(a.value)}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      {source ? <figcaption className={`src ${s.source}`}>{source}</figcaption> : null}
    </figure>
  );
}
