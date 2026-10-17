import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/kapital.json";
import { plneZneni, zdroje, slovnik } from "@/content/kapital-plne-zneni";
import { KalkulackaPenze } from "@/components/KalkulackaPenze";

/* „Co to znamená pro tebe“: lidský překlad každého ze tří opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Poplatky penzijních fondů by zákon dramaticky snížil, případně by vznikly levnější fondy provozované státem. Z tvých měsíčních vkladů by ti zůstalo víc. Dnes musí střadatel vkládat 10× víc peněz než Slovák, aby dosáhl stejného výnosu.",
  2: "Tvoje peníze na běžném účtu by mohly pracovat. Návrh počítá s osvětou, se syndikáty drobných investorů podle britského vzoru a se silnějším dohledem nad velmi rizikovými firemními dluhopisy.",
  3: "Kdo se stěhuje za prací, snáz prodá starý byt či dům a koupí nový. Regulace krátkodobých hypoték by byla mírnější.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Dvě místa pro peníze",
    text: <>Alena spoří <b>2 000 Kč</b> měsíčně do penzijka. Dalších <b>300 000 Kč</b> má na běžném účtu, kde jí peníze nepracují.</>,
    bobr: "Spoří poctivě. Ptám se, jestli její peníze něco dělají.",
  },
  {
    mood: "thinking",
    title: "Penzijko a poplatky",
    text: <>Výnosy penzijních fondů jsou malé, protože fondy musí být bezpečné. A větší část výnosu spolknou <b>poplatky</b>.</>,
    bobr: "Komu z těch výnosů zůstane víc, Aleně, nebo fondu?",
  },
  {
    mood: "surprised",
    title: "Slovensko to umí levněji",
    text: <>Aby Alena dosáhla stejného výnosu jako slovenská kolegyně, musí vkládat <b>10× víc</b> peněz. Tak to vyplývá ze studie IDEA při CERGE-EI z roku 2026.</>,
    bobr: "Desetkrát víc peněz pro stejný výnos. To je velký rozdíl.",
    scena: { // fakta: penze_vklady_vs_sk
      typ: "srovnani",
      nadpis: "Kolik vložit pro stejný výnos",
      jednotka: "×",
      polozky: [
        { nazev: "Slovensko", hodnota: 1 },
        { nazev: "Česko", hodnota: 10, zvyrazni: true },
      ],
      popis: "český střadatel vkládá 10× víc než slovenský",
    },
  },
  {
    mood: "neutral",
    title: "Spících 4 000 miliard",
    text: <>Alena není sama. U českých střadatelů spí <b>4 000 miliard</b> korun. Při pouhých <b>3 %</b> ročně se úspory zdvojnásobí za <b>25 let</b>. Z 300 000 Kč by bylo přes 600 000 Kč.</>,
    bobr: "Peníze, které leží, nepomáhají ani jí, ani novým firmám.",
    scena: { typ: "cislo", hodnota: 4000, jednotka: "mld. Kč", popis: "spících úspor českých střadatelů" }, // fakta: spici_uspory
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Alenu změní",
    text: <>Zákon sníží poplatky penzijních fondů, vzniknou syndikáty drobných investorů a bude silnější dohled nad rizikovými dluhopisy. Cíl: aby úspory zdvojnásobil už <b>3 %</b> ročně.</>,
    bobr: "Tři opatření. Ukážu ti je jedno po druhém.",
    scena: { // fakta: spici_uspory, zdvojnasobeni_25_let (cile)
      typ: "predtim-potom",
      predtim: { hodnota: "4 000 mld. Kč", popis: "spících úspor, které nepracují" },
      potom: { hodnota: "25 let", popis: "do zdvojnásobení úspor při 3 % ročně" },
    },
  },
];

const g = data.grafy;
const fakt = (id: string) => data.fakta.find((f) => f.id === id)?.hodnota;
const cil = data.cile[0];

export const kapital: TopicConfig = {
  slug: "kapital",
  cislo: 9,
  nazev: data.nazev,
  kratkyNazev: "Kapitál",
  kapitola: data.kapitola,
  pilir: "Trh a kapitál",
  popisMeta: "Čeští střadatelé mají spících 4 000 miliard korun a na penzijku vkládají 10× víc než Slováci pro stejný výnos. Co s tím navrhuje Hospodářská strategie PEER. S garantem kapitoly, grafy a kalkulačkou.",
  hook: {
    h1: "Co dělají tvoje peníze, když spí?",
    value: data.hook.hodnota,
    unit: data.hook.jednotka,
    label: "spících úspor českých střadatelů",
    lede: "Tyto peníze obvykle nepracují a v nemalé části leží na neúročených běžných účtech.",
    source: "Hospodářská strategie PEER, kap. 2.3.",
    bobr: "Čtyři tisíce miliard bez práce. Co by mohly dělat? Pojď se podívat.",
  },
  srovnani: {
    nadpis: "Kolik peněz stačí na stejný výnos",
    grafy: [
      {
        typ: "compare",
        title: "Kolik peněz musí střadatel vložit pro stejný výnos",
        left: { label: "Slovenský střadatel", value: "1×" },
        right: { label: "Český střadatel", value: `${fakt("penze_vklady_vs_sk")}×` },
        diff: "Český střadatel vkládá 10× víc peněz",
        source: "Nádvorník a Pertold, IDEA při CERGE-EI, Studie 1/2026.",
      },
      {
        typ: "bignumber",
        value: data.hook.hodnota,
        unit: "mld. Kč",
        label: "spících úspor u českých střadatelů",
        source: "Hospodářská strategie PEER, kap. 2.3.",
      },
    ],
  },
  persona: { who: "Alena, 45", ctx: "účetní, spoří 2 000 Kč měsíčně do penzijka a 300 000 Kč má na běžném účtu" },
  pribehNadpis: "Alena a peníze, které leží",
  steps,
  proc: {
    uvod: "Studie popisuje řetězec, který drží české úspory bez výnosu. Čtyři kroky.",
    retezec: [2, 3, 4, 1].map((n) => {
      const p = data.priciny.find((x) => x.poradi === n)!;
      return { nazev: p.pricina, popis: p.popis };
    }),
    dalsi: [],
  },
  cisla: {
    nadpis: "Dvě čísla, která to vysvětlují",
    grafy: [
      {
        typ: "bar",
        title: "Jak rostou úspory při 3 % ročně",
        unit: "% původní částky",
        max: 220,
        items: g.zdvojnasobeni.polozky.map((p) => ({
          label: p.roky === 0 ? "dnes" : `za ${p.roky} let`,
          value: Math.round(p.nasobek * 100),
          highlight: p.roky === cil.hodnota,
        })),
        goal: { value: 200, label: "Zdvojnásobení za 25 let" },
        source: g.zdvojnasobeni.zdroj,
      },
      {
        typ: "bignumber",
        value: Number(cil.hodnota),
        unit: "let",
        label: "a úspory se při pouhých 3 % ročně zdvojnásobí",
        source: "Hospodářská strategie PEER, kap. 2.3.",
      },
    ],
    poznamka: "Příklad: 100 % je dnešní částka. Za 25 let je to 209 %, tedy víc než dvojnásobek (vlastní výpočet 1,03 na počet let).",
  },
  opatreniUvod: "Tři opatření. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: [
    { hodnota: cil.hodnota, jednotka: "let do zdvojnásobení úspor při 3 % ročně", cil: "Aby se úspory zdvojnásobily už při pouhém tříprocentním ročním zhodnocení." },
  ],
  stoji: {
    odstavce: [
      "Správci penzijních fondů by přišli o část příjmů z poplatků, které by zákon dramaticky snížil. U fondů provozovaných státem by správu platil a organizoval stát.",
      "Kdo přesune peníze z běžného účtu do investic, přijímá kolísání hodnoty. Čím větší podíl akcií, tím víc se úspory mohou v krátkém čase propadnout. Studie toto riziko nevyčísluje. Navrhuje větší diverzifikaci fondů, osvětu a silnější dohled nad velmi rizikovými firemními dluhopisy.",
    ],
    bobr: "Vyšší výnos bez kolísání neexistuje. Tuhle stranu účtu ti nezatajím.",
  },
  kalkulacky: [KalkulackaPenze],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "MD",
  },
  plneZneniNadpis: "Plné znění kapitoly 2.3",
  plneZneni,
  zdroje,
  slovnik,
};
