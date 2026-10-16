import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "zdravi",
  titulek: "Kolik nás stojí, že jsme nemocní?",
  hook: {
    cislo: "700 mld. Kč",
    jednotka: "ročně",
    veta: "Tolik nás stojí špatné zdraví a předčasná úmrtí. Zhruba 14 % HDP.",
  },
  problem: [
    { veta: "Muž v Česku prožije ve zdraví 61,2 roku. Ve Švédsku zhruba 71.", cislo: "61,2" },
    { veta: "Většina ztracených zdravých let dopadá na lidi v produktivním věku.", cislo: "62 %" },
    { veta: "Pečující odcházejí z práce a terénní služby pokrývají jen malou část potřeb.", cislo: "5–10 %" },
  ],
  proc: [
    "Populace stárne, počet lidí 80+ se zdvojnásobí",
    "Výdaje rostou s věkem, příjmy stojí na pracujících",
    "Nemocnice berou 46,5 % rozpočtu, v EU 36,4 %",
    "Služby doma chybí, pečující odcházejí z práce",
  ],
  navrh: [
    { nazev: "Prevence", veta: "Lékaře odměníme za práci se životním stylem a daň ze slazených nápojů půjde i do prevence." },
    { nazev: "Péče blíž domovu", veta: "Méně lůžek, víc ambulantní a domácí péče. Nemocnice na 36,4 % rozpočtu do roku 2035." },
    { nazev: "Podpora pečujících", veta: "Víc terénních služeb a částečných úvazků, aby pečující nemuseli z práce odejít." },
  ],
  dopad: {
    cislo: "+5 let",
    veta: "Cíl: prodloužit život ve zdraví o 5 let během jedné generace.",
  },
};
