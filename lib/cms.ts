import "server-only";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { createSiteClient } from "@ativa/cms-sdk/server";
import { collectMediaIds, type ResolvedMedia } from "@ativa/cms-sdk";
import { siteConfig } from "@/cms.config";

// The site connects with a READ-ONLY Mongo user (never writes). See docs/SECURITY.md.
const client = createSiteClient({
  mongoUri: process.env.MONGODB_URI_READONLY ?? "",
  siteSlug: siteConfig.slug,
  dbName: process.env.MONGODB_DB ?? siteConfig.dbName,
});

/**
 * Fetch a page by path. In Draft Mode (a valid CMS preview), read `draftBlocks`
 * uncached; otherwise read the published body, cached and tagged per-path for
 * on-publish revalidation.
 */
export async function getPage(path: string) {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    return client.getPageByPath(path, { draft: true });
  }
  return unstable_cache(() => client.getPageByPath(path), ["page", path], {
    tags: [`page:${path}`],
    revalidate: 60,
  })();
}

/**
 * Look up a redirect for an incoming path (used by `proxy.ts`). Read-only and
 * uncached: redirects are the exception path (only hit when a page is missing)
 * and must reflect a slug change immediately. Returns `null` on none.
 */
export async function getRedirect(path: string) {
  return client.getRedirectByPath(path);
}

/**
 * Resolve every media id referenced by a page's blocks into render-ready media,
 * keyed by id, for `<PageRenderer media={…}>`. Returns `{}` when the page has no
 * images.
 */
export async function getPageMedia(
  blocks: unknown[],
): Promise<Record<string, ResolvedMedia>> {
  const ids = collectMediaIds(blocks);
  if (ids.length === 0) return {};
  return client.getMediaByIds(ids);
}

export { client as siteClient };
