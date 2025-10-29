import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./components/sidebar/sidebar";
import NavHeader from "@/components/web-header/header";

interface AdminLayoutProps extends React.ComponentProps<"main"> {
  children: React.ReactNode;
}
export default async function AdminLayout({
  children,
  ...props
}: AdminLayoutProps) {
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
