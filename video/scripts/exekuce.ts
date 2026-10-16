import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "exekuce",
  titulek: "Proč se půl milionu lidí nevyplatí pracovat?",
  narration: {
    hook: "Pět set devadesát tisíc lidí je v exekuci. Nad třicet jedna tisíc pět set hrubého zmizí každá další koruna.",
    problem: "Většině dlužníků zabaví šedesát šest procent, nad hranicí všechno. Zaměstnavatele stojí správa exekucí pět set až tři tisíce korun měsíčně. Dítě z exekuční rodiny častěji nedokončí školu a stát to stojí dva až tři miliony.",
    proc: "Dluhy klesají o procento ročně, přesčasy nedávají smysl a stát přichází o daně.",
    navrh: "Srážka nejvýš padesát procent, dlužníkovi zůstane aspoň půlka. Jeden dlužník, jeden exekutor, podle zaměstnavatelů ubude víc než polovina papírování. Samoživitelé neklesnou pod hranici chudoby, dvanáct tisíc osm set osmnáct korun.",
    dopad: "Do roku dva tisíce třicet o třicet procent míň lidí v exekuci, nejvýš čtyři sta třináct tisíc.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
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
