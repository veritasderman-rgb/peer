"use client";

import { useState } from "react";
import { useKalkulackaPouzita } from "@/lib/analytics";
import { RangeField } from "./RangeField";
import s from "./KalkulackaExekuce.module.css";

const nf = new Intl.NumberFormat("cs-CZ");

const EXTRA = 1_000; // dalších 1 000 Kč hrubého
const KEEP_TODAY = 340; // z navíc vyděláných 1 000 Kč zůstane dnes pod hranicí (srážka 66 %)
const KEEP_PLAN = 500; // strop srážky 50 %

type Count = "1-3" | "4+";
const LIMIT: Record<Count, number> = { "1-3": 31_500, "4+": 24_609 };

export function KalkulackaExekuce() {
  const pouzita = useKalkulackaPouzita("exekuce");
  const [wage, setWage] = useState(35_000);
  const [count, setCount] = useState<Count>("1-3");

  const limit = LIMIT[count];
  const over = wage > limit;
  const today = over ? 0 : KEEP_TODAY;

  return (
    <section className={`card ${s.root}`} aria-labelledby="kalk-exekuce-title" onChangeCapture={pouzita}>
      <h3 id="kalk-exekuce-title" className={s.title}>
        Vyděláš o 1&nbsp;000&nbsp;Kč víc. Kolik ti zůstane?
      </h3>
      <div className={s.fields}>
        <RangeField
          id="kalk-exekuce-mzda"
          label="Hrubá měsíční mzda"
          unit="Kč"
          value={wage}
          min={15_000}
          max={80_000}
          step={500}
          onChange={setWage}
        />
        <fieldset className={s.group}>
          <legend className={s.legend}>Počet exekucí</legend>
          <div className={s.choices}>
            {(
              [
                ["1-3", "1–3"],
                ["4+", "4 a víc"],
              ] as const
            ).map(([v, text]) => (
              <label key={v} className={`${s.choice} ${count === v ? s.choiceOn : ""}`} htmlFor={`kalk-exekuce-pocet-${v}`}>
                <input
                  id={`kalk-exekuce-pocet-${v}`}
                  className={s.radio}
                  type="radio"
                  name="kalk-exekuce-pocet"
                  value={v}
                  checked={count === v}
                  onChange={() => setCount(v)}
                />
                <span>{text}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className={`sun ${s.result}`} aria-live="polite" aria-atomic="true">
        <p className={s.lead}>Z dalších 1&nbsp;000&nbsp;Kč hrubého ti zůstane</p>
        <div className={s.cols}>
          <div className={s.col}>
            <p className={s.colHead}>Dnes</p>
            <p className={`${s.big} num`}>{nf.format(today)}&nbsp;Kč</p>
            <div className={s.track} role="img" aria-label={`Dnes zůstane ${today} z ${EXTRA} Kč`}>
              <div className={s.fill} style={{ width: `${(today / EXTRA) * 100}%` }} />
            </div>
            <p className={s.note}>
              {over
                ? `Jsi nad hranicí ${nf.format(limit)} Kč, srážka je 100 %.`
                : `Pod hranicí ${nf.format(limit)} Kč se strhává 66 %.`}
            </p>
          </div>
          <div className={s.col}>
            <p className={s.colHead}>Podle návrhu</p>
            <p className={`${s.big} num`}>{nf.format(KEEP_PLAN)}&nbsp;Kč</p>
            <div className={s.track} role="img" aria-label={`Podle návrhu zůstane ${KEEP_PLAN} z ${EXTRA} Kč`}>
              <div className={s.fill} style={{ width: `${(KEEP_PLAN / EXTRA) * 100}%` }} />
            </div>
            <p className={s.note}>Strop srážky 50 %, vždy.</p>
          </div>
        </div>
      </div>

      <p className={s.sentence}>
        590&nbsp;000 lidí v exekuci; zavedení 50% stropu používá Německo, Slovensko i Skandinávie.
      </p>

      <p className={`src ${s.source}`}>
        Studie, s.&nbsp;32; ExekuceInfo.cz, Exekutorská komora ČR. Zjednodušený model: srážka dnes 66 % příjmu a nad
        hranicí cca 31&nbsp;500 Kč hrubého (1–3 exekuce), resp. 24&nbsp;609 Kč (4 a víc) 100 %. Srážky se ve skutečnosti
        počítají z čisté mzdy, hrubou jsme pro jednoduchost brali jako ekvivalent.
      </p>
    </section>
  );
}
