import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/client";
import { BsMicrosoft } from "react-icons/bs";
import { FaGoogle } from "react-icons/fa";

export default function LoginProviders() {
  const callback = "http://localhost:3000/web/classes";
  return (
    <div className="flex gap-1.5 w-full justify-between ">
      <div className="flex w-full h-max">
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={async () => {
            await authClient.signIn.social({
              provider: "microsoft",
              callbackURL: callback,
            });
          }}
        >
          <BsMicrosoft />
          Login with Microsoft
        </Button>
      </div>
      <div className="flex w-full h-max">
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={async () => {
            await authClient.signIn.social({
              provider: "google",
              callbackURL: callback,
            });
          }}
        >
          <FaGoogle />
          Login with Google
        </Button>
      </div>
    </div>
  );
}
