import { readFileSync } from "node:fs";
import { join } from "node:path";
import { GARANTI } from "@/lib/garanti";

/* Stránka /overeni (skrytá): seznam bodů k ověření garanty se bere přímo z docs/k-overeni.md.
   Server-only (čte soubor), v klientských komponentách se nepoužívá.
   Id položky = id sekce + krátký hash textu bodu (ne pořadí), takže přeskládání bodů stavy nerozbije;
   změna znění bodu ale dává nové id (a bod se tím vrací do stavu „čeká“, což je záměr). */

export type PolozkaOvereni = { id: string; text: string };
export type SekceOvereni = {
  id: string;
  nadpis: string;
  /** jméno garanta, jen když závorka v nadpisu odpovídá členu z lib/garanti.ts */
  garant?: string;
  /** odstavce pod nadpisem mimo odrážky (úvod sekce) */
  uvod: string[];
  polozky: PolozkaOvereni[];
};

export type StavOvereni = {
  stav: "potvrzeno" | "opraveno" | "sporne";
  kdo: string;
  kdy: string;
  poznamka?: string;
};

export function slug(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** FNV-1a 32 bit, base 36, 6 znaků: krátké, deterministické, bez závislosti. */
function hash(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(36).padStart(6, "0").slice(0, 6);
}

const JMENA = new Set(Object.values(GARANTI).map((g) => g.jmeno));

/** Čistá funkce kvůli testům: z markdownu udělá sekce. Bere jen sekce úrovně „## “. */
export function parsujOvereni(md: string): SekceOvereni[] {
  const sekce: SekceOvereni[] = [];
  let ted: SekceOvereni | null = null;
  let posledniPolozka = false;
  const pouzita = new Set<string>();

  for (const radek of md.split(/\r?\n/)) {
    const h = /^##\s+(.+?)\s*$/.exec(radek);
    if (h) {
      const zavorka = /^(.*?)\s*\(([^()]+)\)\s*$/.exec(h[1]);
      const garant = zavorka && JMENA.has(zavorka[2]) ? zavorka[2] : undefined;
      const nadpis = garant && zavorka ? zavorka[1] : h[1];
      let id = slug(nadpis);
      for (let i = 2; pouzita.has(id); i++) id = `${slug(nadpis)}-${i}`;
      pouzita.add(id);
      ted = { id, nadpis, garant, uvod: [], polozky: [] };
      sekce.push(ted);
      posledniPolozka = false;
      continue;
    }
    if (!ted) continue;
    const b = /^[-*]\s+(.+?)\s*$/.exec(radek);
    if (b) {
      const text = b[1];
      let id = `${ted.id}-${hash(text)}`;
      for (let i = 2; ted.polozky.some((p) => p.id === id); i++) id = `${ted.id}-${hash(text)}-${i}`;
      ted.polozky.push({ id, text });
      posledniPolozka = true;
      continue;
    }
    if (radek.trim() === "") {
      posledniPolozka = false;
      continue;
    }
    if (/^\s+\S/.test(radek) && posledniPolozka && ted.polozky.length > 0) {
      /* pokračování odrážky na dalším řádku: připojí se k poslední položce (id se přepočítá) */
      const p = ted.polozky[ted.polozky.length - 1];
      p.text += ` ${radek.trim()}`;
      p.id = `${ted.id}-${hash(p.text)}`;
      continue;
    }
    ted.uvod.push(radek.trim());
  }
  return sekce.filter((s) => s.polozky.length > 0);
}

export function nactiOvereni(): SekceOvereni[] {
  const md = readFileSync(join(process.cwd(), "docs", "k-overeni.md"), "utf8");
  return parsujOvereni(md);
}
