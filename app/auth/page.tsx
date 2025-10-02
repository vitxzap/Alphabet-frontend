"use client";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BlurFade } from "@/components/ui/blur-fade";
import RegisterForm from "./register/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMachine } from "@xstate/react";
import OTPForm from "./OTP/otp-form";
import { AuthMachine } from "./auth-machine";
import LoginForm from "./login/login-form";
import { useState } from "react";
import { AuthCardConfig, AuthCardScreen } from "./auth-config";
import ResetPasswordForm from "./reset-password/reset-password-form";
import ForgotPasswordForm from "./forgot-password/forget-password-form";
import { OTPCardConfig } from "./OTP/otp-config";
import { motion } from "motion/react";

export default function AuthPage() {
  const [state, send] = useMachine(AuthMachine);

  const [cardText, setCardText] = useState<AuthCardScreen>(); // Controls whats is going to be displayed in card texts e.g. title, description
  function renderForm() {
    switch (true) { 
      case state.matches("login"): //each state of this machine controls whice form is being displayed inside the card
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
                callback: () => send({type: "REQUEST_EMAIL_VERIFICATION_OTP"})
              },
              authenticateUser: {
                callback:() => send({type: "USER_AUTHENTICATED"})
              }
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
          return (<div>authenticated</div>);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen max-h-screen max-w-full relative overflow-hidden">
      <BlurFade //blur-in animation component
        delay={0.25}
        inView
        className="flex items-center justify-center w-full"
      >
        <div className="flex w-full flex-col gap-6 justify-center items-center">
          <a
            href="#"
            className="flex items-center gap-2 self-center font-medium"
          >
            <AnimatedThemeToggler />
            Resum.it
          </a>

          <motion.div
            className="flex flex-col gap-6 min-w-1/4 max-md:w-full"
            layout
            transition={{
              layout: { type: "spring", stiffness: 300, damping: 50 },
            }}
          >
            <Card> {/* The only thing that changes is the form inside the card */}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  <motion.div
                    key={cardText?.title}
                    initial={{ opacity: 0, x: -120 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    {cardText?.title}
                  </motion.div>
                </CardTitle>
                <CardDescription>
                  <motion.div
                    key={cardText?.title}
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    {cardText?.description}
                  </motion.div>
                </CardDescription>
              </CardHeader>
              <motion.div
                key={cardText?.title}
                initial={{ opacity: 0, x: -120 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              > 
                <CardContent>{renderForm()}</CardContent>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </BlurFade>
    </div>
  );
}
