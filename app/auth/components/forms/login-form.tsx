"use client";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideArrowRight } from "lucide-react";
import { PasswordGroup } from "@/components/ui/password-input";
import { LoginDto } from "../../config/dtos/login-dto";
import { authClient } from "@/lib/auth/client";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { AuthMachineComponentProps } from "../../config/auth-machine";
import { useAuthStore } from "../../config/auth-global-state";
import LoadingButton from "../../../../components/ui/loading-button";
import { useRouter } from "next/navigation";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import LoginProviders from "../login-providers";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { SynapseIcon } from "@/components/icon";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AuthHeader,
  AuthHeaderDescription,
  AuthHeaderDivider,
  AuthHeaderLink,
  AuthHeaderTitle,
} from "../header";
import {
  AuthForm,
  AuthFormContent,
  AuthFormContentInputs,
} from "../form-template";

const loginSchema = z.object({
  email: z
    .email({ error: "Invalid: must be an email" })
    .nonempty({ error: "Invalid: must not by empty" }),
  password: z
    .string({ error: "Invalid: must not by empty" })
    .nonempty({ error: "Invalid: must not by empty" }),
  rememberMe: z.boolean(),
}); //creating zod login schema to be used in the form

type LoginTypeSchema = z.infer<typeof loginSchema>; //Defining zod type to use within typescript
interface LoginFormProps
  extends React.ComponentProps<"div">,
    AuthMachineComponentProps<{
      registerAction: {
        callback: () => void;
      };
      emailVerificationAction: {
        callback: () => void;
      };
      forgotPasswordAction: {
        callback: () => void;
      };
    }> {}
export default function LoginForm({ actions, onRender }: LoginFormProps) {
  const form = useForm<LoginTypeSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: true,
    },
  });
  const { setEmail, setType } = useAuthStore();
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: async (formData: LoginDto) => {
      const { data, error } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      });
      switch (true) {
        case error?.code == "EMAIL_NOT_VERIFIED":
          setEmail(formData.email);
          setType("email-verification");
          actions?.emailVerificationAction.callback();
        case error?.code != undefined:
          throw error;
      }
      return data;
    },
    onSuccess: () => {
      router.push("/web/classes");
    },
  });

  //Handle with data and submit from forms
  function handleLoginForm(formData: LoginDto) {
    loginMutation.mutate(formData);
  }
  useEffect(() => {
    if (onRender != undefined) {
      onRender();
    }
  }, []);
  return (
    <AuthForm onSubmit={form.handleSubmit(handleLoginForm)} name="login">
      <AuthHeader>
        <AuthHeaderTitle>Welcome back</AuthHeaderTitle>
        <AuthHeaderDescription>
          Dont have an account?{" "}
          <AuthHeaderLink onClick={actions?.registerAction.callback}>
            Sign up
          </AuthHeaderLink>
        </AuthHeaderDescription>
      </AuthHeader>
      <LoginProviders />
      <AuthHeaderDivider>You can also</AuthHeaderDivider>
      <AuthFormContent>
        <AuthFormContentInputs>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel aria-required>Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="jonhdoe@email.com"
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
                <FieldLabel className="flex justify-between" aria-required>
                  <p>Password </p>
                  <a
                    className="underline-offset-4 hover:underline cursor-pointer"
                    onClick={actions?.forgotPasswordAction.callback}
                  >
                    Forgot your password?
                  </a>
                </FieldLabel>
                <PasswordGroup {...field} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError>{fieldState.error?.message}</FieldError>
                )}
              </Field>
            )}
          />
          <Controller
            name="rememberMe"
            control={form.control}
            render={({ field }) => (
              <div className="flex gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label>Remember me?</Label>
              </div>
            )}
          ></Controller>
        </AuthFormContentInputs>
        <LoadingButton
          isLoading={loginMutation.isPending}
          disabled={!form.formState.isValid}
        >
          Log in
        </LoadingButton>
      </AuthFormContent>
    </AuthForm>
  );
}
