"use client";
import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { BsMicrosoft } from "react-icons/bs";
import { Controller, useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideArrowRight, LucideMail } from "lucide-react";
import { PasswordGroup } from "@/components/ui/password-input";
import { LoginDto } from "./dtos/login-dto";
import { authClient } from "@/lib/auth/client";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { AuthMachineComponentProps } from "../../config/auth-machine";
import { useAuthStore } from "../../config/auth-global-state";
import LoadingButton from "../../../../components/ui/loading-button";
import { useRouter } from "next/navigation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import LoginProviders from "../login-providers";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

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
export default function LoginForm({
  className,
  actions,
  onRender,
  ...props
}: LoginFormProps) {
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
    <form
      onSubmit={form.handleSubmit(handleLoginForm)}
      className="grid gap-2"
      noValidate
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
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
          <LoadingButton isLoading={loginMutation.isPending}>
            Continue <LucideArrowRight />
          </LoadingButton>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <a
            onClick={actions?.registerAction.callback}
            className="hover:underline underline-offset-4 cursor-pointer text-primary font-semibold"
          >
            Sign up
          </a>
        </div>
      </div>
      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
        <span className="bg-card text-muted-foreground relative z-10 px-2">
          Or continue with
        </span>
      </div>
      <LoginProviders />
    </form>
  );
}
