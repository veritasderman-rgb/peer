import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/zdravi.json";
import { plneZneni, zdroje, slovnik } from "@/content/zdravi-plne-zneni";

/* „Co to znamená pro tebe“: lidský překlad každého z jedenácti opatření ve čtyřech liniích.
   Čísla ze studie, formulace redakční. Kde strategie jen „prověří“, říkáme to tak. */
const proTebe: Record<number, string> = {
  1: "Praktický lékař tě při návštěvě krátce osloví kvůli kouření, alkoholu nebo váze a nasměruje tě do programu, který pomáhá. Lékaře odměňují za tuhle práci, ne za počet prohlídek.",
  2: "Slazené nápoje a část alkoholu zdraží, třeba tiché víno, které dnes daň nemá. Nejméně 40 % výnosu jde do Fondu prevence zdravotních pojišťoven.",
  3: "Víc výkonů bez noci v nemocnici: jednodenní péče, ambulance, domácí péče a telemedicína. Lůžková síť se mění tak, aby ti péče byla blíž a nemocnice se hodily na to, na co jsou potřeba.",
  4: "Před zavedením se spočítá, jestli se péče vyplatí. Počítá se dopad na veřejné rozpočty jako celek, tedy i úspory, které vzniknou v sociálních službách.",
  5: "Jana dostane službu, která přijde domů, a odlehčovací pobyt pro mámu. Částečných úvazků má být do roku 2040 víc, z dnešních 7 % na 15 %.",
  6: "Pomoc přijde za člověkem domů, místo aby musel do ústavu. Pečující si může odpočinout nebo zůstat v práci.",
  7: "Lidé s postižením budou žít v menších službách v běžném prostředí. Nová zařízení budou mít nejvýše 18 míst.",
  8: "Služba domů funguje jen tehdy, když ji má kdo udělat. Proto roste počet pracovníků v terénu a sester v domácí péči, kterých je dnes proti pobytovým službám několikrát méně.",
  9: "Stát, kraj a obec budou mít jasně dané role. Jestli se k tobě služba dostane, nebude záležet na tom, jaké priority má zrovna tvoje obec.",
  10: "U seniorů strategie jen prověří vyšší spoluúčast, pojištění dlouhodobé péče a majetkové testování. Zatím nejde o hotové rozhodnutí. U lidí s postižením má zůstat silná role státu a služby dostupné bez ohledu na bydliště.",
  11: "Je ti do 40 let? Pojišťovna ti může nabídnout nižší platbu, když doložíš, že o zdraví pečuješ. Odměňuje se chování, ne to, jestli jsi zdravý. Začíná se pilotně.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Odešla z práce",
    text: <>Jana je účetní a je jí 52 let. Máma onemocněla demencí a péče se nedala zvládnout vedle práce, tak z ní odešla. Jana není sama. Neformálně pečuje <b>250–300 tisíc</b> lidí, podle některých odhadů až <b>milion</b>.</>,
    bobr: "Za jednou Janou stojí hodně dalších. Jen o nich nikdo nevede statistiku.",
    scena: { typ: "cislo", predpona: "250–", hodnota: 300, jednotka: "tisíc lidí", popis: "neformálně pečuje, podle některých odhadů až milion" }, // fakta: neformalni_pecujici_pocet
  },
  {
    mood: "thinking",
    title: "Kdo to dělá",
    text: <>Dvě třetiny pečujících jsou ženy ve věku <b>35 až 64</b> let. Zkrácený úvazek by pomohl, jenže částečné úvazky tvoří jen asi <b>7 %</b>. Po skončení péče se na trh práce vrací těžko.</>,
    bobr: "Odejít je rychlé. Vrátit se je dlouhá cesta.",
    scena: { typ: "podil", hodnota: 7, popis: "pracovních úvazků je částečných, pečujícím by pomohly" }, // fakta: castecne_uvazky_sucasne, neformalni_pecujici_zeny
  },
  {
    mood: "surprised",
    title: "Služba, která nepřijde",
    text: <>Pomoc, která by přišla domů, chybí. Terénní služby pokrývají jen <b>5–10 %</b> potřeb. V Praze podle odhadů chybí až <b>3 000</b> sociálních pracovníků a pracovníků v sociálních službách.</>,
    bobr: "Když služba nepřijde, zůstane péče na rodině.",
    scena: { typ: "cislo", predpona: "5–", hodnota: 10, jednotka: "%", popis: "potřeb pokrývají terénní služby, doma pomoc chybí" }, // fakta: terenni_kapacity_pokryti, praha_chybi_pracovniku
  },
  {
    mood: "neutral",
    title: "Týká se to nás všech",
    text: <>V roce 2024 bylo denně v pracovní neschopnosti přes <b>182 tisíc</b> lidí. Celých <b>62 %</b> ztracených zdravých let dopadá na lidi v produktivním věku, ne na seniory. A <b>72 %</b> potenciálu zlepšení jde řešit prevencí a životosprávou.</>,
    bobr: "Zdraví není jen věc ordinace. Je to věc výplaty i rodinného rozpočtu.",
    scena: { typ: "podil", hodnota: 62, popis: "ztracených zdravých let dopadá na lidi v produktivním věku" }, // fakta: mck_ztracene_roky_produktivni, prace_neschopnost_2024, mck_potencial_prevence
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co by se pro Janu změnilo",
    text: <>Terénní a odlehčovací služby se mají během deseti let posílit o <b>40–50 mld. Kč</b>. Částečné úvazky mají do roku 2040 vzrůst na <b>15 %</b>. Jana by mohla pečovat a zároveň zůstat v práci.</>,
    bobr: "Jedenáct opatření ve čtyřech liniích. Projdeme je po jedné.",
    scena: { typ: "predtim-potom", predtim: { hodnota: "7 %", popis: "částečné úvazky dnes" }, potom: { hodnota: "15 %", popis: "cíl do roku 2040" } }, // fakta: castecne_uvazky_sucasne, castecne_uvazky_cil_2040, terenni_financovani_navyseni
  },
];

const g = data.grafy;
const hlyRadek = g.mezinarodniSrovnaniZdravi.radky.find((r) => r.ukazatel.includes("HLY") && r.ukazatel.includes("muži"))!;
const hlyZeny = g.mezinarodniSrovnaniZdravi.radky.find((r) => r.ukazatel.includes("HLY") && r.ukazatel.includes("ženy"))!;
const financovani = g.strukturaFinancovani.radky.find((r) => r.ukazatel.includes("nemocniční"))!;
const rud = g.rozdeleniRUDPobytoveTerenni.polozky;
const nemocniceCR = data.fakta.find((f) => f.id === "nemocnice_podil_cr")!.hodnota as number;
const nemocniceEU = data.fakta.find((f) => f.id === "nemocnice_podil_eu")!.hodnota as number;
const rudNazev: Record<string, string> = { "Státní rozpočet (kraji přerozdělovaný)": "Stát", "Krajské rozpočty": "Kraje", "Obecní rozpočty": "Obce" };

export const zdravi: TopicConfig = {
  slug: "zdravi",
  cislo: 6,
  nazev: "Zdraví a soběstačnost",
  kratkyNazev: "Zdraví",
  kapitola: "1.4",
  pilir: "Lidský potenciál",
  popisMeta: "Špatné zdraví a předčasná úmrtí stojí Česko zhruba 700 miliard korun ročně. Co s tím navrhuje Hospodářská strategie PEER: prevence, péče na správném místě a podpora pečujících. S garantem kapitoly a grafy.",
  hook: {
    h1: "Kolik nás stojí, že jsme nemocní?",
    value: 700,
    unit: "miliard Kč ročně",
    label: "ztráta ekonomiky kvůli špatnému zdraví a předčasným úmrtím (~14 % HDP)",
    lede: "Muž v Česku prožije ve zdraví 61,2 roku. Ve Švédsku zhruba 71. Přitom 62 % ztracených zdravých let dopadá na lidi v produktivním věku.",
    source: "McKinsey Global Institute, studie s. 39–40.",
    bobr: "Sedm set miliard ročně. Tolik výkonu ekonomika nedostane, protože jsou lidé nemocní nebo umírají předčasně. Pojď se podívat, kde se ztrácí.",
  },
  srovnani: {
    nadpis: "Jak jsme na tom proti Evropě",
    grafy: [
      {
        typ: "bar",
        title: "Délka života ve zdraví, muži",
        unit: "let",
        max: 80,
        items: [
          { label: "Česko", value: hlyRadek.hodnoty[0] as number, highlight: true },
          { label: "Průměr EU", value: hlyRadek.hodnoty[1] as number },
          { label: "Švédsko", value: hlyRadek.hodnoty[2] as number, note: "orientační hodnota" },
        ],
        source: g.mezinarodniSrovnaniZdravi.zdroj,
      },
      {
        typ: "bar",
        title: "Kolik z rozpočtu zdravotnictví jde do nemocnic",
        unit: "%",
        max: 50,
        items: [
          { label: "Česko", value: nemocniceCR, highlight: true },
          { label: "Průměr EU", value: nemocniceEU },
        ],
        goal: { value: nemocniceEU, label: "Cíl strategie do roku 2035: 36,4 %" },
        source: "NERV 2024 (dle Eurostatu)",
      },
    ],
    poznamka: `U žen je to podobné: v Česku ${String(hlyZeny.hodnoty[0]).replace(".", ",")} roku ve zdraví, v EU ${String(hlyZeny.hodnoty[1]).replace(".", ",")}, ve Švédsku zhruba ${String(hlyZeny.hodnoty[2]).replace(".", ",")}. Hodnoty Švédska jsou orientační. Srovnání délky života ve zdraví je metodicky citlivé, vychází z šetření EU-SILC a z let 2020–2022. Podíl nemocniční péče: ${financovani.hodnoty[0]} v Česku, ${financovani.hodnoty[1]} v EU.`,
  },
  persona: { who: "Jana, 52", ctx: "účetní, pečuje o mámu s demencí, kvůli péči odešla z práce" },
  pribehNadpis: "Jana a péče, která se nedá zvládnout vedle práce",
  steps,
  proc: {
    uvod: "Strategie popisuje tři kroky, které se samy roztáčejí. Stárne populace, výdaje rostou a příjmy stojí na těch, kdo pracují. Vedle toho stojí několik dalších příčin, které to zhoršují.",
    retezec: data.priciny.filter((p) => p.typ === "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "donut",
        title: "Kde se ztrácejí zdravé roky života",
        parts: g.kdeSeZtraciZdraveRoky.polozky.map((p, i) => ({
          label: i === 0 ? "Lidé v produktivním věku" : "Ostatní věkové skupiny",
          value: p.hodnota,
          color: i === 0 ? ("sun" as const) : ("muted" as const),
        })),
        centerValue: "62 %",
        centerLabel: "ztracených let dopadá na produktivní věk",
        source: g.kdeSeZtraciZdraveRoky.zdroj,
      },
      {
        typ: "bar",
        title: "Kam jdou peníze na sociální služby z rozpočtového určení daní",
        unit: "%",
        max: 100,
        items: rud.flatMap((r) => [
          { label: `${rudNazev[r.uroven]}: pobytové ${r.pobytove} %`, value: r.pobytove },
          { label: `${rudNazev[r.uroven]}: terénní a ambulantní ${r.terenni} %`, value: r.terenni, highlight: true },
        ]),
        source: "Klusáček, J.: Král je nahý. Sociální služby v Česku, 24. 6. 2026",
      },
      {
        typ: "compare",
        title: "Kolik se vrátí z 1 Kč investované do zdraví",
        left: { label: "Podle McKinsey", value: "1,7 Kč", sub: "zpět na každou 1 Kč" },
        right: { label: "Podle Lancetu", value: "až 10 : 1", sub: "nejvyšší uváděný odhad" },
        source: "McKinsey Global Institute; Lancet (podle podkladu strategie)",
      },
    ],
    poznamka: "Většina ztráty není ve stáří, ale v produktivním věku. Na pobytové služby jde ze státního rozpočtu 67 % a z krajských 77 %, obce dávají na terénní a ambulantní služby 49 %. Údaj o poměru 10 : 1 uvádí podklad s odkazem na Lancet, který není mezi číslovanými zdroji kapitoly.",
  },
  opatreniUvod: "Jedenáct provázaných opatření ve čtyřech liniích: prevence, správná péče na správném místě, soběstačnost a podpora pečujících, zdroje a odpovědnost. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: [
    ...data.cile.slice(0, 4),
    {
      hodnota: 18,
      jednotka: "míst nejvýše v novém zařízení",
      cil: "Převést péči o osoby se zdravotním postižením z velkých zařízení (dnes asi 15 tisíc lidí) do menších komunitních služeb.",
    },
  ],
  stoji: {
    odstavce: [
      "Spotřební daň ze slazených nápojů a vyšší daň z alkoholu zaplatí spotřebitelé. Zdraží se slazené nápoje a část alkoholu, třeba tiché víno. Očekávaný výnos je 10–15 mld. Kč ročně a nejméně 40 % z něj jde do Fondu prevence.",
      "Terénní a odlehčovací služby budou podle odborných odhadů stát v příštích deseti letech 40–50 mld. Kč navíc.",
      "Přesun péče z lůžek znamená měnit regionální sítě nemocnic. To bude citlivé tam, kde nemocnice patří k místnímu životu. Proto strategie chce, aby domácí a terénní kapacity vznikaly ve stejné době, ne až po zavírání lůžek.",
      "Pojistné navázané na životní styl je kontroverzní. Strategie ho navrhuje jen pilotně a povinně jen pro ročníky do 40 let, odměňuje chování, ne zdravotní stav, a doprovází ho reforma DPFO.",
    ],
    bobr: "Čtyři věci stojí peníze nebo vyvolají spory. Říkám je rovnou.",
  },
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "JP",
  },
  plneZneniNadpis: "Plné znění kapitoly 1.4",
  plneZneni,
  zdroje,
  slovnik,
  dalsi: "Další témata",
};
