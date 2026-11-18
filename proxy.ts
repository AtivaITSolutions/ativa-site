// Next.js 16 renames middleware.ts -> proxy.ts and runs it on the Node.js
// runtime, so it can use the SDK's MongoDB reader. This honors CMS-managed
// redirects (301 by default) created when a published page's slug changes.
import { NextResponse, type NextRequest } from "next/server";
import { getRedirect } from "@/lib/cms";

export const config = {
  // Skip Next internals, the API routes and anything with a file extension.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/|.*\\..*).*)"],
};

export default async function proxy(req: NextRequest): Promise<NextResponse> {
  const { pathname } = req.nextUrl;
  // Page paths are stored in the site's trailing-slash form (home is "/").
  const lookup = pathname === "/" || pathname.endsWith("/") ? pathname : `${pathname}/`;

  const hit = await getRedirect(lookup);
  if (hit) {
    const url = new URL(hit.toPath, req.url);
    url.search = req.nextUrl.search; // preserve query string
    return NextResponse.redirect(url, hit.status === 302 ? 302 : 301);
  }

  return NextResponse.next();
}
