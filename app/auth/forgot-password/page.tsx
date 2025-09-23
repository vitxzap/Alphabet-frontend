import { WavyBackground } from "@/components/ui/wavy-background";
import ForgotPasswordForm from "./forgot-password-form";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { BlurFade } from "@/components/ui/blur-fade";

export default function ForgotPassword() {
  return (
    <WavyBackground className="w-full">
      <div className="flex min-w-full">
        <BlurFade delay={0.25} inView className="flex items-center justify-center w-full">
          <div className="flex w-full flex-col gap-6">
            <a
              href="#"
              className="flex items-center gap-2 self-center font-medium"
            >
              <div className="flex items-center gap-2 self-center font-medium">
                <AnimatedThemeToggler />
              </div>
              Resum.it
            </a>
            <ForgotPasswordForm />
          </div>
        </BlurFade>
      </div>
    </WavyBackground>
  );
}
