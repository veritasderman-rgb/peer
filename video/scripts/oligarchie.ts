import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "oligarchie",
  titulek: "Oligarchie za minutu",
  narration: {
    hook: "Gigantům míří ročně dvacet až třicet miliard korun dotací. Podle výzkumů z nich rostou zisky, inovace ne.",
    problem: "V transparentnosti vlastnictví médií jsme třetí nejhorší v Evropské unii. Veřejné zakázky tvoří čtrnáct procent výkonu ekonomiky a jejich přezkum je složitý. Dominantní hráči mají vyšší zisky než malé a střední firmy.",
    proc: "Moc se koncentruje, zákon o střetu zájmů se nevymáhá, dotace tečou do zisků velkých a ceny jdou společně nahoru.",
    navrh: "Zákon o střetu zájmů oddělí politiku od byznysu a vlivu v médiích. Silnější antimonopolní úřad dostane vyšší pokuty, právo rozdělit firmy a strop dominance pod čtyřicet procent. Zemědělské dotace dostanou strop na skutečného majitele.",
    dopad: "Dotace pro majitele nejvýš sto tisíc eur ročně a podpora jde rodinným farmám.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
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
