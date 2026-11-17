import { createPreviewHandler } from "@ativa/cms-sdk/next";

// The CMS opens this in an iframe with a short-lived signed token (see SDK.md).
// The handler verifies the token, enables Draft Mode, and redirects to the path,
// where pages render `draftBlocks`. The shared secret lives only in .env
// (CMS_PREVIEW_SECRET) and in the CMS's encrypted registry.
export const dynamic = "force-dynamic";

export const GET = createPreviewHandler({
  secret: () => process.env.CMS_PREVIEW_SECRET,
});
