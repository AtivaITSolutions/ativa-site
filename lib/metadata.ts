import type { Metadata } from "next";
import type { Page } from "@ativa/cms-sdk/server";

/**
 * Build page metadata from a page's SEO fields with sensible fallbacks.
 * A fuller version (SDK `buildMetadata`, JSON-LD) arrives in Phase 8.
 */
export function buildMetadata(page: Page | null): Metadata {
  if (!page) return { title: "Not found" };
  const title = page.seo?.title ?? page.title;
  const description = page.seo?.description;
  return {
    title,
    description,
    alternates: page.seo?.canonical ? { canonical: page.seo.canonical } : undefined,
    robots: page.seo?.noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      images: page.seo?.ogImage ? [page.seo.ogImage] : undefined,
    },
  };
}
