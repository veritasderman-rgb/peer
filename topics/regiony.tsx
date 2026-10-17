import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/regiony.json";
import { plneZneni, zdroje, slovnik } from "@/content/regiony-plne-zneni";
import { KalkulackaObec } from "@/components/KalkulackaObec";

/* „Co to znamená pro tebe“: lidský překlad každého ze šesti opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Tvoje obec dostane z rozvoje víc. Nejméně 20 % obecního rozpočtového určení daní, dnes asi 60 mld. Kč ročně, se naváže na ekonomickou aktivitu v území. Solidární složka pro sociálně znevýhodněné zůstává.",
  2: "Malá obec nemusí všechno zvládat sama. Společenství obcí dostane stabilní peníze a společně zajistí právo, zakázky i přípravu investic. Slučování je dobrovolné a sídla si mohou ponechat místní zastoupení i část rozpočtu.",
  3: "Peníze tvé obce nemusí ležet na účtu. Obce je mohou dobrovolně sdružit přes Národní rozvojovou banku a dostat levnější dlouhodobý úvěr, i když jsou malé. Dnes drží 300–400 mld. Kč.",
  4: "Dotace se přestanou drobit do malých projektů. Víc peněz půjde do dopravy, škol, bydlení, energetiky a brownfieldů. Slabší regiony dostanou společnou projektovou podporu. Půjčky a záruky dnes tvoří jen kolem 3 % využití evropských prostředků.",
  5: "Firma, která v ohroženém území postaví novou produktivní investici, ji odepíše rychleji. Podpora míří na novou práci, ne na dlouhodobé dotování provozu.",
  6: "Uvidíš, kam jdou velké veřejné investice a jak reformy dopadnou na tvůj region. Ukazatele se budou sledovat po krajích a obcích s rozšířenou působností. Úspěch se bude měřit výsledky, ne rozdělenými dotacemi.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Firma a 20 bytů",
    text: <>Eva je starostka obce s <b>900 obyvateli</b>. Chce povolit malou firmu a dvacet bytů. Lidé by tu našli práci a bydlení. Zastupitelé to podporují, jen Eva se ptá, co z toho obec bude mít.</>,
    bobr: "Práce a noví obyvatelé. To zní dobře, ne?",
  },
  {
    mood: "thinking",
    title: "Obci nic nepřiteče",
    text: <>Z místní ekonomiky má obec jen <b>~2 %</b> příjmů. Skoro <b>97–98 %</b> peněz obcí a krajů jde ze státního rozpočtu, bez vazby na to, co se v obci děje. Firma i noví lidé obec něco stojí, ale nic jí nepřinesou.</>,
    bobr: "Za rozvoj obec platí. Vydělat na něm nemůže.",
    scena: { typ: "podil", hodnota: 2, popis: "příjmů obcí pochází z místní ekonomiky" }, // fakta: podil_prijmu_obci_cr, statni_rozpocet_zavislost
  },
  {
    mood: "surprised",
    title: "Peníze leží, projekty čekají",
    text: <>Přitom obce drží na účtech <b>300–400 mld. Kč</b>. Řada potřebných investic přesto nevznikne, nebo čeká na dotační výzvu. Evina obec patří mezi <b>4 700 obcí</b> s méně než tisícem obyvatel.</>,
    bobr: "Peníze jsou. Chybí důvod a lidé na přípravu projektů.",
    scena: { typ: "cislo", hodnota: 300, predpona: "od", jednotka: "mld. Kč", popis: "leží na účtech obcí, odhad je 300–400 mld. Kč" }, // fakta: obecni_ucty (300–400 mld. Kč), obce_pod_tisic
  },
  {
    mood: "neutral",
    title: "Malý úřad, velký úkol",
    text: <>Česko má přes <b>6 200 obcí</b>. Malá obec nezaměstná specialistu na právo, veřejné zakázky ani územní plán. Eva tyhle agendy zvládá sama a na velký projekt jí nezbývá kapacita.</>,
    bobr: "Jeden člověk nemůže umět všechno.",
    scena: { typ: "cislo", hodnota: 6200, predpona: "přes", jednotka: "obcí", popis: "obcí v Česku, z toho 4 700 pod tisíc obyvatel" }, // fakta: obce_pocet, obce_pod_tisic
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Evu změní",
    text: <>Nejméně <b>20 %</b> rozpočtového určení daní, asi <b>60 mld. Kč</b> ročně, se naváže na ekonomickou aktivitu v území. Eva dostane z firmy i nových obyvatel podíl a za novou výstavbu příspěvek na infrastrukturu. Odborníky si může s okolními obcemi najmout společně.</>,
    bobr: "Šest opatření. Ukážu ti je jedno po druhém.",
    scena: { // fakta: statni_rozpocet_zavislost; opatreni 1 (klicoveCislo)
      typ: "predtim-potom",
      predtim: { hodnota: "97–98 %", popis: "příjmů obcí a krajů ze státu, bez vazby na území" },
      potom: { hodnota: "min. 20 %", popis: "z rozpočtového určení daní (60 mld. Kč) se naváže na obec" },
    },
  },
];

const g = data.grafy;

/* U rozsahů bereme střed. Rozsahy jsou ve zdroji pod grafem. */
const stred = (od: number, doo: number | null) => (doo == null ? od : (od + doo) / 2);

/* Texty cílů jsou z dat. Jednotky ve studii chybí, proto krátké redakční štítky. */
const cileStitky: { hodnota: string; jednotka: string }[] = [
  { hodnota: "Růst", jednotka: "zaostávajících regionů" },
  { hodnota: "ORP", jednotka: "a funkční mikroregiony" },
  { hodnota: "Pobídky", jednotka: "pro obce" },
  { hodnota: "Kapacita", jednotka: "samospráv" },
  { hodnota: "Úspory", jednotka: "a návratné nástroje" },
  { hodnota: "Centra", jednotka: "a jejich propojení" },
];

export const regiony: TopicConfig = {
  slug: "regiony",
  cislo: 13,
  nazev: "Úspěšné regiony a efektivní samospráva",
  kratkyNazev: "Úspěšné regiony",
  kapitola: "4.1",
  pilir: "Stát jako motor",
  popisMeta: "Obce mají z místní ekonomiky jen 2 % příjmů, v EU je hůř jen v Řecku. Proč to tak je a co s tím navrhuje Hospodářská strategie PEER. S garantem kapitoly, grafy a kalkulačkou.",
  hook: {
    h1: "Kolik z místní ekonomiky zůstane obci?",
    value: 2,
    unit: "% příjmů obcí",
    label: "Česko, podíl příjmů obcí z místní ekonomiky",
    lede: "V EU je na tom hůř jen Řecko. Průměr EU je 20 až 25 %.",
    source: "Druhá ekonomická transformace (2024), Hrot24 (2024), studie s. 76–77.",
    bobr: "Dvě procenta. Skoro všechny peníze obce přicházejí od státu, ať se v obci děje cokoli. Pojď se podívat proč.",
  },
  srovnani: {
    nadpis: "Jak jsme na tom proti Evropě",
    grafy: [
      {
        typ: "bar",
        title: g.podilPrijmuZMistniEkonomiky.titulek,
        unit: "%",
        items: g.podilPrijmuZMistniEkonomiky.polozky.map((p) => ({ label: p.zeme, value: stred(p.od, p.do), highlight: p.zeme === "Česko" })),
        source: "Druhá ekonomická transformace (2024), Hrot24 (2024). Sloupce ukazují střed rozsahu: Dánsko, Švédsko, Finsko a Pobaltí 45–60 %, Německo a Polsko přes 30 %, průměr EU 20–25 %.",
      },
      {
        typ: "compare",
        title: "Odkud mají obce a kraje peníze",
        left: { label: "Ze státního rozpočtu", value: "97–98 %", sub: "bez vazby na dění v obci" },
        right: { label: "Z místní ekonomiky", value: "~2 %", sub: "druhý nejnižší podíl v EU" },
        source: "Studie s. 76–77, Druhá ekonomická transformace (2024), Hrot24 (2024).",
      },
    ],
  },
  persona: { who: "Eva, 48", ctx: "starostka obce s 900 obyvateli, chce povolit malou firmu a 20 bytů" },
  pribehNadpis: "Eva a firma, ze které obci nic nepřiteče",
  steps,
  proc: {
    uvod: "Studie popisuje řetězec čtyř kroků. Začíná u peněz obce a končí u odchodu mladých lidí.",
    retezec: data.priciny.filter((p) => p.typ === "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "bar",
        title: "Obce v Česku",
        unit: "obcí",
        items: g.obce.polozky.map((p) => ({ label: p.kategorie, value: p.hodnota, note: "poznamka" in p ? p.poznamka : undefined, highlight: p.kategorie.startsWith("z toho") })),
        source: "Studie, kapitola 4.1. Počet obcí s méně než tisícem obyvatel je přibližný.",
      },
      {
        typ: "compare",
        title: "Peníze na účtech a peníze, které se vrací",
        left: { label: "Na účtech obcí", value: "300–400 mld. Kč" },
        right: { label: "Návratné nástroje", value: "~3 %", sub: "využití evropských prostředků" },
        source: "Studie, kapitola 4.1, opatření 3 a 4. Návratné nástroje jsou půjčky a záruky.",
      },
      {
        typ: "bignumber",
        value: 60,
        prefix: "cca ",
        unit: "mld. Kč ročně",
        label: "Nejméně 20 % rozpočtového určení daní se naváže na ekonomickou aktivitu v obci",
        source: "Studie, opatření 1.",
      },
    ],
  },
  opatreniUvod: "Šest provázaných opatření. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: data.cile.map((c, i) => ({ hodnota: cileStitky[i].hodnota, jednotka: cileStitky[i].jednotka, cil: c.cil })),
  stoji: {
    odstavce: [
      "Slučování obcí naráží na místní identitu. Studie ji sama označuje za hodnotu a slučování má být dobrovolné, s finanční podporou. Jednotlivá sídla si mají zachovat místní zastoupení i garantovanou část rozpočtu. Lidé se přesto mohou bát, že jejich obec ztratí vlastní hlas, a s tím je potřeba počítat.",
      "Přesun části rozpočtového určení daní znamená, že se peníze rozdělí jinak. Reforma má být převážně fiskálně neutrální. Když někdo dostane víc, jiný dostane méně, proto zůstává solidární složka pro sociálně znevýhodněné obce. Kdo na změně získá a kdo ztratí, kapitola nevyčísluje.",
    ],
    bobr: "Reforma přerozděluje peníze. Říkám to rovnou.",
  },
  kalkulacky: [KalkulackaObec],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "JK",
  },
  plneZneniNadpis: "Plné znění kapitoly 4.1",
  plneZneni,
  zdroje,
  slovnik,
};
