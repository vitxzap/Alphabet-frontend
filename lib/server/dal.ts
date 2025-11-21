"server-only";
import { redirect, unauthorized } from "next/navigation";
import { authClient, Session } from "../auth/client";
import { cache } from "react";
import { headers } from "next/headers";

const fakeData: Session = {
  user: {
    email: "fake@email.com",
    id: "1",
    banned: false,
    createdAt: new Date(),
    emailVerified: true,
    role: "admin",
    updatedAt: new Date(),
    name: "Fake user",
  },
  session: {
    createdAt: new Date(),
    id: "123",
    token: "123",
    userId: "1",
    expiresAt: new Date(),
    updatedAt: new Date(),
  },
};

export const verifySession = cache(async () => {
  if (process.env.DISABLE_AUTHENTICATION == "true") {
    return { authenticated: true, data: fakeData, isAdmin: true };
  }
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const isAdmin = data?.user.role === "admin";
  if (!data) {
    unauthorized();
  }
  return { authenticated: true, data: data, isAdmin: isAdmin };
});
