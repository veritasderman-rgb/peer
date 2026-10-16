export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Dostupnost bydlení v České republice patří k nejhorším v celé Evropské unii a představuje zásadní makroekonomickou překážku, která blokuje mobilitu pracovní síly, brzdí alokaci kapitálu a odčerpává kupní sílu domácností.[1] Na pořízení nového průměrného bytu v ČR je potřeba přibližně 15 ročních hrubých mezd (v Praze přes 17 ročních mezd), což je nejvyšší hodnota v EU, kde se průměr pohybuje mezi 8 až 10 lety.[2] Pokud by průměrný obyvatel ČR spořil na bydlení třetinu svého čistého příjmu, na byt by vydělával 45 let.[3]",
  },
  {
    typ: "p",
    text: "Ceny bytů přitom rostou přibližně třikrát rychleji než mzdy. Za posledních deset let vzrostla průměrná nabídková cena za m² o 246 %, zatímco průměrná hrubá mzda vzrostla o 86 %.[4] Na začátku roku 2026 činil meziroční nárůst nabídkových cen bytů 12,9 %.[5]",
  },
  {
    typ: "p",
    text: "Současný stav je výsledkem dlouhodobého koktejlu špatných veřejných politik a tržních faktorů, jejichž vzájemné působení dostupnost bydlení zhoršuje ještě více. Zastaralé stavební normy prodražovaly výstavbu samy o sobě a zároveň vedly k nekvalitní výstavbě, která své okolí a centrální města zatěžuje individuální automobilovou dopravou a vyžaduje dražší veřejnou infrastrukturu. To dále posilovalo odpor sousedů a samospráv proti výstavbě, prohlubující dále nedostatek bytů, a tedy růst cen. (Na celostátní úrovni byly tyto normy výrazně zmírněny v roce 2024, např. v Praze ale stále zůstávají).",
  },
  {
    typ: "p",
    text: "Restriktivní a nejednoznačné územní plány a pomalé povolování staveb omezují a prodražují výstavbu zejména v atraktivních lokalitách uvnitř měst, a naopak podporují ekologicky a ekonomicky nákladnou satelitní výstavbu.[7] Příjmy obcí jsou jen minimálně svázány s novou výstavbou, takže nová výstavba z pohledu samosprávy nepřináší vítaný rozvoj, ale negativní finanční zátěž na výstavbu infrastruktury, škol apod. To dále motivuje samosprávy k restriktivním územním plánům a NIMBY odporu proti stavebním projektům.[8]",
  },
  {
    typ: "p",
    text: "Český daňový systém výrazně nahrává spekulantům s nemovitostmi. Spolu s běžícím růstem cen tak dále podporuje (spekulativní) poptávku po investičních nemovitostech, což se projevuje výrazně rychlejším růstem prodejních cen bytů oproti růstu nájmů. Současná situace je výsledkem strukturálního selhání trhu i veřejné správy, které vytvořilo negativní řetězec dopadů: Spekulace s pozemky & pomalé povolování → chybějící nabídka bytů → prudký růst cen a nájmů → blokace mobility práce a růst mandatorních výdajů na dávky na bydlení. Přestože stavební sektor v roce 2025 rostl o 9,3 %, bylo dokončeno pouze přibližně 33 600 bytů, což představuje pouhých 84 % odhadované roční potřeby pro stabilizaci trhu (40 000+ bytů ročně).[9]",
  },
  {
    typ: "p",
    text: "V Praze chybí dostatečné tempo výstavby, staví se 2,7× méně než ve Varšavě a téměř 2× méně než ve Vídni. Pro stabilizaci trhu by Praha potřebovala stavět aspoň 6,5 bytů na 1 000 obyvatel.",
  },
  {
    typ: "p",
    text: "V ČR je přitom přibližně 200 000 neobydlených bytů v bytových domech (tedy ne rekreačních chalup), které leží ladem ať už z letargie vlastníků nebo ze spekulativních důvodů, nejvíc z nich je v Praze.[10] V rozvojových centrech (Praha, Brno, Plzeň, …) navíc leží tisíce hektarů zasíťovaných stavebních pozemků a brownfieldů držených výhradně na růst ceny, aniž by se na nich připravovala výstavba. Stejně tak i města nechávají ladem řadu svých pozemků vhodných k bytové výstavbě na atraktivních místech. Navíc stát nedokázal reagovat na nástup Airbnb narovnáním daňových a dalších pravidel a jejich důsledným vymáháním.[11]",
  },
  {
    typ: "p",
    text: "Česká města disponují kriticky slabým obecním bytovým fondem – například Praha vlastní pouze přibližně 5 % bytového fondu. V inspirativních metropolích, jako je Vídeň, přitom městské byty tvoří 25 % a dalších 20 % představují nezisková bytová družstva.[12] Díky tomuto silnému veřejnému a družstevnímu fondu mohou města tlumit tlaky na růst nájmů a poskytovat levnější nájemní bydlení vybraným skupinám – sociálně slabším nebo profesím potřebným pro fungování města, které si ale plné tržní nájemné dovolit nemohou.[13]",
  },
  {
    typ: "p",
    text: "Zatímco ve Vídni město určuje férovou cenu nájmu díky silnému fondu, u nás diktuje ceny pouze trh. Výsledek? Vídeňský průměrný nájem je v poměru k platům nižší než v Praze.",
  },
  {
    typ: "p",
    text: "Tato situace v Česku přímo poškozuje hospodářský růst. Vysoké náklady na bydlení snižují pracovní mobilitu a schopnost uplatnit své zkušenosti tam, kde je firmy poptávají. To poškozuje hospodářský růst celé země, protože rozdíl v nájmech převyšuje jejich potenciální nárůst čisté mzdy. Výzkumy IDEA CERGE – EI ukazují, že vysoké transakční náklady na bydlení přímo snižují celkovou pružnost českého trhu práce a udržují strukturální nezaměstnanost v chudších okresech. Přes 1 milion obyvatel v ČR vynakládá za bydlení a energie více než 40 % svých čistých příjmů a podle PAQ Research se přes 300 000 domácností nachází v bytové nouzi.[14]",
  },
  {
    typ: "p",
    text: "Současné deformace výstavby také negativně dopadají na kvalitu života a obecní rozpočty. Namísto hustější výstavby v místech, kde jsou pracovní příležitosti, služby i existující dopravní infrastruktura, roste všude řídká výstavba v polích a satelitních vesnicích.[15] Vyvolává tak dopravní zátěž ve městech, dlouhé časy dojíždění, nízkou dostupnost služeb pro nově bydlící a vysokou fiskální zátěž na dobudování infrastruktury, která je nota bene násobně dražší právě v řídké satelitní zástavbě.[16] V Praze, krajských městech i městečkách leží v docházkové vzdálenosti od metra a hlavních dopravních uzlů tisíce nevyužitých nebo podvyužitých pozemků a současná pravidla jejich zástavbu v duchu čtvrtí krátkých vzdáleností prakticky znemožňují.",
  },
  {
    typ: "p",
    text: "Penalizace staveb na úkor pozemků: Současná daň z 62,5 % vychází z plochy stavby a pouze z 37,5 % z plochy pozemků. Zdanění budov odrazuje od zhodnocování nemovitostí, zatímco zdanění pozemků je minimální. Jak zdůrazňoval již liberální ekonom Milton Friedman, nabídka půdy je fixní, takže její zdanění nesnižuje množství na trhu, ale motivuje k jejímu efektivnímu využívání.[17]",
  },
  {
    typ: "p",
    text: "Nespravedlivá regrese a deformace regionů: Zastaralý systém koeficientů neodpovídá reálným tržním cenám. Výsledkem je, že v Havířově mají metrovou sazbu daně z nemovitosti až třikrát vyšší než v chudších obcích okolo Prahy, ačkoli nemovitosti v Havířově mají poloviční cenu. Domácnosti s nejlevnějšími nemovitostmi tak platí v poměru k jejich hodnotě zhruba pětinásobnou daň oproti vlastníkům nejhodnotnějších nemovitostí.[18]",
  },
  {
    typ: "p",
    text: "Deformace nájemního trhu a daňové úlevy pro investory: Až 70 % nájemních smluv je uzavíráno na 1 rok, což vytváří trvalou nejistotu. Pronajímatelé komerčních bytů ve velké míře (až 68,5 %) využívají 30% výdajový paušál bez dokládání nákladů s efektivním zdaněním hrubého příjmu pouhých 10,5 %, což zakládá nespravedlivou asymetrii vůči zdanění práce zaměstnanců. Stát zároveň neodůvodněně odpouští daň z kapitálových zisků při prodeji investičních bytů skrze časové testy a vynakládá až 10 mld. Kč na podporu hypoték, z níž profitují zejména vysokopříjmové domácnosti.",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "p",
    text: "Pro překonání krize bydlení, zefektivnění alokace kapitálu a rozhýbání trhu práce je nutné realizovat následující provázaná opatření:",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Rozpočtová motivace obcí skrze změnu RUD",
        text: "Změní se Rozpočtové určení daní tak, aby obce, které na svém území povolují novou bytovou výstavbu, získaly přímý podíl na výnosu DPH ze stavebních prací ve výši 3 000 – 8 000 Kč za m² užitné plochy (tj. 210 000 – 560 000 Kč za byt o rozloze 70 m²). Prostředky budou účelově vázány na infrastrukturu (školy, doprava, sítě), čímž se obce promění z odpůrců výstavby v její promotéry (po vzoru kanadského Housing Accelerator Fund).",
      },
      {
        nazev: "Zóny zrychlené výstavby",
        text: "Města získají nástroj pro vymezení zón, kde předem zajistí posudky (EIA, vyjádření k sítím, dopravní řešení). Investor vstupující do zóny získá garanci rozhodnutí do 6 měsíců s uplatněním fikce souhlasu při nečinnosti úřadů.",
      },
      {
        nazev: "Odblokování výstavby 15minutových čtvrtí",
        text: "Hustší zástavbu budeme cíleně soustřeďovat do okruhu do 15 minut chůze od zastávek vlaku, tramvaje, autobusového nádraží, metra a zastávek kapacitních autobusových linek. Obce budou mít ze zákona povinnost upravit své územní regulace tak, aby v okruhu do 15 minut chůze od klíčových zastávek veřejné dopravy umožňovaly bytovou výstavbu o minimální hustotě – např. 200 obyvatel na hektar v Praze, 150 obyvatel na hektar v krajských městech a 100 obyvatel na hektar v malých městech. Stát poskytne metodiky a stanoví obecné parametry i zvláštní pravidla například pro památkové zóny.",
      },
      {
        nazev: "Obnovení obecního bytového fondu a Garanční fond",
        text: "Obnoví se dotační a úvěrové programy pro obce na výstavbu obecních bytů a podporu neziskových bytových družstev (po vzoru Vídně). Obce by též měly stavět byty na svých pozemcích se zapojením soukromého kapitálu (PPP), kde soukromý investor zajistí financování a předá obci část bytů pro obecní nájemní bydlení. Při Státním fondu podpory investic se zřídí Garanční fond, který soukromým majitelům bytů zaručí úhradu nájemného a škod výměnou za uzavření dlouhodobé smlouvy na dobu neurčitou s férovým nájemným.",
      },
      {
        nazev: "Modulární stavby a zrušení parkovacích minim",
        text: "Vytvoří se certifikovaná Státní knihovna typových projektů a dřevostaveb pod záštitou Úřadu rozvoje území (resp. MMR, pokud úřad předjímaný v aktuálně schvalovaném stavebním zákoně nevznikne), které nebudou vyžadovat opakované stavebně – technické posuzování. Nechme na trhu, kolik má mít dům parkování: zruší se plošná povinnost zajistit minimální počty parkovacích míst v docházkové vzdálenosti od MHD, což sníží přímé náklady na byt o 700 000 až 1 000 000 Kč.[21]",
      },
      {
        nazev: "Odstranění daňových deformací trhu",
        text: "Úprava paušálů a nákladů: Pro pronajímatele bytů k dlouhodobému bydlení se zvýší paušální výdaje z 30 na 40 %; pro pronajímatele účtující náklady se omezí jejich uznatelnost na max. 60 % příjmů z nájmu. Zrušení časového testu pro investiční byty: Zruší se daňové osvobození při prodeji investiční nemovitosti, pokud nesloužila k vlastní bytové potřebě. Maximálně se využije povinný reporting dat od ubytovacích platforem (Airbnb) k výběru všech daní z krátkodobých pronájmů.",
      },
      {
        nazev: "Vyšší daň z nemovitostí z prázdných bytů, domů a pozemků",
        text: "V dnešním systému se vyplácí nechávat byty, domy a pozemky ležet ladem, zatímco obec musí financovat okolní infrastrukturu a služby, bez kterých by tyto nemovitosti neměly hodnotu. Prázdný byt, dům nebo nevyužitý pozemek zároveň vytlačuje výstavbu dále do polí a vyvolává tak další dopravní zátěž a tlak na veřejné výdaje.",
      },
      {
        nazev: "Komplexní reforma daně z nemovitostí: přesun směrem k Land Value Tax",
        text: "Dnešní daň z nemovitostí zdaňuje hlavně to, o co se lidé zasloužili svou prací a investicemi – tedy budovy. Naopak relativně málo se zdaňuje to, o co se zasloužila příroda, stát a obec – tedy pozemky a jejich hodnotu, kterou určuje kvalita lokality, infrastruktury a dostupnost příležitostí. Toto odrazuje od investic a efektivního využívání pozemků, naopak podporuje jejich držení ladem pro pasivní zhodnocení. Dnešní daň je též velmi slabě svázaná s hodnotou nemovitostí, takže prohlubuje majetkové nerovnosti. Chceme daňovou reformu, která přesune hlavní váhu daně z nemovitostí na pozemky a sníží váhu budov. Výše daně z pozemků se bude odvíjet od cenových map, zachycujících typickou tržní cenu v daném katastrálním území.[22]",
      },
      {
        nazev: "Komplexní rekodifikace územního plánování",
        text: "Dokončit a zavést do praxe reformu, jejíž koncept vznikl na MMR v minulém volebním období.[23] Vychází z dobré praxe západoevropských zemí a jejími základními prvky jsou:",
      },
    ],
  },
  {
    typ: "ul",
    polozky: [
      "Územní plány mají vytyčovat základní parametry rozvoje (uliční čáry, veřejná prostranství, chráněná území a etapizaci rozvoje města), nemají diktovat funkční užití tak detailně jako dnes a nemají samy o sobě zakládat právo stavět.",
      "Posílení jistoty investorů v tom, co reálně mohou stavět, zavedením relativně detailních zástavbových plánů. Konfliktní zájmy ohledně charakteru výstavby se mají vypořádat při tvorbě zástavbových plánů, které budou garantovat právo stavět. Pro povolení stavby budou úřady posuzovat už jen soulad se zástavbovým plánem.",
      "Zákonem jasně ukotvené flexibilní nástroje financování rozvoje, jako jsou odvody za zhodnocení pozemků nebo plánovací smlouvy.",
      "Podpora meziobecní spolupráce v plánování rozvoje a možnost tvorby plánů na úrovni metropolitních oblastí.",
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "ul",
    polozky: [
      "Naším cílem je, aby se bydlení znovu stalo dostupným pro běžně pracující lidi. Chceme dlouhodobě snížit poměr mezi cenou bytu a průměrnou mzdou pod 10 ročních platů a zajistit, aby náklady na nájem nepřesahovaly 30 % průměrné mzdy. To znamená, že lidem zůstane více peněz na běžný život a vlastní bydlení nebude nedosažitelným snem.",
      "Proto chceme zvýšit výstavbu na 50 000 nových bytů ročně, především ve městech, kde jsou ceny nejvyšší. Nové byty mají vznikat zejména v okolí uzlů veřejné dopravy, ve čtvrtích krátkých vzdáleností a brownfieldech a podobně nevyužívaných plochách uvnitř měst namísto dalšího rozšiřování zástavby do volné krajiny. Vyšší nabídka bytů tam, kde je lidé skutečně potřebují, pomůže postupně snižovat tlak na růst cen.",
      "Silnější roli budou mít také obce. Chceme průběžně zvýšit podíl obecních bytů na alespoň 7,2 %, tedy na dvojnásobek oproti dnešku, a zároveň snižovat počet prázdných bytů ve městech. Díky tomu bude dostupné bydlení dosažitelnější pro rodiny, mladé lidi i zaměstnance profesí, které jsou pro fungování měst nezbytné.",
      "Rychlejší výstavba pomůže celé ekonomice. Naším cílem je zkrátit délku povolovacích procesů u bytových domů na méně než 1,5 roku, aby nové bydlení sloužilo lidem výrazně rychleji. Dostupnější bydlení zároveň zvýší mobilitu pracovní síly, protože lidé budou moci snáze bydlet tam, kde najdou práci nebo studium.",
    ],
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "OECD, 2021. Brick by Brick: Building Better Housing Policies. Paris: OECD Publishing." },
  { index: 2, citace: "Deloitte, 2025. Property Index: Overview of European Residential Markets (14th edition). Praha: Deloitte Central Europe." },
  { index: 3, citace: "Česká národní banka, 2024. Zpráva o finanční stabilitě – podzim 2024: Vývoj ukazatelů dostupnosti bydlení a dluhového zatížení domácností. Praha: ČNB." },
  { index: 4, citace: "Český statistický úřad, 2025. Vývoj indexů cen nemovitostí a mezd v ČR v letech 2014–2024. Praha: ČSÚ." },
  { index: 5, citace: "Cenová Mapa.org & Dataligence, 2026. Kvartální zpráva o rezidenčním trhu v ČR: Q1 2026. Praha: Dataligence s.r.o." },
  { index: 6, citace: "Ministerstvo pro místní rozvoj ČR, 2024. Vyhláška č. 146/2024 Sb., o požadavcích na výstavbu a její dopad na flexibilitu projektování. Praha: MMR ČR." },
  { index: 7, citace: "World Bank, 2020. Doing Business 2020: Comparing Business Regulation in 190 Economies – Dealing with Construction Permits. Washington, D.C.: The World Bank." },
  { index: 8, citace: "Glaeser, E. L. a Gyourko, J., 2018. The Economic Implications of Housing Supply. Journal of Economic Perspectives, 32(1), s. 3–30." },
  { index: 9, citace: "Český statistický úřad, 2026. Stavebnictví a bytová výstavba za rok 2025 (předběžné výsledky). Praha: ČSÚ." },
  { index: 10, citace: "Ministerstvo pro místní rozvoj ČR a Český statistický úřad, 2024. Analýza neobydlených bytů v ČR na základě dat ze Sčítání lidu, domů a bytů 2021 a spotřeby elektřiny. Praha: MMR ČR / ČSÚ." },
  { index: 11, citace: "Garcia-López, M. À., Jofre-Monseny, J., Martínez-Mazza, R. a Segú, M., 2020. Do short-term rental platforms affect housing markets? Evidence from Airbnb in Barcelona. Journal of Urban Economics, 119, 103278." },
  { index: 12, citace: "Stadt Wien & Statistik Austria, 2024. Wiener Wohnbaubericht 2024: Gemeindewohnungen und geförderter Wohnbau im internationalen Vergleich. Wien: Magistrat der Stadt Wien." },
  { index: 13, citace: "Kadi, J., 2015. Recommodifying Housing in Formerly 'Red Vienna'? Housing, Theory and Society, 32(3), s. 247–265." },
  { index: 14, citace: "PLATFORMA PRO SOCIÁLNÍ BYDLENÍ, 2025. Nájmy, energie, daně, dávky, veřejná výstavba: řešení krize bydlení existují" },
  { index: 15, citace: "Sýkora, L. a Ouředníček, M., 2014. Sprawling Post-Communist Metropolis: Commercial and Residential Suburbanisation in Prague and Brno. In: Stanilov, K. a Sýkora, L. (eds.), Confronting Suburbanization: Urban Decentralization in Post-Socialist Central and Eastern Europe. Oxford: Wiley-Blackwell, s. 209–233." },
  { index: 16, citace: "Litman, T., 2026. Understanding Smart Growth Savings: Evaluating Economic and Fiscal Benefits of Compact Urban Development. Victoria: Victoria Transport Policy Institute." },
  { index: 17, citace: "Friedman, M., 1978. Taxation, Inflation and the Role of Government. San Francisco: The Fraser Institute." },
  { index: 18, citace: "PAQ RESEARCH, CENTRUM VEŘEJNÝCH FINANCÍ a IDEA PŘI CERGE-EI, 2025. Chytřejší daně. Praha: PAQ Research." },
  { index: 19, citace: "CMHC (Canada Mortgage and Housing Corporation), 2023. Housing Accelerator Fund: Best Practices for Municipal Incentives. Ottawa: Government of Canada." },
  { index: 20, citace: "Moreno, C., Allam, Z., Chabaud, D., Gall, C. a Pratlong, F., 2021. Introducing the „15-Minute City“: Sustainability, Resilience and Place Identity for Post-Pandemic Urbanism. Smart Cities, 4(1), s. 93–111." },
  { index: 21, citace: "Shoup, D., 2005. The High Cost of Free Parking. Chicago: American Planning Association (Planners Press)." },
  { index: 22, citace: "Dye, R. F. a England, R. W., 2010. Land Value Taxation: Theory, Evidence, and Practice. Cambridge, MA: Lincoln Institute of Land Policy." },
  { index: 23, citace: "Ministerstvo pro místní rozvoj ČR, 2023. Koncepce rekodifikace územního plánování v ČR: Přechod k flexibilnímu plánování a posílení zástavbových plánů. Praha: MMR ČR." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "RUD (rozpočtové určení daní)", vysvetleni: "Pravidlo, podle kterého se rozdělují peníze z daní mezi stát a jednotlivé obce. Rozhoduje o tom, kolik peněz obec z daní dostane." },
  { pojem: "Zóna zrychlené výstavby", vysvetleni: "Vymezené území ve městě, kde úřad předem připraví potřebné podklady, takže investor dostane rozhodnutí rychleji a s jistotou." },
  { pojem: "Fikce souhlasu", vysvetleni: "Pravidlo, podle kterého se žádost považuje za schválenou, pokud na ni úřad do stanovené lhůty neodpoví." },
  { pojem: "EIA (posouzení vlivu na životní prostředí)", vysvetleni: "Předem zpracovaný posudek, který ukáže, jaký vliv bude mít stavba na přírodu, hluk, dopravu a okolí." },
  { pojem: "15minutová čtvrť", vysvetleni: "Čtvrť, kde se většina běžných věcí, jako práce, obchody, školka nebo lékař, dá dosáhnout pěšky do patnácti minut. Bydlení se v ní staví hustěji poblíž zastávek veřejné dopravy." },
  { pojem: "Brownfield", vysvetleni: "Dříve využívaná plocha ve městě, například stará továrna nebo sklad, která se dá znovu využít pro novou výstavbu." },
  { pojem: "PPP (partnerství veřejného a soukromého sektoru)", vysvetleni: "Spolupráce obce a soukromé firmy na jednom projektu. Firma zajistí peníze a stavbu, obec dostane část výsledku, například byty pro své nájemníky." },
  { pojem: "Garanční fond", vysvetleni: "Fond, který majitelům bytů zaručí úhradu nájemného a případných škod. Na oplátku musí majitel uzavřít dlouhodobou smlouvu s férovým nájemným." },
  { pojem: "Modulární a typový projekt", vysvetleni: "Hotový návrh stavby, který se může opakovaně použít bez nového složitého posuzování. Modulární stavba se skládá z předem vyrobených dílů, které se na místě jen složí dohromady." },
  { pojem: "Parkovací minima", vysvetleni: "Pravidlo, které ukládá stavitelům povinně vybudovat určitý počet parkovacích míst u každého nového domu. Jeho zrušení nechává na trhu, kolik parkovacích míst dům bude mít." },
  { pojem: "Výdajový paušál", vysvetleni: "Daňová úleva, při které pronajímatel nemusí dokládat skutečné náklady na byt a od příjmu z nájmu si odečte pevně stanovený podíl, například třicet procent." },
  { pojem: "Časový test", vysvetleni: "Pravidlo, podle kterého se při prodeji bytu neplatí daň z výdělku, pokud ho majitel držel dostatečně dlouho. Strategie navrhuje tuto výjimku zrušit u investičních bytů, které nesloužily k vlastnímu bydlení." },
  { pojem: "Land Value Tax (daň z hodnoty pozemků)", vysvetleni: "Daň, která se počítá hlavně z hodnoty pozemku a méně z budovy na něm. Vlastníci pozemků držených ladem tak platí více a má je to motivovat k jejich využití." },
  { pojem: "Zástavbový plán", vysvetleni: "Podrobný plán, který předem určí, co se na daném místě smí postavit. Když je stavba v plánu povolena, úřad už jen kontroluje, zda do plánu sedí." },
  { pojem: "Plánovací smlouva", vysvetleni: "Smlouva mezi obcí a stavebníkem, ve které se domluví, kdo a jak zaplatí náklady spojené s rozvojem území." },
  { pojem: "NIMBY", vysvetleni: "Anglická fráze „not in my backyard“, česky „ne na mém dvorku“. Označuje postoj lidí, kteří nové stavby obecně podporují, ale proti těm poblíž svého domova se ohrazují." },
];
