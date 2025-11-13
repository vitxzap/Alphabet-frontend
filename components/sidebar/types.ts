import z from "zod";
const sidebarSchema = z.object({
  title: z.string().nonempty(),
  url: z.string(),
  icon: z.any(), //Any because it can be a component, a file or a svg path.
});

const zodArray = z.array(sidebarSchema);

export type SidebarItemsType = z.infer<typeof zodArray>;
