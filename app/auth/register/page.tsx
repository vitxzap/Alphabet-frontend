"use client";
import RegisterForm from "./register-form";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BlurFade } from "@/components/ui/blur-fade";
import { WavyBackground } from "@/components/ui/wavy-background";
export default function RegisterPage() {
  return (
    <WavyBackground className="w-full">
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <BlurFade delay={0.25} inView className="flex items-center justify-center w-full">
          <div className="flex w-full flex-col gap-6">
            <a
              href="#"
              className="flex items-center gap-2 self-center font-medium"
            >
              <AnimatedThemeToggler />
              Resum.it
            </a>
            <RegisterForm />
          </div>
        </BlurFade>
      </div>
    </WavyBackground>
  );
}
