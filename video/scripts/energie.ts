import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "energie",
  titulek: "Kam každý rok odtečou stovky miliard?",
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
