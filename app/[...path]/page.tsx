import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRenderer } from "@ativa/cms-sdk/react";
import { registry } from "@/blocks";
import { getPage, getPageMedia } from "@/lib/cms";
import { buildMetadata } from "@/lib/metadata";

export const dynamic = "force-dynamic";

type RouteParams = { path: string[] };

// Keep the exact WordPress URL form: flat root slug with a trailing slash.
function toPath(segments: string[]): string {
  return "/" + segments.join("/") + "/";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { path } = await params;
  return buildMetadata(await getPage(toPath(path)));
}

export default async function CatchAllPage({ params }: { params: Promise<RouteParams> }) {
  const { path } = await params;
  const page = await getPage(toPath(path));
  if (!page) notFound();
  const media = await getPageMedia(page.blocks);
  return <PageRenderer blocks={page.blocks} registry={registry} media={media} />;
}
