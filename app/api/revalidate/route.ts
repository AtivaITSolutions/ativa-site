import { createRevalidateHandler } from "@ativa/cms-sdk/next";

// The CMS calls this on publish with an HMAC-signed body (see SDK.md). The
// handler verifies the `x-cms-signature` before revalidating. The shared secret
// lives only in .env (CMS_REVALIDATE_SECRET) and in the CMS's encrypted registry.
export const dynamic = "force-dynamic";

export const POST = createRevalidateHandler({
  secret: () => process.env.CMS_REVALIDATE_SECRET,
});
