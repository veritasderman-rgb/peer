#!/usr/bin/env node
/* Nezlomitelné mezery podle české typografie, ať na konci řádku nezůstává osamocená předložka
   a čísla se neodtrhávají od jednotek:
   - za jednopísmennými předložkami a spojkami v, k, s, z, o, u, a, i („v Česku“, „a stát“),
   - mezi číslem a jednotkou (12 %, 15 Kč, 4 mld., 2 p. b.) a v tisícových řádech (200 000),
   - za zkratkami před číslem (s. 8, č. 2, § 5).

   Mění jen texty: řetězce a JSX text v topics/, content/, app/ a components/ a hodnoty v data/*.json.
   Klíče, importy, className, href a podobné atributy nechává být. Vkládá přímo znak U+00A0 (v editoru
   vypadá jako mezera). Je idempotentní; spouští se samo před buildem (npm run prebuild), ručně:
   node scripts/nbsp.mjs        (přepíše soubory)
   node scripts/nbsp.mjs --check (jen vypíše, co by změnil, a skončí chybou) */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NB = "\u00a0";
const CHECK = process.argv.includes("--check");

/* ---------- pravidla nad textem ---------- */

const PRED = "[vVkKsSzZoOuUaAiI]";
const JEDNOTKY = "(?:%|‰|Kč|€|mld\\.|mil\\.|tis\\.|p\\.\\s?b\\.|km|m²|ha|°C)";

export function nbsp(text, { jsx = false } = {}) {
  let s = text;
  /* JSX text: „a“ na konci řádku a slovo na dalším → spojit na jeden řádek, jinak JSX udělá z konce řádku mezeru */
  if (jsx) s = s.replace(new RegExp(`(^|[\\s(„“"'\\u00a0])(${PRED})[ \\t]*\\n\\s*(?=\\S)`, "g"), `$1$2${NB}`);
  /* dvakrát, aby prošly i řetězy jako „a v Praze“ */
  for (let i = 0; i < 2; i++) {
    s = s.replace(new RegExp(`(^|[\\s(„“"'\\u00a0/])(${PRED})[ \\t]+(?=[^\\s])`, "g"), `$1$2${NB}`);
  }
  s = s.replace(new RegExp(`(\\d)[ \\t]+(?=${JEDNOTKY})`, "g"), `$1${NB}`);
  s = s.replace(/p\.[ \t]b\./g, `p.${NB}b.`);
  s = s.replace(/(\d)[ \t](?=\d{3}(?!\d))/g, `$1${NB}`);
  s = s.replace(/(^|[\s(])(s|č|odst|tab|obr|str|kap)\.[ \t]+(?=\d)/g, `$1$2.${NB}`);
  s = s.replace(/§[ \t]+(?=\d)/g, `§${NB}`);
  return s;
}

/* ---------- TS/TSX: jen řetězce a JSX text ---------- */

const ATRIBUTY_BEZ_TEXTU = new Set([
  "className", "href", "src", "id", "key", "style", "target", "rel", "type", "name", "htmlFor", "role",
  "aria-labelledby", "aria-controls", "aria-describedby", "lang", "dateTime", "method", "action", "sizes", "as",
  /* SVG geometrie: čísla oddělená mezerami nejsou text */
  "viewBox", "d", "points", "transform", "x", "y", "width", "height", "preserveAspectRatio", "strokeDasharray",
]);

function zpracujTs(soubor) {
  const zdroj = fs.readFileSync(soubor, "utf8");
  const sf = ts.createSourceFile(soubor, zdroj, ts.ScriptTarget.Latest, true, soubor.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const zmeny = [];

  const preskocit = (n) => {
    const p = n.parent;
    if (!p) return false;
    if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isExternalModuleReference(p)) return true;
    if (ts.isImportTypeNode?.(p) || ts.isLiteralTypeNode(p)) return true;
    if ((ts.isPropertyAssignment(p) || ts.isPropertySignature(p) || ts.isMethodDeclaration(p)) && p.name === n) return true;
    if (ts.isElementAccessExpression(p) && p.argumentExpression === n) return true;
    /* atribut JSX, i když je řetězec zabalený do {`…`} nebo podmínky */
    for (let a = p, i = 0; a && i < 6; a = a.parent, i++) {
      if (ts.isJsxAttribute(a)) {
        const jmeno = a.name.getText(sf);
        if (ATRIBUTY_BEZ_TEXTU.has(jmeno) || jmeno.startsWith("data-")) return true;
        break;
      }
      if (!(ts.isJsxExpression(a) || ts.isTemplateExpression(a) || ts.isTemplateSpan(a) || ts.isParenthesizedExpression(a) || ts.isConditionalExpression(a) || ts.isBinaryExpression(a))) break;
    }
    if (ts.isCallExpression(p) && ts.isIdentifier(p.expression) && p.expression.text === "require") return true;
    return false;
  };

  const navstiv = (n) => {
    if (ts.isJsxText(n)) {
      const raw = zdroj.slice(n.pos, n.end);
      const nove = nbsp(raw, { jsx: true });
      if (nove !== raw) zmeny.push([n.pos, n.end, nove]);
    } else if (
      (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n) || ts.isTemplateHead(n) || ts.isTemplateMiddle(n) || ts.isTemplateTail(n)) &&
      !preskocit(n)
    ) {
      const start = n.getStart(sf);
      const raw = zdroj.slice(start, n.end);
      /* řetězce bez písmen (souřadnice, „0 0 100 100“) nejsou čtený text */
      if (!/\p{L}{2}/u.test(raw)) return ts.forEachChild(n, navstiv);
      const nove = nbsp(raw);
      if (nove !== raw) zmeny.push([start, n.end, nove]);
    }
    ts.forEachChild(n, navstiv);
  };
  navstiv(sf);

  if (!zmeny.length) return 0;
  let vystup = zdroj;
  for (const [a, b, t] of zmeny.sort((x, y) => y[0] - x[0])) vystup = vystup.slice(0, a) + t + vystup.slice(b);
  if (!CHECK) fs.writeFileSync(soubor, vystup);
  return zmeny.length;
}

/* ---------- JSON: hodnoty, ne klíče ---------- */

function zpracujJson(soubor) {
  const zdroj = fs.readFileSync(soubor, "utf8");
  let pocet = 0;
  /* měníme přímo text souboru, ať zůstane jeho formátování: každý řetězec, který není klíčem,
     nahradíme upravenou podobou na stejném místě */
  const vystup = zdroj.replace(/"((?:[^"\\]|\\.)*)"(\s*:)?/g, (cely, obsah, dvojtecka) => {
    if (dvojtecka) return cely; // klíč
    const hodnota = JSON.parse(`"${obsah}"`);
    const nova = nbsp(hodnota);
    if (nova === hodnota) return cely;
    pocet++;
    return JSON.stringify(nova);
  });
  if (!pocet) return 0;
  JSON.parse(vystup); // pojistka, že soubor zůstal platný
  if (!CHECK) fs.writeFileSync(soubor, vystup);
  return pocet;
}

/* ---------- soubory ---------- */

function soubory(dir, pripony, vynechat = () => false) {
  const out = [];
  const abs = path.join(ROOT, dir);
  if (!fs.existsSync(abs)) return out;
  for (const e of fs.readdirSync(abs, { withFileTypes: true })) {
    const rel = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...soubory(rel, pripony, vynechat));
    else if (pripony.some((p) => e.name.endsWith(p)) && !vynechat(rel)) out.push(rel);
  }
  return out;
}

/* route.ts (API, llms.txt) a sitemap/robots nejsou čtený text; video/ má scénáře pro hlasovou syntézu */
const vynechatApp = (rel) => /(^|\/)(route|sitemap|robots)\.ts$/.test(rel);
const ts_ = [
  ...soubory("topics", [".ts", ".tsx"]),
  ...soubory("content", [".ts", ".tsx"]),
  ...soubory("app", [".tsx"], vynechatApp),
  ...soubory("components", [".tsx"]),
];
const json = soubory("data", [".json"]);

let celkem = 0;
const zmenene = [];
for (const f of ts_) {
  const n = zpracujTs(path.join(ROOT, f));
  if (n) (celkem += n), zmenene.push(`${f} (${n})`);
}
for (const f of json) {
  const n = zpracujJson(path.join(ROOT, f));
  if (n) (celkem += n), zmenene.push(`${f} (${n})`);
}

if (CHECK && celkem) {
  console.error(`nbsp: chybí nezlomitelné mezery v ${zmenene.length} souborech:\n  ${zmenene.join("\n  ")}`);
  process.exit(1);
}
console.log(celkem ? `nbsp: upraveno ${celkem} textů v ${zmenene.length} souborech` : "nbsp: vše v pořádku");
