import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";
import type { FilterTriggerButton } from "./types";

export function FilterTriggerButton({
  filterName,
  icon,
  filterValue,
  ...props
}: FilterTriggerButton) {
  return (
    <Button
      variant={filterValue ? "default" : "outline"}
      className={`rounded-full text-sm ${filterValue ? "" : "text-muted-fg"}`}
      size={"sm"}
      {...props}
    >
      {icon}

      {/* Verifies if the filterValue is empty and if so, shows the default filter name, if not, shows the current filter value */}
      {filterValue == undefined || filterValue == "" ? (
        <>{filterName}</>
      ) : (
        <>{filterValue}</>
      )}
      <ChevronDown />
    </Button>
  );
}
