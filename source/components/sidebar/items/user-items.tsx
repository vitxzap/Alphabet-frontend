import { Book, House } from "lucide-react";
import { SidebarItemsType } from "../types";

export const userSidebarItems: SidebarItemsType = [
  {
    title: "Classes",
    url: "/web/classes",
    icon: <House />,
  },
  {
    title: "Resumes",
    url: "/web/resumes",
    icon: <Book />,
  },
];
