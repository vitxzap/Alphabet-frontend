"use client";
import ResumitIcon from "@/components/logo/icon";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { House, Settings, User } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="!flex !gap-1">
                <AnimatedThemeToggler   />
              <ResumitIcon className="!size-5" /> <span className="font-bold text-[16px]"> Resum.it</span>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <House /> Dashboard
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="flex w-full max-w-full overflow-x-hidden h-full bg-neutral-100 dark:bg-neutral-800">
        <div className="flex flex-1">
          <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-background">
            <div className="flex gap-2">
              {[...new Array(4)].map((i, idx) => (
                <div
                  key={"first-array-demo-2" + idx}
                  className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
                ></div>
              ))}
            </div>
            <div className="flex flex-1 gap-2">
              {[...new Array(2)].map((i, idx) => (
                <div
                  key={"second-array-demo-2" + idx}
                  className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
