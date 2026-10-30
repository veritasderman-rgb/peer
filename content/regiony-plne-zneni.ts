export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Česká ekonomika se jako celek přibližuje evropskému průměru, růst je však mezi regiony rozložen nerovnoměrně.[4] Zatímco Praha a Jihomoravský kraj patří k hlavním motorům pokroku, Ústecký a Karlovarský kraj dlouhodobě zaostávají. Například v sousedním Polsku je naproti tomu růst rozložen mezi regiony výrazně rovnoměrněji.[1]",
  },
  {
    typ: "p",
    text: "Rozdíly navíc stále méně kopírují hranice krajů: vzdělávací neúspěšnost, exekuce, dostupnost služeb nebo dopravní izolace se výrazně liší i mezi sousedními mikroregiony. Regionální politiku proto musíme více cílit na úroveň obcí s rozšířenou působností a funkčních mikroregionů.",
  },
  {
    typ: "p",
    text: "Regionální zaostávání není jen otázkou kvality života. Znamená nevyužitý lidský kapitál, nižší produktivitu a podnikatelskou aktivitu, odchod mladých lidí a současně větší tlak na bydlení a infrastrukturu v nejrychleji rostoucích centrech. Část problému vytváří i samotné nastavení veřejné správy. Obce mají malou finanční motivaci podporovat ekonomický rozvoj, česká samospráva je mimořádně roztříštěná a zejména malé obce často postrádají kapacitu připravovat větší investice. České obce přitom drží na účtech přibližně 300–400 miliard korun, zatímco řada potřebných investic nevzniká nebo závisí na dotačních výzvách.",
  },
  {
    typ: "p",
    text: "České obce a kraje jsou financovány způsobem, který systematicky trestá rozvoj. Téměř 97–98 % jejich příjmů pochází ze státního rozpočtu bez jakékoli vazby na to, co se v obci děje. Podíl příjmů z místní ekonomické aktivity činí pouhá ~2 %, druhý nejhorší výsledek v celé EU (hůře je na tom jen Řecko).[2][3]",
  },
  {
    typ: "p",
    text: "Regionální politika proto nemůže stát především na dalších dotacích. Potřebujeme změnit motivace obcí, zvýšit profesionalitu samosprávy, lépe využít veřejné peníze a vytvořit podmínky pro více soukromých investic mimo nejsilnější centra.",
  },
  {
    typ: "h3",
    text: "Cíle",
  },
  {
    typ: "p",
    text: "Naším cílem není uměle vyrovnat ekonomický výkon všech částí země. Praha bude vždy plnit jiné funkce než Jesenicko nebo Mostecko. Chceme, aby místo bydliště zásadně neomezovalo přístup ke kvalitnímu vzdělání, práci a veřejným službám a aby ekonomický růst táhla širší síť regionálních center.",
  },
  {
    typ: "p",
    text: "Naším cílem je:",
  },
  {
    typ: "ul",
    polozky: [
      "obnovit ekonomický růst dnes zaostávajících regionů;",
      "postavit regionální politiku více na úrovni obcí s rozšířenou působností a funkčních mikroregionů;",
      "změnit financování obcí tak, aby se jim ekonomický rozvoj vyplácel;",
      "zvýšit odbornou a investiční kapacitu samospráv a snížit jejich administrativní fragmentaci;",
      "lépe využívat obecní úspory a návratné finanční nástroje;",
      "posílit regionální centra a jejich vzájemné propojení.",
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
        nazev: "Změníme financování obcí: rozvoj se musí vyplatit",
        text: "Současné rozpočtové určení daní jen slabě propojuje příjmy obce s ekonomickou aktivitou na jejím území. Nová výstavba nebo velká investice přitom obci vytvářejí náklady na školy, dopravu a další infrastrukturu. Pokud mají obce rozvoj podporovat, musí na jeho přínosech přímo participovat. Nejméně 20 % obecního rozpočtového určení daní, v dnešním objemu přibližně 60 miliard korun ročně, proto navážeme na ekonomickou aktivitu v území, například na výběr daně z příjmů fyzických osob a sociálního pojistného. Část motivační složky budeme počítat na úrovni obcí s rozšířenou působností, aby se obcím vyplatila spolupráce. Relativně posílíme také financování měst mezi 5 a 40 tisíci obyvatel, která zajišťují služby širšímu okolí. Stejný princip uplatníme u činností, jejichž náklady dopadají především na konkrétní území: obce musí mít odpovídající podíl na výnosech z těžby a velkých energetických projektů. U nové výstavby vytvoříme transparentní mechanismus příspěvku na vyvolanou infrastrukturu. Součástí rozpočtového určení daní zároveň zůstane solidární složka zohledňující sociální znevýhodnění. Reforma bude převážně fiskálně neutrální a změní především rozdělení peněz a pobídky systému.",
      },
      {
        nazev: "Posílíme společnou správu a podpoříme konsolidaci nejmenších obcí",
        text: "Česko má přes 6 200 obcí, z toho přibližně 4 700 méně než tisíc obyvatel. Silná místní identita je hodnotou, extrémní administrativní fragmentace však zvyšuje náklady a oslabuje odbornou kapacitu. Malá obec nemůže efektivně zaměstnávat specialisty na právo, veřejné zakázky, energetiku, územní plánování nebo přípravu investic. Posílíme proto Společenství obcí a další formy spolupráce na úrovni mikroregionů. Dostanou stabilní financování a budou moci společně zajišťovat odborné agendy, projektovou přípravu a investice. Stát nebude nové povinnosti automaticky přenášet na každou jednotlivou obec, pokud je lze efektivněji vykonávat společně. Současně budeme finančně podporovat dobrovolné slučování především nejmenších obcí. Dlouhodobým cílem je omezit počet samostatně fungujících administrativních celků a přiblížit jejich minimální efektivní velikost zhruba tisíci obyvatel. Konsolidace nesmí znamenat zánik místní identity: jednotlivá sídla si mohou zachovat místní zastoupení i garantovanou část rozpočtu, o jejímž využití budou rozhodovat jejich zástupci.",
      },
      {
        nazev: "Rozhýbeme obecní úspory a vytvoříme společné investiční financování",
        text: "Obce drží stovky miliard korun rezerv, současně ale řada z nich dlouho spoří na jednotlivé investice nebo není schopna využít výhodné financování Evropské investiční banky a dalších institucí.[5] Problémem není jen nedostatek peněz, ale jejich roztříštěnost a nedostatečná projektová kapacita. Umožníme proto dobrovolný pooling volných prostředků samospráv a jejich využití pro levnější dlouhodobé financování obecních investic. Posílíme roli Národní rozvojové banky jako hlavního prostředníka mezi Evropskou investiční bankou, kapitálovým trhem a samosprávami. Národní rozvojová banka bude agregovat kapitál a nabízet standardizované úvěrové a záruční produkty dostupné i menším obcím. Podpoříme také vznik dobrovolného komunálního investičního mechanismu po vzoru zahraničních systémů společného financování municipalit. Sdružené obce a kraje budou moci získávat kapitál za výhodnějších podmínek a sdílet projektovou, finanční a právní expertizu. Postupně tak nahradíme část grantového financování návratnými nástroji a snížíme závislost regionálních investic na jednotlivých dotačních programech.",
      },
      {
        nazev: "Soustředíme veřejné peníze do investic s největším rozvojovým efektem",
        text: "Evropské a národní prostředky jsou dnes příliš roztříštěné mezi množství programů a drobných projektů. To zvyšuje administrativní náklady a často zvýhodňuje instituce s nejlepšími projektovými týmy namísto území s největšími potřebami. Veřejné prostředky proto více soustředíme do strategických investic, které zvyšují dlouhodobý potenciál regionu: dopravní dostupnosti, vzdělávání, bydlení, energetiky, brownfieldů a infrastruktury pro podnikání. Nebudeme jimi dlouhodobě nahrazovat běžné obecní rozpočty ani financovat drobné projekty bez významnějšího rozvojového efektu. Slabším regionům zároveň poskytneme společnou projektovou podporu na úrovni obcí s rozšířenou působností, krajů a Národní rozvojové banky. Současně zvýšíme využívání návratných finančních nástrojů – půjček a záruk. Ty dnes představují pouze kolem 3 % využití evropských prostředků.",
      },
      {
        nazev: "Přivedeme více soukromých investic mimo nejsilnější centra",
        text: "Regionální konvergenci nelze založit na veřejných dotacích. Jejím konečným výsledkem musí být vyšší produktivita, nové firmy a kvalitní pracovní místa. V hospodářsky a sociálně ohrožených územích proto umožníme rychlejší odpisy nových produktivních investic. Podpora bude mířit na skutečně novou ekonomickou aktivitu, nikoli na dlouhodobé subvencování provozu. Při plánování infrastruktury zároveň posílíme nejen spojení s Prahou a Brnem, ale i další regionální centra a jejich vzájemné propojení. Česko potřebuje širší síť měst schopných nabídnout kvalitní pracovní trh, vzdělávání a služby a táhnout ekonomický rozvoj svého okolí.",
      },
      {
        nazev: "Budeme hodnotit regionální dopady velkých reforem",
        text: "Regionální politika nemůže být samostatnou agendou jednoho ministerstva. Rozdíly mezi územími významně ovlivňuje nastavení školství, daní, sociálního systému, dopravy, bydlení i energetiky. Zavedeme proto jednotný soubor ukazatelů na úrovni krajů a obcí s rozšířenou působností a budeme pravidelně zveřejňovat územní rozložení hlavních veřejných investic. U zásadních reforem bude součástí hodnocení také jejich vliv na regionální konvergenci, pokud možno až na mikroregionální úrovni. Úspěšnost regionální politiky nebudeme měřit množstvím rozdělených dotací, ale výsledky: vývojem ekonomické aktivity a příjmů v zaostávajících regionech, soukromými investicemi, dostupností pracovních míst, investiční aktivitou samospráv a rozsahem společně zajišťovaných obecních agend.",
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
      "Silnější regionální centra a profesionálnější samosprávy rozšíří počet míst, kde mohou vznikat produktivní firmy a kvalitní pracovní místa. Obce získají větší motivaci k nové výstavbě a investicím, společná správa sníží náklady a zvýší jejich odbornou kapacitu a lepší využití obecních úspor umožní realizovat větší projekty bez závislosti na jednotlivých dotačních výzvách.",
      "Cílem regionální politiky není konzervovat každé pracovní místo ani zajistit všem částem země stejnou ekonomickou strukturu. Jejím cílem je odstranit překážky, které dnes brání lidem, obcím a firmám využívat svůj potenciál, a rozšířit prosperitu mimo několik nejsilnějších center.",
    ],
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "PROKOP, Daniel (2025). Rozvoj chudších regionů může nastartovat prosperitu Česka. NERV přináší 50 opatření, jak na to. PAQ Research [online]. 31. července 2025. Dostupné z: PAQ Research." },
  { index: 2, citace: "DRUHÁ EKONOMICKÁ TRANSFORMACE (2024). Příjmy českých obcí z místního podnikání jsou jedny z nejnižších v EU. Druhá ekonomická transformace [online]. Dostupné z: 2et.cz." },
  { index: 3, citace: "HROT24 (2024). Příjmy českých obcí z podnikání jsou jedny z nejnižších v EU. Za vytváření pracovních míst jsme trestáni, stěžují si starostové. Hrot24 [online]. 20. června 2024. Dostupné z: Hrot24.cz." },
  { index: 4, citace: "EUROSTAT (2026). Gross domestic product (GDP) at current market prices by NUTS 3 regions [datový soubor]. Kód datasetu: nama_10r_3gdp, jednotka: PPS_HAB_EU27_2020. Dostupné z: https://doi.org/10.2908/NAMA_10R_3GDP" },
  { index: 5, citace: "MINISTERSTVO FINANCÍ ČESKÉ REPUBLIKY (2024). Monitor Státní pokladny [online databáze; data za rok 2024]. Praha: Ministerstvo financí ČR. Dostupné z: Monitor Státní pokladny." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "ORP (obec s rozšířenou působností)", vysvetleni: "Obec, která vykonává státní správu pro sebe i pro okolní menší obce. Je přirozeným centrem regionu pro úřední a veřejné služby." },
  { pojem: "Mikroregion", vysvetleni: "Území několika sousedních obcí, které spolu tvoří funkční celek, například díky dojíždění za prací, školou nebo službami." },
  { pojem: "RUD motivační složka", vysvetleni: "Část rozpočtového určení daní, která se obcím přidělí podle daňových výnosů z jejich území. Má obce motivovat k podpoře ekonomiky." },
  { pojem: "Společenství obcí", vysvetleni: "Dobrovolné sdružení obcí, které společně zajišťují odborné agendy, projektovou přípravu a investice a získávají na to stabilní financování." },
  { pojem: "Pooling", vysvetleni: "Spojení volných peněz více subjektů do jedné sdílené pokladny, ze které se pak financují společné investice." },
  { pojem: "Národní rozvojová banka", vysvetleni: "Banka, která má být hlavním prostředníkem mezi Evropskou investiční bankou, kapitálovým trhem a samosprávami. Nabízí standardizované úvěrové a záruční produkty i menším obcím." },
  { pojem: "EIB (Evropská investiční banka)", vysvetleni: "Banka Evropské unie, která poskytuje dlouhodobé úvěry na investice, včetně obecních a regionálních projektů." },
  { pojem: "Kommuninvest", vysvetleni: "Švédský systém společného financování obcí: obce se sdružují, získávají kapitál na trhu za výhodnějších podmínek a sdílejí expertizu. Strategie ho uvádí jako vzor pro dobrovolný komunální investiční mechanismus." },
  { pojem: "Návratné nástroje", vysvetleni: "Finanční pomoc, kterou příjemce později splácí, například půjčky a záruky. Na rozdíl od grantu se peníze vracejí a mohou pomáhat dalším projektům." },
];
