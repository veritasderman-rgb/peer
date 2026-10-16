import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "zdravi",
  titulek: "Kolik nás stojí, že jsme nemocní?",
  narration: {
    hook: "Špatné zdraví a předčasná úmrtí nás stojí sedm set miliard korun ročně, zhruba čtrnáct procent výkonu ekonomiky.",
    problem: "Muž v Česku prožije ve zdraví šedesát jedna a dvě desetiny roku, ve Švédsku sedmdesát jedna. Šedesát dva procent ztracených zdravých let dopadá na produktivní věk. Terénní služby pokryjí jen pět až deset procent potřeb.",
    proc: "Populace stárne, nemocnice berou čtyřicet šest a půl procenta rozpočtu a služby doma chybí.",
    navrh: "Lékaře odměníme za práci se životním stylem a daň ze slazených nápojů půjde i na prevenci. Méně lůžek, víc domácí péče, nemocnice na evropský podíl rozpočtu do roku dva tisíce třicet pět. Pečujícím víc služeb a částečné úvazky.",
    dopad: "Cíl je prodloužit život ve zdraví o pět let za jednu generaci.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
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
