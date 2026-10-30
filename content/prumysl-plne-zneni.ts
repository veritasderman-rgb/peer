export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "h3",
    text: "Úvod pilíře 3",
  },
  {
    typ: "p",
    text: "Českou ekonomiku brzdí dvě věci najednou. Umíme vyrobit a vyvézt téměř cokoli, patříme v tom k první desítce světa,[101] jenže většinou jako subdodavatelé: produkt, značka a zákazník patří někomu jinému, a tak od nás jen na dividendách ročně odteče přes 300 miliard korun.[102] A tam, kde ekonomika stojí na energii, doplácíme dvakrát. České domácnosti platily ve druhém pololetí 2025 v přepočtu na kupní sílu druhou nejdražší elektřinu v Evropské unii[103] a za dovoz uhlí, ropy, plynu a ropných produktů odešlo v roce 2025 do zahraničí zhruba 262 miliard korun.[104] Střední průmysloví odběratelé přitom platili za samotnou elektřinu bez daní o 7 % víc, než činil průměr EU.[105]",
  },
  {
    typ: "p",
    text: "Drahá energie přitom na všechny stejně. Zatímco softwarovou firmu, která z Prahy prodává do celého světa, trápí chybějící kapitál a talent, zpracovatelský průmysl zase potřebuje stabilní a dostupné energie. Průmyslem však už nemáme myslet jen továrny, patří do něj i software, data a služby.",
  },
  {
    typ: "p",
    text: "Tento pilíř proto řeší obojí společně. První kapitola vede od subdodávek k vlastním výrobkům a značkám, druhá k dostupné a stabilní energii z domácích zdrojů, třetí k prostředí, ve kterém nové nápady najdou kapitál i prvního zákazníka. A ve všech třech platí totéž: neotevíráme nové dotační programy, uvolňujeme, co leží ladem. Úspory lidí v penzijních fondech, které po odečtení inflace prodělávají, evropské peníze rozpouštěné v dotacích, zablokovanou kapacitu elektrické sítě i teplo, které dnes vypouštíme do řek a vzduchu.",
  },
  {
    typ: "p",
    text: "Podle Indexu ekonomické komplexity, který měří, jak složité a vyspělé věci dokáže země vyrábět a vyvážet, je Česko sedmou nejkomplexnější ekonomikou světa.[1] V životní úrovni měřené HDP na obyvatele v paritě kupní síly jsme ale až kolem čtyřicátého místa.[2] Vyrábíme jako elita, bohatneme jako průměr.",
  },
  {
    typ: "p",
    text: "Tento rozdíl ukazuje, že jsme pořád hodně subdodavatelská ekonomika: z koncového výrobku se u nás za tvrdě vytendrovanou, stlačenou cenu vyrábí díl nebo polotovar, zatímco návrh, značka, software a přístup k zákazníkovi, tedy kroky, ve kterých se realizuje většina marže, sedí jinde. Zahraniční investice nám po roce 1989 pomohly nastartovat ekonomiku a přinesly know-how i slušně placená místa. Model, ve kterém hodnotu vytvořenou u nás prodává a oceňuje někdo jiný, ale má strop. Dobře placené místo v subdodávce není totéž jako dlouhodobá prosperita země.",
  },
  {
    typ: "p",
    text: "Cesta výš přitom nevede jen přes továrny. Naše nejviditelnější globální firmy nevyrábějí žádné hmotné zboží: Rohlík utržil přes 27 miliard korun v pěti evropských zemích,[3] GEN (dříve Avast) s dvojím sídlem v Praze a v USA utržil ve fiskálním roce 2026 za kyberbezpečnost, digitální identitu a finanční služby 5 miliard dolarů,[4] hotelový systém Mews, založený v Praze, má hodnotu 2,5 miliardy dolarů[5] a Kiwi.com podle výsledků za rok 2023 prodával 50 tisíc letenek denně.[6]",
  },
  {
    typ: "p",
    text: "Společné mají jedno: vlastní produkt, vlastní značku a mají vlastního zákazníka. Přesně to potřebujeme naučit zbytek ekonomiky, od strojíren po biotech. A ještě něco mají společné: rostly ze zahraničního rizikového kapitálu, protože domácí nebyl po ruce.[7] I proto chceme, aby příští generaci šampionů uměl a měl kapacitu financovat a vlastnit také český kapitál.",
  },
  {
    typ: "p",
    text: "Kapitola proto stojí na čtyřech pilířích. Stát má být pro inovativní firmy prvním zákazníkem. K prosperitě se nedá prodotovat, jde pro ni ale vytvořit příhodné prostředí: dostupnější domácí kapitál, rychlejší povolování, přístup k datům, stabilním energiím a talentu. Podporu si zaslouží přidaná hodnota, ne počet obsazených míst. A měřítkem úspěchu jsou domácí šampioni, firmy, které mají vlastnictví, vývoj, značku i zisk v Česku.",
  },
  {
    typ: "h3",
    text: "V čem je problém",
  },
  {
    typ: "p",
    text: "Většinu průmyslu řídí centrály odjinud a větší část marže zůstává u nich. Firmy pod zahraniční kontrolou vytvářejí 60 % přidané hodnoty českého zpracovatelského průmyslu[8] a 83 % jeho vývozu (údaj za rok 2024).[9] Subdodavatel si přitom většinou nediktuje ceny. Marže dnes leží v návrhu, softwaru, datech, značce a servisu, tedy u toho, kdo vlastní koncového zákazníka. A kdo si nediktuje ceny, narazí při zvyšování mezd na strop mnohem dřív než ten, kdo prodává vlastní produkt. Výjimky jako Škoda Auto, která má v Česku vývoj, design i značku, ukazují, že to jde i pod zahraničním vlastníkem.",
  },
  {
    typ: "p",
    text: "Zisky z naší práce odtékají pryč. Zisky zahraničních vlastníků českých firem dosáhly v roce 2025 sedmi procent HDP, tedy 602 miliard korun. Téměř 340 miliard z toho odešlo v dividendách do zahraničí a přes 262 miliard vlastníci reinvestovali.[10] Hlubší schodek prvotních důchodů, tedy rozdíl mezi tím, co ze země odteče na ziscích a mzdách, a tím, co přiteče, mají v Evropské unii už jen finanční centra jako Irsko, Lucembursko, Kypr a Malta a vedle nich Bulharsko.[11] Nejde o to zahraničním firmám cokoli vyčítat, chovají se racionálně. Jde o to, že nemáme dost vlastních firem, kterým by dividendy tekly opačným směrem.",
  },
  {
    typ: "p",
    text: "Do vlastního výzkumu dáváme málo a jeho výsledky drží jiní. Výdaje na výzkum a vývoj stagnují na 1,82 % HDP, zatímco průměr EU je 2,24 %[12] a Německo s Rakouskem přesahují 3 %. A i to málo nám patří jen zčásti: výdaje podnikatelského sektoru na výzkum a vývoj u nás v roce 2023 ze zhruba dvou třetin provedly firmy pod zahraniční kontrolou,[13] které patenty často přihlašují prostřednictvím mateřských firem v Německu nebo USA.[14] Vyvíjíme tu skvělé věci, licenční poplatky za ně ale tečou jinam. Veřejný výzkum na univerzitách a v Akademii věd je přitom silný, jen se jeho výsledky málokdy promítnou do ekonomiky.",
  },
  {
    typ: "p",
    text: "Veřejná podpora odměňuje objem a zavedené hráče. Na investičních pobídkách stát přislíbil desítky miliard korun. Do roku 2019 přitom zákon vůbec neumožňoval reagovat na nízkou nezaměstnanost a 96 % pobídek šlo do zpracovatelského průmyslu bez podmínky vyšší přidané hodnoty.[15] Analýzy institutu IDEA při CERGE-EI dodávají druhou půlku obrazu. Ve zkoumané soutěži programu ALFA studie u velkých podniků nenalezla statisticky významný dodatečný efekt dotací na jejich vlastní výdaje na výzkum, byť autoři upozorňují, že výsledky nelze vykládat kauzálně.[16] Veřejná podpora inovací navíc dlouhodobě teče především velkým zavedeným firmám, ne těm, které rostou.[17] Přitom ne každá investice je pro nás stejně cenná: výrobce čipů, který k nám umístí i vývoj, přinese ekonomice řádově víc než další distribuční hala s nízkými maržemi.",
  },
  {
    typ: "p",
    text: "Nástroje, které jinde fungují, u nás skomírají. Daňový odpočet na výzkum a vývoj, nejplošnější a nejméně byrokratický nástroj podpory, využilo v roce 2024 jen 721 firem, nejméně od roku 2010 a téměř o polovinu méně než v rekordním roce 2015. Odpočet tak využila jen zhruba čtvrtina soukromých firem, které výzkum provádějí, a daňová podpora odpovídala 4 % jejich výdajů na výzkum.[18] V posledním mezinárodním srovnání za rok 2023 kryla daňová podpora v Česku 3 % firemních výdajů na výzkum, v Polsku 6 %, na Slovensku 7 % a v Rakousku 8 %.[19] Poradci i firmy se shodují na příčině: nejednotný výklad a strach z doměrků při kontrolách.[20] Podobné je to s návratnými nástroji: do záruk, úvěrů a kapitálových vstupů zavázalo Česko z evropské kohezní obálky 2014–2020 ke konci roku 2022 asi 850 milionů eur.[21] Zhruba čtyřikrát menší Litva jich v přepočtu na obyvatele zavázala dvaapůlkrát víc a ke konečným příjemcům dostala 2,7krát víc.[22] A na světové trhy stát firmám může pomáhat mnohem víc: státní pojišťovna EGAP pojistila v roce 2024 vývoz za 41,4 miliardy korun[23] a v roce 2025 objem klesl na 33,7 miliardy.[24]",
  },
  {
    typ: "p",
    text: "Znalosti zůstávají v šuplících a úspory v dluhopisech. Podle poslední ucelené analýzy z roku 2022 působilo v Česku jen 84 univerzitních spin-offů, firem zakládaných k využití výsledků výzkumu, a ročně jich vzniká kolem šesti.[25] Ke konci roku 2025 jich bylo evidováno 86, čistý přírůstek za tři roky tak dělají dvě firmy.[26] Samotná ETH Zurich (Švýcarsko) loni pomohla založit 46 nových firem, z toho 24 spin-offů.[27] Zakladatelé popisují, že vyjednávání s univerzitou trvá i dva roky.[28] Kapitál na růst přitom máme, často jen leží ladem: české penzijní fondy držely k březnu 2026 zhruba 63 % úspor v dluhopisech a dalších 17 % ve vkladech[29] a souhrnný reálný výnos poskytovatelů penzijních produktů je podle OECD záporný na všech dlouhodobých horizontech, za posledních 20 let – 1,3 % ročně.[30] U zaměstnaneckých podílů se ledy pohnuly až napotřetí: po třech změnách pravidel za tři roky platí od ledna 2026 režim kvalifikovaných zaměstnaneckých opcí, ve kterém zaměstnanec daní příjem až při prodeji podílu a neplatí z něj pojistné odvody. Vedle něj zůstává obecný režim odloženého zdanění.[31] Startupová scéna ho vítá, dosáhnou na něj ale jen menší firmy a při porušení podmínek hrozí zpětné doměření daně a pojistného.[32]",
  },
  {
    typ: "h3",
    text: "Cíle",
  },
  {
    typ: "p",
    text: "Cílem je ekonomika, která větší část hodnoty, kterou vytváří, také vlastní a prodává. Konkrétně chceme:",
  },
  {
    typ: "ul",
    polozky: [
      "Vrátit výdaje na výzkum a vývoj nad 2,1 % HDP a časem dosáhnout 2,5 % HDP; podíl domácích firem na podnikovém výzkumu přitom zvýšit z dnešní třetiny na 45 %.",
      "Postupně vyčlenit až 1 % zakázek veřejných zadavatelů, podle objemu roku 2024 zhruba 8,4 miliardy korun ročně, na tvorbu nových, inovativních řešení, která ještě neexistují.",
      "Aby vzniklo 200 nových univerzitních spin-offů s vlastními tržbami nebo externí investicí, tedy více než pětinásobek dnešního tempa.",
      "Snížit schodek důchodů z přímých zahraničních investic z dnešních 5,2 % HDP[33] pod 4 % HDP.",
      "Překonat v HDP na obyvatele průměr Evropské unie, ze kterého dnes dosahujeme 92 %.[34]",
    ],
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "p",
    text: "Naše komparativní výhoda neleží v levné výrobě ani v obecné „digitalizaci“. Leží tam, kde se potkává strojírenská přesnost se softwarovým inženýrstvím: průmyslová umělá inteligence, strojové vidění, řídicí systémy, kyberbezpečnost provozních technologií, energetická flexibilita, jaderný dodavatelský řetězec a výkonová elektronika. A stejně tak v čistě digitálních službách, kde už dnes české firmy obsluhují zákazníky po celém světě. Opatření řadíme do čtyř linií: první dělá ze státu prvního zákazníka, druhá uvolňuje kapitál a nahrazuje dotace chytřejšími nástroji, třetí přesměrovává podporu na přidanou hodnotu a čtvrtá otevírá cestu z laboratoří na světové trhy.",
  },
  {
    typ: "h3",
    text: "1. Stát jako první zákazník, ne dotační ústav",
  },
  {
    typ: "p",
    text: "Nejsilnějším nástrojem státu není dotace, ale poptávka. Český trh veřejných zakázek dosáhl v roce 2024 téměř bilionu korun,[35] a přesto stát nakupuje vývoj nových řešení jen výjimečně. Program BETA Technologické agentury je v bilionovém trhu kapkou v moři. Přitom právě první zakázka je to, co začínající firmě chybí nejvíc: reference na domácím trhu, se kterou může vyrazit do světa. Začneme proto u státních zadavatelů a postupně vyčleníme až 1 % zakázek veřejných zadavatelů, podle objemu roku 2024 zhruba 8,4 miliardy korun ročně, na zadávání vývoje řešení, která ještě neexistují. Plný objem předpokládá, že se ke státu přidají i samosprávy a další zadavatelé. Duševní vlastnictví zůstane dodavateli a stát získá trvalou licenci pro vlastní užití. Z velké části jde o přesun existujících nákupů, zbytek je investice s rizikem, které k vývoji patří. Vzorem jsou Spojené státy, kde velké federální agentury musejí nejméně 3,2 % svého externího výzkumného rozpočtu zadávat malým firmám a práva k výsledkům nechávají jim,[36] a britský program Contracts for Innovation.[37] Kongres program v roce 2026 znovu prodloužil do roku 2031.[38] Vedlejší efekt je, že stát dostane lepší systémy, než jaké mu dnes dodávají zavedení dodavatelé.",
  },
  {
    typ: "p",
    text: "Největší novou poptávkou za posledních třicet let je obrana. Spojenci se v Haagu zavázali zvýšit obranné výdaje do roku 2035 na 5 % HDP, z toho 3,5 % na jádrové schopnosti.[39] Nové hrozby jsou zároveň nové příležitosti: Evropa buduje vrstvenou protidronovou obranu[40] a české firmy už dnes umějí být u toho. Výrobce bezpilotních letounů Primoco získal vojenský typový certifikát podle standardu NATO[41] a loni překonal miliardu korun nových objednávek.[42] Aby z obranného rozpočtu vznikla technologická základna, a ne montážní linka, budeme u akvizic nad 1 miliardu korun (všude, kde to bezpečnostní zájem státu a evropská pravidla umožňují) vyžadovat průmyslovou spolupráci vázanou na společný vývoj a podíl českých firem na know-how, ne jen na výrobu licencovaných dílů. Přesně tak postupuje Polsko, které si u nákupu korejských tanků smluvně zajistilo transfer technologií a výrobu ve vlastních závodech.[43]",
  },
  {
    typ: "h3",
    text: "2. Kapitál a chytřejší nástroje místo dotačního labyrintu",
  },
  {
    typ: "p",
    text: "Nejrychlejší pomoc investicím nevede přes žádosti a komise, ale přes daňová pravidla. Ta dnes stojí na dvou různých nástrojích a každý má svou slabinu. Prvním je odpočet na výzkum a vývoj: firma si od roku 2026 může od základu daně odečíst 150 % nákladů na výzkum do 50 milionů korun.[44] Na papíře štědrá podpora, kterou ale kvůli nejednotnému výkladu a strachu z doměrků využívá jen zlomek firem. Proto k odpočtu doplníme to, co firmám chybí nejvíc: závazné předběžné posouzení projektu a jednotný výklad při kontrolách, aby se ho nebály čerpat.[45]",
  },
  {
    typ: "p",
    text: "Druhým nástrojem jsou odpisy investic. Stroj, robota nebo software dnes firma odepisuje z daní řadu let a zrychlené odpisy od roku 2026 skončily úplně. Nově proto zavedeme možnost odepsat celou investici do výzkumu, automatizace a softwaru hned v prvním roce. Pro rozpočet jde z velké části o odklad příjmu. Britská zkušenost s okamžitými odpisy strojů a zařízení ukazuje, že většina výpadku se státu v dalších letech vrátí, část je ale trvalý náklad, se kterým počítáme.[46] Pro obory z evropského seznamu strategických technologií zvážíme další zvýhodnění.",
  },
  {
    typ: "p",
    text: "Dotace tam, kde nejsou nezbytné, nahradíme návratnými nástroji. Nejsme naivní, finanční podporu firmám poskytují všechny vyspělé země a bez ní bychom v konkurenci neobstáli. Jde hlavně o její formu. Záruka, úvěr nebo kapitálový vstup se státu vracejí a nedeformují trh tolik jako dotace, které rozdělují úředníci podle tabulek. Podíl evropských fondů rozdělovaných přes Národní rozvojovou banku formou záruk, úvěrů a kapitálových vstupů zvýšíme násobně, na úroveň lídrů, jako je Litva.[47] Posílíme exportní financování a pojištění, aby na ně dosáhlo více firem včetně menších, a po vzoru francouzské Bpifrance, která provozuje fond na spolufinancování zahraničních akvizic domácími firmami,[48] vytvoříme obdobný nástroj Národní rozvojové banky a České exportní banky. Dnes umíme českou firmu podpořit, aby vyvezla zboží. Neumíme ji ale podpořit, aby koupila zahraniční firmu se značkou a distribucí, tedy přesně to, čím se vlastní hodnotový řetězec buduje.",
  },
  {
    typ: "p",
    text: "Odblokujeme i domácí kapitál a talent. Penzijní fondy přebudujeme po skandinávském vzoru, aby úspory lidí za férových podmínek skutečně pracovaly s nižšími poplatky a mnohem větším podílem akcií, infrastruktury a růstových investic místo dnešní převahy dluhopisů.[49] Pro českou ekonomiku to postupně znamená stovky miliard dlouhodobého kapitálu, o který se dnes připravujeme.",
  },
  {
    typ: "h3",
    text: "3. Podpora přidané hodnoty, ne počtu hlav",
  },
  {
    typ: "p",
    text: "Otázku pro veřejnou podporu firem měníme z „Kolik lidí zaměstnáváš?“ na „Jakou přidanou hodnotu na pracovníka vytvoříš?“. Novela investičních pobídek z roku 2019 vykročila správným směrem, obrat ale dokončen není. Kritérium počtu pracovních míst, správné v roce 1998, kdy jsme měli prázdné haly, ze systému odstraníme úplně a podporu poskytneme jen projektům s přidanou hodnotou na zaměstnance výrazně nad průměrem odvětví, ideálně s vývojem umístěným v Česku. Objem podpory zůstane stejný, změní se jen adresát: realizace novelou zákona o investičních pobídkách do dvou let. Stát tím získá i vodítko, kterou investici přivítat a kterou nechat jít. Ne každý investor je pro nás stejně dobrý a musíme vědět proč.",
  },
  {
    typ: "p",
    text: "U veřejné podpory výzkumu je vazba přímá: z veřejných peněz vzniká duševní vlastnictví, a to má zůstat doma. Kdo čerpá veřejnou podporu na výzkum a vývoj, udrží vzniklá práva k výsledkům u příjemce. Jejich prodej nebo výhradní licencování mimo Evropský hospodářský prostor bude znamenat vrácení podpory. Pravidlo nastavíme v mezích evropských pravidel veřejné podpory a jeho smysl je prostý: dnešní nastavení podpory nezajišťuje, aby duševní vlastnictví vzniklé s veřejnou podporou zůstávalo v české ekonomice. Zahraniční centrály u nás běžně vyvíjejí a patenty přihlašují doma.[50] Netýká se to lidí, ti se pohybují svobodně. Týká se to práv k výsledkům zaplaceným z českých daní.",
  },
  {
    typ: "h3",
    text: "4. Z laboratoří na světové trhy",
  },
  {
    typ: "p",
    text: "Univerzitní spin-off nesmí být dvouleté právní dobrodružství. Každý transfer je jiný, někde dává smysl licence, jinde podíl, exit bonus nebo sdílení výnosů, proto nebudeme předepisovat jednotnou šablonu, ale vydáme sadu předschválených vzorových smluv pro nejčastější modely spolupráce a s čerpáním veřejné podpory na transfer spojíme lhůtu, do kdy musí univerzita o nabídce zakladatelů rozhodnout. Metodika hodnocení vysokých škol a část institucionální podpory nově zohlední výsledky transferu: licenční příjmy, získaný soukromý kapitál a přežití spin-offů, ne jen publikační výstupy. Cíl je 200 nových spin-offů s tržbami nebo externí investicí mezi lety 2027 a 2032. Pro srovnání, samotná ETH Zurich dnes pomáhá založit desítky nových firem ročně.[51]",
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Každé z opatření míří na stejnou veličinu: podíl hodnoty vytvořené v Česku, která v Česku i zůstane. První zakázky od státu a obranná poptávka dají domácím firmám reference, se kterými se prodává do světa. Zrychlené odpisy a předvídatelný odpočet rozproudí soukromé investice do vývoje a automatizace rychleji než jakýkoliv dotační program. Návratné nástroje, penzijní kapitál a použitelné zaměstnanecké podíly přivedou do firem peníze i talent, které dnes leží ladem. A pobídky přepnuté na přidanou hodnotu zajistí, že podpora půjde těm, kdo zemi posouvají výš, ne těm, kdo jen obsazují pracovní sílu a síťovou kapacitu.",
  },
  {
    typ: "p",
    text: "Říkáme i druhou stranu účtu. Zrychlené odpisy krátkodobě sníží výběr daně z příjmů právnických osob, efektivně jde ale o odklad, který se z většiny vrátí. Přepnutí pobídek na hodnotu znamená, že část velkých objemových investic půjde jinam, a to je záměr. Podmínka udržení práv k výsledkům může odradit část korporátních vývojových center. Kompenzujeme ji tím, že Česko bude nejrychlejším a nejvíce předvídatelným místem pro pokročilé podnikání v regionu. A neslibujeme, že tato opatření zvýší mzdy příští rok. Vytvoří ale pracovní místa, která vyšší mzdy unesou: vývojová pracoviště, vlastní produkty a podíly zaměstnanců na úspěchu firem. Mzdy dlouhodobě zvýší až to, že budeme vlastnit větší podíl přidané hodnoty, která na našem území vzniká.",
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "Harvard Growth Lab, 2024. The Atlas of Economic Complexity, Country Rankings. Data za rok 2024. [online]." },
  { index: 2, citace: "MMF, 2026, duben. World Economic Outlook, HDP na obyvatele v paritě kupní síly. [online]." },
  { index: 3, citace: "CzechCrunch, 2025, srpen. Rohlík utržil 27 miliard, skupina poprvé překonala miliardu eur. [online]." },
  { index: 4, citace: "Gen Digital, 2026, květen. Gen Crosses 5B in FY26 Revenue with Growth Accelerating to Double-Digits. [online]." },
  { index: 5, citace: "Mews, 2026, leden. Mews Secures $300 million Investment at $2.5 bn Valuation. [online]." },
  { index: 6, citace: "Kiwi.com, 2024, duben. Kiwi.com reports strong demand and record bookings. [online]." },
  { index: 7, citace: "Eurostat, 2023. Foreign controlled EU enterprises, fats_activ. Data za rok 2023. [online]." },
  { index: 8, citace: "Eurostat, 2024. Trade by type of ownership, ext_tec07, zpracovatelský průmysl, vývoz 2024. [online]." },
  { index: 9, citace: "Český statistický úřad, 2026, březen. Čtvrtletní sektorové účty, 4. čtvrtletí 2025. [online]." },
  { index: 10, citace: "Eurostat, 2026, červenec. Main balance of payments and IIP items as share of GDP, bop_gdp6_q. [online]." },
  { index: 11, citace: "Český statistický úřad, 2025, říjen. Výdaje na výzkum a vývoj ve vztahu k HDP stagnují. [online]." },
  { index: 12, citace: "Eurostat, 2026, březen. GERD by sector of performance, rd_e_gerdtot. [online]." },
  { index: 13, citace: "Český statistický úřad, 2025, říjen. Výdaje na výzkum a vývoj ve vztahu k HDP stagnují. [online]." },
  { index: 14, citace: "CzechInvest, 2026, duben. Analysis of the Involvement of Czech Branches of Foreign Investors in RDI in Czechia. [online]." },
  { index: 15, citace: "NKÚ, 2021, duben. Kontrolní závěr z kontrolní akce č. 20/13, Investiční pobídky. [online]." },
  { index: 16, citace: "IDEA při CERGE-EI, J. Palguta a M. Srholec, 2016, listopad. Stimulují přímé dotace soukromé výdaje firem na VaV? [online]." },
  { index: 17, citace: "IDEA při CERGE-EI, M. Srholec, 2024, říjen. Jaké inovativní firmy (ne)čerpají veřejnou podporu na inovace? [online]." },
  { index: 18, citace: "Český statistický úřad, 2026, duben. Daňová podpora výzkumu a vývoje za rok 2024. [online]." },
  { index: 19, citace: "Český statistický úřad, 2026, duben. Počet firem využívajících daňovou podporu výzkumu a vývoje klesl. [online]." },
  { index: 20, citace: "Deloitte, 2025. Stát zvýšil sazbu daňového odpočtu na výzkum a vývoj na 150 %. [online]." },
  { index: 21, citace: "Evropská komise, 2023, listopad. Summary of data on the progress in financial instruments, ESIF 2014–2020. [online]." },
  { index: 22, citace: "Evropská komise, 2023, listopad. Summary of data on the progress in financial instruments, ESIF 2014–2020. [online]." },
  { index: 23, citace: "EGAP, 2025. Výroční zprávy, pojištěný vývoz za rok 2024. [online]." },
  { index: 24, citace: "EGAP, 2026. Výroční zpráva 2025. [online]." },
  { index: 25, citace: "Transfera.cz, 2022, listopad. Analýza spin-off společností v ČR. [online]." },
  { index: 26, citace: "BusinessInfo.cz, 2025. Česko potřebuje odvahu na spin-offy, evidováno 86 společností. [online]." },
  { index: 27, citace: "ETH Zurich, 2026, únor. More companies founded, new regulations, new accelerator. [online]." },
  { index: 28, citace: "Lupa.cz, 2025, prosinec. Z šuplíku do světa, transfer technologií z univerzit. [online]." },
  { index: 29, citace: "ČNB, 2026, červen. Komentář ke statistice penzijních fondů, stav k 31. 3. 2026. [online]." },
  { index: 30, citace: "OECD, 2025, listopad. Pensions at a Glance 2025, kapitola Investment performance. [online]." },
  { index: 31, citace: "Finanční správa, 2026. Informace k novele zákona o daních z příjmů od 1. 1. 2026. [online]." },
  { index: 32, citace: "CzechCrunch, 2025, červen. Startupy se konečně dočkaly. [online]." },
  { index: 33, citace: "Eurostat, 2026, červenec. Balance of payments by country, důchody z přímých investic, bop_c6_a. [online]." },
  { index: 34, citace: "Eurostat, 2026, červen. GDP per capita in PPS, volume indices, tec00114. [online]." },
  { index: 35, citace: "Ministerstvo pro místní rozvoj ČR, 2025, srpen. Výroční zpráva o elektronizaci a stavu veřejných zakázek v ČR za rok 2024. [online]." },
  { index: 36, citace: "U.S. Small Business Administration, 2023. SBIR/STTR Policy Directive. [online]." },
  { index: 37, citace: "UKRI, 2025. Innovate UK Contracts for Innovation, dříve SBRI. [online]." },
  { index: 38, citace: "U.S. GPO, 2026, duben. Public Law 119-83, reautorizace SBIR/STTR do roku 2031. [online]." },
  { index: 39, citace: "NATO, 2025, červen. The Hague Summit Declaration. [online]." },
  { index: 40, citace: "Evropská komise, 2025, říjen. Defence Readiness Roadmap 2030, European Drone Defence Initiative. [online]." },
  { index: 41, citace: "Primoco UAV, 2025, březen. Historic Military and Civilian Certifications. [online]." },
  { index: 42, citace: "Primoco UAV, 2025, prosinec. One Billion CZK in New Orders. [online]." },
  { index: 43, citace: "Defense News, 2025, srpen. Poland doubles down on South Korean tanks with $6.5 billion deal. [online]." },
  { index: 44, citace: "Deloitte, 2025. Stát zvýšil sazbu daňového odpočtu na výzkum a vývoj na 150 %. [online]." },
  { index: 45, citace: "Český statistický úřad, 2026, duben. Počet firem využívajících daňovou podporu výzkumu a vývoje klesl. [online]." },
  { index: 46, citace: "Institute for Fiscal Studies, 2023, říjen. Full expensing and the corporation tax base. [online]." },
  { index: 47, citace: "Evropská komise, 2023, listopad. Summary of data on the progress in financial instruments. [online]." },
  { index: 48, citace: "Bpifrance, 2022. International Build-Up Fund. [online]." },
  { index: 49, citace: "OECD, 2025, listopad. Pensions at a Glance 2025, kapitola Investment performance. [online]." },
  { index: 50, citace: "CzechInvest, 2026, duben. Analysis of the Involvement of Czech Branches of Foreign Investors in RDI in Czechia. [online]." },
  { index: 51, citace: "ETH Zurich, 2026, únor. More companies founded, new regulations, new accelerator. [online]." },
  { index: 101, citace: "Harvard Growth Lab, 2024. The Atlas of Economic Complexity, Country Rankings. Data za rok 2024. [online]." },
  { index: 102, citace: "Český statistický úřad, 2026, březen. Čtvrtletní sektorové účty, 4. čtvrtletí 2025. [online]." },
  { index: 103, citace: "Eurostat, 2026, květen. Electricity prices for household consumers, 2. pololetí 2025. [online]." },
  { index: 104, citace: "Český statistický úřad, 2025. Zahraniční obchod se zbožím podle CZ-CPA, 1. až 4. čtvrtletí 2025, součet dovozu CZ-CPA 05, 06 a 19. [online]." },
  { index: 105, citace: "Eurostat, 2026, květen. Electricity price statistics, ceny pro ne-domácí odběratele, 2. pololetí 2025. [online]." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "Index ekonomické komplexity", vysvetleni: "Ukazatel, který měří, jak složité a vyspělé výrobky země dokáže vyrábět a vyvážet. Čím výš je země v žebříčku, tím složitější je její výroba. Počítá ho Harvard Growth Lab." },
  { pojem: "Subdodavatel", vysvetleni: "Firma, která vyrábí díl nebo polotovar pro cizí značku a cizího zákazníka. Obvykle si nediktuje cenu a většina marže zůstává u toho, kdo prodává koncovému zákazníkovi." },
  { pojem: "Přidaná hodnota", vysvetleni: "Hodnota, kterou firma vytvoří sama nad rámec toho, co nakoupila od jiných firem. Z ní se platí mzdy, odpisy a zisk." },
  { pojem: "Dividenda", vysvetleni: "Část zisku firmy, kterou firma vyplácí svým vlastníkům. Pokud odchází do zahraničí, z české ekonomiky odtéká." },
  { pojem: "Schodek prvotních důchodů", vysvetleni: "Rozdíl mezi tím, co z české ekonomiky odtéká na ziscích a mzdách, a tím, co do ní přitéká. Čím hlubší schodek, tím víc peněz ze země odchází." },
  { pojem: "VaV (výzkum a vývoj)", vysvetleni: "Systematická práce na nových poznatcích a jejich využití v nových výrobcích, službách a postupech. Měří se jako podíl výdajů na HDP." },
  { pojem: "Daňový odpočet na výzkum a vývoj", vysvetleni: "Možnost firmy odečíst si od základu daně část nákladů na výzkum. Od roku 2026 jde o 150 % nákladů do 50 milionů korun." },
  { pojem: "Zrychlené a okamžité odpisy", vysvetleni: "Odpisy jsou postupné odečítání ceny investice z daní. Zrychlené odpisy ji odečtou dříve, okamžitý odpis celou investici v prvním roce." },
  { pojem: "Návratné nástroje", vysvetleni: "Záruky, úvěry a kapitálové vstupy, které stát poskytne firmě a které se mu vracejí. Na rozdíl od dotace nejde o dar." },
  { pojem: "Investiční pobídky", vysvetleni: "Podpora státu pro velké investice do výroby. Dnes se odvíjí hlavně od objemu investice a počtu pracovních míst." },
  { pojem: "Spin-off", vysvetleni: "Nová firma, kterou založí zaměstnanci nebo studenti univerzity, aby komerčně využila výsledky výzkumu z univerzity." },
  { pojem: "Zaměstnanecké opce (ESOP)", vysvetleni: "Právo zaměstnance získat podíl ve firmě za předem dohodnutou cenu. Od ledna 2026 platí režim, ve kterém se příjem daní až při prodeji podílu a neplatí se z něj pojistné odvody." },
  { pojem: "Rizikový kapitál", vysvetleni: "Peníze investorů, které vkládají do mladých firem s vysokým rizikem výměnou za podíl ve firmě, v naději, že firma silně poroste." },
  { pojem: "Průmyslová spolupráce (offset)", vysvetleni: "Podmínka, při které dodavatel velké zakázky, typicky zbraní nebo techniky, vrátí část její hodnoty zemi kupující formou výroby, vývoje nebo transferu technologií." },
  { pojem: "SBIR", vysvetleni: "Program amerických federálních agentur (Small Business Innovation Research), který je nutí zadávat část výzkumných zakázek malým firmám, a ty si nechávají práva k výsledkům." },
];
