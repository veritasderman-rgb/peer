import type { VideoScript } from "@/lib/topics";

/* Úvodní video „Česko má na víc za minutu“: proč strategie a co z ní bude. Čísla ze souhrnu
   (data/dopad.json: +1 p. b., 1 000 mld., +300 mld., 68 000 Kč) a z háčků témat (prumysl, bydleni, exekuce,
   prace, stat). Není to téma, jen scénář; renderuje se stejně jako témata. */
export const script: VideoScript = {
  slug: "uvod",
  titulek: "Česko má na víc",
  narration: {
    hook: "Šedesát osm tisíc korun ročně navíc pro každého, kdo pracuje. Tolik slibuje plán, který ti za minutu ukážu.",
    problem: "Česko je sedmá nejsložitější ekonomika světa, ale v životní úrovni jsme kolem čtyřicátého místa. Na byt potřebuješ patnáct ročních platů. A půl milionu lidí žije v exekuci.",
    proc: "Vyrábíme levně pro cizí, zisky odtékají, stát zaostává a lidé jsou v pasti bytů, dluhů a chybějících školek.",
    navrh: "Strategie má tři směry. Lidé: školky, byty, férová práce a konec dluhové pasti. Trh a kapitál: probudit spící úspory, euro a férové dotace. A průmysl, energie a stát: vlastní produkt, levnější energie a digitální úřad.",
    dopad: "Výsledek? Růst o jeden procentní bod ročně navíc. Na konci dekády bilion korun ve výkonu ekonomiky a přes tři sta miliard ročně v rozpočtu.",
    outro: "Čtrnáct témat, každé za minutu. Celou strategii najdeš na webu Česko má na víc.",
  },
  hook: {
    cislo: "68 000 Kč",
    jednotka: "ročně navíc na pracujícího",
    veta: "Tolik má přinést plán Hospodářské strategie 2026–2035. Za minutu ti ukážu jak.",
  },
  problem: [
    { cislo: "7.", veta: "nejsložitější ekonomika světa. V životní úrovni až kolem 40. místa." },
    { cislo: "15", veta: "ročních platů stojí byt. Nejvíc v EU." },
    { cislo: "590 000", veta: "lidí žije v exekuci." },
  ],
  proc: [
    "Vyrábíme levně pro cizí značky",
    "Zisky odtékají: 340 mld. Kč ročně",
    "Stát zaostává: 18 % služeb digitálně",
    "Lidé v pasti bytů, dluhů a školek",
  ],
  navrh: [
    { nazev: "Lidé", veta: "Školky od 2 let, 50 000 bytů ročně, férová práce, konec dluhové pasti." },
    { nazev: "Trh a kapitál", veta: "Probudit 4 000 mld. Kč spících úspor, euro, férové dotace." },
    { nazev: "Průmysl, energie, stát", veta: "Vlastní produkt místo montovny, levnější energie, digitální úřad." },
  ],
  dopad: {
    cislo: "+1 p. b.",
    veta: "růstu ročně. Na konci dekády bilion Kč ve výkonu ekonomiky a +300 mld. Kč ročně v rozpočtu.",
  },
  outro: "14 témat, každé za minutu. Celá strategie: Česko má na víc",
};
