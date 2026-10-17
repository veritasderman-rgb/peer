#!/usr/bin/env node
/* Vyhledávací index pro /hledat: public/hledat.json = pole záznamů { url, titulek, typ, text, tema? }.
   typ: "tema" | "opatreni" | "slovnik" | "otazka" | "plne-zneni" | "stranka".

   Zdroje: registr témat (topics/index.ts, z něj data/<slug>.json + content/<slug>-plne-zneni.ts),
   fakta z data/<slug>.json, otázky z data/otazky.json a metadata statických stránek z app/<cesta>/page.tsx.
   Výstup je deterministický (pevné pořadí, jeden záznam na řádek), ať jsou rozdíly v gitu čitelné.

   Spouští se samo před buildem (npm run prebuild), ručně: node scripts/build-search-index.mjs */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "public", "hledat.json");
const MAX = 600; // znaků textu na záznam

/* ---------- registr témat (TypeScript/TSX → dočasný CJS přes esbuild) ---------- */
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "peer-hledat-"));
const bundle = path.join(tmp, "topics.cjs");
try {
  await build({
    stdin: { contents: `export { topics } from "./topics/index";`, resolveDir: ROOT, loader: "ts" },
    bundle: true,
    format: "cjs",
    platform: "node",
    outfile: bundle,
    jsx: "automatic",
    logLevel: "error",
    alias: { "@": ROOT },
    loader: { ".css": "empty", ".svg": "empty", ".png": "empty", ".jpg": "empty" },
  });
} catch (e) {
  fs.rmSync(tmp, { recursive: true, force: true });
  throw e;
}
const { topics } = createRequire(import.meta.url)(bundle);
fs.rmSync(tmp, { recursive: true, force: true });

/* ---------- pomocné funkce ---------- */

/* Text z ReactNode (kroky příběhu mají JSX): projde děti elementů, zbytek zahodí. */
function textZ(node) {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textZ).join("");
  if (typeof node === "object" && node.props) return textZ(node.props.children);
  return "";
}

/* Prostý text: bez HTML značek, bez odkazů do rejstříku zdrojů „[1]“, „[2, 3]“, se slitými mezerami. */
function cisty(s) {
  return String(s ?? "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[\d+(?:\s*[,–-]\s*\d+)*\]/g, "")
    .replace(/[*_]{2,}/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
}

/* Zkrátí na MAX znaků na hranici slova a přidá „…“. */
function orizni(s, max = MAX) {
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  const i = cut.lastIndexOf(" ");
  return (i > max * 0.6 ? cut.slice(0, i) : cut).replace(/[\s,;:–-]+$/, "") + "…";
}

const spoj = (...casti) => cisty(casti.flat(Infinity).filter(Boolean).map(cisty).filter(Boolean).join(" "));

const zaznamy = [];
function pridej(z) {
  const text = orizni(z.text ?? "");
  const titulek = cisty(z.titulek);
  if (!titulek) return;
  const rec = { url: z.url, titulek, typ: z.typ, text };
  if (z.tema) rec.tema = z.tema;
  zaznamy.push(rec);
}

/* Rozdělí dlouhý text na kousky do MAX znaků po větách (plné znění), ať se nic neztratí. */
function kousky(text, max = MAX) {
  const vety = text.match(/[^.!?…]+(?:[.!?…]+["“”»)]*\s*|$)/g) ?? [text];
  const out = [];
  let cur = "";
  for (const v of vety.map((x) => x.trim()).filter(Boolean)) {
    if (cur && (cur + " " + v).length > max) {
      out.push(cur);
      cur = v;
    } else cur = cur ? `${cur} ${v}` : v;
  }
  if (cur) out.push(cur);
  return out;
}

/* ---------- témata ---------- */
const serazena = [...topics].sort((a, b) => a.cislo - b.cislo);
for (const t of serazena) {
  const slug = t.slug;
  const url = `/${slug}`;
  const nazev = t.kratkyNazev;
  let data = {};
  const dataFile = path.join(ROOT, "data", `${slug}.json`);
  if (fs.existsSync(dataFile)) data = JSON.parse(fs.readFileSync(dataFile, "utf8"));

  /* 1) téma samo: háček, popis, perex */
  pridej({
    url,
    titulek: t.nazev,
    typ: "tema",
    tema: slug,
    text: spoj(t.hook.h1, t.popisMeta, t.hook.lede, data.hook?.veta),
  });

  /* 2) příběh (kroky se scrollytellingem) */
  if (t.steps?.length) {
    pridej({
      url: `${url}#pribeh`,
      titulek: `${nazev}: ${t.pribehNadpis}`,
      typ: "tema",
      tema: slug,
      text: spoj(
        t.persona ? `${t.persona.who}, ${t.persona.ctx}.` : "",
        t.steps.map((s) => (s.title ? `${s.title}: ${textZ(s.text)}` : textZ(s.text))),
      ),
    });
  }

  /* 3) proč to tak je (příčiny); sekce má id="proc" */
  if (t.proc) {
    pridej({
      url: `${url}#proc`,
      titulek: `${nazev}: Proč to tak je`,
      typ: "tema",
      tema: slug,
      text: spoj(t.proc.uvod, t.proc.retezec?.map((r) => `${r.nazev}: ${r.popis}`), t.proc.dalsi?.map((r) => `${r.nazev}: ${r.popis}`)),
    });
  }

  /* 4) klíčová čísla ze studie (data/<slug>.json → fakta); na stránce jsou v příběhu, grafech a cílech */
  if (Array.isArray(data.fakta) && data.fakta.length) {
    pridej({
      url: t.cisla ? `${url}#cisla` : url,
      titulek: `${nazev}: Čísla ze studie`,
      typ: "tema",
      tema: slug,
      text: spoj(data.fakta.map((f) => f.text)),
    });
  }

  /* 5) opatření: karty mají id="opatreni-<číslo>" */
  for (const o of t.opatreni ?? []) {
    pridej({
      url: `${url}#opatreni-${o.cislo}`,
      titulek: o.nazev,
      typ: "opatreni",
      tema: slug,
      text: spoj(o.klicoveCislo ? `${String(o.klicoveCislo).replace(/[.\s]+$/, "")}.` : "", o.proTebe, o.popis),
    });
  }

  /* 6) co to přinese a co to stojí (id="prinese") */
  pridej({
    url: `${url}#prinese`,
    titulek: `${nazev}: Co to přinese a co to stojí`,
    typ: "tema",
    tema: slug,
    text: spoj(
      (t.cile ?? []).map((c) => `${typeof c.hodnota === "number" ? c.hodnota.toLocaleString("cs-CZ") : c.hodnota} ${c.jednotka}: ${c.cil}.`),
      t.stoji?.odstavce,
    ),
  });

  /* 7) slovník (sekce id="slovnik", položky vlastní kotvu nemají) */
  for (const s of t.slovnik ?? []) {
    pridej({ url: `${url}#slovnik`, titulek: s.pojem, typ: "slovnik", tema: slug, text: s.vysvetleni });
  }

  /* 8) plné znění (sekce id="plne-zneni"): po nadpisech h3, dlouhé úseky rozdělené po větách */
  const useky = [];
  let akt = { nadpis: t.plneZneniNadpis, casti: [] };
  for (const b of t.plneZneni ?? []) {
    if (b.typ === "h3") {
      if (akt.casti.length) useky.push(akt);
      akt = { nadpis: b.text, casti: [] };
    } else if (b.typ === "p") akt.casti.push(b.text);
    else if (b.typ === "ul") akt.casti.push(...b.polozky);
    else if (b.typ === "ol") akt.casti.push(...b.polozky.map((p) => `${p.nazev} ${p.text}`));
  }
  if (akt.casti.length) useky.push(akt);
  for (const u of useky) {
    const nadpis = cisty(u.nadpis);
    const titulek = nadpis === cisty(t.plneZneniNadpis) ? `${nazev}: ${nadpis}` : `${nazev}, plné znění: ${nadpis}`;
    for (const k of kousky(spoj(u.casti))) {
      pridej({ url: `${url}#plne-zneni`, titulek, typ: "plne-zneni", tema: slug, text: k });
    }
  }
}

/* ---------- časté otázky (data/otazky.json): každá otázka má na /otazky kotvu se svým id ---------- */
const otazky = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "otazky.json"), "utf8"));
const slugy = new Set(serazena.map((t) => t.slug));
for (const s of otazky.skupiny ?? []) {
  for (const q of s.otazky ?? []) {
    const temata = (q.temata ?? []).filter((x) => slugy.has(x));
    pridej({
      url: `/otazky#${q.id}`,
      titulek: q.otazka,
      typ: "otazka",
      tema: temata.length === 1 ? temata[0] : undefined,
      text: spoj(q.odpoved),
    });
  }
}

/* ---------- statické stránky: title a description z metadata v app/<cesta>/page.tsx ---------- */
const site = fs.readFileSync(path.join(ROOT, "lib", "site.ts"), "utf8");
const konst = (src, jmeno) => src.match(new RegExp(`const ${jmeno}\\s*=\\s*\\n?\\s*"([^"]+)"`))?.[1];

function metadataStranky(cesta) {
  const file = path.join(ROOT, "app", cesta.replace(/^\//, ""), "page.tsx");
  if (!fs.existsSync(file)) return {};
  const src = fs.readFileSync(file, "utf8");
  const blok = src.match(/export const metadata[^=]*=\s*\{([\s\S]*?)\n\};/)?.[1] ?? "";
  const str = (klic) => {
    const m = blok.match(new RegExp(`(?:^|\\n)\\s*${klic}:\\s*(?:\\{\\s*absolute:\\s*)?(?:"([^"]+)"|([A-Z_][A-Z0-9_]*))`));
    if (!m) return undefined;
    return m[1] ?? konst(src, m[2]) ?? konst(site, m[2]);
  };
  return { titulek: str("title"), popis: str("description") };
}

/* Pořadí = pořadí v navigaci webu. Záložní texty platí, když stránka (zatím) nemá metadata. */
const STRANKY = [
  { url: "/", titulek: konst(site, "SITE_NAME") ?? "Česko má na víc!", popis: konst(site, "SITE_DESCRIPTION") },
  { url: "/pribeh", titulek: "Příběh", popis: "Celá strategie jako jeden příběh." },
  { url: "/videa", titulek: "Videa Strategie za minutu" },
  { url: "/dopad", titulek: "Velký obraz" },
  { url: "/cesta", titulek: "Cesta do 2035" },
  { url: "/zaplaceni", titulek: "Jak se to zaplatí" },
  { url: "/kolik-ti-to-prinese", titulek: "Kolik ti strategie přinese?", text: "Kvíz a kalkulačka." },
  { url: "/moje-obec", titulek: "Jak je na tom můj kraj", text: "Mapa krajů." },
  { url: "/otazky", titulek: "Časté otázky a námitky" },
  { url: "/pro-sdileni", titulek: "Balíček pro sítě" },
  { url: "/pro-media", titulek: "Pro média" },
  { url: "/kdo-je-kdo", titulek: "Kdo je kdo: garanti strategie", text: "Autoři strategie." },
  { url: "/jak-vznikl", titulek: "Jak vznikl tento web" },
  { url: "/argumentar", titulek: "Argumentář pro kandidáty" },
  { url: "/en", titulek: "Czechia can do better – PEER Economic Strategy 2026–2035" },
];
for (const s of STRANKY) {
  const m = s.url === "/" ? {} : metadataStranky(s.url);
  pridej({ url: s.url, titulek: m.titulek ?? s.titulek, typ: "stranka", text: spoj(m.popis ?? s.popis, s.text) });
}

/* ---------- zápis: jeden záznam na řádek ---------- */
const json = "[\n" + zaznamy.map((z) => JSON.stringify(z)).join(",\n") + "\n]\n";
fs.writeFileSync(OUT, json);
const pocty = zaznamy.reduce((m, z) => ((m[z.typ] = (m[z.typ] ?? 0) + 1), m), {});
console.log(
  `public/hledat.json: ${zaznamy.length} záznamů, ${(Buffer.byteLength(json) / 1024).toFixed(1)} kB (` +
    Object.entries(pocty).map(([k, v]) => `${k} ${v}`).join(", ") +
    ")",
);
