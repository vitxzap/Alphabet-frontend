import ResumitSidebar from "@/components/sidebar/resumit-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavHeader from "@/components/web-header/header";
import { authClient } from "@/lib/auth-client";
import { getServerBaseUrl } from "@/lib/server/fetch";
import { cookies, headers } from "next/headers";
import { unauthorized } from "next/navigation";
export default async function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Verifies if the user session is valid
  const c = cookies();
  const h = headers();
  const { data, error } = await authClient.getSession({
    fetchOptions: {
      cookies: c,
      headers: h
    }
  });
  if (!data || error) {
    // if the session is invalid, calls the unauthorized page
    unauthorized();
  }
  return (
    <SidebarProvider className="p-2 pl-0!">
      <ResumitSidebar />
      <main className="flex flex-col w-full h-100% bg-background rounded-xl shadow-md">
        <NavHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
