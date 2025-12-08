"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectGroup, SelectValue } from "@radix-ui/react-select";
import {
  CircleAlert,
  CircleCheck,
  CircleDashed,
  CircleUserRound,
  CircleX,
  Notebook,
  Plus,
  UserCircle,
  UsersRound,
} from "lucide-react";
import { TextFilter } from "./filters/text-filter";
import { SelectFilter } from "./filters/select-filter";

interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
}

export function DataTable<TData>({ columns, data }: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="flex flex-col gap-2 w-full h-max">
      <div className="flex gap-1 w-max">
        <TextFilter
          filterName="Student"
          description="This field will filter all students by name"
          title="Filtering student"
          icon={<CircleUserRound />}
        />
        <TextFilter
          filterName="Course"
          description="This field will filter all courses by name"
          title="Filtering course"
          icon={<Notebook />}
        />
        <SelectFilter
          title="Status filtering"
          filterName="Status"
          icon={<Notebook />}
          items={[
            {
              title: "Verified",
              icon: <CircleCheck />,
            },
            {
              title: "Unverified",
              icon: <CircleX />,
            },
            {
              title: "Both",
              icon: <CircleDashed />
            },
          ]}
          description="Filter your data by their status"
        />
      </div>
      <div className="overflow-hidden rounded-md border w-full h-min">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-muted hover:bg-muted"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between w-full">
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={table.previousPage}
              disabled={!table.getCanPreviousPage()}
            />
            <PaginationNext
              onClick={table.nextPage}
              disabled={!table.getCanNextPage()}
            />
          </PaginationContent>
        </Pagination>
        <div className="flex gap-2 items-center">
          <span className="text-sm text-muted-fg">Showing</span>
          <Select
            onValueChange={(e) => table.setPageSize(Number(e))}
            defaultValue="5"
          >
            <SelectTrigger>
              <SelectValue placeholder={"Rows"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Displaying rows</SelectLabel>
                {[2, 5, 10, 20].map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-fg">entries</span>
        </div>
      </div>
    </div>
  );
}
