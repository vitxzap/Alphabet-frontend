"use client";
import RegisterForm from "./forms/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMachine } from "@xstate/react";
import OTPForm from "./forms/otp-form";
import { AuthMachine } from "../config/auth-machine";
import { useState } from "react";
import { AuthCardConfig, AuthCardScreen } from "../config/auth-config";
import ResetPasswordForm from "./forms/reset-password-form";
import ForgotPasswordForm from "./forms/forget-password-form";
import { OTPCardConfig } from "../config/otp-config";
import { motion } from "motion/react";
import LoginForm from "./forms/login-form";
import { useRouter } from "next/navigation";
export default function AuthCard() {
  const [state, send] = useMachine(AuthMachine);
  const router = useRouter();
  // Controls whats is going to be displayed in card texts e.g. title, description
  const [cardText, setCardText] = useState<AuthCardScreen>();
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
            onRender={() => {
              setCardText(AuthCardConfig.login);
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
            onRender={() => {
              setCardText(AuthCardConfig.register);
            }}
          />
        );
      case state.matches("forgotPassword"):
        return (
          <ForgotPasswordForm
            onRender={() => {
              setCardText(AuthCardConfig.forgotPassword);
            }}
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
            onRender={() => setCardText(OTPCardConfig.forgotPassword)}
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
            onRender={() => setCardText(OTPCardConfig.register)}
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
        router.push("/web/dashboard");
    }
  }
  return (
    <motion.div
      className="flex flex-col gap-6 min-w-1/4 max-md:w-full items-center justify-center"
      layout
      transition={{
        layout: { type: "spring", stiffness: 300, damping: 50 },
      }}
    >
      <Card className="w-full">
        {/* The only thing that changes is the form inside the card */}
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            <motion.div
              key={cardText?.title}
              initial={{ opacity: 0, x: -120 }}
              transition={{ delay: 0.05 }}
              animate={{ opacity: 1, x: 0, transitionDelay: 300 }}
            >
              {cardText?.title}
            </motion.div>
          </CardTitle>
          <CardDescription>
            <motion.div
              key={cardText?.title}
              transition={{ delay: 0.1 }}
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {cardText?.description}
            </motion.div>
          </CardDescription>
        </CardHeader>
        <motion.div
          key={cardText?.title}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <CardContent>{renderForm()}</CardContent>
        </motion.div>
      </Card>
    </motion.div>
  );
}
