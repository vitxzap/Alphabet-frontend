import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: process.env.BETTER_AUTH_COOKIE_NAME as string,
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV == "production" ? true : false,
    sameSite: "lax",
    maxAge: 0,
  });
  cookieStore.set({
    name: "better-auth.session_data",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV == "production" ? true : false,
    sameSite: "lax",
    maxAge: 0,
  });
  cookieStore.set({
    name: "better-auth.state",
    value: "",
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV == "production" ? true : false,
    sameSite: "lax",
    maxAge: 0,
  });
  return NextResponse.json({ ok: true });
}
