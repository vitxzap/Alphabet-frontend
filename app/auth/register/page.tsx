"use client";
import { GalleryVerticalEnd } from "lucide-react";
import RegisterForm from "./register-form";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BlurFade } from "@/components/ui/blur-fade";
export default function RegisterPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <BlurFade delay={0.25} inView>
        <div className="flex w-full max-w-sm flex-col gap-6">
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
  );
}
