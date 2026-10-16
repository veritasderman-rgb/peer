#!/usr/bin/env node
/* Sestaví video/audio-manifest.json z public/audio/<slug>/<scena>.mp3 a public/audio/music/*.mp3.
   Délky čte ffprobe (systémový, nebo ten z balíčku Remotion compositor).
   Remotion podle manifestu nastaví délku scén na délku namluvené věty.

   node scripts/audio-manifest.mjs */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const AUDIO = path.join(ROOT, "public", "audio");
const OUT = path.join(ROOT, "video", "audio-manifest.json");
const SCENES = ["hook", "problem", "proc", "navrh", "dopad", "outro"];

function ffprobe() {
  const candidates = [
    "ffprobe",
    path.join(ROOT, "node_modules", "@remotion", "compositor-linux-x64-gnu", "ffprobe"),
    path.join(ROOT, "node_modules", "@remotion", "compositor-linux-x64-musl", "ffprobe"),
  ];
  for (const c of candidates) {
    try {
      execFileSync(c, ["-version"], { stdio: "ignore" });
      return c;
    } catch {}
  }
  throw new Error("ffprobe nenalezen");
}
const FFPROBE = ffprobe();

function duration(file) {
  const out = execFileSync(FFPROBE, ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", file], { encoding: "utf8" });
  return Math.round(parseFloat(out.trim()) * 1000) / 1000;
}

const manifest = { topics: {}, music: {} };
if (fs.existsSync(AUDIO)) {
  for (const slug of fs.readdirSync(AUDIO)) {
    const dir = path.join(AUDIO, slug);
    if (!fs.statSync(dir).isDirectory()) continue;
    if (slug === "music") {
      for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".mp3"))) {
        manifest.music[f.replace(/\.mp3$/, "")] = { file: `audio/music/${f}`, duration: duration(path.join(dir, f)) };
      }
      continue;
    }
    const scenes = {};
    for (const scene of SCENES) {
      const f = path.join(dir, `${scene}.mp3`);
      if (fs.existsSync(f)) scenes[scene] = { file: `audio/${slug}/${scene}.mp3`, duration: duration(f) };
    }
    if (Object.keys(scenes).length) manifest.topics[slug] = scenes;
  }
}
fs.writeFileSync(OUT, JSON.stringify(manifest, null, 2) + "\n");
const n = Object.keys(manifest.topics).length;
console.log(`manifest: ${n} témat, hudba: ${Object.keys(manifest.music).join(", ") || "žádná"} → ${path.relative(ROOT, OUT)}`);
for (const [slug, scenes] of Object.entries(manifest.topics)) {
  const total = Object.values(scenes).reduce((a, s) => a + s.duration, 0);
  console.log(`  ${slug}: ${Object.keys(scenes).length} scén, ${total.toFixed(1)} s řeči`);
}
