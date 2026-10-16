export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Česko je exportní srdce Evropy. Exportujeme zboží a služby za 70–75 % HDP. Tři čtvrtiny našeho zboží míří do EU a více než 60 % do zemí platících eurem.[1] Do eurozóny exportujeme výrazně více zboží než Rakousko a Slovensko. V debatě o euru se často argumentuje Dánskem a Řeckem. Obě země jsou se zeměmi platícími eurem ekonomicky výrazně méně provázané než Česko. Z Dánska do eurozóny míří méně než 40 % zboží, ale dánská koruna je s eurem pevně svázaná díky mechanismu směnných kurzů ERM 2.",
  },
  {
    typ: "p",
    text: "Domácnosti: dražší hypotéky a zbytečné poplatky. Hypoteční sazby jsou v Česku dlouhodobě výrazně vyšší než v eurozóně. V červnu 2026 nabízela ČSOB hypotéku s tříletou fixací v Česku za 4,94 %, na Slovensku za 3,69 %, rozdíl 1,25 procentního bodu za totožný produkt stejné banky.[2] Na průměrné hypotéce 4,7 milionu korun se splatností 30 let to znamená měsíční splátku 25 059 Kč v Česku oproti 21 607 Kč na Slovensku a celkové úroky 4 321 079 Kč oproti 3 078 421 Kč. Slováci zaplatí za stejný dům na úrocích o 1 242 657 Kč méně. Průměrná úroková sazba v eurozóně je 3,84 % oproti 4,79 % v Česku. Úspora pro průměrnou českou domácnost by tedy činila přes 40 000 Kč ročně.[3]",
  },
  {
    typ: "p",
    text: "K tomu se přičítají transakční náklady: při každé směně korun za eura platíme „malou daň“ ve výši 2–3 % z objemu konverze. Rodina, která utratí na dovolené 1 500 EUR, zaplatí zhruba 1 100 Kč skrytých nákladů jen na jedné cestě. Přitom všech 5 nejoblíbenějších českých dovolenkových destinací roku 2024 jsou země eurozóny.",
  },
  {
    typ: "p",
    text: "Malé a střední firmy: kurz jako zdroj nejistoty a nákladů. Malé a střední firmy nemají přístup k levným eurovým úvěrům ani ke strukturovaným nástrojům kurzového zajištění. Malé firmy jsou strukturálně znevýhodněné oproti velkým firmám a zahraničním korporacím, které se dokáží kurz snadněji zajistit nebo již dnes účtují jen v eurech.",
  },
  {
    typ: "p",
    text: "Stát: zbytečný příplatek za dluh. Český státní dluh dosáhne koncem roku 2026 téměř 4 bilionů korun. Česká republika si půjčuje o 1 až 1,5 procentního bodu dráže než srovnatelné země eurozóny; v dobách geopolitické nejistoty je rozdíl nejvyšší. Každé jedno procento navíc znamená 40 miliard korun ročně jen na obsluze dluhu.[4] Přijetím eura by tato penalizace za „malou měnu“ z velké části zmizela.",
  },
  {
    typ: "p",
    text: "Měnová „nezávislost“: více na papíře než v praxi. Argument o ochranné funkci kurzu koruny je přitažlivý, ale neplatí pro ty, kteří ho potřebují nejvíce. Velké exportní firmy už v eurech obchodují, za eura si i půjčují a mohou v něm vést i účetnictví. Domácnostem a malým firmám rozhodnutí ČNB o sazbách přímo určuje výši splátky hypotéky nebo úvěru. Korunová nezávislost není zadarmo. Nejvíc za ni doplácejí běžní občané a malé firmy, zatímco finanční sektor sčítá zisky za převody měn a zajištění kurzu.",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Veřejná debata a politická shoda.",
        text: "Přijetí eura není rozhodnutí jedné vlády, protože vyžaduje širokou společenskou diskusi a mezistranický konsenzus. Argumenty PRO přitom sílí: do eurozóny vstoupilo Chorvatsko (2023) a Bulharsko (2026) a o vstup nyní usiluje i Maďarsko. Česko tak riskuje, že zůstane jako izolovaný ostrov koruny obklopený eurem, bez politického vlivu i bez ekonomických výhod, které sousedé využívají.",
      },
      {
        nazev: "Splnit maastrichtská kritéria a vstoupit do ERM 2.",
        text: "Česká republika musí splnit konvergenční podmínky: fiskální disciplínu (deficit pod 3 % HDP, dluh pod 60 % HDP nebo klesající), nízkou inflaci a stabilní úrokové sazby. Minimální délka pobytu v ERM 2 jsou 2 roky.",
      },
      {
        nazev: "Přijmout euro.",
        text: "Nejdříve 2 roky po vstupu do ERM 2 Česká republika přijme euro jako zákonné platidlo. Čím déle otálíme, tím více platíme: na hypotékách, na obsluze státního dluhu i na kurzových nákladech, které každý rok zbytečně odčerpávají miliardy z kapes domácností a firem.",
      },
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Přijetí eura odstraní zbytečné náklady pro domácnosti, firmy i stát a zajistí Čechům rovné podmínky se sousedy, kteří euro mají. Euro je i politický projekt. Znamená silnější hlas u stolu, kde se v Bruselu rozhoduje. Ale Piráti obhajují euro především proto, že se běžným lidem finančně vyplatí.",
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "Harvard Atlas of Economic Complexity. atlas.hks.harvard.edu." },
  { index: 2, citace: "ČSOB / Este: nabídka hypoték v Česku a na Slovensku, červen–červenec 2026 (citováno z dokumentu autora)." },
  { index: 3, citace: "Deloitte Property Index 2025; ČBA Monitor (červen 2026); Hypoindex: průměrná sazba eurozóny." },
  { index: 4, citace: "Ministerstvo financí ČR: státní dluh a výhled dluhové služby 2026." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "ERM 2", vysvetleni: "Mechanismus směnných kurzů, do kterého země vstupuje před přijetím eura. Kurz její měny se pohybuje v pevně stanoveném pásmu vůči euru." },
  { pojem: "Maastrichtská kritéria", vysvetleni: "Podmínky pro přijetí eura: deficit veřejných financí pod 3 % HDP, dluh pod 60 % HDP nebo klesající, nízká inflace a stabilní úrokové sazby." },
  { pojem: "Fixace hypotéky", vysvetleni: "Období, po které banka nemění úrokovou sazbu hypotéky, například tři roky. Po jeho skončení se sazba přepočítá podle tehdejších podmínek." },
  { pojem: "Kurzové zajištění", vysvetleni: "Nástroj, kterým firma předem stanoví kurz, za který bude směňovat měny, a omezí tak riziko kurzových ztrát." },
  { pojem: "Obsluha dluhu", vysvetleni: "Platby úroků, které stát nebo firma každý rok zaplatí z dluhu. Čím vyšší úrok, tím vyšší obsluha dluhu." },
  { pojem: "Transakční náklady", vysvetleni: "Poplatky a marže, které člověk zaplatí při směně měn nebo při převodu peněz do jiné měny." },
];
