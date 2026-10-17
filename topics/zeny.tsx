import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/zeny.json";
import { plneZneni, zdroje, slovnik } from "@/content/zeny-plne-zneni";
import { KalkulackaSkolka } from "@/components/KalkulackaSkolka";

/* „Co to znamená pro tebe“: lidský překlad každého ze čtyř opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Nevyužité třídy ve školkách se upraví pro menší děti. Vzniknou flexibilní dětské skupiny i firemní školky a péče bude dostupná od jednoho roku věku. Sousedské skupiny dostanou stejné peníze jako klasické.",
  2: "Dětská skupina, kterou podporuje stát, nesmí účtovat víc než zhruba 3 750 Kč měsíčně. Dnes to může být až 7 466 Kč.",
  3: "Stát jde příkladem. Do roku 2035 se rozdíl mezi platy mužů a žen ve veřejném sektoru sníží na polovinu.",
  4: "Částečný úvazek se začne víc vyplácet, protože se sníží jeho daňová zátěž. Návrat do práce po rodičovské tak může být postupný.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Zpátky po rodičovské",
    text: <>Petra je zdravotní sestra z Brna, stejná jako v tématu Bydlení. Po rodičovské se vrací do práce. Typicky se ženy vracejí na horší pozici a s nižším platem, a Petra není výjimka.</>,
    bobr: "Petra pracuje dobře. Jen se vrací po dítěti.",
  },
  {
    mood: "thinking",
    title: "Cena mateřství",
    text: <>Žena, která si pořídí dítě, vydělává v následujících <b>20 letech</b> průměrně o <b>10 %</b> méně než bezdětná kolegyně. Největší ztrátu mají vysokoškolačky.</>,
    bobr: "Deset procent po dvacet let se pěkně sečte.",
    scena: { typ: "cislo", predpona: "−", hodnota: 10, jednotka: "%", popis: "výdělek matky po dobu 20 let oproti bezdětné kolegyni" }, // fakta: ztrata_po_narozeni_deti
  },
  {
    mood: "surprised",
    title: "Školka, která není",
    text: <>Petřin syn nemá místo ve školce. Do brzké péče chodí jen <b>4 %</b> dětí do 3 let (kapitola o vzdělanosti) a Česku chybí <b>30–40 tisíc</b> míst.</>,
    bobr: "Bez místa ve školce se do práce naplno nevrátíš.",
    scena: { typ: "podil", hodnota: 4, popis: "dětí do 3 let chodí do brzké péče, chybí 30–40 tisíc míst" }, // fakta: ucast_do_3_let_cr, potreba_mist_predskolni_pece
  },
  {
    mood: "neutral",
    title: "Když místo je, je drahé",
    text: <>Veřejně podporovaná dětská skupina může účtovat až třetinu minimální mzdy, dnes až <b>7 466 Kč</b> měsíčně. Pro mnoho rodin se taková služba nevyplatí.</>,
    bobr: "Drahá péče je pro spoustu rodin jako žádná.",
    scena: { typ: "cislo", predpona: "až", hodnota: 7466, jednotka: "Kč měsíčně", popis: "strop platby za veřejně podporovanou dětskou skupinu" }, // fakta: max_platba_detska_skupina_dnes
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Petru změní",
    text: <>Strop ceny klesne na cca <b>3 750 Kč</b> měsíčně a péče bude od jednoho roku věku. Každé místo ve školce vytvoří <b>0,54</b> pracovního místa a přinese rozpočtům více než <b>100 000 Kč</b> ročně.</>,
    bobr: "Školka se státu vyplatí. Čtyři opatření, pojď dál.",
    scena: { typ: "predtim-potom", predtim: { hodnota: "7 466 Kč", popis: "strop měsíční platby za dětskou skupinu" }, potom: { hodnota: "3 750 Kč", popis: "strop podle návrhu" } }, // fakta: max_platba_detska_skupina_dnes, navrh_cenovy_strop
  },
];

const g = data.grafy;

export const zeny: TopicConfig = {
  slug: "zeny",
  cislo: 4,
  nazev: "Ženy na trhu práce: největší nevyužitý potenciál",
  kratkyNazev: "Ženy",
  kapitola: "1.3",
  pilir: "Lidský potenciál",
  popisMeta: "Mzdový rozdíl mezi muži a ženami je v Česku 18,5 %, druhý nejvyšší v EU. Proč nás v mzdách předběhlo Polsko a co navrhuje Hospodářská strategie PEER. S garantem kapitoly, grafy a kalkulačkou školky.",
  hook: {
    h1: "Proč nás v mzdách předběhlo Polsko?",
    value: 18.5,
    decimals: 1,
    unit: "% mzdový rozdíl",
    label: "mezi muži a ženami, druhý nejvyšší v EU",
    lede: "Polky i Litevky vydělávají víc než Češky. Ve veřejném sektoru je rozdíl 17 %, nejvíc v EU. Každé 1 % snížení mzdové mezery v soukromém sektoru přidá do rozpočtů 4,9 mld. Kč ročně.",
    source: "Eurostat (podle Euronews, 2026), studie s. 25–27.",
    bobr: "Osmnáct a půl procenta. Tolik je rozdíl mezi výdělky žen a mužů. Pojď, ukážu ti, kde se ty peníze ztrácejí.",
  },
  srovnani: {
    nadpis: "Jak jsme na tom proti sousedům",
    grafy: [
      {
        typ: "bar",
        title: g.mzdovaMezeraEU.titulek,
        unit: g.mzdovaMezeraEU.jednotka,
        items: g.mzdovaMezeraEU.polozky
          .filter((p) => p.hodnota >= 0)
          .map((p) => ({ label: p.zeme, value: p.hodnota, note: p.poznamka, highlight: p.zeme === "Česko" })),
        goal: { value: 12, label: "Cíl strategie: pod 12" },
        source: "Eurostat podle Euronews, 2026",
      },
      {
        typ: "compare",
        title: "Rozdíl výdělků žen a mužů ve veřejném sektoru",
        left: { label: "Česko", value: "17,4 %", sub: "největší v EU" },
        right: { label: "Polsko", value: "−1,2 %", sub: "ženy berou víc než muži" },
        diff: "V soukromém sektoru je rozdíl v Česku 19,6 %.",
        source: "Evropská komise, 2026 (Eurostat)",
      },
    ],
    poznamka: "Mzdová mezera je rozdíl mezi výdělky žen a mužů v procentech z výdělku mužů. Lucembursko má zápornou hodnotu (−0,8 %, ženy berou víc), v grafu ho nevidíš.",
  },
  persona: { who: "Petra, 31", ctx: "zdravotní sestra z Brna, po rodičovské, syn 18 měsíců nemá místo ve školce" },
  pribehNadpis: "Petra a školka, která chybí",
  steps,
  proc: {
    uvod: "Studie popisuje čtyři kroky, které na sebe navazují. K nim přidává tři další příčiny.",
    retezec: data.priciny.filter((p) => p.typ === "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "compare",
        title: "Zaměstnanost žen s dětmi do 6 let",
        left: { label: "Dnes", value: "55 %" },
        right: { label: "Cíl strategie", value: "70 %" },
        diff: "+15 procentních bodů",
        source: "Studie, kapitola 1.3",
      },
      {
        typ: "bignumber",
        value: 4.9,
        decimals: 1,
        unit: "mld. Kč ročně",
        label: "přidá do veřejných rozpočtů každé 1 % snížení mzdové mezery v soukromém sektoru",
        source: "Studie, kapitola 1.3",
      },
      {
        typ: "bignumber",
        value: 100000,
        prefix: "více než ",
        unit: "Kč ročně",
        label: "přínos jednoho místa ve školce pro veřejné rozpočty",
        source: "IDEA CERGE-EI (2024), Analýza školek",
      },
    ],
    poznamka: "Přínos místa ve školce tvoří daně a odvody matky (58 000–81 000 Kč), daň z příjmu firem (asi 54 000 Kč, odhad podle předpokladů výzkumníků Akademie věd) a DPH se spotřebními daněmi (12 000–15 000 Kč). Sto tisíc míst by znamenalo asi 10 mld. Kč ročně.",
  },
  opatreniUvod: "Čtyři opatření, která se navzájem doplňují. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: data.cile,
  stoji: {
    odstavce: [
      "Strop ceny dětských skupin znamená vyšší příspěvek státu na každé místo. Nižší zdanění malých úvazků znamená menší příjmy z daní. A snížit mzdový rozdíl ve veřejném sektoru na polovinu do roku 2035 vyžaduje peníze v rozpočtech, protože platy žen tam porostou.",
      "Studie počítá s tím, že se část nákladů vrátí. Jedno místo ve školce stojí asi 95 000 Kč ročně a rozpočtům přinese více než 100 000 Kč na daních a odvodech. Po odečtení nákladů je čistý přínos podle tabulky IDEA CERGE-EI asi 46 600 až 64 300 Kč ročně.",
      "Celkový účet všech opatření kapitola nevyčísluje.",
    ],
    bobr: "Školka není zadarmo. Ale chybějící školka taky ne.",
  },
  kalkulacky: [KalkulackaSkolka],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "ZF",
  },
  plneZneniNadpis: "Plné znění kapitoly 1.3, část Ženy na trhu práce",
  plneZneni,
  zdroje,
  slovnik,
};
