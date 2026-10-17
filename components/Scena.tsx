"use client";

import { useLayoutEffect, useState, type CSSProperties } from "react";
import { animate } from "motion/react";
import type { Scena as ScenaSpec } from "@/lib/topics";
import s from "./Scena.module.css";

/* Vizuální scéna ke kroku příběhu (typ Scena v lib/topics.ts): počítadlo, pruhy, „vafle“ a předtím/potom.
   Všechno pohání jeden průběh 0 → 1, který se spustí, když `active` přejde na true. SSR, první render
   a prefers-reduced-motion = finální stav (průběh 1); při deaktivaci se scéna nechá v konečném stavu,
   takže při scrollování zpět nic neskáče. Velikosti písma jsou v jednotkách kontejneru (cqi), takže stejná
   scéna sedí do 300px sloupce i do velké scény na /pribeh. */

const REDUCE = "(prefers-reduced-motion: reduce)";

/** Průběh 0 → 1 (lineární) po aktivaci; jinak 1. */
export function usePrubeh(active: boolean, duration = 1.4, delay = 0): number {
  const [p, setP] = useState(1);
  useLayoutEffect(() => {
    if (!active) return;
    if (window.matchMedia(REDUCE).matches) return;
    setP(0);
    const c = animate(0, 1, { duration, delay, ease: "linear", onUpdate: setP });
    return () => {
      c.stop();
      setP(1);
    };
  }, [active, duration, delay]);
  return p;
}

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
/** lokální průběh i-tého prvku při postupném nástupu (prvky se překrývají) */
const krok = (p: number, i: number, n: number, delka = 0.55) => {
  const start = n <= 1 ? 0 : (i * (1 - delka)) / (n - 1);
  return Math.min(1, Math.max(0, (p - start) / delka));
};

const desetin = (v: number) => {
  const t = String(v);
  const i = t.indexOf(".");
  return i < 0 ? 0 : Math.min(2, t.length - i - 1);
};

/** české formátování s úzkou nezlomitelnou mezerou mezi řády (68 000, 4 000) */
export function cz(v: number, d = 0): string {
  return new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: d, maximumFractionDigits: d }).format(v).replace(/ /g, " ");
}

function Cislo({ scena, active }: { scena: Extract<ScenaSpec, { typ: "cislo" }>; active: boolean }) {
  const d = scena.desetinna ?? 0;
  const p = usePrubeh(active, 1.5);
  const final = cz(scena.hodnota, d);
  const shown = cz(scena.hodnota * easeOut(p), d);
  return (
    <>
      <p className={s.sr}>{`${scena.predpona ?? ""}${final}${scena.jednotka ? ` ${scena.jednotka}` : ""}. ${scena.popis}`}</p>
      <div className={s.cislo} aria-hidden="true">
        {scena.predpona ? <span className={s.predpona}>{scena.predpona}</span> : null}
        {/* finální hodnota drží šířku, animovaná leží přes ni: číslo při počítání necuká */}
        <span className={`num ${s.stack}`}>
          <span className={s.ghost}>{final}</span>
          <span className={s.live}>{shown}</span>
        </span>
        {scena.jednotka ? <span className={s.jednotka}>{scena.jednotka}</span> : null}
      </div>
      <p className={s.popis} aria-hidden="true">{scena.popis}</p>
    </>
  );
}

function Srovnani({ scena, active }: { scena: Extract<ScenaSpec, { typ: "srovnani" }>; active: boolean }) {
  const n = scena.polozky.length;
  const p = usePrubeh(active, 0.9 + n * 0.25);
  const max = Math.max(...scena.polozky.map((x) => x.hodnota), 0) || 1;
  const d = Math.max(0, ...scena.polozky.map((x) => desetin(x.hodnota)));
  const j = scena.jednotka ? ` ${scena.jednotka}` : "";
  return (
    <>
      {scena.nadpis ? <p className={s.nadpis}>{scena.nadpis}</p> : null}
      <p className={s.sr}>{scena.polozky.map((x) => `${x.nazev}: ${cz(x.hodnota, d)}${j}`).join("; ")}</p>
      <ul className={s.pruhy} aria-hidden="true">
        {scena.polozky.map((x, i) => {
          const t = easeOut(krok(p, i, n));
          return (
            <li key={x.nazev} className={s.pruh} data-hi={x.zvyrazni || undefined}>
              <span className={s.pruhNazev}>{x.nazev}</span>
              <span className={`num ${s.pruhHodnota}`}>{cz(x.hodnota * t, d)}{j}</span>
              <span className={s.draha}>
                <span className={s.vypln} style={{ transform: `scaleX(${(x.hodnota / max) * t})` }} />
              </span>
            </li>
          );
        })}
      </ul>
      {scena.popis ? <p className={s.popis}>{scena.popis}</p> : null}
    </>
  );
}

function Podil({ scena, active }: { scena: Extract<ScenaSpec, { typ: "podil" }>; active: boolean }) {
  const z = Math.max(1, Math.round(scena.z ?? 100));
  const plne = Math.min(z, Math.round(scena.hodnota));
  const p = usePrubeh(active, Math.min(2, 0.6 + plne * 0.015));
  const nyni = Math.round(plne * p);
  const d = desetin(scena.hodnota);
  const final = z === 100 ? `${cz(scena.hodnota, d)} %` : `${cz(scena.hodnota, d)} z ${cz(z)}`;
  const shown = z === 100 ? `${cz(scena.hodnota * p, d)} %` : `${cz(scena.hodnota * p, d)} z ${cz(z)}`;
  const cols = Math.min(10, z);
  return (
    <>
      <p className={s.sr}>{`${final}. ${scena.popis}`}</p>
      <div className={s.podilHlava} aria-hidden="true">
        <span className={`num ${s.stack} ${s.podilCislo}`}>
          <span className={s.ghost}>{final}</span>
          <span className={s.live}>{shown}</span>
        </span>
        <p className={s.popis}>{scena.popis}</p>
      </div>
      <div className={s.vafle} style={{ "--cols": cols } as CSSProperties} aria-hidden="true">
        {Array.from({ length: z }, (_, i) => (
          <span key={i} className={s.bunka} data-on={i < nyni || undefined} />
        ))}
      </div>
    </>
  );
}

function PredtimPotom({ scena, active }: { scena: Extract<ScenaSpec, { typ: "predtim-potom" }>; active: boolean }) {
  const p = usePrubeh(active, 1.1);
  const t = easeOut(krok(p, 1, 2, 0.6));
  return (
    <>
      <p className={s.sr}>{`Dnes: ${scena.predtim.hodnota}, ${scena.predtim.popis}. Potom: ${scena.potom.hodnota}, ${scena.potom.popis}.`}</p>
      <div className={s.pp} aria-hidden="true" style={{ "--t": t } as CSSProperties}>
        <div className={s.ppKarta}>
          <span className={s.ppStitek}>Dnes</span>
          <span className={`num ${s.ppHodnota}`}>{scena.predtim.hodnota}</span>
          <span className={s.ppPopis}>{scena.predtim.popis}</span>
        </div>
        <span className={s.sipka}>
          <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
            <path d="M4 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className={`${s.ppKarta} ${s.ppPotom}`}>
          <span className={s.ppStitek}>Potom</span>
          <span className={`num ${s.ppHodnota}`}>{scena.potom.hodnota}</span>
          <span className={s.ppPopis}>{scena.potom.popis}</span>
        </div>
      </div>
    </>
  );
}

export function Scena({ scena, active = true, className }: { scena: ScenaSpec; active?: boolean; className?: string }) {
  let obsah: React.ReactNode;
  switch (scena.typ) {
    case "cislo":
      obsah = <Cislo scena={scena} active={active} />;
      break;
    case "srovnani":
      obsah = <Srovnani scena={scena} active={active} />;
      break;
    case "podil":
      obsah = <Podil scena={scena} active={active} />;
      break;
    case "predtim-potom":
      obsah = <PredtimPotom scena={scena} active={active} />;
      break;
  }
  return (
    <figure className={["card", s.root, className].filter(Boolean).join(" ")} data-typ={scena.typ}>
      {obsah}
    </figure>
  );
}

export default Scena;
