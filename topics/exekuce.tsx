import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/exekuce.json";
import { plneZneni, zdroje, slovnik } from "@/content/exekuce-plne-zneni";
import { KalkulackaExekuce } from "@/components/KalkulackaExekuce";

/* „Co to znamená pro tebe“: lidský překlad každého ze tří opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Z každé vydělané koruny ti zůstane aspoň polovina, ne nula. Přesčas nebo lepší práce se zase vyplatí. Druhá polovina dál jde na splácení.",
  2: "Místo více exekutorů, kteří se ozývají zvlášť, budeš mít jednoho. Zaměstnavatel bude mít míň papírování, podle zaměstnavatelů o více než polovinu.",
  3: "Samoživitel po srážkách nespadne pod hranici chudoby 12 818 Kč. Dnes je nezabavitelné minimum asi 10 900 až 11 500 Kč.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Martin a čtyři exekuce",
    text: <>Martin je svářeč z Ústecka, stejný jako v tématu Práce. Má <b>4 exekuce</b>. Ústecký kraj má spolu s Karlovarským a Libereckým nejvíc lidí v exekuci a patří k nejchudším.</>,
    bobr: "Martin v tom není sám. Je jich skoro šest set tisíc.",
  },
  {
    mood: "thinking",
    title: "Srážka 66 %",
    text: <>Většina dlužníků čelí <b>66% srážce</b> z příjmu. Nad cca <b>31 500 Kč</b> hrubého je srážka 100 %. Martin má 4 exekuce, takže 100 % nastupuje už od <b>24 609 Kč</b>.</>,
    bobr: "Sto procent z každé další koruny. To je celá.",
  },
  {
    mood: "surprised",
    title: "Přesčas nemá smysl",
    text: <>Šéf nabízí přesčasy. Kdyby Martin přešel <b>24 609 Kč</b>, každá další koruna by šla exekutorovi. NERV potvrzuje, že se lidem v exekuci další práce nevyplatí.</>,
    bobr: "Práce, která se nevyplatí, je past pro člověka i pro stát.",
  },
  {
    mood: "neutral",
    title: "Účet platí i ostatní",
    text: <>Zaměstnavatel platí za správu exekucí <b>500 až 3 000 Kč</b> měsíčně na zaměstnance. Exekuce rodiče patří k nejsilnějším předpovědím, že dítě nedokončí střední školu. Každý člověk bez dokončeného vzdělání stojí rozpočty <b>2–3 mil. Kč</b>.</>,
    bobr: "Dluh rodičů dopadá i na děti.",
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Martina změní",
    text: <>Maximální srážka klesne na <b>50 %</b>. Z 1 000 Kč navíc mu zůstane <b>500 Kč</b>, ne nula. Jeden dlužník bude mít jednoho exekutora.</>,
    bobr: "Tři opatření. Ukážu ti je jedno po druhém.",
  },
];

const g = data.grafy;
const mereni = g.vyvojDat.polozky;
const pocty = (ukazatel: string) => (mereni.find((p) => p.ukazatel === ukazatel)?.rok2026 ?? 0) / 1000;

export const exekuce: TopicConfig = {
  slug: "exekuce",
  cislo: 5,
  nazev: "Exekuce: systém, který trestá práci a ničí budoucnost dětí",
  kratkyNazev: "Exekuce",
  kapitola: "1.3",
  pilir: "Lidský potenciál",
  popisMeta: "V exekuci je 590 000 lidí a kdo vydělá nad cca 31 500 Kč hrubého, přijde o každou další korunu. Proč se práce nevyplatí a co navrhuje Hospodářská strategie PEER. S garantem kapitoly, grafy a kalkulačkou.",
  hook: {
    h1: "Proč se půl milionu lidí nevyplatí pracovat?",
    value: 590000,
    unit: "lidí v exekuci",
    label: "k 30. 6. 2026; 3 miliony řízení, 542 mld. Kč",
    lede: "Kdo vydělá nad cca 31 500 Kč hrubého, přijde o každou další korunu. Dluhy klesají jen o 1 % ročně a jen odpisem nevymahatelných pohledávek.",
    source: "Exekutorská komora ČR, Institut předlužení, studie s. 30–32.",
    bobr: "Pět set devadesát tisíc lidí. Za každým je člověk a často celá rodina. Pojď se podívat, proč se jim práce nevyplatí.",
  },
  srovnani: {
    nadpis: "Kolik ti zůstane a kdo je v exekuci",
    grafy: [
      {
        typ: "compare",
        title: "Vyděláš o 1 000 Kč víc. Kolik ti zůstane?",
        left: { label: "Dnes", value: "0 Kč", sub: "nad hranicí cca 31 500 Kč hrubého" },
        right: { label: "Podle návrhu", value: "500 Kč", sub: "maximální srážka 50 %" },
        diff: "Z navíc vydělané koruny zůstane aspoň polovina.",
        source: "Studie, s. 30–32",
      },
      {
        typ: "bar",
        title: "Lidé v exekuci podle počtu exekucí a věku, 30. 6. 2026",
        unit: "tis.",
        items: [
          { label: "3 a více exekucí", value: pocty("Osob se 3+ exekucemi") },
          { label: "10 a více exekucí", value: pocty("Osob s 10+ exekucemi") },
          { label: "Nad 65 let", value: pocty("Osob nad 65 let") },
          { label: "Do 30 let", value: pocty("Mladých do 30 let") },
        ],
        source: "Exekutorská komora ČR, Institut předlužení",
      },
    ],
    poznamka: "Skupiny se překrývají: kdo má 10 a více exekucí, je i mezi těmi se třemi a více. Data nezahrnují daňové a právní exekuce (ČSSZ, finanční úřady, Celní správa, obce) a zahrnují asi 80 tisíc exekucí lidí v oddlužení.",
  },
  persona: { who: "Martin, 44", ctx: "svářeč z Ústecka, 4 exekuce, stejný Martin jako v tématu Práce" },
  pribehNadpis: "Martin a koruna, která není jeho",
  steps,
  proc: {
    uvod: "Studie popisuje čtyři kroky, které na sebe navazují. K nim přidává čtyři další příčiny.",
    retezec: data.priciny.filter((p) => p.typ === "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "compare",
        title: "Lidé v exekuci za půl roku",
        left: { label: "31. 12. 2025", value: "566 tis.", sub: "podíl lidí 15+: 6,5 %" },
        right: { label: "30. 6. 2026", value: "590 tis.", sub: `podíl lidí 15+: ${String(g.kraje.prumerCR).replace(".", ",")} % (průměr ČR)` },
        diff: "+24 tisíc lidí za půl roku",
        source: "Exekutorská komora ČR (Centrální evidence exekucí)",
      },
      {
        typ: "bignumber",
        value: 16.5,
        decimals: 1,
        prefix: "min. ",
        unit: "mld. Kč ročně",
        label: "přínos teritoriality exekutorů podle odhadu exekutora Petra Kučery",
        source: "e15, rozhovor s Petrem Kučerou",
      },
      {
        typ: "compare",
        title: "Cíl do roku 2030: lidé v exekuci",
        left: { label: "Dnes", value: "590 000" },
        right: { label: "Cíl 2030", value: "≤ 413 000", sub: "−30 %" },
        diff: "O 30 % méně lidí v exekuci.",
        source: "Hospodářská strategie PEER",
      },
    ],
    poznamka: "Odhady dopadu na veřejné rozpočty se liší: NERV uvádí 5–12 mld. Kč ročně, PAQ Research 9–15 mld. Kč a Kučera aspoň 16,5 mld. Kč. Jsou to odhady různých autorů, ne jeden výpočet. Podíly osob v exekuci podle krajů studie jen zmiňuje bez čísel, proto tu graf krajů chybí. Tabulka cílů označuje výchozí stav 590 000 jako rok 2025, ale číslo odpovídá datu 30. 6. 2026.",
  },
  opatreniUvod: "Tři opatření, která se navzájem doplňují. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: data.cile,
  stoji: {
    odstavce: [
      "Věřitelé dostanou peníze pomaleji, protože srážka bude nejvýš 50 % místo dnešních 66 až 100 %. Teritorialita omezí, jakého exekutora si věřitel může vybrat. Vyšší nezabavitelné minimum bude něco stát: věřitelé dostanou z nízkých příjmů méně.",
      "Čísla ve studii si neodpovídají a říkáme to otevřeně. Kapitola počítá s návratem 100 000 lidí na legální trh práce a s přínosem 3–5 mld. Kč ročně. Tabulka cílů ale mluví o 200 000 lidech a souhrn dopadů strategie uvádí u návratu na trh práce dalších 25 mld. Kč ročně. Tyto údaje se nedají spojit do jednoho čísla.",
      "Reforma dluhy neruší. Dluh zůstává a dál se splácí, jen při nižší srážce. Dnes přitom celková dlužná částka klesá jen o 1 % ročně a jen odpisem.",
    ],
    bobr: "Dlužník, věřitel i stát. Každý nese kus účtu.",
  },
  kalkulacky: [KalkulackaExekuce],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "ZF",
  },
  plneZneniNadpis: "Plné znění kapitoly 1.3, část Exekuce",
  plneZneni,
  zdroje,
  slovnik,
};
