"use client";

import { useState } from "react";
import { useKalkulackaPouzita } from "@/lib/analytics";
import { RangeField } from "./RangeField";
import s from "./KalkulackaKupon.module.css";

const nf = new Intl.NumberFormat("cs-CZ");

const PER_PERSON = 2_170; // Kč ročně na osobu při povolence 60 EUR (5 000 Kč ÷ 2,3 osoby, zaokrouhleno)
const BASE_PRICE = 60; // EUR za povolenku

export function KalkulackaKupon() {
  const pouzita = useKalkulackaPouzita("kupon");
  const [people, setPeople] = useState(2);
  const [price, setPrice] = useState(60);

  const perYear = Math.round(PER_PERSON * people * (price / BASE_PRICE));

  return (
    <section className={`card ${s.root}`} aria-labelledby="kalk-kupon-title" onChangeCapture={pouzita}>
      <h3 id="kalk-kupon-title" className={s.title}>
        Energetický kupón: kolik dostaneš zpátky?
      </h3>
      <p className={s.badge}>Orientační odhad</p>
      <div className={s.fields}>
        <RangeField
          id="kalk-kupon-lide"
          label="Lidí v domácnosti"
          unit="osob"
          value={people}
          min={1}
          max={6}
          step={1}
          onChange={setPeople}
        />
        <RangeField
          id="kalk-kupon-cena"
          label="Cena povolenky"
          unit="EUR / t"
          value={price}
          min={40}
          max={120}
          step={1}
          onChange={setPrice}
        />
      </div>

      <div className={`sun ${s.result}`} aria-live="polite" aria-atomic="true">
        <p className={s.resultLine}>
          <span className={s.lead}>Tvoje domácnost dostane cca</span>
          <span className={`${s.big} num`}>{nf.format(perYear)}&nbsp;Kč</span>
          <span className={s.unit}>ročně</span>
        </p>
        <p className={s.sentence}>Bez žádosti, na výplatní pásce, v důchodu nebo v dávkách.</p>
        <p className={s.sentence}>
          <b>Kdo topí a jezdí úsporně, dostane víc, než zaplatil.</b>
        </p>
      </div>

      <p className={`src ${s.source}`}>
        Orientační odhad podle studie, s.&nbsp;67: při ceně povolenky kolem 60&nbsp;EUR vychází zhruba 5&nbsp;000&nbsp;Kč
        ročně na průměrnou domácnost. Web to přepočítává na osobu (průměrná domácnost podle ČSÚ má asi 2,3 osoby, tedy
        2&nbsp;170&nbsp;Kč na osobu) a lineárně škáluje cenou povolenky (cena ÷ 60). Plán Pirátů k povolenkám počítal pro
        rok 2025 s 2&nbsp;250&nbsp;Kč na osobu, tedy 9&nbsp;000&nbsp;Kč pro čtyřčlennou rodinu; tady používáme přepočet
        ze strategie, skutečná částka závisí na ceně povolenky a spotřebě.
      </p>
    </section>
  );
}
