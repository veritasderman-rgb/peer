import type { ComponentType, ReactNode } from "react";

/* Společné typy pro všechna témata. Každé téma = data/<slug>.json (čísla a zdroje ze studie)
   + content/<slug>-plne-zneni.ts (plné znění) + topics/<slug>.tsx (redakční vrstva: příběh, „pro tebe“, grafy). */

export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export type Mood = "neutral" | "surprised" | "thinking" | "happy" | "sleepy";

export type StoryStep = { mood: Mood; pointing?: boolean; title?: string; text: ReactNode; /* co k tomu říká garant kapitoly (pole se jmenuje bobr z historických důvodů) */ bobr?: string };

export type BarItem = { label: string; value: number; note?: string; highlight?: boolean };

export type ChartSpec =
  | { typ: "bar"; title: string; unit?: string; max?: number; items: BarItem[]; goal?: { value: number; label: string }; source?: string }
  | { typ: "donut"; title?: string; parts: { label: string; value: number; color?: "sun" | "river" | "muted" }[]; centerValue: string; centerLabel: string; source?: string }
  | { typ: "index"; title?: string; source?: string; series?: { label: string; short: string; end: number; color: "alert" | "river" | "sun" }[]; startYear?: number; endYear?: number }
  | { typ: "bignumber"; value: number; decimals?: number; unit?: string; prefix?: string; label?: string; source?: string }
  | { typ: "compare"; title: string; left: { label: string; value: string; sub?: string }; right: { label: string; value: string; sub?: string }; diff?: string; source?: string };

export type Opatreni = { cislo: number; nazev: string; popis: string; klicoveCislo?: string | null; proTebe: string };

/* Scénář videa „Strategie za minutu“: stejný scénář se renderuje jako 16:9 i 9:16.
   Vše krátké: na obrazovce je vždy jedna věta, garant kapitoly a jedno číslo. */
/* Mluvený komentář k videu: jeden odstavec na scénu, čísla slovy (kvůli hlasu), tykání, hravě. */
export type Narration = {
  hook: string;
  problem: string;
  proc: string;
  navrh: string;
  dopad: string;
  outro: string;
};

export type VideoScript = {
  slug: string;
  titulek: string;
  narration?: Narration;
  /* pořadí scén; výchozí je hook, problem, proc, navrh, dopad, outro. Scénář může dát „proč“ před „problém“. */
  poradi?: ("hook" | "problem" | "proc" | "navrh" | "dopad" | "outro")[];
  hook: { cislo: string; jednotka: string; veta: string };
  problem: { veta: string; cislo?: string }[];
  proc: string[];
  navrh: { nazev: string; veta: string }[];
  dopad: { cislo: string; veta: string };
  outro?: string;
};

export type TopicConfig = {
  slug: string;
  cislo: number;
  nazev: string;
  kratkyNazev: string;
  kapitola: string;
  pilir: string;
  popisMeta: string;
  hook: {
    h1: string;
    value: number;
    decimals?: number;
    unit: string;
    label: string;
    lede: string;
    source: string;
    /* věta, kterou v bublině říká garant kapitoly (název pole zůstal z doby maskota) */
    bobr: string;
    /* nálada garanta u té věty */
    bobrMood?: Mood;
  };
  srovnani?: { nadpis: string; grafy: ChartSpec[]; poznamka?: string };
  persona: { who: string; ctx: string };
  pribehNadpis: string;
  steps: StoryStep[];
  proc: { uvod: string; retezec: { nazev: string; popis: string }[]; loop?: { nazev: string; popis: string }; dalsi: { nazev: string; popis: string }[] };
  cisla?: { nadpis: string; grafy: ChartSpec[]; poznamka?: string };
  opatreniUvod: string;
  opatreni: Opatreni[];
  cile: { hodnota: number | string; jednotka: string; cil: string }[];
  stoji: { odstavce: string[]; /* poznámka garanta kapitoly (název pole zůstal z doby maskota) */ bobr: string };
  kalkulacky?: ComponentType[];
  garant: { jmeno: string; role: string; initials: string; citace?: string; citaceZdroj?: { text: string; url: string } };
  plneZneniNadpis: string;
  plneZneni: Blok[];
  zdroje: { index: number; citace: string }[];
  slovnik: { pojem: string; vysvetleni: string }[];
  /* titulky = WebVTT k namluvenému komentáři (scripts/captions.mjs), prepis = odstavce komentáře pod přehrávačem */
  video?: { wide: string; reel: string; poster?: string; titulek: string; popis?: string; titulky?: string; prepis?: string[] };
  dalsi?: string;
};
