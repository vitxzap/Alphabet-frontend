"server-only";
import { redirect, unauthorized } from "next/navigation";
import { authClient, Session } from "../auth/client";
import { cache } from "react";
import { headers } from "next/headers";

// Used only when DISABLE_AUTHENTICATION = true
// to improve development on protected routes
const fakeData: Session = {
  user: {
    email: "fake@email.com",
    id: "1",
    courseName: "Teste",
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

// Verifies the current user session and returns if the user is authenticated and if is an admin.
export async function verifySession() {
  if (process.env.DISABLE_AUTHENTICATION == "true") {
    return { authenticated: true, data: fakeData, isAdmin: true };
  }
  const { data, error } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });
  const isAdmin = data?.user.role === "admin";

  if (error) {
    unauthorized();
  }

  return { authenticated: true, isAdmin: isAdmin };
}
