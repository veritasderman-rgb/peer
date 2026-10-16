export type Blok =
  | { typ: "h3"; text: string }
  | { typ: "p"; text: string }
  | { typ: "ul"; polozky: string[] }
  | { typ: "ol"; polozky: { nazev: string; text: string }[] };

export const plneZneni: Blok[] = [
  {
    typ: "p",
    text: "Nejsme zemí s velkou akumulací kapitálu; to vyžaduje staletí shromažďování kapitálu bez přestávky, což bylo u nás bohužel přetrženo. Kapitálu, který umožní rozvoj nových firem a růst těch stávajících, není mnoho, a bohužel ve velké míře je alokován nevhodně: nepracuje, spí.",
  },
  {
    typ: "h3",
    text: "Co navrhujeme",
  },
  {
    typ: "ol",
    polozky: [
      {
        nazev: "Kompletní transformace penzijních fondů.",
        text: "Dnešní výnosy jsou malé (dané požadavkem na bezrizikovost) a větší část z nich spolknou poplatky. Český střadatel musí vkládat 10× víc peněz, aby dosáhl stejného výnosu, jako (dokonce) jeho slovenský kolega.[1] Zvolme skandinávský přístup: zákonem dané dramatické snížení poplatků, případně i fondy provozované státem s ještě levnější obsluhou. Umožněme větší diverzifikaci fondů, a tedy i penzijních portfolií.",
      },
      {
        nazev: "Využít spících 4000 miliard u českých střadatelů.",
        text: "Spořit si je jistě záslužné, ale tyto peníze obvykle nepracují, v nemalé části leží dokonce na neúročených běžných účtech. Zde je nutná zejména osvěta, legislativní podpora vzniku syndikátů drobných investorů (podle vzoru Velké Británie), ale i silnější dohled nad velmi rizikovými firemními dluhopisy. Již při pouhém tříprocentním ročním zhodnocení dojde ke zdvojnásobení úspor za 25 let!",
      },
      {
        nazev: "Zmírnit regulaci krátkodobých hypoték pro snazší pracovní mobilitu.",
        text: "Jde o rychlé prodeje a koupě domu či bytu při stěhování za prací.",
      },
    ],
  },
];

export const zdroje: { index: number; citace: string }[] = [
  { index: 1, citace: "Nádvorník, L. a Pertold, F., 2026. Klienti penzijních fondů v pasti nízkých výnosů a vysokých poplatků. Studie 1/2026. Praha: IDEA při CERGE-EI, Ekonomický ústav AV ČR, v. v. i. ISBN 978-80-7344-737-3." },
];

export const slovnik: { pojem: string; vysvetleni: string }[] = [
  { pojem: "Penzijní fond", vysvetleni: "Investiční fond, do kterého lidé spoří na důchod. Peníze se investují a výnos se připisuje spořícímu." },
  { pojem: "Poplatek", vysvetleni: "Částka, kterou fond účtuje za správu peněz. Snižuje výnos, který spořící dostane." },
  { pojem: "Diverzifikace", vysvetleni: "Rozložení peněz do více aktiv a trhů, aby pokles jednoho z nich nebyl osudový pro celé úspory." },
  { pojem: "Syndikát drobných investorů", vysvetleni: "Skupina drobných investorů, která spojí své peníze a společně investuje, například do firemního projektu." },
  { pojem: "Firemní dluhopis", vysvetleni: "Dluhový cenný papír firmy. Firma si půjčuje peníze od investorů a slibuje úroky a splacení. Při špatném hospodaření dluh nemusí splatit." },
  { pojem: "Složené úročení", vysvetleni: "Úrok se připisuje k základu, takže v dalším roce se úročí i předchozí úrok. Peníze tak rostou rychleji než při jednoduchém úročení." },
];
