import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/energie.json";
import { plneZneni, zdroje, slovnik } from "@/content/energie-plne-zneni";
import { KalkulackaKupon } from "@/components/KalkulackaKupon";

/* „Co to znamená pro tebe“: lidský překlad každého ze šestnácti opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Pro firmu s baterií, přečerpávací elektrárnou nebo flexibilní spotřebou: o platbu za pohotovost se bude soutěžit za stejných podmínek jako u plynové elektrárny. Pro všechny odběratele: 75 až 150 mld. Kč za dekádu zaplatí v cenách, proto musí vyhrát nejlevnější řešení.",
  2: "Pro obec: z větrníku na jejím území dostane přímý výnos. Projekt s podporou obce projde povolováním výrazně rychleji.",
  3: "Pro majitele solárního parku nebo střechy: tempo přes 1 GW ročně a okno let 2029 až 2031, kdy lze staré parky přezbrojit a na stejné ploše vyrobit víc. Střídače nebude možné vypnout na dálku ze třetích zemí.",
  4: "Pro rodinu s elektromobilem: po roce 2040 mají nové bloky krýt kolem poloviny spotřeby. Jádro je pojistka stability, ne recept na levnou elektřinu, a strategie hlídá, aby riziko nepřenesla na stát a odběratele.",
  5: "Pro firmu i stát: nejdřív studie proveditelnosti stejnosměrného koridoru, teprve potom rozhodnutí. U malých modulárních reaktorů si držíme opci přes podíl ČEZ v Rolls-Royce SMR.",
  6: "Pro pana Karla: zákon ohlásí na roky dopředu, jak se budou měnit daně a poplatky. Kotel vymění, až doslouží, a ví, co ho čeká. Žádný cenový šok.",
  7: "Pro rodinu: polovina výnosů z povolenek se vrátí každému stejně, bez žádosti, na výplatní pásce, v důchodu nebo v dávkách. Kdo topí a jezdí úsporně, dostane víc, než zaplatil.",
  8: "Pro firmu s vysokou spotřebou: dlouhodobé kontrakty na elektřinu ze stávajících jaderných elektráren, aukce za skutečně snížené emise a úleva na síťových poplatcích výměnou za pomoc soustavě ve špičkách. Bez nových desítek miliard.",
  9: "Pro obec i firmu, které čekají na připojení: kdo drží rezervaci v síti, bude dokládat milníky. Propadlá kapacita se vrátí do průhledné fronty.",
  10: "Pro firmu s baterií nebo velkým odběrem: rychlejší dobrovolná cesta, když přijmeš, že distributor smí výkon v krátkých špičkách omezit. Distributor má lhůtu na rozhodnutí a při zaviněném průtahu platí kompenzaci ze svého.",
  11: "Pro rodinu s elektromobilem: tvoje data o spotřebě patří tobě. Dynamický tarif bude přísně dobrovolný a v pilotu domácnosti ušetřily kolem desetiny účtu.",
  12: "Pro obec nebo bytový dům: kdo sdílí elektřinu lokálně, platí za síť méně, protože ji méně zatěžuje. Rakousko má takových společenství téměř 4 000, Česko zhruba 200.",
  13: "Pro obec a stát: u každé velké budovy se prověří úspory se zárukou. Dodavatel ručí za výsledek a platí se z uspořených účtů, ne z dotací.",
  14: "Pro pana Karla: výhodná půjčka na renovaci z fondu, do kterého se splátky vracejí. Kdo na investici nedosáhne, dostane renovaci na klíč ze Sociálního klimatického fondu.",
  15: "Pro domácnost na dálkovém teple: ceny tepla budou veřejně srovnatelné. Kdo opakovaně účtuje víc, než by stálo srovnatelné tepelné čerpadlo, předloží ozdravný plán a odběratelé mohou odejít bez sankcí.",
  16: "Pro obec a teplárnu: uhlí v soustavách se nahradí hlavně teplem, které dnes vyhazujeme. Stačilo by na zhruba 800 tisíc domácností.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Kotel a čerpadlo",
    text: <>Pan Karel je důchodce a bydlí v rodinném domě s plynovým kotlem. Je jednou z více než <b>1,5 milionu domácností</b>, které topí plynem. Chce si pořídit tepelné čerpadlo. Prodejce mu řekl, že se mu to „nevyplatí“.</>,
    bobr: "Čerpadlo je úsporné. Tak proč se nevyplatí?",
  },
  {
    mood: "thinking",
    title: "Kde se to láme",
    text: <>Jednotka elektřiny stojí domácnost zhruba <b>čtyřikrát</b> víc než jednotka plynu. Čerpadlo se vyplácí od poměru asi <b>2,7 : 1</b>. Elektřina nese povolenky a plné náklady sítí, plyn na vytápění je osvobozen od spotřební daně.</>,
    bobr: "Poměr cen je nastavený proti elektřině.",
  },
  {
    mood: "surprised",
    title: "Továrna tu je, zákazníci ne",
    text: <>Česko patří k velkým výrobcům tepelných čerpadel a Panasonic rozšiřuje továrnu v Plzni. Domácí prodeje přitom za dva roky spadly <b>na polovinu</b>.</>,
    bobr: "Vyrábíme je pro Evropu. Doma je nikdo nechce.",
  },
  {
    mood: "neutral",
    title: "Elektřina je, síť je zamčená",
    text: <>Loni bylo na burze <b>322 hodin</b> se zápornou cenou elektřiny. Přes <b>20 GW</b> kapacity v sítích přitom drží rezervace projektů, které se roky nestaví. To je dvojnásobek toho, co chceme do roku 2030 postavit.</>,
    bobr: "Kapacita je zaplacená. Jen na ni někdo sedí.",
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro pana Karla změní",
    text: <>Zákon ohlásí trajektorii cen na roky dopředu. Od roku 2028 dostane domácnost zpět polovinu výnosů z povolenek, zhruba <b>5 000 Kč ročně</b>. Dynamický tarif, přísně dobrovolný, ušetřil v pilotu kolem <b>desetiny</b> účtu. A teplárny dostanou k odpadnímu teplu cestu pro <b>800 tisíc domácností</b>.</>,
    bobr: "Šestnáct opatření ve čtyřech liniích. Pojď na ně.",
  },
];

const g = data.grafy;

export const energie: TopicConfig = {
  slug: "energie",
  cislo: 11,
  nazev: "Energie pro budoucnost",
  kratkyNazev: "Energie",
  kapitola: "3.2",
  pilir: "Moderní energetika a průmysl",
  popisMeta: "Za dovoz uhlí, ropy a plynu odešlo v roce 2025 do zahraničí 262 miliard korun. Proč je elektřina drahá a co navrhuje Hospodářská strategie PEER. S garantem kapitoly, grafy a kalkulačkou kupónu.",
  hook: {
    h1: "Kam každý rok odtečou stovky miliard?",
    value: data.hook.hodnota,
    unit: "miliard Kč",
    label: "odešlo v roce 2025 do zahraničí za uhlí, ropu a plyn",
    lede: "České domácnosti platí v přepočtu na kupní sílu druhou nejdražší elektřinu v EU. Každá kilowatthodina z domácích zdrojů ten účet snižuje.",
    source: "ČSÚ, Eurostat, studie s. 62.",
    bobr: "Dvě stě šedesát dvě miliardy. A to jen za paliva. Pojď, ukážu ti, kde se to dá otočit.",
  },
  srovnani: {
    nadpis: "Kde zaostáváme",
    grafy: [
      {
        typ: "bar",
        title: "Kolik solárů se u nás ročně postaví",
        unit: "GW",
        items: g.solarniTempo.polozky.map((p) => ({ label: String(p.rok), value: p.hodnota, highlight: p.rok === 2025 })),
        goal: { value: g.solarniTempo.cil.hodnota, label: "Cíl: přes 1 GW ročně" },
        source: "Solární asociace, pv magazine; cíl 10,1 GW do roku 2030 (NKEP)",
      },
      {
        typ: "compare",
        title: "Poměr ceny elektřiny a plynu",
        left: { label: "Dnes", value: "4 : 1", sub: "jednotka elektřiny proti jednotce plynu" },
        right: { label: "Bod zvratu tepelného čerpadla", value: "2,7 : 1", sub: "od tohoto poměru se čerpadlo vyplácí" },
        diff: "Dnešní poměr je zhruba o polovinu nad bodem zvratu.",
        source: "TZB-info 2025, studie kap. 3.2",
      },
    ],
  },
  persona: { who: "Pan Karel, 67", ctx: "důchodce, rodinný dům, plynový kotel, chce tepelné čerpadlo" },
  pribehNadpis: "Pan Karel a čerpadlo, které se „nevyplatí“",
  steps,
  proc: {
    uvod: "Studie uvádí pět příčin. První je načasování konce uhlí, zbylé čtyři jsou špatně nastavená pravidla.",
    retezec: data.priciny.filter((p) => p.typ === "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "bar",
        title: "Kolik elektřiny dává vítr",
        unit: "%",
        max: 15,
        items: [
          { label: "Česko", value: 1, note: "necelé 1 % výroby elektřiny", highlight: true },
          { label: "Rakousko", value: 13, note: "13 % spotřeby elektřiny" },
        ],
        source: "Komora OZE 2026, BMWET 2025. Potenciál ČR do roku 2040: 6 až 19 TWh ročně (ÚFA AV ČR)",
      },
      {
        typ: "bignumber",
        value: 20,
        prefix: "přes ",
        unit: "GW",
        label: "kapacity v sítích drží rezervace projektů, které se roky nestaví",
        source: "EGÚ Brno pro Hnutí DUHA 2025",
      },
      {
        typ: "bar",
        title: "Energetická společenství",
        unit: "společenství",
        items: g.komunitniEnergetika.polozky.map((p) => ({ label: p.zeme, value: p.hodnota, note: p.poznamka, highlight: p.zeme === "Česko" })),
        source: "Energiegemeinschaften.gv.at 2025, EDC 2026",
      },
    ],
    poznamka: "Vítr: u Česka jde o podíl na výrobě, u Rakouska o podíl na spotřebě elektřiny. Čísla jsou převzatá ze studie bez přepočtu.",
  },
  opatreniUvod: "Šestnáct opatření ve čtyřech liniích: domácí zdroje a bezpečný přechod od uhlí, férové ceny pro domácnosti a průmysl, odblokovaná a flexibilní síť, úspory a moderní teplárenství. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: data.cile.map((c) => ({ ...c, hodnota: typeof c.hodnota === "number" && c.hodnota >= 2000 ? String(c.hodnota) : c.hodnota })),
  stoji: {
    odstavce: [
      "Kapacitní mechanismus vyjde na 75 až 150 miliard korun za dekádu. Zaplatí ho odběratelé elektřiny. Proto musí aukce vybírat nejlevnější řešení, ne předem určenou technologii.",
      "Narovnání cen znamená, že plyn zdraží. Proto platí pořadí: nejdřív energetický kupón a peníze lidem, teprve potom narovnávání daní.",
      "Dukovany mají smluvní cenu 407 miliard korun, bez inflace a bez nákladů financování. Špatně nastavená realizační cena může přenést podstatnou část rizika na stát a odběratele. Evropská komise kvůli tomu zahájila šetření.",
      "Větrníky v mnoha obcích narážejí na odpor. Přímý výnos z projektu ho nemusí odstranit všude, ale dává obci důvod říct ano.",
    ],
    bobr: "Rychlejší zdroje nic nestojí? Stojí. Proto ti ukazuju i účet.",
  },
  kalkulacky: [KalkulackaKupon],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "VV",
  },
  plneZneniNadpis: "Plné znění kapitoly 3.2",
  plneZneni,
  zdroje,
  slovnik,
};
