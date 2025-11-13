"use client";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/client";
import { RegisterDto } from "../../config/dtos/register-dto";
import { useMutation } from "@tanstack/react-query";
import { AuthMachineComponentProps } from "../../config/auth-machine";
import { useAuthStore } from "../../config/auth-global-state";
import LoadingButton from "../../../../components/ui/loading-button";
import { PasswordGroup } from "@/components/ui/password-input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  AuthHeader,
  AuthHeaderDescription,
  AuthHeaderLink,
  AuthHeaderTitle,
} from "../header";
import {
  AuthForm,
  AuthFormContent,
  AuthFormContentInputs,
} from "./auth-form-template";
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
  return (
    <AuthForm onSubmit={form.handleSubmit(handleRegisterForm)} name="register">
      <AuthHeader>
        <AuthHeaderTitle>Nice to meet you</AuthHeaderTitle>
        <AuthHeaderDescription>
          Already have an account?{" "}
          <AuthHeaderLink onClick={actions?.login.callback}>
            Log in
          </AuthHeaderLink>
        </AuthHeaderDescription>
      </AuthHeader>
      <AuthFormContent>
        <AuthFormContentInputs>
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

                <PasswordGroup {...field} aria-invalid={fieldState.invalid} />

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

                <PasswordGroup
                  {...field}
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirm your password"
                />

                {fieldState.invalid && (
                  <FieldError>{fieldState.error?.message}</FieldError>
                )}
              </Field>
            )}
          />
        </AuthFormContentInputs>
        <LoadingButton
          isLoading={registerMutation.isPending}
          disabled={!form.formState.isValid}
        >
          Create account
        </LoadingButton>
      </AuthFormContent>
    </AuthForm>
  );
}
