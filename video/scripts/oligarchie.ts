import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "oligarchie",
  titulek: "Oligarchie za minutu",
  hook: {
    cislo: "20–30",
    jednotka: "mld. Kč ročně",
    veta: "Tolik vysokých dotací míří gigantům. Podle výzkumů do zisku, ne do inovací.",
  },
  problem: [
    { veta: "Jsme třetí nejhorší v EU v transparentnosti vlastnictví médií.", cislo: "3. od konce" },
    { veta: "Veřejné zakázky tvoří skoro bilion Kč a jejich přezkum je složitý.", cislo: "14 % HDP" },
    { veta: "Dominantní hráči mají vyšší zisky než malé a střední firmy." },
  ],
  proc: [
    "Byznysová, mediální i politická moc se koncentruje.",
    "Zákon o střetu zájmů se nevymáhá.",
    "Dotace se přesouvají do zisku velkých firem.",
    "Tichý oligopol vede ceny souběžně nahoru.",
  ],
  navrh: [
    { nazev: "Zákon o střetu zájmů", veta: "Politická moc se nesmí směšovat s byznysem a vlivem v médiích." },
    { nazev: "Silnější ÚOHS", veta: "Divestitura, vyšší pokuty a strop tržní dominance pod 40 %." },
    { nazev: "Strop zemědělských dotací", veta: "Nejvýše 100 tis. EUR ročně na skutečného majitele." },
  ],
  dopad: { cislo: "100 tis. EUR", veta: "ročně nejvýše na skutečného majitele. Podpora jde rodinným farmám." },
};
