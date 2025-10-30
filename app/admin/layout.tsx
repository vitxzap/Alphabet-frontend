import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./components/sidebar/sidebar";
import NavHeader from "@/components/web-header/header";
import { authClient } from "@/lib/auth-client";
import { unauthorized } from "next/navigation";

interface AdminLayoutProps extends React.ComponentProps<"main"> {
  children: React.ReactNode;
}
export default async function AdminLayout({
  children,
  ...props
}: AdminLayoutProps) {
  const { data, error } = await authClient.getSession();
  if (data?.user.role != "admin") {
    unauthorized();
  }
  return (
    <main {...props}>
      <SidebarProvider>
        <AdminSidebar />
        <main className="flex flex-col w-full h-100% bg-background rounded-xl shadow-md">
          <NavHeader />
          {children}
        </main>
      </SidebarProvider>
    </main>
  );
}
