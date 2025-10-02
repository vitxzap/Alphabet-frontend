"use client"
import z from "zod";
import { MdDashboard } from "react-icons/md"
import { HiDocument } from "react-icons/hi"
const sidebarSchema = z.object({
    title: z.string().nonempty(),
    url: z.string(),
    icon: z.any() //Any because it can be a component, a file or a svg path. 
})

const zodArray = z.array(sidebarSchema)

type SidebarType = z.infer<typeof zodArray>

export const sidebarItems: SidebarType = [{
    title: "Dashboard",
    url: "/web/dashboard",
    icon: <MdDashboard />,
},
{
    title: "Resumes",
    url: "/web/resumes",
    icon: <HiDocument />
}]