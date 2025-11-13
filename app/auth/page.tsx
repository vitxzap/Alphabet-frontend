import { LightRays } from "@/components/ui/light-rays";
import AuthCard from "./components/card";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen max-h-screen max-w-full relative overflow-hidden bg-black">
      <LightRays />
      <div className="flex w-full justify-center items-center">
        <AuthCard />
      </div>
    </div>
  );
}
