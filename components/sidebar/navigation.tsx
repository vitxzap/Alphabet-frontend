"use client";
import { useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import { SidebarItemsType } from "./types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Collapsible, CollapsibleTrigger } from "../ui/collapsible";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CollapsibleContent } from "@radix-ui/react-collapsible";

export function SidebarNavigation({ items }: { items: SidebarItemsType }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  const path = usePathname();
  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);
  return (
    <SidebarMenu>
      {items.map((route) => {
        const isOpen = !isCollapsed && openCollapsible === route.title;

        const hasSubRoutes = !!route.subs?.items.length;
        return (
          <SidebarMenuItem key={route.title}>
            {hasSubRoutes ? (
              <Collapsible
                open={isOpen}
                onOpenChange={(open) =>
                  setOpenCollapsible(open ? route.title : null)
                }
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    isActive={path.includes(route.subs?.basePath!)}
                    className={cn(
                      "flex w-full items-center rounded-lg px-2 transition-colors",
                      isOpen
                        ? "bg-sidebar-muted text-foreground"
                        : "text-muted-foreground hover:bg-sidebar-muted hover:text-foreground",
                      isCollapsed && "justify-center"
                    )}
                  >
                    {route.icon}
                    {!isCollapsed && (
                      <span className="ml-2 flex-1 text-sm font-medium">
                        {route.title}
                      </span>
                    )}
                    {!isCollapsed && hasSubRoutes && (
                      <span className="ml-auto">
                        {isOpen ? (
                          <ChevronUp className="size-4" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </span>
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {!isCollapsed && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="my-1 ml-3.5">
                      {route.subs?.items.map((subRoute) => (
                        <SidebarMenuSubItem
                          key={`${subRoute.title}`}
                          className="h-auto"
                        >
                          <SidebarMenuSubButton asChild isActive={path === subRoute.url.pathname}>
                            <Link
                              href={subRoute.url}
                              prefetch={true}
                              className="flex items-center rounded-md px-4 py-1.5 text-sm font-medium text-muted-foreground hover:bg-sidebar-muted hover:text-foreground"
                            >
                              <div className="flex items-center gap-1">
                                {subRoute.title}
                              </div>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </Collapsible>
            ) : (
              <SidebarMenuButton tooltip={route.title} asChild isActive={path === route.url?.pathname}>
                <Link
                  href={route.url!}
                  prefetch={true}
                  className={cn(
                    "flex items-center rounded-lg px-2 transition-colors text-muted-foreground hover:bg-sidebar-muted hover:text-foreground",
                    isCollapsed && "justify-center"
                  )}
                >
                  {route.icon}
                  {!isCollapsed && (
                    <span className="ml-2 text-sm font-medium">
                      {route.title}
                    </span>
                  )}
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
