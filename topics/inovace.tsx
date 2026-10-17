import type { TopicConfig, StoryStep } from "@/lib/topics";
import data from "@/data/inovace.json";
import { plneZneni, zdroje, slovnik } from "@/content/inovace-plne-zneni";

/* „Co to znamená pro tebe“: lidský překlad každého ze sedmi opatření (rolí státu).
   Čísla a návrhy jsou ze studie, formulace redakční. Příklady o Tomášovi jsou ilustrace, ne údaje ze studie. */
const proTebe: Record<number, string> = {
  1: "Dítě se ve škole učí tvořit, zkoušet a nebát se chyb, s důrazem na STEM či STEAM. Mladí vědci a doktorandi dostanou podporu, když chtějí z výzkumu založit firmu.",
  2: "Tomáš by předem zjistil, jestli úřad odpočet nákladů na vývoj akceptuje. Nemusel by se bát zpětného doměření s pokutou. Na start by mohly přispět fondy s vysokou účastí státu, zbytek doplní soukromí investoři.",
  3: "Tomáš by mohl první lidi v týmu motivovat podílem ve firmě přes plnohodnotný ESOP. V prvních letech by měl menší papírování a zisk, který vloží do růstu, by se nedanil. Když firma zkrachuje, program druhé šance neúspěch rychle smaže.",
  4: "Výzkum z univerzit se dostane do praxe přes nezávislé instituce, které mají jediný cíl: technologický transfer. Inkubátor podle Jihomoravského JIC vznikne i v Praze, Ostravě, Plzni, Liberci a Olomouci.",
  5: "Stát se stane zákazníkem inovativních firem. Nové řešení půjde ve veřejné sféře vyzkoušet lokálně v sandboxu, bez změny zákona. Zákon se upraví až po ověření.",
  6: "Každé dítě projde talentovým zkoumáním už v předškolním nebo raném školním věku. Mimořádný talent se rozvíjí individuálně, i mimo běžný školní systém. Zahraniční expert dostane trvalé nebo dlouhodobé právo pobytu a standardní pojištění.",
  7: "Neúspěch přestane být cejch na roky. Počítá se s ním jako s běžnou součástí cesty. A podnikavost se učí už od dětství.",
};

const steps: StoryStep[] = [
  {
    mood: "neutral",
    title: "Nápad v šuplíku",
    text: <>Tomáš je vývojář v Brně. Je mu 29 a má nápad na AI pro průmysl. Chtěl by založit vlastní firmu. Pořád ale váhá: bojí se, že mu to nevyjde, a nemá kapitál.</>,
    bobr: "Strach z neúspěchu je první brzda. A velmi česká.",
  },
  {
    mood: "thinking",
    title: "Proč je firem málo",
    text: <>Česká výroba dělá hlavně na zakázku pro zahraniční firmy. Tlak na cenu roste. V tržní sofistikovanosti jsme na <b>73. místě</b> na světě. Víme a umíme, ale neumíme to prodat.</>,
    bobr: "Technologie umíme. Prodávat je nás nikdo neučil.",
  },
  {
    mood: "surprised",
    title: "Startupů je málo",
    text: <>V Česku je <b>131 startupů</b> na milion obyvatel. Izrael jich má <b>410</b>, Rakousko dvakrát tolik a předběhlo nás i Maďarsko. Talent se rodí všude. Jen ho neumíme vyzdvihnout.</>,
    bobr: "Tomáš není výjimka. Takových je u nás spousta.",
  },
  {
    mood: "neutral",
    title: "Co Tomášovi dnes brání",
    text: <>Odpočet nákladů na vývoj je nejasný a firmy se bojí zpětného doměření s pokutou. Dotace jsou roztříštěné. ESOP je schválený, ale slabý a komplikovaný. A krach znamená stigma na roky.</>,
    bobr: "Každá z těch překážek se dá odstranit.",
  },
  {
    mood: "happy",
    pointing: true,
    title: "Co se pro Tomáše změní",
    text: <>Startupy podpoří fondy s vysokou účastí státu podle izraelské Yozmy z roku <b>1993</b>. Přijde plnohodnotný ESOP a programy druhé šance. Inkubátor jako Jihomoravský JIC vznikne v dalších městech.</>,
    bobr: "Sedm rolí státu. Ukážu ti je jednu po druhé.",
  },
];

const g = data.grafy;

export const inovace: TopicConfig = {
  slug: "inovace",
  cislo: 12,
  nazev: "Inovace jako motor silné ekonomiky",
  kratkyNazev: "Inovace",
  kapitola: "3.3",
  pilir: "Moderní energetika a průmysl",
  popisMeta: "V Česku je 131 startupů na milion obyvatel, v Izraeli 410. Proč u nás vzniká tak málo firem a co navrhuje Hospodářská strategie PEER. S garantem kapitoly, grafy a příběhem.",
  hook: {
    h1: "Proč u nás vzniká tak málo firem?",
    value: data.hook.hodnota,
    unit: data.hook.jednotka,
    label: "Česko",
    lede: "Izrael jich má 410. Rakousko dvakrát tolik než my. Předběhlo nás i Maďarsko.",
    source: "Text kapitoly 3.3, studie s. 73. Původní zdroj údajů studie neuvádí.",
    bobr: "Jen 131 startupů na milion lidí. To je málo. Pojď, ukážu ti, kde se ztrácí talent.",
  },
  srovnani: {
    nadpis: "Jak jsme na tom ve světě",
    grafy: [
      {
        typ: "bar",
        title: g.startupyNaMilion.titulek,
        unit: "startupů",
        items: [
          { label: "Izrael", value: 410, note: "vzor ve světě startupů" },
          { label: "Rakousko", value: 262, note: "dopočet: dvojnásobek české hodnoty" },
          { label: "Česko", value: 131, highlight: true },
        ],
        source: "Studie s. 73 uvádí jen „Rakousko má dvojnásobek“. Hodnota 262 je dopočet (2 × 131), ne údaj ze studie. Zdroj čísel studie neuvádí.",
      },
      {
        typ: "bar",
        title: "Pořadí Česka v mezinárodním indexu inovací (nižší číslo je lepší)",
        unit: "místo",
        max: 139,
        items: [
          { label: "Technologické schopnosti", value: 20 },
          { label: "Výsledné výstupy", value: 43 },
          { label: "Tržní sofistikovanost", value: 73, note: "nejhorší z uvedených", highlight: true },
          { label: "Celkem, ze 139 ekonomik", value: 32, note: "kategorie Průměrný inovátor" },
        ],
        source: g.pozicIndexu.zdroj,
      },
    ],
  },
  persona: { who: "Tomáš, 29", ctx: "vývojář, Brno, chce založit firmu na průmyslovou AI" },
  pribehNadpis: "Tomáš a firma, která zatím existuje jen v hlavě",
  steps,
  proc: {
    uvod: "Čtyři kroky vysvětlují, proč zůstáváme subdodavateli. K nim přibývá šest dalších brzd, které drží talent doma v šuplíku.",
    retezec: data.priciny.filter((p) => p.typ === "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
    dalsi: data.priciny.filter((p) => p.typ !== "řetězec").map((p) => ({ nazev: p.pricina, popis: p.popis })),
  },
  cisla: {
    nadpis: "Dvě čísla, která to vysvětlují",
    grafy: [
      {
        typ: "bignumber",
        value: 19,
        unit: "místo z 27 zemí EU",
        label: "Česko v analýze EU, hluboko pod průměrem",
        source: g.pozicEU.zdroj,
      },
      {
        typ: "compare",
        title: "Dividendy ročně",
        left: { label: "Zahraniční firmy v Česku posílají do svých zemí", value: "několik set mld. Kč" },
        right: { label: "České firmy v zahraničí posílají sem", value: "jednotky mld. Kč" },
        diff: "Odtok je mnohonásobně větší než přítok",
        source: "Text kapitoly 3.3 uvádí řádové odhady, přesná čísla ne. Zdroj studie neuvádí.",
      },
    ],
  },
  opatreniUvod: "Sedm rolí státu. Stát musí být aktivní ve všech a na přiměřeně dobré úrovni. U každé role je nejdřív to, co znamená pro tebe, a pod tím přesné znění návrhu ze studie.",
  opatreni: data.opatreni.map((o) => ({ ...o, proTebe: proTebe[o.cislo] ?? "" })),
  cile: [
    {
      hodnota: "silný inovátor",
      jednotka: "kategorie v mezinárodním indexu inovací",
      cil: "Dnes jsme na 32. místě ze 139 mezi průměrnými inovátory. Cíl strategie je patřit mezi silné inovátory (Strong innovator).",
    },
    {
      hodnota: "stejný přítok",
      jednotka: "dividend jako dnešní odtok",
      cil: "Časem obrátit dividendové saldo. Proti odtoku několika set miliard Kč ročně postavit stejně silný přítok od českých firem, které expandují do světa.",
    },
    {
      hodnota: "5 měst",
      jednotka: "s podnikatelským inkubátorem",
      cil: "Vybudovat inkubátory podle Jihomoravského JIC v Praze, Ostravě, Plzni, Liberci a Olomouci.",
    },
  ],
  stoji: {
    odstavce: [
      "Státní startupový fond znamená riziko ztrát z veřejných peněz. Studie počítá s tím, že fondy budou ziskové, protože podíly ve firmách prodají. Zároveň ale píše, že je u startupů naprosto běžné, že záměr nevyjde a firma zkrachuje.",
      "Daňové prázdniny a nedanění zisku v prvních letech startupu odkládají příjmy státu. Studie je označuje za dlouhodobě rozpočtově neutrální, protože stát své peníze dostane o několik let později. Do té doby ale chybí v rozpočtu.",
      "Lákání zahraničních talentů je citlivé téma. Studie navrhuje trvalé nebo dlouhodobé právo pobytu a jednodušší integraci pro poměrně malé počty lidí. Někdo to uvítá, jiný se bude ptát, proč zrovna jim. Částky za jednotlivá opatření studie v této kapitole nevyčísluje.",
    ],
    bobr: "Peníze ze státního fondu se mohou i ztratit. Tohle ti nezatajím.",
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
  plneZneniNadpis: "Plné znění kapitoly 3.3",
  plneZneni,
  zdroje,
  slovnik,
};
