
import AuthCard from "./components/card";

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen max-h-screen max-w-full relative overflow-hidden">
      <div className="flex w-full flex-col gap-6 justify-center items-center">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          Classy
        </a>
        <AuthCard />
      </div>
    </div>
  );
}
