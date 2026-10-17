import type { VideoScript } from "../../lib/topics";

/* Strategie za minutu: Bydlení (kapitola 1.1). Čísla z data/bydleni.json (Deloitte Property Index 2025,
   ČSÚ, MM4), formulace redakční podle topics/bydleni.tsx. Na obrazovce vždy jedna věta + jedno číslo. */
export const script: VideoScript = {
  slug: "bydleni",
  titulek: "Bydlení",
  narration: {
    hook: "Hádej, kolik stojí nový byt. Patnáct celá jedna ročních platů, nejvíc v celé Evropské unii.",
    problem: "Ceny bytů za deset let skočily o dvě stě čtyřicet šest procent, mzdy jen o osmdesát šest. Dvě stě tisíc bytů stojí prázdných. A Praha jich staví skoro třikrát míň než Varšava.",
    proc: "Pozemky leží ladem a povolení trvá roky, takže se staví málo. Ceny i nájmy rostou třikrát rychleji než mzdy.",
    navrh: "Obec dostane z dépéhá od dvou set deseti do pěti set šedesáti tisíc korun za nový byt. Povolení do půl roku, a když úřad mlčí, platí souhlas. Víc bytů u zastávek a dvakrát víc obecních.",
    dopad: "Padesát tisíc nových bytů ročně a byt pod deset ročních platů místo patnácti.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
  hook: {
    cislo: "15,1",
    jednotka: "ročních platů",
    veta: "Tolik stojí v Česku nový byt. Nejvíc v celé EU.",
  },
  problem: [
    { cislo: "+246 %", veta: "Ceny bytů za 10 let. Mzdy jen +86 %." },
    { cislo: "200 000", veta: "prázdných bytů stojí v bytových domech." },
    { cislo: "2,7×", veta: "méně bytů staví Praha než Varšava." },
  ],
  proc: [
    "Pozemky leží ladem, povolení trvá roky",
    "Staví se málo nových bytů",
    "Ceny a nájmy rostou 3× rychleji než mzdy",
    "Za prací se nedá přestěhovat",
  ],
  navrh: [
    { nazev: "Obec dostane podíl z DPH", veta: "Za každý nový byt 210 000 až 560 000 Kč na školy a silnice." },
    { nazev: "Povolení do 6 měsíců", veta: "V zónách rychlé výstavby. Když úřad mlčí, platí souhlas." },
    { nazev: "Byty u zastávek a obecní byty", veta: "Víc bytů 15 minut pěšky od MHD. Dvakrát víc obecních bytů." },
  ],
  dopad: {
    cislo: "50 000",
    veta: "nových bytů ročně. A byt pod 10 ročních platů místo 15.",
  },
  outro: "Celá strategie a plné znění: manavic.pirati.cz",
};
