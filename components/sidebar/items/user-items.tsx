import { Book, House } from "lucide-react";
import { SidebarItemsType } from "../types";

export const userSidebarItems: SidebarItemsType = [
  {
    title: "Classes",
    url: {
      pathname: "/web/classes",
    },
    icon: <House />,
  },
  {
    title: "Resumes",
    url: {
      pathname: "/web/resumes",
    },
    icon: <Book />,
  },
];
