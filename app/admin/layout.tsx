import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./components/sidebar/sidebar";
import NavHeader from "@/components/web-header/header";
import { authClient } from "@/lib/auth-client";
import { redirect, unauthorized } from "next/navigation";
import { cookies, headers } from "next/headers";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data, error } = await authClient.getSession({
    fetchOptions: {
      cookies: cookies(),
      headers: await headers(),
    },
  });
  if (data?.user.role === "user") {
    //Redirects the user to the classes page
    redirect("/web/classes");
  }
  if (!data || error) {
    // if the session is invalid, calls the unauthorized page
    unauthorized();
  }
  return (
    <main>
      <SidebarProvider className="p-2 pl-0!">
        <AdminSidebar session={data.session} user={data.user} />
        <main className="flex flex-col w-full h-100% bg-background rounded-xl shadow-md">
          <NavHeader />
          {children}
        </main>
      </SidebarProvider>
    </main>
  );
}
