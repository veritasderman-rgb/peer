import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/euro.json";
import { plneZneni, zdroje, slovnik } from "@/content/euro-plne-zneni";
import { KalkulackaEuro } from "@/components/KalkulackaEuro";

const nf = new Intl.NumberFormat("cs-CZ");
const nf2 = new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* „Co to znamená pro tebe“: lidský překlad každého ze tří opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Euro nerozhodne jedna vláda. Potřebuje veřejnou debatu a shodu napříč stranami, takže máš čas si udělat vlastní názor. Chorvatsko euro přijalo v roce 2023, Bulharsko v roce 2026.",
  2: "Stát musí nejdřív zdravě hospodařit: deficit pod 3 % HDP a dluh pod 60 % HDP nebo klesající. Pak čeká minimálně 2 roky v ERM 2, kde se kurz koruny drží v pásmu vůči euru.",
  3: "Studie srovnává Česko se Slovenskem, které euro má. U stejné banky a stejné hypotéky 4,7 mil. Kč na 30 let je rozdíl na úrocích 1 242 657 Kč. A při cestě do Chorvatska odpadne směna korun za eura se skrytým poplatkem 2 až 3 %.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Hypotéka na 30 let",
    text: <>Novákovi mají hypotéku <b>4,7 mil. Kč</b> na 30 let. Při sazbě <b>4,94 %</b> splácejí <b>25 059 Kč</b> měsíčně. Mají dvě děti a každé léto jezdí do Chorvatska.</>,
    bobr: "To je velká částka každý měsíc. Za co vlastně platí?",
  },
  {
    mood: "thinking",
    title: "Stejná banka, jiná země",
    text: <>Stejná banka nabízela na Slovensku stejný produkt za <b>3,69 %</b>. Splátka by tam byla <b>21 607 Kč</b> měsíčně.</>,
    bobr: "Stejný produkt, stejná banka. Proč se cena liší?",
  },
  {
    mood: "surprised",
    title: "Za 30 let",
    text: <>Novákovi zaplatí na úrocích <b>4 321 079 Kč</b>, Slováci <b>3 078 421 Kč</b>. Rozdíl je <b>1 242 657 Kč</b> za stejný dům.</>,
    bobr: "Víc než milion korun za totéž.",
  },
  {
    mood: "neutral",
    title: "A dovolená taky",
    text: <>Chorvatsko dnes platí eurem. Při každé směně korun za eura Novákovi platí „malou daň“ <b>2 až 3 %</b>. Na dovolené za <b>1 500 EUR</b> to dělá zhruba <b>1 100 Kč</b> skrytých nákladů.</>,
    bobr: "Všech 5 oblíbených českých destinací je v eurozóně. Poplatek platíš pořád dokola.",
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co by se změnilo",
    text: <>Návrh má tři kroky: veřejná debata a shoda, splnění maastrichtských kritérií a pak euro, nejdříve <b>2 roky</b> po vstupu do ERM 2. Čím déle otálíme, tím víc platíme.</>,
    bobr: "Rychle to nebude. Ukážu ti kroky jeden po druhém.",
  },
];

const g = data.grafy;
const fakt = (id: string) => data.fakta.find((f) => f.id === id)?.hodnota;
const cz = g.hypotekaSrovnani.polozky.find((p) => p.zeme === "Česko")!;
const sk = g.hypotekaSrovnani.polozky.find((p) => p.zeme === "Slovensko")!;
const ez = g.prumernaSazba.polozky.find((p) => p.zeme === "Eurozóna")!;
const czSazba = g.prumernaSazba.polozky.find((p) => p.zeme === "Česko")!;

export const euro: TopicConfig = {
  slug: "euro",
  cislo: 8,
  nazev: data.nazev,
  kratkyNazev: "Euro",
  kapitola: data.kapitola,
  pilir: "Trh a kapitál",
  popisMeta: "Na hypotéce 4,7 mil. Kč na 30 let zaplatí Čech na úrocích o 1 242 657 Kč víc než Slovák. Proč to tak je a co s tím navrhuje Hospodářská strategie PEER. S bobrem, grafy a kalkulačkou.",
  hook: {
    h1: "Proč Čech platí za stejnou hypotéku o 1,2 milionu víc než Slovák?",
    value: data.hook.hodnota,
    unit: "Kč",
    label: "na úrocích navíc, hypotéka 4,7 mil. Kč na 30 let, Česko oproti Slovensku",
    lede: "Stejná banka, stejný produkt, tříletá fixace. Sazba 4,94 % v Česku oproti 3,69 % na Slovensku.",
    source: "ČSOB / Este, nabídka červen až červenec 2026; studie, kap. 2.2.",
    bobr: "Přes milion korun za totéž. Jen proto, že platíš korunou? Pojď se na to podívat.",
  },
  srovnani: {
    nadpis: "Česko a Slovensko, stejná banka",
    grafy: [
      {
        typ: "compare",
        title: g.hypotekaSrovnani.titulek,
        left: { label: "Slovensko", value: `${nf2.format(sk.sazba)} %`, sub: `splátka ${nf.format(sk.splatka)} Kč měsíčně` },
        right: { label: "Česko", value: `${nf2.format(cz.sazba)} %`, sub: `splátka ${nf.format(cz.splatka)} Kč měsíčně` },
        diff: `Rozdíl na úrocích: ${nf.format(g.hypotekaSrovnani.rozdilUroku)} Kč`,
        source: `${g.hypotekaSrovnani.zdroj}. ${g.hypotekaSrovnani.podtitulek}.`,
      },
      {
        typ: "bar",
        title: "Kolik exportu míří do eurozóny",
        unit: "%",
        max: 100,
        items: g.exportDoEurozony.polozky.map((p) => ({ label: p.zeme, value: p.hodnota, highlight: p.zeme === "Česko" })),
        source: g.exportDoEurozony.zdroj,
      },
    ],
    poznamka: "Rozdíl 1,25 procentního bodu u totožného produktu stejné banky. Dánsko má korunu pevně navázanou na euro přes mechanismus ERM 2 (studie, kap. 2.2).",
  },
  persona: { who: "Novákovi", ctx: "hypotéka 4,7 mil. Kč na 30 let, dvě děti, dovolená v Chorvatsku" },
  pribehNadpis: "Novákovi a hypotéka s korunou",
  steps,
  proc: {
    uvod: "Studie popisuje čtyři místa, kde se platí za malou měnu: u domácností, při směně, u malých firem a u státu. Pátý bod je shrnutí.",
    retezec: data.priciny.filter((p) => [1, 2, 3, 4].includes(p.poradi)).map((p) => ({ nazev: p.pricina, popis: p.popis })),
    loop: { nazev: "a každý rok znovu", popis: "Čím déle otálíme, tím víc platíme: na hypotékách, na obsluze státního dluhu i na kurzových nákladech." },
    dalsi: data.priciny.filter((p) => ![1, 2, 3, 4].includes(p.poradi)).map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "compare",
        title: "Průměrná úroková sazba hypoték",
        left: { label: ez.zeme, value: `${nf2.format(ez.hodnota)} %` },
        right: { label: czSazba.zeme, value: `${nf2.format(czSazba.hodnota)} %` },
        diff: `Pro průměrnou domácnost přes ${nf.format(Number(fakt("uspora_domacnost")))} Kč ročně`,
        source: g.prumernaSazba.zdroj,
      },
      {
        typ: "bignumber",
        value: Number(fakt("procento_navic_dluh")),
        unit: "mld. Kč ročně",
        label: "stojí každé jedno procento navíc na obsluze státního dluhu",
        source: "Ministerstvo financí ČR: státní dluh a výhled dluhové služby 2026 (studie, zdroj 4).",
      },
      {
        typ: "bignumber",
        value: Number(fakt("dovolena_skryte_naklady")),
        unit: "Kč",
        label: "skrytých nákladů při směně na jedné cestě za 1 500 EUR",
        source: "Studie, kap. 2.2 (poplatek 2 až 3 % z objemu konverze).",
      },
    ],
    poznamka: "Státní dluh dosáhne koncem roku 2026 téměř 4 bilionů korun. Česko si půjčuje o 1 až 1,5 procentního bodu dráže než srovnatelné země eurozóny (studie, kap. 2.2).",
  },
  opatreniUvod: "Tři kroky za sebou. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: data.cile,
  stoji: {
    odstavce: [
      "Po přijetí eura by Česko přišlo o vlastní měnovou politiku. O sazbách by už nerozhodovala ČNB a kurz koruny by přestal sloužit jako nárazník. Stát by musel dlouhodobě držet fiskální disciplínu: deficit pod 3 % HDP a dluh pod 60 % HDP nebo klesající.",
      "Méně vydělá finanční sektor, který dnes sčítá zisky za převody měn a zajištění kurzu. Studie ztrátu vlastní měnové politiky nevyčísluje. Tvrdí, že velké exportní firmy už v eurech obchodují a že ochranná funkce kurzu pro domácnosti a malé firmy neplatí.",
    ],
    bobr: "Euro je dlouhá cesta a není zadarmo. Tuhle stranu účtu ti taky ukážu.",
  },
  kalkulacky: [KalkulackaEuro],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "TN",
  },
  plneZneniNadpis: "Plné znění kapitoly 2.2",
  plneZneni,
  zdroje,
  slovnik,
};
