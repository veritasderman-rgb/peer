"use client";

import { useState } from "react";
import { useKalkulackaPouzita } from "@/lib/analytics";
import { RangeField } from "./RangeField";
import s from "./KalkulackaObec.module.css";

const nf = new Intl.NumberFormat("cs-CZ");
const nf1 = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

export function KalkulackaObec() {
  const pouzita = useKalkulackaPouzita("obec");
  const [flats, setFlats] = useState(40);
  const [area, setArea] = useState(70);
  const [rate, setRate] = useState(5000);

  const totalArea = flats * area;
  const total = totalArea * rate;
  const big = total >= 1_000_000 ? `${nf1.format(total / 1_000_000)} mil. Kč` : `${nf.format(total)} Kč`;

  return (
    <section className={`card ${s.root}`} aria-labelledby="kalk-obec-title" onChangeCapture={pouzita}>
      <h3 id="kalk-obec-title" className={s.title}>
        Kolik by obec dostala za nové byty?
      </h3>
      <div className={s.fields}>
        <RangeField id="kalk-obec-byty" label="Počet nových bytů" value={flats} min={1} max={500} step={1} onChange={setFlats} />
        <RangeField id="kalk-obec-plocha" label="Průměrná plocha bytu" unit="m²" value={area} min={40} max={120} step={1} onChange={setArea} />
        <RangeField id="kalk-obec-sazba" label="Sazba" unit="Kč/m²" value={rate} min={3000} max={8000} step={100} inputStep={500} onChange={setRate} />
      </div>

      <div className={`sun ${s.result}`} aria-live="polite" aria-atomic="true">
        <p className={`${s.big} num`}>{big}</p>
        <p className={`${s.calc} num`}>
          {nf.format(total)}&nbsp;Kč = {nf.format(flats)}&nbsp;bytů × {nf.format(area)}&nbsp;m² × {nf.format(rate)}&nbsp;Kč/m²
          <span className={s.calcSub}> (celkem {nf.format(totalArea)}&nbsp;m² užitné plochy)</span>
        </p>
        <p className={s.sentence}>Peníze jsou účelově vázané na školy, dopravu a sítě.</p>
      </div>

      <p className={`src ${s.source}`}>Zdroj: návrh RUD ze strategie, 3&nbsp;000–8&nbsp;000&nbsp;Kč za m² užitné plochy.</p>
    </section>
  );
}
