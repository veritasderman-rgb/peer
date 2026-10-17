import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/prace.json";
import { plneZneni, zdroje, slovnik } from "@/content/prace-plne-zneni";
import { KalkulackaMzda } from "@/components/KalkulackaMzda";

/* „Co to znamená pro tebe“: lidský překlad každého ze čtyř opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Výpovědní doba v prvním roce se zkrátí na 1 měsíc. Když o práci přijdeš, první 2 měsíce dostaneš 80% podporu. Od pátého měsíce je podpora podmíněná tím, že se aktivně rekvalifikuješ.",
  2: "Minimální mzda vzroste na 50 % průměrné mzdy. Kolik to vychází při průměrné mzdě 49 215 Kč z roku 2025, spočítáš v kalkulačce níže.",
  3: "Dohoda o provedení práce přestane nahrazovat běžný úvazek. Více dohod najednou smí mít jen student. Kdo opravdu pracuje na částečný úvazek, zaplatí na daních méně.",
  4: "Stát dá na rekvalifikace víc a bude hlídat jejich kvalitu. Každý dospělý dostane osobní vzdělávací účet na kurzy, inspirace je z Francie a Finska. Cíl je průměr OECD do roku 2030.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Svářeč na minimálce",
    text: <>Martin je svářeč z Ústecka. Pracuje na plný úvazek a bere minimální mzdu, <b>22 400 Kč</b>. To je jen <b>43 %</b> průměrné mzdy. Stejně jako až <b>80 %</b> lidí na minimálce má nárok na sociální dávky.</>,
    bobr: "Plný úvazek a pořád nárok na dávky. To je divné.",
    scena: { typ: "podil", hodnota: 80, popis: "lidí na minimálce má nárok na sociální dávky" }, // fakta: narok_na_davky, minimalni_mzda_2026, minimalni_mzda_podil
  },
  {
    mood: "thinking",
    title: "Dohoda místo smlouvy",
    text: <>Zaměstnavatel ho vede na dohodu o provedení práce. DPP umožňuje obcházet pojistné odvody. Martin tak přichází o sociální pojistné nároky.</>,
    bobr: "DPP je pro firmu pohodlná. Pro Martina ne.",
  },
  {
    mood: "surprised",
    title: "Sousedé nás předběhli",
    text: <>Minimální mzda je v Polsku <b>27 600 Kč</b>, v Litvě <b>28 000 Kč</b> a v Chorvatsku <b>25 500 Kč</b>. U nás je <b>22 400 Kč</b>. Česko dlouho lákalo investory levnou prací a okolní země nás dohnaly.</>,
    bobr: "Levná práce byla výhoda. Dnes je to past.",
    scena: { typ: "srovnani", jednotka: "Kč", popis: "Minimální mzda v roce 2026", polozky: [{ nazev: "Litva", hodnota: 28000 }, { nazev: "Polsko", hodnota: 27600 }, { nazev: "Chorvatsko", hodnota: 25500 }, { nazev: "Česko", hodnota: 22400, zvyrazni: true }] }, // fakta: minimalni_mzda_2026, minimalni_mzda_polsko; Litva a Chorvatsko z grafy.minimalniMzdy
  },
  {
    mood: "neutral",
    title: "Přeučit se nejde",
    text: <>Martin by se rád přeučil. Jenže na rekvalifikace šlo v roce 2023 jen <b>0,005 % HDP</b>, průměr OECD je <b>0,1 %</b>. V 1. pololetí 2026 se počet rekvalifikací propadl o <b>80 %</b>.</>,
    bobr: "Dveře ven jsou skoro zavřené.",
    scena: { typ: "cislo", hodnota: 0.005, desetinna: 3, jednotka: "% HDP", popis: "šlo na rekvalifikace v roce 2023, průměr OECD je 0,1 %" }, // fakta: rekvalifikace_podil_hdp, oecd_prumer_hdp
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Martina změní",
    text: <>Minimální mzda vzroste na <b>50 %</b> průměrné mzdy. Při ztrátě práce dostane 80% podporu v prvních <b>2 měsících</b> a osobní vzdělávací účet na kurzy.</>,
    bobr: "Čtyři opatření. Ukážu ti je jedno po druhém.",
    scena: { typ: "predtim-potom", predtim: { hodnota: "43 %", popis: "minimální mzda z průměrné dnes" }, potom: { hodnota: "50 %", popis: "cíl: minimální mzda z průměrné" } }, // fakta: minimalni_mzda_podil, navrh_minimalni_mzda
  },
];

const g = data.grafy;

export const prace: TopicConfig = {
  slug: "prace",
  cislo: 3,
  nazev: "Z montovny k ekonomice chytrých lidí",
  kratkyNazev: "Práce",
  kapitola: "1.3",
  pilir: "Lidský potenciál",
  popisMeta: "Minimální mzda 22 400 Kč je jen 43 % průměrné mzdy, méně než v Polsku, Litvě i Chorvatsku. Proč je levná práce past a co navrhuje Hospodářská strategie PEER. S garantem kapitoly, grafy a kalkulačkou.",
  hook: {
    h1: "Proč je u nás levná práce past?",
    value: 22400,
    unit: "Kč minimální mzda",
    label: "43 % průměrné mzdy, nižší než v Polsku, Litvě i Chorvatsku",
    lede: "Průměrná mzda dosahuje jen 60–65 % průměru EU. Až 80 % lidí na minimální mzdě má přitom nárok na dávky, takže nízké mzdy doplácí stát. Na rekvalifikace šlo v roce 2023 jen 0,005 % HDP, průměr OECD je 0,1 %.",
    source: "Eurostat 2026, studie s. 24.",
    bobr: "Dvaadvacet tisíc čtyři sta. Tolik je minimální mzda. Pojď, ukážu ti, proč je to past pro lidi i pro stát.",
  },
  srovnani: {
    nadpis: "Jak jsme na tom proti sousedům",
    grafy: [
      {
        typ: "bar",
        title: g.minimalniMzdy.titulek,
        unit: g.minimalniMzdy.jednotka,
        items: g.minimalniMzdy.polozky.map((p) => ({ label: p.zeme, value: p.hodnota, note: p.poznamka, highlight: p.zeme === "Česko" })),
        source: "Eurostat, 2026; směnný kurz 24,24 Kč/EUR",
      },
      {
        typ: "compare",
        title: "Výdaje na rekvalifikace v poměru k HDP",
        left: { label: "Česko, 2023", value: "0,005 %", sub: "382 mil. Kč" },
        right: { label: "Průměr OECD", value: "0,1 %" },
        diff: "Průměr OECD je zhruba 20× vyšší.",
        source: "MPSV, OECD, studie s. 24",
      },
    ],
    poznamka: "Údaje o minimálních mzdách jsou přepočtené na koruny. Hodnoty u rekvalifikací jsou přibližné.",
  },
  persona: { who: "Martin, 44", ctx: "svářeč z Ústecka, minimální mzda plus dávky, zaměstnavatel ho vede na DPP" },
  pribehNadpis: "Martin a práce, která nestačí na život",
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
        typ: "bar",
        title: "Dospělí v dalším vzdělávání, 2022",
        unit: "%",
        items: [
          { label: "Česko", value: 21.2, highlight: true },
          { label: "Průměr EU", value: 39.5 },
          { label: "Švédsko", value: 73.9 },
        ],
        source: "Eurostat, Adult Education Survey 2022; Evropská komise",
      },
      {
        typ: "bignumber",
        value: 50,
        unit: "% pracovníků",
        label: "bude muset do roku 2030 projít rekvalifikací (odhad Světového ekonomického fóra)",
        source: "World Economic Forum, Future of Jobs Report 2023",
      },
      {
        typ: "compare",
        title: "Počet rekvalifikací, 1. pololetí 2026",
        left: { label: "1. pololetí 2025", value: "100", sub: "index" },
        right: { label: "1. pololetí 2026", value: "20", sub: "pokles o 80 %" },
        diff: "−80 % za rok",
        source: "Úřad práce ČR, MPSV; po skončení financování z NPO/ESF+",
      },
    ],
    poznamka: "Index u rekvalifikací je jen přepočet meziročního poklesu o 80 %, absolutní počty studie neuvádí.",
  },
  opatreniUvod: "Čtyři opatření, která se navzájem doplňují. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: data.cile.map((c) => ({ ...c, hodnota: String(c.hodnota) })),
  stoji: {
    odstavce: [
      "Flexicurity znamená menší jistotu na začátku: výpovědní doba v prvním roce se zkrátí na 1 měsíc. Silnější záchranná síť přijde až po ztrátě práce, a od pátého měsíce jen pro toho, kdo se rekvalifikuje.",
      "Vyšší minimální mzda může některé firmy tlačit k propouštění nebo k automatizaci. Studie to bere jako záměr, chce firmy přimět ke zvyšování produktivity. Omezení DPP ztíží přivýdělky těm, kdo je dnes používají.",
      "Víc peněz na rekvalifikace bude stát státní rozpočet. Dnes jde na ně asi 0,005 % HDP, průměr OECD je 0,1 %. Studie náklady této kapitoly nevyčísluje, u omezení DPP počítá s vyššími příjmy rozpočtů.",
    ],
    bobr: "Jistota za pružnost, to je dohoda. Neschovám ti, kdo co platí.",
  },
  kalkulacky: [KalkulackaMzda],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "ZF",
  },
  plneZneniNadpis: "Plné znění kapitoly 1.3, část Práce a mzdy",
  plneZneni,
  zdroje,
  slovnik,
};
