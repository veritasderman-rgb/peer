import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topics, getTopic } from "@/topics";
import { TopicPage } from "@/components/TopicPage";
import { JsonLd } from "@/components/JsonLd";
import { topicJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((t) => ({ tema: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tema: string }> }): Promise<Metadata> {
  const { tema } = await params;
  const t = getTopic(tema);
  if (!t) return {};
  return {
    title: t.nazev,
    description: t.popisMeta,
    alternates: { canonical: `/${t.slug}` },
    keywords: [t.kratkyNazev, "hospodářská strategie", "PEER", "Piráti", t.garant.jmeno],
    openGraph: { type: "article", title: t.nazev, description: t.popisMeta, url: `/${t.slug}`, authors: [t.garant.jmeno] },
  };
}

export default async function Page({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const t = getTopic(tema);
  if (!t) notFound();
  return (
    <>
      <JsonLd data={topicJsonLd(t)} />
      <TopicPage t={t} />
    </>
  );
}
