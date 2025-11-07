"use client";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LucideArrowRight,
  LucideCircleX,
  LucideMail,
  LucideUser,
  LucideUserRoundCheck,
} from "lucide-react";
import { authClient, Session } from "@/lib/auth/client";
import { RegisterDto } from "./dtos/register-dto";
import { Spinner } from "@/components/ui/spinner";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useEffect } from "react";
import { AuthMachineComponentProps } from "../../config/auth-machine";
import { useAuthStore } from "../../config/auth-global-state";
import LoadingButton from "../../../../components/ui/loading-button";
import { PasswordGroup } from "@/components/ui/password-input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
const registerSchema = z
  .object({
    name: z.string({ error: "Invalid: must not be empty" }).min(3),
    email: z.email({ error: "Invalid: must be an email" }).nonempty(),
    password: z.string({ error: "Invalid: must not be empty" }).min(8),
    confirmPassword: z.string({ error: "Invalid: must not be empty" }).min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Invalid: passwords do not match",
    path: ["confirmPassword"],
    when(payload) {
      return registerSchema
        .pick({ password: true, confirmPassword: true })
        .safeParse(payload.value).success;
    },
  }); //creating zod register schema to be used in the form

type RegisterTypeSchema = z.infer<typeof registerSchema>; //Defining zod type to use within typescript
interface RegisterFormProps
  extends React.ComponentProps<"div">,
    AuthMachineComponentProps<{
      login: {
        callback: () => void;
      };
      onRegister: {
        callback: () => void;
      };
    }> {}
export default function RegisterForm({
  className,
  actions,
  onRender,
  ...props
}: RegisterFormProps) {
  const form = useForm<RegisterTypeSchema>({
    resolver: zodResolver(registerSchema),
  });
  const { setEmail, setType } = useAuthStore();
  const registerMutation = useMutation({
    mutationFn: async (formData: RegisterDto) => {
      const c = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        callbackURL: "http://localhost:3000/auth/",
      });
      if (c.error) {
        throw c.error;
      }
      setEmail(formData.email);
      setType("email-verification");
      return c;
    },
    onSuccess: () => {
      actions?.onRegister.callback();
    },
  });

  function handleRegisterForm(formData: RegisterDto) {
    registerMutation.mutate(formData);
  } //function to handle with data and submit
  useEffect(() => {
    if (onRender != undefined) {
      onRender();
    }
  }, []);
  return (
    <form
      onSubmit={form.handleSubmit(handleRegisterForm)}
      className="grid gap-2"
      noValidate={true}
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel aria-required>Name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    placeholder="Jonh Doe"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon>
                    <LucideUser />
                  </InputGroupAddon>
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError>{fieldState.error?.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel aria-required>Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    placeholder="jonhdoe@email.com"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon>
                    <LucideMail />
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError>{fieldState.error?.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel aria-required>Password</FieldLabel>
                <InputGroup>
                  <PasswordGroup {...field} aria-invalid={fieldState.invalid} />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError>{fieldState.error?.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel aria-required>Confirm password</FieldLabel>
                <InputGroup>
                  <PasswordGroup
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Confirm your password"
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError>{fieldState.error?.message}</FieldError>
                )}
              </Field>
            )}
          />

          <div className="relative">
            <LoadingButton isLoading={registerMutation.isPending}>
              Continue <LucideArrowRight />
            </LoadingButton>
          </div>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a
            onClick={actions?.login.callback}
            className="hover:underline underline-offset-4 cursor-pointer text-primary font-semibold"
          >
            Log-in
          </a>
        </div>
      </div>
    </form>
  );
}
