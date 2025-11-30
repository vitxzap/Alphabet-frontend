"use client";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select } from "@/components/ui/select";
import { Session } from "@/lib/auth/client";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { SelectTrigger } from "@radix-ui/react-select";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import {
  ChevronsUpDown,
  Ellipsis,
  EllipsisVertical,
  Eye,
  SquarePen,
  Trash,
  UserRound,
} from "lucide-react";
import z, { ZodType } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  image: z.string().nullable().optional(),
  emailVerified: z.boolean(),
  courseName: z.string(),
}) satisfies ZodType<Partial<Session["user"]>>;

export type User = z.infer<typeof userSchema>;
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Student",
    cell: ({ cell, row }) => {
      return (
        <div className="flex gap-2 items-center">
          <Avatar className="h-6 w-6">
            <AvatarImage src={row.original.image!} />
            <AvatarFallback>
              <UserRound className="p-1 bg-muted" />
            </AvatarFallback>
          </Avatar>
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: "courseName",
    header: "Course",
  },
  {
    accessorKey: "emailVerified",
    header: "Status",
    cell: (info) => (
      <Badge variant={`${info.getValue() ? "verified" : "destructive"}`}>
        {info.getValue() ? "Verified" : "Unverified"}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <div className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"}>
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <SquarePen />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye />
              View
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
