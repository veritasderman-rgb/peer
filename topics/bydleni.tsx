import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/bydleni.json";
import { plneZneni, zdroje, slovnik } from "@/content/bydleni-plne-zneni";
import { KalkulackaByt } from "@/components/KalkulackaByt";
import { KalkulackaObec } from "@/components/KalkulackaObec";

/* „Co to znamená pro tebe“: lidský překlad každého z devíti opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Tvoje obec dostane za každý nový byt 210 000 až 560 000 Kč na školy, silnice a sítě. Výstavba pro ni přestane být zátěž.",
  2: "Když se staví v zóně, rozhodnutí přijde do 6 měsíců. Když úřad mlčí, platí souhlas.",
  3: "Víc bytů tam, kam dojdeš pěšky na vlak, tramvaj nebo metro. Méně dojíždění autem z polí za městem.",
  4: "Dvakrát víc obecních bytů. A pro nájemníky smlouva na dobu neurčitou s férovým nájmem, protože stát za ně ručí majiteli.",
  5: "Byt bez povinného parkovacího místa u zastávky MHD vyjde levněji o 700 000 až 1 000 000 Kč.",
  6: "Investiční byt přestane být daňově výhodnější než práce. Kdo prodá byt, ve kterém nebydlel, zdaní zisk.",
  7: "Kdo nechá byt nebo pozemek roky ladem, zaplatí vyšší daň. Kdo v bytě bydlí nebo ho dlouhodobě pronajímá, platí jako dnes.",
  8: "Daň podle hodnoty pozemku, ne podle toho, co jsi na něm postavil. Dnes platí majitel levného bytu v poměru k ceně až pětkrát víc než majitel drahého.",
  9: "Předem bude jasné, co se kde smí stavět. Spory se vyřeší jednou při plánu, ne znovu u každé stavby.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Smlouva na rok",
    text: <>Petra je zdravotní sestra v Brně. Se synem bydlí v nájmu. Smlouvu má na jeden rok, stejně jako <b>70 % nájemníků</b> v Česku. Každý podzim neví, co bude v létě.</>,
    bobr: "Rok je krátká doba, když máš dítě ve školce.",
  },
  {
    mood: "thinking",
    title: "45 let spoření",
    text: <>Na vlastní byt by potřebovala <b>15 ročních platů</b>. Kdyby odkládala třetinu každé výplaty, šetřila by <b>45 let</b>. Průměr v EU je 8 až 10 platů.</>,
    bobr: "To není chyba Petry. To je nejhorší poměr v celé EU.",
  },
  {
    mood: "surprised",
    title: "Prázdné byty, pomalé stavby",
    text: <>Přitom v Česku stojí <b>200 000 prázdných bytů</b> v bytových domech. A Praha staví <b>2,7× méně</b> bytů na obyvatele než Varšava.</>,
    bobr: "Byty jsou. Jen se nestaví a nepouštějí na trh.",
  },
  {
    mood: "neutral",
    title: "Proč obec řekne ne",
    text: <>Když obec povolí nové byty, dostane jen nové náklady: školu, silnici, kanalizaci. Z daní nových obyvatel jí skoro nic nepřiteče. Tak raději <b>nepovolí</b>.</>,
    bobr: "Dnes se obci vyplatí stavbu brzdit. To chce otočit.",
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Petru změní",
    text: <>Obec dostane za každý byt peníze na infrastrukturu, povolení přijde do <b>6 měsíců</b> a byty porostou u zastávek. Cíl: byt pod <b>10 ročních platů</b> a nájem do <b>30 % mzdy</b>. Petře stát zaručí majiteli nájem, a ona dostane smlouvu <b>na dobu neurčitou</b>.</>,
    bobr: "Devět opatření. Ukážu ti je jedno po druhém.",
  },
];

const g = data.grafy;

export const bydleni: TopicConfig = {
  slug: "bydleni",
  cislo: 1,
  nazev: "Bydlení tam, kde jsou příležitosti",
  kratkyNazev: "Bydlení",
  kapitola: "1.1",
  pilir: "Lidský potenciál",
  popisMeta: "Na byt potřebuješ 15 ročních platů, nejvíc v EU. Proč to tak je a co s tím navrhuje Hospodářská strategie PEER. S bobrem, grafy a kalkulačkou.",
  hook: {
    h1: "Kolik ročních platů stojí byt?",
    value: 15.1,
    decimals: 1,
    unit: "ročních platů",
    label: "Česko, nový průměrný byt, 2025",
    lede: "Nejvíc v celé Evropské unii. Průměr je 8 až 10. V Belgii necelých 5.",
    source: "Deloitte Property Index 2025, studie s. 8.",
    bobr: "Patnáct. Tolik let bys musel dát celou výplatu jen na byt. Pojď, ukážu ti, proč to tak je.",
  },
  srovnani: {
    nadpis: "Jak jsme na tom proti sousedům",
    grafy: [
      {
        typ: "bar",
        title: g.rocniPlatyNaByt.titulek,
        unit: "platů",
        items: g.rocniPlatyNaByt.polozky.map((p) => ({ label: p.zeme, value: p.hodnota, note: "poznamka" in p ? p.poznamka : undefined, highlight: p.zeme === "Česko" })),
        goal: { value: g.rocniPlatyNaByt.cil, label: "Cíl strategie: pod 10" },
        source: "Deloitte Property Index 2025",
      },
      { typ: "index" },
    ],
  },
  persona: { who: "Petra, 31", ctx: "zdravotní sestra, Brno, syn 18 měsíců, bydlí v nájmu" },
  pribehNadpis: "Petra a byt, na který se nedá našetřit",
  steps,
  proc: {
    uvod: "Studie popisuje řetězec, který se sám roztáčí. Čtyři kroky, a pak znovu od začátku.",
    retezec: data.priciny.filter((p) => p.typ === "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
    loop: { nazev: "a znovu od začátku", popis: "Dražší bydlení posiluje odpor sousedů i obcí proti stavbě. Nabídka klesá dál." },
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "bar",
        title: "Kolik bytů se staví na 1 000 obyvatel ročně",
        unit: "bytů",
        items: g.intenzitaVystavby.polozky.map((p) => ({ label: p.mesto, value: p.hodnota, highlight: p.mesto === "Praha" })),
        goal: { value: g.intenzitaVystavby.cilPraha, label: "Praha potřebuje aspoň 6,5" },
        source: "Deloitte Property Index, ČSÚ, IPR Praha, Statistik Austria, GUS",
      },
      {
        typ: "donut",
        parts: [
          { label: "V bytových domech, většinou ve městech", value: g.neobydleneByty.vBytovychDomech, color: "sun" },
          { label: "Rodinné domy, chalupy a ostatní", value: g.neobydleneByty.ostatni, color: "muted" },
        ],
        centerValue: "860 000",
        centerLabel: "neobydlených bytů v ČR",
      },
      {
        typ: "bar",
        title: "Kolik bytů vlastní město",
        unit: "%",
        max: 50,
        items: g.podilObecnichBytu.polozky.map((p) => ({ label: p.mesto, value: p.hodnota, note: "poznamka" in p ? p.poznamka : undefined, highlight: p.mesto === "Praha" })),
        source: "Wiener Wohnbaubericht 2024, IPR Praha",
      },
    ],
    poznamka: "Vídeň díky silnému městskému fondu tlumí nájmy. Vídeňský průměrný nájem je v poměru k platům nižší než v Praze (studie s. 10).",
  },
  opatreniUvod: "Devět provázaných opatření. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: data.cile,
  stoji: {
    odstavce: [
      "Víc zaplatí ti, kdo byty drží prázdné nebo je mají jako investici: vyšší daň z prázdných bytů a pozemků, konec daňového osvobození při prodeji investičního bytu a omezení uznatelných nákladů pronajímatelů.",
      "Stát zaplatí podíl obcím z DPH ze stavebních prací, dotace a úvěry na obecní byty a Garanční fond. Studie tyto náklady v kapitole o bydlení nevyčísluje, počítá s tím, že se vrátí ve vyšší mobilitě práce a nižších výdajích na dávky na bydlení.",
    ],
    bobr: "Každý návrh má dvě strany účtu. Tuhle druhou ti nezatajím.",
  },
  kalkulacky: [KalkulackaByt, KalkulackaObec],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "LD",
    citace: "Zhoršující se dostupnost bydlení není jen sociální problém, ale má široké dopady na celou ekonomiku. Snižuje pracovní mobilitu a udržuje strukturální nezaměstnanost v chudších okresech.",
    citaceZdroj: {
      text: "představení PEER, pirati.cz, 2. 9. 2026",
      url: "https://www.pirati.cz/jak-pirati-pracuji/pirati-predstavuji-novou-expertni-ekonomickou-radu-peer-prichazi-s-hospodarskou-strategii-a-s-planem-jak-z-ceska-udelat-v-ekonomice-evropskeho-tygra/",
    },
  },
  plneZneniNadpis: "Plné znění kapitoly 1.1",
  plneZneni,
  zdroje,
  slovnik,
};
