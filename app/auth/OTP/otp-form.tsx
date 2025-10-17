"use client";
import { Button } from "@/components/ui/button";
import { AuthMachineComponentProps } from "../auth-machine";
import { useEffect } from "react";
import z, { email } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import { useAuthStore } from "../auth-global-state";
import { toast } from "sonner";
import {
  LucideArrowRight,
  LucideCircleX,
  LucideUserRoundCheck,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
const OTPFormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your verification code must be 6 digits",
  }),
});

type OTPFormSchemaType = z.infer<typeof OTPFormSchema>;

interface OTPFormProps
  extends React.ComponentProps<"form">,
    AuthMachineComponentProps<{
      onOTPSuccess: {
        callback: () => void;
      };
    }> {}

export default function OTPForm({ actions, onRender, ...props }: OTPFormProps) {
  const form = useForm<OTPFormSchemaType>({
    resolver: zodResolver(OTPFormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const { email, type, setOTP } = useAuthStore();
  const requestNewOTPCode = useMutation({
    mutationFn: async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: type,
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
        description: "A new verification code was send to your email inbox.",
      });
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
  });
  const OTPFormMutate = useMutation({
    mutationFn: async (formData: OTPFormSchemaType) => {
      console.log(type)
      if (type === "email-verification") {
        await authClient.emailOtp.verifyEmail({
          email: email,
          otp: formData.otp,
        });
        return
      }
      const { data, error } = await authClient.emailOtp.checkVerificationOtp({
        otp: formData.otp,
        email: email,
        type: type,
      });
      if (error) {
        throw error;
      }
      console.log(data)
      setOTP(formData.otp);
      actions?.onOTPSuccess.callback();
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
  });

  function handleOTPForm(formData: OTPFormSchemaType) {
    OTPFormMutate.mutate(formData);
  }
  useEffect(() => {
    if (onRender != undefined) {
      onRender();
    }
  }, []);
  return (
    <form
      className="flex items-center justify-center"
      noValidate
      onSubmit={form.handleSubmit(handleOTPForm)}
    >
      <div className="grid gap-2 items-center justify-center">
        <div>
          <Controller
            name="otp"
            render={({ field }) => (
              <InputOTP maxLength={6} {...field} pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
            control={form.control}
          />
          {!!form.formState.errors.otp}
        </div>
        <div className="grid gap-2">
          <Button className="w-full" type="submit">
            {OTPFormMutate.isPending ? (
              <>
                <Spinner/> Loading...
              </>
            ) : (
              <>
                Verify code <LucideArrowRight />
              </>
            )}
          </Button>
          <Button
            className="w-full"
            variant={"ghost"}
            onClick={() => requestNewOTPCode.mutate()}
            disabled={requestNewOTPCode.isPending}
          >
            {requestNewOTPCode.isPending ? (
              <>
                <Spinner/> Loading...
              </>
            ) : (
              <>
                Request another code
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
