export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Stárnutí populace vytváří společný tlak na zdravotnictví, sociální služby, rodiny, pracovní trh i veřejné finance. V následujících přibližně 15–20 letech se má počet lidí ve věku 80 a více let více než zdvojnásobit, zatímco počet lidí v produktivním věku bude klesat. Přibude tak lidí, kteří budou potřebovat léčbu, dlouhodobou podporu nebo pomoc při ztrátě soběstačnosti, a současně relativně ubude těch, kteří mohou péči profesionálně poskytovat a financování systému nést prostřednictvím ekonomické aktivity.",
  },
  {
    typ: "p",
    text: "V životě člověka na sebe zdravotní a sociální stránka navazují bez ohledu na to, jak je rozdělena veřejná správa. Chronické onemocnění se dřív nebo později promítne do soběstačnosti, hospitalizace končí návratem domů, kde je potřeba pomoc s běžnými úkony, a tuto pomoc nakonec zajistí služba, rodina, nebo nikdo. Stejně obousměrně se přelévají náklady: chybějící terénní služba prodlužuje pobyt na lůžku, opožděná rehabilitace zvyšuje potřebu pobytové péče a syn nebo dcera v produktivním věku kvůli péči odcházejí ze zaměstnání.",
  },
  {
    typ: "p",
    text: "Delší život ve zdraví a dostupná dlouhodobá péče proto nejsou dvě oddělená témata, ale jedna hospodářská a společenská výzva. Prevencí a zdravým životním stylem chceme prodloužit dobu, po kterou lidé žijí bez závažných omezení. Efektivním zdravotnictvím zajistíme správnou péči na správném místě. Propojenou zdravotní, sociální a dlouhodobou péčí umožníme lidem zůstat co nejdéle soběstační a žít v přirozeném prostředí. Dostupnými domácími, terénními, komunitními a odlehčovacími službami zároveň vytvoříme podmínky, aby rodinní pečující mohli péči kombinovat se zaměstnáním, odpočinkem a vlastním životem.",
  },
  {
    typ: "p",
    text: "Zdravotnictví a sociální služby jsou v této strategii dvě rovnocenné, vzájemně provázané součásti systému podpory člověka. Jejich úkolem je zlepšovat zdraví, soběstačnost, důstojnost a možnost volby, nikoli pouze přesouvat člověka nebo náklady mezi institucemi a rozpočty. Popis problému ani navrhovaná opatření proto nedělíme na zdravotní a sociální kapitolu. Vedeme je po ose, po které se pohybuje sám člověk: od prevence přes péči poskytnutou na správném místě k udržení soběstačnosti doma a k podpoře těch, kdo o něj pečují.",
  },
  {
    typ: "h3",
    text: "Zdravotnictví: výdaje rostou s věkem, příjmy stojí na pracujících",
  },
  {
    typ: "p",
    text: "České zdravotnictví je financováno převážně z veřejného zdravotního pojištění, které dlouhodobě pokrývá přes 70 % zdrojů systému. Příjmy tvoří z více než dvou třetin odvody ekonomicky aktivních obyvatel, zbytek je platba státu za zákonem vyjmenované skupiny (děti, studenti, senioři, nezaměstnaní). Financování je průběžné, systém nevytváří významné rezervy. Pro rok 2025 činily plánované náklady veřejného zdravotního pojištění přes 560 miliard Kč a systém jako celek měl skončit se schodkem kolem 15 miliard Kč. Záporné saldo si pojišťovny plánovaly i na roky 2025 a 2026 a mezi lety 2022–2024 vykázala alespoň v jednom roce ztrátu každá zdravotní pojišťovna na trhu.",
  },
  {
    typ: "p",
    text: "Demografický výhled je jednoznačný: v následujících zhruba 15–20 letech se počet seniorů ve věku 80+ více než zdvojnásobí, počet státních pojištěnců vzroste přibližně o 10 % a počet lidí v produktivním věku poklesne. Systém je konstrukčně citlivý na stárnutí. Protože příjmy stojí na odvodech pracujících a výdaje rostou s věkem populace, rozevírají se nůžky mezi příjmy a výdaji automaticky. Národní rozpočtová rada opakovaně upozorňuje, že se systém od roku 2023 propadá do deficitu i přes zavedenou automatickou valorizaci plateb za státní pojištěnce, a to ještě před nástupem tlaku obranných výdajů (závazek NATO směřuje k 5 % HDP).[2] Modely IDEA při CERGE–EI i IES FSV UK přitom počítají s tím, že výdaje na zdravotnictví dlouhodobě rostou rychleji než HDP.[3]",
  },
  {
    typ: "p",
    text: "Mechanismus „přidat finance do zdravotnictví přes odvody“ se zdá být vyčerpaný. Složka pojistného placeného zaměstnavateli patří mezi nejvyšší ve vyspělém světě; v celkovém zdanění práce u nižších příjmů je Česko spolu s Estonskem na špici žebříčku OECD. Vyšší zdravotní odvody obecně by ohrozily konkurenceschopnost a dopadly nejvíce na nízkopříjmové pracující, což potvrzují i analýzy PAQ Research o degresivním nastavení odvodů bez daňových slev.[9] Změna výše pojistného proto musí jít ruku v ruce s úpravou daně z příjmu.",
  },
  {
    typ: "p",
    text: "Peníze utrácíme neefektivně tam, kde je to nejdražší. V nemocnicích poskytujeme více péče než zbytek Evropy: nemocniční péče tvoří 46,5 % rozpočtu oproti 36,4 % v EU27, síť není optimálně řízena a zároveň máme neúměrně vysoký počet kontaktů pacienta s lékařem.[1] Česko má také vysokou míru kouření, nadváhy a konzumace alkoholu a jednu z nejnižších měr proočkovanosti seniorů. To se promítá do klíčového ukazatele, délky života ve zdraví, kde dlouhodobě stagnujeme. Roky prožité s vážným omezením se neobjeví jen ve výdajích zdravotních pojišťoven. Přenášejí se do potřeby dlouhodobé podpory, do rodin, které ji zajišťují, a do rozpočtů krajů a obcí, jež odpovídají za dostupnost služeb.",
  },
  {
    typ: "p",
    text: "Česko zaostává i ve zdraví samotném. Naděje dožití při narození činí 76,9 let u mužů (průměr EU 78,7) a 82,8 let u žen (průměr EU 84,0). Délka života ve zdraví (HLY) je 61,2 let u mužů (průměr EU 63,5, nejlépe Švédsko přibližně 71,0) a 62,4 let u žen (průměr EU 64,2, Švédsko přibližně 72,7). Srovnání je metodicky citlivé a hodnoty HLY jsou orientační.[6]",
  },
  {
    typ: "p",
    text: "Struktura financování ukazuje podobný obrázek. Podíl veřejných zdrojů je v Česku přibližně 85 % (EU přibližně 81 %), soukromé zdroje tvoří 15 % (EU 18,7 %) a dobrovolné komerční připojištění pouhých 0,7 % (EU 4,4 %). Podíl nemocniční péče na rozpočtu je 46,5 % oproti 36,4 % v EU.[1]",
  },
  {
    typ: "h3",
    text: "Dlouhodobá péče: kdo ji zajistí a z čeho",
  },
  {
    typ: "p",
    text: "Druhou stranou téže demografie je poptávka po podpoře. Roste podíl seniorů, lidí se zdravotními obtížemi, demencí či psychickými a psychiatrickými diagnózami, zatímco počet lidí v produktivním věku relativně klesá. Přibývat tak bude lidí, kteří potřebují dlouhodobou podporu, péči a sociální služby, současně však ubývá lidí, kteří mohou tuto péči profesionálně poskytovat nebo financování systému prostřednictvím své ekonomické aktivity nést.",
  },
  {
    typ: "p",
    text: "Velká část dlouhodobé péče dnes leží na tzv. neformálních pečujících. V ČR se jejich počet odhaduje na 250–300 tisíc, podle některých odhadů jich však může být až jeden milion. Přibližně dvě třetiny neformálně pečujících tvoří ženy ve věku 35–64 let. Nedostatek terénních a odlehčovacích služeb vede k tomu, že lidé v produktivním věku často opouštějí zaměstnání a dlouhodobě pečují o dítě či partnera se zdravotním postižením nebo seniora s demencí. Péče může trvat mnoho let. Pečující ztrácejí kontakt s profesí a po skončení péče se obtížně vracejí na trh práce, zejména ve vyšším věku. Pro ekonomiku jde o významnou ztrátu pracovní síly.",
  },
  {
    typ: "p",
    text: "Dostatečná síť asistence a odlehčovacích služeb by umožnila pečujícím lépe kombinovat péči se zaměstnáním, například formou částečných úvazků. Domácnosti by tak méně často přicházely o celý příjem a nebyly by tolik závislé na dávkovém systému.",
  },
  {
    typ: "h3",
    text: "Kde hledat příčiny",
  },
  {
    typ: "p",
    text: "Sociální služby nejsou financovány jednotným systémem veřejného pojištění založeným na výkonových platbách, který by dlouhodobě a předvídatelně garantoval financování péče jako ve zdravotnictví. Financování je vícezdrojové a roztříštěné. Podílí se na něm stát prostřednictvím dotací a příspěvku na péči, kraje a obce, uživatelé služeb, zdravotní pojištění, pojištění dlouhodobé péče, EU fondy a další veřejné či soukromé zdroje. Financování není součástí pojistného systému a většina výdajů není mandatorní. Dostupnost služeb se proto mezi regiony liší.",
  },
  {
    typ: "p",
    text: "Odpovědnost za dostupnost služeb je do značné míry decentralizovaná, zatímco významná část financování závisí na každoročních státních transferech a rozhodování krajů a obcí. Konkrétní problémy jsou zejména nejasná odpovědnost za zajištění dostatečných kapacit, nerovnoměrná dostupnost služeb, neexistence některých potřebných služeb v některých regionech, nedostatečně transparentní pravidla rozdělování financí v rámci krajů a obcí, slabá zpětná vazba o využití veřejných prostředků, nedostatečná připravenost systému na přísun klientů ze zdravotní péče a nedostatek pracovníků.",
  },
  {
    typ: "p",
    text: "Sociální služby jsou dnes financovány z více zdrojů: ze státního rozpočtu prostřednictvím dotací MPSV, plánovaných pro rok 2026 ve výši přibližně 57,6 mld. Kč,[16] z příspěvku na péči, který v roce 2025 činil asi 46,5 mld. Kč a náleží přímo člověku závislému na pomoci, z rozpočtů krajů, které na sociální služby vynaložily přibližně 6,1 mld. Kč, a obcí s výdaji kolem 3,85 mld. Kč. Dále se uplatňují úhrady uživatelů, zdravotní pojištění, evropské fondy a další veřejné i soukromé zdroje. Kraje přitom plánují rozvoj služeb a odpovídají za jejich dostupnost, jejich výdaje však pocházejí převážně z obecných daňových příjmů včetně RUD a nejsou účelově vyčleněny. Poskytovatelé proto skládají financování z různých zdrojů podle zařazení do krajské sítě, dostupnosti dotačních titulů a schopnosti získávat další prostředky. Systém je tak roztříštěný a nejistý, přestože jde o služby, které stát a veřejná správa potřebují a často přímo objednávají.",
  },
  {
    typ: "p",
    text: "Rozdělení financí z rozpočtového určení daní ukazuje, jak se peníze dělí mezi pobytové a terénní služby: státní rozpočet přerozdělovaný krajům jde ze 67 % do pobytových a z 33 % do terénních a ambulantních služeb, krajské rozpočty to jsou 77 % a 23 %, obecní rozpočty 51 % a 49 %. Zdrojem je prezentace Jana Klusáčka z diskusního setkání v červnu 2026.",
  },
  {
    typ: "p",
    text: "Pomezí obou systémů: kde se péče ztrácí. Zdravotní a sociální systém dnes fungují do značné míry odděleně, podle odlišných pravidel, s odlišným způsobem financování a s odlišně vymezenou odpovědností. Člověk se mezi nimi přitom pohybuje plynule a jeho stav se nemění podle toho, z jakého rozpočtu je zrovna hrazen. Oddělenost se proto neprojeví v tabulkách, ale v prodloužených hospitalizacích, v čekání na místo v pobytové službě a v rodinách, které do té doby zajišťují péči samy. Zdravotnictví zvažuje častěji přesouvat pacienty z nákladných zdravotních lůžek do sociální péče. K tomu je nutný dostatečně kapacitní a koordinovaný systém návazné péče. Bez něj se úspora na straně zdravotního pojištění pouze přesune jinam: do dotací na sociální služby, do rozpočtů rodin, nebo do výpadku jejich příjmu poté, co pečující opustí zaměstnání.",
  },
  {
    typ: "p",
    text: "Finanční podpora sociálních služeb pro lidi se zdravotním znevýhodněním ukazuje stejný problém v číslech: terénní služby dostávají 2,61 mld. Kč (19 %), pobytové služby 8,45 mld. Kč (62 %) a ambulantní služby 2,54 mld. Kč (19 %). Podle odborných odhadů přitom v Praze chybí až 3 000 sociálních pracovníků a pracovníků v sociálních službách. Proti přibližně 48 tisícům úvazků v pobytových službách je v terénních službách jen kolem 12 tisíc a v ambulantních přibližně 4 tisíce úvazků. Nedostatek se týká také zdravotních sester, které jsou klíčové pro propojení zdravotní a sociální péče.",
  },
  {
    typ: "p",
    text: "Poznámka k demografickým údajům: úplná tabulka základních demografických a socio-ekonomických ukazatelů za léta 2012–2025 je v PDF publikace (str. 36) a do textu nebyla přenesena. Pro ilustraci zde uvádíme tři klíčové řady. Počet živě narozených klesl z 108 576 osob v roce 2012 na 77 636 osob v roce 2025. Naděje dožití při narození vzrostla u mužů z 75,0 na 77,5 let a u žen z 80,9 na 83,2 let (zdroj: ČSÚ, MPSV).",
  },
  {
    typ: "h3",
    text: "Cíle",
  },
  {
    typ: "p",
    text: "Naším ústředním cílem je prodloužit dobu dožití ve zdraví o 5 let během jedné generace a tím zároveň stabilizovat veřejné finance. Ekonomický potenciál je doložen studií McKinsey Global Institute pro Česko.[7] Roční ztráta ekonomiky kvůli špatnému zdraví a předčasným úmrtím činí zhruba 14 % HDP, tedy přibližně 700 mld. Kč. Podíl ztracených zdravých let, který dopadá na produktivní věk, je 62 %, a 72 % potenciálu zlepšení je řešitelných prevencí a životosprávou. Potenciál dodatečného HDP do roku 2040 odhaduje studie na přibližně 840 mld. Kč (+0,7 %). Návratnost investice do zdraví je 1,7 Kč na 1 Kč (MGI), podle Lancetu až 10 : 1.",
  },
  {
    typ: "p",
    text: "Se stejnou vahou klademe vedle toho druhý cíl: aby lidé zůstali co nejdéle soběstační a aby péče o blízkého člověka neznamenala odchod z pracovního trhu. Roky prožité ve zdraví i roky, které pečující stráví mimo zaměstnání, se nakonec potkávají ve stejné veličině, v nabídce práce a ve výkonu ekonomiky.",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "p",
    text: "Opatření řadíme do čtyř linií. První snižuje budoucí potřebu péče, druhá dostává péči na správné místo, třetí umožňuje člověku co nejdéle žít soběstačně doma a čtvrtá se týká peněz a odpovědnosti za ně. Linie na sebe navazují a některé z nich dávají smysl pouze tehdy, plní-li se současně.",
  },
  {
    typ: "h3",
    text: "1. Zdravý životní styl a prevence sníží budoucí potřebu péče",
  },
  {
    typ: "p",
    text: "Prevenci nechápeme jako pouhé „razítko z prohlídky“. Preventivní prohlídka je cenný nástroj včasného záchytu nemoci, ale sama o sobě neznamená, že je člověk zdravý. Kdo na prohlídku dojde, ale kouří, pije a trpí obezitou, na tom není z hlediska svého zdraví ani veřejných rozpočtů lépe než ten, kdo nekouří, sportuje a dobře jí, jen zrovna na prohlídku nezašel. Naším cílem je proto skutečné zdraví v celé jeho šíři: dostatek pohybu, kvalitní strava, spánek, nekouření a střídmost v alkoholu. Preventivní prohlídku bereme jako vstupní bod a měření, nikoli jako cíl sám o sobě.",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Úhrady lékařům navázané na práci se životním stylem",
        text: "Úhrady lékařům navážeme nejen na účast pacientů na prevenci, ale především na krátké intervence a nasměrování k programům životního stylu: na zachycení a řešení kouření, rizikové konzumace alkoholu, nadváhy a nedostatku pohybu. Odměňujeme tedy skutečnou práci se zdravím pacienta, ne jen počet vykonaných prohlídek. Podklad se opírá o doporučení NERV (krátké intervence lékařů, kapitace navázaná na prevenci).",
      },
      {
        nazev: "Spotřební daň ze slazených nápojů a úprava daně z alkoholu s výnosem do prevence",
        text: "Omezíme zdravotně rizikovou spotřebu potravin, nápojů apod. Zavedeme spotřební daň ze slazených nápojů, zrušíme výjimku u tichého vína a upravíme spotřební daň u alkoholu obecně. Očekávaný výnos je 10–15 mld. Kč ročně i po zohlednění poklesu spotřeby. Minimálně 40 % výnosu (4–6 mld. Kč) účelově vážeme do Fondu prevence zdravotních pojišťoven, aby se část výnosu vrátila do prevence.",
      },
    ],
  },
  {
    typ: "p",
    text: "Prevence je zároveň nejlevnější dlouhodobou péčí. Každý rok, o který se odsune ztráta soběstačnosti, je rok, který nemusí pokrýt terénní služba, pobytové zařízení ani pečující v rodině.",
  },
  {
    typ: "h3",
    text: "2. Efektivita: správná péče na správném místě",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Přesun péče z lůžek do jednodenní, ambulantní a domácí péče",
        text: "Podíl nemocniční péče na rozpočtu snížíme z 46,5 % k evropskému průměru 36,4 % (−10 p. b.) do roku 2035 přesunem do jednodenní, ambulantní, domácí péče a telemedicíny. Nemocnice restrukturalizujeme do regionálních sítí. Podmínkou je kapacita na druhé straně: domácí a ošetřovatelská péče, terénní a odlehčovací služby a lidé, kteří je zajistí. Rozvoj těchto kapacit proto plánujeme ve stejném čase jako restrukturalizaci lůžkové sítě, ne až po ní. Opatření třetí linie jsou v tomto smyslu předpokladem úspor ve zdravotnictví, nikoli samostatnou položkou vedle nich.",
      },
      {
        nazev: "Rozšíření hodnocení nákladové efektivity (HTA)",
        text: "Hodnocení nákladové efektivity rozšíříme ze samotných léků na všechny hrazené intervence a začneme započítávat i úspory v sociálním systému, což umožní probíhající propojení dat MZ–MPSV. Posuzovat tedy budeme dopad na veřejné rozpočty jako celek. Opatření, které zdraží sociální služby a ušetří na hospitalizacích, i opatření s opačným efektem musí projít stejnou optikou.",
      },
    ],
  },
  {
    typ: "h3",
    text: "3. Soběstačnost, dlouhodobá péče a podpora pečujících",
  },
  {
    typ: "p",
    text: "Tato linie má dva výstupy zároveň: udržet člověka co nejdéle v jeho přirozeném prostředí a otevřít dveře na pracovní trh těm, kdo o něj pečují.",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Posílení postavení neformálních pečujících",
        text: "Rozšíříme terénní, asistenční a odlehčovací služby, aby pečující mohli péči kombinovat se zaměstnáním, odpočinkem a vlastním životem. V návaznosti na politiku pracovního trhu podpoříme růst částečných úvazků ze současných přibližně 7 % na 15 % do roku 2040.",
      },
      {
        nazev: "Výrazné rozšíření terénních a odlehčovacích služeb",
        text: "V příštích deseti letech bude podle odborných odhadů nutné postupně zvýšit jejich financování přibližně o 40–50 mld. Kč. Dostupnější služby podpoří zaměstnanost pečujících a omezí tlak na pobytovou péči.",
      },
      {
        nazev: "Pokračování v deinstitucionalizaci",
        text: "Budeme převádět péči o osoby se zdravotním postižením z velkých zařízení, v nichž žije přibližně 15 tisíc lidí, do menších komunitních služeb. Nová zařízení by měla mít nejvýše 18 míst. Současné terénní kapacity pokrývají jen 5–10 % a ambulantní 15–20 % potřeb.",
      },
      {
        nazev: "Posílení personálních kapacit",
        text: "Rozvoj služeb podpoříme odpovídajícím růstem počtu pracovníků, zejména v terénní a ambulantní péči. Proti přibližně 48 tisícům úvazků v pobytových službách je v terénních službách jen kolem 12 tisíc a v ambulantních přibližně 4 tisíce úvazků. Část těchto profesí stojí přímo na pomezí obou systémů, zejména zdravotní sestry v domácí a ošetřovatelské péči, jejichž nedostatek dnes brzdí zdravotnictví i sociální služby současně.",
      },
    ],
  },
  {
    typ: "h3",
    text: "4. Zdroje a odpovědnost za financování",
  },
  {
    typ: "p",
    text: "Zdravotní a sociální péče zůstanou hrazeny z různých zdrojů, to vyplývá z jejich povahy. Předvídatelné ale musí být rozhraní mezi nimi: kdo službu objednává, kdo odpovídá za její dostupnost a z čeho se hradí péče, která leží mezi oběma systémy.",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Zpřehlednění a sjednocení systému",
        text: "Jasně vymezíme odpovědnost státu, krajů a obcí a sjednotíme pravidla plánování a financování podle skutečných potřeb regionů. Dostupnost základních služeb nesmí záviset na místních prioritách.",
      },
      {
        nazev: "Rozlišení financování péče o seniory a osoby se zdravotním postižením",
        text: "Připravíme odpovídající modely financování obou typů péče. U seniorů prověříme vyšší spoluúčast, pojištění dlouhodobé péče a majetkové testování. U osob se zdravotním postižením zachováme významnou roli státního rozpočtu a RUD s cílem dosáhnout přibližně 3 % krajského a obecního RUD a garantovat dostupnost služeb bez ohledu na bydliště. Porovnání ukazuje, že náklady dlouhodobé péče v komunitě jsou v Česku 0,5 % HDP, zatímco jinde v Evropě 1,5–2,5 % HDP.",
      },
      {
        nazev: "Zvýhodnění těch, kdo aktivně pečují o své zdraví",
        text: "Inspirujeme se nejlépe hodnocenými evropskými systémy (Nizozemsko) a umožníme, aby zdravotní pojišťovna navázala část pojistného na aktivní a doložitelnou péči pojištěnce o vlastní zdraví. Lidem, kteří o sebe pečují, bude moci nabídnout nižší platbu a naopak bude mít z čeho financovat kvalitnější služby. Klíčové je, co tím odměňujeme: ne razítko z prohlídky, ale širší koš skutečně zdraví prospěšného chování, tedy pravidelný pohyb, nekouření, střídmost v alkoholu, práci s hmotností a spánkem a účast v ověřených programech (odvykání kouření, pohybové a nutriční programy). Rozhoduje zapojení a zlepšení v čase, nikoli aktuální zdravotní stav. Zavedeme pilotně a povinně jen pro ročníky do 40 let, doprovozené reformou DPFO.",
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
      "Nižší nemocnost a delší produktivní život. V roce 2024 bylo denně v pracovní neschopnosti přes 182 tisíc lidí; jen za první pololetí bylo vystaveno zhruba 1,3 milionu neschopenek (průměr 32,5 dne). Každý ušetřený den je výkon navíc.[5]",
      "Zachovaná pracovní kapacita pečujících. Dostupné terénní, asistenční a odlehčovací služby umožní pečovat a přitom nepřerušit profesní dráhu; domácnosti tak méně často přijdou o celý příjem.",
      "Udržitelné veřejné finance bez skokového zvyšování odvodů z práce.",
      "Spravedlivější přístup ke zdraví. Dnes jsou zdravotní rizika silně sociálně podmíněná: u dětí z chudších rodin začíná nerovnost u obezity a končí u depresí.[9]",
    ],
  },
  {
    typ: "p",
    text: "Zdravější a soběstačnější populace je předpokladem silnější ekonomiky. Prevence a účinnější péče prodlouží dobu aktivního života, sníží pracovní neschopnost a podpoří produktivitu. Dostupné domácí, terénní a odlehčovací služby umožní pečujícím zůstat na pracovním trhu a omezí propad rodin do příjmové nejistoty. Lepší propojení zdravotní a sociální péče současně sníží zbytečné výdaje na hospitalizace a institucionální péči. Opatření tak posílí nabídku práce, ekonomickou aktivitu i odolnost domácností a pomohou stabilizovat veřejné finance v podmínkách stárnutí populace.",
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "NERV, 2024. Udržitelnost financování zdravotnictví: pracovní podklad tematické skupiny Zdravotnictví. Praha: Úřad vlády ČR. Web: vlada.gov.cz." },
  { index: 2, citace: "Národní rozpočtová rada, 2024, 2025. Zpráva o dlouhodobé udržitelnosti veřejných financí; informační studie Délka života ve zdraví. Web: rozpoctovarada.cz." },
  { index: 3, citace: "Bryndová, L. a Šlegerová, L., IDEA při CERGE-EI. Model příjmů a výdajů veřejného zdravotního pojištění; studie k udržitelnosti veřejných financí. Web: idea.cerge-ei.cz." },
  { index: 4, citace: "Ministerstvo zdravotnictví a ÚZIS, 2025. Strategické analýzy potřeb rezortu zdravotnictví (Koncepce 2025). Web: mzd.gov.cz, nzip.cz/koncepce2025." },
  { index: 5, citace: "ÚZIS a ČSÚ, 2024. Pracovní neschopnost pro nemoc a úraz v ČR; Střední délka života ve zdraví (Senioři v datech). Web: csu.gov.cz." },
  { index: 6, citace: "OECD a Evropská komise, 2023, 2025. State of Health in the EU: Zdravotní profil Česko. Web: health.ec.europa.eu, oecd.org." },
  { index: 7, citace: "McKinsey Global Institute. Prioritizing Health / Zdraví a ekonomický růst (ČR). Web: mckinsey.com." },
  { index: 8, citace: "Institut / Iniciativa pro efektivní zdravotnictví (J. Hlávka). Studie o účasti na prevenci; grafy a mapy měsíce. Web: efektivnizdravotnictvi.cz, hepii.econ.muni.cz." },
  { index: 9, citace: "PAQ Research. Chytřejší daňení zaměstnanců; socioekonomické nerovnosti ve zdraví; studie HBSC. Web: paqresearch.cz." },
  { index: 10, citace: "Advance Healthcare Management Institute. Prevence: praktický návod na zlepšení zdravotního stavu a podporu ekonomického růstu. Web: advanceinstitute.cz." },
  { index: 11, citace: "KLUSÁČEK, Jan, 2026. Analýza základních dat o kapacitách a financování sociálních služeb pro osoby se zdravotním znevýhodněním (a seniory) v Česku. Praha: JDI, z. s. Dostupné z: https://jdicz.eu/infodata-data-analyzy-infopapery/." },
  { index: 12, citace: "Röschová, M., Duarte, J., Špalek, J., 2026. Životní podmínky osob s vysokou potřebou péče. Výzkumná zpráva. Praha: PAQ Research. Dostupné z: https://www.paqresearch.cz/post/pece-o-lidi-s-postizenim/." },
  { index: 13, citace: "MPSV, 2026. Analýza vývoje příjmů a výdajů domácností ČR v roce 2025. Praha: MPSV. Dostupné z: https://mpsv.gov.cz/analyza-vyvoje-prijmu-a-vydaju-domacnosti-cr-v-roce-2025." },
  { index: 14, citace: "MPSV, 2026. Informace o vyplacených dávkách v rezortu MPSV ČR v prosinci 2025. Praha: MPSV. Dostupné z: https://mpsv.gov.cz/informace-o-vyplacenych-davkach." },
  { index: 15, citace: "MPSV. Statistická ročenka z oblasti práce a sociálních věcí 2025. Praha: MPSV. Dostupné z: https://mpsv.gov.cz/statisticka-rocenka-z-oblasti-prace-a-socialnich-veci-2025." },
  { index: 16, citace: "MPSV, 2025. Financování sociálních služeb v roce 2026: 57,6 mld. Kč. Praha: MPSV. Dostupné z: https://mpsv.gov.cz/pro-rok-2026-mpsv-navysi-financovani-socialnich-sluzeb-o-1-972-mld." },
  { index: 17, citace: "MPSV, 2025. Bilance působení na MPSV (2021–2025). Prezentace. Praha: MPSV, září 2025. Dostupné z: https://mpsv.gov.cz/pro-rok-2026-mpsv-navysi-financovani-socialnich-sluzeb-o-1-972-mld." },
  { index: 18, citace: "MPO, 2026. Hospodářská strategie. Česko: Země pro budoucnost 2.0. Praha: MPO. ISBN 978-80-906942-9-3. Dostupné z: https://vlada.gov.cz/cz/ppov/nerv_2020/pracovni_skupiny/pracovni-skupiny-nerv-182439/." },
  { index: 19, citace: "NERV. Návrhy NERV k vyššímu dlouhodobě udržitelnému ekonomickému růstu. 37 opatření. Pracovní materiál pracovní skupiny. Praha: Úřad vlády ČR. Web: vlada.gov.cz." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "Délka života ve zdraví (HLY)", vysvetleni: "Počet let, které člověk v průměru prožije bez závažných zdravotních omezení. Na rozdíl od naděje dožití neměří jen délku života, ale i jeho kvalitu." },
  { pojem: "Kapitace", vysvetleni: "Způsob úhrady lékaři, kdy dostává pevnou částku za každého registrovaného pacienta bez ohledu na počet jeho výkonů. Strategie chce část úhrady navázat na prevenci." },
  { pojem: "HTA (hodnocení zdravotnických technologií)", vysvetleni: "Systematické posouzení, zda je léčba nebo postup dostatečně přínosný vzhledem k nákladům. Strategie ho chce rozšířit na všechny hrazené intervence a započítat i úspory v sociálním systému." },
  { pojem: "Jednodenní péče", vysvetleni: "Zdravotní výkony, při nichž pacient přijde do nemocnice ráno a ještě téhož dne se vrací domů. Nahrazuje část lůžkové péče." },
  { pojem: "Telemedicína", vysvetleni: "Poskytování zdravotní péče na dálku, například videokonzultací, sdílením dat z přístrojů nebo sledováním pacienta z domova." },
  { pojem: "Odlehčovací služby", vysvetleni: "Krátkodobá péče o člověka závislého na pomoci, která dá pečujícímu příležitost odpočinout si, vyřídit věci nebo se vrátit do zaměstnání." },
  { pojem: "Terénní služby", vysvetleni: "Sociální služby, které přicházejí za člověkem domů, například pomoc při osobní hygieně, vaření nebo úklidu." },
  { pojem: "Deinstitucionalizace", vysvetleni: "Přechod od péče ve velkých ústavních zařízeních k menším službám v běžném prostředí, kde člověk žije v komunitě." },
  { pojem: "Neformální pečující", vysvetleni: "Člověk, který pečuje o blízkého (dítě, partnera, rodiče) bez formálního zaměstnání nebo odměny. Často tím přichází o příjem a profesní kontakt." },
  { pojem: "Příspěvek na péči", vysvetleni: "Dávka státu určená přímo člověku, který potřebuje pomoc s běžnými úkony. Peníze mohou použít na službu nebo na péči ve vlastní rodině." },
  { pojem: "Průběžné financování", vysvetleni: "Způsob financování, při kterém se výdaje jednoho roku hradí z příjmů stejného roku. Systém nevytváří významné rezervy, takže výpadek příjmů nebo růst výdajů se projeví ihned." },
  { pojem: "Spotřební daň ze slazených nápojů", vysvetleni: "Daň, kterou se zdraží nápoje s přidaným cukrem. Cílem je snížit jejich spotřebu a získat peníze na prevenci." },
  { pojem: "Fond prevence zdravotních pojišťoven", vysvetleni: "Účelově vázaný fond, z něhož se financují preventivní programy. Strategie navrhuje do něj přesměrovat alespoň 40 % výnosu ze spotřební daně." },
  { pojem: "RUD (rozpočtové určení daní)", vysvetleni: "Pravidlo, podle kterého se rozdělují peníze z daní mezi stát, kraje a obce. Kraje a obce z něj financují většinu svých služeb, včetně sociálních." },
  { pojem: "Pobytová sociální služba", vysvetleni: "Služba, při níž člověk bydlí ve sociálním zařízení, například v domově pro seniory nebo v domově se zvláštním režimem. Na rozdíl od terénních služeb nevyžaduje, aby člověk žil ve vlastní domácnosti." },
];
