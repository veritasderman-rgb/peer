import type { MetadataRoute } from "next";
import { topics } from "@/topics";
import { abs } from "@/lib/site";

/* Sitemapa: úvodka, přehledové stránky a všech 14 témat (s obrázky a videi, ať je indexují i vyhledávače videí). */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticke: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/videa", priority: 0.8 },
    { path: "/dopad", priority: 0.8 },
    { path: "/cesta", priority: 0.8 },
    { path: "/zaplaceni", priority: 0.8 },
    { path: "/proc-bobr", priority: 0.5 },
    { path: "/jak-vznikl", priority: 0.5 },
  ];
  return [
    ...staticke.map((s) => ({ url: abs(s.path), lastModified, changeFrequency: "weekly" as const, priority: s.priority })),
    ...topics.map((t) => ({
      url: abs(`/${t.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [abs(`/${t.slug}/opengraph-image`)],
      videos: t.video
        ? [
            {
              title: t.video.titulek,
              thumbnail_loc: abs(t.video.poster ?? `/video/${t.slug}-poster.jpg`),
              description: t.popisMeta,
              content_loc: abs(t.video.wide),
            },
          ]
        : undefined,
    })),
  ];
}
