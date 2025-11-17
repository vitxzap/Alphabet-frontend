import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";
import {
  emailOTPClient,
  adminClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    emailOTPClient(),
    adminClient(),
    nextCookies(),
    inferAdditionalFields({
      user: {
        course: {
          type: "string",
        },
      },
    }),
  ],
});

export type Session = typeof authClient.$Infer.Session;
