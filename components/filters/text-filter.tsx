"use client";
import { Button } from "@/components/ui/button";
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
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChevronDown,
} from "lucide-react";
import { FormEvent, ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { FilterProps } from "../../lib/filters/types";
import { FilterTriggerButton } from "./trigger-button";

const filterSchema = z.object({
  filter: z.string().nonempty().max(64),
});
type FilterType = z.infer<typeof filterSchema>;

export function TextFilter({
  title,
  icon,
  filterName,
  description,
}: FilterProps) {
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
          <FilterTriggerButton filterName={filterName} filterValue={filterValue} icon={icon}/>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h4 className="leading-none font-medium">{title}</h4>
              <span className="text-muted-fg text-sm">{description}</span>
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
                      {icon}
                    </InputGroupAddon>
                    <InputGroupInput
                      placeholder="Enter filter..."
                      {...field}
                      autoCapitalize="true"
                    />
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
