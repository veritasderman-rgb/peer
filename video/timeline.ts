import type { Narration, VideoScript } from "../lib/topics";
import manifest from "./audio-manifest.json";

/* Časování videa ze scénáře. Když je pro scénu namluvený komentář (video/audio-manifest.json,
   generuje scripts/audio-manifest.mjs), délka scény = délka řeči + dozvuk a položky scény
   (karty, kroky) se rozloží v rámci řeči. Scény bez zvuku: délka z délky textu (čas na přečtení).
   Stejný scénář dá stejné časování v širokém videu i v reelu. */

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
  /** namluvený komentář scény: soubor v public/ a lokální snímek, kdy začíná */
  audio?: { file: string; from: number };
};

/* ---------- zvuk (manifest) ---------- */

type AudioFile = { file: string; duration: number };
type AudioManifest = {
  topics: Record<string, Partial<Record<SceneId, AudioFile>>>;
  music: Record<string, AudioFile>;
};
const M = manifest as AudioManifest;

/** Hudební podkres (public/audio/music/bed.mp3), nebo null, když v manifestu není. */
export const MUSIC: AudioFile | null = M.music?.bed ?? null;

/** Dozvuk po konci řeči (s). */
const TAIL = 0.9;
/** Háček: řeč začíná až po naběhnutí čísla (s). */
const HOOK_LEAD = 0.6;
/** Nejmenší rozestup položek ve scéně se zvukem (snímky). */
const MIN_GAP = 18;

const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const s = (sec: number) => Math.round(sec * FPS);

/** Čas na přečtení věty v sekundách (velké písmo, bez zvuku: ~3,5 slova za sekundu + rezerva). */
const read = (t: string, min: number, max: number) => clamp(1.4 + words(t) * 0.3, min, max);

/** Věty odstavce (dělení za . ! ? … před mezerou). */
function sentences(t: string): string[] {
  return t
    .split(/(?<=[.!?…])\s+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

/** Kmeny slov pro hrubou shodu komentáře s textem na obrazovce (slova od 4 písmen, prvních 5 znaků). */
const stems = (t: string) =>
  new Set(
    t
      .toLowerCase()
      .split(/[^\p{L}]+/u)
      .filter((w) => w.length >= 4)
      .map((w) => w.slice(0, 5)),
  );

/** Podíly (součet 1) délky řeči pro `items.length` položek, v poměru délky vět komentáře.
    Stejně vět jako položek: věta = položka. Víc vět: rozdělí se do souvislých skupin (dynamické
    programování: skupina má sdílet slova s textem své položky a podílem odpovídat délce jejího textu).
    Bez komentáře nebo s méně větami než položek: rovnoměrně. */
export function speechShares(narration: string | undefined, items: string[]): number[] {
  const n = items.length;
  const even = items.map(() => 1 / n);
  if (!narration || n === 0) return even;
  const sent = sentences(narration);
  if (sent.length < n) return even;
  const len = sent.map((x) => x.length);
  if (sent.length === n) {
    const sum = len.reduce((a, b) => a + b, 0);
    return len.map((l) => l / sum);
  }
  const total = len.reduce((a, b) => a + b, 0);
  const itemLen = items.map((x) => Math.max(1, x.length));
  const itemSum = itemLen.reduce((a, b) => a + b, 0);
  const target = itemLen.map((l) => l / itemSum);
  const itemStems = items.map(stems);
  // sim[i][j]: podíl slov věty j, která se vyskytují v textu položky i
  const sim = items.map((_, i) =>
    sent.map((x) => {
      const st = [...stems(x)];
      return st.length ? st.filter((w) => itemStems[i].has(w)).length / st.length : 0;
    }),
  );
  const pre = [0];
  for (const l of len) pre.push(pre[pre.length - 1] + l);
  const S = sent.length;
  // cost[i][j]: nejlepší rozdělení prvních j vět do prvních i položek
  const cost: number[][] = Array.from({ length: n + 1 }, () => Array(S + 1).fill(Infinity));
  const prev: number[][] = Array.from({ length: n + 1 }, () => Array(S + 1).fill(-1));
  cost[0][0] = 0;
  for (let i = 1; i <= n; i++)
    for (let j = i; j <= S - (n - i); j++)
      for (let k = i - 1; k < j; k++) {
        if (cost[i - 1][k] === Infinity) continue;
        const share = (pre[j] - pre[k]) / total;
        let match = 0;
        for (let q = k; q < j; q++) match += sim[i - 1][q];
        const c = cost[i - 1][k] + 4 * (share - target[i - 1]) ** 2 - match;
        if (c < cost[i][j]) {
          cost[i][j] = c;
          prev[i][j] = k;
        }
      }
  const shares: number[] = Array(n).fill(0);
  let j = S;
  for (let i = n; i >= 1; i--) {
    const k = prev[i][j];
    shares[i - 1] = (pre[j] - pre[k]) / total;
    j = k;
  }
  return shares;
}

/** Začátky položek (lokální snímky) rozložené podle podílů řeči; první po `lead` snímcích. */
function spreadBeats(shares: number[], speechFrames: number, lead: number): number[] {
  const beats: number[] = [];
  let cum = 0;
  shares.forEach((sh, i) => {
    const at = i === 0 ? lead : Math.round(cum * speechFrames);
    beats.push(i === 0 ? at : Math.max(at, beats[i - 1] + MIN_GAP));
    cum += sh;
  });
  return beats;
}

export function buildTimeline(script: VideoScript): { segments: Segment[]; total: number } {
  const voice = M.topics?.[script.slug] ?? {};
  const narr: Partial<Narration> = script.narration ?? {};
  const parts: { id: SceneId; duration: number; beats: number[]; audio?: Segment["audio"] }[] = [];
  /** délka scény se zvukem: řeč (+ náběh) + dozvuk; nejméně tak, aby poslední položka byla chvíli vidět */
  const voiced = (id: SceneId, beats: number[], lead = 0) => {
    const a = voice[id]!;
    const duration = Math.max(s(lead + a.duration + TAIL), beats[beats.length - 1] + s(1.2) + XFADE);
    parts.push({ id, duration, beats, audio: { file: a.file, from: s(lead) } });
  };

  // 1) háček: číslo naběhne (~1,2 s), pak jednotka a věta
  if (voice.hook) voiced("hook", [0, s(0.9), s(1.5)], HOOK_LEAD);
  else parts.push({ id: "hook", duration: s(2.2 + read(script.hook.veta, 3.2, 5)), beats: [0, s(0.9), s(1.5)] });

  // 2) problém: karty po ~5 s (se zvukem: řeč rozdělená mezi karty)
  if (voice.problem) {
    const shares = speechShares(narr.problem, script.problem.map((p) => `${p.cislo ?? ""} ${p.veta}`));
    voiced("problem", spreadBeats(shares, s(voice.problem.duration), s(0.2)));
  } else {
    const beats: number[] = [];
    let t = s(0.2);
    for (const p of script.problem) {
      beats.push(t);
      t += s(clamp(read(p.veta, 3, 5) + 1.6, 4.6, 6.4));
    }
    parts.push({ id: "problem", duration: t, beats });
  }

  // 3) proč: řetězec kroků, šipky naskakují postupně (se zvukem: v rámci řeči)
  if (voice.proc) {
    voiced("proc", spreadBeats(speechShares(narr.proc, script.proc), s(voice.proc.duration), s(0.6)));
  } else {
    const beats: number[] = [];
    let t = s(0.9);
    for (const k of script.proc) {
      beats.push(t);
      t += s(clamp(0.9 + words(k) * 0.3, 2.2, 3.6));
    }
    parts.push({ id: "proc", duration: t + s(2.4), beats });
  }

  // 4) návrh: tři karty, každá s názvem a větou (se zvukem: řeč rozdělená mezi karty)
  if (voice.navrh) {
    const shares = speechShares(narr.navrh, script.navrh.map((n) => `${n.nazev} ${n.veta}`));
    voiced("navrh", spreadBeats(shares, s(voice.navrh.duration), s(0.5)));
  } else {
    const beats: number[] = [];
    let t = s(0.8);
    for (const n of script.navrh) {
      beats.push(t);
      t += s(clamp(1.6 + words(`${n.nazev} ${n.veta}`) * 0.28, 3.8, 6));
    }
    parts.push({ id: "navrh", duration: t + s(1.6), beats });
  }

  // 5) dopad
  if (voice.dopad) voiced("dopad", [0, s(1), s(1.6)]);
  else parts.push({ id: "dopad", duration: s(2 + read(script.dopad.veta, 3.5, 5.5)), beats: [0, s(1), s(1.6)] });

  // 6) outro
  if (voice.outro) voiced("outro", [0, s(0.6), s(1.2)]);
  else parts.push({ id: "outro", duration: s(6), beats: [0, s(0.6), s(1.2)] });

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
