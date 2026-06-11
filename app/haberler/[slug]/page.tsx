import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allNews, getNewsBySlug } from "@/lib/news";
import NewsDetailClient from "./NewsDetailClient";

export async function generateStaticParams() {
  return allNews.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNewsBySlug(slug);
  if (!item) notFound();

  const otherNews = allNews.filter((n) => n.slug !== slug).slice(0, 3);

  return <NewsDetailClient item={item} otherNews={otherNews} />;
}
