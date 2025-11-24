import { SidebarTrigger } from "../ui/sidebar";

export default function NavHeader() {
  return (
    <div className="flex w-full p-3 items-center justify-between">
      <div className="flex gap-1 items-center">
        <SidebarTrigger/>
      </div>
    </div>
  );
}
