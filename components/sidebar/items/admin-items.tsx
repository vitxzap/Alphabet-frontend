import { SidebarItemsType } from "@/components/sidebar/types";
import { LucideGrid2x2, UserCheckIcon, Wrench } from "lucide-react";

export const adminSidebarItems: SidebarItemsType = [
  {
    title: "Dashboard",
    icon: <LucideGrid2x2 />,
    url: {
      pathname: "/admin/dashboard",
    },
  },
  {
    title: "User Management",
    icon: <Wrench />,
    url: {
      pathname: "/admin/management",
    },
  },
];
