    import React, { ReactNode } from "react";
    import { cn } from "@/lib/utils";
    interface FieldErrorTextProps {
    children: string | undefined;
    }
    export default function FieldErrorText({ children }: FieldErrorTextProps) {
    return (
        <div className="flex font-bold">
        <p className={cn("text-xs font-medium text-destructive")}>{children}</p>
        </div>
    );
    }
