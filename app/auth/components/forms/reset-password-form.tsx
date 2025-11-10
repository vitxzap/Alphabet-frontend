"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { ResetPasswordDto } from "./dtos/reset-password-dto";
import { authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import {
  LucideArrowRight,
  LucideCircleX,
  LucideUserRoundCheck,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "../../config/auth-global-state";
import { AuthMachineComponentProps } from "../../config/auth-machine";
import { toast } from "sonner";
import { PasswordGroup } from "@/components/ui/password-input";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";

const resetPasswordSchema = z.object({
  newPassword: z.string({ error: "Invalid: must not be empty" }).min(8),
});
type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
interface ResetPasswordProps
  extends AuthMachineComponentProps<{
    onNewPassword: {
      callback: () => void;
    };
  }> {}
export default function ResetPasswordForm({
  actions,
  onRender,
}: ResetPasswordProps) {
  const { email, otp } = useAuthStore();
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
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
    <form
      className="grid gap-2"
      noValidate
      onSubmit={form.handleSubmit(handleResetPasswordSubmit)}
    >
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
      <div className="relative">
        <Button type="submit" className="w-full relative">
          {resetPasswordMutate.isPending ? (
            <>
              <Spinner /> Loading...
            </>
          ) : (
            <>
              Continue <LucideArrowRight />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
