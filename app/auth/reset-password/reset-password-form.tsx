"use client";
import { Field } from "@/components/Field";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { ResetPasswordDto } from "./reset-password-dto";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  LucideArrowRight,
  LucideCircleX,
  LucideUserRoundCheck,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useAuthStore } from "../auth-global-state";
import { AuthMachineComponentProps } from "../auth-machine";
import { toast } from "sonner";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8),
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
    onError: (err) => {
      toast.error("Oops...", {
        description: err.message,
      });
    },
    onSuccess: () => {
      setTimeout(() => {
        actions?.onNewPassword.callback();
      }, 1500);
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
      <Field.Root>
        <Field.Label requiredIcon>New password</Field.Label>
        <PasswordInput
          invalid={!!form.formState.errors.newPassword?.message}
          {...form.register("newPassword")}
          placeholder="Enter your new password..."
        />
        <Field.ErrorText>
          {form.formState.errors.newPassword?.message}
        </Field.ErrorText>
      </Field.Root>
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
