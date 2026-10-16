#!/usr/bin/env node
/* Render videí „Bobr za minutu“ pro všechna témata z video/scripts/index.ts.
   Výstup: public/video/<slug>-wide.mp4 (1920×1080), <slug>-reel.mp4 (1080×1920), <slug>-poster.jpg, <slug>-poster-reel.jpg.

   npm run video:render                      všechna témata
   npm run video:render -- --only bydleni    jen vybraná (víc: --only bydleni,euro)
   volby: --crf 26 (výchozí), --concurrency 4, --no-reel, --no-wide, --no-poster
   kontrolní snímky místo videa: --frames 60,500,1200 [--frames-dir /cesta]  (nebo --frames scenes = střed každé scény) */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";
import { bundle } from "@remotion/bundler";
import { openBrowser, renderMedia, renderStill, selectComposition } from "@remotion/renderer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "video");
const BROWSER = process.env.REMOTION_BROWSER ?? "/opt/pw-browsers/chromium";
const CHROME_MODE = "chrome-for-testing"; // Playwright Chromium nemá starý headless režim
const MAX_BYTES = 10 * 1024 * 1024; // nad 10 MB zvýšíme CRF

/* ---------- argumenty ---------- */
const argv = process.argv.slice(2);
const arg = (name) => {
  const i = argv.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i < 0) return undefined;
  const a = argv[i];
  return a.includes("=") ? a.split("=").slice(1).join("=") : argv[i + 1];
};
const flag = (name) => argv.includes(`--${name}`);
const only = arg("only")?.split(",").map((s) => s.trim()).filter(Boolean);
const baseCrf = Number(arg("crf") ?? 26);
const concurrency = arg("concurrency") ? Number(arg("concurrency")) : null;
const framesArg = arg("frames");
const framesDir = path.resolve(arg("frames-dir") ?? path.join(os.tmpdir(), "bobr-frames"));

/* ---------- scénáře (TypeScript → dočasný ESM přes esbuild) ---------- */
async function loadScripts() {
  const tmp = path.join(os.tmpdir(), `bobr-scripts-${process.pid}.mjs`);
  await build({
    stdin: {
      contents: `export { scripts } from "./video/scripts/index.ts"; export { buildTimeline } from "./video/timeline.ts";`,
      resolveDir: ROOT,
      loader: "ts",
    },
    bundle: true,
    format: "esm",
    platform: "node",
    outfile: tmp,
    logLevel: "warning",
    tsconfig: path.join(ROOT, "video", "tsconfig.json"),
  });
  try {
    return await import(pathToFileURL(tmp).href);
  } finally {
    fs.rmSync(tmp, { force: true });
  }
}

const webpackOverride = (c) => ({
  ...c,
  resolve: { ...c.resolve, alias: { ...(c.resolve?.alias ?? {}), "@": ROOT } },
});

const mb = (b) => `${(b / 1024 / 1024).toFixed(1)} MB`;

async function main() {
  const { scripts, buildTimeline } = await loadScripts();
  const selected = only ? scripts.filter((s) => only.includes(s.slug)) : scripts;
  if (only) {
    const missing = only.filter((o) => !scripts.some((s) => s.slug === o));
    if (missing.length) throw new Error(`Scénář nenalezen v video/scripts/index.ts: ${missing.join(", ")}`);
  }
  if (!selected.length) throw new Error("Žádný scénář k renderu.");
  fs.mkdirSync(OUT, { recursive: true });

  console.log("Bundluji video/index.ts …");
  const serveUrl = await bundle({ entryPoint: path.join(ROOT, "video", "index.ts"), webpackOverride, publicDir: path.join(ROOT, "public") });
  const browser = await openBrowser("chrome", { browserExecutable: BROWSER, chromeMode: CHROME_MODE });
  const common = { serveUrl, browserExecutable: BROWSER, chromeMode: CHROME_MODE, puppeteerInstance: browser, logLevel: "error" };

  try {
    for (const script of selected) {
      const inputProps = { script };
      if (framesArg) {
        await renderFrames(common, script, buildTimeline);
        continue;
      }
      const variants = [
        ["TopicWide", "wide"],
        ["TopicReel", "reel"],
      ].filter(([, v]) => !flag(`no-${v}`));

      for (const [id, variant] of variants) {
        const composition = await selectComposition({ ...common, id, inputProps });
        const outputLocation = path.join(OUT, `${script.slug}-${variant}.mp4`);
        let crf = baseCrf;
        for (;;) {
          const t0 = Date.now();
          let last = -1;
          await renderMedia({
            ...common,
            composition,
            inputProps,
            codec: "h264",
            crf,
            imageFormat: "jpeg",
            jpegQuality: 92,
            audioCodec: "aac",
            audioBitrate: "128k",
            colorSpace: "bt709",
            overwrite: true,
            concurrency,
            outputLocation,
            onProgress: ({ progress }) => {
              const p = Math.floor(progress * 10);
              if (p !== last) {
                last = p;
                process.stdout.write(`\r  ${script.slug}-${variant}: ${p * 10} %   `);
              }
            },
          });
          const size = fs.statSync(outputLocation).size;
          const secs = (composition.durationInFrames / composition.fps).toFixed(1);
          console.log(`\r  ${script.slug}-${variant}.mp4  ${composition.width}×${composition.height}  ${secs} s  ${mb(size)}  crf ${crf}  (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
          if (size <= MAX_BYTES || crf >= 35) break;
          crf += 3;
          console.log(`  nad 10 MB, znovu s crf ${crf}`);
        }
      }

      if (!flag("no-poster")) {
        /* poster: snímek z háčku, kdy už je vidět číslo, jednotka i věta */
        const hook = buildTimeline(script).segments[0];
        const frame = Math.min(hook.duration - 16, hook.beats[2] + 45);
        /* dva postery: široký pro 16:9 a na výšku pro reel */
        for (const [id, suffix] of [["TopicWide", "poster"], ["TopicReel", "poster-reel"]]) {
          const composition = await selectComposition({ ...common, id, inputProps });
          const output = path.join(OUT, `${script.slug}-${suffix}.jpg`);
          await renderStill({ ...common, composition, inputProps, frame, output, imageFormat: "jpeg", jpegQuality: 85, overwrite: true });
          console.log(`  ${script.slug}-${suffix}.jpg  (snímek ${frame})  ${mb(fs.statSync(output).size)}`);
        }
      }
    }
  } finally {
    await browser.close({ silent: true });
  }
}

/** Kontrolní snímky obou kompozic (JPEG) do framesDir. */
async function renderFrames(common, script, buildTimeline) {
  fs.mkdirSync(framesDir, { recursive: true });
  const inputProps = { script };
  const { segments, total } = buildTimeline(script);
  const frames =
    framesArg === "scenes"
      ? segments.flatMap((s) => [s.from + Math.round(s.duration * 0.55), s.from + s.duration - 14]).filter((f) => f < total)
      : framesArg.split(",").map(Number).filter((f) => Number.isFinite(f) && f >= 0 && f < total);
  for (const [id, variant] of [["TopicWide", "wide"], ["TopicReel", "reel"]]) {
    const composition = await selectComposition({ ...common, id, inputProps });
    for (const frame of frames) {
      const output = path.join(framesDir, `${script.slug}-${variant}-${String(frame).padStart(4, "0")}.jpg`);
      await renderStill({ ...common, composition, inputProps, frame, output, imageFormat: "jpeg", jpegQuality: 80, overwrite: true });
      console.log(`  ${output}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
