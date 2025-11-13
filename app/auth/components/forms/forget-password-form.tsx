"use client";
import { authClient } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { AuthMachineComponentProps } from "../../config/auth-machine";
import { useEffect } from "react";
import { useAuthStore } from "../../config/auth-global-state";
import LoadingButton from "../../../../components/ui/loading-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LucideMail } from "lucide-react";
import {
  AuthForm,
  AuthFormContent,
  AuthFormContentInputs,
} from "../form-template";
import { AuthHeader, AuthHeaderDescription, AuthHeaderTitle } from "../header";
const ForgotPasswordSchema = z.object({
  email: z.email().nonempty(),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
interface ForgotPasswordFormProps
  extends React.ComponentProps<"div">,
    AuthMachineComponentProps<{
      callOTP: {
        callback: () => void;
      };
      backToLoginPage: {
        callback: () => void;
      };
    }> {} // extends onRender and onSend from AuthMachineComponentProps to be used in the component

export default function ForgotPasswordForm({
  className,
  onRender,
  actions,
  ...props
}: ForgotPasswordFormProps) {
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const authStore = useAuthStore();
  const forgotPasswordMutation = useMutation({
    mutationFn: async (formData: ForgotPasswordSchemaType) => {
      const { error } = await authClient.forgetPassword.emailOtp({
        email: formData.email,
      });
      if (error) {
        throw error;
      }
      authStore.setEmail(formData.email);
      authStore.setType("forget-password");
      actions?.callOTP.callback();
    },
  });
  function handleForgotPasswordSubmit(formData: ForgotPasswordSchemaType) {
    forgotPasswordMutation.mutate(formData);
  }
  useEffect(() => {
    if (onRender != undefined) {
      onRender();
    }
  }, []);
  return (
    <AuthForm onSubmit={form.handleSubmit(handleForgotPasswordSubmit)} name="forgotPassword">
      <AuthHeader>
        <AuthHeaderTitle>Forgot your password?</AuthHeaderTitle>
        <AuthHeaderDescription>
          Please, provide your email to receive a code to reset your password.
        </AuthHeaderDescription>
      </AuthHeader>
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
        </AuthFormContentInputs>
        <div className="flex flex-col w-full gap-2">
          <LoadingButton
            disabled={!form.formState.isReady}
            isLoading={forgotPasswordMutation.isPending}
            type="submit"
          >
            Recover my password
          </LoadingButton>
          <Button
            variant={"ghost"}
            onClick={actions?.backToLoginPage.callback}
            className="w-full relative font-semibold"
          >
            Go back to login page
          </Button>
        </div>
      </AuthFormContent>
    </AuthForm>
  );
}
