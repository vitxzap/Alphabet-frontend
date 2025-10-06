"use client";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { File } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex w-full h-full">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <File />
          </EmptyMedia>
          <EmptyTitle>Resumes Under Construction</EmptyTitle>
          <EmptyDescription>
            This page is under construction and soon will be released to use.
            Feel free to explore the website.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
