"use client";
import { AuthMachineComponentProps } from "../auth-machine";
import { useEffect } from "react";
import z from "zod";
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
import { LucideArrowRight, LucideCircleX } from "lucide-react";
import LoadingButton from "../components/loading-button";
import { Button } from "@/components/ui/button";
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
      onOTPMissClicked: {
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
      toast.success("Success!", {
        description: "A new verification code was sent to your inbox.",
        position: "top-center",
      });
    },
    onError: (err) => {
      toast.error("Oops...", {
        description: err.message,
        position: "top-center",
      });
    },
  });
  const OTPFormMutate = useMutation({
    mutationFn: async (formData: OTPFormSchemaType) => {
      console.log(type);
      if (type === "email-verification") {
        await authClient.emailOtp.verifyEmail({
          email: email,
          otp: formData.otp,
        });
        return;
      }
      const { data, error } = await authClient.emailOtp.checkVerificationOtp({
        otp: formData.otp,
        email: email,
        type: type,
      });
      if (error) {
        throw error;
      }
      setOTP(formData.otp);
      actions?.onOTPSuccess.callback();
    },
    onError: (err) => {
      toast.error("Oops...", {
        description: err.message,
        position: "top-center",
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
      <div className="flex flex-col gap-2 items-center justify-center">
        <div>
          <Controller
            name="otp"
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                {...field}
                pattern={REGEXP_ONLY_DIGITS}
                className="w-full"
              >
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
        <div className="flex flex-col gap-2">
          <LoadingButton isLoading={OTPFormMutate.isPending} type="submit">
            Verify code <LucideArrowRight />
          </LoadingButton>
          <LoadingButton
            variant={"ghost"}
            isLoading={requestNewOTPCode.isPending}
            onClick={() => requestNewOTPCode.mutate()}
          >
            Request new code
          </LoadingButton>
          <div>
            <span className="text-sm text-muted-foreground">
              Dont know what are you doing here?{" "}
              <a
                className="text-primary cursor-pointer underline-offset-4 hover:underline"
                onClick={() => {
                  actions?.onOTPMissClicked.callback();
                }}
              >
                Bring me back
              </a>
            </span>
          </div>
        </div>
      </div>
    </form>
  );
}
