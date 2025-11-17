import { Controller, useForm } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { CourseFormSchema, CourseFormType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldLabel } from "../ui/field";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { HelpCircle } from "lucide-react";
import LoadingButton from "../ui/loading-button";

export function CourseForm() {
  const form = useForm<CourseFormType>({
    resolver: zodResolver(CourseFormSchema),
    defaultValues: {
      courseCode: "",
    },
  });
  return (
    <form className="flex flex-col gap-2 w-full items-end" noValidate onSubmit={(e) => console.log("submit")} >
      <Controller
        name="courseCode"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field aria-invalid={fieldState.invalid}>
            <FieldLabel aria-required>Course Code</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                placeholder="Your course code"
                aria-invalid={fieldState.invalid}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <InputGroupAddon>
                    <InputGroupButton
                      variant={"ghost"}
                      size={"icon-sm"}
                      aria-label="tooltip"
                    >
                      <HelpCircle />
                    </InputGroupButton>
                  </InputGroupAddon>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-wrap text-center">
                    The code maybe is in your email inbox. Check them to
                    continue.
                  </p>
                </TooltipContent>
              </Tooltip>
            </InputGroup>
          </Field>
        )}
      />
      <LoadingButton
        className="w-max"
        type="submit"
        isLoading={false}
        disabled={false}
      >
        Send
      </LoadingButton>
    </form>
  );
}
