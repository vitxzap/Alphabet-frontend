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
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CircleDashed,
  CircleUserRound,
  Notebook,
  Plus,
  UserRoundCheck,
  UserRoundX,
  X,
} from "lucide-react";

export function Filter() {
  return (
    <div className="flex w-max">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="text-muted-fg rounded-full">
            {" "}
            <Plus /> Add filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64">
          <DropdownMenuLabel>Filters</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <CircleUserRound /> Name
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="min-w-72">
                  <DropdownMenuLabel>Filtering name</DropdownMenuLabel>
                  <div className="flex flex-col gap-2 p-2 w-full">
                    <InputGroup>
                      <InputGroupInput placeholder="Enter name..." />
                    </InputGroup>

                    <div className="flex gap-1 justify-end">
                      <Button>Apply filter</Button>
                    </div>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Notebook /> Course
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="min-w-72">
                  <DropdownMenuLabel>Filtering course</DropdownMenuLabel>
                  <div className="flex flex-col gap-2 p-2 w-full">
                    <InputGroup>
                      <InputGroupInput placeholder="Enter course..." />
                    </InputGroup>
                    <div className="flex gap-1 justify-end">
                      <Button>Apply filter</Button>
                    </div>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <CircleDashed /> Status
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="min-w-72">
                  <DropdownMenuLabel>Filtering status</DropdownMenuLabel>
                  <div className="flex flex-col gap-2 p-2 w-full ">
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Status"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Teste</SelectLabel>
                          <SelectItem value="verified">
                            <UserRoundCheck /> Verified
                          </SelectItem>
                          <SelectItem value="unverified">
                            <UserRoundX /> Unverified
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <div className="flex gap-1 justify-end">
                      <Button>Apply filter</Button>
                    </div>
                  </div>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
