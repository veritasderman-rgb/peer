import { topics } from "@/topics";
import { abs } from "@/lib/site";
import sdileni from "@/data/sdileni.json";

export const dynamic = "force-static";

type Balicek = { facebook: string; x: string; instagram: string; linkedin: string; hashtagy: string[] };
const data = sdileni as Record<string, Balicek>;

/* Celý balíček ke stažení: texty s dosazeným odkazem na téma + absolutní adresy videí a náhledů. */
export function GET() {
  const temata = topics.flatMap((t) => {
    const d = data[t.slug];
    if (!d) return [];
    const url = abs(`/${t.slug}`);
    const dosad = (s: string) => s.replaceAll("{{URL}}", url);
    const v = t.video;
    return [
      {
        slug: t.slug,
        cislo: t.cislo,
        nazev: t.nazev,
        url,
        video: v && {
          titulek: v.titulek,
          reel: abs(v.reel),
          siroke: abs(v.wide),
          nahled: v.poster ? abs(v.poster) : null,
          nahledReel: v.poster ? abs(v.poster.replace(/-poster\.jpg$/, "-poster-reel.jpg")) : null,
          titulky: v.titulky ? abs(v.titulky) : null,
        },
        facebook: dosad(d.facebook),
        x: dosad(d.x),
        instagram: dosad(d.instagram),
        linkedin: dosad(d.linkedin),
        hashtagy: d.hashtagy,
      },
    ];
  });

  return Response.json(
    { nazev: "Balíček pro sítě: Česko má na víc!", web: abs("/"), temata },
    { headers: { "Content-Disposition": 'inline; filename="balicek.json"' } },
  );
}
