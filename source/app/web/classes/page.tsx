import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { headers } from "next/headers";
import { MdDashboard } from "react-icons/md";

export default async function Classes() {
  const payload = await fetch("http://localhost:3050/role/user", {
    headers: await headers(),
  });
  const data = await payload.text();
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MdDashboard />
          </EmptyMedia>
          <EmptyTitle>Classes Under Construction</EmptyTitle>
          <EmptyDescription>
            This page is under construction and soon will be released to use.
            Feel free to explore the website.
          </EmptyDescription>
          <EmptyContent>{data}</EmptyContent>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
