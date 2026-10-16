/* Kontrola externích odkazů: sesbírá všechna http(s) URL ze zdrojů webu a ověří, že odpovídají.
   Použití:
     node scripts/check-links.mjs [--allow-list scripts/link-allow.txt]
   2xx/3xx = ok; 401/403/429/999 = „blocked“ (web roboty nepouští, neověřeno); vše ostatní a chyby sítě = broken.
   Končí kódem 1 jen při broken odkazech. */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TIMEOUT_MS = 15_000;
const PARALLEL = 6;
const BLOCKED = new Set([401, 403, 429, 999]);
const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36 link-checker";

/* Adresy, které nejsou odkazy (jmenné prostory, lokální vývoj, ukázky). */
const SKIP = [
  /^https?:\/\/www\.w3\.org\//,
  /^https?:\/\/localhost(:|\/|$)/,
  /^https?:\/\/127\.0\.0\.1/,
  /^https?:\/\/example\.(com|org)/,
  /^https?:\/\/schema\.org\/?$/,
];

const argv = process.argv.slice(2);
const allowIdx = argv.indexOf("--allow-list");
const allowFile = allowIdx >= 0 ? argv[allowIdx + 1] : null;
const allow = [];
if (allowFile) {
  const file = path.resolve(ROOT, allowFile);
  if (!existsSync(file)) {
    console.error(`Allow-list ${allowFile} neexistuje.`);
    process.exit(2);
  }
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const t = line.trim();
    if (t && !t.startsWith("#")) allow.push(t);
  }
}

/* ---------- sběr souborů ---------- */
function walk(dir, exts, out = []) {
  const abs = path.join(ROOT, dir);
  if (!existsSync(abs)) return out;
  for (const name of readdirSync(abs)) {
    const rel = path.join(dir, name);
    const st = statSync(path.join(ROOT, rel));
    if (st.isDirectory()) walk(rel, exts, out);
    else if (exts.some((e) => name.endsWith(e))) out.push(rel);
  }
  return out;
}
const files = [
  ...walk("data", [".json"]),
  ...walk("content", [".ts"]),
  ...walk("topics", [".tsx", ".ts"]),
  ...walk("app", [".tsx", ".ts"]),
  ...walk("components", [".tsx", ".ts"]),
];

/* ---------- sběr URL ---------- */
const URL_RE = /https?:\/\/[^\s"'`<>\\)\]}]+/g;
/** @type {Map<string, Set<string>>} url -> soubory (s číslem řádku) */
const found = new Map();
for (const rel of [...new Set(files)]) {
  const lines = readFileSync(path.join(ROOT, rel), "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/rel=["']?(preconnect|dns-prefetch)/.test(line)) return; // adresy serverů, ne stránky
    for (const m of line.matchAll(URL_RE)) {
      let url = m[0].replace(/[.,;:!?*]+$/, "");
      if (url.includes("${") || url.includes("{")) continue; // šablony, ne reálné adresy
      if (SKIP.some((re) => re.test(url))) continue;
      if (allow.some((p) => url.startsWith(p))) continue;
      if (!found.has(url)) found.set(url, new Set());
      found.get(url).add(`${rel}:${i + 1}`);
    }
  });
}

/* ---------- ověření ---------- */
async function request(url, method) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method,
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,application/pdf,*/*;q=0.8", "Accept-Language": "cs,en;q=0.8" },
    });
    if (method === "GET") res.body?.cancel().catch(() => {});
    return { status: res.status };
  } catch (e) {
    const reason = e?.name === "AbortError" ? `timeout ${TIMEOUT_MS / 1000} s` : (e?.cause?.code ?? e?.cause?.message ?? e?.message ?? String(e));
    return { error: reason };
  } finally {
    clearTimeout(timer);
  }
}
const classify = (status) => (status >= 200 && status < 400 ? "ok" : BLOCKED.has(status) ? "blocked" : "broken");

async function check(url) {
  let r = await request(url, "HEAD");
  /* HEAD často není podporovaný nebo je špatně odbavený, proto při čemkoli jiném než ok zkusíme GET. */
  if (r.error || classify(r.status) !== "ok") {
    const g = await request(url, "GET");
    if (!g.error || r.error) r = g;
  }
  return r.error ? { url, state: "broken", info: r.error } : { url, state: classify(r.status), info: String(r.status) };
}

const urls = [...found.keys()].sort();
console.log(`Kontroluji ${urls.length} externích odkazů z ${files.length} souborů${allow.length ? ` (allow-list: ${allow.length})` : ""}...\n`);

const results = [];
let next = 0;
await Promise.all(
  Array.from({ length: PARALLEL }, async () => {
    while (next < urls.length) {
      const url = urls[next++];
      results.push(await check(url));
    }
  }),
);
results.sort((a, b) => a.url.localeCompare(b.url));

/* ---------- výpis ---------- */
const label = { ok: "ok", blocked: "blocked", broken: "BROKEN" };
const w = Math.max(6, ...results.map((r) => r.info.length));
for (const r of results) console.log(`${label[r.state].padEnd(7)} ${r.info.padEnd(w)}  ${r.url}`);

const count = (s) => results.filter((r) => r.state === s).length;
const broken = results.filter((r) => r.state === "broken");
console.log(`\nok: ${count("ok")}, blocked (neověřeno): ${count("blocked")}, broken: ${broken.length}, celkem: ${results.length}`);

if (broken.length) {
  console.log("\nRozbité odkazy:");
  for (const r of broken) {
    console.log(`- ${r.url}  [${r.info}]`);
    for (const where of [...found.get(r.url)].slice(0, 5)) console.log(`    ${where}`);
  }
  process.exit(1);
}
