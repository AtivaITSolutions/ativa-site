/**
 * cms:push — send this site's block (and later template) definitions to the CMS
 * schema-push endpoint. Run with: `npm run cms:push`.
 *
 * Reads from .env (loaded by the npm script):
 *   CMS_URL      — the CMS base URL, e.g. http://localhost:3001
 *   CMS_API_KEY  — this site's schema-push key (`<siteId>.<secret>`), shown once
 *                  when the site was created in the CMS registry.
 *   GIT_COMMIT   — optional, recorded with the push for traceability.
 *
 * The site never holds DB write access or secrets beyond this push key.
 */
import { pushSchema } from "@ativa/cms-sdk/cli";
import { SDK_VERSION } from "@ativa/cms-sdk";
import { blockDefinitions } from "../blocks/definitions";

async function main(): Promise<void> {
  const cmsUrl = process.env.CMS_URL;
  const apiKey = process.env.CMS_API_KEY;

  if (!cmsUrl || !apiKey) {
    console.error("cms:push — set CMS_URL and CMS_API_KEY in .env first.");
    process.exit(1);
    return;
  }

  const result = await pushSchema({
    cmsUrl,
    apiKey,
    version: SDK_VERSION,
    commit: process.env.GIT_COMMIT,
    blocks: blockDefinitions,
    templates: [],
  });

  if (!result.ok) {
    console.error(`cms:push failed (HTTP ${result.status}): ${result.error}`);
    process.exit(1);
    return;
  }

  console.log(`cms:push — sent ${result.blockCount} block(s), schema ${result.version} → ${cmsUrl}`);
}

main().catch((err: unknown) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
