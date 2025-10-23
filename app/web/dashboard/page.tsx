
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { MdDashboard } from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MdDashboard />
          </EmptyMedia>
          <EmptyTitle>Dashboard Under Construction</EmptyTitle>
          <EmptyDescription>
            This page is under construction and soon will be released to use. Feel free to explore the website.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
