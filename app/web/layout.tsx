"use client";
import ResumitSidebar from "@/components/sidebar/resumit-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function WebLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider defaultOpen>
      <ResumitSidebar />
      <main className="flex flex-col w-dvw h-dvh border border-red-500 overflow-x-hidden">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
