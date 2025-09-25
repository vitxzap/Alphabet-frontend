import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldRootProps {
  children: ReactNode;
}
export default function FieldRoot({ children }: FieldRootProps) {
  return (
    <div
      className={cn(
        `grid relative gap-1.5`
      )}
    >
      {children}
    </div>
  );
}
