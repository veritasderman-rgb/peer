"use client";

import { useState } from "react";
import { RangeField } from "./RangeField";
import s from "./KalkulackaPenze.module.css";

const nf = new Intl.NumberFormat("cs-CZ");
const nf1 = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const FEE_LOW = 0.3; // ilustrační „skandinávský“ poplatek, % ročně

/** Budoucí hodnota pravidelné měsíční úložky, měsíční skládání: m·((1+i)^n − 1)/i, i = (výnos − poplatek)/12. */
function futureValue(monthly: number, grossPct: number, feePct: number, years: number) {
  const i = (grossPct - feePct) / 100 / 12;
  const n = years * 12;
  return i === 0 ? monthly * n : (monthly * (Math.pow(1 + i, n) - 1)) / i;
}

export function KalkulackaPenze() {
  const [monthly, setMonthly] = useState(2_000);
  const [years, setYears] = useState(30);
  const [gross, setGross] = useState(5);
  const [fee, setFee] = useState(1.0);

  const today = futureValue(monthly, gross, fee, years);
  const low = futureValue(monthly, gross, FEE_LOW, years);
  const diff = low - today;
  const paidIn = monthly * years * 12;

  return (
    <section className={`card ${s.root}`} aria-labelledby="kalk-penze-title">
      <h3 id="kalk-penze-title" className={s.title}>
        Kolik ti sežerou poplatky penzijního fondu?
      </h3>
      <div className={s.fields}>
        <RangeField
          id="kalk-penze-ulozka"
          label="Měsíční úložka"
          unit="Kč"
          value={monthly}
          min={500}
          max={10_000}
          step={100}
          onChange={setMonthly}
        />
        <RangeField
          id="kalk-penze-roky"
          label="Let spoření"
          unit="let"
          value={years}
          min={5}
          max={40}
          step={1}
          onChange={setYears}
        />
        <RangeField
          id="kalk-penze-vynos"
          label="Roční zhodnocení před poplatky"
          unit="%"
          value={gross}
          min={2}
          max={8}
          step={0.1}
          inputStep={0.1}
          onChange={setGross}
        />
        <RangeField
          id="kalk-penze-poplatek"
          label="Roční poplatek dnes"
          unit="%"
          value={fee}
          min={0}
          max={2}
          step={0.1}
          inputStep={0.1}
          onChange={setFee}
        />
      </div>

      <div className={s.tiles}>
        <div className={s.tile}>
          <p className={s.tileLabel}>Dnes · poplatek {nf1.format(fee)}&nbsp;%</p>
          <p className={`${s.tileNum} num`}>{nf.format(Math.round(today))}</p>
          <p className={s.tileUnit}>Kč na konci spoření</p>
        </div>
        <div className={s.tile}>
          <p className={s.tileLabel}>Nízký poplatek {nf1.format(FEE_LOW)}&nbsp;%</p>
          <p className={`${s.tileNum} num`}>{nf.format(Math.round(low))}</p>
          <p className={s.tileUnit}>Kč na konci spoření</p>
        </div>
      </div>

      <div className={`sun ${s.result}`} aria-live="polite" aria-atomic="true">
        {diff > 0.5 ? (
          <p className={s.resultLine}>
            <span className={s.lead}>Při nízkém poplatku bys měl</span>
            <span className={`${s.big} num`}>o {nf.format(Math.round(diff))}&nbsp;Kč</span>
            <span className={s.unit}>víc na důchod</span>
          </p>
        ) : (
          <p className={s.sentence}>
            Při poplatku {nf1.format(fee)}&nbsp;% už nízký poplatek {nf1.format(FEE_LOW)}&nbsp;% nic nepřidá. Posuň poplatek
            dnes výš.
          </p>
        )}
        <p className={s.sentence}>
          Za {nf.format(years)}&nbsp;let vložíš <b className="num">{nf.format(paidIn)}&nbsp;Kč</b>.
        </p>
      </div>

      <p className={`src ${s.source}`}>
        IDEA CERGE-EI 2026 (studie, kap.&nbsp;2.3): reálný výnos penzijních produktů za posledních 20 let byl
        −1,3&nbsp;% ročně. Úroveň poplatků 1,0&nbsp;% dnes a 0,3&nbsp;% při „skandinávském“ modelu je ilustrační. Výpočet
        s měsíčním skládáním, nominálně, bez státního příspěvku a inflace.
      </p>
    </section>
  );
}
