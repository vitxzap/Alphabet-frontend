import { cn } from "@/lib/utils";

interface FieldHelperTextProps {
  children: React.ReactNode;
}

export default function FieldHelperText({ children }: FieldHelperTextProps) {
  return (
    <div className="flex">
      <p className={cn(" text-muted ")}>{children}</p>
    </div>
  );
}
