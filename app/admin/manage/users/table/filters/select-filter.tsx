import { Button } from "@/components/ui/button";
import { SelectFilterProps } from "./types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectFilter({
  title,
  description,
  filterName,
  icon,
  items,
}: SelectFilterProps) {
  return (
    <Select>
      <SelectTrigger className="rounded-full" size="sm">
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent className="w-72">
        <SelectGroup>
          <SelectLabel className=" flex flex-col gap-1 font-medium text-md text-fg">
            {title}
            <span className="text-muted-fg text-sm font-normal">
              {description}
            </span>
          </SelectLabel>
          <SelectSeparator />
          {items.map((item) => (
            <SelectItem value={item.title} key={item.title}>
              {item.icon}
              {item.title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
