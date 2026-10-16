import type { VideoScript } from "../lib/topics";
import manifest from "./audio-manifest.json";
import { FPS, buildTimeline, type SceneId } from "./timeline";

/* Titulky (WebVTT) z namluveného komentáře: každá scéna má jeden soubor s řečí, jeho délka je
   v manifestu. Věty odstavce se v rámci řeči rozloží v poměru délky textu, takže titulek
   sedí k hlasu na sekundu dvě, bez rozpoznávání řeči. Stejné časování jako video (buildTimeline). */

type Cue = { start: number; end: number; text: string };

const M = manifest as { topics: Record<string, Partial<Record<SceneId, { file: string; duration: number }>>> };

function sentences(t: string): string[] {
  return t
    .split(/(?<=[.!?…])\s+/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export function buildCues(script: VideoScript): Cue[] {
  const { segments } = buildTimeline(script);
  const voice = M.topics[script.slug] ?? {};
  const cues: Cue[] = [];
  for (const seg of segments) {
    const text = script.narration?.[seg.id];
    const a = voice[seg.id];
    if (!seg.audio || !text || !a) continue;
    const start = (seg.from + seg.audio.from) / FPS;
    const sent = sentences(text);
    const total = sent.reduce((n, s) => n + s.length, 0);
    let t = start;
    for (const s of sent) {
      const d = (s.length / total) * a.duration;
      cues.push({ start: t, end: t + d, text: s });
      t += d;
    }
  }
  return cues;
}

const ts = (sec: number) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${s.toFixed(3).padStart(6, "0")}`;
};

export function toVtt(cues: Cue[]): string {
  const lines = ["WEBVTT", ""];
  cues.forEach((c, i) => {
    lines.push(String(i + 1), `${ts(c.start)} --> ${ts(c.end)}`, c.text, "");
  });
  return lines.join("\n");
}
