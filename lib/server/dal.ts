"server-only";
import { redirect, unauthorized } from "next/navigation";
import { authClient } from "../auth/client";
import { cache } from "react";
import { headers } from "next/headers";

export const verifySession = cache(async () => {
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
