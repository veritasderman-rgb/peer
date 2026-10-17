"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Garant } from "@/components/Garant";
import { PiktogramOdznak, jePiktogram } from "@/components/Piktogram";
import { Scena, cz, usePrubeh } from "@/components/Scena";
import { useVyskaHlavicky } from "@/components/Story";
import type { PribehData, PribehSceneId } from "@/data/pribeh";
import s from "./page.module.css";

/* Příběh strategie: textové kroky vpravo (na telefonu pod scénou) projíždějí kolem přilepené scény.
   Aktivní krok = poslední, jehož horní hrana přejela „čtecí čáru“ (55 % výšky okna, na telefonu 72 %).
   Scéna se mění prolnutím (AnimatePresence); spící kapitál a náběh přínosu jsou řízené přímo scrollem
   (useScroll + useTransform). Čísla a texty jsou z data/pribeh.ts (fakta ze studie podle id). */

type Krok = { si: number; ki: number; id: PribehSceneId };

function Bohaty({ t }: { t: string }) {
  const casti = t.split(/\*\*(.+?)\*\*/g);
  return <>{casti.map((x, i) => (i % 2 ? <b key={i}>{x}</b> : <Fragment key={i}>{x}</Fragment>))}</>;
}

/* ---------- scény na pódiu ---------- */

function StageHook({ kc }: { kc: number }) {
  return (
    <div className={s.col}>
      <motion.div className={`${s.avatarL} ${s.rada}`} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}>
        <Garant kdo="rada" size={120} label="Pirátská expertní ekonomická rada" />
      </motion.div>
      <Scena scena={{ typ: "cislo", hodnota: kc, jednotka: "Kč", popis: "ročně navíc pro každého, kdo pracuje (v průměru, na konci dekády)" }} active />
    </div>
  );
}

function StageParadox({ eci, hdpPozice }: { eci: number; hdpPozice: string }) {
  return (
    <div className={s.col}>
      <p className={s.stageNadpis}>Co umíme vs. jak žijeme</p>
      <div className={s.vs}>
        <motion.div className={`card ${s.vsKarta} ${s.vsHi}`} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <span className={`display ${s.vsCislo}`}>{eci}.</span>
          <span className={s.vsPopis}>nejsložitější ekonomika světa</span>
        </motion.div>
        <motion.span className={`display ${s.vsSlovo}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>vs.</motion.span>
        <motion.div className={`card ${s.vsKarta}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
          <span className={`display ${s.vsCislo}`}>{hdpPozice.replace(/^kolem\s*/, "~")}.</span>
          <span className={s.vsPopis}>místo v HDP na obyvatele (životní úroveň)</span>
        </motion.div>
      </div>
    </div>
  );
}

function PastKarta({ p, i, on }: { p: PribehData["past"][number]; i: number; on: boolean }) {
  const t = usePrubeh(on, 1.1);
  const ease = 1 - Math.pow(1 - t, 3);
  const jednotka = p.jednotka === "%" ? " %" : ` ${p.jednotka}`;
  return (
    <motion.div className={`card ${s.pastKarta}`} data-on={on || undefined} animate={{ opacity: on ? 1 : 0.28, y: on ? 0 : 8 }} transition={{ duration: 0.4 }}>
      <motion.div className={s.avatarS} animate={{ scale: on ? 1 : 0.5, opacity: on ? 1 : 0 }} transition={{ type: "spring", stiffness: 300, damping: 16, delay: on ? 0.1 : 0 }}>
        {jePiktogram(p.slug) ? <PiktogramOdznak id={p.slug} size={56} varianta={on ? "zluty" : "svetly"} /> : <Garant kdo={p.garant} size={56} />}
      </motion.div>
      <div className={s.pastText}>
        <span className={s.pastCislo}>
          <span className="display">{on ? cz(p.hodnota * ease) : "?"}</span>
          <span className={s.pastJednotka}>{jednotka}</span>
        </span>
        <span className={s.pastPopis}>{p.popis}</span>
        <Link href={`/${p.slug}`} className={s.pastOdkaz} tabIndex={on ? undefined : -1}>
          {p.tema} →
        </Link>
      </div>
      <span className={s.pastPoradi} aria-hidden="true">{i + 1}</span>
    </motion.div>
  );
}

function StagePast({ past, sub }: { past: PribehData["past"]; sub: number }) {
  return (
    <div className={s.col}>
      <p className={s.stageNadpis}>Tři čísla, tři pasti</p>
      <div className={s.pastList}>
        {past.map((p, i) => (
          <PastKarta key={p.slug} p={p} i={i} on={i <= sub} />
        ))}
      </div>
    </div>
  );
}

function StageProc({ proc }: { proc: PribehData["proc"] }) {
  return (
    <div className={s.col}>
      <p className={s.stageNadpis}>Řetěz montovny</p>
      <ol className={s.retez}>
        {proc.map((c, i) => (
          <Fragment key={c.nazev}>
            {i > 0 && (
              <motion.li aria-hidden="true" className={s.retezSipka} initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} transition={{ delay: i * 0.45 - 0.15, duration: 0.25 }}>
                ↓
              </motion.li>
            )}
            <motion.li className={`card ${s.retezKarta}`} data-posledni={i === proc.length - 1 || undefined} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.45, duration: 0.4 }}>
              <span className={s.retezCislo}>{i + 1}</span>
              <span className={s.retezText}>
                <b>{c.nazev}</b>
                <span>{c.popis}</span>
              </span>
            </motion.li>
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

function StageSmery({ smery, sub }: { smery: PribehData["smery"]; sub: number }) {
  return (
    <div className={s.col}>
      <div className={s.smery}>
        {smery.map((sm, i) => (
          <motion.div
            key={sm.nazev}
            className={`card ${s.smer}`}
            data-on={i === sub || undefined}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: i === sub ? 1 : 0.55, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
          >
            <div className={s.smerHlava}>
              <span className={`display ${s.smerNazev}`}>
                <span className={s.smerCislo}>{i + 1}</span>
                {sm.nazev}
              </span>
              <span className={s.smerGaranti} aria-hidden="true">
                {sm.garanti.map((g) => (
                  <Garant key={g} kdo={g} size={36} />
                ))}
              </span>
            </div>
            <ul className={s.chips}>
              {sm.temata.map((t) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className={s.chip}>{t.nazev}</Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StageKapital({ k, sub, p, reduce }: { k: PribehData["kapital"]; sub: number; p: MotionValue<number>; reduce: boolean }) {
  const n = Math.round(k.mld / 100); // 1 čtvereček = 100 mld. Kč
  const vzhuru = useTransform(p, [0.45, 0.92], [0, n], { clamp: true });
  const [bdi, setBdi] = useState(0);
  useMotionValueEvent(vzhuru, "change", (v) => setBdi(Math.round(v)));
  useEffect(() => setBdi(Math.round(vzhuru.get())), [vzhuru]);
  const pocet = sub < 1 ? 0 : reduce ? n : bdi;
  const hotovo = pocet >= n;
  return (
    <div className={s.col}>
      <div className={s.kapHlava}>
        <div className={s.avatarM}>
          <PiktogramOdznak id="kapital" size={88} varianta={pocet > n / 2 ? "zluty" : "svetly"} />
        </div>
        <Scena scena={{ typ: "cislo", hodnota: k.mld, jednotka: "mld. Kč", popis: "spí na účtech českých střadatelů" }} active />
      </div>
      <div className={s.kapVafle} style={{ "--n": n } as CSSProperties} aria-hidden="true">
        {Array.from({ length: n }, (_, i) => (
          <span key={i} className={s.kapBunka} data-on={i < pocet || undefined} />
        ))}
      </div>
      <p className={s.kapLegenda}>
        <span><i className={s.legSpi} /> spí</span>
        <span><i className={s.legPracuje} /> pracuje</span>
        <span className="muted">1 čtvereček = 100 mld. Kč</span>
      </p>
      <motion.p className={s.kapZdvoj} animate={{ opacity: hotovo ? 1 : 0, scale: hotovo ? 1 : 0.9 }} transition={{ duration: 0.35 }}>
        ×2 za {k.let} let už při 3 % ročně
      </motion.p>
    </div>
  );
}

function Sloupec({ b, i, max, p, reduce, startRok }: { b: PribehData["dopad"]["nabeh"][number]; i: number; max: number; p: MotionValue<number>; reduce: boolean; startRok: number }) {
  const od = 0.04 + i * 0.055;
  const vyska = useTransform(p, [od, od + 0.08], [0, 1], { clamp: true });
  const pruhl = useTransform(vyska, [0.5, 1], [0, 1]);
  return (
    <div className={s.sloupec}>
      <motion.span className={`num ${s.sloupecHodnota}`} data-odhad={b.odhad || undefined} style={{ opacity: reduce ? 1 : pruhl }}>
        {b.odhad ? "~" : ""}
        {cz(b.mld)}
      </motion.span>
      <span className={s.sloupecDraha}>
        <motion.span
          className={s.sloupecVypln}
          data-odhad={b.odhad || undefined}
          data-cil={b.rok === 10 || undefined}
          style={{ height: `${(b.mld / max) * 100}%`, scaleY: reduce ? 1 : vyska }}
        />
      </span>
      <span className={s.sloupecRok}>{startRok + b.rok - 1}</span>
    </div>
  );
}

function StageDopad({ d, sub, p, reduce }: { d: PribehData["dopad"]; sub: number; p: MotionValue<number>; reduce: boolean }) {
  const max = Math.max(...d.nabeh.map((b) => b.mld));
  const kroky = [
    { v: `+${d.pb} p. b.`, t: "růstu ročně" },
    { v: `${cz(d.hdpMld)} mld.`, t: "Kč HDP navíc ročně" },
    { v: `+${cz(d.rozpocetMld)} mld.`, t: "Kč do rozpočtu ročně" },
  ];
  return (
    <div className={s.col}>
      <ol className={s.dopadKroky}>
        {kroky.map((k, i) => (
          <motion.li key={k.v} className={s.dopadKrok} data-on={i <= sub || undefined} animate={{ opacity: i <= sub ? 1 : 0.3, scale: i === sub ? 1.04 : 1 }} transition={{ duration: 0.3 }}>
            <span className={`display ${s.dopadV}`}>{k.v}</span>
            <span className={s.dopadT}>{k.t}</span>
          </motion.li>
        ))}
      </ol>
      <figure className={`card ${s.graf}`}>
        <div className={s.sloupce} role="img" aria-label={`Přínos navíc ročně v mld. Kč: ${d.nabeh.map((b) => `${d.startRok + b.rok - 1}: ${b.odhad ? "asi " : ""}${b.mld}`).join(", ")}`}>
          {d.nabeh.map((b, i) => (
            <Sloupec key={b.rok} b={b} i={i} max={max} p={p} reduce={reduce} startRok={d.startRok} />
          ))}
        </div>
        <figcaption className="src">Mld. Kč navíc oproti dnešnímu růstu, každý rok. Šedé sloupce (roky 5–9) jsou dopočítané mezi rokem 4 a cílem.</figcaption>
      </figure>
    </div>
  );
}

function StageTy({ kc }: { kc: number }) {
  return (
    <div className={s.col}>
      <motion.div className={`${s.avatarL} ${s.rada}`} initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 240, damping: 18 }}>
        <Garant kdo="rada" size={120} label="Pirátská expertní ekonomická rada" />
      </motion.div>
      <Scena scena={{ typ: "cislo", hodnota: kc, jednotka: "Kč", popis: "ročně navíc ve mzdě nebo platu, v průměru" }} active />
    </div>
  );
}

function StageOutro({ garanti }: { garanti: PribehData["garanti"] }) {
  return (
    <div className={s.col}>
      <p className={s.stageNadpis}>PEER · Pirátská expertní ekonomická rada</p>
      <ul className={s.tym}>
        {garanti.map((g, i) => (
          <motion.li key={g.id} className={s.tymClen} initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 + i * 0.08 }}>
            <Garant kdo={g.id} size={72} label={g.jmeno} />
            <span className={s.tymJmeno}>{g.jmeno}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- hlavní komponenta ---------- */

export function Pribeh({ data }: { data: PribehData }) {
  const kroky: Krok[] = data.sceny.flatMap((sc, si) => sc.kroky.map((_, ki) => ({ si, ki, id: sc.id })));
  const [active, setActive] = useState(0);
  const els = useRef<(HTMLDivElement | null)[]>([]);
  const storyRef = useRef<HTMLDivElement>(null);
  const kapitalRef = useRef<HTMLDivElement>(null);
  const dopadRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  useVyskaHlavicky();

  const { scrollY } = useScroll();
  const { scrollYProgress: celkem } = useScroll({ target: storyRef, offset: ["start start", "end end"] });
  const { scrollYProgress: kapitalP } = useScroll({ target: kapitalRef as RefObject<HTMLElement>, offset: ["start 0.6", "end 0.6"] });
  const { scrollYProgress: dopadP } = useScroll({ target: dopadRef as RefObject<HTMLElement>, offset: ["start 0.6", "end 0.6"] });

  const prepocti = useCallback(() => {
    const cara = window.innerHeight * (window.matchMedia("(max-width: 760px)").matches ? 0.72 : 0.55);
    let a = 0;
    els.current.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top < cara) a = i;
    });
    setActive(a);
  }, []);
  useMotionValueEvent(scrollY, "change", prepocti);
  useEffect(() => {
    prepocti();
    window.addEventListener("resize", prepocti);
    return () => window.removeEventListener("resize", prepocti);
  }, [prepocti]);

  const k = kroky[active] ?? kroky[0];
  const scena = data.sceny[k.si];
  const prvniKrok = (si: number) => kroky.findIndex((x) => x.si === si);
  const jdi = (si: number) => els.current[prvniKrok(si)]?.scrollIntoView({ block: "start" });

  let stage: React.ReactNode;
  switch (k.id) {
    case "hook": stage = <StageHook kc={data.hook.kc} />; break;
    case "paradox": stage = <StageParadox eci={data.paradox.eci} hdpPozice={data.paradox.hdpPozice} />; break;
    case "past": stage = <StagePast past={data.past} sub={k.ki} />; break;
    case "proc": stage = <StageProc proc={data.proc} />; break;
    case "smery": stage = <StageSmery smery={data.smery} sub={k.ki} />; break;
    case "kapital": stage = <StageKapital k={data.kapital} sub={k.ki} p={kapitalP} reduce={reduce} />; break;
    case "dopad": stage = <StageDopad d={data.dopad} sub={k.ki} p={dopadP} reduce={reduce} />; break;
    case "ty": stage = <StageTy kc={data.hook.kc} />; break;
    case "outro": stage = <StageOutro garanti={data.garanti} />; break;
  }

  const prechod = reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <MotionConfig skipAnimations={reduce}>
    <div className={s.story} ref={storyRef}>
      <div className={s.stage}>
        <div className={s.stageBar} aria-hidden="true">
          <motion.span className={s.stageBarFill} style={{ scaleX: celkem }} />
        </div>
        <p className={s.stageStitek} aria-hidden="true">
          <span className="num">{k.si + 1}/{data.sceny.length}</span> {scena.stitek}
        </p>
        <div className={s.stageBody}>
          <AnimatePresence initial={false}>
            <motion.div
              key={k.id}
              className={s.stageScena}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={prechod}
            >
              {stage}
            </motion.div>
          </AnimatePresence>
        </div>
        <nav className={s.tecky} aria-label="Kapitoly příběhu">
          {data.sceny.map((sc, si) => (
            <button
              key={sc.id}
              type="button"
              className={s.tecka}
              data-done={si < k.si || undefined}
              aria-current={si === k.si ? "step" : undefined}
              aria-label={`${si + 1}. ${sc.stitek}: ${sc.nadpis}`}
              onClick={() => jdi(si)}
            />
          ))}
        </nav>
      </div>

      <div className={s.text}>
        {data.sceny.map((sc, si) => (
          <section
            key={sc.id}
            className={s.kapitola}
            aria-labelledby={`p-${sc.id}`}
            ref={sc.id === "kapital" ? kapitalRef : sc.id === "dopad" ? dopadRef : undefined}
          >
            {sc.kroky.map((kr, ki) => {
              const idx = prvniKrok(si) + ki;
              return (
                <div
                  key={ki}
                  ref={(el) => {
                    els.current[idx] = el;
                  }}
                  className={s.krok}
                  data-krok={idx}
                  data-active={idx === active || undefined}
                >
                  <div className={`card ${s.krokKarta}`}>
                    {ki === 0 && (
                      <>
                        <p className="eyebrow">
                          {si + 1}/{data.sceny.length} · {sc.stitek}
                        </p>
                        <h2 id={`p-${sc.id}`} className={s.krokNadpis}>{sc.nadpis}</h2>
                      </>
                    )}
                    {kr.odstavce.map((o, i) => (
                      <p key={i} className={s.odstavec}>
                        <Bohaty t={o} />
                      </p>
                    ))}
                    {kr.odkazy && (
                      <p className={s.odkazy}>
                        {kr.odkazy.map((o) => (
                          <Link key={o.href} href={o.href} className={o.hlavni ? "btn sun" : "btn secondary"}>
                            {o.text}
                          </Link>
                        ))}
                      </p>
                    )}
                    {sc.id === "smery" && (
                      <ul className={s.krokChips}>
                        {data.smery[ki]?.temata.map((t) => (
                          <li key={t.slug}>
                            <Link href={`/${t.slug}`} className={s.chip}>{t.nazev}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                    {sc.id === "past" && (
                      <p className={s.krokOdkaz}>
                        <Link href={`/${data.past[ki].slug}`}>Celé téma: {data.past[ki].tema} →</Link>
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </section>
        ))}
      </div>
    </div>
    </MotionConfig>
  );
}
