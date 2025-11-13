"use server";
import { SettingsDialog } from "@/components/settings/settings";
import AppSidebar from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavHeader from "@/components/web-header/header";
import { redirect, unauthorized } from "next/navigation";
import { verifySession } from "@/lib/dal";
import { userSidebarItems } from "@/components/sidebar/items/user-items";
export default async function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Verifies if the user session is valid
  const { data, isAdmin } = await verifySession();
  if (isAdmin === true) {
    redirect("/admin/dashboard");
  }
  return (
    <main>
      <SettingsDialog />
      <SidebarProvider className="p-2 pl-0!">
        <AppSidebar user={data.user} session={data.session} items={userSidebarItems} />
        <main className="flex flex-col w-full h-100% bg-background rounded-xl shadow-md">
          <NavHeader />
          {children}
        </main>
      </SidebarProvider>
    </main>
  );
}
