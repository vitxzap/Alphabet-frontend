"use server";
import { SettingsDialog } from "@/components/settings/settings";
import AppSidebar from "@/app/web/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavHeader from "@/components/web-header/header";
import { authClient } from "@/lib/auth/client";
import { cookies, headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";
import { verifySession } from "@/lib/dal";
export default async function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Verifies if the user session is valid
  const { data, authenticated, isAdmin } = await verifySession();
  console.log(data.user)
  if (isAdmin === true) {
    redirect("/admin/dashboard");
  }
  return (
    <main>
      <SettingsDialog />
      <SidebarProvider className="p-2 pl-0!">
        <AppSidebar user={data.user} session={data.session} />
        <main className="flex flex-col w-full h-100% bg-background rounded-xl shadow-md">
          <NavHeader />
          {children}
        </main>
      </SidebarProvider>
    </main>
  );
}
