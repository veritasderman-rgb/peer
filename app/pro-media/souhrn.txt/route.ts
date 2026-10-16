import dopad from "@/data/dopad.json";
import media from "@/data/media.json";
import { topics } from "@/topics";
import { clenove } from "@/lib/tym";
import { abs } from "@/lib/site";

/* Čistý text ke zkopírování: souhrn na jednu stranu, 14 čísel a kontakt pro média.
   Věty souhrnu držet shodné s app/pro-media/page.tsx. */
export const dynamic = "force-static";

const PDF = "https://majak.pirati.cz/documents/647/Piratska_Hospodarska_strategie.pdf";
const STUDIE_WEB = "https://peer.pirati.cz/hospodarska-strategie/";
const nf = new Intl.NumberFormat("cs-CZ", { maximumFractionDigits: 1 });
const cislo = (v: number, decimals = 0) =>
  new Intl.NumberFormat("cs-CZ", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(v);

export function GET() {
  const d = dopad.souhrn;
  const jmena = clenove.map((c) => c.jmeno).join(", ");
  const vety = [
    `Hospodářská strategie 2026–2035 je dokument Pirátské expertní ekonomické rady (PEER), který rada zpracovala ve spolupráci s Institutem π a dalšími odborníky a představila 2. 9. 2026.`,
    `Cílem je zrychlit růst ekonomiky o ${d.rustNavicPb} procentní bod ročně oproti dnešnímu stavu; autoři uvádějí, že navrhované kroky ho zvýší minimálně o tolik.`,
    `Za deset let to podle strategie znamená na konci dekády o ${nf.format(d.hdpNavicMldRocneKonecDekady)} mld. Kč (bilion) vyšší roční HDP, o ${nf.format(d.mzdyNavicMld)} mld. Kč více na mzdách a odměnách (v superhrubé hodnotě), přes ${nf.format(d.rozpocetNavicMld)} mld. Kč ročně navíc do státního rozpočtu a v průměru ${nf.format(d.naPracujicihoKc)} Kč ročně navíc na ekonomicky aktivního člověka.`,
    `Strategie má ${topics.length} témat ve čtyřech pilířích: lidský potenciál, férový trh a dostupný kapitál, moderní energetika a průmysl, stát jako motor, ne brzda.`,
    `Rada má osm členů (${jmena}); každé téma má svého garanta.`,
    `Jde o odhad autorů vůči situaci, kdy stát nedělá nic nebo jen velmi málo: studie sama píše, že vývoj HDP nelze přesně modelovat, a druhotné dopady (například vyšší investice firem) nevyčísluje.`,
    `Plné znění je v PDF (${PDF}) a na ${STUDIE_WEB}.`,
  ];

  const k = media.kontakty[0];
  const lines: string[] = [
    "HOSPODÁŘSKÁ STRATEGIE 2026–2035 (PEER): PODKLADY PRO MÉDIA",
    "",
    "NA JEDNU STRANU",
    "",
    ...vety,
    "",
    `${topics.length} ČÍSEL`,
    "",
    ...topics.map(
      (t) =>
        `${t.cislo}. ${t.kratkyNazev}: ${cislo(t.hook.value, t.hook.decimals ?? 0)} ${t.hook.unit} (${t.hook.label}). Zdroj: ${t.hook.source} ${abs(`/${t.slug}`)}`,
    ),
    "",
    "KONTAKT PRO MÉDIA",
    "",
    `${k.jmeno}, ${k.role}`,
    `E-mail: ${k.email}${k.telefon ? `, telefon: ${k.telefon}` : ""}`,
    `Ověřeno: ${k.zdroj}`,
    "",
    "JAK CITOVAT",
    "",
    `Hospodářská strategie 2026–2035, Pirátská expertní ekonomická rada, 2026. ${abs("/")}`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
