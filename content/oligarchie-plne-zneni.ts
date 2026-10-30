export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Oligarchie je doslova opakem ideálu férové tržní ekonomiky. Oligarchické struktury v České republice patří bohužel k nejsilnějším v Evropské unii. Oligarchie znamená koncentraci moci byznysové, mediální a případně politické v jedněch rukou. Jsme třetí nejhorší v transparentnosti vlastnictví médií v EU (za Maďarskem a Polskem), máme jednu z nejvyšších majetkových koncentrací na špici pyramidy (za Ruskem, Tureckem a Švédskem). Ovládání médií největšími podnikatelskými skupinami v zemi jim dává enormní vydírací sílu vůči politickým stranám. Naplňování zákona o střetu zájmů není důsledně posuzováno a vymáháno; ÚOHS málo koná.",
  },
  {
    typ: "p",
    text: "Přezkoumávání veřejných zakázek je komplikované. Veřejné zakázky představují obrovský objem, skoro jeden bilion Kč, tedy 14 % HDP. Je tedy ve velkém zájmu přezkumy zjednodušit a zrychlit.",
  },
  {
    typ: "p",
    text: "Oligarchickou ekonomiku platíme všichni. Dle studie CERGE – EI dosahují dominantní hráči vyšších zisků než malí a střední. Podstatné zjištění pak je, že v době inflační krize mezi hlavní příčiny inflačního motoru patřil růst cen potravin a energií, kde oligarchické struktury existují a jsou velmi silné.[1]",
  },
  {
    typ: "p",
    text: "Velmi neblahým jevem jsou pak vysoké dotace (roční objemy 20–30 mld Kč) jdoucí právě gigantům. Opět výzkumy CERGE – EI prokazují, že tyto dotace se nepromítají do vyšší inovativnosti a produktivity výrobců (kam byly formálně mířeny), ale přesouvají se do zisku těchto firem.[2]",
  },
  {
    typ: "p",
    text: "Boj proti oligarchické moci, která je u nás pevně zakořeněna, je extrémně těžký a dlouhodobý; jakmile se jednou tyto struktury vytvoří, je obtížné je rozbíjet. Inspirací nám v tomto může být Dánsko, které provedlo v roce 2024 velkou reformu soutěžního práva. Nově antimonopolní úřad posuzuje i poměrně malé fúze a akvizice (od 50 mil. DKK, tj. 200 mil. Kč obratu výše), aby se zabránilo tzv. zabijáckým akvizicím ze strany gigantů, které takto likvidují malé inovativní konkurenty. Úřad má možnost fúzi zamítnout, pokud by došlo k posílení dominantního postavení kupujícího. Nově též dává úřadu pravomoci jednak zkoumat, jednak i zasáhnout v případě jednání více soutěžitelů (tj. u „tichého oligopolu“), pokud dospěje k názoru, že oslabují hospodářskou soutěž. A konečně stanovuje pokuty odvozené od obratu, nikoli fixní částkou, potenciálně mnohonásobně vyšší, tedy více odrazující.[3]",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Prosadit důsledný zákon o střetu zájmů.",
        text: "Zákon neumožňuje směšovat moc politickou s byznysovou silou a mediálním vlivem.",
      },
      {
        nazev: "Bránit dalšímu koncentrování mediální moci.",
        text: "K tomu již existují zákonné prostředky: evropské nařízení EMFA, které je od roku 2025 platné a jsme povinni se jím řídit. EMFA zavádí mimo jiné vysokou transparentnost vlastnictví médií a zveřejnění skutečných majitelů.",
      },
      {
        nazev: "Hledat způsoby, jak omezit koncentraci moci byznysové a mediální.",
        text: "Současná evropská legislativa umožňuje, aby v jedněch rukou bylo možné soustředění obří byznysové (nemediální) moci a současně vlastnictví silných médií. Je potřeba hledat cesty, jak toto křížové vlastnictví omezit, zejména v případě, kdy se jedná o byznys ve státem regulované či silně dotačně podporované oblasti. Cestou může být lobbování na úrovni EU, aby v tomto přijala příslušnou legislativu. Tento problém totiž nevyvstává jen v ČR, byť u nás je velmi silný. Koncentrace mediální moci, která pak redukuje její pluralitu, je v ČR velmi vysoká (viz Media Pluralism Monitor 2024).[4] Česká republika je řazena mezi státy s vysokým rizikem a je ve skupině se státy Balkánu. Imunní ale nejsou i některé západoevropské země.",
      },
      {
        nazev: "Posílit antimonopolní zákony a možnosti ÚOHS.",
        text: "Směrnice EU (2019/633) je již implementována do zákona o významné tržní síle. Existuje tedy zákonný podklad pro daleko aktivnější roli státu, je potřeba jej ale začít aktivněji uplatňovat. Je ale potřeba jít dál, patří sem například postavení tzv. tacitních dohod o souběžném zvyšování cen ze strany významných hráčů mimo zákon (bez nutnosti prokázat výslovný kartel). Je potřeba snížit strop pro tzv. tržní dominanci pod 40 %. ÚOHS musí mít právo nařídit divestituru (odprodej části podniku) v případě dosažení dominance a je nutné výrazně zvýšit pokuty za porušení (viz dánský příklad výše).",
      },
      {
        nazev: "Vyřadit největší hráče z plošných dotačních titulů, či jim je výrazně snížit.",
        text: "Firmy s vysokým tržním podílem by měly mít nulovou způsobilost pro tyto dotace. Změnit strukturu podpory tak, aby zvýhodňovala malé firmy a postupně s růstem velikosti firmy klesala. Lze provést novelizací současných předpisů. Specificky v oblasti zemědělství je potřeba zavést zastropování dotací na plochu, a to na skutečného majitele (skrze sledování propojenosti), ve výši max. 100 tis. EUR ročně. Dojde k efektivní podpoře malých a středních (tj. rodinných) farem, které jsou páteří venkova. Dotační těžiště nesmí spočívat v dnešní de facto podpoře maximalizace produkce bez sledování jiných veřejných zájmů, a tedy i péče o zdroje národního kapitálu (tj. ochrana půdy před erozí, zadržování vody v krajině, kvalita vody, biologická rozmanitost). Specifickou kapitolou je udržení a rozvoj know-how náročnější produkce (ovocnářství a zelinářství), v živočišné výrobě s vazbou na půdu a ukládání uhlíku a inovativní produkci finálních výrobků šetrných k životnímu prostředí i zdraví.",
      },
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Když oslabíme oligarchické struktury, posílíme férovou hospodářskou soutěž, transparentnost vlastnictví médií i důsledné vymáhání pravidel, omezíme koncentraci ekonomické, mediální a politické moci v rukou několika málo aktérů.",
  },
  {
    typ: "p",
    text: "Zlepšení hospodářské soutěže, tedy konkurence, přinese nižší ceny, efektivnější veřejné zakázky, smysluplnější využívání dotací pro inovace a produktivitu a lepší prostředí pro malé a střední podniky i důvěru veřejnosti ve stát.",
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "Bajgar, M. a Srholec, M., 2023. Are Subsidies to Business R&D Effective? Regression Discontinuity Evidence from the TA ČR ALFA Programme. Praha: IDEA při CERGE-EI, Studie 7/2023." },
  { index: 2, citace: "Srholec, M., 2024. Jaké inovativní firmy (ne)čerpají veřejnou podporu na inovace? Praha: IDEA při CERGE-EI, Studie 16/2024." },
  { index: 3, citace: "Danish Competition and Consumer Authority (KFST), 2024. The Danish Competition Act (Consolidated Act No. 1150 of 03/11/2024). Copenhagen: KFST." },
  { index: 4, citace: "Centre for Media Pluralism and Media Freedom (CMPF), 2024. Media Pluralism Monitor 2024. Fiesole: European University Institute." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "Oligarchie", vysvetleni: "Koncentrace moci v rukou úzké skupiny podnikatelů, která se přelévá do médií a do politiky." },
  { pojem: "Střet zájmů", vysvetleni: "Situace, kdy se osobní nebo byznysový zájem úředníka či politika střetne s veřejným zájmem, který má hájit." },
  { pojem: "EMFA", vysvetleni: "Evropské nařízení o svobodě médií (European Media Freedom Act), platné od roku 2025. Zavádí mimo jiné transparentnost vlastnictví médií a zveřejnění skutečných majitelů." },
  { pojem: "ÚOHS", vysvetleni: "Úřad pro ochranu hospodářské soutěže. Dohlíží na férovou soutěž, posuzuje fúze a trestá dohody, které ji narušují." },
  { pojem: "Divestitura", vysvetleni: "Nucený odprodej části podniku, pokud firma získá nebo zneužívá dominantní postavení na trhu." },
  { pojem: "Tichý oligopol", vysvetleni: "Situace, kdy několik firem na trhu koordinuje své chování bez výslovné dohody, například souběžným zvyšováním cen, a tím oslabuje soutěž." },
  { pojem: "Tržní dominance", vysvetleni: "Postavení firmy na trhu, které jí umožňuje jednat nezávisle na konkurentech, zákaznících a dodavatelích. Posuzuje se hlavně podle velikosti tržního podílu." },
  { pojem: "Zastropování dotací", vysvetleni: "Stanovení nejvyšší částky, kterou může jeden příjemce dotace získat za rok. Brání tomu, aby dotace šly hlavně největším hráčům." },
];
