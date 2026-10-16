import { createContext, useContext, type CSSProperties, type ReactNode } from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { BobrSvg, type BobrMood } from "../components/BobrSvg";
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

/** Krátké prolnutí scény na začátku a na konci (sousední scény se o XFADE překrývají). */
export function SceneFade({ duration, first, last, children }: { duration: number; first?: boolean; last?: boolean; children: ReactNode }) {
  const frame = useCurrentFrame();
  const fadeIn = first ? 1 : interpolate(frame, [0, XFADE], [0, 1], clampOpts);
  const fadeOut = last ? 1 : interpolate(frame, [duration - XFADE, duration], [1, 0], clampOpts);
  const slide = first ? 0 : interpolate(frame, [0, XFADE], [28, 0], { ...clampOpts, easing: Easing.out(Easing.cubic) });
  const slideOut = last ? 0 : interpolate(frame, [duration - XFADE, duration], [0, -28], { ...clampOpts, easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut), transform: `translateX(${slide + slideOut}px)` }}>
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

export function Body({ children, size, weight = 400, style }: { children: ReactNode; size?: number; weight?: 400 | 700; style?: CSSProperties }) {
  const L = useLayout();
  return (
    <div style={{ fontFamily: F.body, fontSize: size ?? L.fs.base, fontWeight: weight, lineHeight: 1.22, color: C.ink, ...style }}>
      {children}
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
        fontVariantNumeric: "tabular-nums",
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
  const badge = <span style={{ background: C.sun, padding: "0.12em 0.3em 0.02em", whiteSpace: "nowrap" }}>Bobr za minutu</span>;
  const base: CSSProperties = { position: "absolute", fontFamily: F.display, lineHeight: 1, letterSpacing: "0.04em", color: C.ink };
  if (!L.reel) {
    const badgeW = textWidth("Bobr za minutu", F.display, 400, fs) + fs * 1.2;
    const tfs = fitSize(titulek, F.display, 400, fs, L.W - 160 - badgeW, 0, 32);
    return (
      <div style={{ ...base, top: 56, left: 80, fontSize: fs, whiteSpace: "nowrap" }}>
        {badge}
        <span style={{ color: C.cyan, marginLeft: "0.45em", fontSize: tfs }}>{titulek}</span>
      </div>
    );
  }
  /* reel: na jeden řádek, když se vejde; jinak titulek pod štítkem */
  const oneLine = fitSize(`Bobr za minutu   ${titulek}`, F.display, 400, fs, L.W - 120, 0.6) >= fs;
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

const MOODS: Record<SceneId, { mood: BobrMood; pointing?: boolean }> = {
  hook: { mood: "surprised" },
  problem: { mood: "thinking" },
  proc: { mood: "neutral" },
  navrh: { mood: "happy", pointing: true },
  dopad: { mood: "happy" },
  outro: { mood: "happy", pointing: true },
};

/* Mrknutí: nepravidelné intervaly, každé trvá 6 snímků (0 → 1 → 0). */
const BLINK_GAPS = [84, 118, 96, 140, 76, 128];
function blinkAt(frame: number): number {
  const cycle = BLINK_GAPS.reduce((a, b) => a + b, 0);
  let t = (frame + 40) % cycle;
  for (const g of BLINK_GAPS) {
    if (t < g) {
      const d = g - t; // snímků do konce intervalu
      if (d <= 6) return 1 - Math.abs(d - 3) / 3;
      return 0;
    }
    t -= g;
  }
  return 0;
}

/** Mávnutí: dvě rychlé vlnky během 30 snímků od `start`. */
function waveBurst(frame: number, start: number): number {
  const t = frame - start;
  if (t < 0 || t > 30) return 0;
  return 0.5 * (1 - Math.cos((2 * Math.PI * t) / 15));
}

/** Bobr jako trvalá vrstva: nálada se přepíná se scénou (s malým „hopnutím“), mrká, dýchá, hýbe ocasem. */
export function BobrLayer({ segments }: { segments: Segment[] }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const L = useLayout();
  const seg = activeSegment(segments, frame);
  const { mood, pointing } = MOODS[seg.id];
  const switchAt = seg.from === 0 ? 0 : seg.from + XFADE / 2;

  // vstup na začátku videa: vyskočí zespodu
  const intro = spring({ frame, fps, config: { damping: 13, stiffness: 110 } });
  // hop při změně nálady
  const hop = seg.from === 0 ? 1 : spring({ frame: frame - switchAt, fps, config: { damping: 9, stiffness: 200 } });
  // v háčku leknutí ve chvíli, kdy číslo dopadne
  const startle = seg.id === "hook" ? interpolate(frame, [14, 20, 30], [0, 1, 0], clampOpts) : 0;

  const breathe = 0.5 * (1 - Math.cos((2 * Math.PI * frame) / (3.6 * fps)));
  const tailSwing = Math.sin((2 * Math.PI * frame) / (3.2 * fps));
  let wave = 0;
  if (seg.id === "navrh") {
    for (const b of seg.beats) wave = Math.max(wave, waveBurst(frame, seg.from + b + 6));
  } else if (seg.id === "outro") {
    const t = frame - (seg.from + seg.beats[1]);
    wave = t > 0 ? 0.5 * (1 - Math.cos((2 * Math.PI * t) / 16)) : 0;
  }

  const size = L.bobr.size;
  const h = (size * 260) / 240;
  const scale = (0.93 + 0.07 * hop) * (1 + 0.04 * startle);
  const y = (1 - intro) * (h + 120) - startle * 26;

  return (
    <>
      {/* stín pod nohama */}
      <div
        style={{
          position: "absolute",
          left: L.bobr.cx - size * 0.32,
          top: L.bobr.bottom - h * 0.06,
          width: size * 0.64,
          height: size * 0.08,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.08)",
          opacity: intro,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: L.bobr.cx - size / 2,
          top: L.bobr.bottom - h,
          width: size,
          height: h,
          transform: `translateY(${y}px) scale(${scale})`,
          transformOrigin: "50% 100%",
        }}
      >
        <BobrSvg
          mood={mood}
          pointing={pointing}
          size={size}
          blink={blinkAt(frame)}
          breathe={breathe}
          tailSwing={tailSwing}
          wave={wave}
          style={{ display: "block", overflow: "visible" }}
        />
      </div>
    </>
  );
}
