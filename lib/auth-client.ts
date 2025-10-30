import { createAuthClient } from "better-auth/react";
import { emailOTPClient, adminClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  basePath: process.env.NEXT_PUBLIC_AUTH_URL,
  plugins: [emailOTPClient(), adminClient()],
});

export type Session = typeof authClient.$Infer.Session;