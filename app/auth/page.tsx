import { LightRays } from "@/components/ui/light-rays";
import AuthCard from "./components/auth-card";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center h-screen w-screen overflow-hidden bg-black">
      <LightRays />
      <div className="flex w-full justify-center items-center">
        <AuthCard />
      </div>
    </div>
  );
}
