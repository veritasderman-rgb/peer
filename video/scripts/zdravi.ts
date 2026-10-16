import type { VideoScript } from "@/lib/topics";

/* Zpětná vazba (říjen 2026): pro lidi mimo obor je ve videu moc čísel; po 700 mld. má hned přijít „proč“, pak problémy.
   Proto je pořadí hook → proč → problém a čísel je míň; všechna zůstávají z data/zdravi.json. */
export const script: VideoScript = {
  slug: "zdravi",
  titulek: "Kolik nás stojí, že jsme nemocní?",
  poradi: ["hook", "proc", "problem", "navrh", "dopad", "outro"],
  narration: {
    hook: "Sedm set miliard korun ročně. Tolik nás stojí špatné zdraví a předčasná úmrtí. Skoro sedmina výkonu ekonomiky.",
    proc: "Proč? Žijeme dlouho, ale ne ve zdraví. Léčíme pozdě a draze, většina peněz jde do nemocnic. A doma chybí služby, takže pečující odcházejí z práce.",
    problem: "Český muž prožije ve zdraví šedesát jedna let. Švéd o deset víc. Lidí nad osmdesát bude za generaci dvakrát tolik. A terénní služby dnes pokryjí jen zlomek potřeb, zbytek nesou rodiny.",
    navrh: "Co s tím? Lékaře odměníme za práci se životním stylem a daň ze slazených nápojů půjde do prevence. Péči přesuneme z lůžek blíž domovu. A pečujícím dáme služby a částečné úvazky, aby nemuseli z práce odejít.",
    dopad: "Cíl je prodloužit život ve zdraví o pět let za jednu generaci.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
  hook: {
    cislo: "700 mld. Kč",
    jednotka: "ročně",
    veta: "Tolik nás stojí špatné zdraví a předčasná úmrtí. Skoro sedmina výkonu ekonomiky.",
  },
  proc: [
    "Žijeme dlouho, ale ne ve zdraví",
    "Léčíme pozdě a draze: peníze jdou do nemocnic",
    "Doma chybí služby, pečující odcházejí z práce",
  ],
  problem: [
    { veta: "prožije ve zdraví český muž. Švéd o deset víc.", cislo: "61 let" },
    { veta: "tolik lidí nad 80 let za jednu generaci. Péči zaplatí pracující.", cislo: "2×" },
    { veta: "potřeb pokryjí terénní služby. Zbytek nesou rodiny.", cislo: "5–10 %" },
  ],
  navrh: [
    { nazev: "Prevence", veta: "Lékaře odměníme za práci se životním stylem, daň ze slazených nápojů půjde do prevence." },
    { nazev: "Péče blíž domovu", veta: "Méně lůžek, víc ambulantní a domácí péče. Nemocnice na evropský podíl rozpočtu do roku 2035." },
    { nazev: "Podpora pečujících", veta: "Terénní a odlehčovací služby a částečné úvazky, aby pečující nemuseli z práce odejít." },
  ],
  dopad: {
    cislo: "+5 let",
    veta: "Cíl: prodloužit život ve zdraví o 5 let během jedné generace.",
  },
};
