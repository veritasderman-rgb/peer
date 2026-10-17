/* Adresa webu pro absolutní odkazy (sitemapa, canonical, OG obrázky, JSON-LD).
   Nastavuje se NEXT_PUBLIC_SITE_URL (např. https://ceskomanavic.cz); na Vercelu se bez ní použije
   produkční doména projektu, při vývoji localhost. */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined;

export const SITE_URL = fromEnv ?? fromVercel ?? "http://localhost:3000";
export const SITE_NAME = "Česko má na víc!";
export const SITE_DESCRIPTION =
  "Hospodářská strategie 2026–2035 Pirátské expertní ekonomické rady (PEER) vysvětlená pro běžné lidi: 14 témat, videa s garanty, kalkulačky a plné znění se zdroji.";
export const ORG = { name: "Pirátská expertní ekonomická rada (PEER)", url: "https://peer.pirati.cz/" };

export const abs = (path: string) => new URL(path, SITE_URL).toString();

/* Kam hlásit chyby: e-mail (NEXT_PUBLIC_KONTAKT_EMAIL) a repozitář s issues (NEXT_PUBLIC_REPO_URL). */
export const KONTAKT_EMAIL = process.env.NEXT_PUBLIC_KONTAKT_EMAIL ?? "josef@josefpavlovic.cz";
export const REPO_URL = (process.env.NEXT_PUBLIC_REPO_URL ?? "https://github.com/veritasderman-rgb/peer").replace(/\/$/, "");

/* Velké soubory (videa, zvuk) mohou ležet mimo repo: NEXT_PUBLIC_MEDIA_URL = základ adresy (např. Vercel Blob).
   Bez ní se berou z public/. Cesty v datech zůstávají relativní („/video/bydleni-wide.mp4“).
   Titulky (.vtt) zůstávají vždy na webu: <track> z cizí domény by potřeboval CORS. */
const MEDIA_BASE = process.env.NEXT_PUBLIC_MEDIA_URL?.replace(/\/$/, "") ?? "";
export const media = (path: string) =>
  MEDIA_BASE && /^\/(video|audio)\/.+\.(mp4|jpg|mp3)$/.test(path) ? `${MEDIA_BASE}${path}` : path;
