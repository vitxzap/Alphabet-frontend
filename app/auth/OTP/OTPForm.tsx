"use client"
import { Button } from "@/components/ui/button";
import { AuthMachineComponentProps } from "../authMachine";
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

const OTPFormSchema = z.object({
  otp: z.string().min(6, {
    message: "Your verification code must be 6 digits",
  }),
});

type OTPFormSchemaType = z.infer<typeof OTPFormSchema>;

interface OTPFormProps
  extends React.ComponentProps<"form">,
    AuthMachineComponentProps<{
      onAction: {
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
  const OTPFormMutate = useMutation({
    mutationFn: async (formData: OTPFormSchemaType) => {
        const {data, error} = await authClient.
    }
  })
  function handleOTPForm(formData: OTPFormSchemaType){

  }
  useEffect(() => {
    if (onRender != undefined) {
      onRender();
    }
  }, []);
  return (
    <form className="flex items-center justify-center" noValidate onSubmit={}>
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
        </div>
        <div>
          <Button className="w-full">Verify OTP</Button>
        </div>
      </div>
    </form>
  );
}
