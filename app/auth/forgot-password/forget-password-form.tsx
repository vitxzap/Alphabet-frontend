"use client";
import { Field } from "@/components/Field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LucideArrowRight, LucideCircleX, LucideMail } from "lucide-react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { AuthMachineComponentProps } from "../auth-machine";
import { useEffect } from "react";
import { useAuthStore } from "../auth-global-state";
import LoadingButton from "../components/loading-button";
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
      const { data, error } = await authClient.forgetPassword.emailOtp({
        email: formData.email,
      });
      if (error) {
        throw error;
      }
      authStore.setEmail(formData.email);
      authStore.setType("forget-password");
      actions?.callOTP.callback();
    },
    onError: (err) => {
      toast.error("Oops...", {
        description: err.message,
      });
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
        <LoadingButton
          isLoading={forgotPasswordMutation.isPending}
          type="submit"
        >
          Recover my password
        </LoadingButton>
      </form>
      <Button
        variant={"ghost"}
        onClick={actions?.backToLoginPage.callback}
        className="w-full relative font-semibold"
      >
        Go back to login page
      </Button>
    </div>
  );
}
