import type { TopicConfig } from "./topics";
import { SITE_NAME, SITE_URL, ORG, abs } from "./site";
import { scripts } from "@/video/scripts";
import { FPS, buildTimeline } from "@/video/timeline";

/* Objekty JSON-LD pro web (WebSite, Organization) a pro stránku tématu (Article + VideoObject + Breadcrumb).
   Garant kapitoly je autor; vydavatel je PEER. Přepis videa se dává do VideoObject, ať ho vyhledávače
   a AI asistenti umí citovat. */

export function webJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#org`,
        name: ORG.name,
        url: ORG.url,
        sameAs: ["https://www.pirati.cz/"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#web`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "cs",
        publisher: { "@id": `${SITE_URL}/#org` },
        about: "Hospodářská strategie 2026–2035 Pirátské expertní ekonomické rady vysvětlená pro běžné lidi",
      },
    ],
  };
}

const isoDuration = (sec: number) => `PT${Math.floor(sec / 60)}M${Math.round(sec % 60)}S`;

export function topicJsonLd(t: TopicConfig) {
  const url = abs(`/${t.slug}`);
  const script = scripts.find((s) => s.slug === t.slug);
  const trvani = script ? buildTimeline(script).total / FPS : undefined;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: t.nazev,
      alternativeHeadline: t.hook.h1,
      description: t.popisMeta,
      inLanguage: "cs",
      url,
      image: abs(`/${t.slug}/opengraph-image`),
      author: { "@type": "Person", name: t.garant.jmeno, jobTitle: t.garant.role },
      publisher: { "@id": `${SITE_URL}/#org` },
      isPartOf: { "@id": `${SITE_URL}/#web` },
      about: `Hospodářská strategie 2026–2035, kapitola ${t.kapitola}`,
      keywords: [t.kratkyNazev, "hospodářská strategie", "PEER", "Piráti"].join(", "),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Témata", item: abs("/#temata") },
        { "@type": "ListItem", position: 3, name: t.kratkyNazev, item: url },
      ],
    },
  ];
  if (t.video) {
    graph.push({
      "@type": "VideoObject",
      "@id": `${url}#video`,
      name: t.video.titulek,
      description: t.video.popis ?? t.popisMeta,
      thumbnailUrl: [abs(t.video.poster ?? `/video/${t.slug}-poster.jpg`)],
      contentUrl: abs(t.video.wide),
      uploadDate: "2026-10-16",
      inLanguage: "cs",
      ...(trvani ? { duration: isoDuration(trvani) } : {}),
      ...(t.video.prepis ? { transcript: t.video.prepis.join(" ") } : {}),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
