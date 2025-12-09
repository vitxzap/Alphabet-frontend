"use client";
import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterTriggerButton } from "./trigger-button";
import { SelectFilterProps } from "../../lib/filters/types";

export function SelectFilter({ filterName, icon, items }: SelectFilterProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>();

  // Will set the trigger button icon to the icon from the selected item
  const [currentIcon, setCurrentIcon] = React.useState<React.ReactNode>();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FilterTriggerButton
          filterName={filterName}
          icon={!currentIcon ? icon : currentIcon}
          filterValue={value}
        />
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.title}
                  value={item.title}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setCurrentIcon(currentValue === value ? icon : item.icon);
                    setOpen(false);
                  }}
                >
                  {item.icon}
                  {item.title}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === item.title ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
