import { EyeIcon, EyeOffIcon, LucideKeyRound } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "./input-group";
import { useState } from "react";

export function PasswordGroup({
  placeholder,
  ...props
}: React.ComponentProps<"input">) {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        type={visible ? "text" : "password"}
        placeholder={placeholder ? placeholder : "********"}
      />
      <InputGroupAddon>
        <LucideKeyRound />
      </InputGroupAddon>
      <InputGroupAddon align={"inline-end"}>
        <InputGroupButton size={"icon-xs"} onClick={() => setVisible(!visible)}>
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
