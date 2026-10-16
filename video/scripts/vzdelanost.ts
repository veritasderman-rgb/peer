import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "vzdelanost",
  titulek: "Proč se nám nevyplácí šetřit na školkách?",
  narration: {
    hook: "Jen čtyři procenta dětí do tří let chodí do školky. Koruna do včasné péče se vrátí třikrát až čtyřikrát.",
    problem: "Pětina patnáctiletých neumí funkčně číst. Rodinné zázemí tvoří dvacet dva procent rozdílů mezi žáky, ve vyspělých zemích patnáct. Česko má dvě stě osmdesát jedna oborů středních škol, Švédsku osmnáct.",
    proc: "Zázemí tahá výsledky dolů, oborů je moc, studenti pracují místo školy a platy učitelů klesly na sto osm procent průměru.",
    navrh: "Péče od jednoho roku, školka ve dvou a čtvrtina dětí do tří let v péči. Školy s těžkým startem dostanou víc peněz a psychology. Středních oborů bude pod sto a víc praxe.",
    dopad: "Po patnácti až dvaceti letech reformy naroste ekonomika o padesát až sto miliard ročně.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
  hook: {
    cislo: "4 %",
    jednotka: "dětí do 3 let ve školce",
    veta: "Průměr OECD je 24 %, cíl EU 45 %. Každá koruna do včasné péče se vrátí 3–4×.",
  },
  problem: [
    { veta: "Pětina patnáctiletých neumí funkčně číst a podíl se nezmenšuje.", cislo: "20 %" },
    { veta: "Rodinné zázemí tvoří 22 % rozdílů ve výsledcích žáků. Průměr OECD je 15 %.", cislo: "22 %" },
    { veta: "Česko nabízí 281 oborů středních škol. Švédsku stačí 18.", cislo: "281" },
  ],
  proc: [
    "Znevýhodněné zázemí vede k horším výsledkům",
    "Roztříštěných 281 oborů, absolventi pracují jinde",
    "Studenti se živí prací a školu často nedokončí",
    "Platy učitelů klesly na 108 % průměrné mzdy",
  ],
  navrh: [
    { nazev: "Školka už od 1 roku", veta: "Péče od 1 roku, školka ve 2 letech a cíl 25 % dětí do 3 let v péči." },
    { nazev: "Pomoc školám s těžkým startem", veta: "Indexové financování a psychologové ve školách s více znevýhodněnými dětmi." },
    { nazev: "Méně oborů, víc praxe", veta: "Pod 100 oborů na středních školách a aspoň polovina bakalářů z oborů s praxí." },
  ],
  dopad: {
    cislo: "50–100 mld. Kč",
    veta: "Vyšší roční HDP po 15 až 20 letech reformy, řádově 1 % dnešního HDP.",
  },
};
