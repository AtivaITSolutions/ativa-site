import "server-only";
import { unstable_cache } from "next/cache";
import { createSiteClient } from "@ativa/cms-sdk/server";
import { siteConfig } from "@/cms.config";

// The site connects with a READ-ONLY Mongo user (never writes). See docs/SECURITY.md.
const client = createSiteClient({
  mongoUri: process.env.MONGODB_URI_READONLY ?? "",
  siteSlug: siteConfig.slug,
  dbName: process.env.MONGODB_DB ?? siteConfig.dbName,
});

/** Fetch a published page by path, cached and tagged per-path for on-publish revalidation. */
export function getPage(path: string) {
  return unstable_cache(() => client.getPageByPath(path), ["page", path], {
    tags: [`page:${path}`],
    revalidate: 60,
  })();
}

export { client as siteClient };
