"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import styles from "./MapaKraju.module.css";

/* Kartogram krajů: čtrnáct dlaždic v pevné mřížce, která zhruba kopíruje sousedství krajů.
   Není to zeměpisná mapa a nepoužívá žádná externí geodata. Barva dlaždice = hodnota vybrané metriky
   (pětistupňová stupnice, rovnoměrné pásy mezi nejnižší a nejvyšší hodnotou ze čtrnácti krajů). */

export type Kraj = { id: string; nazev: string; nuts: string };

export type Metrika = {
  id: string;
  slug: string;
  tema: string;
  temaNazev: string;
  nazev: string;
  jednotka: string;
  desetiny: number;
  kompaktDelitel?: number;
  kompaktJednotka?: string;
  popis: string;
  zdrojNazev: string;
  zdrojUrl: string;
  zdroj: string;
  zeStudie: boolean;
  poznamka: string;
  narodni: number;
  narodniPopis: string;
  lepsiJe: "min" | "max";
  strategie: string;
  hodnoty: Record<string, number>;
};

type Props = { kraje: Kraj[]; metriky: Metrika[] };

const STORAGE_KEY = "peer-moje-kraj";
const KROKU = 5;
const TILE = 72;
const GAP = 6;
const SLOUPCU = 5;
const RADKU = 3;
const VB_W = SLOUPCU * TILE + (SLOUPCU - 1) * GAP;
const VB_H = RADKU * TILE + (RADKU - 1) * GAP;

/* Pozice dlaždic [řádek, sloupec] a popisky (zalomené ručně, aby se vešly do dlaždice). */
const DLAZDICE: Record<string, { r: number; c: number; popisek: string[] }> = {
  KVK: { r: 0, c: 0, popisek: ["Karlovar-", "ský"] },
  ULK: { r: 0, c: 1, popisek: ["Ústecký"] },
  LBK: { r: 0, c: 2, popisek: ["Liberecký"] },
  HKK: { r: 0, c: 3, popisek: ["Králové-", "hradecký"] },
  PLK: { r: 1, c: 0, popisek: ["Plzeňský"] },
  PHA: { r: 1, c: 1, popisek: ["Praha"] },
  STC: { r: 1, c: 2, popisek: ["Středo-", "český"] },
  PAK: { r: 1, c: 3, popisek: ["Pardu-", "bický"] },
  OLK: { r: 1, c: 4, popisek: ["Olomoucký"] },
  JHC: { r: 2, c: 0, popisek: ["Jiho-", "český"] },
  VYS: { r: 2, c: 1, popisek: ["Vysočina"] },
  JHM: { r: 2, c: 2, popisek: ["Jiho-", "moravský"] },
  ZLK: { r: 2, c: 3, popisek: ["Zlínský"] },
  MSK: { r: 2, c: 4, popisek: ["Moravsko-", "slezský"] },
};

const NBSP = " ";

function cislo(v: number, desetiny: number): string {
  const [cele, zlomek] = Math.abs(v).toFixed(desetiny).split(".");
  const skupiny = cele.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return (v < 0 ? "−" : "") + (zlomek ? `${skupiny},${zlomek}` : skupiny);
}

/* Plná hodnota: „5,5 %“, „46 877 Kč“. */
function plna(m: Metrika, v: number): string {
  return `${cislo(v, m.desetiny)}${NBSP}${m.jednotka}`;
}

/* Krátká hodnota do dlaždice a legendy: „5,5 %“, „46,9“ (tisíce Kč). */
function kratka(m: Metrika, v: number): string {
  if (m.kompaktDelitel) return cislo(v / m.kompaktDelitel, 1);
  return `${cislo(v, m.desetiny)}${NBSP}${m.jednotka}`;
}

function krok(m: Metrika, v: number, min: number, max: number): number {
  if (max === min) return 0;
  return Math.min(KROKU - 1, Math.floor(((v - min) / (max - min)) * KROKU));
}

/* Pořadí od nejlepšího (1) podle toho, zda je lepší nižší, nebo vyšší hodnota. */
function poradi(m: Metrika, id: string): number {
  const v = m.hodnoty[id];
  return (
    1 +
    Object.values(m.hodnoty).filter((x) => (m.lepsiJe === "min" ? x < v : x > v)).length
  );
}

function srovnani(m: Metrika, v: number): { text: string; smer: "lepsi" | "horsi" | "stejne" } {
  const diff = v - m.narodni;
  const abs = Math.abs(diff);
  if (Number(abs.toFixed(m.desetiny)) === 0) return { text: "na úrovni průměru ČR", smer: "stejne" };
  const jedn = m.jednotka === "%" ? "p. b." : m.jednotka;
  const lepsi = (m.lepsiJe === "max") === diff > 0;
  return {
    text: `o ${cislo(abs, m.desetiny)}${NBSP}${jedn} ${diff > 0 ? "nad" : "pod"} průměrem ČR`,
    smer: lepsi ? "lepsi" : "horsi",
  };
}

export function MapaKraju({ kraje, metriky }: Props) {
  const [metrikaId, setMetrikaId] = useState(metriky[0].id);
  const [krajId, setKrajId] = useState<string | null>(null);

  /* Zapamatovaný kraj se čte až po načtení v prohlížeči, aby se shodoval server a první vykreslení. */
  useEffect(() => {
    try {
      const ulozeny = window.localStorage.getItem(STORAGE_KEY);
      if (ulozeny && kraje.some((k) => k.id === ulozeny)) setKrajId(ulozeny);
    } catch {
      /* úložiště může být zakázané, stránka funguje i bez něj */
    }
  }, [kraje]);

  function vyber(id: string | null) {
    setKrajId(id);
    try {
      if (id) window.localStorage.setItem(STORAGE_KEY, id);
      else window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* viz výše */
    }
  }

  const metrika = metriky.find((m) => m.id === metrikaId) ?? metriky[0];
  const kraj = kraje.find((k) => k.id === krajId) ?? null;

  const { min, max, pasy } = useMemo(() => {
    const hodnoty = Object.values(metrika.hodnoty);
    const lo = Math.min(...hodnoty);
    const hi = Math.max(...hodnoty);
    const sirka = (hi - lo) / KROKU;
    return {
      min: lo,
      max: hi,
      pasy: Array.from({ length: KROKU }, (_, i) => ({ od: lo + i * sirka, do: lo + (i + 1) * sirka })),
    };
  }, [metrika]);

  const razeni = useMemo(
    () =>
      [...kraje].sort((a, b) =>
        metrika.lepsiJe === "min"
          ? metrika.hodnoty[a.id] - metrika.hodnoty[b.id]
          : metrika.hodnoty[b.id] - metrika.hodnoty[a.id],
      ),
    [kraje, metrika],
  );

  const poradiDlazdic = useMemo(
    () => [...kraje].sort((a, b) => DLAZDICE[a.id].r - DLAZDICE[b.id].r || DLAZDICE[a.id].c - DLAZDICE[b.id].c),
    [kraje],
  );

  function klavesa(e: KeyboardEvent<SVGGElement>, id: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      vyber(id);
    }
  }

  const zdrojStitek = (m: Metrika) => (
    <span className={`${styles.stitek} ${m.zeStudie ? styles.stitekStudie : styles.stitekZdroj}`}>
      {m.zeStudie ? "ze studie" : "aktuální data zdroje, ne ze studie"}
    </span>
  );

  return (
    <div className={styles.root}>
      <div className={styles.controls}>
        <div className={styles.chips} role="group" aria-label="Co zobrazit na mapě">
          {metriky.map((m) => (
            <button
              key={m.id}
              type="button"
              className={`${styles.chip} ${m.id === metrika.id ? styles.chipOn : ""}`}
              aria-pressed={m.id === metrika.id}
              onClick={() => setMetrikaId(m.id)}
            >
              {m.nazev}
            </button>
          ))}
        </div>
        <label className={styles.pick}>
          <span>Tvůj kraj</span>
          <select value={krajId ?? ""} onChange={(e) => vyber(e.target.value || null)}>
            <option value="">Vyber kraj</option>
            {kraje.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nazev}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.grid}>
        <div className={`card ${styles.mapBox}`}>
          <div className={styles.mapHead}>
            <h3>{metrika.nazev}</h3>
            {zdrojStitek(metrika)}
          </div>
          <p className={styles.popis}>{metrika.popis}</p>

          <svg
            className={styles.svg}
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            role="group"
            aria-label={`Kartogram krajů ČR: ${metrika.nazev}. Dlaždice odpovídají krajům, barva udává hodnotu.`}
          >
            {poradiDlazdic.map((k) => {
              const p = DLAZDICE[k.id];
              const v = metrika.hodnoty[k.id];
              const s = krok(metrika, v, min, max);
              const x = p.c * (TILE + GAP);
              const y = p.r * (TILE + GAP);
              const vybrany = k.id === krajId;
              const dvouradkovy = p.popisek.length > 1;
              return (
                <g
                  key={k.id}
                  className={`${styles.tile} ${styles[`step${s}`]} ${vybrany ? styles.tileOn : ""}`}
                  transform={`translate(${x} ${y})`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={vybrany}
                  aria-label={`${k.nazev}: ${plna(metrika, v)}, ${poradi(metrika, k.id)}. z ${kraje.length} od nejlepšího`}
                  onClick={() => vyber(k.id)}
                  onKeyDown={(e) => klavesa(e, k.id)}
                >
                  <rect className={styles.bg} width={TILE} height={TILE} rx={10} />
                  <rect className={styles.ring} x={-2} y={-2} width={TILE + 4} height={TILE + 4} rx={12} />
                  {p.popisek.map((radek, i) => (
                    <text
                      key={radek}
                      className={styles.label}
                      x={TILE / 2}
                      y={(dvouradkovy ? 17 : 25) + i * 13.5}
                      textAnchor="middle"
                    >
                      {radek}
                    </text>
                  ))}
                  <text className={styles.value} x={TILE / 2} y={57} textAnchor="middle">
                    {kratka(metrika, v)}
                  </text>
                  {vybrany ? <circle className={styles.dot} cx={TILE - 9} cy={9} r={4.5} /> : null}
                </g>
              );
            })}
          </svg>

          <div className={styles.legend}>
            <p className={styles.legendTitle}>
              {metrika.kompaktDelitel ? `Hodnota v dlaždici: ${metrika.kompaktJednotka} měsíčně` : `Hodnota v dlaždici: ${metrika.jednotka}`}
              {" · tmavší = vyšší hodnota · "}
              {metrika.lepsiJe === "min" ? "lepší je nižší" : "lepší je vyšší"}
            </p>
            <ol className={styles.swatches} aria-label="Stupnice barev">
              {pasy.map((p, i) => (
                <li key={i} className={`${styles.swatch} ${styles[`step${i}`]}`}>
                  <span className={styles.swatchColor} aria-hidden="true" />
                  <span className={styles.swatchText}>
                    {kratka(metrika, p.od).replace(`${NBSP}${metrika.jednotka}`, "")}
                    {"–"}
                    {kratka(metrika, p.do).replace(`${NBSP}${metrika.jednotka}`, "")}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={`card ${styles.detail}`} aria-live="polite">
          {kraj ? (
            <>
              <div className={styles.detailHead}>
                <h3 className={styles.detailName}>{kraj.nazev}</h3>
                <button type="button" className={styles.forget} onClick={() => vyber(null)}>
                  Zapomenout kraj
                </button>
              </div>
              <ul className={styles.rows}>
                {metriky.map((m) => {
                  const v = m.hodnoty[kraj.id];
                  const sr = srovnani(m, v);
                  return (
                    <li key={m.id} className={`${styles.row} ${m.id === metrika.id ? styles.rowOn : ""}`}>
                      <div className={styles.rowTop}>
                        <button type="button" className={styles.rowName} onClick={() => setMetrikaId(m.id)}>
                          {m.nazev}
                        </button>
                        <span className={`num ${styles.rowValue}`}>{plna(m, v)}</span>
                      </div>
                      <p className={styles.rowSub}>
                        <span className={styles[sr.smer]}>{sr.text}</span>
                        {" · "}
                        <span className="num">
                          {poradi(m, kraj.id)}. z {kraje.length}
                        </span>{" "}
                        od nejlepšího
                      </p>
                      <p className={styles.rowNar}>
                        ČR: <span className="num">{plna(m, m.narodni)}</span> ({m.narodniPopis})
                      </p>
                    </li>
                  );
                })}
              </ul>
              <div className={styles.strategie}>
                <h4>Co s tím chce strategie: {metrika.nazev.toLowerCase()}</h4>
                <p>{metrika.strategie}</p>
                <Link href={`/${metrika.tema}`} className={styles.temaLink}>
                  Celé téma: {metrika.temaNazev} →
                </Link>
              </div>
            </>
          ) : (
            <div className={styles.empty}>
              <h3 className={styles.detailName}>Vyber svůj kraj</h3>
              <p>
                Klepni na dlaždici na mapě nebo kraj vyber ve výběru nahoře. Ukážu ti jeho čísla vedle průměru ČR a to, co s nimi
                chce udělat strategie. Kraj si zapamatuju jen ve tvém prohlížeči.
              </p>
              <p className={styles.rowNar}>
                Nejlepší a nejhorší kraj pro „{metrika.nazev.toLowerCase()}“:{" "}
                <b>{razeni[0].nazev}</b> ({plna(metrika, metrika.hodnoty[razeni[0].id])}) a{" "}
                <b>{razeni[razeni.length - 1].nazev}</b> ({plna(metrika, metrika.hodnoty[razeni[razeni.length - 1].id])}).
              </p>
            </div>
          )}
        </div>
      </div>

      <details className={`card ${styles.tabulka}`}>
        <summary>Všech čtrnáct krajů v tabulce</summary>
        <div className={styles.tableWrap}>
          <table>
            <caption className="sr-only">Hodnoty metrik podle krajů, řazeno podle vybrané metriky: {metrika.nazev}</caption>
            <thead>
              <tr>
                <th scope="col">Kraj</th>
                {metriky.map((m) => (
                  <th scope="col" key={m.id} className={m.id === metrika.id ? styles.colOn : undefined}>
                    {m.nazev}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {razeni.map((k) => (
                <tr key={k.id} className={k.id === krajId ? styles.trOn : undefined}>
                  <th scope="row">{k.nazev}</th>
                  {metriky.map((m) => (
                    <td key={m.id} className={`num ${m.id === metrika.id ? styles.colOn : ""}`}>
                      {plna(m, m.hodnoty[k.id])}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className={styles.trNar}>
                <th scope="row">Celá ČR</th>
                {metriky.map((m) => (
                  <td key={m.id} className="num">
                    {plna(m, m.narodni)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}

export default MapaKraju;
