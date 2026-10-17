import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/oligarchie.json";
import { plneZneni, zdroje, slovnik } from "@/content/oligarchie-plne-zneni";

/* „Co to znamená pro tebe“: lidský překlad každého z pěti opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Politická moc se nesmí směšovat s byznysovou silou a mediálním vlivem. Zákon o střetu zájmů by se musel důsledně posuzovat a vymáhat, ne jen existovat.",
  2: "Evropské nařízení EMFA platí od roku 2025 a vyžaduje zveřejnění skutečných majitelů médií. Čtenář zpráv by věděl, komu redakce patří.",
  3: "Návrh hledá cesty, jak omezit křížové vlastnictví byznysu a médií, hlavně v oborech regulovaných nebo silně podporovaných dotacemi. Pomoci má i tlak na úrovni EU. Je to dlouhodobá práce.",
  4: "Zákon o významné tržní síle už existuje. Návrh chce, aby ho stát aktivně používal. ÚOHS by mohl nařídit odprodej části podniku, pokuty by byly vyšší a strop tržní dominance by klesl pod 40 %.",
  5: "Dotace na plochu by nesměly přesáhnout 100 tis. EUR ročně na skutečného majitele. Podpora by se přesunula k malým a středním rodinným farmám. Dotace mají jít i na ochranu půdy před erozí, zadržování vody a kvalitu vody.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "80 hektarů vedle agroholdingu",
    text: <>Pan Zdeněk hospodaří na rodinné farmě s <b>80 hektary</b>. Hned vedle leží pole velkého agroholdingu. Dotace na plochu dnes potkávají oba.</>,
    bobr: "Stejná dotace pro malého i velkého? To se mi nezdá.",
  },
  {
    mood: "thinking",
    title: "Kam míří dotace",
    text: <>Vysoké dotace jdoucí gigantům dosahují <b>20–30 mld. Kč</b> ročně. Výzkumy CERGE-EI ukazují, že se nepromítají do inovací a produktivity. Přesouvají se do zisku firem.</>,
    bobr: "Peníze, které měly něco změnit, skončí v zisku?",
    scena: { typ: "cislo", predpona: "20–", hodnota: 30, jednotka: "mld. Kč ročně", popis: "vysokých dotací míří k největším hráčům" }, // fakta: dotace_gigantum_rocne
  },
  {
    mood: "surprised",
    title: "Platíme to všichni",
    text: <>Dominantní hráči mají vyšší zisky než malé a střední firmy. V době inflační krize patřil mezi hlavní příčiny inflace růst cen potravin a energií, kde jsou silné oligarchické struktury.</>,
    bobr: "A kdo to zaplatí? Každý u pokladny.",
  },
  {
    mood: "neutral",
    title: "Dánsko to zkusilo",
    text: <>Dánský úřad od reformy z roku 2024 posuzuje fúze už od <b>50 mil. DKK</b>, tedy asi <b>200 mil. Kč</b> obratu. Pokuty se počítají z obratu, ne fixní částkou.</>,
    bobr: "Menší země to dokázala. Co by to znamenalo u nás?",
    scena: { typ: "cislo", predpona: "od", hodnota: 200, jednotka: "mil. Kč obratu", popis: "dánský úřad posuzuje fúze od 50 mil. DKK" }, // fakta: danska_fuze_prah
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Zdeňka změní",
    text: <>Dotace na plochu se zastropují na <b>100 tis. EUR</b> ročně na skutečného majitele. Největší hráči budou mimo plošné dotace, nebo dostanou výrazně míň. Podpora se přesune k rodinným farmám.</>,
    bobr: "Pět opatření. Projdeme je jedno po druhém.",
    scena: { typ: "predtim-potom", predtim: { hodnota: "bez stropu", popis: "dotace na plochu dnes" }, potom: { hodnota: "100 tis. EUR", popis: "strop ročně na skutečného majitele" } }, // fakta: navrh_strop_zemedelske_dotace
  },
];

const g = data.grafy;

export const oligarchie: TopicConfig = {
  slug: "oligarchie",
  cislo: 7,
  nazev: data.nazev,
  kratkyNazev: "Oligarchie",
  kapitola: data.kapitola,
  pilir: "Trh a kapitál",
  popisMeta: "Dotace v objemu 20 až 30 mld. Kč ročně míří gigantům a podle výzkumů se nepromítají do inovací. Co navrhuje Hospodářská strategie PEER. S garantem kapitoly a grafy.",
  hook: {
    h1: "Komu jdou dotace, které platíme všichni?",
    value: 20,
    unit: "až 30 mld. Kč ročně",
    label: "vysokých dotací míří k největším hráčům",
    lede: "Výzkumy CERGE-EI ukazují, že se nepromítají do vyšší inovativnosti ani produktivity, ale do zisku těchto firem.",
    source: "Hospodářská strategie PEER, kap. 2.1; Srholec 2024, IDEA při CERGE-EI, Studie 16/2024.",
    bobr: "Dvacet až třicet miliard ročně. Co z toho máme my? Pojď se podívat.",
  },
  srovnani: {
    nadpis: "Dvě čísla k dotacím a zakázkám",
    grafy: [
      {
        typ: "bignumber",
        value: g.zemedelskyStrop.hodnota,
        prefix: "max. ",
        unit: "EUR ročně",
        label: "návrh stropu zemědělských dotací na plochu na skutečného majitele",
        source: g.zemedelskyStrop.zdroj,
      },
      {
        typ: "bignumber",
        value: g.verejneZakazky.hodnota,
        unit: "% HDP",
        label: "tvoří veřejné zakázky, skoro 1 bilion Kč",
        source: "Hospodářská strategie PEER, kap. 2.1 (zdroj čísla studie neuvádí).",
      },
    ],
    poznamka: "Strop se váže na skutečného majitele, který se zjišťuje sledováním propojenosti firem (studie, kap. 2.1).",
  },
  persona: { who: "Pan Zdeněk, 58", ctx: "rodinný farmář, 80 ha, hospodaří vedle velkého agroholdingu" },
  pribehNadpis: "Pan Zdeněk a dotace na plochu",
  steps,
  proc: {
    uvod: "Studie popisuje, jak se koncentrace moci udržuje. Čtyři kroky, a pak znovu od začátku.",
    retezec: data.priciny.filter((p) => [1, 2, 4, 6].includes(p.poradi)).map((p) => ({ nazev: p.pricina, popis: p.popis })),
    loop: { nazev: "a znovu od začátku", popis: "Jakmile se tyto struktury jednou vytvoří, je obtížné je rozbíjet. Boj proti nim je dlouhodobý." },
    dalsi: data.priciny.filter((p) => ![1, 2, 4, 6].includes(p.poradi)).map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "bignumber",
        value: Number(data.fakta.find((f) => f.id === "media_transparentnost_poradi")?.hodnota),
        unit: "místo od konce",
        label: "v EU v transparentnosti vlastnictví médií, za Maďarskem a Polskem",
        source: "Hospodářská strategie PEER, kap. 2.1; Media Pluralism Monitor 2024 (CMPF).",
      },
      {
        typ: "bignumber",
        value: Number(data.fakta.find((f) => f.id === "navrh_trzni_dominance")?.hodnota),
        prefix: "pod ",
        unit: "%",
        label: "návrh stropu tržní dominance",
        source: "Hospodářská strategie PEER, kap. 2.1, opatření 4.",
      },
      {
        typ: "bignumber",
        value: 200,
        prefix: "od ",
        unit: "mil. Kč",
        label: "obratu posuzuje dánský úřad fúze (50 mil. DKK)",
        source: "Danish Competition and Consumer Authority (KFST), 2024.",
      },
    ],
    poznamka: "Dánská reforma soutěžního práva z roku 2024 je pro studii inspirací, ne hotovým návrhem pro Česko.",
  },
  opatreniUvod: "Pět opatření. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: [
    { hodnota: "Férová soutěž", jednotka: "kvalitativní cíl", cil: "Zastavit zneužívání neférové výhody velkých hráčů a nedovolit další zhoršování situace." },
    { hodnota: "pod 40", jednotka: "% tržního podílu (strop dominance)", cil: "Snížit strop pro tzv. tržní dominanci." },
  ],
  stoji: {
    odstavce: [
      "Víc zaplatí největší hráči. Přijdou o plošné dotace nebo o jejich velkou část a mohou čelit vyšším pokutám, odprodeji části podniku nebo přísnějšímu posuzování fúzí. Počítejme s tím, že budou klást silný odpor.",
      "Stát musí sílu těchto pravidel umět vymáhat. Strop dotací vyžaduje zjistit skutečného majitele skrze propojenost firem a ÚOHS potřebuje víc pravomocí i kapacit. Studie sama říká, že boj proti oligarchické moci je extrémně těžký a dlouhodobý. Náklady a výši úspor v kapitole nevyčísluje.",
    ],
    bobr: "Silní hráči se nevzdají hned. Říkám to na rovinu.",
  },
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "MD",
  },
  plneZneniNadpis: "Plné znění kapitoly 2.1",
  plneZneni,
  zdroje,
  slovnik,
};
