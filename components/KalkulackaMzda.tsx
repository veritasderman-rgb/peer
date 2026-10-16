"use client";

import { useState } from "react";
import { RangeField } from "./RangeField";
import s from "./KalkulackaMzda.module.css";

const nf = new Intl.NumberFormat("cs-CZ");

const MIN_TODAY = 22_400;

type Row = { name: string; v: number; kind: "today" | "plan" | "other" };

export function KalkulackaMzda() {
  const [avg, setAvg] = useState(49_215);

  const plan = Math.round(avg * 0.5);
  const diff = plan - MIN_TODAY;

  const rows: Row[] = [
    { name: "Polsko", v: 27_600, kind: "other" },
    { name: "Chorvatsko", v: 25_500, kind: "other" },
    { name: "Česko, návrh", v: plan, kind: "plan" },
    { name: "Česko, dnes", v: MIN_TODAY, kind: "today" },
    { name: "Slovensko", v: 21_200, kind: "other" },
  ].sort((a, b) => b.v - a.v) as Row[];
  const max = Math.max(...rows.map((r) => r.v));

  return (
    <section className={`card ${s.root}`} aria-labelledby="kalk-mzda-title">
      <h3 id="kalk-mzda-title" className={s.title}>
        Minimální mzda 50&nbsp;% průměru: kolik by to bylo?
      </h3>
      <div className={s.fields}>
        <RangeField
          id="kalk-mzda-prumer"
          label="Průměrná hrubá mzda"
          unit="Kč"
          value={avg}
          min={40_000}
          max={70_000}
          step={1}
          inputStep={1000}
          onChange={setAvg}
        />
      </div>

      <div className={s.tiles}>
        <div className={s.tile}>
          <p className={s.tileLabel}>Dnes · 43&nbsp;% průměru</p>
          <p className={`${s.tileNum} num`}>{nf.format(MIN_TODAY)}</p>
          <p className={s.tileUnit}>Kč měsíčně</p>
        </div>
        <div className={s.tile}>
          <p className={s.tileLabel}>Návrh · 50&nbsp;% průměru</p>
          <p className={`${s.tileNum} num`}>{nf.format(plan)}</p>
          <p className={s.tileUnit}>Kč měsíčně</p>
        </div>
      </div>

      <div className={`sun ${s.result}`} aria-live="polite" aria-atomic="true">
        <p className={s.resultLine}>
          <span className={s.lead}>Rozdíl oproti dnešku</span>
          <span className={`${s.big} num`}>{nf.format(diff)}&nbsp;Kč</span>
          <span className={s.unit}>měsíčně</span>
        </p>
        <p className={s.sentence}>
          To je <b className="num">{nf.format(diff * 12)}&nbsp;Kč</b> ročně.
        </p>
      </div>

      <figure className={s.chart}>
        <figcaption className={s.cap}>Minimální mzda v zemích okolo, Kč měsíčně</figcaption>
        <ul className={s.rows}>
          {rows.map((r) => (
            <li key={r.name} className={s.row}>
              <span className={`${s.name} ${r.kind !== "other" ? s.strong : ""}`}>{r.name}</span>
              <span className={s.track} aria-hidden="true">
                <span
                  className={`${s.bar} ${r.kind === "plan" ? s.barPlan : r.kind === "today" ? s.barToday : ""}`}
                  style={{ width: `${(r.v / max) * 100}%` }}
                />
              </span>
              <span className={`${s.val} num`}>{nf.format(r.v)}</span>
            </li>
          ))}
        </ul>
      </figure>

      <p className={`src ${s.source}`}>
        Studie, s.&nbsp;24. Minimální mzda dnes 22&nbsp;400&nbsp;Kč (43&nbsp;% průměru podle studie), návrh 50&nbsp;% průměrné
        mzdy zaokrouhlený na celé koruny. Zahraničí: Eurostat 2026, přepočet kurzem 24,24&nbsp;Kč/EUR.
      </p>
    </section>
  );
}
