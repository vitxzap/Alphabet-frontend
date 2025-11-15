"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { ResetPasswordDto } from "@/lib/auth/dtos/reset-password-dto";
import { authClient } from "@/lib/auth/client";
import { useAuthStore } from "@/lib/auth/auth-global-state";
import { AuthMachineComponentProps } from "@/lib/auth/auth-machine";
import { toast } from "sonner";
import { PasswordGroup } from "@/components/ui/password-input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import LoadingButton from "@/components/ui/loading-button";
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
import { ResetPasswordSchemaType } from "@/lib/auth/types";
import { resetPasswordSchema } from "@/lib/auth/schemas";

interface ResetPasswordProps
  extends AuthMachineComponentProps<{
    onNewPassword: {
      callback: () => void;
    };
  }> {}
export default function ResetPasswordForm({ actions }: ResetPasswordProps) {
  const { email, otp } = useAuthStore();
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
    }
  });

  const resetPasswordMutate = useMutation({
    mutationFn: async (formData: ResetPasswordDto) => {
      const { data, error } = await authClient.emailOtp.resetPassword({
        email: email,
        otp: otp,
        password: formData.newPassword,
      });
      if (error) {
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "Your password was successfully changed!",
      });
      setTimeout(() => {
        actions?.onNewPassword.callback();
      }, 1800);
    },
  });

  function handleResetPasswordSubmit(formData: ResetPasswordDto) {
    resetPasswordMutate.mutate(formData);
  }
  return (
    <AuthForm
      onSubmit={form.handleSubmit(handleResetPasswordSubmit)}
      name="resetPassword"
    >
      <AuthHeader>
        <AuthHeaderTitle>Changing your password</AuthHeaderTitle>
        <AuthHeaderDescription>
          Choose a new secure password to finish resetting your account.
        </AuthHeaderDescription>
      </AuthHeader>
      <AuthFormContent>
        <AuthFormContentInputs>
          <Controller
            name="newPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel aria-required>New password</FieldLabel>
                <PasswordGroup {...field} aria-invalid={fieldState.invalid} />
                {fieldState.invalid && (
                  <FieldError>{fieldState.error?.message}</FieldError>
                )}
              </Field>
            )}
          />
        </AuthFormContentInputs>
        <LoadingButton
          disabled={!form.formState.isReady}
          isLoading={resetPasswordMutate.isPending}
        >
          Change password
        </LoadingButton>
      </AuthFormContent>
    </AuthForm>
  );
}
