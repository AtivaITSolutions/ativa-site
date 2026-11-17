import "server-only";
import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { createSiteClient } from "@ativa/cms-sdk/server";
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

export { client as siteClient };
