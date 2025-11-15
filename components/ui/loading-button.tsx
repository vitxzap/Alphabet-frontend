import { Button, buttonVariants } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { LucideArrowRight } from "lucide-react";
import React, { ReactNode } from "react";

interface LoadingButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean;
  children: ReactNode;
  asChild?: boolean;
  disabled: boolean,
  loadingLabel?: string;
}
export default function LoadingButton({
  isLoading = false,
  loadingLabel = "Loading...",
  children,
  disabled,
  asChild = false,
  size,
  variant,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
      className={cn("w-full relative corner-shape-squircle", className)}
      disabled={isLoading || disabled}
    >
      {isLoading ? (
        <>
          <Spinner /> {loadingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
