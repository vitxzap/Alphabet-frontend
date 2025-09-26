"use client"
import * as React from "react";
import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants";
interface InputProps extends React.ComponentProps<"input"> {
  startElement?: React.ReactElement | undefined;
  invalid?: boolean;
}

const inputVariants = tv({
  base: [
    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    "focus-visible:border-ring focus-visible:ring-ring/70 focus-visible:ring-[1px]",
    "data-[invalid=true]: border-destructive focus-visible:border-destructive focus-visible:ring-destructive/70",
    "data-[startElement!=undefined]: peer ps-9",
    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  ],
  variants: {
    size: {
      lg: "scale(1.1)",
    },
  },
});

function Input({
  className,
  type,
  startElement,
  invalid,
  ...props
}: InputProps) {
  return (
    <div className="relative">
      <input
        type={type}
        data-slot="input"
        data-invalid={invalid}
        data-startelement={!!startElement}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 max-sm:h-10 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/70 focus-visible:ring-[1px]",
          "data-[invalid=true]:border-destructive data-[invalid=true]:focus-visible:border-destructive data-[invalid=true]:focus-visible:ring-destructive/70",
          "data-[startElement!=undefined]: peer ps-9",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
        )}
        {...props}
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <div className="">{startElement}</div>
      </div>
    </div>
  );
}

export { Input };
