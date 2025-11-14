"use client";
import RegisterForm from "@/components/auth/forms/register-form";
import { useMachine } from "@xstate/react";
import OTPForm from "@/components/auth/forms/otp-form";
import { AuthMachine } from "@/lib/auth/auth-machine";
import ResetPasswordForm from "@/components/auth/forms/reset-password-form";
import ForgotPasswordForm from "@/components/auth/forms/forget-password-form";
import LoginForm from "@/components/auth/forms/login-form";
import { toast } from "sonner";
export default function AuthCard() {
  const [state, send] = useMachine(AuthMachine);
  // Controls whats is going to be displayed in card texts e.g. title, description
  function renderForm() {
    //each state of this machine controls whice form is being displayed inside the card
    switch (true) {
      case state.matches("login"):
        return (
          <LoginForm
            actions={{
              registerAction: {
                callback: () => send({ type: "REQUEST_REGISTER_FORM" }),
              },
              forgotPasswordAction: {
                callback: () => send({ type: "REQUEST_FORGOT_PASSWORD_FORM" }),
              },
              emailVerificationAction: {
                callback: () =>
                  send({ type: "REQUEST_EMAIL_VERIFICATION_OTP" }),
              },
            }}
          />
        );
      case state.matches("register"):
        return (
          <RegisterForm
            actions={{
              login: {
                callback: () => send({ type: "REQUEST_LOGIN_FORM" }),
              },
              onRegister: {
                callback: () =>
                  send({
                    type: "REQUEST_OTP_FORM",
                  }),
              },
            }}
          />
        );
      case state.matches("forgotPassword"):
        return (
          <ForgotPasswordForm
            actions={{
              callOTP: {
                callback: () =>
                  send({
                    type: "REQUEST_OTP_FORM",
                  }),
              },
              backToLoginPage: {
                callback: () =>
                  send({
                    type: "REQUEST_LOGIN_FORM",
                  }),
              },
            }}
          />
        );
      case state.matches({ otp: "forgotPassword" }):
        return (
          <OTPForm
            actions={{
              onOTPSuccess: {
                callback: () => send({ type: "OTP_SUCCESS" }),
              },
              onOTPMissClicked: {
                callback: () => send({ type: "OTP_MISS_CLICKED" }),
              },
            }}
          />
        );
      case state.matches({ otp: "register" }):
        return (
          <OTPForm
            actions={{
              onOTPSuccess: {
                callback: () => send({ type: "OTP_SUCCESS" }),
              },
              onOTPMissClicked: {
                callback: () => send({ type: "OTP_MISS_CLICKED" }),
              },
            }}
          />
        );
      case state.matches("resetPassword"):
        return (
          <ResetPasswordForm
            actions={{
              onNewPassword: {
                callback: () => send({ type: "NEW_PASSWORD_CHANGED" }),
              },
            }}
          />
        );
      case state.matches("dashboard"):
        toast.success("Passou");
    }
  }
  return (
    <div className="flex flex-col min-w-full items-center justify-center">
      {renderForm()}
    </div>
  );
}
