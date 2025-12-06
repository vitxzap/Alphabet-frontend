import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  if (process.env.NEXT_PUBLIC_DISABLE_AUTHENTICATION === "true") {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center gap-2">
        <Button asChild>
          <Link href={"/admin/dashboard"}>Admin pages</Link>
        </Button>
        <Button asChild>
          <Link href={"/web/classes"}>User pages</Link>
        </Button>
        <Button asChild>
          <Link href={"/auth"}>Auth page</Link>
        </Button>
      </div>
    );
  }
  return <div className="">this page is under construction...</div>;
}
