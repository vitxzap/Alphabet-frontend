import React, { ReactNode } from "react";
import { UrlObject } from "url";
import z from "zod";
const sidebarSchema = z.object({
  title: z.string().nonempty().nonoptional(),
  url: z.custom<UrlObject>().optional(),
  icon: z.custom<ReactNode>().optional(),
  subs: z.object({
    basePath: z.string(),
    items: z
      .array(
        z.object({
          title: z.string().nonempty(),
          url: z.custom<UrlObject>(),
        })
      ),
  }).optional(),
});

const zodArray = z.array(sidebarSchema);

export type SidebarItemsType = z.infer<typeof zodArray>;
