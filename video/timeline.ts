import type { VideoScript } from "../lib/topics";

/* Časování videa ze scénáře. Délka scén se odvozuje od délky textu (čas na přečtení),
   takže stejný scénář dá stejné časování v širokém videu i v reelu. */

export const FPS = 30;
/** Překryv sousedních scén (krátký prolínací přechod), ve snímcích. */
export const XFADE = 12;

export type SceneId = "hook" | "problem" | "proc" | "navrh" | "dopad" | "outro";

export type Segment = {
  id: SceneId;
  /** začátek scény v celém videu (snímek) */
  from: number;
  /** délka scény ve snímcích (včetně překryvů) */
  duration: number;
  /** lokální snímky, kdy se ve scéně objevuje další položka (karta, krok) */
  beats: number[];
};

const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const s = (sec: number) => Math.round(sec * FPS);

/** Čas na přečtení věty v sekundách (velké písmo, bez zvuku: ~3,5 slova za sekundu + rezerva). */
const read = (t: string, min: number, max: number) => clamp(1.4 + words(t) * 0.3, min, max);

export function buildTimeline(script: VideoScript): { segments: Segment[]; total: number } {
  const parts: { id: SceneId; duration: number; beats: number[] }[] = [];

  // 1) háček: číslo naběhne (~1,2 s), pak jednotka a věta
  parts.push({ id: "hook", duration: s(2.2 + read(script.hook.veta, 3.2, 5)), beats: [0, s(0.9), s(1.5)] });

  // 2) problém: karty po ~5 s
  {
    const beats: number[] = [];
    let t = s(0.2);
    for (const p of script.problem) {
      beats.push(t);
      t += s(clamp(read(p.veta, 3, 5) + 1.6, 4.6, 6.4));
    }
    parts.push({ id: "problem", duration: t, beats });
  }

  // 3) proč: řetězec kroků, šipky naskakují postupně
  {
    const beats: number[] = [];
    let t = s(0.9);
    for (const k of script.proc) {
      beats.push(t);
      t += s(clamp(0.9 + words(k) * 0.3, 2.2, 3.6));
    }
    parts.push({ id: "proc", duration: t + s(2.4), beats });
  }

  // 4) návrh: tři karty, každá s názvem a větou
  {
    const beats: number[] = [];
    let t = s(0.8);
    for (const n of script.navrh) {
      beats.push(t);
      t += s(clamp(1.6 + words(`${n.nazev} ${n.veta}`) * 0.28, 3.8, 6));
    }
    parts.push({ id: "navrh", duration: t + s(1.6), beats });
  }

  // 5) dopad
  parts.push({ id: "dopad", duration: s(2 + read(script.dopad.veta, 3.5, 5.5)), beats: [0, s(1), s(1.6)] });

  // 6) outro
  parts.push({ id: "outro", duration: s(6), beats: [0, s(0.6), s(1.2)] });

  const segments: Segment[] = [];
  let from = 0;
  for (const p of parts) {
    segments.push({ ...p, from });
    from += p.duration - XFADE;
  }
  const total = from + XFADE;
  return { segments, total };
}

/** Segment, který „vlastní“ daný snímek (přepnutí uprostřed prolínačky). */
export function activeSegment(segments: Segment[], frame: number): Segment {
  let cur = segments[0];
  for (const seg of segments) if (frame >= seg.from + XFADE / 2) cur = seg;
  return cur;
}
