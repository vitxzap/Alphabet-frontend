import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export default async function proxy(req: NextRequest) {
  // gets the better auth session token and stores it to use later
  const secureToken = req.cookies.get(process.env.BETTER_AUTH_COOKIE_NAME as string);
  // web prefix pages are the protected routes from the application
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/web");
  // verifies if the current page requested is the auth page
  const authRoute = req.nextUrl.pathname.startsWith("/auth");
  // verifies if the current page request is an admin page
  const adminRoute = req.nextUrl.pathname.startsWith("/admin");
  //if the user tries to access a protected route and doesnt have a token he will be redirected to the auth page
  if (isProtectedRoute && !secureToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
  //if the user is already authenticated and tries to access auth page, he will be redirected to the dashboard
  if (secureToken && authRoute) {
    return NextResponse.redirect(new URL("/web/classes", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/web/:path"],
};
