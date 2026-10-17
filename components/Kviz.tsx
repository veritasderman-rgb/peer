"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { GarantBubble } from "./GarantBubble";
import { RangeField } from "./RangeField";
import { Sdilet } from "./Sdilet";
import { OTAZKY, KOD_MZDA_MAX, KOD_MZDA_MIN, dekoduj, vyhodnot, zakoduj, type KvizData, type Vysledek } from "@/lib/kviz";
import s from "./Kviz.module.css";

/* Kvíz „Kolik ti strategie přinese?“: pět otázek + nepovinná mzda → karty s odhadem podle studie,
   „A co to stojí“ a sdílecí obrázek. Data (KvizData) skládá server z JSONů, výpočet je lib/kviz.ts.
   Odpovědi jsou v hash adresy (#r=2-1-0-1-0-49215), aby šel výsledek znovu otevřít. Hash se neposílá
   na server, takže odpovědi (třeba „jsem v exekuci“) nekončí v logu. Sdilet.tsx hash odstraňuje, proto
   sociální sítě dostanou odkaz na kvíz a osobní čísla nese obrázek; odkaz na vlastní výsledek se dá
   zkopírovat zvlášť. */

type Props = {
  data: KvizData;
  /** absolutní adresa stránky (abs() na serveru), tiskne se do obrázku */
  url: string;
  /** krátké názvy témat pro odkazy z karet */
  nazvy: Record<string, string>;
};

const PRAZDNE = OTAZKY.map(() => null as number | null);
const PRACE_MIN_MZDA = 2; // index odpovědi „Minimální mzda nebo DPP“

function kodZHashe(): string | null {
  const m = /(?:^|[#&])r=([0-9-]+)/.exec(window.location.hash);
  return m ? m[1] : null;
}

export function Kviz({ data, url, nazvy }: Props) {
  const prumer = data.c.prumernaMzda.v;
  const [odp, setOdp] = useState<(number | null)[]>(PRAZDNE);
  const [mzda, setMzda] = useState(prumer);
  const [mzdaUpravena, setMzdaUpravena] = useState(false);
  const [zobrazit, setZobrazit] = useState(false);
  const [chyba, setChyba] = useState("");
  const [kopie, setKopie] = useState<"" | "ok" | "chyba">("");
  const nadpisRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const presun = useRef(false);

  /* otevření výsledku z adresy (i když někdo vloží jiný odkaz ve stejné kartě) */
  useEffect(() => {
    const nacti = () => {
      const kod = kodZHashe();
      const r = kod ? dekoduj(kod) : null;
      if (!r) return;
      setOdp(r.odpovedi);
      /* odkaz bez mzdy = výchozí mzda, aby výsledek odpovídal přesně tomu, co je v adrese */
      setMzda(r.mzda ?? prumer);
      setMzdaUpravena(r.mzda !== null);
      setZobrazit(true);
    };
    nacti();
    window.addEventListener("hashchange", nacti);
    return () => window.removeEventListener("hashchange", nacti);
  }, []);

  /* po přepnutí pohledu přesunout fokus, ať čtečka i klávesnice začnou nahoře */
  useEffect(() => {
    if (!presun.current) return;
    presun.current = false;
    if (zobrazit) {
      nadpisRef.current?.focus();
      nadpisRef.current?.scrollIntoView({ block: "start" });
    } else {
      const prvni = formRef.current?.querySelector<HTMLInputElement>("input:checked, input");
      prvni?.focus();
      formRef.current?.scrollIntoView({ block: "start" });
    }
  }, [zobrazit]);

  const hotovo = odp.every((v) => v !== null);
  const odpovedi = odp as number[];
  const vysledek = useMemo<Vysledek | null>(() => (hotovo ? vyhodnot(odpovedi, mzda, data) : null), [hotovo, odpovedi, mzda, data]);
  const kod = hotovo ? zakoduj(odpovedi, mzda) : "";

  const vyber = (i: number, j: number) => {
    setOdp((p) => p.map((v, k) => (k === i ? j : v)));
    setChyba("");
    /* u minimální mzdy dává smysl začít od dnešní minimální mzdy, pokud uživatel mzdu sám neměnil */
    if (OTAZKY[i].id === "prace" && !mzdaUpravena) setMzda(j === PRACE_MIN_MZDA ? data.c.minMzda.v : prumer);
  };

  const odeslat = (e: React.FormEvent) => {
    e.preventDefault();
    const chybi = odp.findIndex((v) => v === null);
    if (chybi >= 0) {
      setChyba(`Chybí odpověď na otázku ${chybi + 1}: ${OTAZKY[chybi].otazka}`);
      formRef.current?.querySelector<HTMLInputElement>(`input[name="kviz-${OTAZKY[chybi].id}"]`)?.focus();
      return;
    }
    /* adresu měnit hned v obsluze, ne v efektu: komponenty výsledku čtou adresu při připojení */
    window.history.replaceState(null, "", `#r=${zakoduj(odp as number[], mzda)}`);
    presun.current = true;
    setZobrazit(true);
  };

  const zmenit = () => {
    presun.current = true;
    setZobrazit(false);
  };

  const znovu = () => {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    setOdp(PRAZDNE);
    setMzda(prumer);
    setMzdaUpravena(false);
    presun.current = true;
    setZobrazit(false);
  };

  const kopirovat = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setKopie("ok");
    } catch {
      setKopie("chyba");
    }
    setTimeout(() => setKopie(""), 2000);
  };

  if (zobrazit && vysledek) {
    const sdiletText = `Podle Hospodářské strategie PEER by mi to mohlo přinést: ${vysledek.sdilet
      .map((r) => `${r.cislo} ${r.popis}`)
      .join("; ")}. Odhad podle studie, spočítej si svůj.`;
    return (
      <section className={s.vysledek} aria-labelledby="kviz-vysledek">
        <div className={s.hlava}>
          <p className="eyebrow">Tvůj odhad podle studie</p>
          <h2 id="kviz-vysledek" ref={nadpisRef} tabIndex={-1} className={s.nadpis}>
            Co by ti strategie mohla přinést
          </h2>
          <p className={`muted ${s.souhrn}`}>{vysledek.souhrn}</p>
        </div>

        <GarantBubble kdo="rada" mood="happy" size={130} className={s.bobr}>
          {vysledek.bobr}
        </GarantBubble>

        <ol className={s.karty}>
          {vysledek.karty.map((k) => (
            <li key={k.id} className={`card ${s.karta} ${k.prumer ? s.kartaPrumer : ""}`}>
              <p className={s.stitek}>{k.prumer ? "Průměr, ne osobní slib" : "Odhad podle studie"}</p>
              <h3 className={s.kartaNadpis}>{k.nadpis}</h3>
              <p className={`display ${s.hodnota}`}>{k.hodnota}</p>
              <p className={s.poznamka}>{k.poznamka}</p>
              <p className={`src ${s.zdroj}`}>
                <b>Zdroj:</b> {k.zdroj}. <span className={s.pole}>Data: {k.pole.join(" · ")}</span>
              </p>
              <Link className={s.odkaz} href={k.href}>
                {k.slug === "dopad" ? "Velký obraz" : `Téma ${nazvy[k.slug] ?? k.slug}`} →
              </Link>
            </li>
          ))}
        </ol>

        <section className={`card ${s.stoji}`} aria-labelledby="kviz-stoji">
          <h3 id="kviz-stoji" className={s.stojiNadpis}>
            A co to stojí
          </h3>
          <p className={s.stojiUvod}>
            Co se pro tebe změní k horšímu nebo co zaplatíš, podle tvých odpovědí. Studie celkový účet nesčítá; částky
            jsou tak, jak je uvádí (často za celou zemi, ne za domácnost).
          </p>
          <ul className={s.stojiSeznam}>
            {vysledek.stoji.map((p) => (
              <li key={p.pole}>
                <span className={s.proc}>{p.proc}</span> {p.co}
                {p.kolik && <span className={`num ${s.kolik}`}>{p.kolik}</span>}
                <span className={`src ${s.stojiZdroj}`}>
                  {" "}
                  <Link href={p.href}>{nazvy[p.slug] ?? p.slug}: a co to stojí</Link> · Data: {p.pole}
                </span>
              </li>
            ))}
          </ul>
          <p className="src">
            <b>Zdroj:</b> data/zaplaceni.json, část „kdo zaplatí“. Celý přehled na stránce{" "}
            <Link href="/zaplaceni">Jak se to zaplatí</Link>.
          </p>
        </section>

        <section className={`card ${s.sdilet}`} aria-labelledby="kviz-sdilet">
          <h3 id="kviz-sdilet" className={s.stojiNadpis}>
            Sdílej svůj výsledek
          </h3>
          <KvizObrazek radky={vysledek.sdilet} url={url} />
          <Sdilet key={kod} titulek="Kolik ti strategie přinese?" text={sdiletText} />
          <p className={`src ${s.sdiletPozn}`}>
            Tlačítka sítí sdílí odkaz na kvíz, tvoje čísla nese obrázek. Odkaz přímo na tvůj výsledek obsahuje tvoje
            odpovědi:{" "}
            <button type="button" className={s.textBtn} onClick={kopirovat}>
              {kopie === "ok" ? "zkopírováno" : kopie === "chyba" ? "nejde zkopírovat" : "kopírovat odkaz na můj výsledek"}
            </button>
          </p>
        </section>

        <div className={s.akce}>
          <button type="button" className="btn" onClick={zmenit}>
            Změnit odpovědi
          </button>
          <button type="button" className="btn secondary" onClick={znovu}>
            Začít znovu
          </button>
        </div>
      </section>
    );
  }

  const zodpovezeno = odp.filter((v) => v !== null).length;
  return (
    <form ref={formRef} className={s.form} onSubmit={odeslat} noValidate aria-describedby="kviz-pocet">
      {OTAZKY.map((q, i) => (
        <fieldset key={q.id} className={s.otazka} role="radiogroup">
          <legend className={s.legend}>
            <span className={`num ${s.cislo}`} aria-hidden="true">
              {i + 1}
            </span>
            {q.otazka}
          </legend>
          <div className={s.chips}>
            {q.moznosti.map((m, j) => (
              <label key={j} className={s.chip}>
                <input
                  className={s.radio}
                  type="radio"
                  name={`kviz-${q.id}`}
                  value={j}
                  checked={odp[i] === j}
                  onChange={() => vyber(i, j)}
                />
                <span className={s.face}>{m}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <fieldset className={s.otazka}>
        <legend className={s.legend}>
          <span className={`num ${s.cislo}`} aria-hidden="true">
            6
          </span>
          Kolik vyděláváš? <span className={s.nepovinne}>(nepovinné)</span>
        </legend>
        <RangeField
          id="kviz-mzda"
          label="Hrubá měsíční mzda"
          unit="Kč"
          value={mzda}
          min={KOD_MZDA_MIN}
          max={KOD_MZDA_MAX}
          step={1}
          inputStep={1000}
          onChange={(v) => {
            setMzda(v);
            setMzdaUpravena(true);
          }}
        />
        <p className={`src ${s.mzdaPozn}`}>
          Výchozí je průměrná mzda 2025, {new Intl.NumberFormat("cs-CZ").format(prumer)}&nbsp;Kč (data/zeny.json). Mzdu
          používáme jen u minimální mzdy, exekucí a ceny bytu. Nikam se neposílá, zůstává v tvém prohlížeči.
        </p>
      </fieldset>

      <div className={s.akce}>
        <button type="submit" className="btn sun">
          Ukaž můj odhad
        </button>
        <span id="kviz-pocet" className={`muted ${s.pocet}`}>
          Zodpovězeno {zodpovezeno} z {OTAZKY.length}
        </span>
      </div>
      <p className={s.chyba} role="alert">
        {chyba}
      </p>
    </form>
  );
}

/* ---------- sdílecí obrázek 1080 × 1080 ---------- */

const SUN = "#fec934";
const INK = "#000000";
const DISPLAY = '"Bebas Neue", "Roboto Condensed", Arial, sans-serif';
const DATA = '"Roboto Condensed", Roboto, Arial, sans-serif';

function zalom(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const slova = text.split(" ");
  const radky: string[] = [];
  let r = "";
  for (const w of slova) {
    const zkus = r ? `${r} ${w}` : w;
    if (r && ctx.measureText(zkus).width > maxW) {
      radky.push(r);
      r = w;
    } else r = zkus;
  }
  if (r) radky.push(r);
  return radky;
}

/** Nastaví font a zmenší ho, dokud se text nevejde na jeden řádek. */
function vejdiSe(ctx: CanvasRenderingContext2D, text: string, vaha: string, velikost: number, rodina: string, maxW: number) {
  let v = velikost;
  ctx.font = `${vaha} ${v}px ${rodina}`;
  while (v > 20 && ctx.measureText(text).width > maxW) {
    v -= 2;
    ctx.font = `${vaha} ${v}px ${rodina}`;
  }
  return v;
}

async function kresli(cv: HTMLCanvasElement, radky: Vysledek["sdilet"], adresa: string) {
  const W = 1080;
  const H = 1080;
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext("2d");
  if (!ctx) return;

  const nadpis = "Podle Hospodářské strategie PEER by mi to mohlo přinést".toUpperCase();
  const vsechenText = nadpis + radky.map((r) => r.cislo + r.popis).join("") + adresa;
  try {
    if (document.fonts) {
      await Promise.all([
        document.fonts.load(`400 80px "Bebas Neue"`, vsechenText),
        document.fonts.load(`700 40px "Roboto Condensed"`, vsechenText),
        document.fonts.load(`400 40px "Roboto Condensed"`, vsechenText),
      ]);
    }
  } catch {
    /* bez webových fontů se kreslí záložním písmem */
  }

  const M = 72;
  const maxW = W - 2 * M;
  const PATA = 168;

  /* rozvržení: zmenšovat, dokud se všechno nevejde nad patičku */
  let k = 1;
  let rozvrh: { y: number; kresli: () => void }[] = [];
  for (let pokus = 0; pokus < 12; pokus++) {
    rozvrh = [];
    let y = M;
    const eyebrow = 30 * k;
    rozvrh.push({
      y,
      kresli: () => {
        ctx.font = `700 ${eyebrow}px ${DATA}`;
        ctx.fillText("ČESKO MÁ NA VÍC! · KOLIK MI STRATEGIE PŘINESE?", M, 0);
      },
    });
    y += eyebrow * 1.9;
    const hv = 88 * k;
    ctx.font = `400 ${hv}px ${DISPLAY}`;
    const hr = zalom(ctx, nadpis, maxW);
    hr.forEach((t, i) => {
      rozvrh.push({
        y: y + i * hv * 0.95,
        kresli: () => {
          ctx.font = `400 ${hv}px ${DISPLAY}`;
          ctx.fillText(t, M, 0);
        },
      });
    });
    y += hr.length * hv * 0.95 + 36 * k;
    for (const r of radky) {
      const ly = y;
      rozvrh.push({ y: ly, kresli: () => ctx.fillRect(M, -4, maxW, 4) });
      y += 22 * k;
      const cv0 = 104 * k;
      const cislo = r.cislo.toUpperCase();
      const cvel = vejdiSe(ctx, cislo, "400", cv0, DISPLAY, maxW);
      const cy = y;
      rozvrh.push({
        y: cy,
        kresli: () => {
          ctx.font = `400 ${cvel}px ${DISPLAY}`;
          ctx.fillText(cislo, M, 0);
        },
      });
      y += cvel * 0.92;
      const pv = 36 * k;
      ctx.font = `400 ${pv}px ${DATA}`;
      const pr = zalom(ctx, r.popis, maxW).slice(0, 2);
      pr.forEach((t, i) => {
        rozvrh.push({
          y: y + i * pv * 1.2,
          kresli: () => {
            ctx.font = `400 ${pv}px ${DATA}`;
            ctx.fillText(t, M, 0);
          },
        });
      });
      y += pr.length * pv * 1.2 + 26 * k;
    }
    if (y <= H - PATA - 24 || k < 0.55) break;
    k *= 0.93;
  }

  ctx.fillStyle = SUN;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = INK;
  ctx.textBaseline = "top";
  for (const r of rozvrh) {
    ctx.save();
    ctx.translate(0, r.y);
    r.kresli();
    ctx.restore();
  }

  /* patička: černý pruh s upozorněním a adresou */
  ctx.fillStyle = INK;
  ctx.fillRect(0, H - PATA, W, PATA);
  ctx.fillStyle = "#ffffff";
  ctx.font = `400 32px ${DATA}`;
  ctx.fillText("Odhad podle studie, ne slib. Spočítej si svůj:", M, H - PATA + 34);
  ctx.fillStyle = SUN;
  vejdiSe(ctx, adresa, "700", 46, DATA, maxW);
  ctx.fillText(adresa, M, H - PATA + 86);
}

function KvizObrazek({ radky, url }: { radky: Vysledek["sdilet"]; url: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [hotovo, setHotovo] = useState(false);
  const adresa = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const popis = `Podle Hospodářské strategie PEER by mi to mohlo přinést: ${radky.map((r) => `${r.cislo} ${r.popis}`).join("; ")}. ${adresa}`;

  useEffect(() => {
    let zivy = true;
    setHotovo(false);
    if (ref.current)
      kresli(ref.current, radky, adresa).then(() => {
        if (zivy) setHotovo(true);
      });
    return () => {
      zivy = false;
    };
  }, [radky, adresa]);

  const stahni = useCallback(() => {
    const cv = ref.current;
    if (!cv) return;
    cv.toBlob((b) => {
      if (!b) return;
      const u = URL.createObjectURL(b);
      const a = document.createElement("a");
      a.href = u;
      a.download = "kolik-mi-strategie-prinese.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(u), 1000);
    }, "image/png");
  }, []);

  return (
    <div className={s.obrazek}>
      <canvas ref={ref} className={s.platno} width={1080} height={1080} role="img" aria-label={popis} />
      <button type="button" className="btn sun" onClick={stahni} disabled={!hotovo}>
        Stáhnout obrázek
      </button>
    </div>
  );
}
