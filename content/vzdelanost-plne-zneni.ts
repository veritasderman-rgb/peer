export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Nejbohatší země světa nesoutěží levnější pracovní silou. Soutěží schopností svých lidí vytvářet nové technologie, firmy, služby a nápady. Lidský potenciál představuje klíčový zdroj dlouhodobé prosperity, české školství ho však plně nerozvíjí. Systém se potýká s vysokou mírou předčasných odchodů ze vzdělávání a s tím souvisejícím nedokončováním vzdělávacích stupňů. Máme výrazně podprůměrný podíl vysokoškolsky vzdělané populace v porovnání se zeměmi OECD a silnou závislost studijních výsledků na socioekonomickém zázemí rodiny. Pětina patnáctiletých neumí funkčně číst (nerozumí psanému zadání a nedokáže s ním samostatně pracovat) a tento podíl se v posledních letech nezmenšuje.[1]",
  },
  {
    typ: "p",
    text: "Dalšími strukturálními faktory jsou brzká specializace a roztříštěnost stávající oborové soustavy na středních školách s rozdílnou kvalitou výuky, v jejímž důsledku absolventi častěji pracují mimo vystudovaný obor, a velmi různá kvalita škol dále zvýrazňující rozdíly ve vzdělávání. Terciárnímu stupni chybí ucelená systémová podpora studentů, což vede k vysoké míře studijní neúspěšnosti i k nutnosti skloubit studium s rozsáhlým pracovním nasazením. Celou oblast zároveň provází nižší úroveň veřejných investic do vzdělávání, vědy a výzkumu ve vztahu k HDP či demografický tlak na učitelský sbor.",
  },
  {
    typ: "h3",
    text: "1.2.1 Brzké vzdělávání je ekonomicky výhodné",
  },
  {
    typ: "p",
    text: "Máme velice nízký podíl dětí zapojených do brzké předškolní péče, zejména u dětí do 3 let věku, z nichž je zapojeno 4 %. To je významně pod průměrem zemí OECD, který je 24 %, a pod národním cílem 12 % a EU cílem 45 %, který má být dosažen do roku 2030.[2] Včasná péče ve vzdělávání se ekonomicky vyplatí s ohledem na lepší využití potenciálu dětí,[3] kdy se odhaduje, že český stát za každou korunu investovanou do programů včasné péče dostane zpět 3–4 Kč.[4] Zároveň je nízká míra zapojení dětí do brzké předškolní péče spojena s nižším zapojením rodičů (zejména matek) do ekonomické aktivity s dopady do výše mezd a platů a další kariéry (viz kapitola 1.3).",
  },
  {
    typ: "p",
    text: "To vše za demografické situace, kdy na většině území dochází k výraznému poklesu počtu dětí v kohortách předškolního vzdělávání. Pouze v Praze a některých výjimečných lokalitách bude situace odlišná.",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Transformace předškolních zařízení pro mladší děti",
        text: "Využijeme demografického poklesu a místo zavírání předškolních zařízení zajistíme jejich transformaci tak, aby vznikly dostatečné kapacity pro mladší děti. Každá rodina by měla mít možnost volby, jestli dítě umístí do mateřské školy už ve 2 letech a měla by mít dostupnou péči o děti už od 1 roku věku.",
      },
      {
        nazev: "Podmínky pro alespoň 25 % dětí do 3 let v předškolní péči",
        text: "Vytvoříme podmínky, aby alespoň 25 % dětí do 3 let využívalo předškolní péči.",
      },
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Zapojení dodatečných 15 % dětí do 3 let do předškolní péče může přinést nárůst ročního HDP ČR mezi 10 a 30 mld. Kč.",
  },
  {
    typ: "h3",
    text: "Je nutné ukončit spirálu udržující rozdíly ve vzdělávání",
  },
  {
    typ: "p",
    text: "V České republice je úroveň dosaženého vzdělání silněji závislá na zázemí rodiny než ve většině vyspělých zemí – socioekonomický status tvoří 22 % rozdílů ve výsledcích žáků (průměr OECD je 15 %). Děti ze znevýhodněného prostředí mají výrazně nižší šance na úspěch: 48,5 % z nich nedosáhne základní dovednostní úrovně v matematice. Naopak pouze 7 % patří mezi žáky, kteří dosahují výborných výsledků navzdory nepříznivému zázemí, což je druhý nejnižší podíl v OECD.[5] Vzdělávací systém tak často nedokáže využít potenciál dětí. Kvůli nízkým aspiracím rodičů i škol se tak školy těmto dětem dostatečně nevěnují, ty mají horší výsledky, což spirálově pokračuje dál.",
  },
  {
    typ: "p",
    text: "Každé dítě, které kvůli místu narození, nepodnětnému zázemí nebo nedostatečné podpoře nerozvine svůj potenciál, představuje ztrátu budoucí produktivity celé ekonomiky a společnosti. Ve férové tržní ekonomice by vzdělávací systém měl naopak dát dětem šanci uspět bez ohledu na to, komu se narodily. Na příkladu Belgie a Dánska vidíme, že země s vyšší sociální mobilitou mají dlouhodobě vyšší hospodářský růst, vyšší inovativnost i vyšší mzdy.[6]",
  },
  {
    typ: "p",
    text: "Důsledkem rané selektivity vzdělávacího systému (ztělesněné designem přijímací zkoušky na SŠ) v kombinaci s nedostatečnými kapacitami všeobecně-vzdělávacích oborů (gymnázia, lycea) je situace, kdy část žáků končí vzdělávání předčasně nebo volí dráhu, jež nerozvíjí jejich potenciál.[7, 8] K tomuto problému přispívá i nedostatečná aspirace žáků. Žáci, kteří se nepřihlásí na maturitní obor na SŠ, neskládají jednotné přijímací zkoušky a ani tedy nezjistí, jak na tom jsou vzhledem k ostatním. Nevhodná volba úzkého oboru také vede k častým změnám studovaných oborů, což efektivně prodlužuje studium a má za důsledek pozdější vstup na pracovní trh.",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Jasné a měřitelné cíle",
        text: "Stanovíme jasné a měřitelné cíle vzdělávacího systému a zajistíme jejich sledování a vyhodnocování.",
      },
      {
        nazev: "Plnou dostupnost psychologů",
        text: "Postupně zajistíme plnou dostupnost psychologů, speciálních a sociálních pedagogů ve školách tak, aby instituce poskytovaly ohroženým dětem kompenzační zázemí a pomáhaly prolomit generační vzorce neúspěchu.",
      },
      {
        nazev: "Podpoříme znevýhodněné oblasti indexovým financováním",
        text: "Zajistíme dostatek financí na smysluplnou realizaci indexového financování – tedy na realizaci potřebných opatření na školách s vyšším podílem sociálně znevýhodněných žáků.",
      },
      {
        nazev: "Snížíme vliv socioekonomického zázemí na výsledky žáků",
        text: "Kombinací předchozích návrhů dosáhneme snížení vlivu socioekonomického zázemí na výsledky žáků (měřeno např. hodnotou této veličiny v šetření PISA s cílovou hodnotou pod 15 %) a srazíme podíl předčasných odchodů ze vzdělávání v sociálně zatížených regionech pod 5 %.",
      },
      {
        nazev: "Pravidelné testování žáků",
        text: "Zavedeme pravidelné testování žáků v klíčových bodech vzdělávání na ZŠ (3., 5., 7. a 9. ročník) a změníme systém přijímacích zkoušek na SŠ tak, aby se ho účastnili všichni žáci a probíhal před podáním přihlášek na SŠ.",
      },
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Kvalitnější pracovní sílu, lépe připravenou pro práci, schopnou se lépe učit nové věci, menší nezaměstnanost. Náběh výsledků reformy bude trvat dlouho, ale po 15 až 20 letech můžeme čekat nárůst ročního HDP o 50 až 100 mld. Kč v dnešních cenách (řádově 1 % HDP) či vyšší.",
  },
  {
    typ: "h3",
    text: "Struktura oborů škol musí být inovovaná a kvalitní",
  },
  {
    typ: "p",
    text: "V rámci zemí OECD máme druhý největší podíl mladých lidí (18–24 let), kteří ani nestudují, ani nejsou zaměstnaní, a to hned po Turecku. Jde zhruba o dvojnásobek průměru EU.[9] Dalším problémem je nevhodná struktura oborové nabídky a časná specializace při výběru střední školy. Česko v současnosti nabízí až 281 oborů středního vzdělávání,[10] zatímco například Švédsku stačí pouze 18.[11] Nadměrná a zastaralá oborová roztříštěnost navíc vede k tomu, že se značná část absolventů nakonec uplatňuje zcela mimo vystudovaný obor.",
  },
  {
    typ: "p",
    text: "Dosažení alespoň středního vzdělání bez maturity oproti základnímu znamená zvýšení průměrných celoživotních pracovních příjmů jednotlivce o více než třetinu (8 mil. Kč). Úspěšné dokončení střední školy s maturitou znamená zvýšení příjmů o více než 60 % (17 mil. Kč) oproti získání pouze základního vzdělání. Lidé s vysokoškolským vzděláním mají dlouhodobě až 10krát nižší míru nezaměstnanosti než lidé s nejvýše základním vzděláním (kteří mají přes 20 %).[12] Zvýšené příjmy jednotlivců se projeví i zvýšenými příjmy veřejných rozpočtů. Například žák, který dokončí alespoň SŠ, odvede za svůj život do veřejných rozpočtů v průměru o 2,3–2,8 milionu Kč víc než žák pouze se základním vzděláním.[13]",
  },
  {
    typ: "p",
    text: "V Česku sice máme nějaká data o celých ročnících žáků, ale i ta jsou zpravidla neúplná. Například jednotné přijímací zkoušky na střední školy skládají pouze žáci, kteří se hlásí alespoň na jeden maturitní obor. Ještě neúplnější data o celku poskytují maturitní zkoušky, které skládá jen část středoškoláků v těchto oborech. Chybí nám měření přidané hodnoty škol (tedy, co se žáci naučí), dlouhodobého rozvoje a měkkých dovedností žáků.[14]",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Inovujeme oborovou soustavu",
        text: "Nabídka a obsah vzdělávacích oborů musí odpovídat poptávce a aktuálním požadavkům zaměstnavatelů tak, aby byli absolventi schopni se adaptovat na profese, které vznikají a budou vznikat, a byli připraveni na svět budoucnosti – s umělou inteligencí a vyšší frekvencí změn v průběhu života.",
      },
      {
        nazev: "Sloučíme příbuzné obory na středních školách a snížíme jejich počet pod 100",
        text: "",
      },
      {
        nazev: "Zlepšíme prostupnost oborů a možnost změnit zaměření ještě v průběhu studia",
        text: "",
      },
      {
        nazev: "Reformujeme učňovskou vzdělávací větev",
        text: "Umožníme snadnou návaznost v dalším profesním vzdělávání (na VOŠ, nástavbách, profesních oborech VŠ, v mikrocertifikačních kurzech).",
      },
      {
        nazev: "Zavedeme systematické měření přidané hodnoty škol",
        text: "Základem bude dlouhodobé měření výsledků žáků a měření dosahovaných měkkých kompetencí a gramotností žáků.",
      },
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Pokud nezačneme aktivně řešit kvalitu vzdělávání a aktuální výzvy (např. vliv umělé inteligence jak na vzdělávání, tak na pracovní uplatnění), dá se očekávat, že dojde k poklesu zaměstnatelnosti našich občanů. Pokud dokážeme díky měření určit slabá místa systému, budeme moci lépe investovat do jejich nápravy. Omezení počtu oborů a zlepšení prostupnosti studia sníží mrtvé náklady. Celkově je realistický efekt balíku opatření na 1 až 2 % dnešního HDP v horizontu 20 let.",
  },
  {
    typ: "h3",
    text: "Investice do vzdělávání a vědy se mnohonásobně vrací",
  },
  {
    typ: "p",
    text: "V mezinárodním srovnání má Česko málo vysokoškolsky vzdělanou populaci.[15] Jak podíl dnešních občanů v produktivním věku, tak jejich rodičů, kteří mají vysokoškolské vzdělání, je výrazně nižší než průměr OECD (viz graf níže).[16] Naopak v rámci VŠ absolventů máme vysoký podíl těch, kteří absolvují magisterský stupeň oproti těm, kteří svoje formální vzdělávání zakončí bakalářským titulem. Např. v roce 2025/26 pokračovalo 94,1 % bakalářských absolventů v magisterském studiu.[17]",
  },
  {
    typ: "p",
    text: "Většina českých vysokoškoláků si při studiu vydělává prací, 92 % z nich si alespoň částečně přivydělává a 70 % z nich pracuje v průběhu celého semestru, což je nejvíce z 20 zemí EU ve výzkumu Eurostudent,[18] přičemž jejich práce většinou nesouvisí se studovaným oborem. To odvádí jejich pozornost od školy a snižuje se tím i pravděpodobnost dokončení školy. Náklady související se studiem na vysoké škole jsou vysoké (mimo jiné v souvislosti s krizí bydlení v univerzitních městech). Česko nemá funkční finanční podporu studujících na vysokých školách.[19] Kromě těch, kteří z důvodu ekonomických a nevhodně nízkých aspirací vysokou školu nezačnou studovat, se to projevuje předčasným neúspěšným ukončením studia výrazně přesahujícím třetinu bakalářských studentů.[20] Část veřejných investic do vzdělávání je tak využita neefektivně a zejména není rozvinut potenciál studentů.",
  },
  {
    typ: "p",
    text: "Česko vydává ve srovnání s rozvinutými státy na vzdělávání menší podíl rozpočtu, konkrétně pouze 4,1 % HDP[21] oproti průměru OECD, který představuje 4,7 % HDP.[22] Podfinancované je především terciární vzdělávání. Podobně výdaje na vědu a výzkum dosahují v Česku pouze 1,82 % HDP oproti 2,24 % HDP průměru v EU a 3,0 %, které jsou cílem EU.[23] Přičemž každá koruna investovaná do výzkumu a vývoje se ekonomice v dlouhém období vrací několikanásobně – konzervativní odhady hovoří o 3–4 Kč, optimističtější mluví o více než 20 Kč.[24, 25, 26, 27]",
  },
  {
    typ: "p",
    text: "Chronicky podfinancovaný systém jen pomalu zvyšuje svou kvalitu. Nedostatečné finanční ohodnocení pedagogů přispívá k obtížnému zajištění kvalifikovaných vyučujících. Přestože je uzákoněno, že finanční zdroje na platy pedagogů musí být dostatečné na dosažení průměrného platu ve výši alespoň 130 % průměrné mzdy v národním hospodářství, v posledních letech skutečně dosahovaný poměr klesl k 108 %.[28] Vzdělávací systém zároveň stojí před demografickou výzvou nahrazení velké skupiny pedagogů nyní v předdůchodovém věku.[29]",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Zavedeme vratné granty (půjčky) pro studenty VŠ",
        text: "Inspirujeme se švédským modelem s odloženým splácením navázaným na dosažení definované úrovně příjmů.",
      },
      {
        nazev: "Zvýšíme podíl vysokoškolsky vzdělaných obyvatel",
        text: "A to ve věku 25–34 let ze současných 34 % na alespoň 45 %, a splníme tak cíl EU.",
      },
      {
        nazev: "Reforma vysokých škol a jejich financování",
        text: "Reformou vysokých škol dáme vedení VŠ potřebné pravomoci a zároveň odpovědnost školy efektivně řídit, a jejich financování podpoříme jejich diverzifikaci a kvalitu jak v profesní, tak v akademické dimenzi jejich činnosti. Zajistíme dostatečné finance pro zvládnutí navýšení počtu studentů a konkurenceschopné mzdy vysokoškolských pedagogů.",
      },
      {
        nazev: "Rozvoj s praxí provázaných bakalářských oborů",
        text: "V profesní větvi podpoříme rozvoj s praxí provázaných bakalářských oborů tak, aby tvořily alespoň 50 % všech bakalářských absolventů. Ve výzkumné větvi zaměříme prostředky na internacionalizaci, doktorské studium a špičkovou vědu.",
      },
      {
        nazev: "Alespoň jednu českou univerzitu v TOP 100",
        text: "Do roku 2035 chceme dostat a udržet alespoň jednu českou univerzitu v TOP 100 mezinárodních žebříčků.",
      },
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Vyšší míra dosahovaného vysokoškolského vzdělání v populaci přinese vyšší ekonomický výkon. Kvalitní univerzity kromě inovačního přínosu přispívají k udržení či přilákání vysoce výkonných „mozků“ do české ekonomiky (zabrání odlivu mozků do výkonnějších ekonomik).",
  },
  {
    typ: "h3",
    text: "Dlouhodobou konkurenceschopnost nelze udržet bez kvalitního systému celoživotního učení",
  },
  {
    typ: "p",
    text: "Česko má nízkou míru dalšího vzdělávání (mimo vzdělávání přímo související s pracovní pozicí) v průběhu dalšího života lidí po prvním ukončení formálního vzdělávání. I celková míra zapojení dospělých v celoživotním vzdělávání je v rámci EU podprůměrná a výrazně nižší než ve vedoucím Švédsku.[24] Pouze 51,8 % neformálního vzdělávání v ČR vede k získání nějakého certifikátu, což je výrazně pod průměrem OECD s 62,7 % a daleko za např. Německem se 77,1 %.[26]",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Zvýšíme podíl dospělých zapojených do celoživotního vzdělávání",
        text: "",
      },
      {
        nazev: "Rozšíříme flexibilní mikrocertifikáty",
        text: "Stanou se validním potvrzením získání dílčích kvalifikací, aby je uznávali zaměstnavatelé i vysoké školy.",
      },
      {
        nazev: "Zavedeme individuální vzdělávací účty",
        text: "Na ně bude přispívat stát, zaměstnavatel i zaměstnanec.",
      },
      {
        nazev: "Daňově zvýhodníme investice zaměstnavatelů do vzdělávání zaměstnanců",
        text: "",
      },
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "V krátkodobém horizontu by měl být efekt fiskálně nulový – daňové úlevy a příspěvky by se měly zhruba vyrovnat úsporami na sociálních dávkách a mírně vyššími příjmy na daních. Ze střednědobého hlediska očekáváme vyšší HDP v řádu 20 až 40 mld. Kč díky kratší době nezaměstnanosti a lepší zaměstnatelnosti lidí a vyšší produktivitě práce. Z dlouhodobého pohledu očekáváme vyšší tempo růstu HDP o 0,1 až 0,4 % ročně. Přímý vliv vyšší vzdělanosti na ekonomickou prosperitu, na HDP a jeho růst je dobře prokázán v mnoha zemích. Realizace výše uvedených změn zvýší ekonomický růst proti současnému stavu o 0,3 % ročně, tedy ve sledované dekádě o 3 %.",
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "Česká školní inspekce, 2023. Národní zpráva PISA 2022: Matematická, čtenářská a přírodovědná gramotnost patnáctiletých žáků v České republice. Praha: ČŠI." },
  { index: 2, citace: "OECD, 2025. OECD Economic Surveys: Czechia 2025. Paris: OECD Publishing." },
  { index: 3, citace: "UNDP, 2014. The case for investing in early childhood. New York: United Nations Development Programme." },
  { index: 4, citace: "PAQ Research a IDEA při CERGE-EI, 2020. Nerovnosti ve vzdělávání jako zdroj neefektivity. Praha: Nadace České spořitelny." },
  { index: 5, citace: "OECD, 2023. PISA 2022 Results (Volume I & II): Czech Republic Country Note. Paris: OECD Publishing." },
  { index: 6, citace: "OECD, 2018. A Broken Social Elevator? How to Promote Social Mobility. Paris: OECD Publishing." },
  { index: 7, citace: "PAQ Research, 2024. Dvěma třetinám žactva stačí 25 z 231 nejžádanějších středoškolských oborů." },
  { index: 8, citace: "PAQ Research, 2024. Přijímačky: šetření rodiče – nerovnosti. Praha: PAQ Research." },
  { index: 9, citace: "OECD, 2023. Education at a Glance 2023: OECD Indicators. Paris: OECD Publishing." },
  { index: 10, citace: "Národní pedagogický institut ČR, 2024. Konference Curriculum 2024: Revize RVP SOV. Praha: NPI ČR." },
  { index: 11, citace: "Skolverket, 2025. Gymnasieprogrammen Gy25. Stockholm: Skolverket." },
  { index: 12, citace: "Matoušek, Roman, 2019. Finanční dopady předčasných odchodů ze vzdělávání pro stát a jednotlivce. Praha: Agentura pro sociální začleňování (ASZ)." },
  { index: 13, citace: "PAQ Research a IDEA při CERGE-EI, 2020. Nerovnosti ve vzdělávání jako zdroj neefektivity: kalkulace výnosů středoškolského vzdělání. Praha: Nadace České spořitelny." },
  { index: 14, citace: "OECD, 2008. Measuring Improvements in Learning Outcomes: Best Practices to Assess the Value-Added of Schools. Paris: OECD Publishing." },
  { index: 15, citace: "Ministerstvo školství, mládeže a tělovýchovy ČR (MŠMT), 2024. OECD: Podíl vysokoškolsky vzdělaných Čechů je stále nízký. Praha: MŠMT." },
  { index: 16, citace: "OECD, 2024. Education at a Glance 2024: OECD Indicators. Paris: OECD Publishing." },
  { index: 17, citace: "Eurydice, 2025. Programy druhého cyklu (magisterské studijní programy) v ČR. Brusel: European Commission / Eurydice." },
  { index: 18, citace: "Eurostudent, 2021. EUROSTUDENT VII Synopsis of Indicators: Social and Economic Conditions of Student Life in Europe 2018–2021. Hannover: DZHW." },
  { index: 19, citace: "IDEA při CERGE-EI, 2023. Finanční podpora vysokoškolských studentů v České republice: rekonstrukce systému nutná. Praha: IDEA při CERGE-EI." },
  { index: 20, citace: "Evropská komise, 2024. Education and Training Monitor: Czechia Country Report. Lucemburk: Publications Office of the European Union." },
  { index: 21, citace: "Český statistický úřad (ČSÚ), 2024. Výdaje na vzdělávání v ČR. Praha: ČSÚ." },
  { index: 22, citace: "OECD, 2025. Education at a Glance 2025: OECD Indicators. Paris: OECD Publishing." },
  { index: 23, citace: "Eurostat, 2024. R&D expenditure statistics. Lucemburk: Eurostat." },
  { index: 24, citace: "Economic Record, 2022. Returns to Research and Development Investments: Empirical Meta-Analysis. Hoboken: John Wiley & Sons." },
  { index: 25, citace: "Evropská komise, 2025. Investing in European Research and Innovation: Economic Returns and Spillover Effects. Brusel: European Commission, Press Corner, IP/25/1115." },
  { index: 26, citace: "National Library of Medicine (NLM), 2012. Macroeconomic Returns to Public and Private R&D Investments. PubMed ID: 22259821." },
  { index: 27, citace: "Hall, Bronwyn H., Mairesse, Jacques a Mohnen, Pierre, 2010. Chapter 24: Measuring the Returns to R&D. In: Hall, B. H. a Rosenberg, N. (eds.). Handbook of the Economics of Innovation. Amsterdam: North-Holland, roč. 2, s. 1033–1082." },
  { index: 28, citace: "Münich, Daniel a Smolka, Vladimír, 2026. Platy učitelů v roce 2025 a výhled: pád na dno? Praha: IDEA při CERGE-EI." },
  { index: 29, citace: "Ministerstvo školství, mládeže a tělovýchovy ČR (MŠMT), 2024. Mimořádné šetření MŠMT: Kde a jaké učitele školy potřebují. Praha: MŠMT." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "PISA", vysvetleni: "Mezinárodní šetření OECD, které testuje čtenářskou, matematickou a přírodovědnou gramotnost patnáctiletých žáků. Ukazuje, jak dobře děti zvládají učivo a jak silně jejich výsledky závisí na zázemí rodiny." },
  { pojem: "NEET", vysvetleni: "Mladí lidé ve věku 18–24 let, kteří ani nestudují, ani nejsou zaměstnaní. Zkratka vychází z anglického „not in education, employment or training“." },
  { pojem: "Indexové financování", vysvetleni: "Způsob financování škol, při kterém dostávají více peněz školy s vyšším podílem sociálně znevýhodněných žáků, aby mohly zajistit potřebnou podporu." },
  { pojem: "Terciární vzdělávání", vysvetleni: "Vzdělávání navazující na střední školu, tedy hlavně vysoké školy a vyšší odborné školy." },
  { pojem: "Mikrocertifikát", vysvetleni: "Krátké ověřené potvrzení, že člověk zvládl určitou dílčí kvalifikaci. Zaměstnavatelé i vysoké školy ho mají uznávat." },
  { pojem: "Individuální vzdělávací účet", vysvetleni: "Osobní účet, na který mohou přispívat stát, zaměstnavatel i zaměstnanec a ze kterého se platí další vzdělávání." },
  { pojem: "Oborová soustava", vysvetleni: "Souhrn vzdělávacích oborů, mezi kterými žáci na středních školách volí. V Česku jich je až 281; text je označuje za roztříštěnou a zastaralou." },
  { pojem: "Vratný grant (vratná půjčka)", vysvetleni: "Peníze na studium, které student splácí až po dosažení určité úrovně příjmů. Vzorem je švédský model s odloženým splácením." },
  { pojem: "Přidaná hodnota školy", vysvetleni: "Měření toho, o kolik se žáci během studia na škole posunuli, tedy co se skutečně naučí." },
  { pojem: "Profesní bakalář", vysvetleni: "Bakalářský studijní program úzce propojený s praxí, který připravuje na přímé uplatnění v povolání. Na rozdíl od výzkumné větve nesměřuje hlavně k doktorskému studiu a vědě." },
  { pojem: "Socioekonomický status", vysvetleni: "Souhrn rodinného zázemí žáka, tedy vzdělání a příjem rodičů a podmínky, ve kterých žák vyrůstá. Čím silněji na něm závisí výsledky žáků, tím méně škola šance vyrovnává." },
  { pojem: "Aspirace", vysvetleni: "Ambice a očekávání, jak vysoko člověk ve vzdělání a kariéře míří. Nízká aspirace může vést k volbě slabší školy nebo úzkého oboru." },
  { pojem: "ECEC (péče a vzdělávání v raném dětství)", vysvetleni: "Předškolní vzdělávání a péče o děti před nástupem do základní školy. V textu je měřeno hlavně u dětí do 3 let." },
  { pojem: "Celoživotní učení", vysvetleni: "Vzdělávání dospělých po ukončení formálního studia, včetně kurzů a dalšího vzdělávání. Část z něj nevede k žádnému certifikátu." },
];
