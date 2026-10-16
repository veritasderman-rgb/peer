import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topics, getTopic } from "@/topics";
import { TopicPage } from "@/components/TopicPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((t) => ({ tema: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tema: string }> }): Promise<Metadata> {
  const { tema } = await params;
  const t = getTopic(tema);
  if (!t) return {};
  return { title: t.nazev, description: t.popisMeta };
}

export default async function Page({ params }: { params: Promise<{ tema: string }> }) {
  const { tema } = await params;
  const t = getTopic(tema);
  if (!t) notFound();
  return <TopicPage t={t} />;
}
