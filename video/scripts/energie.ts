import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "energie",
  titulek: "Kam každý rok odtečou stovky miliard?",
  narration: {
    hook: "Ročně odteče za uhlí, ropu a plyn dvě stě šedesát dva miliard korun. Mohly zůstat tady.",
    problem: "Po přepočtu na kupní sílu máme druhou nejdražší elektřinu v Evropské unii. Solárů přibylo nula celá sedm gigawattu, potřeba je přes jeden. Přes dvacet gigawattů sítě blokují rezervace nestavěných projektů.",
    proc: "Uhlí končí dřív než jeho náhrada, zdroje i síť váznou a elektřina je čtyřikrát dražší než plyn.",
    navrh: "Ročně přes gigawatt slunce, dvě stě megawattů větru a dvě gigawatthodiny baterií. Nestavěné rezervace propadnou a uvolníme aspoň dva gigawatty. Od roku dva tisíce dvacet osm vrátíme polovinu výnosů z povolenek, pět tisíc korun na domácnost.",
    dopad: "Cíl je elektřina jen skoro třikrát dražší než plyn, aby se čerpadlo vyplatilo.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
  hook: {
    cislo: "262 mld. Kč",
    jednotka: "za dovoz paliv ročně",
    veta: "Tolik odteklo v roce 2025 za uhlí, ropu a plyn. Peníze, které mohly zůstat tady.",
  },
  problem: [
    { veta: "České domácnosti platí druhou nejdražší elektřinu v EU, počítáno na kupní sílu.", cislo: "2. místo" },
    { veta: "Solárů loni přibylo 0,7 GW. Potřebujeme přes 1 GW ročně.", cislo: "0,7 GW" },
    { veta: "Přes 20 GW kapacity sítě drží rezervace projektů, které se roky nestaví.", cislo: "20 GW" },
  ],
  proc: [
    "Uhlí končí dřív, než je hotová náhrada",
    "Povolování a zablokovaná síť brzdí domácí zdroje",
    "Elektřina je 4× dražší než plyn, čerpadlo se nevyplatí",
    "Teplárny berou z uhlí téměř polovinu dodávek",
  ],
  navrh: [
    { nazev: "Rychlejší domácí zdroje", veta: "Ročně přes 1 GW slunce, 200 MW větru a 2 GWh baterií. Obce dostanou výnos z větru." },
    { nazev: "Odblokovaná síť", veta: "Rezervace, které se nestaví, propadnou. Uvolníme aspoň 2 GW kapacity ročně." },
    { nazev: "Energetický kupón", veta: "Od roku 2028 vrátíme polovinu výnosů z povolenek lidem. Zhruba 5 000 Kč ročně na domácnost." },
  ],
  dopad: {
    cislo: "2,7 : 1",
    veta: "Cíl: poměr cen elektřiny a plynu pod bod zvratu, aby se tepelné čerpadlo vyplatilo.",
  },
};
