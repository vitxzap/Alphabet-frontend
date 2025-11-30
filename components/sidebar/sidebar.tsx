"use client";
import { authClient, Session } from "@/lib/auth/client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import { UserFooter } from "./sidebar-footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { SidebarItemsType } from "./types";
import { SidebarNavigation } from "./navigation";
import { cn } from "@/lib/utils";
import { Logo } from "../ui/logo";
import { Spinner } from "../ui/spinner";

type AppSidebarProps = {
  items: SidebarItemsType;
};

export default function AppSidebar({ items }: AppSidebarProps) {
  const path = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader
        className={cn(
          "flex md:pt-3.5 ml-1.5",
          isCollapsed
            ? "flex-row items-center justify-between gap-y-4 md:flex-col md:items-start md:justify-start"
            : "flex-row items-center justify-between"
        )}
      >
        
        <a className="flex items-center gap-2">
          <Logo />
          {!isCollapsed && (
            <span className="font-semibold text-black dark:text-white">
              Synapse
            </span>
          )}
        </a>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarNavigation items={items} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Suspense fallback={<div className="flex gap-2 p-2 text-sm"><Spinner/> Loading...</div>}>
        <SidebarFooter>
          <UserFooter />
        </SidebarFooter>
      </Suspense>
    </Sidebar>
  );
}
