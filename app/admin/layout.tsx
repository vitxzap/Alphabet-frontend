import { SidebarProvider } from "@/components/ui/sidebar";
import NavHeader from "@/components/web-header/header";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/dal";
import AppSidebar from "@/components/sidebar/sidebar";
import { adminSidebarItems } from "@/components/sidebar/items/admin-items";

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data, isAdmin } = await verifySession();

  if (isAdmin === false) {
    redirect("/web/classes");
  }
  return (
    <main>
      <SidebarProvider className="p-2 pl-0!">
        <AppSidebar
          session={data.session}
          user={data.user}
          items={adminSidebarItems}
        />
        <main className="flex flex-col w-full h-100% bg-background rounded-xl shadow-md">
          <NavHeader />
          {children}
        </main>
      </SidebarProvider>
    </main>
  );
}
