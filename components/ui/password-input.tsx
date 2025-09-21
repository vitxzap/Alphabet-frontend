import { EyeIcon, EyeOffIcon, LucideKeyRound } from "lucide-react";
import { Input } from "./input";
import React, { HTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  placeholder?: string;
  required?: boolean;
  invalid?: boolean;
  hideIcon?: boolean;
};

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, invalid, placeholder, required, hideIcon, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    return (
      <div className="grid gap-2">
        <div className="grid gap-2 relative">
          <Input
            type={isVisible ? "text" : "password"}
            className={cn(`${hideIcon ? '' :  'peer ps-9'}`)}
            placeholder={placeholder}
            ref={ref}
            invalid={invalid}
            {...props}
          />
          <button
            className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            type="button"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide password" : "Show password"}
            aria-pressed={isVisible}
            aria-controls="password"
          >
            {isVisible ? (
              <EyeOffIcon size={16} aria-hidden="true" />
            ) : (
              <EyeIcon size={16} aria-hidden="true" />
            )}
          </button>
          {hideIcon ? (
            ""
          ) : (
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <LucideKeyRound size={16} aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
