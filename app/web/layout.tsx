"use client";
import ResumitSidebar from "@/components/sidebar/resumit-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NavHeader from "@/components/web-header/header";
import { usePathname, useRouter } from "next/navigation";

export default function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
