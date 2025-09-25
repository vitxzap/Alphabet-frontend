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
import { useForm } from "react-hook-form";
import {
  LucideArrowRight,
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
import { AuthMachineComponentProps } from "../authMachine";
import { useEffect } from "react";

const ForgotPasswordSchema = z.object({
  email: z.email().nonempty(),
});

type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;
interface ForgotPasswordFormProps
  extends React.ComponentProps<"div">,
    AuthMachineComponentProps<{
      callOTP: {
        callback: () => void;
      },
      backToLoginPage: {
        callback: () => void
      }
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

  const forgotPasswordMutation = useMutation({
    mutationFn: async (formData: ForgotPasswordSchemaType) => {
      const { error } = await authClient.forgetPassword({
        email: formData.email,
      });
      if (error) {
        throw error;
      } else {
        actions?.callOTP.callback();
      }
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
    /* onSuccess: (data) => {
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
    }, */
  });
  function handleForgotPasswordSubmit(formData: ForgotPasswordDto) {
    forgotPasswordMutation.mutate(formData);
  }
  useEffect(() => {
    if (onRender != undefined) {
      onRender();
    }
  }, []);
  return (
    <div className="grid gap-2">
      <form
        onSubmit={form.handleSubmit(handleForgotPasswordSubmit)}
        className="grid gap-1.5"
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
        <Button
          type="submit"
          className="w-full relative"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? (
            <>
              <Spinner variant="circle" /> Loading...
            </>
          ) : (
            <>
              Recover my password <LucideArrowRight />
            </>
          )}
        </Button>
      </form>
      <Button variant={"ghost"} onClick={actions?.backToLoginPage.callback} className="w-full relative font-semibold">
        Go back to login page
      </Button>
    </div>
  );
}
