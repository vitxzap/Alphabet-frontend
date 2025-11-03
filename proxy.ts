import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const adminRoutes = ["/admin/dashboard"];
const protectedRoutes = ["/web/classes", "/web/resumes"];
const publicRoutes = ["/", "/auth"];
export default async function proxy(req: NextRequest) {
  const session = getSessionCookie(req);
  const path = req.nextUrl.pathname;
  const isAdminRoute = adminRoutes.includes(path);

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  console.log(isProtectedRoute, path);
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth", req.nextUrl));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/web/classes", req.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
