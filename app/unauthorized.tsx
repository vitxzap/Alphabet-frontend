import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShieldX } from "lucide-react";
import { redirect } from "next/navigation";
export default async function Unauthorized() {
  const handleRevoke = async () => {
    await fetch("/api/revoke", { method: "DELETE" }).then(() =>
      redirect("/auth")
    );
  };
  return (
    <div className="flex w-full h-full items-center justify-center">
      <section className="flex w-1/3">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant={"icon"}>
              <ShieldX />
            </EmptyMedia>
            <EmptyTitle>Unauthorized access</EmptyTitle>
          </EmptyHeader>
          <EmptyDescription>
            It seems that you don't have access to this page. Click the button
            below to be redirected to the authentication page
          </EmptyDescription>
          <EmptyContent>
            <div className="flex gap-1">
              <Button variant={"secondary"} onClick={handleRevoke}>
                Authenticate now
              </Button>
            </div>
          </EmptyContent>
        </Empty>
      </section>
    </div>
  );
}
