"use client";

import { useState } from "react";
import { useKalkulackaPouzita } from "@/lib/analytics";
import { RangeField } from "./RangeField";
import s from "./KalkulackaEuro.module.css";

const nf = new Intl.NumberFormat("cs-CZ");
const nf1 = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** Měsíční splátka anuitního úvěru: P·r / (1 − (1+r)^−n), r = roční sazba / 12, n = roky · 12. */
function payment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  return r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function KalkulackaEuro() {
  const pouzita = useKalkulackaPouzita("euro");
  const [loan, setLoan] = useState(4_700_000);
  const [years, setYears] = useState(30);
  const [rateCz, setRateCz] = useState(4.94);
  const [rateEu, setRateEu] = useState(3.69);

  const payCz = payment(loan, rateCz, years);
  const payEu = payment(loan, rateEu, years);
  const monthly = payCz - payEu;
  const total = monthly * years * 12;

  return (
    <section className={`card ${s.root}`} aria-labelledby="kalk-euro-title" onChangeCapture={pouzita}>
      <h3 id="kalk-euro-title" className={s.title}>
        Kolik bych platil za hypotéku s eurem?
      </h3>
      <div className={s.fields}>
        <RangeField
          id="kalk-euro-uver"
          label="Výše úvěru"
          unit="Kč"
          value={loan}
          min={500_000}
          max={12_000_000}
          step={100_000}
          onChange={setLoan}
        />
        <RangeField
          id="kalk-euro-roky"
          label="Splatnost"
          unit="let"
          value={years}
          min={5}
          max={40}
          step={1}
          onChange={setYears}
        />
        <RangeField
          id="kalk-euro-sazba-cr"
          label="Sazba v Česku"
          unit="% p. a."
          value={rateCz}
          min={3}
          max={7}
          step={0.01}
          inputStep={0.01}
          onChange={setRateCz}
        />
        <RangeField
          id="kalk-euro-sazba-eu"
          label="Sazba v eurozóně (SK)"
          unit="% p. a."
          value={rateEu}
          min={2}
          max={6}
          step={0.01}
          inputStep={0.01}
          onChange={setRateEu}
        />
      </div>

      <div className={s.tiles}>
        <div className={s.tile}>
          <p className={s.tileLabel}>Česko · {nf1.format(rateCz)}&nbsp;%</p>
          <p className={`${s.tileNum} num`}>{nf.format(Math.round(payCz))}</p>
          <p className={s.tileUnit}>Kč měsíčně</p>
        </div>
        <div className={s.tile}>
          <p className={s.tileLabel}>Slovensko · {nf1.format(rateEu)}&nbsp;%</p>
          <p className={`${s.tileNum} num`}>{nf.format(Math.round(payEu))}</p>
          <p className={s.tileUnit}>Kč měsíčně</p>
        </div>
      </div>

      <div className={`sun ${s.result}`} aria-live="polite" aria-atomic="true">
        {monthly > 0 ? (
          <>
            <p className={s.resultLine}>
              <span className={s.lead}>Na úrocích bys ušetřil</span>
              <span className={`${s.big} num`}>{nf.format(Math.round(total))}&nbsp;Kč</span>
            </p>
            <p className={s.sentence}>
              To je <b className="num">{nf.format(Math.round(monthly))}&nbsp;Kč</b> každý měsíc po dobu{" "}
              <b className="num">{nf.format(years)}&nbsp;let</b>.
            </p>
          </>
        ) : (
          <p className={s.sentence}>Při těchto sazbách by euro na úrocích nic neušetřilo. Zkus sazbu v eurozóně snížit.</p>
        )}
      </div>

      <p className={`src ${s.source}`}>
        Splátky počítané jako anuita. Výchozí sazby: nabídka ČSOB s 3letou fixací v Česku a na Slovensku, červen 2026
        (studie, s.&nbsp;50). Slovenská splátka je přepočtená na koruny, bez poplatků a pojištění.
      </p>
    </section>
  );
}
