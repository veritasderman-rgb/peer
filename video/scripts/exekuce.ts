import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "exekuce",
  titulek: "Proč se půl milionu lidí nevyplatí pracovat?",
  hook: {
    cislo: "590 000",
    jednotka: "lidí v exekuci",
    veta: "Kdo vydělá nad 31 500 Kč hrubého, přijde o každou další korunu.",
  },
  problem: [
    { veta: "Většina dlužníků čelí 66% srážce. Nad cca 31 500 Kč hrubého je to 100 %.", cislo: "100 %" },
    { veta: "Zaměstnavatele stojí správa exekucí 500 až 3 000 Kč měsíčně na člověka.", cislo: "500–3 000 Kč" },
    { veta: "Dítě z exekuční rodiny častěji nedokončí školu. Stát to stojí 2–3 mil. Kč na člověka.", cislo: "2–3 mil. Kč" },
  ],
  proc: [
    "Dluhy klesají jen o 1 % ročně, odpisem",
    "Nad hranicí příjmu přicházíš o každou korunu",
    "Přesčasy a kariérní růst nedávají smysl",
    "Stát přichází o daně a odvody",
  ],
  navrh: [
    { nazev: "Srážka nejvýš 50 %", veta: "Z každé vydělané koruny zůstane dlužníkovi vždy aspoň polovina." },
    { nazev: "Jeden dlužník, jeden exekutor", veta: "Podle zaměstnavatelů sníží jejich administrativu o více než polovinu." },
    { nazev: "Reforma nezabavitelného minima", veta: "Samoživitelé po srážkách neklesnou pod hranici chudoby 12 818 Kč." },
  ],
  dopad: {
    cislo: "≤ 413 000",
    veta: "Cíl do roku 2030: o 30 % méně lidí v exekuci, z 590 000 na nejvýš 413 000.",
  },
};
