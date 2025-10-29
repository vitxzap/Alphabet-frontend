import z from "zod";
import { Book, House } from "lucide-react";
const sidebarSchema = z.object({
  title: z.string().nonempty(),
  url: z.string(),
  icon: z.any(), //Any because it can be a component, a file or a svg path.
});

const zodArray = z.array(sidebarSchema);

export type SidebarType = z.infer<typeof zodArray>;

export const userSidebarItems: SidebarType = [
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
