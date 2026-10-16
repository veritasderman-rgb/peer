export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Polsko, Litva a Slovinsko předběhly Česko v průměrné mzdě. Není to proto, že by čeští muži brali méně než jejich protějšky za hranicemi. Jsou to české ženy, které vydělávají výrazně méně než Polky nebo Litevky. Mzdová mezera mezi muži a ženami dosahuje v Česku 18 %, což je druhé nejvyšší číslo v EU.[9] Nevyužitý potenciál žen je přímou brzdou české ekonomiky.",
  },
  {
    typ: "p",
    text: "Nejde primárně o přímou diskriminaci. Problém je strukturální: mateřství, rodičovství a neformální péče ženy ekonomicky trvale znevýhodňují. Žena, která si pořídí dítě, vydělává v průběhu následujících dvaceti let průměrně o 10 % méně než bezdětná kolegyně. Největší ztrátu nesou vysokoškolačky, tedy ženy s největším potenciálem. Po návratu z rodičovské dovolené, která je v ČR jedna z nejdelších v Evropě, se ženy typicky vrací na horší pozice a s nižším platem. Následně jsou to potom opět ženy, které opouštějí zaměstnání, aby mohly pečovat o zdravotně postiženého člena domácnosti nebo seniora.",
  },
  {
    typ: "p",
    text: "Problém se prohlubuje ve veřejném sektoru: platy žen ve veřejném sektoru jsou o 17 % nižší než platy mužů. To je největší rozdíl v celé EU. Naopak v Polsku berou ženy ve veřejném sektoru o 1 % více než muži.",
  },
  {
    typ: "h3",
    text: "Nedostatek péče o nejmenší",
  },
  {
    typ: "p",
    text: "Česko potřebuje podle IDEA CERGE-EI 30–40 tisíc nových míst v zařízeních předškolní péče, aby dosáhlo průměrného evropského standardu. Nabídku předškolního vzdělávání v mateřských školách doplňují dětské skupiny zajišťující péči zejména pro děti mladší 3 let. Dnes často ve velkých městech suplují chybějící kapacity MŠ. Dětské skupiny jsou financované zhruba napůl státem a rodiči. Stát zavedl také levnější alternativu, tzv. sousedské dětské skupiny, ale Ministerstvo financí jim zkrátilo financování na polovinu oproti klasickým dětským skupinám. Systém tak diskriminuje nejflexibilnější a nejdostupnější formu péče.",
  },
  {
    typ: "p",
    text: "Výsledkem je, že tam, kde místa jsou, jsou příliš drahá – veřejně podporovaná dětská skupina může rodičům účtovat až třetinu minimální mzdy. Pro mnoho rodin se taková služba jednoduše nevyplatí. Vzhledem k demografickému vývoji se nyní otvírá okno příležitosti, kdy bude možné využít současných kapacit pro uspokojení zatím nepokryté poptávky. Je potřeba uzpůsobit provoz a podmínky v mateřských školách pro mladší děti a zabránit zavírání tříd či celých mateřských škol. Zejména v Praze ale nadále bude přetrvávat mnohem větší poptávka vyžadující dodatečné kapacity.",
  },
  {
    typ: "p",
    text: "Kolik přinese jedno dodatečné obsazené místo v mateřské škole? Studie IDEA CERGE-EI jako první v ČR vyčíslila celkový fiskální přínos: jedno dodatečně obsazené místo ve školce vytvoří v průměru 0,54 nového pracovního místa, nejčastěji návratem matky na trh práce. Investice do předškolního vzdělávání má 1,8× vyšší návratnost než investice do základního, středního nebo vysokého školství.",
  },
  {
    typ: "p",
    text: "Podle výzkumníků z IDEA CERGE-EI přinese jedno pracovní místo 46 000 až 64 000 korun (vypočteno podle dat z roku 2023). Když číslo přepočítáme na současnou mzdovou hladinu a připočítáme dopady na zaměstnavatele a spotřebu domácností, činí přínos jednoho nového místa ve školce pro veřejné rozpočty více než 100 tisíc korun ročně, a to i v případě, že by byla ziskovost pro zaměstnavatele z těchto úvazků hluboko pod průměrem.",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Zajistíme dostupnou péči o děti od jednoho roku věku",
        text: "Upravíme nevyužité třídy v mateřských školách pro potřeby menších dětí, podpoříme vznik flexibilních dětských skupin a firemních školek a srovnáme financování sousedských dětských skupin s klasickými mateřskými školami.",
      },
      {
        nazev: "Zavedeme cenový strop pro veřejně podporovaná zařízení předškolní péče",
        text: "Maximální platbu zastropujeme na cca 3 750 Kč (1/6 minimální mzdy) měsíčně namísto současných až 7 466 Kč (⅓ minimální mzdy).",
      },
      {
        nazev: "Snížíme platový rozdíl mezi muži a ženami uvnitř veřejného sektoru",
        text: "Stát musí jít příkladem, a proto do roku 2035 snížíme rozdíl mezi platy mužů a žen ve veřejném sektoru na polovinu.",
      },
      {
        nazev: "Snížíme daňové zatížení malých úvazků",
        text: "Rozhodující je, aby se práce na částečný úvazek skutečně vyplatila.",
      },
    ],
  },
  {
    typ: "h3",
    text: "Cíle",
  },
  {
    typ: "ul",
    polozky: [
      "Zaměstnanost žen s dětmi do 6 let na 70 % (z 55 %).",
      "Mzdový rozdíl snížíme na méně než 12 % (z 18,5 %). Každé 1 % snížení mzdové mezery v soukromém sektoru přidá do veřejných rozpočtů 4,9 miliardy Kč ročně.",
    ],
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "Eurostat: Minimum wages – bi-annual data, 2026. ec.europa.eu/eurostat; směnný kurz 24,24 CZK/EUR." },
  { index: 2, citace: "Prokop, D. (PAQ Research): rozhovor iROZHLAS, 2024; Bodnár et al. (2018), Firms' Adjustment to Minimum Wages in CEE, IZA Journal of Labor Policy." },
  { index: 3, citace: "Kreiner, C. T. & Svarer, M. (2022): Danish Flexicurity: Rights and Duties, Journal of Economic Perspectives, 36(4), 81–104. doi.org/10.1257/jep.36.4.81" },
  { index: 4, citace: "MPSV: Analýza rekvalifikací: kde jsme a co dál?, prosinec 2024. Výpočet autora: 382 mil. Kč / 16 500 osob ≈ 23 152 Kč/os. Srovnání s OECD: OECD Employment Outlook 2023; TUAC Policy Brief, listopad 2025." },
  { index: 5, citace: "European Commission: Education and Training Monitor 2025 – Czechia; Eurostat Adult Education Survey (AES) 2022." },
  { index: 6, citace: "Index prosperity Česka; MŠMT, NPI ČR: analýzy bariér celoživotního vzdělávání, 2023–2024." },
  { index: 7, citace: "World Economic Forum: Future of Jobs Report, 2023." },
  { index: 8, citace: "Úřad práce ČR / Seznam Zprávy / MPSV: data o rekvalifikacích 2023–2026. Pokles v roce 2026 v důsledku ukončení financování z Národního plánu obnovy (NPO/ESF+). Bez čísla v podkladu, připojeno k č. 8: Prokop, D.: rozhovory iROZHLAS a Seznam Podcasty, 2024; OECD: Economic Surveys Czechia 2025 (URL v podkladu useknuto); Eurostat (2025): Childcare statistics – children under 3 in formal care. op.europa.eu; cíl EU (Barcelona 2.0): 45 % do roku 2030." },
  { index: 9, citace: "Euronews (2026): Cost of pay gap in the EU – women earn €3,900 less than men a year. euronews.com" },
  { index: 10, citace: "Institut předlužení – data a studie: exekuce; pokles vymáhané částky z 545 na 542 mld. Kč za pololetí 2025." },
  { index: 11, citace: "Unie zaměstnavatelských svazů (2020), cit. dle Charita ČR; SP ČR – mzdová účetní ve firmě s ~1 000 zaměstnanci věnuje >25 % pracovního času správě exekucí." },
  { index: 12, citace: "ExekuceInfo.cz – výpočet exekuce; Exekutorská komora ČR – statistiky." },
  { index: 13, citace: "NERV: Návrhy na reformu exekučního systému; Josef Středula (ČMKOS) – dlužníci vytlačováni mimo legální trh práce." },
  { index: 14, citace: "PAQ Research: studie dopadu exekucí na nízkopříjmové domácnosti a samoživitele." },
  { index: 15, citace: "Psychologický ústav AV ČR: výzkum dopadů exekucí na děti v zadlužených rodinách." },
  { index: 16, citace: "Karel Čada (sociolog): mezigenerační přenos chudoby, cit. dle Aktualne.cz." },
  { index: 17, citace: "PAQ Research / IDEA: analýza fiskálních nákladů předčasného odchodu ze vzdělávání, cit. dle HN (2021)." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "Mzdová mezera", vysvetleni: "Rozdíl mezi průměrnými výdělky žen a mužů, vyjádřený v procentech z výdělku mužů. Mzdová mezera neznamená, že by žena dostávala méně za stejnou práci." },
  { pojem: "Dětská skupina", vysvetleni: "Zařízení péče o malé děti, zpravidla do 3 let, které doplňuje nabídku mateřských škol. Financuje se zhruba napůl státem a napůl rodiči." },
  { pojem: "Sousedská dětská skupina", vysvetleni: "Levnější varianta dětské skupiny, kterou stát zavedl jako alternativu. Dostává polovinu financování klasické dětské skupiny." },
  { pojem: "Předškolní péče", vysvetleni: "Péče o děti před vstupem do základní školy, nejčastěji v mateřských školách, a doplňkově v dětských skupinách." },
  { pojem: "Rodičovská dovolená", vysvetleni: "Dlouhé volno z práce po narození dítěte, které jeden z rodičů tráví péčí o dítě. Po jeho skončení se má rodič vrátit na své místo nebo na místo odpovídající předchozímu." },
  { pojem: "Neformální péče", vysvetleni: "Péče o děti, seniory nebo nemocné členy rodiny, kterou poskytují rodina a blízcí bez placeného pracovního vztahu." },
  { pojem: "Fiskální přínos", vysvetleni: "Čistý dopad určité věci na veřejné rozpočty: kolik stát díky ní vybere na daních a odvodech a kolik ušetří na dávkách, minus to, co na ni vynaloží." },
  { pojem: "Částečný úvazek", vysvetleni: "Zaměstnání na kratší pracovní dobu, než je plný úvazek. Výhodnost částečného úvazku závisí na tom, jak se na něj vztahují daně a odvody." },
  { pojem: "Cenový strop", vysvetleni: "Nejvyšší částka, kterou by zařízení mohlo rodičům za péči o dítě účtovat. Strop navrhujeme u zařízení, která dostávají veřejnou podporu." },
];
