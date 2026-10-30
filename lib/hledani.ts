/* Hledání na webu: čisté funkce nad indexem public/hledat.json (vyrábí ho scripts/build-search-index.mjs).
   Bez diakritiky a bez ohledu na velikost písmen („hypoteka“ najde „Hypotéka“), každé slovo dotazu musí
   sedět (na začátek slova; u delších slov stačí kmen, ať „exekuce“ najde i „exekucí“ a „hypotéka“ „hypotéky“).
   Shoda v titulku váží víc než shoda v textu. Úryvek a titulek se vrací jako segmenty, ne jako HTML. */

export type TypZaznamu = "tema" | "opatreni" | "slovnik" | "otazka" | "plne-zneni" | "stranka";

export type Zaznam = { url: string; titulek: string; typ: TypZaznamu; text: string; tema?: string };

export type Segment = { text: string; zvyrazneno: boolean };

export type Vysledek = {
  zaznam: Zaznam;
  skore: number;
  titulek: Segment[];
  uryvek: Segment[];
};

/* Záznam s předpočítaným normalizovaným textem, ať se při každém stisku klávesy nenormalizuje znovu. */
export type Pripraveny = { zaznam: Zaznam; titulek: string; text: string; poradi: number };

export const TYPY: { typ: TypZaznamu; nazev: string }[] = [
  { typ: "tema", nazev: "Téma" },
  { typ: "opatreni", nazev: "Opatření" },
  { typ: "otazka", nazev: "Otázka" },
  { typ: "slovnik", nazev: "Slovník" },
  { typ: "plne-zneni", nazev: "Plné znění" },
  { typ: "stranka", nazev: "Stránka" },
];

const VAHA_TYPU: Record<TypZaznamu, number> = { tema: 4, opatreni: 3, otazka: 3, stranka: 2, slovnik: 1, "plne-zneni": 0 };

const ZNAKY_SLOVA = /[\p{L}\p{N}]/u;
const CISLO = /^\p{N}+$/u;
const CISLICE = /\p{N}/u;

/* Jeden znak (code point) → malé písmeno bez diakritiky. */
function slozZnak(ch: string): string {
  if (ch === "\u00a0") return " "; // nezlomitelná mezera z typografie (scripts/nbsp.mjs) je pro hledání obyčejná
  return ch.normalize("NFD").replace(/\p{M}+/gu, "").toLowerCase();
}

/* Malá písmena bez diakritiky: „Hypotéka“ → „hypoteka“. */
export function normalizuj(s: string): string {
  return s.replace(/\u00a0/g, " ").normalize("NFD").replace(/\p{M}+/gu, "").toLowerCase();
}

/* Normalizace s mapou pozic: mapa[i] = index v původním textu, odkud pochází i-tý znak normalizovaného textu.
   (Složení znaku může mít jinou délku než originál, proto se mapuje po znacích.) */
export function normalizujSMapou(s: string): { norm: string; mapa: number[] } {
  let norm = "";
  const mapa: number[] = [];
  let i = 0;
  for (const ch of s) {
    const n = slozZnak(ch);
    for (let k = 0; k < n.length; k++) mapa.push(i);
    norm += n;
    i += ch.length;
  }
  mapa.push(s.length);
  return { norm, mapa };
}

/* Dotaz → unikátní normalizovaná slova (písmena a číslice), nejdelší první. */
export function tokenizuj(dotaz: string): string[] {
  const slova = normalizuj(dotaz).split(/[^\p{L}\p{N}]+/u).filter(Boolean);
  return Array.from(new Set(slova)).sort((a, b) => b.length - a.length || a.localeCompare(b));
}

/* Kmen pro české skloňování: u slov od 5 znaků se uřízne koncovka (1 znak, od 7 znaků 2). */
export function kmen(token: string): string {
  if (CISLO.test(token)) return token;
  if (token.length >= 7) return token.slice(0, -2);
  if (token.length >= 5) return token.slice(0, -1);
  return token;
}

const zacatekSlova = (norm: string, i: number) => i === 0 || !ZNAKY_SLOVA.test(norm[i - 1]);

/* Všechny výskyty `hledane` na začátku slova v normalizovaném textu. */
function vyskyty(norm: string, hledane: string): number[] {
  const out: number[] = [];
  if (!hledane) return out;
  let i = norm.indexOf(hledane);
  while (i !== -1) {
    if (zacatekSlova(norm, i)) out.push(i);
    i = norm.indexOf(hledane, i + 1);
  }
  return out;
}

type Shoda = { presna: number[]; kmenova: number[] };

function shoda(norm: string, token: string): Shoda {
  let presna = vyskyty(norm, token);
  /* čísla jen celá: „2“ nenajde „242“ */
  if (CISLO.test(token)) presna = presna.filter((i) => !CISLICE.test(norm[i + token.length] ?? ""));
  const k = kmen(token);
  const kmenova = k !== token ? vyskyty(norm, k).filter((i) => !presna.includes(i)) : [];
  return { presna, kmenova };
}

const nicNenaslo = (s: Shoda) => s.presna.length === 0 && s.kmenova.length === 0;

export function priprav(zaznamy: Zaznam[]): Pripraveny[] {
  return zaznamy.map((zaznam, poradi) => ({ zaznam, poradi, titulek: normalizuj(zaznam.titulek), text: normalizuj(zaznam.text) }));
}

/* Skóre záznamu, nebo null, když některé slovo dotazu nesedí ani v titulku, ani v textu. */
export function skoruj(p: Pripraveny, tokeny: string[], celyDotaz = tokeny.join(" ")): number | null {
  if (tokeny.length === 0) return null;
  let skore = 0;
  for (const t of tokeny) {
    const vt = shoda(p.titulek, t);
    const vx = shoda(p.text, t);
    if (nicNenaslo(vt) && nicNenaslo(vx)) return null;
    if (vt.presna.length) {
      skore += 10;
      /* celé slovo, ne jen začátek */
      if (vt.presna.some((i) => !ZNAKY_SLOVA.test(p.titulek[i + t.length] ?? " "))) skore += 4;
    } else if (vt.kmenova.length) skore += 7;
    if (vx.presna.length) skore += 3 + Math.min(vx.presna.length, 4) * 0.5;
    else if (vx.kmenova.length) skore += 2 + Math.min(vx.kmenova.length, 4) * 0.25;
  }
  if (tokeny.length > 1 && celyDotaz && p.titulek.includes(celyDotaz)) skore += 6;
  if (p.titulek === celyDotaz) skore += 10;
  return skore + VAHA_TYPU[p.zaznam.typ];
}

/* Úseky [od, do) v normalizovaném textu ke zvýraznění: od výskytu do konce slova, sloučené. */
function useky(norm: string, tokeny: string[]): [number, number][] {
  const raw: [number, number][] = [];
  for (const t of tokeny) {
    const s = shoda(norm, t);
    for (const i of [...s.presna, ...s.kmenova]) {
      let j = i;
      while (j < norm.length && ZNAKY_SLOVA.test(norm[j])) j++;
      raw.push([i, Math.max(j, i + 1)]);
    }
  }
  raw.sort((a, b) => a[0] - b[0]);
  const out: [number, number][] = [];
  for (const u of raw) {
    const last = out[out.length - 1];
    if (last && u[0] <= last[1]) last[1] = Math.max(last[1], u[1]);
    else out.push([...u]);
  }
  return out;
}

/* Text rozdělený na segmenty se zvýrazněnými shodami. `od`/`do` vyřízne část původního textu. */
export function zvyrazni(text: string, tokeny: string[], od = 0, doIndex = text.length): Segment[] {
  const { norm, mapa } = normalizujSMapou(text);
  const segs: Segment[] = [];
  let pos = od;
  for (const [a, b] of useky(norm, tokeny)) {
    const oa = mapa[a];
    const ob = mapa[b];
    if (ob <= od || oa >= doIndex) continue;
    const s = Math.max(oa, od);
    const e = Math.min(ob, doIndex);
    if (s > pos) segs.push({ text: text.slice(pos, s), zvyrazneno: false });
    segs.push({ text: text.slice(s, e), zvyrazneno: true });
    pos = e;
  }
  if (pos < doIndex) segs.push({ text: text.slice(pos, doIndex), zvyrazneno: false });
  return segs.filter((s) => s.text.length > 0);
}

/* Úryvek kolem první shody (nebo začátek textu), zhruba `delka` znaků, oříznutý na hranici slov, s „…“. */
export function uryvek(text: string, tokeny: string[], delka = 180): Segment[] {
  if (!text) return [];
  const { norm, mapa } = normalizujSMapou(text);
  const prvni = useky(norm, tokeny)[0];
  let od = 0;
  if (prvni && text.length > delka) {
    const start = mapa[prvni[0]];
    od = Math.min(Math.max(0, start - Math.round(delka * 0.3)), Math.max(0, text.length - delka));
    if (od > 0) {
      const mezera = text.indexOf(" ", od);
      if (mezera !== -1 && mezera < start) od = mezera + 1;
    }
  }
  let doIndex = Math.min(text.length, od + delka);
  if (doIndex < text.length) {
    const mezera = text.lastIndexOf(" ", doIndex);
    if (mezera > od + delka * 0.6) doIndex = mezera;
  }
  const segs = zvyrazni(text, tokeny, od, doIndex);
  if (od > 0) segs.unshift({ text: "…", zvyrazneno: false });
  if (doIndex < text.length && !text.slice(0, doIndex).endsWith("…")) segs.push({ text: "…", zvyrazneno: false });
  return segs;
}

/* Hlavní vstup: seřazené výsledky. Stejná adresa se stejným titulkem (kousky plného znění) se ukáže jednou,
   s nejlepší shodou. */
export function hledej(index: Pripraveny[], dotaz: string, limit = Infinity): Vysledek[] {
  const tokeny = tokenizuj(dotaz);
  if (tokeny.length === 0) return [];
  const celyDotaz = normalizuj(dotaz).split(/[^\p{L}\p{N}]+/u).filter(Boolean).join(" ");
  const nalezene: { p: Pripraveny; skore: number }[] = [];
  for (const p of index) {
    const skore = skoruj(p, tokeny, celyDotaz);
    if (skore !== null) nalezene.push({ p, skore });
  }
  nalezene.sort((a, b) => b.skore - a.skore || a.p.poradi - b.p.poradi);
  const videno = new Set<string>();
  const out: Vysledek[] = [];
  for (const { p, skore } of nalezene) {
    const klic = `${p.zaznam.url}\u0000${p.zaznam.titulek}`;
    if (videno.has(klic)) continue;
    videno.add(klic);
    out.push({ zaznam: p.zaznam, skore, titulek: zvyrazni(p.zaznam.titulek, tokeny), uryvek: uryvek(p.zaznam.text, tokeny) });
    if (out.length >= limit) break;
  }
  return out;
}
