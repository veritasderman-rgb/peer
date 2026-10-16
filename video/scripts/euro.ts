import type { VideoScript } from "@/lib/topics";

export const script: VideoScript = {
  slug: "euro",
  titulek: "Euro za minutu",
  narration: {
    hook: "Stejná hypotéka na třicet let vyjde Čecha o milion dvě stě čtyřicet tisíc dráž než Slováka.",
    problem: "Česká hypotéka má sazbu čtyři celé devadesát čtyři procenta, slovenská u stejné banky tři celé šedesát devět. Směna koruny za euro ukousne dvě až tři procenta. Stát si půjčuje o bod až bod a půl dráž.",
    proc: "Koruna znamená dražší hypotéky, malou daň při směně a přirážku na dluhu státu skoro čtyř bilionů korun.",
    navrh: "Nejdřív veřejná debata a shoda napříč stranami. Pak deficit pod tři procenta, dluh pod šedesát procent výkonu ekonomiky a dva roky v předsíni eura. Potom euro přijmeme, protože čekání se platí.",
    dopad: "Tolik by euro ušetřilo na hypotéce za čtyři celé sedm milionu na třicet let.",
    outro: "Celou strategii najdeš na webu Česko má na víc.",
  },
  hook: {
    cislo: "1 242 657",
    jednotka: "Kč na úrocích navíc",
    veta: "Stejná hypotéka 4,7 mil. Kč na 30 let: Čech platí víc než Slovák.",
  },
  problem: [
    { veta: "Česká hypotéka má sazbu 4,94 %, slovenská u stejné banky 3,69 %.", cislo: "4,94 % vs. 3,69 %" },
    { veta: "Při každé směně koruny za euro platíš 2 až 3 % z objemu.", cislo: "2–3 %" },
    { veta: "Stát si půjčuje o 1 až 1,5 procentního bodu dráž než eurozóna.", cislo: "1–1,5 p. b." },
  ],
  proc: [
    "Hypotéky s korunou mají dlouhodobě vyšší sazby.",
    "Směna korun za eura je malá daň.",
    "Malé firmy se kurzu nemají jak zajistit.",
    "Stát platí přirážku z dluhu téměř 4 bil. Kč.",
  ],
  navrh: [
    { nazev: "Veřejná debata a shoda", veta: "Euro potřebuje konsenzus napříč stranami, ne rozhodnutí jedné vlády." },
    { nazev: "Maastricht a ERM 2", veta: "Deficit pod 3 % HDP, dluh pod 60 % HDP a nejméně 2 roky v ERM 2." },
    { nazev: "Přijmout euro", veta: "Nejdříve 2 roky po vstupu do ERM 2. Čím déle otálíme, tím víc platíme." },
  ],
  dopad: { cislo: "1,24 mil. Kč", veta: "tolik by na úrocích ušetřila hypotéka 4,7 mil. Kč na 30 let." },
};
