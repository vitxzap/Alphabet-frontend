"use client";
import { authClient } from "@/lib/auth-client";
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
import { sidebarItems } from "./items";
import { UserFooter } from "./resumit-sidebar-footer";
import { useEffect } from "react";
import { useUserStore } from "@/app/web/user-global-state";
export default function ResumitSidebar() {
  const { setUser, user } = useUserStore();
  useEffect(() => {
    async function fetchSession() {
      const { data, error } = await authClient.getSession();
      setUser(data?.user);
      console.log(data?.user);
    }
    fetchSession();
  }, []);
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserFooter
          user={{
            avatar: user.image as string,
            email: user?.email as string,
            name: user.name as string,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
