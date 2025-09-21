import React from "react";
import { Label } from "../ui/label";
interface FieldLabelProps {
  children: React.ReactNode;
  requiredIcon?: boolean;
}

export default function FieldLabel({
  children,
  requiredIcon,
}: FieldLabelProps) {
  return (
    <div className="flex">
      <Label>
        {children}
        {requiredIcon ? <span className=" text-red-500 ">*</span> : ""}
      </Label>
    </div>
  );
}
