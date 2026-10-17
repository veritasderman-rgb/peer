// Vyexportuje stránku /argumentar do public/argumentar.pdf (A4, tiskové CSS, záhlaví a čísla stránek).
// Skript nic nespouští: web musí běžet (npm run dev nebo npm start).
// Spuštění z kořene repozitáře: node scripts/export-argumentar.mjs [adresa webu]   (výchozí http://localhost:3310)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";

const base = (process.argv[2] ?? "http://localhost:3310").replace(/\/$/, "");
const out = path.join(process.cwd(), "public", "argumentar.pdf");

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

/* Chromium: pokud existuje /opt/pw-browsers/chromium (sdílená instalace), použije se; jinak výchozí z Playwrightu. */
const sdilene = "/opt/pw-browsers/chromium";
const launchOptions = {};
if (fs.existsSync(sdilene)) {
  const kandidati = [path.join(sdilene, "chrome-linux", "chrome"), path.join(sdilene, "chrome"), sdilene];
  const exe = kandidati.find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
  if (exe) launchOptions.executablePath = exe;
}

const datum = new Date().toLocaleDateString("cs-CZ", { day: "numeric", month: "numeric", year: "numeric" });
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

const browser = await chromium.launch(launchOptions);
try {
  const page = await browser.newPage();
  const res = await page.goto(`${base}/argumentar`, { waitUntil: "load", timeout: 60_000 });
  if (!res || !res.ok()) throw new Error(`${base}/argumentar vrátilo ${res ? res.status() : "žádnou odpověď"}; běží web?`);
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
  await page.evaluate(() => document.fonts?.ready);
  await page.emulateMedia({ media: "print", colorScheme: "light" });

  fs.mkdirSync(path.dirname(out), { recursive: true });
  const pismo = "font-family: Helvetica, Arial, sans-serif; font-size: 8px; color: #444; width: 100%; padding: 0 15mm;";
  await page.pdf({
    path: out,
    format: "A4",
    printBackground: true,
    margin: { top: "18mm", bottom: "18mm", left: "15mm", right: "15mm" },
    displayHeaderFooter: true,
    headerTemplate: `<div style="${pismo} text-align: left;">${esc(`Česko má na víc! – argumentář – ${datum}`)}</div>`,
    footerTemplate: `<div style="${pismo} text-align: right;">Strana <span class="pageNumber"></span> z <span class="totalPages"></span></div>`,
  });
} finally {
  await browser.close();
}

const kb = Math.round(fs.statSync(out).size / 1024);
const stranek = (fs.readFileSync(out).toString("latin1").match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`Uloženo ${path.relative(process.cwd(), out)}: ${kb} kB, ${stranek} stran.`);
