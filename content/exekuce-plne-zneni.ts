export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Česko nedosahuje plného hospodářského výkonu mimo jiné proto, že drží 590 000 lidí v systému exekucí, ze kterého není úniku. Celková dlužná částka klesá ročně jen o 1 % (5 miliard korun), a to výhradně díky odpisu nevymahatelných pohledávek.[10] Systém dluhy nevymáhá. Likviduje je odpisem a po cestě ničí pracovní potenciál stovek tisíc lidí.",
  },
  {
    typ: "p",
    text: "Administrativní zátěž zaměstnavatelů dosahuje 500 až 3 000 Kč měsíčně na jednoho zaměstnance v exekuci.[11] Po započtení ztráty produktivity, fluktuace a nemocnosti jde o vyšší desítky tisíc korun ročně na pracovníka.",
  },
  {
    typ: "p",
    text: "Exekuční a dluhové pasti vytlačují část lidí z legální práce do šedé ekonomiky. Dostupné odhady dopadů na veřejné rozpočty se pohybují od jednotek po nižší desítky miliard korun ročně: Návrhy NERV mluvily o snížení dopadů předlužení na veřejné rozpočty v rozsahu 5–12 mld. Kč ročně (NERV / Úřad vlády, Redukce počtu lidí v předlužení a související šedé ekonomiky), PAQ Research vyčísluje potenciální přínos efektivnějšího nastavení oddlužení a dávek na 9–15 mld. Kč ročně (PAQ Research, Kde ušetřit 100 miliard a nezničit stát) a exekutor Petr Kučera uvádí, že zavedení teritoriality exekutorů by mohlo státu přinést minimálně 16,5 mld. Kč ročně (e15, rozhovor s Petrem Kučerou, Bilionový byznys s pohledávkami musí skončit).",
  },
  {
    typ: "h3",
    text: "Exekuce jsou v Česku silně regionální záležitost",
  },
  {
    typ: "p",
    text: "Karlovarský, Ústecký a Liberecký kraj mají nejvyšší podíl obyvatel v exekuci v celé republice – a zároveň jsou to tři nejchudší kraje v zemi. Není to náhoda: nízké mzdy, strukturální nezaměstnanost a slabá sociální síť vytvářejí přesně ty podmínky, ve kterých se dluhová past uzavírá nejrychleji a nejhůře se z ní vychází. Tyto regiony dostávají rok co rok dotace na revitalizaci průmyslových zón nebo turistické atraktivity. Jenže dokud jejich obyvatelé nemohou legálně vydělávat bez toho, aby přišli o každou přebytečnou korunu, žádná dotace nepomůže. Reforma exekučního systému je pro tyto regiony účinnější nástroj rozvoje než jakákoli dotační politika.",
  },
  {
    typ: "h3",
    text: "Systém trestá snahu",
  },
  {
    typ: "p",
    text: "Většina dlužníků čelí 66% srážce z příjmu. Každý, kdo vydělá nad cca 31 500 Kč hrubého, přichází o každou další vydělanou korunu – srážka je 100 %. U jednotlivce se čtyř a více exekucí nastupuje 100% srážka už od 24 609 Kč.[12] Výsledek? Přesčasy nedávají smysl. Kariérní růst je iracionální. Práce načerno se vyplatí víc než legální zaměstnání. NERV potvrzuje: mezní užitek z práce je u lidí v exekuci záporný – systém ekonomicky trestá pracovitost a odměňuje pasivitu.[13] Česko tímto mechanismem aktivně vyhání lidi z legálního trhu práce a přichází o miliardy na daních a odvodech.",
  },
  {
    typ: "h3",
    text: "Ztracená generace",
  },
  {
    typ: "p",
    text: "Exekuce nejsou jen problémem dlužníka – jsou problémem i jeho dětí. Exekuce rodiče patří podle PAQ Research mezi nejsilnější prediktory nedokončení střední školy.[14] Děti v exekučních rodinách trpí úzkostmi, sníženou motivací ke studiu a větší ochotou porušovat společenské normy.[15] Zadluženost se přenáší mezigeneračně.[16] Každé dítě, které kvůli dluhům v rodině vypadne ze vzdělávacího systému, představuje předem naprogramovanou budoucí zátěž pro veřejné rozpočty: analýza PAQ Research a IDEA odhaduje ztrátu 2–3 miliony korun na ušlých daních a vyšších sociálních výdajích za každého člověka s nedokončeným vzděláním.[17]",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Zrušení 100% srážky, snížení maximální srážky na 50 %",
        text: "Z každé vydělané koruny zůstane dlužníkovi vždy alespoň polovina. Druhá polovina jde na splácení. Německo, Slovensko i skandinávské země tento model uplatňují s prokazatelně lepšími výsledky.",
      },
      {
        nazev: "Teritorialita exekutorů",
        text: "Jeden dlužník = jeden exekutor je klíčové opatření, které podle zaměstnavatelů sníží jejich administrativní náklady o více než polovinu.",
      },
      {
        nazev: "Reforma nezabavitelného minima",
        text: "Zabezpečí, aby samoživitelé po srážkách neklesali pod hranici chudoby (dnes: cca 10 900–11 500 Kč, pod hranicí chudoby 12 818 Kč).",
      },
    ],
  },
  {
    typ: "h3",
    text: "Měřitelné cíle reformy exekucí do roku 2030",
  },
  {
    typ: "p",
    text: "Počet lidí v exekuci má klesnout o 30 %, a to nejvýše na 413 000 (z 590 000). Roční pokles vymáhané částky má být dvojnásobný, na ~10 mld. Kč (z ~5 mld. Kč). Na legální trh práce má být vráceno 200 000 lidí.",
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Návrat 100 000 lidí na legální trh práce by státu přinesl odhadem 3–5 miliard Kč ročně na daních a odvodech, které dnes unikají do šedé ekonomiky. Česko nemůže jet na plný výkon, pokud systém, který měl vymáhat spravedlnost, místo toho vyhání lidi z legální ekonomiky a upírá jejich dětem šanci na vzdělání.",
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
  { pojem: "Exekuce", vysvetleni: "Nucené vymáhání dluhu podle rozhodnutí soudu nebo jiného orgánu, které provádí soudní exekutor. Dlužník pak platí dluh i náklady exekuce a může přijít o část příjmu nebo majetku." },
  { pojem: "Srážka ze mzdy", vysvetleni: "Část příjmu, kterou zaměstnavatel na základě exekuce odvádí exekutorovi místo dlužníkovi." },
  { pojem: "Nezabavitelné minimum", vysvetleni: "Částka z příjmu dlužníka, kterou nelze zabavit, aby mu zůstalo na živobytí." },
  { pojem: "Teritorialita exekutorů", vysvetleni: "Pravidlo, podle kterého exekutor vymáhá dluhy jen v určeném území. Navrhujeme, aby jeden dlužník měl jednoho exekutora." },
  { pojem: "Oddlužení", vysvetleni: "Zákonný postup, ve kterém dlužník splácí dluhy podle schváleného plánu. Po jeho dokončení mu zbytek dluhů může být odpuštěn." },
  { pojem: "Šedá ekonomika", vysvetleni: "Práce a výdělky mimo evidenci, za které se neplatí daně a odvody. Typicky jde o práci načerno." },
  { pojem: "Mezní užitek", vysvetleni: "Přínos, který člověku přinese další jednotka práce nebo příjmu. Je-li záporný, další práce se mu nevyplatí." },
  { pojem: "Předlužení", vysvetleni: "Stav, kdy domácnost nebo člověk nemá dost příjmu na splácení všech svých dluhů a dluhy dál narůstají." },
  { pojem: "Odpis pohledávky", vysvetleni: "Věřitel pohledávku vyřadí z účetnictví jako nevymahatelnou. Dluh se pak dál nevymáhá." },
];
