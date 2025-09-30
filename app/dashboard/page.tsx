"use client";

import ResumitIcon from "@/components/logo/icon";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { ChartAreaIcon, User } from "lucide-react";
import { MdDashboard, MdSettings } from "react-icons/md";
export default function Dashboard() {
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col w-[250px]">
        {/* -- Sidebar Header --  */}
        <div className="flex font-bold  items-center w-full py-4 px-1.5 gap-2">
          <div className="p-1.5 bg-primary rounded-md">
            <ResumitIcon size={20} /> 
          </div>
          <span>Resum.it</span> <AnimatedThemeToggler className="scale-90" />
        </div>

        <div className="flex flex-col px-1.5 gap-2 h-full cursor-pointer">
          <div className="flex items-center p-2 gap-2 dark:bg-neutral-800 bg-neutral-200 rounded-md">
            <div className="">
              <MdDashboard size={20} />
            </div>
            <div className="flex text-sm h-full items-center justify-center">
              Dashboard
            </div>
          </div>
          <div className="flex items-center p-2 gap-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-md">
            <div className="">
              <ChartAreaIcon size={20} />
            </div>
            <div className="flex text-sm h-full items-center justify-center">
              Resumes
            </div>
          </div>
          <div className="flex items-center p-2 gap-2 dark:hover:bg-neutral-800 hover:bg-neutral-200 rounded-md">
            <div className="">
              <MdSettings size={20} />
            </div>
            <div className="flex text-sm h-full items-center justify-center">
              Settings
            </div>
          </div>
          
        </div>
      </div>

      <div className="flex w-full h-full bg-card border rounded-tl-4xl"></div>
    </div>
  );
}
