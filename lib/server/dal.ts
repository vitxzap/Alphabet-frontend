"server-only";
import { unauthorized } from "next/navigation";
import { authClient, Session } from "../auth/client";
import { cache } from "react";
import { headers } from "next/headers";

type VerifySessionType = {
  data: Session;
  isAdmin: boolean;
  isWithoutCourse: boolean;
};
export const verifySession = cache(async (): Promise<VerifySessionType> => {
  const { data } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  const isAdmin = data?.user.role === "admin";
  const isWithoutCourse = data?.user.course === null ? true : false;
  if (!data) {
    unauthorized();
  }
  return {
    data: data,
    isWithoutCourse: isWithoutCourse,
    isAdmin: isAdmin,
  };
});
