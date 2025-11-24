"use client";
import { authClient, Session } from "@/lib/auth/client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { UserFooter } from "./sidebar-footer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { SidebarItemsType } from "./types";

type AppSidebarProps = {
  items: SidebarItemsType;
};

export default function AppSidebar({ items }: AppSidebarProps) {
  const path = usePathname();
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={path === item.url.pathname}
                  >
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Suspense fallback={<>loading...</>}>
        <SidebarFooter>
          <UserFooter />
        </SidebarFooter>
      </Suspense>
    </Sidebar>
  );
}
