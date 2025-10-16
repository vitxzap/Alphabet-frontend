import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authClient } from "./lib/auth-client";
import { useUserStore } from "./app/web/user-global-state";

export default async function middleware(req: NextRequest) {
  // gets the better auth session token and stores it to use later
  const token = req.cookies.get("better-auth.session_token");
  const secureToken = req.cookies.get("__Secure-better-auth.session_token");
  console.log(secureToken);
  // web prefix pages are the protected routes from the application
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/web");

  // verifies if the current page requested is the auth page
  const authRoute = req.nextUrl.pathname.startsWith("/auth");
  console.log(authRoute);
  //if the user tries to access a protected route and doesnt have a token he will be redirected to the auth page
  if (isProtectedRoute && !secureToken) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }

  //if the user is already authenticated and tries to access auth page, he will be redirected to the dashboard
  if (secureToken && authRoute) {
    return NextResponse.redirect(new URL("/web/dashboard", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/auth", "/web/:path"],
};
