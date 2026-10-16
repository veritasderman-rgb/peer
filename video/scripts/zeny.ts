import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "zeny",
  titulek: "Proč nás v mzdách předběhlo Polsko?",
  hook: {
    cislo: "18,5 %",
    jednotka: "mzdový rozdíl",
    veta: "Ženy berou o 18,5 % méně než muži. To je druhý nejvyšší rozdíl v EU.",
  },
  problem: [
    { veta: "Po narození dítěte žena vydělává dvacet let o 10 % méně než bezdětná kolegyně.", cislo: "10 %" },
    { veta: "Ve veřejném sektoru je rozdíl 17 %, největší v celé EU.", cislo: "17 %" },
    { veta: "Česku chybí 30–40 tisíc míst v předškolní péči.", cislo: "30–40 tis." },
  ],
  proc: [
    "Po dítěti se žena vrací na horší pozici",
    "Míst ve školkách je málo a péče je drahá",
    "Zaměstnanost žen s dětmi do 6 let je jen 55 %",
    "Výsledek: druhý největší mzdový rozdíl v EU",
  ],
  navrh: [
    { nazev: "Péče od jednoho roku", veta: "Upravíme třídy ve školkách a podpoříme dětské skupiny i firemní školky." },
    { nazev: "Cenový strop", veta: "Dětská skupina nebude stát víc než cca 3 750 Kč měsíčně, ne až 7 466 Kč." },
    { nazev: "Stát jde příkladem", veta: "Do roku 2035 snížíme rozdíl platů mužů a žen ve veřejném sektoru na polovinu." },
  ],
  dopad: {
    cislo: "4,9 mld. Kč",
    veta: "Každé 1 % snížení mzdové mezery v soukromém sektoru přidá rozpočtům 4,9 mld. Kč ročně.",
  },
};
