"use client";

import { useState } from "react";
import { useKalkulackaPouzita } from "@/lib/analytics";
import { RangeField } from "./RangeField";
import s from "./KalkulackaSkolka.module.css";

const nf = new Intl.NumberFormat("cs-CZ");
const nf1 = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 });

const JOBS_PER_PLACE = 0.54; // pracovních míst na jedno místo ve školce
const BENEFIT_PER_PLACE = 100_000; // Kč ročně na místo (více než 100 000)
const FEE_TODAY_MAX = 7_466; // ⅓ minimální mzdy
const FEE_CAP = 3_750; // ⅙ minimální mzdy, navrhovaný strop

function money(v: number) {
  if (v >= 1e9) return `~${nf1.format(v / 1e9)} mld. Kč`;
  if (v >= 1e6) return `~${nf1.format(v / 1e6)} mil. Kč`;
  return `~${nf.format(Math.round(v))} Kč`;
}

export function KalkulackaSkolka() {
  const pouzita = useKalkulackaPouzita("skolka");
  const [places, setPlaces] = useState(100_000);
  const [fee, setFee] = useState(FEE_TODAY_MAX);

  const benefit = places * BENEFIT_PER_PLACE;
  const jobs = Math.round(places * JOBS_PER_PLACE);
  const saved = Math.max(0, fee - FEE_CAP);

  return (
    <section className={`card ${s.root}`} aria-labelledby="kalk-skolka-title" onChangeCapture={pouzita}>
      <h3 id="kalk-skolka-title" className={s.title}>
        Co přinese jedno místo ve školce?
      </h3>
      <div className={s.fields}>
        <RangeField
          id="kalk-skolka-mista"
          label="Počet nových míst"
          unit="míst"
          value={places}
          min={100}
          max={100_000}
          step={100}
          inputStep={100}
          onChange={setPlaces}
        />
        <RangeField
          id="kalk-skolka-platba"
          label="Měsíční platba rodičů dnes"
          unit="Kč"
          value={fee}
          min={0}
          max={FEE_TODAY_MAX}
          step={1}
          inputStep={100}
          onChange={setFee}
        />
      </div>

      <div className={`sun ${s.result}`} aria-live="polite" aria-atomic="true">
        <p className={s.lead}>Přínos pro veřejné rozpočty</p>
        <p className={s.resultLine}>
          <span className={`${s.big} num`}>{money(benefit)}</span>
          <span className={s.unit}>ročně</span>
        </p>
        <p className={s.sentence}>
          Nových pracovních míst: <b className="num">{nf.format(jobs)}</b>
        </p>
        <p className={`${s.sentence} ${s.sub}`}>
          {saved > 0 ? (
            <>
              Platba rodičů klesne ze <b className="num">{nf.format(fee)}&nbsp;Kč</b> na nejvýš{" "}
              <b className="num">{nf.format(FEE_CAP)}&nbsp;Kč</b> měsíčně, rodině zůstane{" "}
              <b className="num">{nf.format(saved)}&nbsp;Kč</b> měsíčně.
            </>
          ) : (
            <>Tvoje platba je už pod navrhovaným stropem {nf.format(FEE_CAP)}&nbsp;Kč měsíčně.</>
          )}
        </p>
      </div>

      <p className={`src ${s.source}`}>
        IDEA CERGE-EI 2024; studie, s.&nbsp;28–29. Jedno dodatečné místo = 0,54 pracovního místa (nejčastěji návrat
        matky do práce) a přínos více než 100&nbsp;000&nbsp;Kč ročně: daň z příjmu a odvody 58–81&nbsp;tis., daň z příjmu
        firem asi 54&nbsp;tis., DPH 12–15&nbsp;tis. Kč. Počítáme s 100&nbsp;000&nbsp;Kč na místo. Platba rodičů do
        7&nbsp;466&nbsp;Kč je třetina minimální mzdy, navrhovaný strop 3&nbsp;750&nbsp;Kč šestina.
      </p>
    </section>
  );
}
