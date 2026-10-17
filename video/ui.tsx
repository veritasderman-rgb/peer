import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GarantSvg, popisMluvciho } from "../components/GarantSvg";
import { jmenoMluvciho, type Mluvci } from "../lib/garanti";
import { fitSize, textWidth } from "./measure";
import { C, F, type Layout } from "./theme";
import { activeSegment, XFADE, type SceneId, type Segment } from "./timeline";

/* ---------- layout ---------- */

export const LayoutContext = createContext<Layout | null>(null);
export function useLayout(): Layout {
  const l = useContext(LayoutContext);
  if (!l) throw new Error("LayoutContext chybí");
  return l;
}

/* ---------- animační pomůcky ---------- */

const clampOpts = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 → 1 pružina od snímku `start` (lokálně ve scéně). */
export function useEnter(start: number, damping = 16) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: frame - start, fps, config: { damping, stiffness: 140, mass: 0.8 } });
}

/** Styl pro „naběhnutí“ prvku zespodu. */
export function rise(p: number, dist = 36): CSSProperties {
  return { opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * dist}px)` };
}

/** Krátký přechod mezi scénami: stará scéna v první půlce překryvu odjede doleva a zmizí,
    nová v druhé půlce přijede zprava (sousední scény se o XFADE snímků překrývají). */
export function SceneFade({ duration, first, last, children }: { duration: number; first?: boolean; last?: boolean; children: ReactNode }) {
  const frame = useCurrentFrame();
  const half = XFADE / 2;
  const inP = first ? 1 : interpolate(frame, [half, XFADE], [0, 1], { ...clampOpts, easing: Easing.out(Easing.cubic) });
  const outP = last ? 0 : interpolate(frame, [duration - XFADE, duration - half], [0, 1], { ...clampOpts, easing: Easing.in(Easing.cubic) });
  const x = (1 - inP) * 48 - outP * 48;
  return (
    <AbsoluteFill style={{ opacity: Math.min(inP, 1 - outP), transform: `translateX(${x}px)` }}>
      {children}
    </AbsoluteFill>
  );
}

/** Textová plocha podle rozložení (široké: vpravo, reel: nahoře). */
export function TextArea({ children, align, justify = "center", style }: { children: ReactNode; align?: "start" | "center"; justify?: "start" | "center"; style?: CSSProperties }) {
  const L = useLayout();
  const a = align ?? (L.reel ? "center" : "start");
  return (
    <div
      style={{
        position: "absolute",
        left: L.text.x,
        top: L.text.y,
        width: L.text.w,
        height: L.text.h,
        display: "flex",
        flexDirection: "column",
        justifyContent: justify === "center" ? "center" : "flex-start",
        alignItems: a === "center" ? "center" : "flex-start",
        textAlign: a === "center" ? "center" : "left",
        gap: L.gap,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- typografie ---------- */

export function Eyebrow({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  const L = useLayout();
  return (
    <div
      style={{
        fontFamily: F.display,
        fontSize: L.fs.eyebrow,
        lineHeight: 1,
        letterSpacing: "0.04em",
        color: C.cyan,
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Česká typografie pro zalamování: nezlomitelná mezera za jednopísmennými předložkami/spojkami
    a mezi číslem a následujícím slovem („3 %“, „6 měsíců“, „4,7 mil.“). */
export function tidy(t: string): string {
  return t
    .replace(/(^|[\s(])([vkszouaiVKSZOUAI]) /g, "$1$2\u00a0")
    .replace(/(^|[\s(])([vkszouaiVKSZOUAI]) /g, "$1$2\u00a0")
    .replace(/(\d) (?=\S)/g, "$1\u00a0");
}

export function Body({ children, size, weight = 400, style }: { children: ReactNode; size?: number; weight?: 400 | 700; style?: CSSProperties }) {
  const L = useLayout();
  return (
    <div style={{ fontFamily: F.body, fontSize: size ?? L.fs.base, fontWeight: weight, lineHeight: 1.22, color: C.ink, ...style }}>
      {typeof children === "string" ? tidy(children) : children}
    </div>
  );
}

/* ---------- čísla ---------- */

type ParsedNum = { prefix: string; value: number; decimals: number; suffix: string; grouped: boolean };

/** „15,1“, „+246 %“, „200 000“, „2,7×“ → číselná část + okolní text. */
export function parseNum(s: string): ParsedNum | null {
  const m = s.match(/^(\D*?)(\d{1,3}(?:[ \u00a0]\d{3})+|\d+)(?:,(\d+))?(.*)$/);
  if (!m) return null;
  const intPart = m[2].replace(/[ \u00a0]/g, "");
  const dec = m[3] ?? "";
  return { prefix: m[1], value: Number(dec ? `${intPart}.${dec}` : intPart), decimals: dec.length, suffix: m[4], grouped: /[ \u00a0]/.test(m[2]) };
}

export function formatNum(v: number, decimals: number, grouped: boolean): string {
  const [i, d] = v.toFixed(decimals).split(".");
  const ig = grouped ? i.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0") : i;
  return d ? `${ig},${d}` : ig;
}

/** Velké číslo v Bebas Neue na žluté ploše; volitelně „naběhne“ od nuly. Zmenší se, aby se vešlo do šířky. */
export function NumberBlock({ text, size, maxWidth, countFrom, countFrames = 24, style }: { text: string; size: number; maxWidth?: number; countFrom?: number; countFrames?: number; style?: CSSProperties }) {
  const frame = useCurrentFrame();
  const L = useLayout();
  const nb = (t: string) => t.replace(/ /g, "\u00a0");
  const fontSize = fitSize(nb(text), F.display, 400, size, maxWidth ?? L.text.w, 0.3);
  let shown = nb(text);
  const parsed = parseNum(text);
  /* počítadlo jen u „čistých“ čísel (ne „300–400 mld.“ nebo „4,94 % vs. 3,69 %“) */
  if (parsed && countFrom !== undefined && !/\d/.test(parsed.suffix)) {
    const v = interpolate(frame, [countFrom, countFrom + countFrames], [0, parsed.value], { ...clampOpts, easing: Easing.out(Easing.cubic) });
    shown = nb(`${parsed.prefix}${formatNum(v, parsed.decimals, parsed.grouped)}${parsed.suffix}`);
  }
  return (
    <div
      style={{
        display: "inline-block",
        fontFamily: F.display,
        fontSize,
        lineHeight: 0.86,
        padding: "0.1em 0.14em 0.02em",
        background: C.sun,
        color: C.ink,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {shown}
    </div>
  );
}

/* ---------- trvalé vrstvy ---------- */

export function Header({ titulek }: { titulek: string }) {
  const L = useLayout();
  const fs = L.fs.small;
  const badge = <span style={{ background: C.sun, padding: "0.12em 0.3em 0.02em", whiteSpace: "nowrap" }}>Strategie za minutu</span>;
  const base: CSSProperties = { position: "absolute", fontFamily: F.display, lineHeight: 1, letterSpacing: "0.04em", color: C.ink };
  if (!L.reel) {
    const badgeW = textWidth("Strategie za minutu", F.display, 400, fs) + fs * 1.2;
    const tfs = fitSize(titulek, F.display, 400, fs, L.W - 160 - badgeW, 0, 32);
    return (
      <div style={{ ...base, top: 56, left: 80, fontSize: fs, whiteSpace: "nowrap" }}>
        {badge}
        <span style={{ color: C.cyan, marginLeft: "0.45em", fontSize: tfs }}>{titulek}</span>
      </div>
    );
  }
  /* reel: na jeden řádek, když se vejde; jinak titulek pod štítkem */
  const oneLine = fitSize(`Strategie za minutu   ${titulek}`, F.display, 400, fs, L.W - 120, 0.6) >= fs;
  return (
    <div
      style={{
        ...base,
        top: 84,
        left: 60,
        width: L.W - 120,
        fontSize: fs,
        display: "flex",
        flexDirection: oneLine ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: oneLine ? "0.45em" : 14,
        textAlign: "center",
      }}
    >
      {badge}
      <span style={{ color: C.cyan, fontSize: oneLine ? fs : Math.round(fs * 0.86) }}>{titulek}</span>
    </div>
  );
}

export function ProgressBar({ total }: { total: number }) {
  const frame = useCurrentFrame();
  const L = useLayout();
  const h = L.reel ? 14 : 12;
  const p = Math.min(1, frame / Math.max(1, total - 1));
  return (
    <div style={{ position: "absolute", left: 0, bottom: 0, width: L.W, height: h, background: "rgba(0,0,0,0.08)" }}>
      <div style={{ width: `${p * 100}%`, height: "100%", background: C.sun }} />
    </div>
  );
}

/** Značka garanta kapitoly (nebo rady) jako trvalá vrstva dole: monogram, jméno a role.
    Na začátku videa přijede zespodu, jinak stojí v klidu. */
export function GarantLayer({ segments, kdo }: { segments: Segment[]; kdo: Mluvci }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  void activeSegment(segments, frame);
  const intro = spring({ frame, fps, config: { damping: 14, stiffness: 120 } });
  const size = L.bobr.size;
  const y = (1 - intro) * (size + 80);
  const { role: popis } = popisMluvciho(kdo);
  const jmeno = kdo === "rada" ? "PEER" : jmenoMluvciho(kdo);
  const sirkaJmenovky = L.reel ? L.W - 120 - size - 30 : Math.min(900, L.W - 200 - size - 30);

  return (
    <div
      style={{
        position: "absolute",
        left: L.bobr.cx - size / 2,
        top: L.bobr.bottom - size,
        display: "flex",
        alignItems: "center",
        gap: Math.round(size * 0.2),
        transform: `translateY(${y}px)`,
        opacity: intro,
      }}
    >
      <GarantSvg kdo={kdo} size={size} fontDisplay={F.display} fontBody={F.body} style={{ display: "block", flex: "none" }} />
      <div style={{ width: sirkaJmenovky, fontFamily: F.display, fontSize: Math.round(L.fs.small * 0.9), lineHeight: 1.1, color: C.ink, letterSpacing: "0.03em", whiteSpace: "nowrap" }}>
        <div>{jmeno}</div>
        <div style={{ fontFamily: F.body, fontSize: Math.round(L.fs.small * 0.6), color: C.cyan, fontWeight: 700, letterSpacing: "0.02em", marginTop: 6 }}>{popis}</div>
      </div>
    </div>
  );
}
