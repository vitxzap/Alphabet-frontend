import { headers } from "next/headers";

export async function getServerBaseUrl() {
  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host");
  const protocol = hdrs.get("x-forwarded-proto") || "https";
  const baseURL = `${protocol}://${host}`;
  return baseURL;
}
