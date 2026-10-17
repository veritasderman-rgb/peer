import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/stat.json";
import { plneZneni, zdroje, slovnik } from "@/content/stat-plne-zneni";

/* „Co to znamená pro tebe“: lidský překlad každého z pěti opatření. Čísla ze studie, formulace redakční. */
const proTebe: Record<number, string> = {
  1: "Finanční agendu, sociální zabezpečení i zdravotní pojišťovnu vyřídíš na jednom místě. Stát dokončí cca 1 400 služeb, u kterých to dává smysl. Okrajové a málo využívané služby digitalizovat nebude.",
  2: "Tvoje daně nemají končit u jednoho dodavatele. 53 % informačních systémů státu vzniklo bez veřejné soutěže a jejich provoz stojí 8,5 mld. Kč ročně. Stát chce omezit závislost, ze které se dnes nedá odejít.",
  3: "Výzkumníci, firmy i startupy dostanou k dispozici anonymizovaná data. Půjde o databáze správy sociálního zabezpečení, Finanční správy, ministerstva školství i zdravotnická data. Data konkrétních lidí se neuvolňují.",
  4: "Nové technologie, třeba autonomní doprava, kyberbezpečnost, e-health nebo AI, se budou zkoušet v omezeném, ale reálném prostředí. Zapojí se úřady, univerzity i firmy.",
  5: "Velké veřejné investice projdou přísnou revizí, jestli za své peníze přinesou výsledky. Na Slovensku se to dělá od 40 mil. EUR. Útvar chceme ukotvit v zákoně a posílit. Dánsko to dělá nepřetržitě přes 40 let.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Tři úřady, tři agendy",
    text: <>Honza je živnostník, je mu 34. Každý měsíc řeší finanční úřad, ČSSZ a zdravotní pojišťovnu <b>zvlášť</b>. Každá instituce chce svoje a jinde. Někdy mu nezbyde než jít osobně a stát frontu na úřadě.</>,
    bobr: "Třikrát totéž, třikrát jinde.",
  },
  {
    mood: "thinking",
    title: "Většina služeb není online",
    text: <>Stát poskytuje téměř <b>9 000 služeb</b>. Digitálních je jen <b>18 %</b>, asi <b>30 %</b> je hybridních a víc než polovina zůstává jen na papíře. Zákon o právu na digitální službu platí, jeho naplňování pokulhává.</>,
    bobr: "Zákon je. Úřady za ním zatím pomalu běží.",
  },
  {
    mood: "surprised",
    title: "Proč to stojí tolik",
    text: <>Státní informační systémy jsou staré, některé z 90. let. Provoz stojí <b>8,5 mld. Kč ročně</b> a <b>53 %</b> systémů vzniklo bez veřejné soutěže. Nástroje pro SZIF stály <b>2,1 mld. Kč</b> za 4 roky. V komerční sféře by vyšly na <b>100–120 mil. Kč</b>.</>,
    bobr: "Až dvacetkrát dráž. A platíme to z daní.",
  },
  {
    mood: "neutral",
    title: "Dodavatel drží klíče",
    text: <>Tomu se říká vendor lock-in. Stát je závislý na jednom dodavateli, kterému platí vysoké pravidelné poplatky za údržbu a úpravy. Přejít jinam prakticky nejde. Každá změna je proto drahá a pomalá.</>,
    bobr: "Komu patří klíče, ten určuje cenu.",
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Honzu změní",
    text: <>Stát dokončí cca <b>1 400 služeb</b>, u kterých digitalizace dává smysl. Jednotné inkasní místo spojí finanční úřad, sociální zabezpečení a zdravotní pojišťovnu do <b>jednoho bodu</b>. Honza vyřídí měsíční agendu na jednom místě.</>,
    bobr: "Pět opatření. Ukážu ti je jedno po druhém.",
  },
];

const g = data.grafy;

/* Texty cílů jsou z dat. Jednotky ve studii chybí, proto krátké redakční štítky. */
const cileStitky: { hodnota: number | string; jednotka: string }[] = [
  { hodnota: 1400, jednotka: "služeb v plánu" },
  { hodnota: "1", jednotka: "místo pro finanční agendy" },
  { hodnota: "Méně", jednotka: "závislosti na dodavatelích" },
  { hodnota: "Data", jednotka: "a hodnota za peníze" },
];

export const stat: TopicConfig = {
  slug: "stat",
  cislo: 14,
  nazev: "Stát jako lídr",
  kratkyNazev: "Stát jako lídr",
  kapitola: "4.2",
  pilir: "Stát jako motor",
  popisMeta: "Z téměř 9 000 služeb státu je digitálních jen 18 %. Proč to tak je a co s tím navrhuje Hospodářská strategie PEER. S garantem kapitoly a grafy.",
  hook: {
    h1: "Kolik státních služeb vyřídíš online?",
    value: 18,
    unit: "% služeb státu",
    label: "Z téměř 9 000 služeb je plně digitálních",
    lede: "Asi 30 % je hybridních, víc než polovina zůstává na papíře. Softwarové nástroje pro SZIF stály až 20× víc, než by stály v komerční sféře.",
    source: "NKÚ, Digitalizace veřejné správy 2026, studie s. 81–82.",
    bobr: "Osmnáct procent. Zbytek se pořád řeší na papíře nebo jen napůl. Pojď se podívat proč.",
  },
  srovnani: {
    nadpis: "Jak jsme na tom proti Evropě a proti sobě",
    grafy: [
      {
        typ: "compare",
        title: "Kde je Česko v EU (DESI)",
        left: { label: "Digitalizace státu", value: "13.–14. z 27" },
        right: { label: "Digitální dovednosti lidí", value: "5. místo" },
        diff: "Dovednosti lidí jsou před digitálním státem",
        source: "Evropská komise, 2025. DESI.",
      },
      {
        typ: "bignumber",
        value: g.nakladyIS.hodnota,
        decimals: 1,
        unit: g.nakladyIS.jednotka,
        label: "Roční náklady na provoz informačních systémů státu",
        source: "Datlab Institut, 2022.",
      },
    ],
  },
  persona: { who: "Honza, 34", ctx: "živnostník, finančák, ČSSZ a zdravotní pojišťovnu řeší zvlášť" },
  pribehNadpis: "Honza a tři úřady, každý zvlášť",
  steps,
  proc: {
    uvod: "Studie popisuje řetězec tří kroků. Stát digitalizuje málo, staré systémy jsou drahé a dodavatele nejde vyměnit.",
    retezec: data.priciny.filter((p) => p.typ === "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Tři čísla, která to vysvětlují",
    grafy: [
      {
        typ: "donut",
        title: g.digitalizaceSluzeb.titulek,
        parts: [
          { label: "Digitální", value: 18, color: "sun" },
          { label: "Hybridní", value: 30, color: "river" },
          { label: "Papírové", value: 52, color: "muted" },
        ],
        centerValue: "~9 000",
        centerLabel: "služeb státu",
        source: "NKÚ, 2026. Papírových 52 % je dopočet (100 − 18 − 30), studie píše „více než polovina“.",
      },
      {
        typ: "compare",
        title: g.szif.titulek,
        left: { label: "SZIF, za 4 roky", value: "2,1 mld. Kč" },
        right: { label: "Odhad v komerční sféře", value: "100–120 mil. Kč" },
        diff: "až 20× méně",
        source: "NKÚ, 2026.",
      },
      {
        typ: "bignumber",
        value: 53,
        unit: "% systémů bez soutěže",
        label: "Informační systémy státu vytvořené bez veřejné soutěže",
        source: "Datlab Institut, 2022.",
      },
    ],
  },
  opatreniUvod: "Pět opatření. U každého je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: data.cile.map((c, i) => ({ hodnota: cileStitky[i].hodnota, jednotka: cileStitky[i].jednotka, cil: c.cil })),
  stoji: {
    odstavce: [
      "Digitalizace stojí peníze a čas. Dokončit cca 1 400 služeb nejde přes noc a kapitola náklady nevyčísluje. Vendor lock-in se také neprolomí hned: staré systémy, některé z 90. let, a závislost na dodavateli se nevymění ze dne na den. Posílení analytického útvaru Hodnota za peníze navíc vyžaduje víc pravomocí a lidí.",
      "Otevřená data vyžadují anonymizaci. Uvolňují se jen data pro statistické a analytické účely, ne data identifikovatelných osob, a jejich příprava je práce. Dnes například zdravotnická data drží Ústav zdravotnických informací a statistiky pod zámkem.",
    ],
    bobr: "Rychlé to nebude. Říkám to rovnou.",
  },
  garant: {
    jmeno: data.garant.jmeno,
    role: data.garant.role,
    initials: "JH",
    citace: "Neobjevujeme kolo. Vycházíme z ekonomického výzkumu, zkušeností úspěšných zemí i práce předních think-tanků. Přidanou hodnotou PEER je, že jsme tyto poznatky spojili do jednoho komplexního plánu a u jednotlivých opatření se díváme také na jejich měřitelný dopad.",
    citaceZdroj: {
      text: "představení PEER, pirati.cz, 2. 9. 2026",
      url: "https://www.pirati.cz/jak-pirati-pracuji/pirati-predstavuji-novou-expertni-ekonomickou-radu-peer-prichazi-s-hospodarskou-strategii-a-s-planem-jak-z-ceska-udelat-v-ekonomice-evropskeho-tygra/",
    },
  },
  plneZneniNadpis: "Plné znění kapitoly 4.2",
  plneZneni,
  zdroje,
  slovnik,
};
