import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "prumysl",
  titulek: "Průmysl za minutu",
  narration: {
    hook: "Ročně odteče do zahraničí tři sta čtyřicet miliard korun dividend. Vyrábíme jako elita, bohatneme jako průměr.",
    problem: "Firmy pod zahraniční kontrolou dělají šedesát procent přidané hodnoty průmyslu. Jejich zisky dosáhly šesti set dvou miliard korun, sedm procent výkonu ekonomiky. Odpočet na vývoj využilo jen sedm set dvacet jedna firem.",
    proc: "Subdodavatel si cenu nediktuje, marže leží v návrhu a značce, mzdy narazí na strop a zisk odchází ven.",
    navrh: "Stát bude prvním zákazníkem, až jedno procento zakázek, osm miliard čtyři sta milionů, půjde na vývoj. Firmy odepíšou automatizaci a software v prvním roce. Univerzity dostanou vzorové smlouvy, ať firma z laboratoře nečeká dva roky.",
    dopad: "Dvě stě univerzitních firem do roku dva tisíce třicet dva, pětkrát víc než dnes.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
  hook: {
    cislo: "340 mld. Kč",
    jednotka: "dividend do zahraničí ročně",
    veta: "Vyrábíme jako elita, bohatneme jako průměr.",
  },
  problem: [
    { veta: "Firmy pod zahraniční kontrolou vytvářejí 60 % přidané hodnoty průmyslu.", cislo: "60 %" },
    { veta: "Zisky zahraničních vlastníků dosáhly 602 mld. Kč, tedy 7 % HDP.", cislo: "602 mld. Kč" },
    { veta: "Daňový odpočet na vývoj využilo jen 721 firem, nejméně od roku 2010.", cislo: "721 firem" },
  ],
  proc: [
    "Subdodavatel si nediktuje cenu.",
    "Marže leží v návrhu, softwaru a značce.",
    "Při nízké marži narazí mzdy na strop.",
    "Velká část zisku odchází k vlastníkům.",
  ],
  navrh: [
    { nazev: "Stát jako první zákazník", veta: "Až 1 % zakázek, zhruba 8,4 mld. Kč ročně, jde na vývoj nových řešení." },
    { nazev: "Okamžité odpisy investic", veta: "Firma odepíše celou investici do automatizace a softwaru v prvním roce." },
    { nazev: "Z laboratoří na trhy", veta: "Vzorové smlouvy a lhůta pro univerzity, aby spin-off nečekal dva roky." },
  ],
  dopad: { cislo: "200 spin-offů", veta: "nových univerzitních firem do roku 2032, více než pětinásobek dnešního tempa." },
};
