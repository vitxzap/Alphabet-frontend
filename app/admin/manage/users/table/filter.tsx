"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowDown,
  ChevronDown,
  CircleDashed,
  CircleUserRound,
  Notebook,
  Plus,
  UserRoundCheck,
  UserRoundX,
  X,
} from "lucide-react";
import { FormEvent, ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { motion } from "motion/react";
interface FilterProps extends React.ComponentProps<"form"> {
  filterName: string;
  title: string;
  description: string;
  icon: ReactNode;
}

const filterSchema = z.object({
  filter: z
    .string()
    .nonempty()
    .max(32)
    .regex(/^[a-zA-Z\s]+$/, "Only letters are allowed"),
});
type FilterType = z.infer<typeof filterSchema>;
export function Filter() {
  const [open, setOpen] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<FilterType["filter"]>("");
  const form = useForm<FilterType>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      filter: "",
    },
  });
  const submitFilter = () => {
    console.log(form.getValues("filter"));
    setFilterValue(form.getValues("filter"));
  };
  return (
    <div className="flex w-max gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={filterValue ? "default" : "outline"}
            className={`rounded-full text-sm ${
              filterValue ? "" : "text-muted-fg"
            }`}
            size={"sm"}
          >
            {" "}
            <CircleUserRound />{" "}
            {form.getValues("filter") == "" ? (
              <>Name</>
            ) : (
              <>{filterValue}</>
            )}{" "}
            <ChevronDown />{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="leading-none font-medium">Filtering name</h4>
              <span className="text-muted-fg text-sm">
                This field will filter all students by name
              </span>
            </div>

            <form
              className="flex flex-col gap-2"
              autoComplete="off"
              onSubmit={form.handleSubmit(submitFilter)}
            >
              <Controller
                name="filter"
                control={form.control}
                render={({ field, fieldState }) => (
                  <InputGroup>
                    <InputGroupAddon>
                      <CircleUserRound />
                    </InputGroupAddon>
                    <InputGroupInput
                      placeholder="Enter filter..."
                      {...field}
                      autoCapitalize="true"
                    />
                    Input
                  </InputGroup>
                )}
              />

              <div className="flex gap-1">
                <Button
                  variant={"outline"}
                  onClick={() => {
                    form.resetField("filter");
                    setOpen(false);
                    setFilterValue(form.getValues("filter"));
                  }}
                >
                  Remove
                </Button>
                <Button
                  className="flex-1"
                  type="submit"
                  onClick={() => setOpen(false)}
                  disabled={!form.formState.isValid}
                >
                  Apply filter
                </Button>
              </div>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
