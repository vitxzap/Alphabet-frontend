import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleDashed, CircleUserRound, Notebook, Plus } from "lucide-react";

export function Filter() {
  return (
    <div className="flex w-max">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="text-muted-fg">
            {" "}
            <Plus /> Add filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CircleUserRound /> Name
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Notebook /> Course
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CircleDashed /> Status
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
