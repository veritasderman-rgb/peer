import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/prumysl.json";
import { plneZneni, zdroje, slovnik } from "@/content/prumysl-plne-zneni";
import { KalkulackaPenze } from "@/components/KalkulackaPenze";

/* „Co to znamená pro tebe“: lidský překlad každého z jedenácti opatření ve čtyřech liniích.
   Čísla a návrhy jsou ze studie, formulace redakční. Lenka a její firma jsou ilustrace, ne údaje ze studie. */
const proTebe: Record<number, string> = {
  1: "Stát zadá vývoj řešení, která ještě neexistují. Jde o až 1 % zakázek, zhruba 8,4 mld. Kč ročně. Duševní vlastnictví zůstane firmě. Z první zakázky od státu je reference, se kterou se dá prodávat do světa.",
  2: "Při velkých obranných nákupech nad 1 mld. Kč budou české firmy dostávat podíl na společném vývoji a know-how, kde to bezpečnostní zájem státu a evropská pravidla umožňují. Lenčina strojírna se tak může dostat k vývoji, ne jen k výrobě licencovaných dílů.",
  3: "Firma si od roku 2026 odečte 150 % nákladů na výzkum a vývoj do 50 mil. Kč. Předem se zeptá, jestli projekt projde. Při kontrole ji čeká jednotný výklad, takže se odpočtu nemusí bát.",
  4: "Celou investici do automatizace, softwaru nebo výzkumu odepíše firma hned v prvním roce. Nemusí ji rozkládat na roky.",
  5: "Místo dotace, kterou rozdělují úředníci podle tabulek, může firma dostat záruku, úvěr nebo kapitálový vstup. Stát je dostane zpět. Podíl takových nástrojů přes Národní rozvojovou banku se zvýší násobně, vzorem je Litva.",
  6: "Menší firmy dosáhnou na exportní financování a pojištění. A vznikne nástroj, díky kterému firma může koupit zahraniční firmu se značkou a distribucí, ne jen vyvézt zboží.",
  7: "Tvoje úspory v penzijku budou za férových podmínek pracovat s nižšími poplatky a větším podílem akcií, infrastruktury a růstových investic. Dnes drží fondy zhruba 63 % úspor v dluhopisech. Spočítej si rozdíl v kalkulačce níže.",
  8: "Pobídku dostane projekt s přidanou hodnotou na zaměstnance výrazně nad průměrem odvětví, ideálně s vývojem v Česku. Počet pracovních míst přestane rozhodovat. Objem podpory zůstane stejný, změní se jen adresát.",
  9: "Kdo čerpá veřejnou podporu na výzkum, udrží práva k výsledkům u sebe. Prodej nebo výhradní licence mimo Evropský hospodářský prostor znamená vrácení podpory. Lidé se pohybují svobodně dál.",
  10: "Univerzitní spin-off přestane být dvouleté právní dobrodružství. Vědec dostane sadu předschválených vzorových smluv a univerzita lhůtu, do kdy musí o nabídce zakladatelů rozhodnout.",
  11: "Univerzity budou hodnoceny i za licenční příjmy, získaný soukromý kapitál a přežití spin-offů, ne jen za publikace. Cíl je 200 nových spin-offů mezi lety 2027 a 2032.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Díl na zakázku",
    text: <>Lenka je vedoucí výroby v subdodavatelské strojírně na Vysočině. Firma vyrábí díly pro německou automobilku. Cenu určuje zákazník a každý rok tlačí marži níž.</>,
    bobr: "Vyrábět umí. Cenu ale určuje někdo jiný.",
  },
  {
    mood: "thinking",
    title: "Komu patří hodnota",
    text: <>Firmy pod zahraniční kontrolou vytvářejí <b>60 %</b> přidané hodnoty našeho zpracovatelského průmyslu a <b>83 %</b> jeho vývozu. Návrh, značka, software a zákazník jsou jinde, a tam leží marže.</>,
    bobr: "Zahraniční investice nám po roce 1989 pomohly. Strop mezd ale zůstává.",
  },
  {
    mood: "surprised",
    title: "Kam jdou zisky",
    text: <>Zisky zahraničních vlastníků dosáhly v roce 2025 <b>602 mld. Kč</b>, tedy 7 % HDP. Téměř <b>340 mld. Kč</b> odešlo v dividendách. Přes 262 mld. Kč vlastníci reinvestovali.</>,
    bobr: "Vlastníci mají na zisk právo. Otázka je, kolik hodnoty zůstane tady.",
  },
  {
    mood: "neutral",
    title: "Proč vlastní produkt nevzniká",
    text: <>Daňový odpočet na vývoj využilo v roce 2024 jen <b>721 firem</b>. Penzijní fondy drží <b>63 %</b> úspor v dluhopisech, ne v růstových firmách. A univerzity mají <b>86</b> spin-offů, zatímco samotná ETH Zurich pomohla loni založit <b>46</b> nových firem.</>,
    bobr: "Nápady jsou. Chybí zákazník, kapitál a rychlé smlouvy.",
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Lenku změní",
    text: <>Stát se stane prvním zákazníkem: až <b>1 %</b> zakázek, zhruba <b>8,4 mld. Kč</b> ročně na vývoj nových řešení. Investice do automatizace a softwaru půjdou odepsat hned v prvním roce. Podpora poteče k projektům s vyšší přidanou hodnotou. Cíl je <b>200</b> nových spin-offů do roku 2032.</>,
    bobr: "Jedenáct opatření ve čtyřech liniích. Ukážu ti je.",
  },
];

const g = data.grafy;

export const prumysl: TopicConfig = {
  slug: "prumysl",
  cislo: 10,
  nazev: "Od montovny k vlastnímu produktu",
  kratkyNazev: "Průmysl",
  kapitola: "3.1",
  pilir: "Moderní energetika a průmysl",
  popisMeta: "Česko je 7. nejkomplexnější ekonomika světa, ale v životní úrovni jsme kolem 40. místa. Proč to tak je a co navrhuje Hospodářská strategie PEER. S garantem kapitoly, grafy a kalkulačkou.",
  hook: {
    h1: "Vyrábíme jako elita. Proč bohatneme jako průměr?",
    value: 340,
    unit: "miliard Kč",
    label: "odešlo v roce 2025 v dividendách do zahraničí",
    lede: "Česko je 7. nejkomplexnější ekonomikou světa, ale v HDP na obyvatele jsme kolem 40. místa. Zisky zahraničních vlastníků dosáhly 602 mld. Kč, tedy 7 % HDP.",
    source: "Harvard Atlas of Economic Complexity, MMF, ČSÚ, studie s. 54–56.",
    bobr: "Umíme vyrobit skoro cokoli, tak pojď zjistit, proč se to tolik nepozná na výplatě.",
    bobrMood: "thinking",
  },
  srovnani: {
    nadpis: "Elita ve výrobě, průměr v životní úrovni",
    grafy: [
      {
        typ: "compare",
        title: "Dvě pořadí, dvě různé země",
        left: { label: "Komplexita ekonomiky", value: "7. místo", sub: "Index ekonomické komplexity, data 2024" },
        right: { label: "Životní úroveň", value: "~40. místo", sub: "HDP na obyvatele v paritě kupní síly" },
        source: "Harvard Growth Lab, Atlas of Economic Complexity; MMF, World Economic Outlook (duben 2026)",
      },
      {
        typ: "bar",
        title: "Výdaje na výzkum a vývoj",
        unit: "% HDP",
        items: [
          { label: "Česko", value: g.vydajeNaVaV.cr.hodnota, highlight: true },
          { label: "EU-27", value: g.vydajeNaVaV.eu.hodnota },
          { label: "Německo a Rakousko", value: 3, note: "přes 3" },
        ],
        goal: { value: g.vydajeNaVaV.cil2035, label: "Cíl strategie: 2,5" },
        source: g.vydajeNaVaV.zdroj,
      },
    ],
    poznamka: "Údaj o Česku je z roku 2024 a je předběžný. U Německa a Rakouska studie uvádí jen „přes 3 %“, sloupec ukazuje 3 %.",
  },
  persona: { who: "Lenka, 38", ctx: "vedoucí výroby, subdodavatelská strojírna na Vysočině, díly pro německou automobilku" },
  pribehNadpis: "Lenka a díl, který nese cizí značku",
  steps,
  proc: {
    uvod: "Studie popisuje řetězec o čtyřech krocích. Každý navazuje na ten předchozí a výsledkem je málo hodnoty, která zůstává v Česku.",
    retezec: data.priciny.filter((p) => p.typ === "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "bar",
        title: "Kdo vytváří přidanou hodnotu průmyslu",
        unit: "%",
        max: 100,
        items: [
          { label: "Firmy pod zahraniční kontrolou", value: 60, highlight: true },
          { label: "Ostatní, domácí firmy", value: 40, note: "dopočet do 100 %" },
        ],
        source: "Eurostat, ČSÚ; zpracovatelský průmysl",
      },
      {
        typ: "bignumber",
        value: 721,
        unit: "firem",
        label: "využilo v roce 2024 daňový odpočet na výzkum a vývoj, nejméně od roku 2010",
        source: "ČSÚ, Daňová podpora výzkumu a vývoje za rok 2024",
      },
      {
        typ: "compare",
        title: "Univerzitní spin-offy",
        left: { label: "Česko", value: "86", sub: "evidováno celkem ke konci 2025, za tři roky přibyly dvě firmy" },
        right: { label: "ETH Zurich", value: "46", sub: "nových firem za jeden rok, z toho 24 spin-offů" },
        source: "BusinessInfo.cz (2025), ETH Zurich (2026)",
      },
    ],
    poznamka: "Zahraniční investice po roce 1989 nastartovaly ekonomiku a přinesly know-how i dobře placená místa. Strop vzniká tam, kde hodnotu vytvořenou u nás oceňuje a prodává někdo jiný.",
  },
  opatreniUvod: "Jedenáct opatření ve čtyřech liniích: stát jako první zákazník, kapitál a chytřejší nástroje, podpora přidané hodnoty a cesta z laboratoří na trhy. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: data.cile,
  stoji: {
    odstavce: [
      "Okamžité odpisy krátkodobě sníží výběr daně z příjmů firem. Studie to označuje z velké části za odklad příjmu, který se vrátí. Část výpadku je ale trvalý náklad a studie s ním počítá.",
      "Přepnutí pobídek na přidanou hodnotu znamená, že část velkých objemových investic půjde jinam. To je záměr.",
      "Podmínka udržení práv k výsledkům může odradit část korporátních vývojových center. Studie to chce vyvážit tím, že Česko bude nejrychlejším a nejpředvídatelnějším místem pro pokročilé podnikání v regionu.",
      "Studie neslibuje vyšší mzdy příští rok. Chce vytvořit místa, která vyšší mzdy unesou: vývojová pracoviště, vlastní produkty a podíly zaměstnanců na úspěchu firem.",
    ],
    bobr: "Tuhle stranu účtu říká studie sama. Já ji nezatajím.",
  },
  kalkulacky: [KalkulackaPenze],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "VV",
  },
  plneZneniNadpis: "Plné znění kapitoly 3.1",
  plneZneni,
  zdroje,
  slovnik,
};
