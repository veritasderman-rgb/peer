// Vyexportuje statické SVG značek garantů (components/GarantSvg.tsx) do public/garanti/:
//   <id>.svg (monogram se jménem a rolí), rada.svg (značka PEER)
// Spuštění z kořene repozitáře: node scripts/export-garanti.mjs
import { build } from "esbuild";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";

const root = process.cwd();
const outDir = path.join(root, "public", "garanti");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "garanti-"));
const bundle = path.join(tmp, "garanti.cjs");

await build({
  stdin: {
    contents: `
      import { createElement } from "react";
      import { renderToStaticMarkup } from "react-dom/server";
      import { GarantSvg } from "./components/GarantSvg";
      import { GARANT_IDS } from "./lib/garanti";
      export const svg = (props) => renderToStaticMarkup(createElement(GarantSvg, props));
      export { GARANT_IDS };
    `,
    resolveDir: root,
    loader: "tsx",
  },
  bundle: true,
  format: "cjs",
  platform: "node",
  outfile: bundle,
  jsx: "automatic",
  logLevel: "warning",
  alias: { "@": root },
  loader: { ".css": "empty" },
});

const { svg, GARANT_IDS } = createRequire(import.meta.url)(bundle);
fs.mkdirSync(outDir, { recursive: true });

const head = '<?xml version="1.0" encoding="UTF-8"?>\n';
const FONT_DISPLAY = "'Bebas Neue', 'Roboto Condensed', Arial, sans-serif";
const FONT_BODY = "'Roboto Condensed', Roboto, Arial, sans-serif";
const soubory = [
  ...GARANT_IDS.map((id) => [`${id}.svg`, { kdo: id, jmeno: true }]),
  ["rada.svg", { kdo: "rada", jmeno: true }],
];

for (const [file, props] of soubory) {
  let s = svg({ ...props, size: 600, fontDisplay: FONT_DISPLAY, fontBody: FONT_BODY });
  s = s.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
  fs.writeFileSync(path.join(outDir, file), head + s);
  console.log(`public/garanti/${file}`, s.length, "B");
}
fs.rmSync(tmp, { recursive: true, force: true });
