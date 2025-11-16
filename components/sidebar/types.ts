import React, { ReactNode } from "react";
import { UrlObject } from "url";

import z from "zod";
const sidebarSchema = z.object({
  title: z.string().nonempty(),
  url: z.custom<UrlObject>(),
  icon: z.custom<ReactNode>(),
});

const zodArray = z.array(sidebarSchema);

export type SidebarItemsType = z.infer<typeof zodArray>;
