"use client";
import { authClient } from "@/lib/auth/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { AuthMachineComponentProps } from "@/lib/auth/auth-machine";
import { useAuthStore } from "@/lib/auth/auth-global-state";
import LoadingButton from "@/components/ui/loading-button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import {
  AuthForm,
  AuthFormContent,
  AuthFormContentInputs,
} from "../auth-form-template";
import {
  AuthHeader,
  AuthHeaderDescription,
  AuthHeaderTitle,
} from "../auth-header";
import { ForgotPasswordSchemaType } from "../../../lib/auth/types";
import { forgotPasswordSchema } from "../../../lib/auth/schemas";

interface ForgotPasswordFormProps
  extends React.ComponentProps<"div">,
    AuthMachineComponentProps<{
      callOTP: {
        callback: () => void;
      };
      backToLoginPage: {
        callback: () => void;
      };
    }> {}
export default function ForgotPasswordForm({
  actions,
}: ForgotPasswordFormProps) {
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
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
  return (
    <AuthForm
      onSubmit={form.handleSubmit(handleForgotPasswordSubmit)}
      name="forgotPassword"
    >
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
