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
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  LucideArrowRight,
  LucideCircle,
  LucideCircleX,
  LucideMail,
  LucideUserRoundCheck,
} from "lucide-react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ForgotPasswordDto } from "./forgot-password-dto";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const ForgotPasswordSchema = z.object({
  email: z.email(),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (formData: ForgotPasswordSchemaType) => {
      const response = await authClient.forgetPassword({
        email: formData.email,
        redirectTo: "http://localhost:3000/auth/login",
      });
      if (response.error) {
        throw response.error;
      }
      return response;
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
    onSuccess: (data) => {
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
        description: "Open your inbox to reset your password.",
      });
    },
  });
  function handleForgotPasswordSubmit(formData: ForgotPasswordDto) {
    forgotPasswordMutation.mutate(formData);
  }
  return (
    <div
      className={cn(
        "flex flex-col gap-6 relative w-full items-center justify-center"
      )}
    >
      <Card className="relative min-w-1/4">
        <BorderTrail size={100} />
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>
            Provider your email to receive an message to recovery your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <form
              onSubmit={form.handleSubmit(handleForgotPasswordSubmit)}
              className="grid gap-2"
              noValidate={true}
            >
              <Field.Root>
                <Field.Label requiredIcon>Email</Field.Label>
                <Input
                  {...form.register("email")}
                  invalid={!!form.formState.errors.email?.message}
                  startElement={<LucideMail size={16} />}
                  placeholder="Enter your email..."
                />
                <Field.ErrorText>
                  {form.formState.errors.email?.message}
                </Field.ErrorText>
              </Field.Root>
              <Button type="submit" className="w-full relative">
                {forgotPasswordMutation.isPending ? (
                  <>
                    <Spinner variant="ring" /> Loading...
                  </>
                ) : (
                  <>
                    Recover my password <LucideArrowRight />
                  </>
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
