import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MonitorCog, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  return (
    <FieldGroup>
      <FieldSet>
        <FieldLabel>Theme</FieldLabel>
        <FieldDescription>Change your theme settings.</FieldDescription>
        <RadioGroup value={theme} className="flex" onValueChange={setTheme}>
          <FieldLabel htmlFor="system" className={`${theme == "system" && "*:text-primary"}`}>
            <Field orientation="horizontal" className="text-inherit">
              <FieldContent className="flex items-center ">
                <FieldTitle className="text-inherit" >
                  <MonitorCog size={22} />
                </FieldTitle>
                <FieldTitle>System</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="system" id="system" hidden />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="light-z4k" className={`${theme == "light" && "*:text-primary"}`}>
            <Field orientation="horizontal">
              <FieldContent className="flex items-center">
                <FieldTitle>
                  <Sun size={22} />
                </FieldTitle>
                <FieldTitle>Light</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="light" id="light-z4k" hidden />
            </Field>
          </FieldLabel>
          <FieldLabel htmlFor="dark-z4k" className={`${theme == "dark" && "*:text-primary"}`}>
            <Field orientation="horizontal">
              <FieldContent className="flex items-center">
                <FieldTitle>
                  <Moon size={22} />
                </FieldTitle>
                <FieldTitle>Dark</FieldTitle>
              </FieldContent>
              <RadioGroupItem value="dark" id="dark-z4k" hidden />
            </Field>
          </FieldLabel>
        </RadioGroup>
      </FieldSet>
    </FieldGroup>
  );
}
