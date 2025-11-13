import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { LucideGrid2x2 } from "lucide-react";
import { headers } from "next/headers";
import { Suspense } from "react";


export default async function Classes() {

  return (
    <div className="flex w-full h-full items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <LucideGrid2x2 />
          </EmptyMedia>
          <EmptyTitle>Dashboard Under Construction</EmptyTitle>
          <EmptyDescription>
            This page is under construction and soon will be released to use.
            Feel free to explore the website.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
