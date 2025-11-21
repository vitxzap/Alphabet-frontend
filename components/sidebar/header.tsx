"use client";
import { usePathname } from "next/navigation";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Sidebar } from "lucide-react";

export default function NavHeader() {
  let pathname = usePathname();
  //If the pathname startwith admin it will slice 7 characters, if not, it will slice 5 characters
  let slicedPath = pathname.slice(pathname.startsWith("/admin") ? 7 : 5);
  //This will capitalize the current page name
  slicedPath = slicedPath[0].toUpperCase() + slicedPath.slice(1);
  const { toggleSidebar, state } = useSidebar();
  return (
    <div className="flex w-full p-3 items-center justify-between">
      <div className="flex gap-1 items-center">
        <Button variant={"outline"} onClick={toggleSidebar} size={"sm"}>
          <Sidebar /> {state == "expanded" ? <>Collapse</> : <>Expand</>}
        </Button>
      </div>
    </div>
  );
}
