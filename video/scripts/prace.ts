import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "prace",
  titulek: "Proč je u nás levná práce past?",
  narration: {
    hook: "Minimální mzda je dvacet dva tisíce čtyři sta korun, čtyřicet tři procenta průměru. Polsko, Litva i Chorvatsko mají víc.",
    problem: "Až osmdesát procent minimálkářů má nárok na dávky. Na rekvalifikace šlo pět tisícin procenta výkonu ekonomiky, vyspělé země dávají desetinu. Dospělí se vzdělávají nejméně v Evropské unii, dvacet jedna celá dvě procenta proti třiceti devíti a půl.",
    proc: "Levná montovna dochází, stát dotuje nízké mzdy a zamrzlý trh práce drží mzdy dole.",
    navrh: "Flexicurity po česku: měsíc výpovědi v prvním roce a osmdesát procent podpory dva měsíce. Minimální mzda půjde nahoru, jak radí vyspělé země. A víc peněz na rekvalifikace a vzdělávací účty.",
    dopad: "Minimálka na polovinu průměru a rekvalifikace na úroveň vyspělých zemí.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
  hook: {
    cislo: "22 400 Kč",
    jednotka: "minimální mzda",
    veta: "To je jen 43 % průměrné mzdy. Méně než v Polsku, Litvě i Chorvatsku.",
  },
  problem: [
    { veta: "Až 80 % lidí na minimální mzdě má nárok na dávky. Stát tak dotuje nízké mzdy.", cislo: "80 %" },
    { veta: "Na rekvalifikace šlo jen 0,005 % HDP. Průměr OECD je 0,1 %.", cislo: "0,005 %" },
    { veta: "Dospělí se vzdělávají nejméně z celé EU: 21,2 % proti průměru 39,5 %.", cislo: "21,2 %" },
  ],
  proc: [
    "Strategie levné montovny dochází",
    "Stát dotuje nízké mzdy dávkami",
    "Zamrzlý trh práce, málo rekvalifikací",
    "Výsledek: nižší mobilita a nižší mzdy",
  ],
  navrh: [
    { nazev: "Česká flexicurity", veta: "Výpověď 1 měsíc v prvním roce a 80% podpora v prvních 2 měsících." },
    { nazev: "Minimální mzda 50 % průměru", veta: "Zvýšíme ji na polovinu průměrné mzdy, jak doporučuje OECD." },
    { nazev: "Víc na rekvalifikace", veta: "Výdaje na aktivní politiku zaměstnanosti na průměr OECD do 2030 a vzdělávací účty." },
  ],
  dopad: {
    cislo: "50 %",
    veta: "Cíl: minimální mzda na 50 % průměrné mzdy a výdaje na rekvalifikace na průměr OECD do 2030.",
  },
};
