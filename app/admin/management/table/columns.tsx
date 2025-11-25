"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Session } from "@/lib/auth/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import z, { ZodType } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  emailVerified: z.boolean(),
  courseName: z.string(),
}) satisfies ZodType<Partial<Session["user"]>>;

export type User = z.infer<typeof userSchema>;
const columnHelper = createColumnHelper<User>();

export const columns = [
  columnHelper.accessor("name", {
    id: "actions",
    header: () => (
      <div className="flex gap-1 items-center w-max hover:bg-border rounded-md px-2 py-1 cursor-pointer">
        Name <ChevronsUpDown size={12} />
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("courseName", {
    id: "course",
    header: () => (
      <div className="flex gap-1 items-center w-max hover:bg-border rounded-md px-2 py-1 cursor-pointer">
        Course <ChevronsUpDown size={12} />
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: () => (
      <div className="flex gap-1 items-center w-max hover:bg-border rounded-md px-2 py-1 cursor-pointer">
        Email <ChevronsUpDown size={12} />
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("emailVerified", {
    header: () => (
      <div className="flex gap-1 items-center w-max hover:bg-border rounded-md px-2 py-1 cursor-pointer">
        Status <ChevronsUpDown size={12} />
      </div>
    ),
    cell: (info) => (
      <Badge variant={info.getValue() ? "verified" : "destructive"}>
        {" "}
        {info.getValue() ? "Active" : "Pending"}
      </Badge>
    ),
  }),
];
