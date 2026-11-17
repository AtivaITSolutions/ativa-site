import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRenderer } from "@ativa/cms-sdk/react";
import { registry } from "@/blocks";
import { getPage } from "@/lib/cms";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata(await getPage("/"));
}

export default async function HomePage() {
  const page = await getPage("/");
  if (!page) notFound();
  return <PageRenderer blocks={page.blocks} registry={registry} />;
}
