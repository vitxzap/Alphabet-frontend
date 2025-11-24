import { Session } from "@/lib/auth/client";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import z, { ZodType } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  emailVerified: z.boolean().optional(),
  createdAt: z.date(),
  courseName: z.string(),
  updatedAt: z.date(),
}) satisfies ZodType<Partial<Session["user"]>>;
export type User = z.infer<typeof userSchema>;

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "courseName",
    header: "Course",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
  },
];
