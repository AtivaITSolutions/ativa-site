/**
 * Site identity for the CMS connection and media. Secret values (the read-only
 * Mongo URI, etc.) live in .env — see docs/ARCHITECTURE.md for the names.
 */
export const siteConfig = {
  slug: "ativa",
  dbName: "site_ativa",
  cloudinaryFolder: "ativa",
} as const;
