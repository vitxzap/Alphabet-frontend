"use server";
import { SettingsDialog } from "@/components/settings/settings";
import AppSidebar from "@/components/sidebar/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import NavHeader from "@/components/sidebar/header";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/server/dal";
import { userSidebarItems } from "@/components/sidebar/items/user-items";
import NoCourseDialog from "@/components/web/no-course-dialog";
export default async function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Verifies if the user session is valid
  const { data, isAdmin, isWithoutCourse } = await verifySession();
  if (isAdmin === true) {
    redirect("/admin/dashboard");
  }
  return (
    <main className="flex w-dvw">
      <SettingsDialog />
      <NoCourseDialog isWithoutCourse={isWithoutCourse} />
      <SidebarProvider className="p-2 pl-0!">
        <AppSidebar
          user={data.user}
          session={data.session}
          items={userSidebarItems}
        />
        <main className="flex flex-col w-full h-100% bg-background rounded-xl shadow-md">
          <NavHeader />
          {children}
        </main>
      </SidebarProvider>
    </main>
  );
}
