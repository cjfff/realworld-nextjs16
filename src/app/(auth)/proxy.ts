import { NextResponse, type NextRequest } from "next/server";
import { updateSession, getSession } from "@/lib/session";

const authorizationpaths = ["/editor", "/settings"];

export async function proxy(request: NextRequest) {
  await updateSession();
  const token = await getSession();
  
  const pathname = request.nextUrl.pathname;

  if (
    !token &&
    authorizationpaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
