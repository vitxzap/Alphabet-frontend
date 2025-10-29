"use client";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function NavHeader() {
  let pathName = usePathname().slice(5); //get the pathname and then remote the "/web/" from it using slice(5)
  pathName = pathName[0].toUpperCase() + pathName.slice(1); //This will capitalize the current user's page
  const { setTheme } = useTheme();
  function changeTheme(selectedTheme: "dark" | "light") {
    setTheme(selectedTheme);
  }
  return (
    <div className="flex w-full p-3 items-center justify-between border-b">
      <div className="flex gap-1 items-center">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 orientation-vertical:h-4"
        />
        <Breadcrumb>
          <BreadcrumbItem className="text-sm font-semibold">
            {pathName}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MonitorCog />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel>Change Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => changeTheme("light")}>
              <Sun />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeTheme("dark")}>
              <Moon />
              Dark
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
