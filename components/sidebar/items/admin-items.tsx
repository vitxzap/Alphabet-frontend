import { SidebarItemsType } from "@/components/sidebar/types";
import { LucideGrid2x2, User, UserCheckIcon, Wrench } from "lucide-react";

export const adminSidebarItems: SidebarItemsType = [
  {
    title: "Dashboard",
    icon: <LucideGrid2x2 />,
    url: {
      pathname: "/admin/dashboard",
    },
  },
  {
    title: "Manage",
    icon: <Wrench />,
    subs: {
      basePath: "/admin/manage",
      items: [
        {
          title: "Users",
          url: {
            pathname: "/admin/manage/users",
          },
        },
        {
          title: "Teachers",
          url: {
            pathname: "/admin/manage/teachers"
          }
        }
      ],
    },
  },
];
