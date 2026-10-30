import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/vzdelanost.json";
import { plneZneni, zdroje, slovnik } from "@/content/vzdelanost-plne-zneni";
import { KalkulackaSkolka } from "@/components/KalkulackaSkolka";

/* „Co to znamená pro tebe“: lidský překlad každého z 21 opatření (rodič, žák, student VŠ, zaměstnanec).
   Čísla ze studie, formulace redakční. U opatření 9, 10, 18 a 21 měl podklad jen nadpis, text je odvozen z nadpisu a z čísel kapitoly. */
const proTebe: Record<number, string> = {
  // 1.2.1 Brzká péče
  1: "Jako rodič rozhoduješ ty. Dítě může do mateřské školy už ve 2 letech a péče o ně bude dostupná od 1 roku. Školky, kterým ubývá dětí, se nezavřou. Změní se na místa pro ty nejmenší.",
  2: "Místo pro aspoň čtvrtinu dětí do 3 let. Dnes chodí do péče jen 4 % z nich, takže většina rodin to dnes řeší sama.",
  // Nerovnosti
  3: "Stát si řekne, co chce od škol dosáhnout, a bude to měřit. Ty i škola uvidíte, jestli se věci zlepšují, nebo ne.",
  4: "Psycholog, speciální a sociální pedagog bude ve škole k dispozici každému dítěti, které ho potřebuje. Zavede se to postupně.",
  5: "Škola, kam chodí víc znevýhodněných dětí, dostane víc peněz. Na to, co tyhle děti opravdu potřebují.",
  6: "Co dítě umí, má záviset míň na tom, jací jsou jeho rodiče. Cíl: vliv zázemí pod 15 % (dnes 22 %) a předčasné odchody ze školy v zatížených regionech pod 5 %.",
  7: "Ve 3., 5., 7. a 9. třídě se otestuje každý žák. Přijímačky na střední školu se budou psát před podáním přihlášek a zúčastní se jich všichni. Žák pozná včas, kde stojí.",
  // Oborová soustava
  8: "Obory se mají točit kolem toho, co zaměstnavatelé skutečně potřebují. Absolvent se pak snáz přizpůsobí povolání, které dnes ještě neexistuje, a světu s umělou inteligencí.",
  9: "Z až 281 oborů se stane méně než 100. Žák si bude vybírat z širších oborů, ne z úzkých odnoží, které za pár let nikdo nepotřebuje.",
  10: "Když žák zjistí, že si vybral špatně, změní zaměření ještě během studia. Chybná volba v 15 letech přestane být rozsudek a stojí míň času.",
  11: "Vyučit se nebude slepá ulička. Z učňovského oboru půjde navázat na VOŠ, nástavbu, profesní obor VŠ nebo mikrocertifikační kurz.",
  12: "Uvidí se, o kolik se žáci ve škole opravdu posunuli, včetně měkkých dovedností. Slabá místa systému se najdou dřív a půjde do nich cíleně investovat.",
  // Vysoké školy
  13: "Jako student si na studium půjčíš a splácet začneš až po dosažení určitého příjmu. Vzorem je Švédsko. Je to ale půjčka, ne dar.",
  14: "Vysokoškoláků ve věku 25–34 let má být aspoň 45 % místo dnešních 34 %. Tím splníme cíl EU.",
  15: "Vedení vysokých škol dostane víc pravomocí i odpovědnosti. Stát zajistí peníze na víc studentů a konkurenceschopné platy vysokoškolských učitelů.",
  16: "Víc oborů s praxí: aspoň polovina bakalářů. Kdo chce rovnou do práce, najde na to vlastní cestu. Výzkumná větev jde do doktorského studia, internacionalizace a špičkové vědy.",
  17: "Do roku 2035 má být aspoň jedna česká univerzita v TOP 100 světových žebříčků. Dobrá univerzita udrží doma schopné lidi a přitáhne další.",
  // Celoživotní učení
  18: "Jako zaměstnanec se budeš moci snáz učit dál i po škole. Dnes vede k certifikátu jen 51,8 % neformálního vzdělávání, v Německu 77,1 %.",
  19: "Dílčí kvalifikaci doložíš mikrocertifikátem. Uznají ho zaměstnavatelé i vysoké školy, takže se kurz nebude ztrácet.",
  20: "Dostaneš vlastní vzdělávací účet. Přispívá na něj stát, zaměstnavatel i ty.",
  21: "Firma, která platí vzdělávání svých lidí, dostane daňovou úlevu. Zaměstnavatel tak má důvod do tebe investovat. Konkrétní podobu úlevy studie neuvádí.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Rodiče bez maturity",
    text: <>Rodinné zázemí rozhoduje o výsledcích žáků u nás víc než jinde: tvoří <b>22 %</b> rozdílů mezi nimi. Průměr OECD je <b>15 %</b>. Dítě rodičů bez maturity tak začíná se ztrátou.</>,
    bobr: "Kde se narodíš, nemá rozhodovat o tom, co umíš.",
    scena: { typ: "srovnani", jednotka: "%", popis: "Podíl zázemí na rozdílech ve výsledcích žáků", polozky: [{ nazev: "Česko", hodnota: 22, zvyrazni: true }, { nazev: "Průměr OECD", hodnota: 15 }] }, // fakta: socioekonomicky_status_cr, socioekonomicky_status_oecd
  },
  {
    mood: "thinking",
    title: "Jak to obvykle dopadá",
    text: <>Z dětí ze znevýhodněného prostředí nedosáhne základní úrovně v matematice <b>48,5 %</b>. Výborných výsledků navzdory zázemí dosáhne jen <b>7 %</b> žáků. To je druhý nejnižší podíl v OECD.</>,
    bobr: "Když musí být úspěšné dítě výjimkou, je chyba v systému.",
    scena: { typ: "cislo", hodnota: 48.5, desetinna: 1, jednotka: "%", popis: "znevýhodněných dětí neumí v matematice základy" }, // fakta: matematika_znevyhodneni
  },
  {
    mood: "surprised",
    title: "Moře oborů",
    text: <>Po deváté třídě se vybírá z až <b>281</b> oborů středních škol. Ve Švédsku jich mají <b>18</b>. Kdo vybere úzký obor špatně, mění studium a nastupuje do práce později.</>,
    bobr: "Dvě stě osmdesát jedna oborů a nikdo ti k nim nedá mapu.",
    scena: { typ: "srovnani", jednotka: "oborů", popis: "Počet oborů středních škol", polozky: [{ nazev: "Česko", hodnota: 281, zvyrazni: true }, { nazev: "Švédsko", hodnota: 18 }] }, // fakta: obory_cr, obory_svedsko
  },
  {
    mood: "neutral",
    title: "Kolik stojí maturita",
    text: <>Maturita zvedne celoživotní příjem o <b>17 mil. Kč</b> oproti základní škole. Dokončená střední škola přinese veřejným rozpočtům za život o <b>2,3–2,8 mil. Kč</b> víc. A vysokoškoláci mají až <b>10×</b> nižší nezaměstnanost než lidé jen se základním vzděláním.</>,
    bobr: "Vyplatí se to člověku i státu.",
    scena: { typ: "cislo", predpona: "+", hodnota: 17, jednotka: "mil. Kč", popis: "celoživotní příjem s maturitou oproti základní škole" }, // fakta: prijem_s_maturitou_castka
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se změní",
    text: <>Péče o děti už od 1 roku, aby děti nezačínaly s handicapem. Škola s víc znevýhodněnými dětmi dostane víc peněz a psychologa. Žáci se v 3., 5., 7. a 9. třídě změří. Oborů bude méně než <b>100</b>. Cíl: vliv zázemí pod <b>15 %</b>.</>,
    bobr: "Jedenadvacet opatření v pěti oblastech. Projdu je s tebou.",
    scena: { typ: "predtim-potom", predtim: { hodnota: "22 %", popis: "vliv zázemí na výsledky žáků dnes" }, potom: { hodnota: "pod 15 %", popis: "cíl strategie, průměr OECD" } }, // fakta: socioekonomicky_status_cr, cil_vliv_zazemi_pisa
  },
];

const g = data.grafy.ucastDeti;

export const vzdelanost: TopicConfig = {
  slug: "vzdelanost",
  cislo: 2,
  nazev: "Vzdělanost jako základ ekonomické prosperity",
  kratkyNazev: "Vzdělanost",
  kapitola: "1.2",
  pilir: "Lidský potenciál",
  popisMeta: "Do jeslí a školek chodí jen 4 % dětí do 3 let, průměr OECD je 24 %. Co s tím navrhuje Hospodářská strategie PEER. S garantem kapitoly, grafy a kalkulačkou školky.",
  hook: {
    h1: "Proč se nám nevyplácí šetřit na školkách?",
    value: data.hook.hodnota,
    unit: "% dětí do 3 let",
    label: "chodí do jeslí, školky nebo dětské skupiny",
    lede: "Průměr OECD je 24 %. Cíl EU je 45 % do roku 2030. Každá koruna investovaná do včasné péče se státu vrátí 3–4×.",
    source: "OECD Education at a Glance 2024, studie s. 15–16.",
    bobr: "Čtyři ze sta. Ostatní rodiny to řeší samy. Pojď, ukážu ti, proč to tolik stojí všechny.",
  },
  srovnani: {
    nadpis: "Jak jsme na tom v péči o nejmenší",
    grafy: [
      {
        typ: "bar",
        title: "Děti do 3 let v péči a vzdělávání, v %",
        unit: "%",
        items: [
          { label: "Česko", value: g.polozky[0].hodnota, highlight: true },
          { label: "Národní cíl", value: g.cil },
          { label: "Průměr OECD", value: g.polozky[1].hodnota },
          { label: "Cíl EU 2030", value: g.cilEU },
        ],
        goal: { value: 25, label: "cíl strategie 25 %" },
        source: "OECD (2024), Education at a Glance 2024",
      },
      {
        typ: "bignumber",
        value: 20,
        unit: "%",
        label: "patnáctiletých neumí funkčně číst. Podíl se v posledních letech nezmenšuje.",
        source: "Česká školní inspekce, Národní zpráva PISA 2022",
      },
    ],
  },
  pribehNadpis: "Start, který si dítě nevybere",
  steps,
  proc: {
    uvod: "Studie popisuje čtyři kroky, ve kterých se nerovnosti a slabá místa systému navzájem posilují. Pod nimi jsou další příčiny.",
    retezec: [1, 3, 4, 5].map((n) => data.priciny.find((p) => p.poradi === n)!).map((p) => ({ nazev: p.pricina, popis: p.popis })),
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla o penězích do vzdělání",
    grafy: [
      {
        typ: "bar",
        title: "Výdaje na vzdělávání, % HDP",
        unit: "% HDP",
        items: [
          { label: "Česko", value: 4.1, highlight: true },
          { label: "Průměr OECD", value: 4.7 },
        ],
        source: "ČSÚ 2024, OECD Education at a Glance 2025",
      },
      {
        typ: "compare",
        title: "Výdaje na vědu a výzkum, % HDP",
        left: { label: "Průměr EU", value: "2,24 %", sub: "cíl EU: 3,0 %" },
        right: { label: "Česko", value: "1,82 %" },
        diff: "Cíl EU je 3,0 % HDP",
        source: "Eurostat 2024",
      },
      {
        typ: "compare",
        title: "Plat učitele proti průměrné mzdě",
        left: { label: "Zákon požaduje aspoň", value: "130 %" },
        right: { label: "Skutečnost", value: "108 %" },
        diff: "O 22 procentních bodů méně, než počítá zákon",
        source: "Münich, Smolka (IDEA při CERGE-EI), 2026",
      },
    ],
    poznamka: "Koruna do výzkumu a vývoje se podle konzervativních odhadů vrací 3–4×, podle optimističtějších více než 20×.",
  },
  opatreniUvod: "Jedenadvacet opatření v pěti oblastech: brzká péče, nerovnosti, oborová soustava, vysoké školy a celoživotní učení. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({
    cislo: o.cislo,
    nazev: o.nazev,
    popis: o.popis || "Studie uvádí jen název opatření.",
    klicoveCislo: o.klicoveCislo,
    proTebe: proTebe[o.cislo] ?? "",
  })),
  cile: data.cile.map((c) => ({ cil: c.cil, hodnota: c.hodnota ?? "neuvedeno", jednotka: c.jednotka })),
  stoji: {
    odstavce: [
      "Školky a vyšší platy učitelů stojí peníze hned. Kapacity pro nejmenší děti, psychologové ve školách, indexové financování i konkurenceschopné platy učitelů a vysokoškolských pedagogů se platí z rozpočtu už v prvních letech.",
      "Výnosy přijdou za dlouho. Studie čeká vyšší roční HDP o 50 až 100 mld. Kč (řádově 1 %) až po 15 až 20 letech. Krátkodobě počítá s tím, že se úlevy a příspěvky zhruba vyrovnají úsporami na dávkách a vyššími daněmi.",
      "Vratné granty znamenají dluh pro studenty. Splácet se začne až po dosažení určité úrovně příjmů a vzorem je Švédsko, ale pořád je to půjčka.",
      "Plošné testování žáků a přijímačky pro všechny vyvolají odpor. Studie je navrhuje, protože bez měření nevíme, kde jsou slabá místa systému.",
    ],
    bobr: "Vzdělání se vyplácí, ale pomalu. První roky uvidíš jen výdaje.",
  },
  kalkulacky: [KalkulackaSkolka],
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "JK",
  },
  plneZneniNadpis: "Plné znění kapitoly 1.2",
  plneZneni,
  zdroje,
  slovnik,
};
