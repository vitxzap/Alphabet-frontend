"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authClient } from "@/lib/auth/client";
import { RegisterDto } from "@/lib/auth/dtos/register-dto";
import { useMutation } from "@tanstack/react-query";
import { AuthMachineComponentProps } from "@/lib/auth/auth-machine";
import { useAuthStore } from "@/lib/auth/auth-global-state";
import LoadingButton from "@/components/ui/loading-button";
import { PasswordGroup } from "@/components/ui/password-input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  AuthHeader,
  AuthHeaderDescription,
  AuthHeaderLink,
  AuthHeaderTitle,
} from "../auth-header";
import {
  AuthForm,
  AuthFormContent,
  AuthFormContentInputs,
} from "../auth-form-template";
import { RegisterTypeSchema } from "@/lib/auth/types";
import { registerSchema } from "@/lib/auth/schemas";

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
export default function RegisterForm({ actions }: RegisterFormProps) {
  const form = useForm<RegisterTypeSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
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
  }
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
