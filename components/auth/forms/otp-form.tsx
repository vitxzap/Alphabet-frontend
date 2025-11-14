"use client";
import { AuthMachineComponentProps } from "@/lib/auth/auth-machine";
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
import { authClient } from "@/lib/auth/client";
import { useAuthStore } from "@/lib/auth/auth-global-state";
import { toast } from "sonner";
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
import { otpFormSchema } from "@/lib/auth/schemas";
import { OTPFormSchemaType } from "@/lib/auth/types";

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
    resolver: zodResolver(otpFormSchema),
    defaultValues: {
      otp: "",
    },
  });
  const { email, type, setOTP } = useAuthStore();
  const requestNewOTPCode = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: type,
      });
      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "A new verification code was sent to your inbox.",
        position: "top-center",
      });
    },
  });
  const OTPFormMutate = useMutation({
    mutationFn: async (formData: OTPFormSchemaType) => {
      if (type === "email-verification") {
        const { error } = await authClient.emailOtp.verifyEmail({
          email: email,
          otp: formData.otp,
        });
        if (error) {
          throw error;
        }
        setOTP(formData.otp);
        actions?.onOTPSuccess.callback();
      }
      const { error } = await authClient.emailOtp.checkVerificationOtp({
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
  });

  function handleOTPForm(formData: OTPFormSchemaType) {
    OTPFormMutate.mutate(formData);
  }
  return (
    <AuthForm
      onSubmit={form.handleSubmit(handleOTPForm)}
      name="verificationCode"
    >
      <AuthHeader>
        <AuthHeaderTitle>Verification code</AuthHeaderTitle>
        <AuthHeaderDescription>
          We've sent you an one-time password, please provide it to continue.
        </AuthHeaderDescription>
      </AuthHeader>
      <AuthFormContent>
        <AuthFormContentInputs>
          <div className="flex w-full items-center justify-center">
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
        </AuthFormContentInputs>
        <div className="flex flex-col gap-2 w-full">
          <LoadingButton
            disabled={!form.formState.isReady}
            isLoading={OTPFormMutate.isPending}
            type="submit"
          >
            Verify code
          </LoadingButton>
          <LoadingButton
            disabled={!form.formState.isReady}
            variant={"ghost"}
            type="button"
            isLoading={requestNewOTPCode.isPending}
            onClick={() => requestNewOTPCode.mutate()}
          >
            Request a new code
          </LoadingButton>
        </div>
      </AuthFormContent>
    </AuthForm>
    /*  */

    /*   */

    /*  */
  );
}
