import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
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
  return NextResponse.json({ ok: true });
}
