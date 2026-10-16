export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Státy se příliš netěší reputaci „lídrů“; ta je přenechána soukromému sektoru a od státu se očekává spíš zabezpečení jeho služeb a udržení systému v chodu. V rychle se měnícím světě ale úloha států vzrůstá – stále více přesvědčivých příkladů dokládá, že „leadership“ státu i v oblastech, které bylo zvykem zcela ponechávat na trhu a soukromé sféře, nese ovoce.",
  },
  {
    typ: "p",
    text: "Z nejznámějších příkladů z nedávné historie můžeme uvést vznik a obrovský růst izraelského startupového ekosystému, popsaný dobře v knize Start-up Nation: The Story of Israel's Economic Miracle,[1] který už v názvu obsahuje slovo „ekonomický zázrak“, a zcela poprávem. Dalším příkladem je vznik a růst světově dominanční velmoci v polovodičích, Taiwanu.[2] V obou těchto příkladech hrál naprosto zásadní roli stát, který si dobře zanalyzoval situaci a vrhl obrovské prostředky (finanční, lidské, materiální, organizační) do vybudování startupového, resp. čipového ekosystému. Dnes je jasné, že se tyto investice stonásobně vrátily a hlavně – bez nich by nic takového nevzniklo.",
  },
  {
    typ: "p",
    text: "Lídrovství státu však nespočívá jen v takovýchto obřích krocích. Státy musí umět využívat moderní technologie, adoptovat je podobnou rychlostí jako soukromé firmy, a poskytovat tím sobě i občanům kvalitnější služby. Nemusí vše samy dotvářet, ale důležité je vytvořit základní infrastrukturu a právní rámec, nad kterým pak fungují už soukromí hráči. Dobrým příkladem je například platební rozhraní UPI vytvořené indickým státem, které pomohlo v této, notoricky „nedigitální“ zemi vyšvihnout se na špičku v digitálních platbách.",
  },
  {
    typ: "p",
    text: "V České republice stojí před státem v tomto ohledu dlouhá řada úkolů.",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Digitalizaci státu",
        text: "Samotná digitalizace státu. I přes pokroky to stále není velká sláva; audit NKÚ z roku 2026 hovoří, že z celkem téměř 9000 (!) služeb poskytovaných státem je zdigitalizováno pouhých 18 %; asi 30 % je jich hybridních a více než polovina stále pouze papírových.[3] Máme přitom platný Zákon o právu na digitální službu, s jeho naplňováním jsme ale pozadu. Český stát si v oblasti digitalizace stojí zhruba uprostřed EU (13–14. místo z 27; přitom v digitálních dovednostech jsme na pátém místě!).[4] Není nutné digitalizovat všechny služby, protože některé jsou marginální a velmi málo využívané. Podstatné je včas dokončit cca 1400 služeb, které jsou v plánu a kde digitalizace dává smysl. Jedním z nejdůležitějších úkolů je zřízení Jednotného inkasního místa, zjednodušujícího finanční agendu finančních úřadů, správu sociálního zabezpečení a zdravotní pojišťovny do jednoho bodu.",
      },
      {
        nazev: "Digitalizovat již digitalizované",
        text: "Dalším důležitým úkolem je „digitalizovat již digitalizované, ale špatně“. Český stát provozuje mnoho desítek informačních systémů, které jsou velmi staré, některé pocházejí i z 90. let. Studie Datlab uvádí, že 53 % bylo vytvořeno bez veřejné soutěže.[6] Jejich provoz je extrémně nákladný, právě tak jako jakékoli úpravy, a prakticky je zde naprostý vendor lock-in, tedy neprolomitelná závislost na dodavateli, kterému je nutné platit vysoké pravidelné poplatky („maintenance“, update). Datlab uvádí, že roční náklady činí 8,5 miliardy Kč, a zpráva NKÚ, která komentuje, že softwarové nástroje na SZIF stály 2,1 miliardy za 4 roky, přičemž v komerční sféře by to vyšlo na 100–120 mil. Kč, tedy až 20× méně.[3][6]",
      },
      {
        nazev: "Otevřená data",
        text: "Otevřená data k dispozici pro výzkum i startupy. Český stát stále a nepochopitelně tají mnoho informací, které přitom mohou sloužit dalším subjektům, jako jsou výzkumné organizace, firmy i třeba startupy, které si na nich mohou „cvičit“ svoje podnikatelské modely. Jedná se například o databáze České správy sociálního zabezpečení, Finanční správy, Ministerstva školství a zejména velmi podstatné zdravotnické informace, které drží pod tvrdým zámkem Ústav zdravotnických informací a statistiky (navzdory svému názvu!). Jde přitom samozřejmě o uvolnění dat anonymizovaných, pro statistická a analytická vyhodnocení – nikoli o data identifikovatelných osob či dalších subjektů.",
      },
      {
        nazev: "Živé laboratoře",
        text: "Living Labs jsou prověřenou metodou pro „živé“ testování, sice v omezeném prostoru, ale jinak v plně funkčním reálném světě, s účastí veřejné sféry, univerzit, firem i dalších aktérů. Living Labs se obvykle soustředí na konkrétní obor, jako je autonomní mobilita, vysokorychlostní technologie nebo kyberbezpečnost, e-health, využití AI.",
      },
      {
        nazev: "Analytický útvar Hodnota za peníze",
        text: "Opět jde o ověřený koncept prakticky ze všech západoevropských zemí, můžeme si též vzít příklad ze sousedního Slovenska, kde je kvalitně implementovaný.[5] Jeho podstatou je důsledná a přísná revize větších veřejných investic od určité hranice (na Slovensku od 40 mil. EUR nahoru) s ohledem na efektivitu vynaložených peněz; jeho cílem je posílit orientaci na výsledky u veřejných investic. Doporučujeme pro ČR toto ukotvit v zákoně, týmu zvýšit pravomoci a posílit jej personálně. Podobné útvary na hodnocení investic mají desítky dalších zemí EU, nejpropracovanější a nejinspirativnější je Dánsko (provádí to důsledně a nepřetržitě více než 40 let), též Velká Británie nebo Nizozemsko. Důležitý ovšem není pouze zpětný přezkum. Klíčové je samotné rozhodování o tom, jaká opatření zvolit. Stát by proto měl nadále rozvíjet a stabilizovat profesionální analytické útvary, které pomáhají ministerstvům formulovat a realizovat vhodná a o data se opírající opatření.",
      },
    ],
  },
  {
    typ: "h3",
    text: "Co nám to přinese?",
  },
  {
    typ: "p",
    text: "Tyto návrhy povedou k modernějšímu, levnějšímu a efektivnějšímu státu, který občanům i firmám šetří čas, peníze a administrativu. Dokončení smysluplné digitalizace, zjednodušení klíčových agend přes jednotné inkasní místo, omezení závislosti na drahých dodavatelích IT systémů, otevření anonymizovaných dat pro výzkum a inovace, testování nových technologií v živých laboratořích a důsledné hodnocení veřejných investic podle principu „hodnota za peníze“ posílí kvalitu veřejných služeb i důvěru ve stát. Výsledkem bude stát, který lépe rozhoduje na základě dat, podporuje inovace a dokáže za veřejné peníze přinášet skutečné výsledky.",
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "SENOR, Dan a SINGER, Saul, 2009. Start-up Nation: The Story of Israel's Economic Miracle. New York: Twelve / Hachette Book Group. ISBN 978-0-446-54146-6. Dostupné také na: https://en.wikipedia.org/wiki/Start-up_Nation" },
  { index: 2, citace: "LIN, Owen Hung-Wen, 2024. Chip Champion: How Taiwan Built the World's Semiconductor Powerhouse. Seattle: Amazon Digital Services. ASIN B0FX2B2L4K. Dostupné z: https://www.amazon.com/Chip-Champion-Owen-Hung-Wen-Lin-ebook/dp/B0FX2B2L4K" },
  { index: 3, citace: "NEJVYŠŠÍ KONTROLNÍ ÚŘAD (NKÚ), 2026. Souhrnná zpráva: Digitalizace veřejné správy 2026 [online]. Praha: NKÚ ČR. Dostupné z: https://www.nku.cz/assets/publikace-a-dokumenty/ostatni-publikace/souhrnna-zprava-digitalizaceverejne-spravy-2026.pdf" },
  { index: 4, citace: "EVROPSKÁ KOMISE, 2025. Digital Economy and Society Index (DESI): Methodologies and Country Analysis [online]. Brussels: European Commission. Dostupné z: https://digital-strategy.ec.europa.eu/en/policies/desi" },
  { index: 5, citace: "NÁRODNÁ RADA SR, 2004. Zákon č. 523/2004 Z. z. o rozpočtových pravidlách verejnej správy a o zmene a doplnení niektorých zákonov [online]. Bratislava: Ministerstvo spravodlivosti SR / Slov-Lex. Dostupné z: /" },
  { index: 6, citace: "DATLAB INSTITUT, 2022. Příručka pro zadavatele: Jak předcházet a řešit vendor lock-in ve veřejných zakázkách [online]. Praha: Datlab Institut. Dostupné z: https://datlabinstitut.cz/files/2022/10/p%C5%99%C3%ADru%C4%8Dka_vendor_lock.pdf" },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "Jednotné inkasní místo", vysvetleni: "Společné místo, kde se soustředí finanční agenda finančních úřadů, správa sociálního zabezpečení a zdravotní pojišťovny. Zjednoduší tak tyto agendy do jednoho bodu." },
  { pojem: "Vendor lock-in", vysvetleni: "Neprolomitelná závislost na jednom dodavateli IT systému. Dodavatel si může účtovat vysoké pravidelné poplatky za údržbu a úpravy a zákazník nemá snadnou možnost přejít jinam." },
  { pojem: "Otevřená data", vysvetleni: "Data, která stát zveřejní k volnému použití, například pro výzkum a podnikání. V tomto textu jde o anonymizovaná data pro statistická a analytická vyhodnocení, ne o data konkrétních osob." },
  { pojem: "Anonymizace", vysvetleni: "Úprava dat tak, aby z nich nebylo poznat konkrétního člověka nebo subjekt, a data je tak možné bezpečně zveřejnit pro analýzy." },
  { pojem: "Living Lab (živá laboratoř)", vysvetleni: "Testování nové technologie v omezeném, ale reálném prostředí, do kterého se zapojí veřejná správa, univerzity a firmy." },
  { pojem: "Hodnota za peníze", vysvetleni: "Princip, podle kterého se veřejné investice hodnotí podle toho, jaké mají výsledky a jak efektivně využívají vynaložené peníze. Analytický útvar ho má prosazovat." },
  { pojem: "UPI (Unified Payments Interface)", vysvetleni: "Platební rozhraní vytvořené indickým státem, které pomohlo Indii vyšvihnout se na špičku v digitálních platbách." },
  { pojem: "Zákon o právu na digitální službu", vysvetleni: "Zákon, který dává občanům právo vyřizovat úřední věci digitálně. Podle textu je platný, ale jeho naplňování pokulhává." },
];
