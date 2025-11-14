"use client";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../ui/breadcrumb";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

export default function NavHeader() {
  let pathname = usePathname();
  //If the pathname startwith admin it will slice 7 characters, if not, it will slice 5 characters
  let slicedPath = pathname.slice(pathname.startsWith("/admin") ? 7 : 5);
  //This will capitalize the current page name
  slicedPath = slicedPath[0].toUpperCase() + slicedPath.slice(1);
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
            {slicedPath}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
  );
}
