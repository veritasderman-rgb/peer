/* Adresa webu pro absolutní odkazy (sitemapa, canonical, OG obrázky, JSON-LD).
   Nastavuje se NEXT_PUBLIC_SITE_URL (např. https://ceskomanavic.cz); na Vercelu se bez ní použije
   produkční doména projektu, při vývoji localhost. */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined;

export const SITE_URL = fromEnv ?? fromVercel ?? "http://localhost:3000";
export const SITE_NAME = "Česko má na víc!";
export const SITE_DESCRIPTION =
  "Hospodářská strategie 2026–2035 Pirátské expertní ekonomické rady (PEER) vysvětlená pro běžné lidi: 14 témat, bobr, videa, kalkulačky a plné znění se zdroji.";
export const ORG = { name: "Pirátská expertní ekonomická rada (PEER)", url: "https://peer.pirati.cz/" };

export const abs = (path: string) => new URL(path, SITE_URL).toString();
