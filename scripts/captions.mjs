#!/usr/bin/env node
/* Vygeneruje titulky public/video/<slug>.vtt pro všechna témata z video/captions.ts
   (stejné časování jako render). Spouštět po změně narration nebo audio manifestu:

   node scripts/captions.mjs */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "video");

/* TypeScript entry → jeden ESM soubor v dočasném adresáři (esbuild je v repu jako závislost Remotionu) */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "peer-captions-"));
const entry = path.join(tmp, "entry.ts");
fs.writeFileSync(
  entry,
  `export { buildCues, toVtt } from ${JSON.stringify(path.join(ROOT, "video", "captions.ts"))};
   export { scripts } from ${JSON.stringify(path.join(ROOT, "video", "scripts", "index.ts"))};`,
);
const bundle = path.join(tmp, "captions.mjs");
await build({
  entryPoints: [entry],
  bundle: true,
  format: "esm",
  platform: "node",
  outfile: bundle,
  alias: { "@": ROOT },
  logLevel: "silent",
});
const { buildCues, toVtt, scripts } = await import(pathToFileURL(bundle).href);

for (const script of scripts) {
  const cues = buildCues(script);
  const file = path.join(OUT, `${script.slug}.vtt`);
  fs.writeFileSync(file, toVtt(cues));
  const last = cues[cues.length - 1];
  console.log(`${script.slug}.vtt  ${cues.length} titulků, do ${last ? last.end.toFixed(1) : 0} s`);
}
fs.rmSync(tmp, { recursive: true, force: true });
