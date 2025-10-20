"use client";
import { Session } from "@/lib/auth-client";
import UserSettingsSidebar from "./user-settings-sidebar";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useUserSettingsStore } from "./user-settings-state";
import { Button } from "../ui/button";

interface UserSettingsProps extends Session, React.ComponentProps<"div"> {}

export default function UserSettings({
  user,
  session,
  ...props
}: UserSettingsProps) {
  const { open, setOpen } = useUserSettingsStore();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="flex p-0 h-auto max-w-fit max-h-fit min-h-[40vh] min-w-[30vw] overflow-hidden">
        <div className="flex flex-1 min-h-full w-full">
          <UserSettingsSidebar />

          <div className="flex flex-col flex-1 h-full p-4 overflow-y-auto">
            <DialogHeader className="p-0 mb-4">
              <DialogTitle>Configurações</DialogTitle>
              <DialogDescription>
                Ajuste suas preferências aqui.
              </DialogDescription>
            </DialogHeader>
            <div className="flex-1">...</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
