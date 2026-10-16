import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "vzdelanost",
  titulek: "Proč se nám nevyplácí šetřit na školkách?",
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
