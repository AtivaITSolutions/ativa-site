import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Leave Draft Mode and return to a normal (published) view.
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  (await draftMode()).disable();
  const to = new URL(request.url).searchParams.get("redirect");
  redirect(to && to.startsWith("/") ? to : "/");
}
