import { NextResponse, type NextRequest } from "next/server";
import { updateSession, getUser } from "./lib/session";

const authorizationpaths = ["/editor", "/settings"];

const unAuthorizationpaths = ["/login", "/register"];

export async function proxy(request: NextRequest) {
  const user = await getUser()

  if (user) {
    await updateSession();
  }
  
  const pathname = request.nextUrl.pathname;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);

  if (
    !user &&
    authorizationpaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && unAuthorizationpaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
