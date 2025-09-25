"use client";
import { Field } from "@/components/Field";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PasswordInput } from "@/components/ui/password-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { ResetPasswordDto } from "./reset-password-dto";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LucideArrowRight,
  LucideCircleX,
  LucideUserRoundCheck,
} from "lucide-react";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { toast } from "sonner";

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8),
});
type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const resetPasswordMutate = useMutation({
    mutationFn: async (formData: ResetPasswordDto) => {
      const { data, error } = await authClient.resetPassword({
        newPassword: formData.newPassword,
        token: formData.token as string,
      });
      if (error) {
        throw error;
      }
      return data;
    },
    onError: (err) => {
      toast.error("Error", {
        position: "bottom-center",
        style: {
          "--normal-bg":
            "color-mix(in oklab, var(--destructive) 30%, var(--background) 70% )",
          "--normal-text": "var(--destructive)",
          "--normal-border": "var(--destructive)",
        } as React.CSSProperties,
        icon: <LucideCircleX />,
        description: err.message,
      });
    },
    onSuccess: () => {
        
      toast.success("Success", {
        position: "bottom-center",
        style: {
          "--normal-bg":
            "color-mix(in oklab, var(--color-green-600) 30%, var(--background) 70%)",
          "--normal-text":
            "light-dark(var(--color-green-600), var(--color-green-400))",
          "--normal-border":
            "light-dark(var(--color-green-600), var(--color-green-400))",
        } as React.CSSProperties,
        icon: <LucideUserRoundCheck />,
        description: "Your password has been changed.",
      });
    },
  });

  function handleResetPasswordSubmit(formData: ResetPasswordDto) {
    const token = searchParams.get("token");
    formData.token = token;
    resetPasswordMutate.mutate(formData);
  }
  return (
    <div className="flex flex-col gap-6 relative w-full items-center justify-center">
      <Card>
        <BorderTrail size={100} />
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Reset your password</CardTitle>
          <CardDescription>
            Create a new strongpassword that you can easily remember.
          </CardDescription>
          <CardContent>
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
                      <Spinner variant="circle" /> Loading...
                    </>
                  ) : (
                    <>
                      Continue <LucideArrowRight />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
