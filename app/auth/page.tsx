"use client";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BlurFade } from "@/components/ui/blur-fade";
import { WavyBackground } from "@/components/ui/wavy-background";
import RegisterForm from "./register/register-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMachine } from "@xstate/react";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import OTPForm from "./OTP/OTPForm";
import { AuthMachine } from "./authMachine";
import LoginForm from "./login/login-form";
import { useState } from "react";
import { AuthCardConfig, AuthCardScreen } from "./authConfig";
import ResetPasswordForm from "./reset-password/reset-password-form";
import ForgotPasswordForm from "./forgot-password/forgot-password-form";

export default function AuthPage() {
  const [state, send] = useMachine(AuthMachine);
  const [cardText, setCardText] = useState<AuthCardScreen>(); // Controls whats is going to be displayed in card texts e.g. title, description
  function renderForm() {
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
            }}
            onRender={() => {
              setCardText(AuthCardConfig.register);
            }}
          />
        );
      case state.matches("forgotPassword"):
        return (
          <ForgotPasswordForm
            actions={{
              callOTP: {
                callback: () => send({ type: "REQUEST_OTP_FORM", email: "", purpose: "email-verification" }),
              },
            }}
          />
        );
    }
  }
  return (
    <WavyBackground className="w-full">
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <BlurFade
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
            <Card>
              <BorderTrail size={100} />
              <CardHeader className="text-center">
                <CardTitle className="text-xl">{cardText?.title}</CardTitle>
                <CardDescription>{cardText?.description}</CardDescription>
              </CardHeader>
              <CardContent>{renderForm()}</CardContent>
            </Card>
          </div>
        </BlurFade>
      </div>
    </WavyBackground>
  );
}
