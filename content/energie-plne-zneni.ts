export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Českou energetiku čeká v příštích patnácti letech souběh tří velkých změn. Uhelné elektrárny, které dnes vyrábějí třetinu naší elektřiny,[1] přestávají vydělávat a jejich majitelé postupně ohlašují konec provozu. Nové jaderné bloky mají dodat první elektřinu nejdříve v polovině třicátých let, zkušenost srovnatelných projektů ale velí počítat se zpožděním. A spotřeba elektřiny mezitím poroste: elektřina přebírá práci uhlí, benzínu a plynu a dělá ji úsporněji, takže celková spotřeba energie klesá, zatímco spotřeba elektřiny roste. Očekává se proto růst z dnešních zhruba 59 na 82 – 92 TWh v roce 2040.[2]",
  },
  {
    typ: "p",
    text: "Je to především hospodářské téma. České domácnosti platily v přepočtu na kupní sílu druhou nejdražší elektřinu v Evropské unii[3] a za dovoz fosilních paliv odešlo v roce 2025 do zahraničí zhruba 262 miliard korun.[4] Každá kilowatthodina z domácích nízkoemisních zdrojů a každá ušetřená jednotka energie tento odtok peněz snižuje a omezuje citlivost ekonomiky na cenové šoky dovážených paliv.",
  },
  {
    typ: "p",
    text: "Velkou část toho, za co dnes připlácíme, přitom nezpůsobují přírodní podmínky, ale špatně nastavená pravidla. Kapacitu sítí blokují rezervace projektů, které se nestaví. Teplo, kterým by šlo vytopit stovky tisíc domácností, vypouštíme do řek a vzduchu.[5] Chytré elektroměry, které jsme si už zaplatili, používáme jako ty staré. A ceny elektřiny a plynu jsou nastaveny tak, že se domácnostem nevyplácí přejít na úsporné technologie, které se v Česku vyrábějí.",
  },
  {
    typ: "p",
    text: "Naše strategie by proto měla stát na čtyřech pilířích: u zdrojů na rychlejší výstavbě domácích nízkoemisních zdrojů jako nejlevnějších nových zdrojů, jádrem jako stabilizačním prvkem a plynem jako přechodnou nutností. Ale mimo to i na férových a dostupných cenách pro domácnosti a průmysl, odblokované a digitalizované síti a úsporách spolu s modernizací teplárenství. Cílem je diverzifikace zdrojů i dodavatelů, maximální zapojení soukromého kapitálu, otevřená data a technologická neutralita. Tou rozumíme soutěž: stát stanoví požadovaný výsledek a technologie soutěží cenou a parametry. Nejlevnější cesta k novým zdrojům vede pro stát přes odstranění regulatorních překážek, které konkrétní technologie neodůvodněně blokují.",
  },
  {
    typ: "h3",
    text: "V čem je problém?",
  },
  {
    typ: "p",
    text: "Uhlí končí dřív, než bude připravena náhrada. O konci uhelných elektráren nerozhodují vládní harmonogramy, ale trh. Skupina Sev.en oznámila uzavření Počerad, Chvaletic i kladenské teplárny[6], po zdražení plynu je nicméně odložila minimálně do jara 2027.[7] Provozovatel přenosové soustavy mezitím označil dva bloky Chvaletic za dočasně nezbytné pro stabilitu sítě.[8] A jejich náhrada nabírá skluz: uvedení prvního nového paroplynového bloku v Mělníku se posunulo z roku 2026 na rok 2029[9] a výrobci turbín jsou vyprodaní do konce dekády.[10] Každý rok skluzu znamená další platby uhelným elektrárnám v nařízeném provozu, které zaplatí spotřebitelé.",
  },
  {
    typ: "p",
    text: "Domácí nízkoemisní zdroje stavíme hluboko pod potenciálem i pod vlastními cíli. K cíli 10,1 GW fotovoltaiky do roku 2030[11] potřebujeme stavět přes 1 GW solárů ročně, loni to bylo 0,7 GW.[12] Maďarsko přitom za pět let zvýšilo podíl slunce na výrobě elektřiny ze 4 na zhruba 25 %.[13] Rozdíl nedělá počasí, které koriguje dražší kapitál v Maďarsku, ale povolování a přístup k síti.",
  },
  {
    typ: "p",
    text: "Největší nevyužitou rezervou je vítr. Z větru dnes vyrábíme necelé procento elektřiny a loni přibylo jen zhruba 13 MW nového výkonu.[14] Podle studie Ústavu fyziky atmosféry Akademie věd ČR může přitom vítr v Česku do roku 2040 vyrábět 6 až 19 TWh ročně, tedy zhruba desetinu až třetinu dnešní spotřeby.[15] Dnešní nízká výroba není důkazem slabých přírodních podmínek: moderní turbíny s vysokými stožáry zpřístupnily lokality, které před dvaceti lety nedávaly ekonomicky smysl, a větrné podmínky českých vrchovin jsou podle autorů studie srovnatelné s jižní polovinou Německa.[16] Rozdíl vytváří především povolování, územní pravidla a nízká akceptace projektů. Užitečným kontrastem je Rakousko, alpská země s větrem soustředěným do východní části území: z větru už kryje 13 % spotřeby elektřiny[17] a jeho plán rozvoje sítí počítá do roku 2030 s růstem větrné výroby na více než dvojnásobek.[18] Česko jde opačným směrem: návrh akceleračních zón, které měly povolování zkrátit na rok, byl při posuzování výrazně omezen a doplněn o podmínky, jež moderní turbíny na řadě míst fakticky vylučují.[19]",
  },
  {
    typ: "p",
    text: "Síť má kapacitu, ale blokují ji papírové rezervace a zastaralé řízení. Přes 20 GW kapacity v sítích, dvojnásobek toho, co chceme do roku 2030 postavit, drží rezervace projektů, které se roky nestaví.[20] Jen u jednoho distributora se sešly žádosti o připojení baterií o výkonu 170 GW, zhruba patnáctinásobku maximálního zatížení soustavy.[21] Odběratelé na vysokém napětí blokují zhruba 3,3 GW nevyužívaného příkonu.[22] Vyvolané úpravy sítí platí všichni v účtech. Soustavu navíc řídíme staticky: loni bylo na burze 322 hodin se zápornou cenou elektřiny,[23] běžná domácnost z toho kvůli jednotné ceně nemá nic a data o vlastní spotřebě dostávají lidé z datového centra EDC pomaleji a hůř než velcí hráči.[24]",
  },
  {
    typ: "p",
    text: "Ceny jsou deformované v neprospěch elektřiny. Elektřina nese náklady povolenek a plné náklady sítí, plyn na vytápění je od spotřební daně osvobozen a povolenky za něj domácnosti zaplatí až od roku 2028.[25] Jednotka elektřiny tak stojí domácnost zhruba čtyřikrát víc než jednotka plynu, zatímco tepelné čerpadlo se vyplácí od poměru asi 2,7 ku 1.[26] Výsledkem je paradox: Česko patří mezi největší světové výrobce tepelných čerpadel a Panasonic rozšiřuje plzeňskou továrnu,[27] domácí prodeje ale spadly za dva roky na polovinu.[28] Každý nový plynový kotel přitom za svůj život protopí statisíce korun za dovezené palivo z ciziny.",
  },
  {
    typ: "p",
    text: "Teplárenství čeká největší proměna za generaci a stát na ni nemá plán. Dálkové teplo ohřívá třetinu domácností a téměř polovina dodávek tepláren stále pochází z uhlí.[29] Evropská pravidla od roku 2028 vyžadují rostoucí podíl obnovitelného a odpadního tepla.[30] Kdo může, od drahých soustav se odpojuje, fixní náklady se rozpočítávají mezi zbývající zákazníky a ceny se mezi městy liší i o polovinu, aniž zákazník vidí proč.[31] Transformace se z veřejných peněz platí především jako přechod z domácího uhlí na dovážený plyn,[32] jehož cena se soustavám zabetonuje do účtů na dvacet let. Samostatná teplárenská strategie neexistuje; Německo přitom uložilo obcím závazně naplánovat budoucnost vytápění zákonem.[33]",
  },
  {
    typ: "p",
    text: "Vládní politika tento stav prodlužuje. Vláda sází výrazněji na centrální zdroje: připravované ovládnutí výrobní části ČEZ[34] váže kapitál a signalizuje soukromým investorům, že bez státní účasti nemají čekat stabilní podmínky. Deklarovaná neimplementace evropských povolenek na vytápění a dopravu[35] přitom Česko povinností nezbavuje, jen odkládá přípravu na jejich sociálně únosné zvládnutí. Potenciál levnějších a rychleji realizovatelných decentralizovaných investic zůstává nevyužitý.",
  },
  {
    typ: "h3",
    text: "Cíle",
  },
  {
    typ: "p",
    text: "Cílem je dostupná, stabilní a nízkoemisní energie z domácích zdrojů, která přestane být brzdou konkurenceschopnosti. Konkrétně chceme:",
  },
  {
    typ: "ul",
    polozky: [
      "Dosáhnout tempa výstavby alespoň 1 GW fotovoltaiky, 200 MW větru a 2 GWh bateriových úložišť ročně.",
      "Uvolňovat blokovanou kapacitu sítě tempem alespoň 2 GW ročně.",
      "S startem povolenek v roce 2028 spustit energetický kupón, který vrátí polovinu výnosů přímo lidem.",
      "Zákonem ohlásit trajektorii narovnání cen elektřiny a plynu.",
      "Dostat poměr cen elektřiny a plynu pod bod zvratu tepelného čerpadla a cenu elektřiny v přepočtu na kupní sílu nejvýše na evropský průměr.",
      "Po roce 2040 provozovat nové jaderné bloky jako stabilní páteř nízkoemisní výroby schopnou krýt kolem poloviny tehdejší spotřeby, aniž by jejich případné zpoždění ohrozilo dodávky nebo ceny.",
    ],
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "p",
    text: "Opatření řadíme do čtyř linií: první zajišťuje dostatek výroby, druhá férové ceny, třetí kapacitu a inteligenci sítě, čtvrtá úspory a moderní teplo.",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Technologicky neutrální kapacitní mechanismus",
        text: "Období mezi útlumem uhlí a náběhem nových jaderných bloků musí odpracovat obnovitelné zdroje s akumulací, doplněné plynem jako přechodným a záložním zdrojem. Zavedeme technologicky neutrální kapacitní mechanismus: aukce na pohotovost otevřené bateriím, přečerpávacím elektrárnám, agregované flexibilitě i teplárnám za stejných podmínek jako plynovým elektrárnám. Evropská komise mechanismus Česku schválila a platby vyjdou v příští dekádě na 75 až 150 miliard korun.[36] Právě proto musí aukce vybírat nejlevnější řešení, ne předem určenou technologii.",
      },
      {
        nazev: "Model přímého výnosu z větru",
        text: "U větru změníme přístup. Místo zón, které výstavbu fakticky brzdí, zavedeme model, v němž obce a dotčené komunity získají z projektů přímý výnos a projekty s jejich podporou projdou výrazně rychlejším povolováním. Uvolníme vhodné části vojenských újezdů a prověříme bezletové zóny, které výstavbu historicky blokovaly. Domácí větrná výroba je cenná i proto, že její profil doplňuje fotovoltaiku: většina výroby připadá na zimní pololetí,[37] kdy slunce dodává nejméně.",
      },
      {
        nazev: "Fotovoltaika: tempo přes 1 GW ročně a přezbrojení",
        text: "U fotovoltaiky podpoříme tempo přes 1 GW ročně a využijeme okno let 2029 až 2031, kdy končí podpora starých solárních parků a jejich přezbrojení může na stejné ploše výrazně zvýšit výrobu i doplnit baterie.[38] Současně v souladu s varováním NÚKIB zajistíme, aby software střídačů neumožňoval vzdálené vypnutí ze třetích zemí.[39]",
      },
      {
        nazev: "Jádro jako stabilizační prvek",
        text: "S jádrem počítáme jako s významným stabilním zdrojem po roce 2040 a dostavbu Dukovan podporujeme. Strategie ale nesmí plánovat, jako by termín a cena nových bloků byly jisté. Smluvní cena 407 miliard korun nezahrnuje inflaci ani náklady financování.[40] Stát projekt podpírá nízkoúročeným úvěrem na plné náklady výstavby, odhadované aktuálně na 23 až 30 miliard eur, a čtyřicetiletou smlouvou o výkupu elektřiny za realizační cenu, tedy oboustranným rozdílovým kontraktem.[41] Špatně nastavená realizační cena může přenést podstatnou část investičního rizika na stát a odběratele. Evropská komise k podpoře obou bloků zahájila šetření mimo jiné právě kvůli riziku nadměrného přenosu rizik na stát.[42] Obezřetnost velí i zkušenost: u francouzského Flamanville se náklady i doba výstavby více než ztrojnásobily, americký Vogtle stál přes dvojnásobek rozpočtu.[43] A roste význam dosud opomíjeného parametru, vody. Stanovisko EIA omezuje souběžný výkon staré a nové elektrárny v lokalitě na 3 250 MWe a vodní bilanci, prokázanou pro souběh s jedním novým blokem, ukládá před stavebním povolením aktualizovat podle vývoje klimatu.[44] Vodní bilance a technologie chlazení tak mohou při častějším suchu ovlivnit náklady i provozní parametry projektu a musí být součástí hodnocení jeho ekonomiky.[45] Jádro je pojistka stability, ne recept na levnou elektřinu. Energetická politika musí mít funkční řešení i pro období před spuštěním nových bloků.",
      },
      {
        nazev: "Stejnosměrný koridor a malé modulární reaktory",
        text: "Rozvoj německých severojižních stejnosměrných koridorů, které přivádějí severomořskou větrnou elektřinu do Bavorska,[46] může pro Česko vytvořit novou infrastrukturní příležitost. Nejnákladnější část této infrastruktury vzniká bez ohledu na české rozhodnutí. Prověříme proto studií proveditelnosti smysl protažení této stejnosměrné sítě do české soustavy: investiční náklady, dopad na přeshraniční kapacitu a české ceny, sezónní přínos, bezpečnost dodávek i alternativní využití stejného kapitálu. Jako možnost k ekonomickému prověření bereme také kapitálový vstup českého subjektu do severomořské farmy, jak to dělají například mnichovské městské podniky.[47] Souběžně budeme vymáhat evropské pravidlo, že 70 % přeshraniční kapacity má sloužit obchodu.[48] U malých modulárních reaktorů držíme přes podíl ČEZ v Rolls-Royce SMR opci na slibnou technologii.[49]",
      },
      {
        nazev: "Trajektorie narovnání cen elektřiny a plynu",
        text: "Narovnáme cenové podmínky mezi elektřinou a plynem bez cenových šoků. Po nizozemském vzoru zákonem ohlásíme trajektorii daní a poplatků na roky dopředu, aby si více než 1,5 milionu domácností topících plynem mohlo naplánovat výměnu kotle, až doslouží.[50] Platí pořadí: nejdřív peníze lidem, teprve potom narovnávání daní.",
      },
      {
        nazev: "Energetický kupón",
        text: "Od roku 2028 se emisní povolenky rozšíří na vytápění a pohonné hmoty.[51] Zavedeme proto energetický kupón: polovinu výnosů vrátíme přímo lidem, každému stejně, bez žádostí a úředníka, na výplatní pásce, v důchodu nebo v dávkách. Při ceně povolenky kolem 60 eur jde zhruba o 5 000 korun ročně na průměrnou domácnost. Kdo topí a jezdí úsporně, dostane víc, než zaplatil. Překročí-li cena povolenky sociálně únosnou hranici, automaticky snížíme spotřební daň z paliv.[52] To je věcná odpověď na systém, který začne platit bez ohledu na postoj vlády. Samotné odmítání žádnou domácnost neochrání.",
      },
      {
        nazev: "Tři nástroje pro energeticky náročný průmysl",
        text: "Energeticky náročný průmysl udržíme třemi nástroji s jasným plátcem: dlouhodobými přímými kontrakty na elektřinu ze stávajících jaderných elektráren po francouzském vzoru,[53] aukcemi hrazenými z výnosů průmyslových povolenek, které platí za skutečně snížené emise,[54] a úlevou na síťových poplatcích výměnou za pomoc soustavě ve špičkách po britském vzoru.[55] Nejde o nové desítky miliard, ale o chytřejší nasazení peněz v objemu dnešních kompenzací.[56]",
      },
      {
        nazev: "Odblokování rezervací kapacity sítě",
        text: "Nejlevnější megawatt je ten, který je už zaplacený. Kdo drží rezervaci kapacity, bude proto průběžně dokládat milníky v povolování a financování, převody projektů se budou evidovat a propadlá kapacita se vrátí do průhledné fronty. Stejný balík doporučuje Evropská komise.[57] Obdobně uvolníme nevyužívaný rezervovaný příkon.",
      },
      {
        nazev: "Připojení s omezitelným výkonem a lhůta pro distributora",
        text: "Zavedeme rychlejší dobrovolnou cestu: připojení s omezitelným výkonem, kterým Nizozemsko zpřístupnilo 9 GW kapacity.[58] Distributor dostane vymahatelnou lhůtu na rozhodnutí a při zaviněném průtahu zaplatí kompenzaci ze svého, ne z tarifů.",
      },
      {
        nazev: "Data o spotřebě patří zákazníkovi a dynamický tarif",
        text: "Data o spotřebě patří zákazníkovi. Zavedeme povinné strojové rozhraní datového centra EDC pro všechny, ne jen pro velké hráče.[59] Právo na dynamický tarif proměníme v reálnou a přísně dobrovolnou nabídku. V českém pilotu takto domácnosti ušetřily kolem desetiny účtu.[60] Zrychlíme osazování průběhových elektroměrů a podpoříme obousměrné nabíjení, které bude od roku 2027 u nových dobíjecích stanic pro elektromobily evropským standardem,[61] a v pilotu u regulátora prověříme platby za skutečnou, nikoli papírovou špičku odběru.[62]",
      },
      {
        nazev: "Komunitní energetika rakouským modelem",
        text: "Podpoříme komunitní energetiku rakouským modelem: kdo sdílí elektřinu lokálně, platí za síť méně, protože ji méně zatěžuje. Rakousko má se slevou z distribučního poplatku téměř čtyři tisíce energetických společenství, Česko zhruba dvě stě.[63]",
      },
      {
        nazev: "Úspory se zárukou (EPC) ve státních budovách",
        text: "Úspory si na sebe vydělají samy a stát musí začít u sebe: více než tři čtvrtiny veřejných budov mají energetickou třídu D nebo horší a potenciál úspor se odhaduje až na 20 miliard korun ročně.[64] Uložíme státním institucím povinnost prověřit u každé velké budovy úspory se zárukou (EPC), u nichž dodavatel smluvně ručí za výsledek a platí se z uspořených účtů. Takové projekty už dnes šetří přes 700 milionů ročně bez dotací.[65]",
      },
      {
        nazev: "Revolvingový fond renovačních půjček",
        text: "Pro domácnosti zřídíme revolvingový fond výhodných renovačních půjček po vzoru německé KfW, v němž se splátky vracejí a půjčují dál.[66] Je to udržitelnější konstrukce než závazek státu platit bankám úroky z renovačních úvěrů, jehož výši v dnešním nastavení nikdo nehlídá.[67] Pro domácnosti, které na investici nedosáhnou, nasměrujeme na renovace na klíč zhruba 50 miliard korun ze Sociálního klimatického fondu.[68]",
      },
      {
        nazev: "Plánování tepla a férová cena tepla",
        text: "Teplo uděláme společnou odpovědností státu a měst: po německém vzoru zavedeme závazné plánování tepla a chladu obcemi.[69] Zavedeme veřejné srovnání cen tepla po vzoru Rakouska,[70] povinnost soustav nasadit nejlevnější dostupné nízkoemisní teplo, kde obdobné litevské aukce snížily ceny tepla za 5 let o třetinu,[71] a regulaci zisku za celou cestu tepla k zákazníkovi, ne po jednotlivých článcích řetězce.[72] Kdo opakovaně účtuje víc, než by zákazníka stálo srovnatelné tepelné čerpadlo, předloží ozdravný plán a jeho odběratelé získají právo odejít bez sankcí.[73] Levnější nízkoemisní zdroj dostane právo připojit se k soustavě[74] a žádná veřejná podpora nesmí být podmíněna ochranou před konkurencí.",
      },
      {
        nazev: "Odpadní a obnovitelné teplo",
        text: "Uhlí v soustavách nahradíme především teplem, které dnes vyhazujeme. Česko vypouští ekonomicky využitelné odpadní teplo v objemu, který by vytopil zhruba 800 tisíc domácností.[75] Otevřeme technologicky neutrální cestu pilotům odpadního a obnovitelného tepla i soustavám chladu, po kterém s teplejšími léty poroste poptávka, a z ověřených řešení uděláme exportní referenci českého průmyslu.",
      },
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "ul",
    polozky: [
      "Dostupnější a stabilnější energie je podmínkou konkurenceschopnosti celé ekonomiky.",
      "Rychlejší výstavba domácích zdrojů a úspory sníží dovozní závislost a odtok stovek miliard korun za paliva, otevřená síť a předvídatelná pravidla přitáhnou soukromý kapitál tam, kde dnes investice čekají ve frontě, a stát nebude muset transformaci financovat sám.",
      "Férové ceny vrátí smysl elektrifikaci, na které stojí domácí výrobci tepelných čerpadel i navazující průmysl.",
      "Výsledkem je menší tlak na veřejné rozpočty, vyšší investiční atraktivita Česka a průmysl odolnější vůči palivovým šokům, s novými technologickými příležitostmi od akumulace přes flexibilitu sítí po využití odpadního tepla.",
    ],
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "ERÚ. 2026, červen. Roční zpráva o provozu elektrizační soustavy ČR za rok 2025. [online]." },
  { index: 2, citace: "ČEPS. 2024. Hodnocení zdrojové přiměřenosti elektrizační soustavy ČR do roku 2040, MAF CZ 2023. [online]." },
  { index: 3, citace: "EUROSTAT. 2026, květen. Electricity prices for household consumers, 2. pololetí 2025. [online]." },
  { index: 4, citace: "ČSÚ. 2025. Zahraniční obchod se zbožím podle CZ-CPA, 1. čtvrtletí 2025, 2. čtvrtletí, 3. čtvrtletí a 4. čtvrtletí, součet." },
  { index: 5, citace: "MŽP. 2025. Akční plán rozvoje využití nízkopotenciálního obnovitelného a odpadního tepla. [online]." },
  { index: 6, citace: "ČT24. 2025, listopad. Tykačova skupina Sev.en ukončí provoz tří uhelných elektráren. [online]." },
  { index: 7, citace: "ECHO24. 2026, duben. Svět se vrací k uhlí, Tykačovy elektrárny pojedou minimálně do března 2027. [online]." },
  { index: 8, citace: "IROZHLAS. 2026, leden. ČEPS doporučil zachovat provoz elektrárny Chvaletice. [online]." },
  { index: 9, citace: "EKONOMICKÝ DENÍK. 2025, květen. Ekonomický deník. [online]." },
  { index: 10, citace: "GE VERNOVA. 2025, prosinec. Přepis výsledkové prezentace, order backlog. [online]." },
  { index: 11, citace: "MPO. 2024, prosinec. Vnitrostátní plán ČR v oblasti energetiky a klimatu. [online]." },
  { index: 12, citace: "SOLÁRNÍ ASOCIACE, CIT. DLE PV MAGAZINE. 2026, leden. Czechia deploys 696 MW of solar in 2025. [online]." },
  { index: 13, citace: "EMBER. 2025, září. Turning to the sun, Solar rise in Central Europe. [online]." },
  { index: 14, citace: "KOMORA OZE, CIT. DLE OENERGETICE. 2026, únor. Loni bylo v ČR zprovozněno pět nových větrných elektráren. [online]." },
  { index: 15, citace: "ÚFA AV ČR, D. HANSLIAN. 2020. Aktualizace potenciálu větrné energie v České republice z perspektivy roku 2020. [online]." },
  { index: 16, citace: "KOMORA OZE. 2020. V roce 2040 může být třetina elektřiny z větru. [online]." },
  { index: 17, citace: "BMWET. 2025. Windenergie in den Bundesländern, 13 % spotřeby v roce 2024. [online]." },
  { index: 18, citace: "BMWET. 2024. Integrierter österreichischer Netzinfrastrukturplan, cíl 21 TWh větru do roku 2030. [online]." },
  { index: 19, citace: "EKONEWS, CIT. DLE OENERGETICE. 2026, červenec. Retardační, nikoli akcelerační zóny. [online]." },
  { index: 20, citace: "EGÚ BRNO PRO HNUTÍ DUHA. 2025, duben. Možnosti zlepšení integrace OZE do elektrizační soustavy. [online]." },
  { index: 21, citace: "ČEZ DISTRIBUCE. 2026, leden. Výsledky roku 2025, žádosti o připojení baterií 170 GW. [online]." },
  { index: 22, citace: "ERÚ. 2025. Inovace tarifní struktury na hladinách VN a VVN. [online]." },
  { index: 23, citace: "O ENERGETICE. 2026, leden. Rok 2025 ve znamení záporných cen elektřiny. [online]." },
  { index: 24, citace: "ERÚ. 2025. Návrh změn Řádu EDC. [online]." },
  { index: 25, citace: "E-SBÍRKA. 2007. Zákon č. 261/2007 Sb. [online]." },
  { index: 26, citace: "TZB-INFO. 2025. Porovnání nákladů na vytápění podle druhu paliva. [online]." },
  { index: 27, citace: "PANASONIC. 2025. Rozšíření závodu v Plzni na 1,4 mil. tepelných čerpadel ročně. [online]." },
  { index: 28, citace: "AVTČ. 2026, květen. Prodeje tepelných čerpadel v ČR. [online]." },
  { index: 29, citace: "TEPLÁRENSKÉ SDRUŽENÍ ČR, CIT. DLE TZB-INFO. 2026, květen. Podíl uhlí na dodávkách tepláren 47,6 % v roce 2025. [online]." },
  { index: 30, citace: "EUR-LEX. 2023. Směrnice (EU) 2023/1791 o energetické účinnosti, čl. 26. [online]." },
  { index: 31, citace: "ERÚ. 2026. Předběžné ceny tepelné energie v ČR k 1. 1. 2026. [online]." },
  { index: 32, citace: "CDE. 2024, říjen. Případová studie Mělník, podpora paroplynu z Modernizačního fondu. [online]." },
  { index: 33, citace: "SPOLKOVÁ REPUBLIKA NĚMECKO. 2024. Wärmeplanungsgesetz. [online]." },
  { index: 34, citace: "VLÁDA ČR. 2026, leden. Programové prohlášení vlády. [online]. ČEZ. 2026, duben. Informační povinnost, valná hromada 1. 6. 2026 k optimalizaci vlastnické struktury skupiny. [online]." },
  { index: 35, citace: "VLÁDA ČR. 2026, leden. Programové prohlášení vlády, kapitola Emisní povolenky. [online]." },
  { index: 36, citace: "EVROPSKÁ KOMISE, CIT. DLE OENERGETICE. 2026, červenec. Schválení českého kapacitního mechanismu. [online]." },
  { index: 37, citace: "ERÚ. 2026, červen. Roční zpráva o provozu elektrizační soustavy ČR za rok 2025, měsíční výroba VTE, zimní pololetí 57 %. [online]." },
  { index: 38, citace: "SOLÁRNÍ ASOCIACE, CIT. DLE FORBES. 2025. Repowering solárních parků z let 2009 a 2010. [online]." },
  { index: 39, citace: "NÚKIB. 2025, srpen. Analýza hrozby, střídače fotovoltaických elektráren. [online]." },
  { index: 40, citace: "ČT24. 2025. Dukovany budou stát mnohem víc než 407 miliard, říkají experti. [online]." },
  { index: 41, citace: "EVROPSKÁ KOMISE. 2025, prosinec. In-depth investigation into Czech support for Dukovany II. [online]. ČESKO. 2021. Zákon č. 367/2021 Sb., o opatřeních k přechodu ČR k nízkouhlíkové energetice. [online]." },
  { index: 42, citace: "EVROPSKÁ KOMISE. 2025, prosinec. In-depth investigation into Czech support for Dukovany II. [online]." },
  { index: 43, citace: "COUR DES COMPTES. 2020. La filière EPR. [online]. U.S. EIA. 2024. Plant Vogtle Unit 4 begins commercial operation. [online]." },
  { index: 44, citace: "MŽP. 2019, srpen. Závazné stanovisko EIA k záměru Nový jaderný zdroj v lokalitě Dukovany, podmínky č. 6, 17 a 19. [online]." },
  { index: 45, citace: "POVODÍ MORAVY. 2025. Vodní bilance v povodí Dyje. [online]." },
  { index: 46, citace: "50HERTZ. 2025. SuedOstLink, dvě vedení po 2 GW, stavba v celé délce. [online]." },
  { index: 47, citace: "STADTWERKE MÜNCHEN. 2024. Annual Report, podíl 49 % ve farmě Sandbank. [online]." },
  { index: 48, citace: "ACER. 2025. Market Monitoring Report, cross-zonal capacities. [online]." },
  { index: 49, citace: "ROLLS-ROYCE SMR. 2024. Czech contract to deliver small modular reactor programme. [online]." },
  { index: 50, citace: "MINISTERSTVO FINANCÍ NIZOZEMSKA. 2022. Belastingplan 2023, trajektorie energetických daní 2023 až 2030. [online]." },
  { index: 51, citace: "ICAP. 2026, březen. EU officially adopts 2040 climate target, postpones ETS2 one year. [online]." },
  { index: 52, citace: "PIRÁTI. b. r. Analýza Energetický kupón. [online]." },
  { index: 53, citace: "EDF. 2026. Dlouhodobé průmyslové kontrakty CAPN. [online]." },
  { index: 54, citace: "EVROPSKÁ KOMISE. 2024, únor. Schválení německých Klimaschutzverträge. [online]." },
  { index: 55, citace: "GOV.UK. 2024. British Industry Supercharger. [online]." },
  { index: 56, citace: "MPO, CIT. DLE SP ČR. 2026. Kompenzace nepřímých nákladů EU ETS za rok 2025. [online]." },
  { index: 57, citace: "EVROPSKÁ KOMISE. 2025. Guidance on efficient and timely grid connections. [online]." },
  { index: 58, citace: "NETBEHEER NEDERLAND. 2025. Tijdsduurgebonden contracten, 9,1 GW kapacity mimo špičku. [online]." },
  { index: 59, citace: "EVROPSKÁ UNIE. 2024. Směrnice (EU) 2024/1711, čl. 31, a nařízení (EU) 2023/1162, právo na strojově čitelná data. [online]." },
  { index: 60, citace: "ČEZ PRODEJ. 2025. Pilot dynamického tarifu s řízením spotřeby. [online]." },
  { index: 61, citace: "EUR-LEX. 2025. Delegované nařízení (EU) 2025/656. [online]." },
  { index: 62, citace: "NVE-RME. 2022. Kapasitetsledd, platby za skutečnou špičku v Norsku. [online]." },
  { index: 63, citace: "ENERGIEGEMEINSCHAFTEN.GV.AT. 2025, červen. Energiegemeinschaften.gv.at. [online]. EDC. 2026, červenec. 218 českých společenství. [online]." },
  { index: 64, citace: "MŽP, NÁRODNÍ PROGRAM ŽIVOTNÍ PROSTŘEDÍ. 2024. Energetické úspory veřejných budov. [online]." },
  { index: 65, citace: "APES. 2025, březen. Rok 2024, 297 EPC projektů, roční úspory 706 mil. Kč. [online]." },
  { index: 66, citace: "KFW. b. r. Marshallplan und ERP, historie revolvingového modelu. [online]." },
  { index: 67, citace: "SFŽP. 2025. Nová zelená úsporám, úvěrová podpora přes banky. [online]." },
  { index: 68, citace: "MŽP. 2025. Sociální klimatický plán ČR. [online]." },
  { index: 69, citace: "SPOLKOVÁ REPUBLIKA NĚMECKO. 2024. Wärmeplanungsgesetz, lhůty 2026 a 2028. [online]." },
  { index: 70, citace: "E-CONTROL. b. r. waermepreise.at, zákonný veřejný ceník tepla. [online]." },
  { index: 71, citace: "VERT. 2018. Aukce tepla nezávislých výrobců v Litvě. [online]. Průběžně aktualizováno." },
  { index: 72, citace: "ERÚ. 2025. Uplatnění přiměřeného zisku v teplárenství. [online]." },
  { index: 73, citace: "DANISH ENERGY AGENCY. 2025. Forbrugerprisloft, benchmark s nápravným plánem. [online]." },
  { index: 74, citace: "EUR-LEX. 2023. Směrnice (EU) 2023/2413 (RED III), čl. 24, přístup k soustavám zásobování teplem. [online]." },
  { index: 75, citace: "MŽP. 2025. Akční plán rozvoje využití nízkopotenciálního obnovitelného a odpadního tepla. [online]." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "Kapacitní mechanismus", vysvetleni: "Systém, který platí zdrojům za to, že jsou připravené vyrobit elektřinu, když je jí nedostatek. Odměna se platí za pohotovost, ne za každou vyrobenou kilowatthodinu." },
  { pojem: "Akcelerační zóna", vysvetleni: "Vymezené území, kde úřad předem připraví podklady pro povolení, jako jsou posudky a vyjádření k síti, takže investor dostane rozhodnutí rychleji a s jistotou." },
  { pojem: "Repowering", vysvetleni: "Obnova stávajícího solárního nebo větrného parku novými, výkonnějšími zařízeními na stejném místě. Výroba roste bez nového záboru pozemků." },
  { pojem: "Rozdílový kontrakt (CfD)", vysvetleni: "Smlouva, která stabilizuje cenu. Když je tržní cena nižší než dohodnutá realizační cena, rozdíl doplácí stát nebo kupující. Když je vyšší, výrobce část rozdílu vrací." },
  { pojem: "ETS2 (emisní povolenky na vytápění)", vysvetleni: "Systém obchodování s emisními povolenkami, který se od roku 2028 rozšíří na vytápění a pohonné hmoty. Náklady na emise se promítnou do cen paliv a tepla." },
  { pojem: "Energetický kupón", vysvetleni: "Vrácení poloviny výnosů z emisních povolenek přímo lidem, každému stejně, bez žádostí. Peníze přijdou na výplatní pásce, v důchodu nebo v dávkách." },
  { pojem: "Dynamický tarif", vysvetleni: "Tarif, jehož cena elektřiny se mění podle aktuální ceny na burze. Kdo může spotřebu přesunout do levnějších hodin, ušetří." },
  { pojem: "Rezervace kapacity sítě", vysvetleni: "Závazek, že projekt dostane v síti místo pro budoucí připojení. Pokud se projekt roky nestaví, rezervace kapacitu blokuje i pro ostatní." },
  { pojem: "Připojení s omezitelným výkonem", vysvetleni: "Připojení do sítě, které může distributor v krátkých špičkách omezit. Zájemce se připojí dříve, nemusí čekat na posílení sítě, a výměnou přijme omezení v nejvytíženějších hodinách." },
  { pojem: "Komunitní energetika", vysvetleni: "Sdílení elektřiny v místní skupině, například v obci, v bytovém domě nebo mezi firmami. Lokálně spotřebovaná elektřina méně zatěžuje síť, proto se za ni platí nižší poplatek." },
  { pojem: "EPC (úspory se zárukou)", vysvetleni: "Smlouva, ve které dodavatel ručí za výsledek úspor a zaplatí se z těch úspor, které skutečně nastanou. Zkratka z anglického energy performance contracting." },
  { pojem: "Revolvingový fond", vysvetleni: "Fond, do kterého se vracejí splátky půjček, takže se z něj mohou půjčovat další peníze. Stejné prostředky se tak používají opakovaně." },
  { pojem: "Merit order pro teplo", vysvetleni: "Pořadí zdrojů tepla od nejlevnějšího po nejdražší. Do soustavy se nejdřív zapojí nejlevnější dostupný zdroj, například odpadní teplo nebo tepelné čerpadlo, a drahé zdroje až nakonec." },
  { pojem: "Odpadní teplo", vysvetleni: "Teplo, které vzniká jako vedlejší produkt průmyslu, datových center nebo čištění odpadních vod a jinak se vypouští do vzduchu nebo řek." },
  { pojem: "Tepelné čerpadlo – bod zvratu", vysvetleni: "Poměr ceny elektřiny a plynu, od kterého se tepelné čerpadlo začne vyplácet oproti plynovému kotli. Podle textu je to asi 2,7 ku 1, zatímco dnes je poměr zhruba 4 ku 1." },
  { pojem: "SMR (malý modulární reaktor)", vysvetleni: "Jaderný reaktor malého výkonu, který se vyrábí z předem připravených dílů. Česko má přes podíl ČEZ v Rolls-Royce SMR opci na tuto technologii." },
  { pojem: "Stejnosměrný koridor", vysvetleni: "Vedení, které přenáší elektřinu na velké vzdálenosti jako stejnosměrný proud s menšími ztrátami. Německé severojižní koridory přivádějí větrnou elektřinu ze severu do Bavorska." },
];
