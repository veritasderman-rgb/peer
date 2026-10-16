export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Česko uvízlo v pasti levné práce. Nezaměstnanost je rekordně nízká – dlouhodobě pod 5 %, jedna z nejnižších v EU. Ale nízká nezaměstnanost nezaručuje prosperitu. Česko se příliš dlouho spoléhalo na strategii „levné montovny“ – přilákání zahraničních investic nízkou cenou práce. Tato strategie dospívá ke svému konci. Geopolitika přesouvá výrobu blíž domů, mzdy v okolních zemích rostou rychleji než v Česku, které nedokáže z pozice levné montovny uniknout.",
  },
  {
    typ: "p",
    text: "Výsledkem je paradox: průměrná mzda dosahuje jen 60–65 % průměru EU. Minimální mzda v Česku (22 400 Kč v roce 2026) je nižší než v Chorvatsku, Litvě nebo Polsku, a tvoří jenom 43 % průměrné mzdy.[1] Až 80 % lidí na minimální mzdě má zároveň nárok na sociální dávky – stát tak fakticky dotuje nízké mzdy namísto toho, aby firmy tlačil k vyšší produktivitě.[2]",
  },
  {
    typ: "h3",
    text: "Zamrzlý trh práce: nízká flexibilita i nízká jistota",
  },
  {
    typ: "p",
    text: "Zákoník práce preferuje stabilitu nad pohyblivostí, ale kombinuje to s velmi nízkou podporou při přechodu mezi zaměstnáními. Dánský model, tzv. flexicurity, ukazuje, jak to dělat jinak: vysoká flexibilita pro zaměstnavatele funguje jen tehdy, když ji doprovází silná záchranná síť pro zaměstnance.[3] V Česku to děláme naopak. Máme zde průměrně přísnou ochranu zaměstnání a zároveň jedny z nejnižších výdajů na aktivní politiku zaměstnanosti v OECD. Na rekvalifikace šlo v roce 2023 jen 382 milionů Kč (přibližně 0,005 % HDP), zatímco průměr OECD činí 0,1 % HDP.[4] V následujících dvou letech sice prostředky na rekvalifikace rostly, ale v první polovině roku 2026 se počet rekvalifikací meziročně propadl o 80 %. Výsledkem je nižší pracovní mobilita a nižší mzdy.",
  },
  {
    typ: "p",
    text: "Masové rozšíření dohod o provedení práce (DPP) situaci dále zhoršuje. Umožňuje totiž zaměstnavatelům de facto obcházet pojistné odvody, vytváří silnou motivaci rozkládat práci do pseudoflexibilních dohod a připravuje studenty, seniory i ženy na částečných úvazcích o sociální pojistné nároky.",
  },
  {
    typ: "p",
    text: "Vzdělávací paradox. Čeští žáci patří v digitálních dovednostech mezi nejlepší v Evropě. Dospělí se přitom dále vzdělávají nejméně z celé EU: v roce 2022 se dalšímu vzdělávání věnovalo jen 21,2 % dospělých, oproti průměru EU 39,5 % a Švédsku s 73,9 %.[5] Světové ekonomické fórum odhaduje, že do roku 2030 bude muset projít rekvalifikací až 50 % pracovníků.[7] Kvalitní rekvalifikace, upskilling a reskilling jsou vzhledem k technologickým změnám pro Česko životní nutnost.",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Zavedeme českou variantu flexicurity",
        text: "Zkrátíme výpovědní dobu na 1 měsíc v prvním roce pracovního vztahu + zachováme 80% podporu v nezaměstnanosti v prvních 2 měsících, od pátého měsíce podmíněnou aktivní účastí na rekvalifikaci.",
      },
      {
        nazev: "Zvýšíme minimální mzdu na 50 % průměrné mzdy",
        text: "Je to v souladu s doporučením OECD a praxí sousedních zemí. Růst minimální mzdy tlačí firmy k automatizaci a vyšší produktivitě.",
      },
      {
        nazev: "Omezíme kumulaci dohod o provedení práce (DPP)",
        text: "DPP je nástrojem vyhýbání se odvodům. Současně snížíme daňovou zátěž skutečných částečných úvazků. Více aktivních dohod ve formátu DPP umožníme kumulovat jen studentům.",
      },
      {
        nazev: "Zvýšíme výdaje na aktivní politiku zaměstnanosti s důrazem na kvalitu",
        text: "Chceme dosáhnout průměru OECD do roku 2030. Zavedeme individuální vzdělávací účty pro každého dospělého (inspirace: Francie, Finsko).",
      },
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
  { pojem: "Flexicurity", vysvetleni: "Kombinace flexibilního trhu práce, ve kterém je snazší zaměstnance přijmout i propustit, a silné sociální ochrany, která člověku při ztrátě práce pomůže s podporou i s novým uplatněním." },
  { pojem: "DPP (dohoda o provedení práce)", vysvetleni: "Zvláštní forma pracovního vztahu na konkrétní, vymezenou práci. Odvody se u ní počítají jinak než u běžného úvazku, proto ji lze zneužít k obcházení pojistného." },
  { pojem: "Aktivní politika zaměstnanosti", vysvetleni: "Výdaje státu, které pomáhají lidem bez práce najít zaměstnání, například rekvalifikace, poradenství nebo příspěvky zaměstnavatelům. Na rozdíl od pasivní podpory v nezaměstnanosti, která jen vyplácí peníze." },
  { pojem: "Rekvalifikace", vysvetleni: "Vzdělávání, které člověku pomůže získat nové dovednosti nebo změnit obor, aby našel práci v jiné profesi." },
  { pojem: "Minimální mzda", vysvetleni: "Nejnižší mzda, kterou smí zaměstnavatel zaměstnanci vyplatit za práci v plném úvazku. Stanovuje ji vláda." },
  { pojem: "Upskilling a reskilling", vysvetleni: "Upskilling znamená rozšíření stávajících dovedností, reskilling získání dovedností pro jinou profesi." },
  { pojem: "Individuální vzdělávací účet", vysvetleni: "Osobní účet s prostředky na další vzdělávání, který si dospělý může použít na kurzy podle vlastního výběru." },
  { pojem: "Pojistné odvody", vysvetleni: "Platby z mzdy a od zaměstnavatele na sociální a zdravotní pojištění. Z nich se financují důchody, nemocenská a zdravotní péče." },
];
