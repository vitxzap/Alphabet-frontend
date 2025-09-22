import React from "react";
import { Label } from "../ui/label";
interface FieldLabelProps {
  children: React.ReactNode;
  requiredIcon?: boolean;
  additionalInfo?: string;
}

export default function FieldLabel({
  children,
  requiredIcon,
  additionalInfo,
}: FieldLabelProps) {
  return (
    <div className="flex justify-between">
      <Label className="flex">
        {children}
        {requiredIcon ? <span className=" text-red-500 ">*</span> : ""}
      </Label>
      {additionalInfo ? (
        <div>
          <a className="ml-auto text-sm underline-offset-4 hover:underline cursor-pointer">{additionalInfo}</a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
