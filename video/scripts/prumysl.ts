import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "prumysl",
  titulek: "Průmysl za minutu",
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
