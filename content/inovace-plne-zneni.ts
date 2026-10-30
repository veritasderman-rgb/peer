export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Výraz „inovace“ je dnes tak nadužívaný, že se až může zdát, že jde o bezobsažné klišé. Opak je pravdou: je to zásadní a nenahraditelný prostředek, motor k tomu, jak se stát silnější a výkonnější ekonomikou.",
  },
  {
    typ: "p",
    text: "Ekonomika České republiky dnes těží ze silného, zkušeného a profesionálního výrobního průmyslu a zde vyrobené produkty se dominantně vyváží dál. To dává zemi slušnou výkonnost, ale má to dvě zásadní negativa:",
  },
  {
    typ: "ul",
    polozky: [
      "Výrobní průmysly obvykle neskýtají vysokou přidanou hodnotu; přetvářejí surovinu či polotovar ve výrobek nebo další mezivýrobek a zaplňují tak jen menší část hodnotového řetězce. Současně jsou silně surovinově a energeticky náročné a využívají lidskou práci, která není vždy vysoce kvalifikovaná.",
      "Ještě podstatnější je, že tito výrobci jsou v drtivé míře subdodavatelé pracující na zakázku (typicky zahraničních) finálních výrobců. Jsou tedy pod permanentním nákladovým tlakem zadavatelů, který navíc roste se stále výkonnější a kvalitnější zahraniční konkurencí z Asie, ale třeba i ze států jihovýchodní Evropy.",
    ],
  },
  {
    typ: "p",
    text: "Obě tato negativa budou navíc posilovat. Česká republika se potřebuje stát inovátorem, protože v opačném případě jí hrozí i ekonomický regres, nikoli jen pomalý vzestup. Dle mezinárodního indexu[1] jsme na 32. místě z 139 měřených ekonomik v kategorii „Průměrný inovátor“ a nedosahujeme tedy vytyčeného cíle patřit mezi silné inovátory (Strong innovator).",
  },
  {
    typ: "p",
    text: "Ještě lepší informace získáme, když si zobrazíme jednotlivé indikátory pro Českou republiku. Žebříček nás staví vysoko (20. místo) v oblasti technologických schopností, ale jen na 43. místo ve výsledných výstupech a dokonce až na 73. místo na světě v kritériu tržní sofistikovanosti. My tedy „víme a umíme“, ale „neumíme to prodat“, a brzdí nás též přílišné jednostranné zaměření českého průmyslu.",
  },
  {
    typ: "p",
    text: "Pokud pak srovnáváme země Evropské unie, nestojí si Česká republika příliš dobře. Analýza EU nás staví na 19. místo z 27, hluboce pod průměr EU.[2]",
  },
  {
    typ: "p",
    text: "Stát se lepším inovátorem není jednorázový úkol, ale nutnost permanentního snažení. Každý stát totiž usiluje o to, aby se inovátorem stal, protože to s sebou nese prosperitu; jsme tedy účastníkem závodu, ve kterém se každý snaží. A je zcela podstatné uvést, že role státu, který ví, co má dělat, a dělá to, je zásadní.",
  },
  {
    typ: "p",
    text: "Podpora domácího inovativního podnikání je dominantním hybatelem, který je schopen obrátit „dividendové saldo“. Zahraniční korporace ročně dividendují několik set miliard Kč do svých mateřských zemí, zatímco opačným směrem (české společnosti zakořeněné v zahraničí) proudí spíše jednotky miliard. Budování inovativních firem s domácím kapitálem a se schopností expandovat do dalších zemí je cesta, která pomůže proti tomuto odtoku postavit časem stejně silný přítok, a to každoročně. Je to cesta velmi pracná, náročná a dlouhá, ale fakticky jediná, chceme-li se s západoevropskými státy vůbec někdy srovnat.",
  },
  {
    typ: "p",
    text: "Existuje sedmero rolí státu a je podstatné, že musí být aktivní ve všech na přiměřeně dobré úrovni. Jsou to:",
  },
  {
    typ: "ul",
    polozky: [
      "Lidský kapitál",
      "Financování",
      "Legislativa a regulace",
      "Infrastruktura a instituce",
      "Poptávka státu (stát jako zákazník pro inovativní řešení)",
      "Talent včetně zahraničního",
      "Kultura a tolerance k neúspěchu",
    ],
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Lidský kapitál",
        text: "Od dětství až po dospělost. Prvním základem je vzdělávání směrem k podnikavosti, tedy ke schopnosti samostatné či i týmové tvorby, iniciativnosti, nebojácnosti před překážkami a neúspěchem (a dalším dovednostem), a důraz na tzv. STEM či STEAM (Science, technology, engineering, art, mathematics), především s cílem zachycení mladého talentu a jeho rozvinutí. Ve vysokoškolském (či i pod ním středoškolském) prostředí podporovat chuť mladých lidí vrhnout se do samostatného podnikání, jakéhokoli. Velká mezera je pak v oblasti vědy a výzkumu, kde zejména u mladých vědců i doktorandů musí být finanční i profesní podpora k založení vědeckého spinoffu a jeho dalšího rozvíjení a růstu. V lidském kapitálu platí jednoduchá úměra: čím víc talentů v mládí podchytíme, tím víc špičkových vědců či podnikatelů budeme mít a čím víc univerzitních spinoffů zrealizujeme, tím větší šance je, že z nich vyroste velká a silná domácí firma. Lidský kapitál pak pokračuje i do vyššího věku, kde je nutné stále zvyšovat dovednosti (skill-up) či je překvalifikovávat, neboť nové technologické možnosti se otevírají enormním tempem.",
      },
      {
        nazev: "Financování",
        text: "Jedním z elementárních nástrojů je možnost odečíst si u firmy náklady na vývoj a výzkum od základu daně. Tuto možnost Česká republika nabízí, je ale komplikovaná a administrativně nejasná. Firmy jsou opatrné v jejím využívání, protože se obávají, že by jim finanční úřad mohl zpětně doměřit daň s pokutou. Navrhovaná změna spočívá v přednostním posouzení, zda chystaný inovační záměr bude ze strany úřadu akceptován, nebo zamítnut. Známým a vyzkoušeným nástrojem na podporu investic je jejich daňové zvýhodnění („daňové prázdniny“). Je to okamžitý impuls pro firmy ke spuštění (zejména větších) investičních akcí, s velice rychlým dopadem do růstu ekonomiky. Tento nástroj je pro stát dlouhodobě rozpočtově neutrální: „své peníze“ dostane, jen o několik let později. Druhou oblastí je financování startupů z veřejných peněz pomocí fondů s vysokou účastí státu (zbytek doplní soukromí investoři). Fondy jsou přitom cíleny jako ziskové, protože získávají ve firmách podíl a následně jej prodávají. Toto je běžný postup ve světě; ve velmi silné míře jej využívají například USA („superfond“ OPIC) nebo Izrael, považovaný za vzor ve světě startupů, který již v roce 1993 přišel s průkopnickým státním startupovým fondem Yozma. V České republice doporučujeme vytvořit podobnou strukturu namísto dnes komplikovaných a nejasných dotačních programů a titulů, které navíc nemají jednotnou administraci (TAČR, OP TAK a další).",
      },
      {
        nazev: "Legislativa a regulace",
        text: "I zde se lze snadno inspirovat zahraničím, kde jsou už dobře ověřené cesty, jak usnadnit inovativním firmám a startupům život. Jedním z nejsilnějších opatření je tzv. ESOP (Employee Stock Options Plan), který umožňuje startupům hledat a motivovat špičkové lidi do mladého, rostoucího týmu. Po desítkách let neexistence tohoto nástroje je už nyní jeho analogie schválená, je však slabá a komplikovaná; zde prosazujeme plnohodnotný ESOP bez kompromisů. Další vhodnou úpravou je destigmatizace krachů (u nás spojená s dlouholetou stigmatizací či i „pronásledováním“ ze strany státu). U startupu je naprosto běžné, že záměr nevyjde a startup zkrachuje; to, co nám chybí, jsou programy „druhé šance“, kdy je tento neúspěch rychle smazán. Pro startupy je pak potřeba zavést zjednodušenou administrativní zátěž v prvních letech firmy, či do dosažení větších tržeb, a umožnit nedanění zisku (s cílem jej dále investovat do růstu) v těchto počátečních letech. Takto to má např. Estonsko.",
      },
      {
        nazev: "Infrastruktura a instituce",
        text: "Souvisí úzce s lidským kapitálem; zejména u českých univerzit je dnes velkou bolestí transfer výzkumu do praxe (technology transfer). Navrhujeme vytvoření a financování nezávislých institucí, stojících mimo univerzity, v partnerství s inovativními společnostmi i veřejnou sférou, jejichž jediným cílem by byl technologický transfer. Univerzity samotné (a jejich lidé) musí být pak na technologickém transferu motivovány metodou „cukru i biče“. Další slabinou je spolupráce výzkumu s praxí. Probíhá, ale často jen formálně (jako šance získat grant) a je slabá. Zde doporučujeme aplikovat přístup z Německa pomocí institutů aplikovaného výzkumu (Fraunhoferovy instituty). Další důležitou institucí jsou lokální podnikatelské inkubátory; v České republice je nejlepším případem Jihomoravský JIC, který je velkým hybatelem rozvoje místního inovačního ekosystému. V této kvalitě je potřeba vybudovat podobné instituce v dalších velkých městech se silným univerzitním zázemím, tedy zejména v Praze, Ostravě, Plzni, Liberci a Olomouci.",
      },
      {
        nazev: "Poptávka státu (stát jako zákazník pro inovativní řešení)",
        text: "Stát samotný (státní správa i samospráva, též prostřednictvím zřizovaných firem) by měl usilovat o to, aby byl inovátorem, a nikoli ten, který inovuje, jen když už je k tomu dotlačen okolnostmi. Stát nemusí inovovat vlastními silami, ale inovaci poptávat a tím povzbuzovat podnikatele k zakládání inovativních startupů a posilovat některá odvětví, kde není tak silná poptávka z komerční sféry. Prostředkem je zde spíše změna přístupu a změna myšlení představitelů veřejné sféry; z pohledu legislativy pak věci pomůže uzákonění tzv. „sandboxů“, tedy možnost inovace ve veřejné sféře testovat lokálně i bez nutných změn v zákoně a až po ověření a osvědčení pak přijímat případné legislativní úpravy.",
      },
      {
        nazev: "Talent, jeho růst a lákání",
        text: "Každý stát si už dnes je vědom nepřemožitelné role špičkového lidského talentu. Cílem inovativní ekonomiky totiž není ani tak „mít mnoho malých inovátorů“, ale postupem času postavit velké až obří domácí firmy (s domácím kapitálem), které budou patřit mezi světové lídry a o které se může doslova opírat celá ekonomika. Příkladem budiž dánská firma Novo Nordisk, která vyrostla ze skromných domácích poměrů a univerzitního prostředí ve světového farmaceutického giganta. A takového lídra lze postavit jen s nejlepšími lidmi, kteří v oboru jsou. Zdroje talentu jsou domácí (který je pochopitelně omezený) a zahraniční, který je daleko větší. U domácích talentů je nutné jejich systematické rozpoznávání od raného školního či i předškolního věku (cílem musí být, aby každé dítě prošlo talentovým zkoumáním) a tam, kde se ukáže opravdu mimořádný talent, mít schopnost jej individuálně, často i mimo běžný vzdělávací systém, rozvíjet. U zahraničních talentů pak Česká republika musí zásadně změnit pravidla pro jejich lákání a integraci. Talentovaný mladý vědec nebo už i hotový expert, kterého do země láká jeho budoucí zaměstnavatel, musí mít „umetenou cestu“ bez dnešních velmi zdlouhavých a často ponižujících procedur, bez nedůstojných kvót a podobně. Následně pro něj musí být připraven opět zjednodušený a urychlený proces integrace, kam například patří i trvalé nebo dlouhodobé právo pobytu nebo standardní formy pojištění (zejména zdravotní). Je důležité, aby žádaný expert se zde necítil v diskriminované pozici vůči domorodcům. Hladký proces integrace a vlídné přijetí totiž ve výsledku znamená větší možnost, že zde zůstane natrvalo a neodjede po pár letech, a že bude informaci o příznivých podmínkách práce, života i podnikání v naší zemi šířit mezi další špičkové vědce či experty ze své země. Jedná se o poměrně malé počty osob, které ale dovedou zásadním způsobem pomoci ekonomice země.",
      },
      {
        nazev: "Kultura a tolerance k neúspěchu",
        text: "Ve výzkumech a rozhovorech se často zjišťuje, že mladí lidé nejdou do podnikání, protože se bojí neúspěchu. V české společnosti je stigma neúspěchu jako něčeho mimořádně negativního, co se s člověkem táhne dlouhá léta či desetiletí, velmi zakořeněné. V důsledku pak mnoho mladých lidí, kteří mají talent na inovace a podnikání, se do této oblasti vůbec nepustí a talent je promarněn. V ČR je 131 startupů na milion obyvatel, což je velmi málo; jsme pozadu nejen za světovými lídry, jako je Izrael (410 startupů/mil.), ale i za zeměmi, kde bychom to možná nečekali, jako je Rakousko (s dvojnásobným počtem startupů v přepočtu na populaci), a dokonce i za Maďarskem. Je přitom nepochybné, že podnikatelský talent se rodí všude, tedy i u nás, jen jej nedokážeme vyzdvihnout.",
      },
    ],
  },
  {
    typ: "p",
    text: "Dobrou zprávou je, že se Česká republika postupně zlepšuje,[3] a to ve všech sledovaných ukazatelích. Právě tak se ale zlepšují i další evropské země; je vidět, že si uvědomují důležitost inovativního podnikání pro svou budoucnost.",
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Tyto návrhy nám přinesou silnější inovační ekonomiku postavenou na lidech, talentu a schopnosti proměňovat dobré nápady v úspěšné firmy. Pokud dokážeme systematicky rozvíjet podnikavost a technické dovednosti od dětství, lépe financovat výzkum, startupy a investice, zjednodušit legislativu, posílit transfer technologií z univerzit do praxe, přilákat špičkové talenty ze zahraničí a vytvořit kulturu, která neúspěch nebere jako stigma, ale jako běžnou součást cesty k úspěchu, vznikne v Česku prostředí, kde budou moci vyrůstat nové silné domácí firmy. Výsledkem bude vyšší produktivita, více kvalitních pracovních míst, větší konkurenceschopnost a šance, že se Česká republika posune od ekonomiky levnější práce k zemi, která sama vytváří špičkové technologie, inovace a světově úspěšné podniky.",
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "Mezinárodní index inovací (pořadí ČR: celkově 32. z 139 v kategorii „Průměrný inovátor“; technologické schopnosti 20.; výsledné výstupy 43.; tržní sofistikovanost 73.) – odkaz v textu, zdroj v PDF neuveden." },
  { index: 2, citace: "Analýza EU (pořadí ČR 19. z 27 zemí EU) – odkaz v textu, zdroj v PDF neuveden." },
  { index: 3, citace: "Zlepšování ČR ve sledovaných ukazatelích inovační výkonnosti – odkaz v textu, zdroj v PDF neuveden." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "Inovátor (index inovací)", vysvetleni: "Země zařazená podle mezinárodního indexu inovací do kategorie podle své inovační výkonnosti, například „Průměrný inovátor“. Kategorie Strong innovator je vyšší, a Česko se do ní podle textu zatím nedostává." },
  { pojem: "STEM / STEAM", vysvetleni: "Zkratky pro vzdělávání v přírodních vědách, technice, inženýrství a matematice (STEM). STEAM k nim přidává umění (art)." },
  { pojem: "Spin-off (univerzitní spin-off)", vysvetleni: "Nová firma založená na výsledcích výzkumu, který vznikl na univerzitě nebo ve vědeckém pracovišti, a využívající jeho technologii nebo know-how." },
  { pojem: "Daňové prázdniny", vysvetleni: "Dočasné daňové zvýhodnění investic, které firmám usnadní spustit větší investiční akce. Stát se na něm dlouhodobě nepřichází o peníze, jen je dostane o několik let později." },
  { pojem: "Státní startupový fond (Yozma)", vysvetleni: "Fond s vysokou účastí státu, který investuje do startupů jako do ziskových projektů: získá podíl ve firmě a později jej prodá. Izrael jej zavedl v roce 1993 pod názvem Yozma." },
  { pojem: "ESOP (Employee Stock Options Plan)", vysvetleni: "Program zaměstnaneckých akcií. Umožňuje startupu nabídnout zaměstnancům podíl ve firmě, a tím přilákat a udržet špičkové lidi." },
  { pojem: "Destigmatizace krachu / druhá šance", vysvetleni: "Odstranění společenské stigmatizace neúspěchu. Programy „druhé šance“ umožní, aby byl neúspěch rychle smazán a podnikatel mohl začít znovu." },
  { pojem: "Technologický transfer", vysvetleni: "Přenos výsledků výzkumu z univerzit a vědeckých pracovišť do praxe, tedy do firem, které je mohou využít ve svých produktech a službách." },
  { pojem: "Fraunhoferův institut", vysvetleni: "Německý institut aplikovaného výzkumu, který pracuje s firmami na konkrétních řešeních. Text jej navrhuje jako vzor pro spolupráci výzkumu s praxí." },
  { pojem: "Inkubátor (JIC)", vysvetleni: "Podnikatelský inkubátor, tedy instituce, která pomáhá začínajícím firmám s prostorem, poradenstvím a kontakty. Příkladem je Jihomoravský JIC." },
  { pojem: "Regulatorní sandbox", vysvetleni: "Prostředí, kde lze inovaci ve veřejné sféře testovat i bez nutných změn zákona. Až po ověření se případně přijímají legislativní úpravy." },
  { pojem: "Living Lab", vysvetleni: "Metoda „živého“ testování: nové řešení se ověřuje v omezeném, ale plně funkčním reálném prostředí, s účastí veřejné sféry, univerzit a firem. Obvykle se soustředí na konkrétní obor, například autonomní mobilitu nebo e-health." },
  { pojem: "Talent", vysvetleni: "Člověk s mimořádnými schopnostmi v oboru, který je pro inovace klíčový. Text rozlišuje domácí talenty, které je třeba systematicky rozpoznávat a rozvíjet, a zahraniční talenty, které má Česko lákat." },
];
