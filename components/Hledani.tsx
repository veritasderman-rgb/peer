"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TYPY, hledej, priprav, type Pripraveny, type Segment, type TypZaznamu } from "@/lib/hledani";
import styles from "./Hledani.module.css";

const NAVRHY = ["hypotéka", "exekuce", "školka", "euro", "minimální mzda", "energie"];
const PO_STRANCE = 30;
const nazevTypu = Object.fromEntries(TYPY.map((t) => [t.typ, t.nazev])) as Record<TypZaznamu, string>;

function vysledku(n: number) {
  if (n === 1) return "1 výsledek";
  if (n >= 2 && n <= 4) return `${n} výsledky`;
  return `${n} výsledků`;
}

function Segmenty({ s }: { s: Segment[] }) {
  return (
    <>
      {s.map((x, i) => (x.zvyrazneno ? <mark key={i}>{x.text}</mark> : <span key={i}>{x.text}</span>))}
    </>
  );
}

/* Index se stáhne jednou za návštěvu a drží se v modulu, ať návrat na /hledat nestahuje znovu. */
let indexCache: Promise<Pripraveny[]> | null = null;
function nactiIndex(): Promise<Pripraveny[]> {
  indexCache ??= fetch("/hledat.json")
    .then((r) => {
      if (!r.ok) throw new Error(String(r.status));
      return r.json();
    })
    .then(priprav)
    .catch((e) => {
      indexCache = null;
      throw e;
    });
  return indexCache;
}

/* Statická podoba pole (fallback Suspense, než se načte JS): obyčejný formulář GET na /hledat. */
export function HledaniFallback() {
  return (
    <form action="/hledat" method="get" role="search" className={styles.form}>
      <label htmlFor="hledat-q" className="sr-only">Hledat na webu</label>
      <input id="hledat-q" className={styles.input} type="search" name="q" placeholder="Hledej slovo, třeba hypotéka" autoComplete="off" />
    </form>
  );
}

/* Hledání na /hledat: pole s ?q= v adrese (history.replaceState), výsledky živě při psaní.
   Klávesy: šipka dolů nebo Enter skočí do výsledků, šipky nahoru/dolů mezi nimi, Esc vymaže pole nebo vrátí do pole. */
export function Hledani({ temata }: { temata: Record<string, string> }) {
  const sp = useSearchParams();
  const qUrl = sp.get("q") ?? "";
  const [q, setQ] = useState(qUrl);
  const [qZUrl, setQZUrl] = useState(qUrl);
  const [index, setIndex] = useState<Pripraveny[] | null>(null);
  const [chyba, setChyba] = useState(false);
  const [filtr, setFiltr] = useState<TypZaznamu | "vse">("vse");
  const [limit, setLimit] = useState(PO_STRANCE);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const statusId = useId();

  /* Adresa se změnila zvenku (např. formulář v hlavičce odeslaný přímo na /hledat): převezmi dotaz. */
  if (qUrl !== qZUrl) {
    setQZUrl(qUrl);
    if (qUrl !== q) {
      setQ(qUrl);
      setFiltr("vse");
      setLimit(PO_STRANCE);
    }
  }

  useEffect(() => {
    let zive = true;
    nactiIndex().then(
      (ix) => zive && setIndex(ix),
      () => zive && setChyba(true),
    );
    return () => {
      zive = false;
    };
  }, []);

  const vysledky = useMemo(() => (index ? hledej(index, q) : []), [index, q]);
  const pocty = useMemo(() => {
    const m = new Map<TypZaznamu, number>();
    for (const v of vysledky) m.set(v.zaznam.typ, (m.get(v.zaznam.typ) ?? 0) + 1);
    return m;
  }, [vysledky]);
  const aktivniFiltr = filtr !== "vse" && pocty.has(filtr) ? filtr : "vse";
  const filtrovane = aktivniFiltr === "vse" ? vysledky : vysledky.filter((v) => v.zaznam.typ === aktivniFiltr);
  const zobrazene = filtrovane.slice(0, limit);
  const dotaz = q.trim();

  function zmen(v: string) {
    setQ(v);
    setLimit(PO_STRANCE);
    setFiltr("vse");
    const url = new URL(window.location.href);
    if (v.trim()) url.searchParams.set("q", v);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  const odkazy = () => Array.from(listRef.current?.querySelectorAll<HTMLAnchorElement>("a[data-vysledek]") ?? []);

  function naInput(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      const prvni = odkazy()[0];
      if (prvni) {
        e.preventDefault();
        prvni.focus();
      }
    } else if (e.key === "Escape" && q) {
      e.preventDefault();
      zmen("");
    }
  }

  function naSeznam(e: KeyboardEvent<HTMLOListElement>) {
    const vse = odkazy();
    const i = vse.indexOf(document.activeElement as HTMLAnchorElement);
    if (i === -1) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      vse[Math.min(i + 1, vse.length - 1)].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (i === 0) inputRef.current?.focus();
      else vse[i - 1].focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      inputRef.current?.focus();
    }
  }

  let stav = "";
  if (chyba) stav = "Hledání se nepodařilo načíst. Zkus obnovit stránku.";
  else if (dotaz && !index) stav = "Načítám…";
  else if (dotaz && index) stav = vysledky.length ? `Nalezeno: ${vysledku(vysledky.length)}` : "Nic jsme nenašli.";

  return (
    <div className={styles.root}>
      <form
        action="/hledat"
        method="get"
        role="search"
        aria-label="Hledání na stránce"
        className={styles.form}
        onSubmit={(e) => {
          /* Enter: výsledky už jsou vidět, tak jen skoč na první (na telefonu se tím schová klávesnice) */
          e.preventDefault();
          odkazy()[0]?.focus();
        }}
      >
        <label htmlFor="hledat-q" className="sr-only">Hledat na webu</label>
        <input
          ref={inputRef}
          id="hledat-q"
          className={styles.input}
          type="search"
          name="q"
          value={q}
          onChange={(e) => zmen(e.target.value)}
          onKeyDown={naInput}
          placeholder="Hledej slovo, třeba hypotéka"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          autoFocus
          aria-describedby={statusId}
          aria-controls={zobrazene.length ? "hledat-vysledky" : undefined}
        />
      </form>

      <p id={statusId} className={styles.status} role="status" aria-live="polite">
        {stav}
      </p>

      {!dotaz && !chyba && (
        <div className={styles.hint}>
          <p>Napiš, co tě zajímá. Hledá se v tématech, opatřeních, slovníku, otázkách i plném znění strategie, diakritiku psát nemusíš.</p>
          <p className={styles.navrhy}>
            <span className="muted">Zkus třeba:</span>
            {NAVRHY.map((n) => (
              <button key={n} type="button" className={styles.navrh} onClick={() => { zmen(n); inputRef.current?.focus(); }}>
                {n}
              </button>
            ))}
          </p>
        </div>
      )}

      {dotaz && index && vysledky.length === 0 && (
        <p className={`card ${styles.prazdne}`}>Nic jsme nenašli. Zkus jiné slovo, třeba „hypotéka“ nebo „exekuce“.</p>
      )}

      {vysledky.length > 0 && (
        <>
          {pocty.size > 1 && (
            <div className={styles.filtry} role="group" aria-label="Druh výsledku">
              <button type="button" className={styles.filtr} aria-pressed={aktivniFiltr === "vse"} onClick={() => { setFiltr("vse"); setLimit(PO_STRANCE); }}>
                Vše <span className={styles.filtrN}>{vysledky.length}</span>
              </button>
              {TYPY.filter((t) => pocty.has(t.typ)).map((t) => (
                <button
                  key={t.typ}
                  type="button"
                  className={styles.filtr}
                  aria-pressed={aktivniFiltr === t.typ}
                  onClick={() => { setFiltr(t.typ); setLimit(PO_STRANCE); }}
                >
                  {t.nazev} <span className={styles.filtrN}>{pocty.get(t.typ)}</span>
                </button>
              ))}
            </div>
          )}
          <ol id="hledat-vysledky" ref={listRef} className={styles.list} onKeyDown={naSeznam} aria-label="Výsledky hledání">
            {zobrazene.map((v) => (
              <li key={`${v.zaznam.url}|${v.zaznam.titulek}`}>
                <Link href={v.zaznam.url} className={`card ${styles.vysledek}`} data-vysledek="">
                  <span className={styles.meta}>
                    <span className={styles.typ} data-typ={v.zaznam.typ}>{nazevTypu[v.zaznam.typ]}</span>
                    {v.zaznam.tema && temata[v.zaznam.tema] && <span>{temata[v.zaznam.tema]}</span>}
                  </span>
                  <span className={styles.titulek}>
                    <Segmenty s={v.titulek} />
                  </span>
                  {v.uryvek.length > 0 && (
                    <span className={styles.uryvek}>
                      <Segmenty s={v.uryvek} />
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ol>
          {filtrovane.length > zobrazene.length && (
            <p>
              <button type="button" className="btn secondary" onClick={() => setLimit((l) => l + PO_STRANCE)}>
                Ukázat další ({filtrovane.length - zobrazene.length})
              </button>
            </p>
          )}
        </>
      )}
    </div>
  );
}
