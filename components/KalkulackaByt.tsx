"use client";

import { useState } from "react";
import { useKalkulackaPouzita } from "@/lib/analytics";
import { RangeField } from "./RangeField";
import s from "./KalkulackaByt.module.css";

const nf = new Intl.NumberFormat("cs-CZ");
const nf1 = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

type Point = { name: string; v: number; hi?: boolean };
const POINTS: Point[] = [
  { name: "Belgie", v: 4.8 },
  { name: "Německo", v: 10.2 },
  { name: "Polsko", v: 11.8 },
  { name: "Slovensko", v: 14.5 },
  { name: "Česko", v: 15.1, hi: true },
];
const GOAL = 10;
const SMAX = 22;
// vodorovná osa v procentech šířky: levý/pravý okraj pro popisky
const X0 = 8;
const XW = 84;
const px = (v: number) => X0 + (Math.min(v, SMAX) / SMAX) * XW;

function years(n: number) {
  return n === 1 ? "rok" : n >= 2 && n <= 4 ? "roky" : "let";
}

export function KalkulackaByt() {
  const pouzita = useKalkulackaPouzita("byt");
  const [price, setPrice] = useState(8_900_000);
  const [wage, setWage] = useState(49_215);

  const ratio = price / (Math.max(wage, 1) * 12);
  const saveYears = Math.round(ratio * 3);

  return (
    <section className={`card ${s.root}`} aria-labelledby="kalk-byt-title" onChangeCapture={pouzita}>
      <h3 id="kalk-byt-title" className={s.title}>
        Kolik ročních platů stojí byt?
      </h3>
      <div className={s.fields}>
        <RangeField
          id="kalk-byt-cena"
          label="Cena bytu"
          unit="Kč"
          value={price}
          min={2_000_000}
          max={16_000_000}
          step={100_000}
          onChange={setPrice}
        />
        <RangeField
          id="kalk-byt-mzda"
          label="Hrubá měsíční mzda"
          unit="Kč"
          value={wage}
          min={20_000}
          max={150_000}
          step={1}
          inputStep={1000}
          onChange={setWage}
        />
      </div>

      <div className={`sun ${s.result}`} aria-live="polite" aria-atomic="true">
        <p className={s.resultLine}>
          <span className={`${s.ratio} num`}>{nf1.format(ratio)}</span>
          <span className={s.ratioUnit}>ročních platů</span>
        </p>
        <p className={s.sentence}>
          Kdybys na něj odkládal třetinu výplaty, šetříš{" "}
          <b className="num">
            {nf.format(saveYears)}&nbsp;{years(saveYears)}
          </b>
          .
        </p>
      </div>

      <figure className={s.scaleFig}>
        <svg
          className={s.svg}
          style={{ height: 150 }}
          width="100%"
          height={150}
          role="img"
          aria-label={`Stupnice ročních platů na byt: ${POINTS.map((p) => `${p.name} ${nf1.format(p.v)}`).join(", ")}; cíl strategie pod ${GOAL}; ty ${nf1.format(ratio)}`}
        >
          {/* osa */}
          <line className={s.axis} x1={`${X0}%`} x2={`${X0 + XW}%`} y1="62" y2="62" />
          {[0, 5, 10, 15, 20].map((t) => (
            <line key={t} className={s.tick} x1={`${px(t)}%`} x2={`${px(t)}%`} y1="62" y2="67" />
          ))}
          <text className={s.axisNum} x={`${px(0)}%`} y="80" textAnchor="middle">
            0
          </text>
          <text className={s.axisNum} x={`${px(SMAX)}%`} y="80" textAnchor="middle">
            {SMAX}
          </text>

          {/* cílová čára */}
          <line className={s.goalLine} x1={`${px(GOAL)}%`} x2={`${px(GOAL)}%`} y1="20" y2="68" />
          <text className={s.goalText} x={`${px(GOAL)}%`} dx="6" y="13">
            Cíl strategie: pod 10
          </text>

          {/* země */}
          {POINTS.map((p, i) => {
            const row2 = i % 2 === 1;
            const nameY = row2 ? 124 : 92;
            return (
              <g key={p.name}>
                <line className={s.leader} x1={`${px(p.v)}%`} x2={`${px(p.v)}%`} y1="62" y2={nameY - 12} />
                <circle className={p.hi ? s.dotHi : s.dot} cx={`${px(p.v)}%`} cy="62" r="5.5" />
                <svg x={`${px(p.v)}%`} y="0" width="1" height="1" overflow="visible">
                  <text className={`${s.pName} ${p.hi ? s.strong : ""}`} y={nameY} textAnchor="middle">
                    {p.name}
                  </text>
                  <text className={s.pVal} y={nameY + 14} textAnchor="middle">
                    {nf1.format(p.v)}
                  </text>
                </svg>
              </g>
            );
          })}

          {/* značka „ty“ */}
          <svg x={`${px(ratio)}%`} y="0" width="1" height="1" overflow="visible">
            <path className={s.you} d="M -30 24 H 30 a 3 3 0 0 1 3 3 V 41 a 3 3 0 0 1 -3 3 H 7 L 0 54 L -7 44 H -30 a 3 3 0 0 1 -3 -3 V 27 a 3 3 0 0 1 3 -3 Z" />
            <text className={s.youText} y="39" textAnchor="middle">
              ty {nf1.format(ratio)}
            </text>
          </svg>
        </svg>
      </figure>

      <p className={`src ${s.source}`}>
        Roční platy na byt (cena ÷ roční mzda). Deloitte Property Index 2025; průměrná mzda 2025 49&nbsp;215&nbsp;Kč.
      </p>
    </section>
  );
}
