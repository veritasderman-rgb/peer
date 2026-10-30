import { topics } from "@/topics";
import { SITE_NAME, SITE_DESCRIPTION, abs } from "@/lib/site";

/* llms.txt: stručná mapa webu pro AI asistenty a vyhledávače s generovanými odpověďmi (GEO).
   Generuje se z registru témat, takže je vždy aktuální. */
export const dynamic = "force-static";
const nf = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 });

export function GET() {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Web převypráví studii Hospodářská strategie 2026–2035 (Pirátská expertní ekonomická rada, PEER) pro laiky.",
    "Každé téma má tři hloubky: číslo a věta (10 vteřin), výklad s příkladem (2 minuty), plné znění kapitoly se zdroji (20 minut).",
    "Cíl strategie: zrychlit růst o 1 procentní bod ročně; na konci dekády o 1 000 mld. Kč vyšší roční výkon ekonomiky,",
    "přes 300 mld. Kč ročně navíc do státního rozpočtu, v průměru 68 000 Kč ročně navíc na pracujícího.",
    "",
    "## Témata",
    "",
    ...topics.map(
      (t) =>
        `- [${t.nazev}](${abs(`/${t.slug}`)}): ${t.hook.h1} ${nf.format(t.hook.value)} ${t.hook.unit}. ${t.popisMeta} Garant: ${t.garant.jmeno}.`,
    ),
    "",
    "## Přehledy",
    "",
    `- [Příběh strategie](${abs("/pribeh")}): celá strategie jako scrollovací příběh v devíti scénách: od 68 000 Kč ročně navíc přes pasti bydlení, exekucí a montovny ke třem směrům a výsledku +1 p. b. růstu.`,
    `- [Velký obraz](${abs("/dopad")}): souhrnný dopad, opatření s vyčísleným a nevyčísleným přínosem, datované milníky do 2035 a kdo to zaplatí.`,
    `- [Videa Strategie za minutu](${abs("/videa")}): minutová videa ke každému tématu, s přepisem.`,
    `- [Kolik ti to přinese](${abs("/kolik-ti-to-prinese")}): krátký kvíz, co ze strategie se týká tebe a kolik to může znamenat.`,
    `- [Můj kraj](${abs("/moje-obec")}): mapa krajů (exekuce, nezaměstnanost, mzdy, HDP); aktuální data veřejných zdrojů, ne ze studie, která čísla po krajích neuvádí.`,
    `- [Otázky a námitky](${abs("/otazky")}): nejčastější otázky a námitky, odpovědi jen ze studie, s přiznanými mezerami.`,
    `- [English summary](${abs("/en")}): the strategy in English, 14 topics in one page.`,
    `- [Kdo je kdo](${abs("/kdo-je-kdo")}): osm garantů strategie, jejich medailonky a kapitoly, které zaštiťují; jejich avatary vysvětlují web i videa.`,
    `- [Jak vznikl web](${abs("/jak-vznikl")}): autoři studie a jak web postavila AI.`,
    `- [Hledat](${abs("/hledat")}): hledání v tématech, opatřeních, slovníku, otázkách a plném znění; index jako ${abs("/hledat.json")}.`,
    "",
    "## Zdroj",
    "",
    "- [Studie na peer.pirati.cz](https://peer.pirati.cz/hospodarska-strategie/)",
    "- [PDF studie](https://majak.pirati.cz/documents/647/Piratska_Hospodarska_strategie.pdf)",
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
